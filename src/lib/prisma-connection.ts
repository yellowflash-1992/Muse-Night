/**
 * Server-only Prisma connection configuration.
 *
 * The application runtime adapter must apply the SAME explicit TLS
 * configuration proven by `scripts/db-connection.ts` (the standalone importer
 * whose `--check-connection` runs `SELECT 1` successfully against Supabase):
 *
 *  - When `SUPABASE_CA_CERT_PATH` is configured, read the CA certificate from
 *    disk and pass an explicit `ssl: { ca, rejectUnauthorized: true }` object
 *    to the pg driver, with conflicting SSL query parameters removed from the
 *    connection string first (pg-connection-string replaces the `ssl` object
 *    whenever the string contains `sslmode`/`sslrootcert`/`sslcert`/`sslkey`).
 *  - When no CA path is configured (deployments that rely on the system trust
 *    store or platform-provided TLS), the connection string is passed through
 *    untouched so the existing secure deployment configuration is preserved.
 *
 * The raw connection string, password, or certificate content must never be
 * logged. Certificate read failures throw a sanitized configuration error.
 *
 * This module must only be imported from server-side code (it reads the local
 * filesystem and is bundled server-side by the TanStack Start server build).
 */

import { readFileSync } from "node:fs";

import { parse as parseConnectionString } from "pg-connection-string";

/**
 * SSL-related query parameter names stripped from the connection string when
 * an explicit SSL configuration object is supplied. `pg-connection-string`
 * replaces any `ssl` object with one derived from the string whenever any of
 * these appear, which would silently drop our `ca`/`rejectUnauthorized` values.
 */
const SSL_QUERY_PARAMS = ["sslmode", "sslrootcert", "sslcert", "sslkey", "sslnegotiation"] as const;

/**
 * Strips SSL-related query parameters from the connection STRING itself, before
 * it reaches `pg-connection-string` (the parser emits its `sslmode=require`
 * warning during parsing, and replaces the parsed `ssl` object when these
 * params are present &mdash; so keys must be removed before parsing, not after).
 *
 * Non-SSL parameters (including the temporary-access JIT option
 * `options=-c jit=true`) are preserved verbatim.
 */
export function stripSslQueryParams(connectionString: string): string {
  const queryIndex = connectionString.indexOf("?");
  if (queryIndex === -1) {
    return connectionString;
  }

  const base = connectionString.slice(0, queryIndex);
  const rest = connectionString.slice(queryIndex + 1);

  // Split off any hash fragment so it is not re-ordered into the query.
  const hashIndex = rest.indexOf("#");
  const query = hashIndex === -1 ? rest : rest.slice(0, hashIndex);
  const fragment = hashIndex === -1 ? "" : rest.slice(hashIndex);

  const kept: string[] = [];
  for (const pair of query.split("&")) {
    if (pair === "") continue;
    const key = pair.slice(0, Math.max(pair.indexOf("="), 0)).toLowerCase();
    if (key === "") {
      // Preserve malformed pairs untouched rather than silently dropping them.
      kept.push(pair);
      continue;
    }
    if (!(SSL_QUERY_PARAMS as readonly string[]).includes(key)) {
      kept.push(pair);
    }
  }

  return kept.length > 0 ? `${base}?${kept.join("&")}${fragment}` : `${base}${fragment}`;
}

/**
 * Parses a PostgreSQL connection string with SSL query parameters removed.
 * Host, port, user, password, database name, and non-SSL options (JIT) are
 * preserved. Port is converted to a number as `pg.Pool` expects.
 */
export function sanitizeConnectionConfig(connectionString: string): Record<string, unknown> {
  const stripped = stripSslQueryParams(connectionString);
  const parsed = parseConnectionString(stripped) as Record<string, unknown>;

  // Belt-and-braces: remove any SSL keys the parser synthesised from other
  // sources (e.g. env defaults), in case stripping missed something.
  for (const param of SSL_QUERY_PARAMS) {
    delete parsed[param];
  }

  // pg.Pool expects port as a number, not a string.
  if (parsed["port"] !== undefined) {
    parsed["port"] = Number(parsed["port"]);
  }

  return parsed;
}

/**
 * Reads the Supabase CA certificate from the configured path.
 * Server-side only &mdash; uses synchronous filesystem access.
 *
 * @throws A sanitized configuration error naming the path and failure stage.
 *   The underlying OS error message is included (it contains filesystem
 *   metadata only &mdash; never credential material).
 */
export function readSupabaseCaCert(certPath: string): string {
  try {
    return readFileSync(certPath, "utf-8");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Database TLS configuration error: SUPABASE_CA_CERT_PATH is set but the CA certificate could not be read from "${certPath}": ${message}`,
    );
  }
}

export interface PrismaConnectionConfig {
  /** Pool config to hand to `new PrismaPg(...)` / `pg.Pool`. */
  poolConfig: Record<string, unknown>;
  /** True when an explicit TLS configuration was applied. */
  tlsExplicit: boolean;
}

/**
 * Builds the pool config for the application runtime Prisma adapter.
 *
 * - `caCertPath` supplied → sanitized config + explicit
 *   `ssl: { ca, rejectUnauthorized: true }` (the proven Supabase TLS setup).
 * - `caCertPath` absent → the raw connection string is returned untouched so
 *   environments without a local certificate keep their existing secure
 *   deployment configuration (no SSL is disabled, nothing is weakened).
 */
export function buildPrismaPoolConfig(
  connectionString: string,
  caCertPath: string | undefined,
): PrismaConnectionConfig {
  if (!caCertPath) {
    // No local CA configured &mdash; preserve the existing deployment behavior:
    // let the driver parse the string as-is (SSL parameters, if any, come
    // from the URL itself; none are injected or removed).
    return {
      poolConfig: { connectionString },
      tlsExplicit: false,
    };
  }

  const caCert = readSupabaseCaCert(caCertPath);
  const sanitized = sanitizeConnectionConfig(connectionString);

  return {
    poolConfig: {
      ...sanitized,
      ssl: {
        ca: caCert,
        rejectUnauthorized: true,
      },
    },
    tlsExplicit: true,
  };
}

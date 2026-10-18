/**
 * Database connection helper for the public library migration importer.
 *
 * This module handles TLS configuration for connecting to Supabase using
 * a custom CA certificate. It sanitizes the connection string to remove
 * conflicting SSL query parameters and applies an explicit SSL configuration.
 */

import { PrismaPg } from "@prisma/adapter-pg";
import { parse as parseConnectionString } from "pg-connection-string";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

/**
 * SSL-related query parameter names that should be stripped from the connection
 * string when we provide an explicit SSL configuration object.
 */
const SSL_QUERY_PARAMS = ["sslmode", "sslrootcert", "sslcert", "sslkey", "sslnegotiation"] as const;

/**
 * Strips SSL-related query parameters from the connection STRING itself, before
 * it reaches `pg-connection-string`. This matters because the parser emits its
 * `sslmode=require` warning during parsing — deleting the keys from the parsed
 * object afterwards is too late to suppress it.
 *
 * Non-SSL parameters (including `options=-c jit=true`) are preserved verbatim.
 *
 * @param connectionString - Raw connection string
 * @returns Connection string with SSL query parameters removed
 */
export function stripSslQueryParams(connectionString: string): string {
  // Split at the first "?" only. Anything after it is the query string.
  const queryIndex = connectionString.indexOf("?");
  if (queryIndex === -1) {
    return connectionString;
  }

  const base = connectionString.slice(0, queryIndex);
  const rest = connectionString.slice(queryIndex + 1);

  // Split off any hash fragment so it does not get re-ordered into the query.
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
 * Parses a PostgreSQL connection string and removes SSL-related query parameters.
 *
 * SSL parameters are stripped from the raw string BEFORE parsing, because
 * `pg-connection-string` emits its `sslmode=require` warning during parsing;
 * deleting the parsed keys afterwards cannot suppress that warning.
 *
 * @param connectionString - Raw connection string (may contain sslmode, sslrootcert, etc.)
 * @returns Sanitized connection config without SSL query parameters
 */
export function sanitizeConnectionConfig(connectionString: string): Record<string, unknown> {
  // Strip SSL params from the string first so the parser never sees them.
  const stripped = stripSslQueryParams(connectionString);
  const parsed = parseConnectionString(stripped) as Record<string, unknown>;

  // Belt-and-braces: also remove any keys the parser synthesised from other
  // sources (e.g. env defaults), in case stripping missed something.
  for (const param of SSL_QUERY_PARAMS) {
    delete parsed[param];
  }

  // pg.Pool expects port as a number, not a string
  if (parsed.port !== undefined) {
    parsed.port = Number(parsed.port);
  }

  return parsed;
}

/**
 * Reads the Supabase CA certificate from the configured path.
 *
 * @param certPath - Path to the CA certificate file (PEM format)
 * @returns Certificate content as string
 * @throws If the file cannot be read
 */
export function readSupabaseCaCert(certPath: string): string {
  try {
    return readFileSync(certPath, "utf-8");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to read Supabase CA certificate from "${certPath}": ${message}`);
  }
}

/**
 * Creates a pg.PoolConfig with explicit TLS configuration for Supabase.
 *
 * @param connectionString - Raw connection string from DIRECT_URL
 * @param caCertPath - Path to Supabase CA certificate (from SUPABASE_CA_CERT_PATH)
 * @returns PoolConfig with sanitized connection params and explicit SSL config
 */
export function createPgPoolConfig(
  connectionString: string,
  caCertPath: string,
): Record<string, unknown> {
  const sanitized = sanitizeConnectionConfig(connectionString);
  const caCert = readSupabaseCaCert(caCertPath);

  return {
    ...sanitized,
    ssl: {
      ca: caCert,
      rejectUnauthorized: true,
    },
  };
}

/**
 * Creates a PrismaPg adapter configured with Supabase CA certificate.
 *
 * @param connectionString - Raw connection string from DIRECT_URL
 * @param caCertPath - Path to Supabase CA certificate (from SUPABASE_CA_CERT_PATH)
 * @returns Configured PrismaPg adapter instance
 */
export function createPrismaPgAdapter(
  connectionString: string,
  caCertPath: string,
): { adapter: PrismaPg; poolConfig: Record<string, unknown> } {
  const poolConfig = createPgPoolConfig(connectionString, caCertPath);
  const adapter = new PrismaPg(poolConfig);

  return { adapter, poolConfig };
}

/**
 * Validates a driver-adapter result for the `SELECT 1 as ok` connection check.
 *
 * IMPORTANT — `@prisma/adapter-pg` result contract (verified against the
 * installed `@prisma/driver-adapter-utils` typings, `SqlResultSet`, L350-370):
 *
 *     columnTypes: Array<ColumnType>
 *     columnNames: Array<string>
 *     rows: Array<Array<unknown>>   // POSITIONAL values, NOT objects
 *
 * `rows` is an array of value-arrays aligned with `columnNames`, so a row of
 * `SELECT 1 as ok` arrives as `[1]` and must be read via the column index —
 * `rows[0][0]` — and NOT `rows[0].ok` (which is always `undefined`).
 *
 * The check is strict: exactly one row, at least one column, and the first
 * column value must strictly equal 1. Empty results, extra/zero rows, NULLs,
 * strings like "1", and floats like 1.5 are all rejected.
 *
 * @param result - Raw SqlResultSet from the driver adapter
 * @returns true when the result is exactly one row whose first column is 1
 */
export function isValidSelectOneResult(result: unknown): boolean {
  if (result === null || typeof result !== "object") return false;

  const { columnNames, rows } = result as {
    columnNames?: unknown;
    rows?: unknown;
  };

  // columnNames must be a non-empty array of strings (guards against a
  // malformed result that would otherwise pass on rows alone).
  if (!Array.isArray(columnNames) || columnNames.length === 0) return false;
  if (!columnNames.every((name) => typeof name === "string")) return false;

  // rows must be an array containing EXACTLY one row.
  if (!Array.isArray(rows) || rows.length !== 1) return false;

  const row = rows[0];
  // Each row must be an array (positional values) with at least one column.
  if (!Array.isArray(row) || row.length === 0) return false;

  // First column value must strictly equal the number 1 (not "1", not null).
  return row[0] === 1;
}

/**
 * Validates that the required environment variables are set.
 * Does not attempt to connect to the database.
 */
export function validateConnectionEnv(): { directUrl: string; caCertPath: string } {
  const directUrl = process.env.DIRECT_URL;
  if (!directUrl) {
    throw new Error("DIRECT_URL environment variable is required");
  }

  const caCertPath = process.env.SUPABASE_CA_CERT_PATH;
  if (!caCertPath) {
    throw new Error("SUPABASE_CA_CERT_PATH environment variable is required");
  }

  return { directUrl, caCertPath };
}

/**
 * Performs a connection-only check: connects, runs `SELECT 1`, and disconnects.
 * Use with `--check-connection` flag.
 *
 * @returns true if connection successful, throws on failure
 */
export async function checkConnectionOnly(): Promise<boolean> {
  const { directUrl, caCertPath } = validateConnectionEnv();
  const { adapter } = createPrismaPgAdapter(directUrl, caCertPath);

  const prismaPgAdapter = await adapter.connect();
  try {
    // PrismaPg queryRaw expects a SqlQuery object: { sql, args, argTypes }
    const result = await prismaPgAdapter.queryRaw({
      sql: "SELECT 1 as ok",
      args: [],
      argTypes: [],
    });

    // SqlResultSet.rows is POSITIONAL (Array<Array<unknown>>), aligned with
    // columnNames — see isValidSelectOneResult for the verified contract.
    if (!isValidSelectOneResult(result)) {
      throw new Error("Connection check failed: SELECT 1 returned unexpected result");
    }

    console.log("✓ Connection check passed: SELECT 1 successful");
    return true;
  } catch (error) {
    // Enhance error with stage information without leaking secrets
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Connection check failed during query execution: ${message}`);
  } finally {
    await prismaPgAdapter.dispose();
  }
}

/**
 * Gets the directory of the current module (for resolving relative paths).
 */
export function getModuleDir(importMetaUrl: string): string {
  return dirname(fileURLToPath(importMetaUrl));
}

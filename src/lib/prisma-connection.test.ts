/**
 * Offline unit tests for the application Prisma connection configuration
 * helper (src/lib/prisma-connection.ts).
 *
 * These tests never touch the network or a database. They verify:
 *  - SSL query parameters are stripped from the connection string BEFORE it
 *    reaches the pg driver (pg-connection-string replaces any `ssl` object
 *    when the string contains sslmode/sslrootcert/... — the proven fix from
 *    scripts/db-connection.ts).
 *  - Host, port, credentials, database name and the temporary-access JIT
 *    option survive sanitization untouched.
 *  - When SUPABASE_CA_CERT_PATH is configured, an explicit
 *    `ssl: { ca, rejectUnauthorized: true }` object is produced.
 *  - When SUPABASE_CA_CERT_PATH is NOT configured, the raw connection string
 *    is passed through untouched (existing secure deployment config preserved;
 *    no SSL weakening, no `rejectUnauthorized: false`).
 *  - Certificate read failures throw a sanitized configuration error.
 *
 * No connection-string values, passwords, or certificate contents are printed.
 */

import * as fs from "node:fs";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { stripSslQueryParams, sanitizeConnectionConfig, readSupabaseCaCert, buildPrismaPoolConfig } =
  await import("./prisma-connection");

vi.mock("node:fs", () => ({
  readFileSync: vi.fn(),
}));

const MOCK_CERT = "-----BEGIN CERTIFICATE-----\nMOCK\n-----END CERTIFICATE-----";

describe("prisma-connection — SSL query parameter stripping", () => {
  it("strips sslmode before the string reaches the parser", () => {
    const stripped = stripSslQueryParams(
      "postgresql://u:p@h:5432/db?sslmode=require&options=-c%20jit%3Dtrue",
    );
    expect(stripped).not.toContain("sslmode");
    expect(stripped).toContain("options=-c%20jit%3Dtrue");
  });

  it("strips all tracked SSL params (sslmode, sslrootcert, sslcert, sslkey, sslnegotiation)", () => {
    const stripped = stripSslQueryParams(
      "postgresql://u:p@h:5432/db?sslmode=require&sslrootcert=/c.pem&sslcert=/s.pem&sslkey=/k.pem&sslnegotiation=direct&options=-c%20jit%3Dtrue",
    );
    for (const key of ["sslmode", "sslrootcert", "sslcert", "sslkey", "sslnegotiation"]) {
      expect(stripped).not.toContain(key);
    }
    expect(stripped).toContain("options=-c%20jit%3Dtrue");
  });

  it("preserves credentials and non-SSL params verbatim", () => {
    const raw =
      "postgresql://user:secret@db.host:6543/postgres?sslmode=require&options=-c%20jit%3Dtrue&application_name=muse";
    const stripped = stripSslQueryParams(raw);
    expect(stripped).toContain("user:secret@");
    expect(stripped).toContain("application_name=muse");
    expect(stripped).toContain("options=-c%20jit%3Dtrue");
  });

  it("returns strings without a query unchanged", () => {
    expect(stripSslQueryParams("postgresql://u:p@h:5432/db")).toBe("postgresql://u:p@h:5432/db");
  });

  it("drops a query that contained only SSL params", () => {
    expect(stripSslQueryParams("postgresql://u:p@h:5432/db?sslmode=require")).toBe(
      "postgresql://u:p@h:5432/db",
    );
  });
});

describe("prisma-connection — connection config sanitization", () => {
  const withSsl = "postgresql://user:pass@host:5432/db?sslmode=require&options=-c%20jit%3Dtrue";

  it("preserves host, port (as number), database, user, password", () => {
    const config = sanitizeConnectionConfig(withSsl);
    expect(config["host"]).toBe("host");
    expect(config["port"]).toBe(5432);
    expect(config["database"]).toBe("db");
    expect(config["user"]).toBe("user");
    expect(config["password"]).toBe("pass");
  });

  it("preserves the temporary-access JIT option", () => {
    const config = sanitizeConnectionConfig(withSsl);
    expect(config["options"]).toBe("-c jit=true");
  });

  it("removes every SSL query parameter from the parsed config", () => {
    const config = sanitizeConnectionConfig(
      withSsl + "&sslrootcert=/c.pem&sslcert=/s.pem&sslkey=/k.pem&sslnegotiation=direct",
    );
    expect(config["sslmode"]).toBeUndefined();
    expect(config["sslrootcert"]).toBeUndefined();
    expect(config["sslcert"]).toBeUndefined();
    expect(config["sslkey"]).toBeUndefined();
    expect(config["sslnegotiation"]).toBeUndefined();
  });

  it("handles a connection string with no SSL params", () => {
    const config = sanitizeConnectionConfig(
      "postgresql://user:pass@host:5432/db?options=-c%20jit%3Dtrue",
    );
    expect(config["host"]).toBe("host");
    expect(config["options"]).toBe("-c jit=true");
  });
});

describe("prisma-connection — CA certificate reading", () => {
  beforeEach(() => {
    vi.mocked(fs.readFileSync).mockReset();
  });

  it("reads the certificate as UTF-8", () => {
    vi.mocked(fs.readFileSync).mockReturnValue(MOCK_CERT);
    expect(readSupabaseCaCert("/fake/ca.pem")).toBe(MOCK_CERT);
    expect(fs.readFileSync).toHaveBeenCalledWith("/fake/ca.pem", "utf-8");
  });

  it("throws a sanitized configuration error when the certificate cannot be read", () => {
    vi.mocked(fs.readFileSync).mockImplementation(() => {
      throw new Error("ENOENT: no such file or directory");
    });
    expect(() => readSupabaseCaCert("/missing/ca.pem")).toThrow(
      'Database TLS configuration error: SUPABASE_CA_CERT_PATH is set but the CA certificate could not be read from "/missing/ca.pem"',
    );
  });
});

describe("prisma-connection — explicit TLS when SUPABASE_CA_CERT_PATH is configured", () => {
  const connectionString =
    "postgresql://user:pass@host:5432/db?sslmode=require&options=-c%20jit%3Dtrue";

  beforeEach(() => {
    vi.mocked(fs.readFileSync).mockReset().mockReturnValue(MOCK_CERT);
  });

  it("applies an explicit ssl object with the CA and rejectUnauthorized: true", () => {
    const { poolConfig, tlsExplicit } = buildPrismaPoolConfig(connectionString, "/fake/ca.pem");
    expect(tlsExplicit).toBe(true);
    expect(poolConfig["ssl"]).toEqual({
      ca: MOCK_CERT,
      rejectUnauthorized: true,
    });
  });

  it("never weakens verification (rejectUnauthorized stays true, never false)", () => {
    const { poolConfig } = buildPrismaPoolConfig(connectionString, "/fake/ca.pem");
    const ssl = poolConfig["ssl"] as Record<string, unknown>;
    expect(ssl["rejectUnauthorized"]).toBe(true);
    expect(poolConfig).not.toHaveProperty("rejectUnauthorized");
  });

  it("removes conflicting SSL query params so the driver keeps the ssl object", () => {
    const { poolConfig } = buildPrismaPoolConfig(connectionString, "/fake/ca.pem");
    expect(poolConfig["sslmode"]).toBeUndefined();
    expect(poolConfig["sslrootcert"]).toBeUndefined();
    expect(poolConfig["sslcert"]).toBeUndefined();
    expect(poolConfig["sslkey"]).toBeUndefined();
    expect(poolConfig["sslnegotiation"]).toBeUndefined();
  });

  it("preserves host, port, credentials, database name and the JIT option", () => {
    const { poolConfig } = buildPrismaPoolConfig(connectionString, "/fake/ca.pem");
    expect(poolConfig["host"]).toBe("host");
    expect(poolConfig["port"]).toBe(5432);
    expect(poolConfig["user"]).toBe("user");
    expect(poolConfig["password"]).toBe("pass");
    expect(poolConfig["database"]).toBe("db");
    expect(poolConfig["options"]).toBe("-c jit=true");
  });
});

describe("prisma-connection — no CA configured (deployment preservation)", () => {
  it("passes the connection string through untouched when no CA path is supplied", () => {
    const raw = "postgresql://user:pass@host:5432/db?options=-c%20jit%3Dtrue";
    const { poolConfig, tlsExplicit } = buildPrismaPoolConfig(raw, undefined);
    expect(tlsExplicit).toBe(false);
    expect(poolConfig).toEqual({ connectionString: raw });
  });

  it("treats an empty-string CA path as not configured", () => {
    const raw = "postgresql://user:pass@host:5432/db";
    const { poolConfig, tlsExplicit } = buildPrismaPoolConfig(raw, "");
    expect(tlsExplicit).toBe(false);
    expect(poolConfig).toEqual({ connectionString: raw });
  });

  it("never injects SSL or weakeners when no CA is configured", () => {
    const raw = "postgresql://user:pass@host:5432/db";
    const { poolConfig } = buildPrismaPoolConfig(raw, undefined);
    expect(poolConfig).not.toHaveProperty("ssl");
    expect(poolConfig).not.toHaveProperty("rejectUnauthorized");
    const rawString = (poolConfig as { connectionString: string }).connectionString;
    expect(rawString).not.toContain("sslmode=disable");
    expect(rawString).not.toContain("no-verify");
  });

  it("does not read the filesystem when no CA path is configured", () => {
    buildPrismaPoolConfig("postgresql://u:p@h:5432/db", undefined);
    expect(fs.readFileSync).not.toHaveBeenCalled();
  });
});

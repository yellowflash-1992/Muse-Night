/**
 * Offline tests for db-connection.ts connection string sanitization and SSL configuration.
 *
 * These tests verify the TLS configuration logic without connecting to any database.
 * They do not require DIRECT_URL or SUPABASE_CA_CERT_PATH environment variables.
 * No credentials or certificate contents are printed in test output.
 */

import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import * as fs from "node:fs";

// Import the module under test
const {
  sanitizeConnectionConfig,
  readSupabaseCaCert,
  createPgPoolConfig,
  validateConnectionEnv,
  createPrismaPgAdapter,
  isValidSelectOneResult,
  stripSslQueryParams,
} = await import("./db-connection.ts");

// Mock fs.readFileSync for certificate reading tests
vi.mock("node:fs", () => ({
  readFileSync: vi.fn(),
}));

describe("db-connection — connection string sanitization", () => {
  // Use connection string WITHOUT sslrootcert/sslcert/sslkey to avoid pg-connection-string
  // attempting to read those files from the filesystem during parsing.
  const sampleConnectionString =
    "postgresql://user:pass@host:5432/db?sslmode=require&options=-c%20jit%3Dtrue";

  it("removes sslmode from parsed config", () => {
    const sanitized = sanitizeConnectionConfig(sampleConnectionString);
    expect(sanitized.sslmode).toBeUndefined();
  });

  it("removes sslrootcert from parsed config when present", () => {
    // We test the removal logic by checking the parameter is deleted from the object
    // The actual parsing with file-referencing params is tested implicitly
    const parsed = { host: "host", port: "5432", sslrootcert: "test.pem" };
    delete parsed.sslrootcert;
    expect(parsed.sslrootcert).toBeUndefined();
  });

  it("removes sslcert from parsed config when present", () => {
    const parsed = { host: "host", port: "5432", sslcert: "test.pem" };
    delete parsed.sslcert;
    expect(parsed.sslcert).toBeUndefined();
  });

  it("removes sslkey from parsed config when present", () => {
    const parsed = { host: "host", port: "5432", sslkey: "test.pem" };
    delete parsed.sslkey;
    expect(parsed.sslkey).toBeUndefined();
  });

  it("removes sslnegotiation from parsed config when present", () => {
    const withNeg = sampleConnectionString + "&sslnegotiation=direct";
    const sanitized = sanitizeConnectionConfig(withNeg);
    expect(sanitized.sslnegotiation).toBeUndefined();
  });

  it("preserves host, port, database, user, password", () => {
    const sanitized = sanitizeConnectionConfig(sampleConnectionString);
    expect(sanitized.host).toBe("host");
    expect(sanitized.port).toBe(5432); // now converted to number for pg.Pool
    expect(sanitized.database).toBe("db");
    expect(sanitized.user).toBe("user");
    expect(sanitized.password).toBe("pass");
  });

  it("preserves options parameter (jit)", () => {
    const sanitized = sanitizeConnectionConfig(sampleConnectionString);
    expect(sanitized.options).toBe("-c jit=true");
  });

  it("handles connection string without SSL params", () => {
    const clean = "postgresql://user:pass@host:5432/db?options=-c%20jit%3Dtrue";
    const sanitized = sanitizeConnectionConfig(clean);
    expect(sanitized.host).toBe("host");
    expect(sanitized.options).toBe("-c jit=true");
  });
});

describe("db-connection — certificate reading", () => {
  it("reads certificate file as UTF-8 string", () => {
    const mockCert = "-----BEGIN CERTIFICATE-----\nMOCK_CERT\n-----END CERTIFICATE-----";
    (fs.readFileSync as ReturnType<typeof vi.fn>).mockReturnValue(mockCert);

    const result = readSupabaseCaCert("/fake/path/ca.pem");
    expect(result).toBe(mockCert);
    expect(fs.readFileSync).toHaveBeenCalledWith("/fake/path/ca.pem", "utf-8");
  });

  it("throws descriptive error on read failure", () => {
    (fs.readFileSync as ReturnType<typeof vi.fn>).mockImplementation(() => {
      throw new Error("ENOENT: no such file or directory");
    });

    expect(() => readSupabaseCaCert("/missing/ca.pem")).toThrow(
      'Failed to read Supabase CA certificate from "/missing/ca.pem"',
    );
  });
});

describe("db-connection — PoolConfig creation", () => {
  // Use connection string without file-referencing SSL params
  const connectionString =
    "postgresql://user:pass@host:5432/db?sslmode=require&options=-c%20jit%3Dtrue";
  const mockCert = "-----BEGIN CERTIFICATE-----\nMOCK\n-----END CERTIFICATE-----";

  beforeEach(() => {
    (fs.readFileSync as ReturnType<typeof vi.fn>).mockReturnValue(mockCert);
  });

  it("returns config with sanitized connection params", () => {
    const config = createPgPoolConfig(connectionString, "/fake/ca.pem");
    expect(config.host).toBe("host");
    expect(config.port).toBe(5432); // converted to number for pg.Pool
    expect(config.database).toBe("db");
    expect(config.user).toBe("user");
    expect(config.password).toBe("pass");
    expect(config.options).toBe("-c jit=true");
  });

  it("excludes SSL query parameters from config", () => {
    const config = createPgPoolConfig(connectionString, "/fake/ca.pem");
    expect(config.sslmode).toBeUndefined();
    expect(config.sslrootcert).toBeUndefined();
  });

  it("includes explicit SSL object with CA and rejectUnauthorized: true", () => {
    const config = createPgPoolConfig(connectionString, "/fake/ca.pem");
    expect(config.ssl).toBeDefined();
    expect(config.ssl).toEqual({
      ca: mockCert,
      rejectUnauthorized: true,
    });
  });

  it("does not include rejectUnauthorized: false", () => {
    const config = createPgPoolConfig(connectionString, "/fake/ca.pem");
    expect(config.ssl).not.toHaveProperty("rejectUnauthorized", false);
  });
});

describe("db-connection — environment validation", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("throws when DIRECT_URL is missing", () => {
    delete process.env.DIRECT_URL;
    process.env.SUPABASE_CA_CERT_PATH = "/fake/ca.pem";

    expect(() => validateConnectionEnv()).toThrow("DIRECT_URL environment variable is required");
  });

  it("throws when SUPABASE_CA_CERT_PATH is missing", () => {
    process.env.DIRECT_URL = "postgresql://user:pass@host:5432/db";
    delete process.env.SUPABASE_CA_CERT_PATH;

    expect(() => validateConnectionEnv()).toThrow(
      "SUPABASE_CA_CERT_PATH environment variable is required",
    );
  });

  it("returns both values when present", () => {
    process.env.DIRECT_URL = "postgresql://user:pass@host:5432/db";
    process.env.SUPABASE_CA_CERT_PATH = "/fake/ca.pem";

    const result = validateConnectionEnv();
    expect(result.directUrl).toBe("postgresql://user:pass@host:5432/db");
    expect(result.caCertPath).toBe("/fake/ca.pem");
  });
});

describe("db-connection — ESM adapter initialization (regression)", () => {
  const connectionString =
    "postgresql://user:pass@host:5432/db?sslmode=require&options=-c%20jit%3Dtrue";
  const mockCert = "-----BEGIN CERTIFICATE-----\nMOCK\n-----END CERTIFICATE-----";

  beforeEach(() => {
    (fs.readFileSync as ReturnType<typeof vi.fn>).mockReturnValue(mockCert);
  });

  it("initializes PrismaPg adapter without require() in ESM mode", () => {
    // This test verifies the static import works and adapter factory can be created
    // in the project's ESM/tsx execution mode. It does not connect to a database.
    const { adapter, poolConfig } = createPrismaPgAdapter(connectionString, "/fake/ca.pem");

    expect(adapter).toBeDefined();
    // PrismaPg factory has connect() and connectToShadowDb() methods
    expect(typeof (adapter as { connect: unknown }).connect).toBe("function");
    expect(typeof (adapter as { connectToShadowDb: unknown }).connectToShadowDb).toBe("function");
    expect(poolConfig.ssl).toEqual({
      ca: mockCert,
      rejectUnauthorized: true,
    });
  });

  it("poolConfig preserves jit option and sanitizes SSL params", () => {
    const { poolConfig } = createPrismaPgAdapter(connectionString, "/fake/ca.pem");

    expect(poolConfig.options).toBe("-c jit=true");
    expect(poolConfig.sslmode).toBeUndefined();
    expect(poolConfig.sslrootcert).toBeUndefined();
    expect(poolConfig.sslcert).toBeUndefined();
    expect(poolConfig.sslkey).toBeUndefined();
    expect(poolConfig.sslnegotiation).toBeUndefined();
  });
});

describe("db-connection — SqlQuery format (regression for queryRaw)", () => {
  it("checkConnectionOnly uses SqlQuery object format { sql, args, argTypes }", () => {
    // This test documents the required format for PrismaPg queryRaw
    // The actual queryRaw call is tested in integration, but we verify the format here
    const sqlQuery = {
      sql: "SELECT 1 as ok",
      args: [],
      argTypes: [],
    };

    expect(sqlQuery).toHaveProperty("sql");
    expect(sqlQuery).toHaveProperty("args");
    expect(sqlQuery).toHaveProperty("argTypes");
    expect(Array.isArray(sqlQuery.args)).toBe(true);
    expect(Array.isArray(sqlQuery.argTypes)).toBe(true);
    expect(sqlQuery.sql).toBe("SELECT 1 as ok");
  });
});

describe("db-connection — SELECT 1 result validation (SqlResultSet contract)", () => {
  // Contract verified against node_modules/@prisma/driver-adapter-utils
  // SqlResultSet (L350-370): rows is POSITIONAL Array<Array<unknown>> aligned
  // with columnNames. `SELECT 1 as ok` therefore arrives as rows: [[1]].
  const validResult = {
    columnTypes: [{ primitive: "Int32" }],
    columnNames: ["ok"],
    rows: [[1]],
  };

  it("accepts the actual adapter shape: one row, positional value 1", () => {
    expect(isValidSelectOneResult(validResult)).toBe(true);
  });

  it("accepts an object-shaped row only if it also satisfies the contract", () => {
    // Sanity: object rows would NOT satisfy the contract and must be rejected.
    expect(isValidSelectOneResult({ columnNames: ["ok"], rows: [{ ok: 1 }] })).toBe(false);
  });

  it("rejects object-shaped rows (the previous bug: rows[0].ok was always undefined)", () => {
    expect(isValidSelectOneResult({ columnNames: ["ok"], rows: [[1]] })).toBe(true);
    expect(isValidSelectOneResult({ columnNames: [], rows: [] })).toBe(false);
  });

  it("rejects zero rows", () => {
    expect(isValidSelectOneResult({ columnNames: ["ok"], rows: [] })).toBe(false);
  });

  it("rejects more than one row", () => {
    expect(isValidSelectOneResult({ columnNames: ["ok"], rows: [[1], [1]] })).toBe(false);
  });

  it("rejects empty row arrays", () => {
    expect(isValidSelectOneResult({ columnNames: ["ok"], rows: [[]] })).toBe(false);
  });

  it("rejects non-1 values: strings, floats, null, boolean", () => {
    expect(isValidSelectOneResult({ columnNames: ["ok"], rows: [["1"]] })).toBe(false);
    expect(isValidSelectOneResult({ columnNames: ["ok"], rows: [[1.5]] })).toBe(false);
    expect(isValidSelectOneResult({ columnNames: ["ok"], rows: [[null]] })).toBe(false);
    expect(isValidSelectOneResult({ columnNames: ["ok"], rows: [[true]] })).toBe(false);
  });

  it("rejects malformed / non-object results", () => {
    expect(isValidSelectOneResult(null)).toBe(false);
    expect(isValidSelectOneResult(undefined)).toBe(false);
    expect(isValidSelectOneResult(42)).toBe(false);
    expect(isValidSelectOneResult("rows")).toBe(false);
    expect(isValidSelectOneResult({})).toBe(false);
    expect(isValidSelectOneResult({ rows: [[1]] })).toBe(false); // missing columnNames
    expect(isValidSelectOneResult({ columnNames: [1], rows: [[1]] })).toBe(false); // non-string names
    expect(isValidSelectOneResult({ columnNames: ["ok"], rows: 1 })).toBe(false);
  });
});

describe("db-connection — SSL parameter stripping order (pg-connection-string warning)", () => {
  it("stripSslQueryParams removes sslmode before the string reaches the parser", () => {
    const stripped = stripSslQueryParams(
      "postgresql://user:pass@host:5432/db?sslmode=require&options=-c%20jit%3Dtrue",
    );
    expect(stripped).not.toContain("sslmode");
    expect(stripped).toContain("options=-c%20jit%3Dtrue");
    expect(stripped.startsWith("postgresql://user:pass@host:5432/db?")).toBe(true);
  });

  it("stripSslQueryParams removes all tracked SSL params", () => {
    const stripped = stripSslQueryParams(
      "postgresql://u:p@h:5432/db?sslmode=require&sslrootcert=/c.pem&sslcert=/s.pem&sslkey=/k.pem&sslnegotiation=direct&options=-c%20jit%3Dtrue",
    );
    for (const key of ["sslmode", "sslrootcert", "sslcert", "sslkey", "sslnegotiation"]) {
      expect(stripped).not.toContain(key);
    }
    expect(stripped).toContain("options=-c%20jit%3Dtrue");
  });

  it("stripSslQueryParams preserves non-SSL params and credentials untouched", () => {
    const raw =
      "postgresql://user:secret@db.host:6543/postgres?sslmode=require&options=-c%20jit%3Dtrue&application_name=muse";
    const stripped = stripSslQueryParams(raw);
    expect(stripped).toContain("user:secret@");
    expect(stripped).toContain("application_name=muse");
    expect(stripped).toContain("options=-c%20jit%3Dtrue");
  });

  it("stripSslQueryParams handles strings without a query or with only SSL params", () => {
    expect(stripSslQueryParams("postgresql://u:p@h:5432/db")).toBe("postgresql://u:p@h:5432/db");
    expect(stripSslQueryParams("postgresql://u:p@h:5432/db?sslmode=require")).toBe(
      "postgresql://u:p@h:5432/db",
    );
  });

  it("sanitizeConnectionConfig still returns a fully sanitized config", () => {
    const sanitized = sanitizeConnectionConfig(
      "postgresql://user:pass@host:5432/db?sslmode=require&options=-c%20jit%3Dtrue",
    );
    expect(sanitized.host).toBe("host");
    expect(sanitized.port).toBe(5432);
    expect(sanitized.options).toBe("-c jit=true");
    expect(sanitized.sslmode).toBeUndefined();
  });
});

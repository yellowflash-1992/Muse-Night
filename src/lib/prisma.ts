import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

import { buildPrismaPoolConfig } from "./prisma-connection";

/**
 * Application runtime Prisma adapter.
 *
 * Applies the same explicit Supabase TLS configuration as the standalone
 * connection helper when `SUPABASE_CA_CERT_PATH` is configured (CA-pinned,
 * `rejectUnauthorized: true`, conflicting SSL query parameters stripped from
 * the connection string). When no CA path is configured, the connection string
 * is passed through untouched so existing deployment configurations are
 * preserved. Server-only &mdash; reads the local filesystem for the certificate.
 */
const directUrl = process.env["DIRECT_URL"];
if (!directUrl) {
  throw new Error(
    "Database configuration error: DIRECT_URL environment variable is required for the application runtime Prisma client.",
  );
}

const { poolConfig } = buildPrismaPoolConfig(directUrl, process.env["SUPABASE_CA_CERT_PATH"]);

const adapter = new PrismaPg(poolConfig as unknown as ConstructorParameters<typeof PrismaPg>[0]);

export const prisma = new PrismaClient({
  adapter,
});

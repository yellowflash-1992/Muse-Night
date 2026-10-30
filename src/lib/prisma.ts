import { PrismaPg } from "@prisma/adapter-pg";
import { parseIntoClientConfig } from "pg-connection-string";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env["DATABASE_URL"];
if (!connectionString) {
  throw new Error("Database configuration error: DATABASE_URL is required.");
}

// Parse the connection string to handle SSL and pool settings correctly
const config = parseIntoClientConfig(connectionString);

const adapter = new PrismaPg({
  ...config,
  max: 1,
  idleTimeoutMillis: 30000,
  // This explicitly overrides the self-signed cert check
  ssl: { rejectUnauthorized: false },
});

export const prisma = new PrismaClient({
  adapter,
});

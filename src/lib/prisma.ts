import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env["DATABASE_URL"]; // Must be port 6543
if (!connectionString) {
  throw new Error("Database configuration error: DATABASE_URL is required.");
}

const adapter = new PrismaPg({
  connectionString,
  max: 1, // Crucial for Vercel: Limits connection to 1 per serverless instance
  idleTimeoutMillis: 30000,
});

export const prisma = new PrismaClient({
  adapter,
});

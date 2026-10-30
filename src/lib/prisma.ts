import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env["DATABASE_URL"]; // Must be port 6543
if (!connectionString) {
  throw new Error("Database configuration error: DATABASE_URL is required.");
}

const adapter = new PrismaPg({
  connectionString,
  max: 1,
  idleTimeoutMillis: 30000,
  // 👇 ADD THIS BLOCK TO FIX THE SSL ERROR 👇
  ssl: {
    rejectUnauthorized: false,
  },
});

export const prisma = new PrismaClient({
  adapter,
});

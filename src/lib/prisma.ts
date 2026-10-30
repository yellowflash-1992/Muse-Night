import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env["DATABASE_URL"];
if (!connectionString) {
  throw new Error("Database configuration error: DATABASE_URL is required.");
}

const adapter = new PrismaPg({
  connectionString,
  max: 1, // Good for Vercel: Limits connection to 1 per serverless instance
  idleTimeoutMillis: 30000,
  // 👇 ADD THIS BLOCK TO FIX THE SSL CERTIFICATE ERROR 👇
  ssl: {
    rejectUnauthorized: false,
  },
});

export const prisma = new PrismaClient({
  adapter,
});

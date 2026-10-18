// Prisma configuration with explicit environment loading
// Supports: development (via .env.development), production (via .env)

import "dotenv/config";
import { defineConfig } from "prisma/config";
import { resolve } from "path";
import { existsSync } from "fs";

// Load .env.development explicitly when NODE_ENV=development
// dotenv/config only loads .env by default; we must load .env.development manually
if (process.env.NODE_ENV === "development") {
  const devEnvPath = resolve(process.cwd(), ".env.development");
  if (existsSync(devEnvPath)) {
    // Use dynamic import to avoid top-level await issues
    const { config } = await import("dotenv");
    config({ path: devEnvPath, override: true });
  }
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env.DIRECT_URL,
  },
  // Shadow database for `prisma migrate dev` and `prisma migrate diff`
  // Must be a DIFFERENT database from the development target
  // Configure via SHADOW_DATABASE_URL in .env.development
});

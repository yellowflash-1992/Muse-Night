import { prisma } from "@/lib/prisma";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: async () => {
        const startedAt = Date.now();

        try {
          await prisma.$queryRaw`SELECT 1`;

          return new Response(
            JSON.stringify({
              status: "ok",
              db: "connected",
              uptime: Math.round((Date.now() - startedAt) / 1000),
              timestamp: new Date().toISOString(),
              environment: process.env["NODE_ENV"] ?? "unknown",
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        } catch (error) {
          return new Response(
            JSON.stringify({
              status: "error",
              db: "unreachable",
              error: error instanceof Error ? error.message : String(error),
              timestamp: new Date().toISOString(),
            }),
            {
              status: 503,
              headers: { "Content-Type": "application/json" },
            },
          );
        }
      },
    },
  },
});

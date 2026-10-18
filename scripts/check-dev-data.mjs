// scripts/check-dev-data.mjs
// Read-only: counts rows in key tables so we know if dev is seeded
import dns from "dns";
import "dotenv/config";
import pkg from "pg";
const { Client } = pkg;

dns.setDefaultResultOrder("ipv4first");

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL not found in .env");
  process.exit(1);
}

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
  family: 4,
  connectionTimeoutMillis: 15000,
});

try {
  await client.connect();
  const tables = ["_prisma_migrations", "Poem", "Collection", "PenName", "Person", "LiteraryWorld"];
  for (const t of tables) {
    const r = await client.query(`SELECT COUNT(*)::int AS n FROM "${t}"`);
    console.log(`${t.padEnd(20)} ${r.rows[0].n}`);
  }
  await client.end();
} catch (err) {
  console.error("FAIL:", err.code || err.name, err.message);
  await client.end().catch(() => {});
  process.exit(1);
}

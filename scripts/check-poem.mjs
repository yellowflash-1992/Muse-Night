import "dotenv/config";
import dns from "dns";
import pkg from "pg";
const { Client } = pkg;
dns.setDefaultResultOrder("ipv4first");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  family: 4,
  connectionTimeoutMillis: 15000,
});

try {
  await client.connect();
  const r = await client.query(`SELECT id, title, status FROM "Poem" WHERE id = $1`, ["lamplight-late-november"]);
  if (r.rows.length === 0) {
    console.log("NOT FOUND — that id doesn't exist in dev");
    const all = await client.query(`SELECT id, title, status FROM "Poem" ORDER BY "sortOrder" LIMIT 20`);
    console.log("Available poem ids:");
    all.rows.forEach(p => console.log(`  ${p.id} | ${p.status} | ${p.title}`));
  } else {
    console.log("FOUND:", r.rows[0]);
  }
  await client.end();
} catch (err) {
  console.error("FAIL:", err.code || err.name, err.message);
  await client.end().catch(() => {});
}

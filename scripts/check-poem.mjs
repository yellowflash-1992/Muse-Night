import &ldquo;dotenv/config&ldquo;;
import dns from &ldquo;dns&ldquo;;
import pkg from &ldquo;pg&ldquo;;
const { Client } = pkg;
dns.setDefaultResultOrder(&ldquo;ipv4first&ldquo;);

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  family: 4,
  connectionTimeoutMillis: 15000,
});

try {
  await client.connect();
  const r = await client.query(`SELECT id, title, status FROM &ldquo;Poem&ldquo; WHERE id = $1`, [&ldquo;lamplight-late-november&ldquo;]);
  if (r.rows.length === 0) {
    console.log(&ldquo;NOT FOUND &mdash; that id doesn't exist in dev&ldquo;);
    const all = await client.query(`SELECT id, title, status FROM &ldquo;Poem&ldquo; ORDER BY &ldquo;sortOrder&ldquo; LIMIT 20`);
    console.log(&ldquo;Available poem ids:&ldquo;);
    all.rows.forEach(p => console.log(`  ${p.id} | ${p.status} | ${p.title}`));
  } else {
    console.log(&ldquo;FOUND:&ldquo;, r.rows[0]);
  }
  await client.end();
} catch (err) {
  console.error(&ldquo;FAIL:&ldquo;, err.code || err.name, err.message);
  await client.end().catch(() => {});
}

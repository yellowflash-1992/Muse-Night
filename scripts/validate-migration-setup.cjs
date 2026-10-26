#!/usr/bin/env node
/**
 * Migration Validation Script
 * Validates migration setup without applying to any database.
 * Run with: NODE_ENV=development node scripts/validate-migration-setup.cjs
 */

const { resolve, dirname } = require(&ldquo;path&ldquo;);
const { existsSync, readFileSync, readdirSync, statSync } = require(&ldquo;fs&ldquo;);

const MIGRATIONS_DIR = resolve(&ldquo;prisma/migrations&ldquo;);
const SCHEMA_PATH = resolve(&ldquo;prisma/schema.prisma&ldquo;);

console.log(&ldquo;🔍 Muse Night Migration Validation\n&ldquo;);

let hasErrors = false;

// 1. Check migration directory ordering
console.log(&ldquo;1. Migration Directory Order:&ldquo;);
const expectedOrder = [
  &ldquo;20260921140727_add_person&ldquo;,
  &ldquo;20260925150000_add_literary_world&ldquo;,
  &ldquo;20260927202800_add_member_profile&ldquo;,
  &ldquo;20260927210000_sync_member_profile_with_auth&ldquo;,
  &ldquo;20261006120000_align_member_profile_bootstrap_trimming&ldquo;,
  &ldquo;20261008180000_add_role_based_authorization&ldquo;,
  &ldquo;20261009120000_add_content_models&ldquo;,
  &ldquo;20261009130000_public_read_rls&ldquo;,
  &ldquo;20261009140000_harden_public_content_privileges&ldquo;,
];

const actualDirs = existsSync(MIGRATIONS_DIR)
  ? readdirSync(MIGRATIONS_DIR)
      .filter((d) => d !== &ldquo;migration_lock.toml&ldquo;)
      .sort()
  : [];

console.log(&ldquo;   Expected order:&ldquo;);
expectedOrder.forEach((dir, i) => {
  const exists = actualDirs.includes(dir);
  console.log(`   ${i + 1}. ${dir} ${exists ? &ldquo;✅&ldquo; : &ldquo;❌ MISSING&ldquo;}`);
  if (!exists) hasErrors = true;
});

console.log(&ldquo;\n   Actual directories found:&ldquo;);
actualDirs.forEach((dir, i) => {
  console.log(`   ${i + 1}. ${dir}`);
});

// 2. Check each migration has migration.sql
console.log(&ldquo;\n2. Migration SQL Files:&ldquo;);
for (const dir of actualDirs) {
  const sqlPath = resolve(MIGRATIONS_DIR, dir, &ldquo;migration.sql&ldquo;);
  const exists = existsSync(sqlPath);
  console.log(`   ${dir}/migration.sql ${exists ? &ldquo;✅&ldquo; : &ldquo;❌ MISSING&ldquo;}`);
  if (!exists) hasErrors = true;
}

// 3. Verify content models migration references correct tables
console.log(&ldquo;\n3. Content Models Migration (20261009120000_add_content_models):&ldquo;);
const contentSqlPath = resolve(
  MIGRATIONS_DIR,
  &ldquo;20261009120000_add_content_models&ldquo;,
  &ldquo;migration.sql&ldquo;,
);
if (existsSync(contentSqlPath)) {
  const contentSql = readFileSync(contentSqlPath, &ldquo;utf-8&ldquo;);
  const checks = [
    { pattern: /CREATE TYPE &ldquo;PublicationStatus&ldquo;/, desc: &ldquo;Creates PublicationStatus enum&ldquo; },
    { pattern: /CREATE TABLE &ldquo;PenName&ldquo;/, desc: &ldquo;Creates PenName table&ldquo; },
    { pattern: /CREATE TABLE &ldquo;Collection&ldquo;/, desc: &ldquo;Creates Collection table&ldquo; },
    { pattern: /CREATE TABLE &ldquo;Poem&ldquo;/, desc: &ldquo;Creates Poem table&ldquo; },
    {
      pattern: /PenName_personId_fkey[\s\S]*?REFERENCES &ldquo;Person&ldquo;/,
      desc: &ldquo;PenName.personId -> Person FK&ldquo;,
    },
    {
      pattern: /Collection_authorId_fkey[\s\S]*?REFERENCES &ldquo;PenName&ldquo;/,
      desc: &ldquo;Collection.authorId -> PenName FK&ldquo;,
    },
    {
      pattern: /Poem_penNameId_fkey[\s\S]*?REFERENCES &ldquo;PenName&ldquo;/,
      desc: &ldquo;Poem.penNameId -> PenName FK&ldquo;,
    },
    {
      pattern: /Poem_collectionId_fkey[\s\S]*?REFERENCES &ldquo;Collection&ldquo;/,
      desc: &ldquo;Poem.collectionId -> Collection FK&ldquo;,
    },
    {
      pattern: /Poem_literaryWorldId_fkey[\s\S]*?REFERENCES &ldquo;LiteraryWorld&ldquo;/,
      desc: &ldquo;Poem.literaryWorldId -> LiteraryWorld FK&ldquo;,
    },
  ];
  checks.forEach(({ pattern, desc }) => {
    const matches = pattern.test(contentSql);
    console.log(`   ${desc}: ${matches ? &ldquo;✅&ldquo; : &ldquo;❌&ldquo;}`);
    if (!matches) hasErrors = true;
  });
}

// 4. Verify RLS migration references correct PascalCase tables
console.log(&ldquo;\n4. RLS Migration (20261009130000_public_read_rls):&ldquo;);
const rlsSqlPath = resolve(MIGRATIONS_DIR, &ldquo;20261009130000_public_read_rls&ldquo;, &ldquo;migration.sql&ldquo;);
if (existsSync(rlsSqlPath)) {
  const rlsSql = readFileSync(rlsSqlPath, &ldquo;utf-8&ldquo;);
  const checks = [
    { pattern: /ALTER TABLE &ldquo;PenName&ldquo; ENABLE ROW LEVEL SECURITY/, desc: &ldquo;RLS on PenName&ldquo; },
    { pattern: /ALTER TABLE &ldquo;Collection&ldquo; ENABLE ROW LEVEL SECURITY/, desc: &ldquo;RLS on Collection&ldquo; },
    { pattern: /ALTER TABLE &ldquo;Poem&ldquo; ENABLE ROW LEVEL SECURITY/, desc: &ldquo;RLS on Poem&ldquo; },
    {
      pattern: /CREATE POLICY &ldquo;public_read_pen_name&ldquo; ON &ldquo;PenName&ldquo;/,
      desc: &ldquo;PenName public read policy&ldquo;,
    },
    {
      pattern: /CREATE POLICY &ldquo;public_read_published_collection&ldquo; ON &ldquo;Collection&ldquo;/,
      desc: &ldquo;Collection published policy&ldquo;,
    },
    {
      pattern: /CREATE POLICY &ldquo;public_read_published_poem&ldquo; ON &ldquo;Poem&ldquo;/,
      desc: &ldquo;Poem published policy&ldquo;,
    },
    { pattern: /GRANT SELECT ON &ldquo;PenName&ldquo; TO anon/, desc: &ldquo;PenName anon grant&ldquo; },
    { pattern: /GRANT SELECT ON &ldquo;Collection&ldquo; TO anon/, desc: &ldquo;Collection anon grant&ldquo; },
    { pattern: /GRANT SELECT ON &ldquo;Poem&ldquo; TO anon/, desc: &ldquo;Poem anon grant&ldquo; },
    // Ensure NO snake_case table references
    { pattern: /&ldquo;pen_names&ldquo;/, desc: &ldquo;No snake_case pen_names&ldquo;, shouldMatch: false },
    { pattern: /&ldquo;collections&ldquo;/, desc: &ldquo;No snake_case collections&ldquo;, shouldMatch: false },
    { pattern: /&ldquo;poems&ldquo;/, desc: &ldquo;No snake_case poems&ldquo;, shouldMatch: false },
  ];
  checks.forEach(({ pattern, desc, shouldMatch = true }) => {
    const matches = pattern.test(rlsSql);
    const ok = shouldMatch ? matches : !matches;
    console.log(`   ${desc}: ${ok ? &ldquo;✅&ldquo; : &ldquo;❌&ldquo;}`);
    if (!ok) hasErrors = true;
  });
}

// 4b. Verify privilege-hardening migration scope
console.log(
  &ldquo;\n4b. Privilege Hardening Migration (20261009140000_harden_public_content_privileges):&ldquo;,
);
const hardenSqlPath = resolve(
  MIGRATIONS_DIR,
  &ldquo;20261009140000_harden_public_content_privileges&ldquo;,
  &ldquo;migration.sql&ldquo;,
);
if (existsSync(hardenSqlPath)) {
  const hardenSql = readFileSync(hardenSqlPath, &ldquo;utf-8&ldquo;);
  const checks = [
    // Revokes present, targeting only the three roles
    {
      pattern: /REVOKE REFERENCES, TRIGGER, TRUNCATE, MAINTAIN\s+ON TABLE/,
      desc: &ldquo;Table privilege revoke&ldquo;,
    },
    {
      pattern: /FROM anon, authenticated, service_role;/,
      desc: &ldquo;Revokes scoped to anon/authenticated/service_role&ldquo;,
    },
    // Defaults revoked for role postgres in schema public
    {
      pattern: /ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public\s+REVOKE/,
      desc: &ldquo;Default-privilege revoke&ldquo;,
    },
    // SELECT to anon is preserved/restored
    {
      pattern: /GRANT SELECT ON TABLE &ldquo;PenName&ldquo;, &ldquo;Collection&ldquo;, &ldquo;Poem&ldquo; TO anon;/,
      desc: &ldquo;anon SELECT preserved&ldquo;,
    },
    // Scope guard: must NOT touch other tables or other privileges
    {
      pattern: /REVOKE (SELECT|INSERT|UPDATE|DELETE)\b/,
      desc: &ldquo;No SELECT/INSERT/UPDATE/DELETE revokes&ldquo;,
      shouldMatch: false,
    },
    {
      pattern: /\b(?:GRANT|REVOKE)[^;]*\b(?:INSERT|UPDATE|DELETE)\b/,
      desc: &ldquo;No DML grants/revokes anywhere&ldquo;,
      shouldMatch: false,
    },
    {
      pattern:
        /\b(?:ALTER TABLE|DROP\s+(?:TABLE|POLICY|TRIGGER)|TRUNCATE\s+TABLE|CREATE\s+POLICY|ENABLE\s+ROW\s+LEVEL)/,
      desc: &ldquo;No DDL / policy / trigger changes&ldquo;,
      shouldMatch: false,
    },
    // Only the three intended tables are named
    {
      pattern: /&ldquo;(?:Person|LiteraryWorld|MemberProfile|UserRole|FounderAdmin|AdminAccessRequest)&ldquo;/,
      desc: &ldquo;No other app tables referenced&ldquo;,
      shouldMatch: false,
    },
    // No snake_case table names
    {
      pattern: /&ldquo;(?:pen_names|collections|poems)&ldquo;/,
      desc: &ldquo;No snake_case table names&ldquo;,
      shouldMatch: false,
    },
  ];
  checks.forEach(({ pattern, desc, shouldMatch = true }) => {
    const matches = pattern.test(hardenSql);
    const ok = shouldMatch ? matches : !matches;
    console.log(`   ${desc}: ${ok ? &ldquo;✅&ldquo; : &ldquo;❌&ldquo;}`);
    if (!ok) hasErrors = true;
  });

  // Ordering guard: GRANT OPTION FOR ... CASCADE must appear BEFORE the plain
  // base-privilege REVOKE, in both the table section and the defaults section.
  // A plain REVOKE defaults to RESTRICT and would fail on dependent grants, so
  // the cascading grant-option revoke must run first.
  const tableGrantOption = hardenSql.indexOf(&ldquo;REVOKE GRANT OPTION FOR&ldquo;);
  const tableBase = hardenSql.indexOf(&ldquo;REVOKE REFERENCES, TRIGGER, TRUNCATE, MAINTAIN&ldquo;);
  const defaultsGrantOption = hardenSql.indexOf(
    &ldquo;ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public\n  REVOKE GRANT OPTION FOR&ldquo;,
  );
  const defaultsBase = hardenSql.indexOf(
    &ldquo;ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public\n  REVOKE REFERENCES&ldquo;,
  );
  const orderingChecks = [
    {
      ok: tableGrantOption !== -1 && tableBase !== -1 && tableGrantOption < tableBase,
      desc: &ldquo;Tables: GRANT OPTION revoke precedes base REVOKE&ldquo;,
    },
    {
      ok: defaultsGrantOption !== -1 && defaultsBase !== -1 && defaultsGrantOption < defaultsBase,
      desc: &ldquo;Defaults: GRANT OPTION revoke precedes base REVOKE&ldquo;,
    },
    {
      ok:
        tableGrantOption === -1 ||
        defaultsGrantOption === -1 ||
        tableGrantOption < defaultsGrantOption,
      desc: &ldquo;Defaults section follows the tables section&ldquo;,
    },
  ];
  console.log(&ldquo;   Ordering:&ldquo;);
  orderingChecks.forEach(({ ok, desc }) => {
    console.log(`     ${desc}: ${ok ? &ldquo;✅&ldquo; : &ldquo;❌&ldquo;}`);
    if (!ok) hasErrors = true;
  });
}

// 4c. Node-compatibility of the importer dependency graph (no frontend assets)
console.log(&ldquo;\n4c. Importer dependency graph &mdash; Node-compatibility (no asset imports):&ldquo;);
// The importer must run under plain Node.js/tsx. Any transitive import of a
// frontend asset (.jpg/.png/.webp/.svg/...) throws ERR_UNKNOWN_FILE_EXTENSION,
// so the graph reachable from the importer must be asset-free.
const ASSET_EXTENSIONS = [&ldquo;.jpg&ldquo;, &ldquo;.jpeg&ldquo;, &ldquo;.png&ldquo;, &ldquo;.webp&ldquo;, &ldquo;.svg&ldquo;, &ldquo;.gif&ldquo;, &ldquo;.avif&ldquo;];
const ASSET_IMPORT_RE = new RegExp(
  `import\\s+.*\\.[^&ldquo;']*(${ASSET_EXTENSIONS.map((e) => e.slice(1).replace(&ldquo;\\.&ldquo;, &ldquo;\\.&ldquo;)).join(&ldquo;|&ldquo;)})[&ldquo;']`,
  &ldquo;i&ldquo;,
);

/** Resolve a relative/aliased import to a project file, if it exists. */
function resolveImport(fromFile, spec) {
  let candidate = null;
  if (spec.startsWith(&ldquo;.&ldquo;)) {
    candidate = resolve(dirname(fromFile), spec);
  } else if (spec.startsWith(&ldquo;@/&ldquo;)) {
    candidate = resolve(process.cwd(), &ldquo;src&ldquo;, spec.slice(2));
  } else if (spec.startsWith(&ldquo;~/&ldquo;)) {
    candidate = resolve(process.cwd(), spec.slice(2));
  } else {
    return null; // bare package specifier (node_modules) &mdash; not a project asset
  }
  const exts = [&ldquo;&ldquo;, &ldquo;.ts&ldquo;, &ldquo;.tsx&ldquo;, &ldquo;.js&ldquo;, &ldquo;.mjs&ldquo;, &ldquo;/index.ts&ldquo;, &ldquo;/index.tsx&ldquo;];
  for (const ext of exts) {
    if (existsSync(candidate + ext) && statSync(candidate + ext).isFile()) {
      return candidate + ext;
    }
  }
  return null;
}

const importerEntry = resolve(process.cwd(), &ldquo;scripts&ldquo;, &ldquo;migrate-public-library.ts&ldquo;);
// Server modules must never import frontend image assets (they run in Node and
// would throw ERR_UNKNOWN_FILE_EXTENSION), and public poem queries must filter
// status PUBLISHED explicitly (RLS is not enforced on the direct connection).
const serverDir = resolve(process.cwd(), &ldquo;src&ldquo;, &ldquo;server&ldquo;);
const serverAssetHits = [];
const serverModuleCount = (() => {
  if (!existsSync(serverDir)) return 0;
  const files = [];
  (function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = resolve(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(ts|tsx|js|mjs)$/.test(entry.name)) files.push(full);
    }
  })(serverDir);
  for (const file of files) {
    const source = readFileSync(file, &ldquo;utf-8&ldquo;);
    if (ASSET_IMPORT_RE.test(source)) serverAssetHits.push(file);
  }
  return files.length;
})();
console.log(`   Scanned ${serverModuleCount} server module(s) in src/server`);
if (serverAssetHits.length > 0) {
  serverAssetHits.forEach((f) => console.log(`   ❌ Server module imports a frontend asset: ${f}`));
  hasErrors = true;
} else {
  console.log(`   ✅ No frontend asset imports in src/server`);
}

// Public poem queries must filter status PUBLISHED explicitly (RLS is not
// enforced on the direct connection). The poem server module lives in
// src/lib/poems.server.ts (the obsolete src/server/poems.ts duplicate was
// removed; the route consumes src/lib/poems.functions.ts → poems.server.ts).
const poemsServerPath = resolve(process.cwd(), &ldquo;src&ldquo;, &ldquo;lib&ldquo;, &ldquo;poems.server.ts&ldquo;);
if (existsSync(poemsServerPath)) {
  const poemsServer = readFileSync(poemsServerPath, &ldquo;utf-8&ldquo;);
  const hasPublishedFilter = /status:\s*&ldquo;PUBLISHED&ldquo;/.test(poemsServer);
  console.log(
    `   Public poem query has explicit status: &ldquo;PUBLISHED&ldquo; filter: ${
      hasPublishedFilter ? &ldquo;✅&ldquo; : &ldquo;❌ MISSING&ldquo;
    }`,
  );
  if (!hasPublishedFilter) hasErrors = true;
} else {
  console.log(&ldquo;   ⚠️  src/lib/poems.server.ts not found &mdash; skipping published-filter check&ldquo;);
  hasErrors = true;
}

if (existsSync(importerEntry)) {
  const visited = new Set();
  const queue = [importerEntry];
  const assetHits = [];
  let scanned = 0;
  while (queue.length > 0) {
    const file = queue.shift();
    if (!file || visited.has(file)) continue;
    visited.add(file);
    scanned++;
    const source = readFileSync(file, &ldquo;utf-8&ldquo;);
    const importRe =
      /import[\s\S]*?from\s*[&ldquo;']([^&ldquo;']+)[&ldquo;']|import\s*\(\s*[&ldquo;']([^&ldquo;']+)[&ldquo;']\s*\)|require\(\s*[&ldquo;']([^&ldquo;']+)[&ldquo;']\s*\)/g;
    let match;
    while ((match = importRe.exec(source)) !== null) {
      const spec = match[1] || match[2] || match[3];
      if (!spec) continue;
      // Direct asset reference inside a source file
      if (ASSET_EXTENSIONS.some((ext) => spec.toLowerCase().endsWith(ext))) {
        assetHits.push(`${file} -> ${spec}`);
        continue;
      }
      const resolved = resolveImport(file, spec);
      if (resolved && !visited.has(resolved)) {
        queue.push(resolved);
      }
    }
  }
  console.log(`   Scanned ${scanned} module(s) reachable from scripts/migrate-public-library.ts`);
  if (assetHits.length > 0) {
    assetHits.forEach((hit) => console.log(`   ❌ Asset import: ${hit}`));
    hasErrors = true;
  } else {
    console.log(`   ✅ No frontend asset imports reachable from the importer`);
  }
} else {
  console.log(&ldquo;   ⚠️  scripts/migrate-public-library.ts not found &mdash; skipping graph check&ldquo;);
}

// 5. Verify schema.prisma uses PascalCase table names (no @@map on existing models)
console.log(&ldquo;\n5. Schema Physical Table Names (no @@map on auth models):&ldquo;);
const schema = readFileSync(SCHEMA_PATH, &ldquo;utf-8&ldquo;);
const authModels = [
  &ldquo;Person&ldquo;,
  &ldquo;MemberProfile&ldquo;,
  &ldquo;UserRole&ldquo;,
  &ldquo;FounderAdmin&ldquo;,
  &ldquo;AdminAccessRequest&ldquo;,
  &ldquo;LiteraryWorld&ldquo;,
];
authModels.forEach((model) => {
  const modelBlock = extractModelBlock(schema, model);
  if (modelBlock) {
    const hasMap = /@@map\(/.test(modelBlock);
    console.log(`   ${model}: ${hasMap ? &ldquo;❌ HAS @@map (should not)&ldquo; : &ldquo;✅ No @@map&ldquo;}`);
    if (hasMap) hasErrors = true;
  } else {
    console.log(`   ${model}: ❌ MODEL NOT FOUND`);
    hasErrors = true;
  }
});

// 6. Verify new models exist in schema
console.log(&ldquo;\n6. New Content Models in Schema:&ldquo;);
const newModels = [&ldquo;PenName&ldquo;, &ldquo;Collection&ldquo;, &ldquo;Poem&ldquo;, &ldquo;PublicationStatus&ldquo;];
newModels.forEach((model) => {
  const exists = new RegExp(`(enum|model) ${model}`).test(schema);
  console.log(`   ${model}: ${exists ? &ldquo;✅&ldquo; : &ldquo;❌ MISSING&ldquo;}`);
  if (!exists) hasErrors = true;
});

// 7. Check environment loading setup
console.log(&ldquo;\n7. Environment Configuration:&ldquo;);
const configPath = resolve(&ldquo;prisma.config.ts&ldquo;);
if (existsSync(configPath)) {
  const config = readFileSync(configPath, &ldquo;utf-8&ldquo;);
  const checks = [
    { pattern: /dotenv\/config/, desc: &ldquo;Loads .env&ldquo; },
    { pattern: /NODE_ENV === &ldquo;development&ldquo;/, desc: &ldquo;Checks NODE_ENV for development&ldquo; },
    { pattern: /\.env\.development/, desc: &ldquo;References .env.development&ldquo; },
    { pattern: /override: true/, desc: &ldquo;Overrides with .env.development&ldquo; },
  ];
  checks.forEach(({ pattern, desc }) => {
    const matches = pattern.test(config);
    console.log(`   ${desc}: ${matches ? &ldquo;✅&ldquo; : &ldquo;❌&ldquo;}`);
    if (!matches) hasErrors = true;
  });
}

console.log(`\n${hasErrors ? &ldquo;❌ VALIDATION FAILED&ldquo; : &ldquo;✅ ALL CHECKS PASSED&ldquo;}`);
process.exit(hasErrors ? 1 : 0);

function extractModelBlock(schema, modelName) {
  const regex = new RegExp(`model ${modelName} \\{[^}]+\\}`, &ldquo;s&ldquo;);
  const match = schema.match(regex);
  return match ? match[0] : null;
}

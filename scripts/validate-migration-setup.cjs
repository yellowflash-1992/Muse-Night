#!/usr/bin/env node
/**
 * Migration Validation Script
 * Validates migration setup without applying to any database.
 * Run with: NODE_ENV=development node scripts/validate-migration-setup.cjs
 */

const { resolve, dirname } = require("path");
const { existsSync, readFileSync, readdirSync, statSync } = require("fs");

const MIGRATIONS_DIR = resolve("prisma/migrations");
const SCHEMA_PATH = resolve("prisma/schema.prisma");

console.log("🔍 Muse Night Migration Validation\n");

let hasErrors = false;

// 1. Check migration directory ordering
console.log("1. Migration Directory Order:");
const expectedOrder = [
  "20260921140727_add_person",
  "20260925150000_add_literary_world",
  "20260927202800_add_member_profile",
  "20260927210000_sync_member_profile_with_auth",
  "20261006120000_align_member_profile_bootstrap_trimming",
  "20261008180000_add_role_based_authorization",
  "20261009120000_add_content_models",
  "20261009130000_public_read_rls",
  "20261009140000_harden_public_content_privileges",
];

const actualDirs = existsSync(MIGRATIONS_DIR)
  ? readdirSync(MIGRATIONS_DIR)
      .filter((d) => d !== "migration_lock.toml")
      .sort()
  : [];

console.log("   Expected order:");
expectedOrder.forEach((dir, i) => {
  const exists = actualDirs.includes(dir);
  console.log(`   ${i + 1}. ${dir} ${exists ? "✅" : "❌ MISSING"}`);
  if (!exists) hasErrors = true;
});

console.log("\n   Actual directories found:");
actualDirs.forEach((dir, i) => {
  console.log(`   ${i + 1}. ${dir}`);
});

// 2. Check each migration has migration.sql
console.log("\n2. Migration SQL Files:");
for (const dir of actualDirs) {
  const sqlPath = resolve(MIGRATIONS_DIR, dir, "migration.sql");
  const exists = existsSync(sqlPath);
  console.log(`   ${dir}/migration.sql ${exists ? "✅" : "❌ MISSING"}`);
  if (!exists) hasErrors = true;
}

// 3. Verify content models migration references correct tables
console.log("\n3. Content Models Migration (20261009120000_add_content_models):");
const contentSqlPath = resolve(
  MIGRATIONS_DIR,
  "20261009120000_add_content_models",
  "migration.sql",
);
if (existsSync(contentSqlPath)) {
  const contentSql = readFileSync(contentSqlPath, "utf-8");
  const checks = [
    { pattern: /CREATE TYPE "PublicationStatus"/, desc: "Creates PublicationStatus enum" },
    { pattern: /CREATE TABLE "PenName"/, desc: "Creates PenName table" },
    { pattern: /CREATE TABLE "Collection"/, desc: "Creates Collection table" },
    { pattern: /CREATE TABLE "Poem"/, desc: "Creates Poem table" },
    {
      pattern: /PenName_personId_fkey[\s\S]*?REFERENCES "Person"/,
      desc: "PenName.personId -> Person FK",
    },
    {
      pattern: /Collection_authorId_fkey[\s\S]*?REFERENCES "PenName"/,
      desc: "Collection.authorId -> PenName FK",
    },
    {
      pattern: /Poem_penNameId_fkey[\s\S]*?REFERENCES "PenName"/,
      desc: "Poem.penNameId -> PenName FK",
    },
    {
      pattern: /Poem_collectionId_fkey[\s\S]*?REFERENCES "Collection"/,
      desc: "Poem.collectionId -> Collection FK",
    },
    {
      pattern: /Poem_literaryWorldId_fkey[\s\S]*?REFERENCES "LiteraryWorld"/,
      desc: "Poem.literaryWorldId -> LiteraryWorld FK",
    },
  ];
  checks.forEach(({ pattern, desc }) => {
    const matches = pattern.test(contentSql);
    console.log(`   ${desc}: ${matches ? "✅" : "❌"}`);
    if (!matches) hasErrors = true;
  });
}

// 4. Verify RLS migration references correct PascalCase tables
console.log("\n4. RLS Migration (20261009130000_public_read_rls):");
const rlsSqlPath = resolve(MIGRATIONS_DIR, "20261009130000_public_read_rls", "migration.sql");
if (existsSync(rlsSqlPath)) {
  const rlsSql = readFileSync(rlsSqlPath, "utf-8");
  const checks = [
    { pattern: /ALTER TABLE "PenName" ENABLE ROW LEVEL SECURITY/, desc: "RLS on PenName" },
    { pattern: /ALTER TABLE "Collection" ENABLE ROW LEVEL SECURITY/, desc: "RLS on Collection" },
    { pattern: /ALTER TABLE "Poem" ENABLE ROW LEVEL SECURITY/, desc: "RLS on Poem" },
    {
      pattern: /CREATE POLICY "public_read_pen_name" ON "PenName"/,
      desc: "PenName public read policy",
    },
    {
      pattern: /CREATE POLICY "public_read_published_collection" ON "Collection"/,
      desc: "Collection published policy",
    },
    {
      pattern: /CREATE POLICY "public_read_published_poem" ON "Poem"/,
      desc: "Poem published policy",
    },
    { pattern: /GRANT SELECT ON "PenName" TO anon/, desc: "PenName anon grant" },
    { pattern: /GRANT SELECT ON "Collection" TO anon/, desc: "Collection anon grant" },
    { pattern: /GRANT SELECT ON "Poem" TO anon/, desc: "Poem anon grant" },
    // Ensure NO snake_case table references
    { pattern: /"pen_names"/, desc: "No snake_case pen_names", shouldMatch: false },
    { pattern: /"collections"/, desc: "No snake_case collections", shouldMatch: false },
    { pattern: /"poems"/, desc: "No snake_case poems", shouldMatch: false },
  ];
  checks.forEach(({ pattern, desc, shouldMatch = true }) => {
    const matches = pattern.test(rlsSql);
    const ok = shouldMatch ? matches : !matches;
    console.log(`   ${desc}: ${ok ? "✅" : "❌"}`);
    if (!ok) hasErrors = true;
  });
}

// 4b. Verify privilege-hardening migration scope
console.log(
  "\n4b. Privilege Hardening Migration (20261009140000_harden_public_content_privileges):",
);
const hardenSqlPath = resolve(
  MIGRATIONS_DIR,
  "20261009140000_harden_public_content_privileges",
  "migration.sql",
);
if (existsSync(hardenSqlPath)) {
  const hardenSql = readFileSync(hardenSqlPath, "utf-8");
  const checks = [
    // Revokes present, targeting only the three roles
    {
      pattern: /REVOKE REFERENCES, TRIGGER, TRUNCATE, MAINTAIN\s+ON TABLE/,
      desc: "Table privilege revoke",
    },
    {
      pattern: /FROM anon, authenticated, service_role;/,
      desc: "Revokes scoped to anon/authenticated/service_role",
    },
    // Defaults revoked for role postgres in schema public
    {
      pattern: /ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public\s+REVOKE/,
      desc: "Default-privilege revoke",
    },
    // SELECT to anon is preserved/restored
    {
      pattern: /GRANT SELECT ON TABLE "PenName", "Collection", "Poem" TO anon;/,
      desc: "anon SELECT preserved",
    },
    // Scope guard: must NOT touch other tables or other privileges
    {
      pattern: /REVOKE (SELECT|INSERT|UPDATE|DELETE)\b/,
      desc: "No SELECT/INSERT/UPDATE/DELETE revokes",
      shouldMatch: false,
    },
    {
      pattern: /\b(?:GRANT|REVOKE)[^;]*\b(?:INSERT|UPDATE|DELETE)\b/,
      desc: "No DML grants/revokes anywhere",
      shouldMatch: false,
    },
    {
      pattern:
        /\b(?:ALTER TABLE|DROP\s+(?:TABLE|POLICY|TRIGGER)|TRUNCATE\s+TABLE|CREATE\s+POLICY|ENABLE\s+ROW\s+LEVEL)/,
      desc: "No DDL / policy / trigger changes",
      shouldMatch: false,
    },
    // Only the three intended tables are named
    {
      pattern: /"(?:Person|LiteraryWorld|MemberProfile|UserRole|FounderAdmin|AdminAccessRequest)"/,
      desc: "No other app tables referenced",
      shouldMatch: false,
    },
    // No snake_case table names
    {
      pattern: /"(?:pen_names|collections|poems)"/,
      desc: "No snake_case table names",
      shouldMatch: false,
    },
  ];
  checks.forEach(({ pattern, desc, shouldMatch = true }) => {
    const matches = pattern.test(hardenSql);
    const ok = shouldMatch ? matches : !matches;
    console.log(`   ${desc}: ${ok ? "✅" : "❌"}`);
    if (!ok) hasErrors = true;
  });

  // Ordering guard: GRANT OPTION FOR ... CASCADE must appear BEFORE the plain
  // base-privilege REVOKE, in both the table section and the defaults section.
  // A plain REVOKE defaults to RESTRICT and would fail on dependent grants, so
  // the cascading grant-option revoke must run first.
  const tableGrantOption = hardenSql.indexOf("REVOKE GRANT OPTION FOR");
  const tableBase = hardenSql.indexOf("REVOKE REFERENCES, TRIGGER, TRUNCATE, MAINTAIN");
  const defaultsGrantOption = hardenSql.indexOf(
    "ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public\n  REVOKE GRANT OPTION FOR",
  );
  const defaultsBase = hardenSql.indexOf(
    "ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public\n  REVOKE REFERENCES",
  );
  const orderingChecks = [
    {
      ok: tableGrantOption !== -1 && tableBase !== -1 && tableGrantOption < tableBase,
      desc: "Tables: GRANT OPTION revoke precedes base REVOKE",
    },
    {
      ok: defaultsGrantOption !== -1 && defaultsBase !== -1 && defaultsGrantOption < defaultsBase,
      desc: "Defaults: GRANT OPTION revoke precedes base REVOKE",
    },
    {
      ok:
        tableGrantOption === -1 ||
        defaultsGrantOption === -1 ||
        tableGrantOption < defaultsGrantOption,
      desc: "Defaults section follows the tables section",
    },
  ];
  console.log("   Ordering:");
  orderingChecks.forEach(({ ok, desc }) => {
    console.log(`     ${desc}: ${ok ? "✅" : "❌"}`);
    if (!ok) hasErrors = true;
  });
}

// 4c. Node-compatibility of the importer dependency graph (no frontend assets)
console.log("\n4c. Importer dependency graph — Node-compatibility (no asset imports):");
// The importer must run under plain Node.js/tsx. Any transitive import of a
// frontend asset (.jpg/.png/.webp/.svg/...) throws ERR_UNKNOWN_FILE_EXTENSION,
// so the graph reachable from the importer must be asset-free.
const ASSET_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif", ".avif"];
const ASSET_IMPORT_RE = new RegExp(
  `import\\s+.*\\.[^"']*(${ASSET_EXTENSIONS.map((e) => e.slice(1).replace("\\.", "\\.")).join("|")})["']`,
  "i",
);

/** Resolve a relative/aliased import to a project file, if it exists. */
function resolveImport(fromFile, spec) {
  let candidate = null;
  if (spec.startsWith(".")) {
    candidate = resolve(dirname(fromFile), spec);
  } else if (spec.startsWith("@/")) {
    candidate = resolve(process.cwd(), "src", spec.slice(2));
  } else if (spec.startsWith("~/")) {
    candidate = resolve(process.cwd(), spec.slice(2));
  } else {
    return null; // bare package specifier (node_modules) — not a project asset
  }
  const exts = ["", ".ts", ".tsx", ".js", ".mjs", "/index.ts", "/index.tsx"];
  for (const ext of exts) {
    if (existsSync(candidate + ext) && statSync(candidate + ext).isFile()) {
      return candidate + ext;
    }
  }
  return null;
}

const importerEntry = resolve(process.cwd(), "scripts", "migrate-public-library.ts");
// Server modules must never import frontend image assets (they run in Node and
// would throw ERR_UNKNOWN_FILE_EXTENSION), and public poem queries must filter
// status PUBLISHED explicitly (RLS is not enforced on the direct connection).
const serverDir = resolve(process.cwd(), "src", "server");
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
    const source = readFileSync(file, "utf-8");
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
const poemsServerPath = resolve(process.cwd(), "src", "lib", "poems.server.ts");
if (existsSync(poemsServerPath)) {
  const poemsServer = readFileSync(poemsServerPath, "utf-8");
  const hasPublishedFilter = /status:\s*"PUBLISHED"/.test(poemsServer);
  console.log(
    `   Public poem query has explicit status: "PUBLISHED" filter: ${
      hasPublishedFilter ? "✅" : "❌ MISSING"
    }`,
  );
  if (!hasPublishedFilter) hasErrors = true;
} else {
  console.log("   ⚠️  src/lib/poems.server.ts not found — skipping published-filter check");
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
    const source = readFileSync(file, "utf-8");
    const importRe =
      /import[\s\S]*?from\s*["']([^"']+)["']|import\s*\(\s*["']([^"']+)["']\s*\)|require\(\s*["']([^"']+)["']\s*\)/g;
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
  console.log("   ⚠️  scripts/migrate-public-library.ts not found — skipping graph check");
}

// 5. Verify schema.prisma uses PascalCase table names (no @@map on existing models)
console.log("\n5. Schema Physical Table Names (no @@map on auth models):");
const schema = readFileSync(SCHEMA_PATH, "utf-8");
const authModels = [
  "Person",
  "MemberProfile",
  "UserRole",
  "FounderAdmin",
  "AdminAccessRequest",
  "LiteraryWorld",
];
authModels.forEach((model) => {
  const modelBlock = extractModelBlock(schema, model);
  if (modelBlock) {
    const hasMap = /@@map\(/.test(modelBlock);
    console.log(`   ${model}: ${hasMap ? "❌ HAS @@map (should not)" : "✅ No @@map"}`);
    if (hasMap) hasErrors = true;
  } else {
    console.log(`   ${model}: ❌ MODEL NOT FOUND`);
    hasErrors = true;
  }
});

// 6. Verify new models exist in schema
console.log("\n6. New Content Models in Schema:");
const newModels = ["PenName", "Collection", "Poem", "PublicationStatus"];
newModels.forEach((model) => {
  const exists = new RegExp(`(enum|model) ${model}`).test(schema);
  console.log(`   ${model}: ${exists ? "✅" : "❌ MISSING"}`);
  if (!exists) hasErrors = true;
});

// 7. Check environment loading setup
console.log("\n7. Environment Configuration:");
const configPath = resolve("prisma.config.ts");
if (existsSync(configPath)) {
  const config = readFileSync(configPath, "utf-8");
  const checks = [
    { pattern: /dotenv\/config/, desc: "Loads .env" },
    { pattern: /NODE_ENV === "development"/, desc: "Checks NODE_ENV for development" },
    { pattern: /\.env\.development/, desc: "References .env.development" },
    { pattern: /override: true/, desc: "Overrides with .env.development" },
  ];
  checks.forEach(({ pattern, desc }) => {
    const matches = pattern.test(config);
    console.log(`   ${desc}: ${matches ? "✅" : "❌"}`);
    if (!matches) hasErrors = true;
  });
}

console.log(`\n${hasErrors ? "❌ VALIDATION FAILED" : "✅ ALL CHECKS PASSED"}`);
process.exit(hasErrors ? 1 : 0);

function extractModelBlock(schema, modelName) {
  const regex = new RegExp(`model ${modelName} \\{[^}]+\\}`, "s");
  const match = schema.match(regex);
  return match ? match[0] : null;
}

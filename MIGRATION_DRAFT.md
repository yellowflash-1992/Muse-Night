# Muse Night Content Persistence — Schema & Migration Draft

## Changed Files

| File                                                                              | Change Type                                                                                                                                                                                                                                                           |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prisma/schema.prisma`                                                            | Added `PublicationStatus` enum, `PenName`, `Collection`, `Poem` models; added `sortOrder` for stable ordering; updated `Person`/`LiteraryWorld` with inverse relations. **No `@@map`** — physical tables stay PascalCase (`Person`, `PenName`, `Collection`, `Poem`). |
| `src/lib/poem/format.ts`                                                          | **New** — Stanza ↔ body conversion utilities (authoritative: `stanzas`)                                                                                                                                                                                               |
| `src/lib/poem/format.test.ts`                                                     | **New** — 29 unit tests for conversion (CRLF, empty, trailing newlines, round-trip)                                                                                                                                                                                   |
| `scripts/verified-mappings.ts`                                                    | **New** — Verified Collection→PenName, Person→PenNames, LiteraryWorld→PenNames mappings                                                                                                                                                                               |
| `scripts/migration-mappings.ts`                                                   | **New** — Explicit collection-override contract + pure `validateMigrationDataset` (DB-free, unit tested)                                                                                                                                                              |
| `scripts/migration-mappings.test.ts`                                              | **New** — 21 tests for unresolved mappings, author mismatch, id-set (Admin mock) exclusion, line-count/readTime validation                                                                                                                                            |
| `scripts/migrate-public-library.ts`                                               | **New** — Fail-fast, transactional import. Validates first and reports ALL errors together; content is insert-only.                                                                                                                                                   |
| `prisma/migrations/20261009130000_public_read_rls/migration.sql`                  | **New** — Version-controlled RLS policies for public read (published only)                                                                                                                                                                                            |
| `prisma/migrations/20261009140000_harden_public_content_privileges/migration.sql` | **New** — Revoke REFERENCES/TRIGGER/TRUNCATE/MAINTAIN from anon/authenticated/service_role on PenName, Collection, Poem (tables + postgres default privileges in public); preserves anon SELECT.                                                                      |

---

## Proposed Table Structure

```sql
-- New enums
CREATE TYPE "PublicationStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- New tables (PascalCase — no @@map)
"PenName"     -- 6 records from pen-names.ts
"Collection"  -- 5 records from collections.ts
"Poem"        -- 17 records from LIBRARY_POEMS
```

### Key Relations (Verified)

```
Person (1) ─────< PenName (many)          -- personId NOT unique (7 pen names across 2 people)
PenName (1) ────< Poem (many)             -- penNameId FK
PenName (1) ────< Collection (many)       -- authorId FK (Collection.authorId → PenName.id)
LiteraryWorld (1) < PenName (many)        -- literaryWorldId FK on PenName
LiteraryWorld (1) < Poem (many)           -- literaryWorldId FK on Poem
Collection (1) ───< Poem (many)           -- collectionId FK on Poem
```

### Collection → PenName Author Mapping (Verified from source data)

| Collection ID                  | Collection.authorId (Person) | Primary PenName (PenName.id) |
| ------------------------------ | ---------------------------- | ---------------------------- |
| the-quiet-hour                 | muhammad-abdulnasir          | irshand                      |
| letters-to-an-unsent-friend    | nurudeen-abdullah            | inkbynur                     |
| a-field-guide-to-small-wonders | muhammad-abdulnasir          | irshand                      |
| the-winter-ledger              | muhammad-abdulnasir          | irshand                      |
| irshand-verses                 | muhammad-abdulnasir          | irshand                      |

**Source**: `COLLECTION_AUTHOR_PENNAME_MAP` in `scripts/verified-mappings.ts`

---

## Migration SQL (Generated)

**File**: `prisma/migrations/20261009130000_public_read_rls/migration.sql` (RLS policies — apply AFTER content migration). A follow-up hardening migration, `20261009140000_harden_public_content_privileges`, revokes the surplus REFERENCES/TRIGGER/TRUNCATE/MAINTAIN privileges inherited from the `postgres` default ACLs while preserving the anon SELECT grant.

**Content migration**: Run `scripts/migrate-public-library.ts` ONCE manually after schema migration applies.

**Schema migration**: Generate via `prisma migrate dev --name add_content_models` (not yet run).

### Critical: Existing Auth Models Unchanged

The following models/tables are **identical** to current schema:

- `Person` (table `people`) — added `penNames` relation only
- `MemberProfile` (table `member_profiles`) — unchanged
- `UserRole` (table `user_roles`) — unchanged
- `FounderAdmin` (table `founder_admins`) — unchanged
- `AdminAccessRequest` (table `admin_access_requests`) — unchanged
- `LiteraryWorld` (table `literary_worlds`) — added `penNames`, `poems` relations only

**FounderAdmin protections preserved**: DB triggers `trg_founder_admin_insert_role`, `trg_protect_founder_user_role`, `trg_process_admin_access_request` remain intact.

---

## Test Results

```
Test Files  1 passed (1)
Tests      29 passed (29)
```

### Coverage: `src/lib/poem/format.test.ts`

| Category            | Cases                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------- |
| `stanzasToBody`     | 5 (single/multi stanza, empty, single line, punctuation)                                          |
| `bodyToStanzas`     | 10 (LF, CRLF, mixed, trailing/leading newlines, whitespace, empty lines, blank-line preservation) |
| Round-trip          | 4 (simple, multi-stanza, trailing newline, CRLF)                                                  |
| `computeExcerpt`    | 4 (3 lines, <3 lines, empty, empty lines)                                                         |
| `computeLinesCount` | 2 (multi-stanza, empty)                                                                           |
| `computeReadTime`   | 4 (min 1 min, scaling, zero lines)                                                                |

**All conversions verified**: Windows CRLF, empty input, trailing newlines, multiple stanzas, round-trip fidelity.

---

## RLS & Access-Control Strategy

### Public Read (Implemented in `20261009130000_public_read_rls/migration.sql`)

```sql
-- PenNames: all public (for bylines)
CREATE POLICY "public_read_pen_name" ON "PenName" FOR SELECT USING (true);

-- Collections: published only
CREATE POLICY "public_read_published_collection" ON "Collection"
  FOR SELECT USING ("status" = 'PUBLISHED');

-- Poems: published only
CREATE POLICY "public_read_published_poem" ON "Poem"
  FOR SELECT USING ("status" = 'PUBLISHED');

GRANT SELECT ON "PenName" TO anon;
GRANT SELECT ON "Collection" TO anon;
GRANT SELECT ON "Poem" TO anon;
```

### Prisma + RLS Interaction (Critical Verification)

| Connection                   | Role                                           | RLS Enforcement                                                                                                                  |
| ---------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Public App (Prisma)**      | Direct PostgreSQL (PgBouncer) via `DIRECT_URL` | **RLS NOT ENFORCED** — Prisma bypasses PostgREST; `auth.uid()` = NULL. Public reads MUST filter `status = 'PUBLISHED'` in query. |
| **Admin App (Supabase SSR)** | PostgREST via anon key + session cookie        | **RLS ENFORCED** — `auth.uid()` resolves to authenticated user. Admin write policies (future) will check `UserRole`.             |

**Do NOT claim public RLS protects direct Prisma queries.** Public app queries must explicitly `.where({ status: 'PUBLISHED' })`.

### Admin Write Policies (Deferred)

Admin write RLS policies will be added in a **separate migration** AFTER:

1. Admin server functions using `supabase.from('poem')` are implemented
2. `requireAdminUser()` role-checking verified against `UserRole` table
3. Test confirms EDITOR/ADMIN can write via PostgREST with session auth

---

## Migration Order & Rollback Plan

### Phase 1: Schema Migration (Dev)

```bash
cd Muse-Night
npx prisma migrate dev --name add_content_models
# Review generated migration SQL before applying
```

**Rollback**: `npx prisma migrate reset` (dev only) or manual `DROP TABLE` + `DROP TYPE PublicationStatus`

### Phase 2: Content Migration (One-Time Manual)

```bash
cd Muse-Night
# Requires an explicit, editor-approved collection mapping in
# scripts/migration-mappings.ts. The importer validates first and REFUSES to
# write while any collection reference is unresolved.
npx tsx scripts/migrate-public-library.ts
# Verifies: 6 PenNames, 5 Collections, 17 Poems inserted (insert-only)
# Validation errors are reported together BEFORE any write.
```

**Behaviour on rerun**: LiteraryWorld and PenName are upserted (reference data);
Collection and Poem are insert-only, so editorial edits to content are preserved.
A conflicting existing reference row is reported and the run aborts rather than
overwriting it.

**Rollback** (PascalCase physical table names — exactly the imported public records):

```sql
DELETE FROM "Poem" WHERE id IN (
  'lamplight-late-november','salt-for-the-wounded-season','the-quiet-hour',
  'letters-to-an-unsent-friend','a-field-guide-to-small-wonders','cartography-of-longing',
  'the-winter-ledger','night-ferry-to-lisbon','under-the-first-green',
  'wandera-field-notes','aporia-at-the-threshold','serein-after-rain',
  'elyon-the-high-place','the-wondering-kite','inkbynur-between-letters',
  'lamplit-midnight-haiku','coastal-letters-haiku'
);
DELETE FROM "Collection" WHERE id IN (
  'the-quiet-hour','letters-to-an-unsent-friend','a-field-guide-to-small-wonders',
  'the-winter-ledger','irshand-verses'
);
-- PenName / LiteraryWorld are reference data shared with Person; delete only if
-- they were created by this import and no other content depends on them.
DELETE FROM "PenName" WHERE id IN ('irshand','aporia','serein','elyon','wandera','inkbynur');
DELETE FROM "LiteraryWorld" WHERE id = 'child-of-the-wilderness';
```

`Person` rows are never touched by the import.

### Phase 3: RLS Migration (Manual SQL)

```bash
# In Supabase Dashboard SQL Editor or psql:
\i prisma/migrations/20261009130000_public_read_rls/migration.sql
# Verify: SELECT * FROM pg_policies WHERE tablename IN ('PenName','Collection','Poem');
```

**Rollback**:

```sql
DROP POLICY IF EXISTS "public_read_pen_name" ON "PenName";
DROP POLICY IF EXISTS "public_read_published_collection" ON "Collection";
DROP POLICY IF EXISTS "public_read_published_poem" ON "Poem";
ALTER TABLE "PenName" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "Collection" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "Poem" DISABLE ROW LEVEL SECURITY;
```

### Phase 3b: Privilege Hardening (Manual SQL)

```bash
\i prisma/migrations/20261009140000_harden_public_content_privileges/migration.sql
# Verify with the queries in the migration's section 4:
#   - information_schema.role_table_grants (expect: SELECT only, anon only)
#   - pg_default_acl for role postgres in schema public (expect: no rows
#     granting REFERENCES/TRIGGER/TRUNCATE/MAINTAIN to the three API roles)
```

Scope: revokes REFERENCES, TRIGGER, TRUNCATE and MAINTAIN from `anon`,
`authenticated` and `service_role` on exactly three tables ("PenName",
"Collection", "Poem") and from the default table privileges of role `postgres`
in schema `public`. It does NOT touch SELECT (the anon read grant is explicitly
restored), INSERT, UPDATE or DELETE, and does not modify RLS policies, triggers
or any other table.

**Rollback** (re-instate the pre-hardening default ACLs — only if ever needed):

```sql
GRANT REFERENCES, TRIGGER, TRUNCATE, MAINTAIN
  ON TABLE "PenName", "Collection", "Poem"
  TO anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public
  GRANT REFERENCES, TRIGGER, TRUNCATE, MAINTAIN ON TABLES
  TO anon, authenticated, service_role;
```

### Phase 4: Public Read Switch (Code Change)

- Create `src/lib/db/poems.ts` with Prisma queries filtering `status: 'PUBLISHED'`
- Update `src/routes/library/$id.tsx` loader
- Test `/library/lamplight-late-november` renders identically

**Rollback**: Revert route loader → static `LIBRARY_POEMS` serves.

---

## Unresolved Issues

1. **Public App Prisma RLS Bypass**: Confirmed — direct Prisma connection does not enforce RLS. Public queries must filter in code. Documented in `20261009130000_public_read_rls/migration.sql` comments. RLS is **not** expanded to Admin read/write here — that needs a separate review of role checks, grants, and RLS behaviour.

2. **Chapbooks/Gallery/Quotes/HomepageSections**: Deferred per scope restriction. Separate migration later.

3. **Admin Mock Data**: Explicitly excluded. The importer asserts the source id set matches the known public ids exactly, so mock records cannot leak in.

4. **PublishedAt**: No longer fabricated. `publishedAt` is stored as `NULL`; the source `year` is preserved and `sortOrder` carries stable ordering. Editors may set real dates later.

5. **Shadow Database**: Not configured — `prisma migrate diff --from-migrations` unavailable. Migration review must be manual.

6. **LiteraryWorld Seed**: Only 1 record exists (`child-of-the-wilderness`). Migration upserts it.

7. **⛔ BLOCKER — Unresolved collection references (6 poems)**: `LIBRARY_POEMS` references collection ids that do not exist in `COLLECTIONS`:
   - `child-of-the-wilderness` (5 poems: `under-the-first-green`, `wandera-field-notes`, `aporia-at-the-threshold`, `serein-after-rain`, `elyon-the-high-place`) — this is a **LiteraryWorld id misused as collectionId**.
   - `letters-kept-open` (`inkbynur-between-letters`) — a planned InkbyNur collection that was never created.
   - `the-wondering-kite` was also ambiguous but is confirmed to belong to `irshand-verses` (it is listed in that collection's `poemIds`).

   **The importer REFUSES to run while these six remain unmapped.** The mapping is an editorial decision and must be recorded in `scripts/migration-mappings.ts` before import. Do not invent collections and do not silently null the references.

8. **⚠️ DATA ISSUE — Stored `linesCount` disagrees with stanzas (13 poems)**: e.g. `night-ferry-to-lisbon` stores 15 but its stanzas contain 7 lines; `salt-for-the-wounded-season` stores 18 but has 12. The importer treats a mismatch as a validation error, so these must be resolved (fix the source `linesCount`, or confirm the stored values) before import. `readTime` values from the source are preserved as-is (they are part of the public content contract).

9. **Collaborative attribution**: `a-field-guide-to-small-wonders` is displayed as "Irshand & InkbyNur". `Collection.authorId` is a single FK, so the primary pen name (`irshand`) is stored and the full voice list is recorded in `COLLABORATIVE_COLLECTION_AUTHORS` (surfaced as a migration warning). A dedicated collaborator join table would be a future migration.

---

## Status

1. ✅ Schema validated (`npx prisma validate` → valid)
2. ✅ Stanza conversion tests passing (29/29)
3. ✅ Importer validation tests passing (21 tests)
4. ✅ Verified mappings documented
5. ✅ Importer is fail-fast + transactional; content is insert-only; no fabricated `publishedAt`
6. ⛔ **BLOCKED**: 6 unresolved collection references (issue 7) and 13 line-count mismatches (issue 8) must be resolved before the import can run.
7. ⏳ **Next (after unblock)**: Generate & review `prisma migrate dev --name add_content_models`
8. ⏳ **Then**: Run `scripts/migrate-public-library.ts` once
9. ⏳ **Then**: Apply `20261009130000_public_read_rls/migration.sql` in Supabase
10. ⏳ **Then**: Implement `src/lib/db/poems.ts` + switch one route

**The import is NOT ready to run while unresolved collection references remain.**
**No changes to live database, no commits, no pushes yet.**

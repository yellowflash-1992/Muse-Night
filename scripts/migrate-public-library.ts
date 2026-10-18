/**
 * ONE-TIME Migration Script: Import Public Library Content
 *
 * RUN ONCE MANUALLY. Not in seed.
 *
 * Behaviour contract:
 * - FAIL-FAST + TRANSACTIONAL. All validation runs and is reported together
 *   BEFORE any write. The import itself runs in a single interactive
 *   transaction, so a mid-way database error rolls back completely.
 * - INSERT-ONLY for ALL tables. LiteraryWorld, PenName, Collection and Poem are
 *   created only when missing; existing rows are never updated, so editorial
 *   changes survive reruns. If an existing row's identity or relationship
 *   fields conflict with the source (e.g. a PenName pointing at a different
 *   Person), the run FAILS and names the conflicting ID — it never overwrites.
 * - Preserves stable public IDs. Excludes Admin mock records (asserted against
 *   the known-public id sets).
 * - Does NOT fabricate publishedAt: stored as NULL when the true date is unknown.
 *   `year` is preserved as the source value and `sortOrder` carries stable ordering.
 *
 * Prerequisites:
 * 1. Migration applied: PenName, Collection, Poem tables exist
 * 2. Person records exist (seeded via existing seed.ts)
 * 3. LiteraryWorld record exists (seeded via existing seed.ts or added here)
 */

import { PrismaClient } from "../src/generated/prisma/client";

// Import from core asset-free module — safe for plain Node.js/tsx
import {
  PEN_NAMES,
  LIBRARY_POEMS_CORE,
  COLLECTIONS_CORE,
  LITERARY_WORLDS,
  PEOPLE,
} from "../src/data/core/literary-data";
import { COLLECTION_AUTHOR_PENNAME_MAP } from "./verified-mappings";
import { validateMigrationDataset } from "./migration-mappings";
import { stanzasToBody, computeExcerpt, computeLinesCount } from "../src/lib/poem/format";
import { createPrismaPgAdapter, validateConnectionEnv, checkConnectionOnly } from "./db-connection";

const { directUrl, caCertPath } = validateConnectionEnv();
const { adapter } = createPrismaPgAdapter(directUrl, caCertPath);

const prisma = new PrismaClient({ adapter });

async function main() {
  // Check for --check-connection flag
  if (process.argv.includes("--check-connection")) {
    console.log("Running connection check only...");
    try {
      await checkConnectionOnly();
      console.log("Connection check completed successfully.");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("Connection check failed:", message);
      process.exitCode = 1;
    } finally {
      await prisma.$disconnect();
    }
    return;
  }

  console.log("Starting public library migration...");

  // ── Phase 1: validate everything BEFORE any write ──────────────────────────
  const { errors, warnings, resolvedCollections } = validateMigrationDataset({
    poems: LIBRARY_POEMS_CORE,
    collections: COLLECTIONS_CORE,
    penNames: PEN_NAMES,
    literaryWorlds: LITERARY_WORLDS,
    collectionAuthorPenNameMap: COLLECTION_AUTHOR_PENNAME_MAP,
  });

  for (const warning of warnings) {
    console.warn(`  WARNING: ${warning}`);
  }

  if (errors.length > 0) {
    console.error(`\nMigration BLOCKED — ${errors.length} validation error(s):`);
    errors.forEach((message, index) => {
      console.error(`  ${index + 1}. ${message}`);
    });
    throw new Error(
      `Migration aborted before any database write due to ${errors.length} validation error(s). `,
    );
  }

  console.log("  Validation passed. Beginning transactional import...");

  // ── Phase 2: single transaction so a failure rolls back completely ─────────
  // Explicit timeout options to prevent "A query cannot be executed on an expired transaction"
  // maxWait: 10s to acquire transaction, timeout: 60s for the entire transaction
  const result = await prisma.$transaction(
    async (tx) => {
      let collectionsCreated = 0;
      let collectionsSkipped = 0;
      let poemsCreated = 0;
      let poemsSkipped = 0;

      // 0. Person (identity data — CREATE-IF-MISSING ONLY).
      // MUST run FIRST: both LiteraryWorld.creatorId and PenName.personId are
      // foreign keys into "Person" (LiteraryWorld_creatorId_fkey,
      // PenName_personId_fkey). Creating dependents before this parent is what
      // caused the LiteraryWorld_creatorId_fkey violation in the failed import.
      for (const person of Object.values(PEOPLE)) {
        const existing = await tx.person.findUnique({ where: { id: person.id } });
        if (existing) {
          // Identity conflict → fail clearly with the conflicting ID.
          if (existing.legalName !== person.legalName) {
            throw new Error(
              `Conflicting Person "${person.id}": existing legalName "${existing.legalName}" ` +
                `differs from source legalName "${person.legalName}". ` +
                `Row left untouched; transaction rolled back.`,
            );
          }
          console.log(`  Person OK (exists, untouched): ${existing.legalName} (${person.id})`);
          continue;
        }
        await tx.person.create({
          data: {
            id: person.id,
            legalName: person.legalName,
            role: person.role,
            bio: person.bio,
            longBio: person.longBio,
            aesthetic: person.aesthetic,
            // imageUrl is intentionally NULL: images are presentation-layer data.
            imageUrl: null,
          },
        });
        console.log(`  Person CREATED: ${person.legalName} (${person.id})`);
      }

      // 1. LiteraryWorld (reference data — CREATE-IF-MISSING ONLY).
      // Existing rows are never updated, so editorial edits survive reruns.
      // Requires Person rows above (creatorId → Person.id).
      for (const [id, world] of Object.entries(LITERARY_WORLDS)) {
        const existing = await tx.literaryWorld.findUnique({ where: { id } });
        if (existing) {
          // Identity/relationship conflict → fail clearly with the conflicting ID.
          if (existing.creatorId !== world.authorId || existing.name !== world.name) {
            throw new Error(
              `Conflicting LiteraryWorld "${id}": existing (name="${existing.name}", ` +
                `creatorId="${existing.creatorId}") differs from source (name="${world.name}", ` +
                `creatorId="${world.authorId}"). Row left untouched; transaction rolled back.`,
            );
          }
          console.log(`  LiteraryWorld OK (exists, untouched): ${existing.name} (${id})`);
          continue;
        }
        await tx.literaryWorld.create({
          data: {
            id,
            name: world.name,
            creatorId: world.authorId,
            description: world.description,
          },
        });
        console.log(`  LiteraryWorld CREATED: ${world.name} (${id})`);
      }

      // 2. PenNames (reference data — CREATE-IF-MISSING ONLY).
      // Existing rows are never updated (description, name, title, literaryIdentity,
      // isPrimary and literaryWorldId are NOT overwritten from static data).
      for (const [id, penName] of Object.entries(PEN_NAMES)) {
        const existing = await tx.penName.findUnique({ where: { id } });
        if (existing) {
          // Identity/relationship conflict → fail clearly with the conflicting ID.
          if (existing.personId !== penName.personId) {
            throw new Error(
              `Conflicting PenName "${id}": existing personId "${existing.personId}" differs ` +
                `from source personId "${penName.personId}". ` +
                `Row left untouched; transaction rolled back.`,
            );
          }
          console.log(`  PenName OK (exists, untouched): ${existing.name} (${id})`);
          continue;
        }
        await tx.penName.create({
          data: {
            id,
            name: penName.name,
            personId: penName.personId,
            title: penName.title,
            description: penName.description,
            literaryIdentity: penName.literaryIdentity,
            isPrimary: penName.isPrimary ?? false,
            literaryWorldId: penName.literaryIdentity ? "child-of-the-wilderness" : null,
          },
        });
        console.log(`  PenName CREATED: ${penName.name} (${id}) → Person: ${penName.personId}`);
      }

      // 3. Collections (INSERT-ONLY — preserves editorial changes on rerun).
      for (let index = 0; index < COLLECTIONS_CORE.length; index++) {
        const collection = COLLECTIONS_CORE[index];
        const existing = await tx.collection.findUnique({ where: { id: collection.id } });
        if (existing) {
          collectionsSkipped++;
          console.log(`  Collection SKIPPED (exists): ${collection.title} (${collection.id})`);
          continue;
        }

        // Validation phase guarantees this mapping exists.
        const authorPenNameId = COLLECTION_AUTHOR_PENNAME_MAP[collection.id];

        await tx.collection.create({
          data: {
            id: collection.id,
            title: collection.title,
            subtitle: collection.subtitle,
            description: collection.description,
            foreword: collection.foreword,
            featuredQuote: collection.featuredQuote,
            coverImage: null, // Images attached at presentation layer only
            status: "PUBLISHED",
            authorId: authorPenNameId,
            year: collection.year,
            tags: collection.tags,
            // Stable ordering = source array order (COLLECTIONS_CORE index).
            sortOrder: index,
          },
        });
        collectionsCreated++;
        console.log(
          `  Collection CREATED: ${collection.title} (${collection.id}) → Author: ${authorPenNameId}`,
        );
      }

      // 4. Poems (INSERT-ONLY — preserves editorial changes on rerun).
      for (let index = 0; index < LIBRARY_POEMS_CORE.length; index++) {
        const poem = LIBRARY_POEMS_CORE[index];
        const existing = await tx.poem.findUnique({ where: { id: poem.id } });
        if (existing) {
          poemsSkipped++;
          continue;
        }

        // Derive via the single tested source of truth.
        const body = stanzasToBody(poem.stanzas);
        const excerpt = computeExcerpt(poem.stanzas);
        const linesCount = computeLinesCount(poem.stanzas);

        // Preserve the source readTime (public content contract).
        const readTime = poem.readTime;

        // No fabricated dates: real publication date unknown → NULL.
        const collectionId = resolvedCollections.get(poem.id) ?? null;

        await tx.poem.create({
          data: {
            id: poem.id,
            title: poem.title,
            stanzas: poem.stanzas,
            body,
            excerpt,
            status: "PUBLISHED",
            featured: poem.featured ?? false,
            penNameId: poem.penNameId,
            collectionId,
            literaryWorldId: poem.literaryWorldId ?? null,
            tags: poem.tags,
            year: poem.year,
            linesCount,
            readTime,
            note: poem.note ?? null,
            lineNotes: poem.lineNotes ?? null,
            coverImage: null,
            sortOrder: index,
            publishedAt: null,
          },
        });
        poemsCreated++;
      }

      return { collectionsCreated, collectionsSkipped, poemsCreated, poemsSkipped };
    },
    {
      maxWait: 10_000,
      timeout: 60_000,
    },
  );

  console.log(`\nMigration complete:`);
  console.log(
    `  Collections created: ${result.collectionsCreated} (skipped: ${result.collectionsSkipped})`,
  );
  console.log(`  Poems created: ${result.poemsCreated} (skipped: ${result.poemsSkipped})`);
}

main()
  .catch((error) => {
    console.error("Migration failed:", error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

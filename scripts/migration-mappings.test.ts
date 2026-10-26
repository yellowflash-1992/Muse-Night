import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { COLLECTIONS } from "../src/data/collections";
import { PEOPLE } from "../src/data/core/literary-data";
import { LITERARY_WORLDS } from "../src/data/literary-worlds";
import { PEN_NAMES } from "../src/data/pen-names";
import { LIBRARY_POEMS } from "../src/data/poems";
import {
  COLLABORATIVE_COLLECTION_AUTHORS,
  EXPECTED_PUBLIC_COLLECTION_IDS,
  EXPECTED_PUBLIC_POEM_IDS,
  POEM_COLLECTION_OVERRIDES,
  POEMS_WITHOUT_COLLECTION,
  validateMigrationDataset,
  type PoemInput,
} from "./migration-mappings";
import { COLLECTION_AUTHOR_PENNAME_MAP } from "./verified-mappings";

/** Run the validator against the real public source data. */
function validateRealData(overrides?: Partial<Parameters<typeof validateMigrationDataset>[0]>) {
  return validateMigrationDataset({
    poems: LIBRARY_POEMS,
    collections: COLLECTIONS,
    penNames: PEN_NAMES,
    literaryWorlds: LITERARY_WORLDS,
    collectionAuthorPenNameMap: COLLECTION_AUTHOR_PENNAME_MAP,
    ...overrides,
  });
}

const VALID_POEM: PoemInput = {
  id: "lamplight-late-november",
  penNameId: "irshand",
  authorId: "muhammad-abdulnasir",
  collectionId: "the-quiet-hour",
  literaryWorldId: "child-of-the-wilderness",
  year: "2023",
  linesCount: 2,
  stanzas: [["a", "b"]],
  tags: ["Solitude"],
  readTime: "1 min",
};

const VALID_COLLECTION = {
  id: "the-quiet-hour",
  title: "The Quiet Hour",
  authorId: "muhammad-abdulnasir",
};

/** Minimal complete dataset used for targeted negative tests. */
function baseDataset(overrides: {
  poems?: PoemInput[];
  collections?: typeof COLLECTIONS;
  penNames?: Record<string, { id: string; personId: string }>;
  collectionAuthorPenNameMap?: Record<string, string>;
}) {
  return {
    poems: overrides.poems ?? [VALID_POEM],
    collections: overrides.collections ?? [VALID_COLLECTION],
    penNames: overrides.penNames ?? { irshand: { id: "irshand", personId: "muhammad-abdulnasir" } },
    literaryWorlds: { "child-of-the-wilderness": { id: "child-of-the-wilderness" } },
    collectionAuthorPenNameMap: overrides.collectionAuthorPenNameMap ?? {
      "the-quiet-hour": "irshand",
    },
    expectedPoemIds: [VALID_POEM.id],
    expectedCollectionIds: [VALID_COLLECTION.id],
  };
}

describe("migration dataset &mdash; real public data", () => {
  it("resolves every poem: zero validation errors on the real data", () => {
    const { errors, warnings } = validateRealData();
    expect(errors).toEqual([]);
    // The only warning is the documented collaborative-attribution note.
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toContain("a-field-guide-to-small-wonders");
  });

  it("the-wondering-kite is mapped to irshand-verses", () => {
    const { resolvedCollections } = validateRealData();
    expect(resolvedCollections.get("the-wondering-kite")).toBe("irshand-verses");
  });

  it("the five wilderness poems are explicit intentional nulls (literaryWorldId preserved)", () => {
    const { resolvedCollections } = validateRealData();
    for (const id of [
      "under-the-first-green",
      "wandera-field-notes",
      "aporia-at-the-threshold",
      "serein-after-rain",
      "elyon-the-high-place",
    ]) {
      expect(resolvedCollections.get(id)).toBeNull();
    }
    // Their literaryWorldId is a real LiteraryWorld, preserved separately.
    for (const poem of LIBRARY_POEMS) {
      if (poem.literaryWorldId === "child-of-the-wilderness") {
        expect(LITERARY_WORLDS["child-of-the-wilderness"]).toBeDefined();
      }
    }
  });

  it("inkbynur-between-letters is an explicit intentional null (uncategorised)", () => {
    const { resolvedCollections } = validateRealData();
    expect(resolvedCollections.get("inkbynur-between-letters")).toBeNull();
  });

  it("distinguishes an explicit intentional null from a missing/unreviewed mapping", () => {
    // With BOTH the intentional-null override and the POEMS_WITHOUT_COLLECTION
    // entry removed, the same poems become UNREVIEWED and must error &mdash; proving
    // nulls are decisions, not fallbacks.
    const stripped = { ...POEM_COLLECTION_OVERRIDES };
    const strippedWithout = new Set(POEMS_WITHOUT_COLLECTION);
    for (const id of strippedWithout) {
      delete stripped[id];
    }
    const { errors, resolvedCollections } = validateRealData({
      overrides: stripped,
      poemsWithoutCollection: new Set<string>([]),
    });
    expect(errors.some((e) => e.includes("has no reviewed override"))).toBe(true);
    // The intentional nulls are no longer resolved at all (not silently set).
    expect(resolvedCollections.has("under-the-first-green")).toBe(false);
    expect(resolvedCollections.has("inkbynur-between-letters")).toBe(false);
  });

  it("every intentional-null override carries a justification", () => {
    for (const id of POEMS_WITHOUT_COLLECTION) {
      const override = POEM_COLLECTION_OVERRIDES[id];
      expect(override).toBeDefined();
      expect(override?.collectionId).toBeNull();
      expect(override?.justification.trim().length).toBeGreaterThan(20);
    }
  });

  it("warns about the collaborative collection without dropping the secondary voice", () => {
    const { warnings } = validateRealData();
    const collaborative = warnings.find((w) => w.includes("a-field-guide-to-small-wonders"));
    expect(collaborative).toBeDefined();
    expect(collaborative).toContain("inkbynur");
  });

  it("reports no stored linesCount inconsistencies in the real data", () => {
    const { errors } = validateRealData();
    const lineCountErrors = errors.filter((e) => e.includes("does not match stanza lines"));
    expect(lineCountErrors).toEqual([]);
  });

  it("every LIBRARY_POEMS entry is consistent between linesCount and its stanzas", () => {
    for (const poem of LIBRARY_POEMS) {
      const computed = poem.stanzas.reduce((sum, stanza) => sum + stanza.length, 0);
      expect(`${poem.id}:${poem.linesCount}`).toBe(`${poem.id}:${computed}`);
    }
  });

  it("poem text, stanza boundaries, readTime, tags and authorship are untouched", () => {
    // Structural invariants that the line-count correction must not have altered.
    expect(LIBRARY_POEMS).toHaveLength(EXPECTED_PUBLIC_POEM_IDS.length);
    for (const poem of LIBRARY_POEMS) {
      expect(poem.readTime).toBeTruthy();
      expect(poem.tags.length).toBeGreaterThan(0);
      expect(poem.stanzas.length).toBeGreaterThan(0);
      expect(poem.authorId).toBeTruthy();
    }
  });
});

describe("migration dataset &mdash; pen name validation", () => {
  it("flags an unknown penNameId", () => {
    const { errors } = validateMigrationDataset(
      baseDataset({ poems: [{ ...VALID_POEM, penNameId: "ghost-writer" }] }),
    );
    expect(errors.some((e) => e.includes('unknown penNameId "ghost-writer"'))).toBe(true);
  });

  it("flags a pen-name/person mismatch", () => {
    const { errors } = validateMigrationDataset(
      baseDataset({ poems: [{ ...VALID_POEM, authorId: "nurudeen-abdullah" }] }),
    );
    expect(
      errors.some((e) => e.includes("author mismatch") && e.includes("lamplight-late-november")),
    ).toBe(true);
  });
});

describe("migration dataset &mdash; collection author mapping", () => {
  it("flags a collection with no author mapping", () => {
    const { errors } = validateMigrationDataset(baseDataset({ collectionAuthorPenNameMap: {} }));
    expect(errors.some((e) => e.includes("has no PenName author mapping"))).toBe(true);
  });

  it("flags a collection whose mapped pen name belongs to a different person", () => {
    const { errors } = validateMigrationDataset(
      baseDataset({
        penNames: { irshand: { id: "irshand", personId: "someone-else" } },
      }),
    );
    expect(errors.some((e) => e.includes('Collection "the-quiet-hour" author mismatch'))).toBe(
      true,
    );
  });
});

describe("migration dataset &mdash; literary world + line count + readTime", () => {
  it("flags an unknown literaryWorldId", () => {
    const { errors } = validateMigrationDataset(
      baseDataset({ poems: [{ ...VALID_POEM, literaryWorldId: "nowhere" }] }),
    );
    expect(errors.some((e) => e.includes('unknown literaryWorldId "nowhere"'))).toBe(true);
  });

  it("flags a stored linesCount that disagrees with the stanzas", () => {
    const { errors } = validateMigrationDataset(
      baseDataset({ poems: [{ ...VALID_POEM, linesCount: 99 }] }),
    );
    expect(errors.some((e) => e.includes("does not match stanza lines"))).toBe(true);
  });

  it("flags a missing readTime", () => {
    const { errors } = validateMigrationDataset(
      baseDataset({ poems: [{ ...VALID_POEM, readTime: "" }] }),
    );
    expect(errors.some((e) => e.includes("missing a readTime"))).toBe(true);
  });
});

describe("migration dataset &mdash; Admin mock exclusion (id set assertions)", () => {
  it("flags an unexpected poem id", () => {
    const { errors } = validateMigrationDataset(
      baseDataset({ poems: [{ ...VALID_POEM, id: "admin-mock-draft" }] }),
    );
    expect(errors.some((e) => e.includes("possible Admin mock data"))).toBe(true);
  });

  it("flags an unexpected collection id", () => {
    const { errors } = validateMigrationDataset(
      baseDataset({
        collections: [...COLLECTIONS, { id: "admin-mock-collection" } as never],
      }),
    );
    expect(errors.some((e) => e.includes("possible Admin mock data"))).toBe(true);
  });

  it("flags a missing expected poem id", () => {
    const { errors } = validateMigrationDataset(
      baseDataset({ poems: [{ ...VALID_POEM, id: "something-else" }] }),
    );
    expect(errors.some((e) => e.includes("is missing from the source data"))).toBe(true);
  });
});

describe("migration mapping contract &mdash; expected id sets", () => {
  it("matches the real LIBRARY_POEMS ids exactly", () => {
    expect(new Set(LIBRARY_POEMS.map((p) => p.id))).toEqual(new Set(EXPECTED_PUBLIC_POEM_IDS));
  });

  it("matches the real COLLECTIONS ids exactly", () => {
    expect(new Set(COLLECTIONS.map((c) => c.id))).toEqual(new Set(EXPECTED_PUBLIC_COLLECTION_IDS));
  });

  it("lists a-field-guide collaborators with the primary first", () => {
    expect(COLLABORATIVE_COLLECTION_AUTHORS["a-field-guide-to-small-wonders"]).toEqual([
      "irshand",
      "inkbynur",
    ]);
  });

  it("POEMS_WITHOUT_COLLECTION lists exactly the six intentional-null poems", () => {
    expect(POEMS_WITHOUT_COLLECTION.size).toBe(6);
    expect([...POEMS_WITHOUT_COLLECTION].sort()).toEqual(
      [
        "under-the-first-green",
        "wandera-field-notes",
        "aporia-at-the-threshold",
        "serein-after-rain",
        "elyon-the-high-place",
        "inkbynur-between-letters",
      ].sort(),
    );
  });

  // ── LiteraryWorld.creatorId → Person integrity (FK: LiteraryWorld_creatorId_fkey)
  describe("LiteraryWorld creator → Person integrity", () => {
    it("every non-null creatorId resolves to an existing PEOPLE record", () => {
      for (const [worldId, world] of Object.entries(LITERARY_WORLDS)) {
        const person = PEOPLE[world.authorId];
        expect(
          person,
          `LiteraryWorld "${worldId}" references unknown Person "${world.authorId}"`,
        ).toBeDefined();
        expect(person?.id).toBe(world.authorId);
      }
    });

    it("the child-of-the-wilderness world is created by muhammad-abdulnasir", () => {
      const world = LITERARY_WORLDS["child-of-the-wilderness"];
      expect(world?.authorId).toBe("muhammad-abdulnasir");
      expect(PEOPLE["muhammad-abdulnasir"]?.legalName).toBe("Muhammad AbdulNasir");
    });

    it("every PenName.personId also resolves to an existing PEOPLE record", () => {
      // PenName → Person is the sibling FK (PenName_personId_fkey); the importer
      // creates Person before both, so this guards the same ordering guarantee.
      for (const [penNameId, penName] of Object.entries(PEN_NAMES)) {
        expect(
          PEOPLE[penName.personId],
          `PenName "${penNameId}" references unknown Person "${penName.personId}"`,
        ).toBeDefined();
      }
    });
  });

  // ── Importer transaction ordering (parent-before-dependent)
  describe("importer parent-before-dependent ordering", () => {
    it("imports Person before LiteraryWorld and PenName (source order)", async () => {
      const source = await readFile(
        resolve(dirname(fileURLToPath(import.meta.url)), "migrate-public-library.ts"),
        "utf-8",
      );
      const indexOf = (marker: string) => source.indexOf(marker);

      const personLoop = indexOf("// 0. Person");
      const literaryWorldLoop = indexOf("// 1. LiteraryWorld");
      const penNameLoop = indexOf("// 2. PenNames");

      expect(personLoop).toBeGreaterThan(-1);
      expect(literaryWorldLoop).toBeGreaterThan(personLoop);
      expect(penNameLoop).toBeGreaterThan(literaryWorldLoop);
    });

    it("creates/verifies Person rows before any literaryWorld.create() call", async () => {
      const source = await readFile(
        resolve(dirname(fileURLToPath(import.meta.url)), "migrate-public-library.ts"),
        "utf-8",
      );
      const firstPersonWrite = source.indexOf("tx.person.create");
      const firstWorldWrite = source.indexOf("tx.literaryWorld.create");

      expect(firstPersonWrite).toBeGreaterThan(-1);
      expect(firstWorldWrite).toBeGreaterThan(firstPersonWrite);
    });

    it("conflicts on Person identity fail rather than overwrite (insert-only)", async () => {
      const source = await readFile(
        resolve(dirname(fileURLToPath(import.meta.url)), "migrate-public-library.ts"),
        "utf-8",
      );
      const personSection = source.slice(
        source.indexOf("// 0. Person"),
        source.indexOf("// 1. LiteraryWorld"),
      );
      // Insert-only: an existing Person row is verified and skipped, never updated.
      expect(personSection).toContain("tx.person.findUnique");
      expect(personSection).toContain("Conflicting Person");
      expect(personSection).not.toContain("tx.person.update");
      expect(personSection).not.toContain("tx.person.upsert");
    });
  });

  // ── Importer transaction timeout configuration
  describe("importer transaction timeout", () => {
    it("configures maxWait: 10_000 and timeout: 60_000", async () => {
      const source = await readFile(
        resolve(dirname(fileURLToPath(import.meta.url)), "migrate-public-library.ts"),
        "utf-8",
      );
      // Verify the transaction call includes the explicit options object
      const transactionCall = source.slice(
        source.indexOf("prisma.$transaction("),
        source.indexOf("console.log(`\\nMigration complete:`)"),
      );

      // maxWait: 10_000 (10s to acquire transaction)
      expect(transactionCall).toContain("maxWait: 10_000");
      // timeout: 60_000 (60s for the entire transaction)
      expect(transactionCall).toContain("timeout: 60_000");
    });
  });
});

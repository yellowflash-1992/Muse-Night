/**
 * Migration mapping contract + pure validators.
 *
 * This module is DB-free and side-effect-free so it can be unit tested offline.
 * `scripts/migrate-public-library.ts` consumes it; it never writes to the database.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * INTENTIONAL COLLECTION OVERRIDES (conservative &mdash; no invented groupings)
 * ─────────────────────────────────────────────────────────────────────────────
 * The real public data declares collection ids that do not exist in COLLECTIONS:
 *
 *   - "child-of-the-wilderness"  (6 poems) &mdash; this is a **LiteraryWorld id**, not a
 *     Collection. It is misused as `collectionId` while the same value is the
 *     poem's `literaryWorldId`. The LiteraryWorld membership is preserved; the
 *     bogus Collection membership is resolved below.
 *
 *   - "letters-kept-open"        (1 poem)  &mdash; a planned InkbyNur collection that
 *     was never added to COLLECTIONS. It is NOT safe to assume it equals
 *     `letters-to-an-unsent-friend` (different year/title/cycle).
 *
 * These overrides are INTENTIONAL and conservative. They exist so the import can
 * proceed without inventing literary groupings. Every override is explicit; a
 * poem id absent from this map (and absent from POEMS_WITHOUT_COLLECTION) is an
 * error, so a missing or unreviewed mapping can never be mistaken for a decision.
 *
 * NOTE: an explicit `null` below is a reviewed decision and is DISTINCT from a
 * missing mapping. The validator tracks the two separately.
 */

/**
 * Explicit override map: poem.id → verified collectionId.
 *
 * `collectionId: null` means "this poem intentionally has no Collection record".
 * A `null` here is a deliberate, reviewed decision &mdash; never a fallback for a
 * missing record. Every entry must carry a `justification` for audit.
 */
export interface CollectionOverride {
  collectionId: string | null;
  /** Editor/issue reference that authorised this mapping. Required for audit. */
  justification: string;
}

/**
 * Rationale text reused by the intentional-null overrides so the reasoning is
 * recorded once and identical across the five wilderness poems.
 */
const NO_COLLECTION_JUSTIFICATION =
  "Intentional override: source collectionId 'child-of-the-wilderness' is a " +
  "LiteraryWorld id, not a Collection. No real Collection groups this poem; " +
  "literaryWorldId is preserved. Avoids inventing a literary grouping.";

export const POEM_COLLECTION_OVERRIDES: Record<string, CollectionOverride> = {
  // Confirmed membership: listed in irshand-verses.poemIds (source of truth).
  "the-wondering-kite": {
    collectionId: "irshand-verses",
    justification: 'Listed in COLLECTIONS["irshand-verses"].poemIds (source of truth).',
  },

  // Five wilderness poems whose collectionId duplicated the literaryWorldId.
  // They are in no collection.poemIds, so we assign an explicit null rather
  // than guess a grouping. Their literaryWorldId is preserved separately.
  "under-the-first-green": { collectionId: null, justification: NO_COLLECTION_JUSTIFICATION },
  "wandera-field-notes": { collectionId: null, justification: NO_COLLECTION_JUSTIFICATION },
  "aporia-at-the-threshold": { collectionId: null, justification: NO_COLLECTION_JUSTIFICATION },
  "serein-after-rain": { collectionId: null, justification: NO_COLLECTION_JUSTIFICATION },
  "elyon-the-high-place": { collectionId: null, justification: NO_COLLECTION_JUSTIFICATION },

  // `letters-kept-open` never existed as a Collection. Until it is defined (or
  // the intended collection is verified) this poem is intentionally uncategorised.
  "inkbynur-between-letters": {
    collectionId: null,
    justification:
      "Intentional override: 'letters-kept-open' is not a real Collection and " +
      "must not be conflated with 'letters-to-an-unsent-friend'. Awaiting a " +
      "verified collection; left uncategorised to avoid inventing a grouping.",
  },
};

/**
 * Collection ids that intentionally have no Collection record. Kept in sync with
 * the null entries in POEM_COLLECTION_OVERRIDES so both representations agree.
 */
export const POEMS_WITHOUT_COLLECTION: ReadonlySet<string> = new Set<string>([
  "under-the-first-green",
  "wandera-field-notes",
  "aporia-at-the-threshold",
  "serein-after-rain",
  "elyon-the-high-place",
  "inkbynur-between-letters",
]);

/**
 * Known public poem ids. The importer asserts the source set matches exactly,
 * so Admin mock records (or future additions) cannot leak in silently.
 */
export const EXPECTED_PUBLIC_POEM_IDS: readonly string[] = [
  "lamplight-late-november",
  "salt-for-the-wounded-season",
  "the-quiet-hour",
  "letters-to-an-unsent-friend",
  "a-field-guide-to-small-wonders",
  "cartography-of-longing",
  "the-winter-ledger",
  "night-ferry-to-lisbon",
  "under-the-first-green",
  "wandera-field-notes",
  "aporia-at-the-threshold",
  "serein-after-rain",
  "elyon-the-high-place",
  "the-wondering-kite",
  "inkbynur-between-letters",
  "lamplit-midnight-haiku",
  "coastal-letters-haiku",
];

/**
 * Known public collection ids. Used to assert that the migration does not
 * import unexpected collections (e.g. Admin mock collections).
 */
export const EXPECTED_PUBLIC_COLLECTION_IDS: readonly string[] = [
  "the-quiet-hour",
  "letters-to-an-unsent-friend",
  "a-field-guide-to-small-wonders",
  "the-winter-ledger",
  "irshand-verses",
];

/**
 * Collaborative collections whose public attribution is more than one pen name.
 * `Collection.authorId` is a single FK, so the additional voices are recorded
 * explicitly here and surfaced as a migration warning for editors rather than
 * being silently dropped.
 *
 * Source: collections.ts `author` display string ("Irshand & InkbyNur").
 */
export const COLLABORATIVE_COLLECTION_AUTHORS: Record<string, string[]> = {
  "a-field-guide-to-small-wonders": ["irshand", "inkbynur"],
};

/**
 * Shapes the validator needs. Kept structural (not imported from src/data) so
 * the validator can be tested with hand-built fixtures and cannot accidentally
 * pull in a database client.
 */
export interface PoemInput {
  id: string;
  penNameId: string;
  authorId: string;
  collectionId: string;
  literaryWorldId?: string;
  year: string;
  linesCount: number;
  stanzas: string[][];
  tags: string[];
  readTime: string;
  note?: string;
  lineNotes?: Record<number, { count: number; excerpt: string }>;
  featured?: boolean;
}

export interface CollectionInput {
  id: string;
  title: string;
  authorId: string;
}

export interface PenNameInput {
  id: string;
  personId: string;
}

export interface LiteraryWorldInput {
  id: string;
}

export interface ValidationResult {
  errors: string[];
  warnings: string[];
  /** Resolved poem.id → collectionId (string) or null when intentionally uncategorised. */
  resolvedCollections: Map<string, string | null>;
}

/**
 * Pure validation of the migration dataset. Collects ALL problems rather than
 * throwing on the first, so a single run reports every unresolved mapping.
 *
 * Checks performed:
 *  1. Source set matches the expected public ids exactly (blocks Admin mocks).
 *  2. Every poem.penNameId exists in the pen-name source.
 *  3. The pen name's personId matches the poem's authorId.
 *  4. Every poem's collection reference resolves to a real Collection, either via
 *     source data (collectionId already in collections) or an explicit override.
 *  5. Every poem's literaryWorldId resolves to a real LiteraryWorld.
 *  6. Every collection's authorId resolves via the collection→pen-name map.
 *  7. Stored linesCount matches the stanza-derived count.
 *  8. readTime is present (part of the public content contract).
 */
export function validateMigrationDataset(params: {
  poems: readonly PoemInput[];
  collections: readonly CollectionInput[];
  penNames: Record<string, PenNameInput>;
  literaryWorlds: Record<string, LiteraryWorldInput>;
  collectionAuthorPenNameMap: Record<string, string>;
  overrides?: Record<string, CollectionOverride>;
  poemsWithoutCollection?: ReadonlySet<string>;
  expectedPoemIds?: readonly string[];
  expectedCollectionIds?: readonly string[];
  collaborativeCollectionAuthors?: Record<string, string[]>;
}): ValidationResult {
  const {
    poems,
    collections,
    penNames,
    literaryWorlds,
    collectionAuthorPenNameMap,
    overrides = POEM_COLLECTION_OVERRIDES,
    poemsWithoutCollection = POEMS_WITHOUT_COLLECTION,
    expectedPoemIds = EXPECTED_PUBLIC_POEM_IDS,
    expectedCollectionIds = EXPECTED_PUBLIC_COLLECTION_IDS,
    collaborativeCollectionAuthors = COLLABORATIVE_COLLECTION_AUTHORS,
  } = params;

  const errors: string[] = [];
  const warnings: string[] = [];
  const resolvedCollections = new Map<string, string | null>();

  const collectionIds = new Set(collections.map((c) => c.id));
  const penNameIds = new Set(Object.keys(penNames));

  // 1. Exact set match &mdash; blocks Admin mock data and unannounced additions.
  const actualPoemIds = new Set(poems.map((p) => p.id));
  const expectedSet = new Set(expectedPoemIds);
  for (const id of actualPoemIds) {
    if (!expectedSet.has(id)) {
      errors.push(
        `Unexpected poem id "${id}" is not in the known public set (possible Admin mock data).`,
      );
    }
  }
  for (const id of expectedSet) {
    if (!actualPoemIds.has(id)) {
      errors.push(`Expected public poem id "${id}" is missing from the source data.`);
    }
  }

  const actualCollectionIds = new Set(collections.map((c) => c.id));
  const expectedCollectionSet = new Set(expectedCollectionIds);
  for (const id of actualCollectionIds) {
    if (!expectedCollectionSet.has(id)) {
      errors.push(
        `Unexpected collection id "${id}" is not in the known public set (possible Admin mock data).`,
      );
    }
  }

  // 6. Collection author mappings.
  for (const collection of collections) {
    const authorPenNameId = collectionAuthorPenNameMap[collection.id];
    if (!authorPenNameId) {
      errors.push(
        `Collection "${collection.id}" has no PenName author mapping (COLLECTION_AUTHOR_PENNAME_MAP).`,
      );
      continue;
    }
    if (!penNameIds.has(authorPenNameId)) {
      errors.push(`Collection "${collection.id}" maps to unknown PenName "${authorPenNameId}".`);
      continue;
    }
    const penName = penNames[authorPenNameId];
    if (penName && penName.personId !== collection.authorId) {
      errors.push(
        `Collection "${collection.id}" author mismatch: source authorId "${collection.authorId}" ` +
          `but PenName "${authorPenNameId}" belongs to "${penName.personId}".`,
      );
    }

    const collaborators = collaborativeCollectionAuthors[collection.id];
    if (collaborators && collaborators.length > 1) {
      const extra = collaborators.filter((id) => id !== authorPenNameId);
      warnings.push(
        `Collection "${collection.id}" is collaborative (${collaborators.join(" & ")}). ` +
          `Collection.authorId stores the primary pen name "${authorPenNameId}"; ` +
          `additional voices [${extra.join(", ")}] are recorded in COLLECTION_COLLABORATORS for editor review.`,
      );
    }
  }

  for (const poem of poems) {
    // 2. Pen name exists.
    const penName = penNames[poem.penNameId];
    if (!penName) {
      errors.push(`Poem "${poem.id}" references unknown penNameId "${poem.penNameId}".`);
    } else if (penName.personId !== poem.authorId) {
      // 3. Person match.
      errors.push(
        `Poem "${poem.id}" author mismatch: authorId "${poem.authorId}" but ` +
          `penNameId "${poem.penNameId}" belongs to "${penName.personId}".`,
      );
    }

    // 4. Collection reference resolution.
    //
    // Resolution order is deliberate so that an EXPLICIT intentional null is
    // distinguished from a MISSING / UNREVIEWED mapping:
    //   a) an override whose collectionId is `null` → reviewed decision (valid).
    //   b) an override pointing at a real Collection        → reviewed decision.
    //   c) a real Collection already on the poem            → no override needed.
    //   d) id listed in POEMS_WITHOUT_COLLECTION            → reviewed decision.
    //   e) anything else                                    → ERROR (unreviewed).
    const hasOverride = Object.prototype.hasOwnProperty.call(overrides, poem.id);
    const override = hasOverride ? overrides[poem.id] : undefined;

    if (override && override.collectionId === null) {
      // (a) Explicit intentional null &mdash; distinct from a missing mapping.
      resolvedCollections.set(poem.id, null);
    } else if (override && !collectionIds.has(override.collectionId as string)) {
      errors.push(
        `Poem "${poem.id}" override points at unknown collection "${override.collectionId}".`,
      );
    } else if (override) {
      // (b) Explicit override to a real Collection.
      resolvedCollections.set(poem.id, override.collectionId);
    } else if (collectionIds.has(poem.collectionId)) {
      // (c) Source collectionId is already a real Collection.
      resolvedCollections.set(poem.id, poem.collectionId);
    } else if (poemsWithoutCollection.has(poem.id)) {
      // (d) Explicit intentional null via the id set.
      resolvedCollections.set(poem.id, null);
    } else {
      // (e) Unreviewed / missing mapping.
      errors.push(
        `Poem "${poem.id}" references collection "${poem.collectionId}" which does not exist ` +
          `in COLLECTIONS and has no reviewed override in POEM_COLLECTION_OVERRIDES.`,
      );
    }

    // 5. Literary world reference.
    if (poem.literaryWorldId && !literaryWorlds[poem.literaryWorldId]) {
      errors.push(
        `Poem "${poem.id}" references unknown literaryWorldId "${poem.literaryWorldId}".`,
      );
    }

    // 7. Line count consistency.
    const derivedLines = poem.stanzas.reduce((sum, stanza) => sum + stanza.length, 0);
    if (poem.linesCount !== derivedLines) {
      errors.push(
        `Poem "${poem.id}" linesCount (${poem.linesCount}) does not match stanza lines (${derivedLines}).`,
      );
    }

    // 8. readTime present.
    if (!poem.readTime || poem.readTime.trim() === "") {
      errors.push(`Poem "${poem.id}" is missing a readTime value.`);
    }
  }

  return { errors, warnings, resolvedCollections };
}

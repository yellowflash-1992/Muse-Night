/**
 * Verified Collection → PenName Author Mapping
 *
 * Source: Muse-Night/src/data/collections.ts (authorId → Person.id)
 * Target: Collection.authorId → PenName.id (must be PenName, not Person)
 *
 * Mapping rule: Each Collection.authorId (Person.id) maps to that Person's PRIMARY PenName.
 * Verified from pen-names.ts: primaryPenNameByPersonId
 */

export const COLLECTION_AUTHOR_PENNAME_MAP: Record<string, string> = {
  // Collection.id → PenName.id
  "the-quiet-hour": "irshand", // authorId: muhammad-abdulnasir → primary: irshand
  "letters-to-an-unsent-friend": "inkbynur", // authorId: nurudeen-abdullah → primary: inkbynur
  "a-field-guide-to-small-wonders": "irshand", // authorId: muhammad-abdulnasir → primary: irshand (collaborative, but primary author)
  "the-winter-ledger": "irshand", // authorId: muhammad-abdulnasir → primary: irshand
  "irshand-verses": "irshand", // authorId: muhammad-abdulnasir → primary: irshand
};

/**
 * Verified Poem → PenName Mapping
 * Source: poems.ts penNameId field (already PenName.id)
 * No transformation needed - poems already reference PenName directly.
 */

/**
 * Verified Person → PenNames (One-to-Many)
 * Source: pen-names.ts PEN_NAMES personId field
 */
export const PERSON_TO_PENNAMES: Record<string, string[]> = {
  "muhammad-abdulnasir": ["irshand", "aporia", "serein", "elyon", "wandera"],
  "nurudeen-abdullah": ["inkbynur"],
};

/**
 * Verified LiteraryWorld → PenNames
 * Source: literary-worlds.ts penNameIds array
 */
export const LITERARY_WORLD_TO_PENNAMES: Record<string, string[]> = {
  "child-of-the-wilderness": ["irshand", "aporia", "serein", "elyon", "wandera"],
};

/**
 * Verified Poem → LiteraryWorld
 * Source: poems.ts literaryWorldId field
 * All poems with literaryWorldId reference 'child-of-the-wilderness'
 */

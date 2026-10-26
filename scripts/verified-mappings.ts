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
  &ldquo;the-quiet-hour&ldquo;: &ldquo;irshand&ldquo;, // authorId: muhammad-abdulnasir → primary: irshand
  &ldquo;letters-to-an-unsent-friend&ldquo;: &ldquo;inkbynur&ldquo;, // authorId: nurudeen-abdullah → primary: inkbynur
  &ldquo;a-field-guide-to-small-wonders&ldquo;: &ldquo;irshand&ldquo;, // authorId: muhammad-abdulnasir → primary: irshand (collaborative, but primary author)
  &ldquo;the-winter-ledger&ldquo;: &ldquo;irshand&ldquo;, // authorId: muhammad-abdulnasir → primary: irshand
  &ldquo;irshand-verses&ldquo;: &ldquo;irshand&ldquo;, // authorId: muhammad-abdulnasir → primary: irshand
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
  &ldquo;muhammad-abdulnasir&ldquo;: [&ldquo;irshand&ldquo;, &ldquo;aporia&ldquo;, &ldquo;serein&ldquo;, &ldquo;elyon&ldquo;, &ldquo;wandera&ldquo;],
  &ldquo;nurudeen-abdullah&ldquo;: [&ldquo;inkbynur&ldquo;],
};

/**
 * Verified LiteraryWorld → PenNames
 * Source: literary-worlds.ts penNameIds array
 */
export const LITERARY_WORLD_TO_PENNAMES: Record<string, string[]> = {
  &ldquo;child-of-the-wilderness&ldquo;: [&ldquo;irshand&ldquo;, &ldquo;aporia&ldquo;, &ldquo;serein&ldquo;, &ldquo;elyon&ldquo;, &ldquo;wandera&ldquo;],
};

/**
 * Verified Poem → LiteraryWorld
 * Source: poems.ts literaryWorldId field
 * All poems with literaryWorldId reference 'child-of-the-wilderness'
 */

import type { Collection, Poem } from "@/data/literature";

/**
 * Compatibility resolver for the current static seed model.
 *
 * In the current static dataset, collection membership is represented in a dual,
 * denormalized form (both `Poem.collectionId` and `Collection.poemIds`).
 * This adapter isolates that membership resolution and preserves explicit collection
 * `poemIds` ordering where possible.
 *
 * Later, this can be replaced by a database `collection_poems` relation without
 * changing the page UI or route contracts.
 */
export function getCollectionPoems(collection: Collection, availablePoems: Poem[]): Poem[] {
  const poemMap = new Map<string, Poem>(availablePoems.map((p) => [p.id, p]));

  // Track added IDs to avoid duplicates while preserving order
  const resolvedIds = new Set<string>();
  const resolvedPoems: Poem[] = [];

  // 1. First add poems in the order specified by collection.poemIds
  for (const id of collection.poemIds) {
    const poem = poemMap.get(id);
    if (poem && !resolvedIds.has(poem.id)) {
      resolvedIds.add(poem.id);
      resolvedPoems.push(poem);
    }
  }

  // 2. Include any additional poems whose collectionId matches collection.id
  for (const poem of availablePoems) {
    if (poem.collectionId === collection.id && !resolvedIds.has(poem.id)) {
      resolvedIds.add(poem.id);
      resolvedPoems.push(poem);
    }
  }

  return resolvedPoems;
}

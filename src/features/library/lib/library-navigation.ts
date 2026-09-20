import type { Poem } from "@/data/literature";

export interface PoemNavigation {
  previous: Poem | undefined;
  next: Poem | undefined;
}

export interface LibraryNavigationOptions {
  from?: string | null;
}

export function resolveNavigationPoems(availablePoems: Poem[], fromString?: string | null): Poem[] {
  if (!fromString) {
    return availablePoems;
  }

  const ids = fromString.split(",").filter(Boolean);
  if (ids.length === 0) {
    return availablePoems;
  }

  const poemsMap = new Map(availablePoems.map((p) => [p.id, p]));
  const resolved = ids
    .map((poemId) => poemsMap.get(poemId))
    .filter((poem): poem is Poem => poem !== undefined);

  return resolved.length > 0 ? resolved : availablePoems;
}

export function getPoemNavigation(poems: Poem[], currentPoemId: string): PoemNavigation {
  const currentIndex = poems.findIndex((poem) => poem.id === currentPoemId);

  if (currentIndex === -1 || poems.length <= 1) {
    return {
      previous: undefined,
      next: undefined,
    };
  }

  const previous = currentIndex > 0 ? poems[currentIndex - 1] : undefined;
  const next = currentIndex < poems.length - 1 ? poems[currentIndex + 1] : undefined;

  return {
    previous,
    next,
  };
}

import {
  POEMS_CORE,
  LIBRARY_POEMS_CORE,
  type PoemCore,
  type PoemCore as Poem,
} from "./core/literary-data";

export type { Poem };

export const POEMS = POEMS_CORE;
export const LIBRARY_POEMS = LIBRARY_POEMS_CORE;

export function getPoemById(id: string): Poem | undefined {
  return POEMS.find((p) => p.id === id);
}

export function getLibraryPoemById(id: string): Poem | undefined {
  return LIBRARY_POEMS.find((p) => p.id === id) ?? POEMS.find((p) => p.id === id);
}

/**
 * Server-side read path for public poem data.
 *
 * This module contains the raw Prisma query logic and is ONLY imported by
 * `poems.functions.ts` which wraps it in `createServerFn`.
 * It must never be imported by route files or client components.
 */

import { prisma } from "@/lib/prisma";

/**
 * Published poem with the relations the public reader needs.
 * Shape mirrors `Poem.findFirst/findMany({ include: {...} })` output, but is
 * declared structurally so the mapper can be unit tested without Prisma.
 */
export interface PublishedPoemRow {
  id: string;
  title: string;
  stanzas: string[][];
  excerpt: string | null;
  status: string;
  featured: boolean;
  tags: string[];
  year: string;
  linesCount: number;
  readTime: string;
  note: string | null;
  lineNotes: Record<number, { count: number; excerpt: string }> | null;
  sortOrder: number;
  // publishedAt is intentionally NOT selected: it is null in the dev data and
  // must not leak into the UI as a fabricated publication date.
  penName: { id: string; name: string };
  collection: { id: string; title: string; author: string; status: string } | null;
  literaryWorld: { id: string; name: string } | null;
}

/**
 * Maps a Prisma poem row to the shape consumed by `LibraryPoemPage` /
 * `LibraryPoemReader` (the `Poem` type from `src/data/core/literary-data.ts`).
 *
 * Pure function — no Prisma import, fully unit-testable offline.
 *
 * Rules:
 *  - `stanzas` passes through verbatim (never reconstructed from `body`).
 *  - `collection` becomes `collectionId` + `collection` title; when the poem has
 *    no collection (intentional for six dev poems) both are `null`.
 *  - A related collection is only exposed when ITS status is PUBLISHED; the
 *    poem itself has already been filtered to PUBLISHED by the query.
 *  - The collection's `author` display string is preserved, which keeps the
 *    collaborative attribution ("Irshand & InkbyNur") intact.
 *  - No publication date is invented: `publishedAt` is never read.
 */
export interface UiPoem {
  id: string;
  title: string;
  author: string;
  authorId: string;
  penNameId: string;
  /** "" when the collection is absent or not PUBLISHED. */
  collection: string;
  /** "" when the collection is absent or not PUBLISHED. */
  collectionId: string;
  collectionAuthor: string | null;
  literaryWorldId?: string;
  literaryWorldName: string | null;
  year: string;
  linesCount: number;
  readTime: string;
  tags: string[];
  stanzas: string[][];
  note?: string;
  featured: boolean;
  lineNotes?: Record<number, { count: number; excerpt: string }>;
}

export function mapPoemRowToUi(row: PublishedPoemRow): UiPoem {
  const collectionVisible = row.collection !== null && row.collection.status === "PUBLISHED";

  return {
    id: row.id,
    title: row.title,
    stanzas: row.stanzas,
    author: row.penName.name,
    authorId: row.penName.id,
    penNameId: row.penName.id,
    // PoemCore requires strings; "" marks an intentionally unassigned
    // collection. The UI guards on collectionId, so no title is ever invented.
    collectionId: collectionVisible ? row.collection!.id : "",
    collection: collectionVisible ? row.collection!.title : "",
    year: row.year,
    linesCount: row.linesCount,
    readTime: row.readTime,
    tags: row.tags,
    featured: row.featured,
    collectionAuthor: collectionVisible ? row.collection!.author : null,
    literaryWorldName: row.literaryWorld?.name ?? null,
    // Optional fields set only when present (exactOptionalPropertyTypes-safe).
    ...(row.note !== null ? { note: row.note } : {}),
    ...(row.lineNotes !== null ? { lineNotes: row.lineNotes } : {}),
    ...(row.literaryWorld ? { literaryWorldId: row.literaryWorld.id } : {}),
    // publishedAt intentionally absent — no fabricated dates.
  };
}

/**
 * Fetches one published poem by id with its public relations.
 * Returns `null` when the poem does not exist or is not PUBLISHED.
 */
export async function getPublishedPoemRaw(id: string): Promise<UiPoem | null> {
  const row = await prisma.poem.findFirst({
    where: { id, status: "PUBLISHED" },
    select: {
      id: true,
      title: true,
      stanzas: true,
      excerpt: true,
      status: true,
      featured: true,
      tags: true,
      year: true,
      linesCount: true,
      readTime: true,
      note: true,
      lineNotes: true,
      sortOrder: true,
      penName: { select: { id: true, name: true } },
      collection: { select: { id: true, title: true, author: true, status: true } },
      literaryWorld: { select: { id: true, name: true } },
    },
  });

  if (!row) {
    return null;
  }
  // Serialize explicitly to a plain JSON-compatible object so the server-fn
  // boundary accepts the mapped shape.
  const mapped = mapPoemRowToUi(row as unknown as PublishedPoemRow);
  return JSON.parse(JSON.stringify(mapped)) as UiPoem;
}

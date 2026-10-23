/**
 * Server-side read path for public poem data.
 * Only imported by `poems.functions.ts` — never by routes or client components.
 */

import { prisma } from "@/lib/prisma";

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
  penName: { id: string; name: string };
  collection: {
    id: string;
    title: string;
    status: string;
    author: { name: string };
  } | null;
  literaryWorld: { id: string; name: string } | null;
}

export interface UiPoem {
  id: string;
  title: string;
  author: string;
  authorId: string;
  penNameId: string;
  collection: string;
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
    collectionId: collectionVisible ? row.collection!.id : "",
    collection: collectionVisible ? row.collection!.title : "",
    year: row.year,
    linesCount: row.linesCount,
    readTime: row.readTime,
    tags: row.tags,
    featured: row.featured,
    collectionAuthor: collectionVisible ? row.collection!.author.name : null,
    literaryWorldName: row.literaryWorld?.name ?? null,
    ...(row.note !== null ? { note: row.note } : {}),
    ...(row.lineNotes !== null ? { lineNotes: row.lineNotes } : {}),
    ...(row.literaryWorld ? { literaryWorldId: row.literaryWorld.id } : {}),
  };
}

const poemSelectShape = {
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
  collection: {
    select: {
      id: true,
      title: true,
      status: true,
      author: { select: { name: true } },
    },
  },
  literaryWorld: { select: { id: true, name: true } },
} as const;

export async function getPublishedPoemRaw(id: string): Promise<UiPoem | null> {
  const row = await prisma.poem.findFirst({
    where: { id, status: "PUBLISHED" },
    select: poemSelectShape,
  });

  if (!row) return null;

  const mapped = mapPoemRowToUi(row as unknown as PublishedPoemRow);
  return JSON.parse(JSON.stringify(mapped)) as UiPoem;
}

export async function getPublishedPoemsListRaw(): Promise<UiPoem[]> {
  const rows = await prisma.poem.findMany({
    where: { status: "PUBLISHED" },
    select: poemSelectShape,
    orderBy: [{ publishedAt: { sort: "desc", nulls: "last" } }, { updatedAt: "desc" }],
  });

  return rows.map((row) =>
    JSON.parse(JSON.stringify(mapPoemRowToUi(row as unknown as PublishedPoemRow))),
  ) as UiPoem[];
}

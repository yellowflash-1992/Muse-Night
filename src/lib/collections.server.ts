/**
 * Public read path for poetry collections.
 * Only imported by collections.functions.ts — never by routes or components.
 */

import { prisma } from "@/lib/prisma";

export interface UiCollectionPoem {
  id: string;
  title: string;
  excerpt: string | null;
  linesCount: number;
  readTime: string;
  year: string;
  tags: string[];
  form: string | null;
}

export interface UiCollectionSummary {
  id: string;
  title: string;
  subtitle: string | null;
  description: string;
  featuredQuote: string | null;
  coverImage: string | null;
  year: string;
  tags: string[];
  author: string;
  authorId: string;
  poemsCount: number;
  sortOrder: number;
}

export interface UiCollectionDetail extends UiCollectionSummary {
  foreword: string | null;
  poems: UiCollectionPoem[];
}

export async function getPublishedCollectionsListRaw(): Promise<UiCollectionSummary[]> {
  const rows = await prisma.collection.findMany({
    where: { status: "PUBLISHED" },
    include: {
      author: { select: { id: true, name: true } },
      poems: {
        where: { status: "PUBLISHED" },
        select: { id: true },
      },
    },
    orderBy: [{ sortOrder: "asc" }, { year: "desc" }, { title: "asc" }],
  });

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    description: row.description,
    featuredQuote: row.featuredQuote,
    coverImage: row.coverImage,
    year: row.year,
    tags: row.tags,
    author: row.author.name,
    authorId: row.authorId,
    poemsCount: row.poems.length,
    sortOrder: row.sortOrder,
  }));
}

export async function getPublishedCollectionByIdRaw(
  id: string,
): Promise<UiCollectionDetail | null> {
  const row = await prisma.collection.findFirst({
    where: { id, status: "PUBLISHED" },
    include: {
      author: { select: { id: true, name: true } },
      poems: {
        where: { status: "PUBLISHED" },
        select: {
          id: true,
          title: true,
          excerpt: true,
          linesCount: true,
          readTime: true,
          year: true,
          tags: true,
          form: true,
        },
        orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
      },
    },
  });

  if (!row) return null;

  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    description: row.description,
    foreword: row.foreword,
    featuredQuote: row.featuredQuote,
    coverImage: row.coverImage,
    year: row.year,
    tags: row.tags,
    author: row.author.name,
    authorId: row.authorId,
    poemsCount: row.poems.length,
    sortOrder: row.sortOrder,
    poems: row.poems.map((poem) => ({
      id: poem.id,
      title: poem.title,
      excerpt: poem.excerpt,
      linesCount: poem.linesCount,
      readTime: poem.readTime,
      year: poem.year,
      tags: poem.tags,
      form: poem.form,
    })),
  };
}

/**
 * Public read path for chapbooks.
 * Only imported by chapbooks.functions.ts — never by routes or components.
 */

import { prisma } from "@/lib/prisma";

export interface UiChapbook {
  id: string;
  title: string;
  author: string;
  authorId: string;
  description: string;
  quote: string;
  coverImage: string;
  price: string;
  year: string;
}

const chapbookSelect = {
  id: true,
  title: true,
  authorId: true,
  description: true,
  quote: true,
  coverImage: true,
  price: true,
  year: true,
  author: { select: { id: true, name: true } },
} as const;

export async function getPublishedChapbooksRaw(): Promise<UiChapbook[]> {
  const rows = await prisma.chapbook.findMany({
    where: { status: "PUBLISHED" },
    select: chapbookSelect,
    orderBy: [{ sortOrder: "asc" }, { year: "desc" }, { title: "asc" }],
  });
  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    author: row.author.name,
    authorId: row.authorId,
    description: row.description,
    quote: row.quote,
    coverImage: row.coverImage,
    price: row.price,
    year: row.year,
  }));
}

export async function getPublishedChapbookByIdRaw(id: string): Promise<UiChapbook | null> {
  const row = await prisma.chapbook.findFirst({
    where: { id, status: "PUBLISHED" },
    select: chapbookSelect,
  });
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    author: row.author.name,
    authorId: row.authorId,
    description: row.description,
    quote: row.quote,
    coverImage: row.coverImage,
    price: row.price,
    year: row.year,
  };
}

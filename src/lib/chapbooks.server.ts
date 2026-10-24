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
  price: string;
  pages: number;
  edition: string;
  binding: string;
  paper: string;
  dimensions: string;
  coverImage: string;
  description: string;
  quote: string;
  tableOfContents: string[];
  inStock: boolean;
  year: string;
  tags: string[];
  printRun: string;
  proofNotes: string;
}

function mapRowToUi(row: {
  id: string;
  title: string;
  authorId: string;
  price: string;
  pages: number;
  edition: string;
  binding: string;
  paper: string;
  dimensions: string;
  coverImage: string;
  description: string;
  quote: string;
  tableOfContents: string[];
  inStock: boolean;
  year: string;
  tags: string[];
  printRun: string;
  proofNotes: string;
  author: { id: string; name: string };
}): UiChapbook {
  return {
    id: row.id,
    title: row.title,
    author: row.author.name,
    authorId: row.authorId,
    price: row.price,
    pages: row.pages,
    edition: row.edition,
    binding: row.binding,
    paper: row.paper,
    dimensions: row.dimensions,
    coverImage: row.coverImage,
    description: row.description,
    quote: row.quote,
    tableOfContents: row.tableOfContents,
    inStock: row.inStock,
    year: row.year,
    tags: row.tags,
    printRun: row.printRun,
    proofNotes: row.proofNotes,
  };
}

const chapbookSelect = {
  id: true,
  title: true,
  authorId: true,
  price: true,
  pages: true,
  edition: true,
  binding: true,
  paper: true,
  dimensions: true,
  coverImage: true,
  description: true,
  quote: true,
  tableOfContents: true,
  inStock: true,
  year: true,
  tags: true,
  printRun: true,
  proofNotes: true,
  author: { select: { id: true, name: true } },
} as const;

export async function getPublishedChapbooksRaw(): Promise<UiChapbook[]> {
  const rows = await prisma.chapbook.findMany({
    where: { status: "PUBLISHED" },
    select: chapbookSelect,
    orderBy: [{ sortOrder: "asc" }, { year: "desc" }, { title: "asc" }],
  });
  return rows.map((r) =>
    JSON.parse(JSON.stringify(mapRowToUi(r as unknown as Parameters<typeof mapRowToUi>[0]))),
  ) as UiChapbook[];
}

export async function getPublishedChapbookByIdRaw(id: string): Promise<UiChapbook | null> {
  const row = await prisma.chapbook.findFirst({
    where: { id, status: "PUBLISHED" },
    select: chapbookSelect,
  });
  if (!row) return null;
  return JSON.parse(
    JSON.stringify(mapRowToUi(row as unknown as Parameters<typeof mapRowToUi>[0])),
  ) as UiChapbook;
}

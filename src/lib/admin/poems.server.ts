import { $Enums } from "@/generated/prisma/client";
import {
  computeExcerpt,
  computeLinesCount,
  computeReadTime,
  stanzasToBody,
} from "@/lib/poem/format";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "./auth.server";

type PublicationStatus = $Enums.PublicationStatus;

export interface AdminPoemInput {
  title: string;
  penNameId: string;
  year: string;
  readTime?: string;
  tags?: string[];
  stanzas: string[][];
  collectionId?: string | null;
  literaryWorldId?: string | null;
  note?: string | null;
  form?: string | null;
  featured?: boolean;
  lineNotes?: Record<number, { count: number; excerpt: string }> | null;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

async function uniqueId(base: string): Promise<string> {
  let candidate = base || "poem";
  let i = 2;
  while (await prisma.poem.findUnique({ where: { id: candidate } })) {
    candidate = `${base}-${i}`;
    i++;
  }
  return candidate;
}

export async function listAdminPoems(status?: PublicationStatus) {
  await requireAdmin();
  const where = status ? { status } : undefined;
  return prisma.poem.findMany({
    ...(where ? { where } : {}),
    include: {
      penName: { select: { id: true, name: true } },
      collection: { select: { id: true, title: true } },
      literaryWorld: { select: { id: true, name: true } },
    },
    orderBy: [{ sortOrder: "desc" }, { updatedAt: "desc" }],
  });
}

export async function getAdminPoem(id: string) {
  await requireAdmin();
  return prisma.poem.findUnique({
    where: { id },
    include: {
      penName: { select: { id: true, name: true } },
      collection: { select: { id: true, title: true } },
      literaryWorld: { select: { id: true, name: true } },
    },
  });
}

export async function createDraftPoem(input: AdminPoemInput) {
  await requireAdmin();
  const stanzas = input.stanzas;
  const derived = {
    body: stanzasToBody(stanzas),
    excerpt: computeExcerpt(stanzas),
    linesCount: computeLinesCount(stanzas),
    readTime: input.readTime?.trim() || computeReadTime(computeLinesCount(stanzas)),
  };

  const maxSort = await prisma.poem.aggregate({ _max: { sortOrder: true } });
  const sortOrder = (maxSort._max.sortOrder ?? 0) + 1;

  const id = await uniqueId(slugify(input.title));

  return prisma.poem.create({
    data: {
      id,
      title: input.title.trim(),
      stanzas: stanzas as unknown as object,
      body: derived.body,
      excerpt: derived.excerpt,
      status: "DRAFT",
      featured: input.featured ?? false,
      penNameId: input.penNameId,
      collectionId: input.collectionId || null,
      literaryWorldId: input.literaryWorldId || null,
      tags: input.tags ?? [],
      year: input.year.trim(),
      form: input.form || null,
      linesCount: derived.linesCount,
      readTime: derived.readTime,
      note: input.note?.trim() || null,
      lineNotes: (input.lineNotes ?? null) as unknown as object,
      sortOrder,
      publishedAt: null,
    },
  });
}

export async function updatePoem(id: string, input: Partial<AdminPoemInput>) {
  await requireAdmin();
  const existing = await prisma.poem.findUnique({ where: { id } });
  if (!existing) throw new Error("Poem not found");

  const stanzas = (input.stanzas ?? (existing.stanzas as string[][])) as string[][];
  const derived = {
    body: stanzasToBody(stanzas),
    excerpt: computeExcerpt(stanzas),
    linesCount: computeLinesCount(stanzas),
    readTime:
      input.readTime?.trim() || existing.readTime || computeReadTime(computeLinesCount(stanzas)),
  };

  return prisma.poem.update({
    where: { id },
    data: {
      ...(input.title !== undefined ? { title: input.title.trim() } : {}),
      stanzas: stanzas as unknown as object,
      body: derived.body,
      excerpt: derived.excerpt,
      featured: input.featured ?? existing.featured,
      penNameId: input.penNameId ?? existing.penNameId,
      collectionId:
        input.collectionId === undefined ? existing.collectionId : input.collectionId || null,
      literaryWorldId:
        input.literaryWorldId === undefined
          ? existing.literaryWorldId
          : input.literaryWorldId || null,
      tags: input.tags ?? existing.tags,
      year: input.year?.trim() ?? existing.year,
      form: input.form === undefined ? existing.form : input.form || null,
      linesCount: derived.linesCount,
      readTime: derived.readTime,
      note: input.note === undefined ? existing.note : input.note?.trim() || null,
      ...(input.lineNotes !== undefined
        ? { lineNotes: (input.lineNotes ?? null) as unknown as object }
        : {}),
    },
  });
}

export async function publishPoem(id: string) {
  await requireAdmin();
  return prisma.poem.update({
    where: { id },
    data: { status: "PUBLISHED", publishedAt: new Date() },
  });
}

export async function archivePoem(id: string) {
  await requireAdmin();
  return prisma.poem.update({
    where: { id },
    data: { status: "ARCHIVED" },
  });
}

export async function deletePoem(id: string) {
  await requireAdmin();
  return prisma.poem.delete({ where: { id } });
}

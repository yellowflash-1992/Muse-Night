import { prisma } from "@/lib/prisma";
import { requireAdmin } from "./auth.server";

export async function listAdminCollections() {
  await requireAdmin();
  return prisma.collection.findMany({
    include: { author: { select: { id: true, name: true } }, _count: { select: { poems: true } } },
    orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
  });
}

export async function getAdminCollection(id: string) {
  await requireAdmin();
  return prisma.collection.findUnique({
    where: { id },
    include: {
      author: { select: { id: true, name: true } },
      poems: { select: { id: true, title: true, status: true } },
    },
  });
}

export interface AdminCollectionInput {
  title: string;
  subtitle?: string | null;
  description: string;
  foreword?: string | null;
  featuredQuote?: string | null;
  coverImage?: string | null;
  authorId: string;
  year: string;
  tags?: string[];
  sortOrder?: number;
}

export async function createCollection(input: AdminCollectionInput) {
  await requireAdmin();
  const maxSort = await prisma.collection.aggregate({ _max: { sortOrder: true } });
  return prisma.collection.create({
    data: {
      id:
        input.title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "") || "collection",
      title: input.title.trim(),
      subtitle: input.subtitle?.trim() || null,
      description: input.description.trim(),
      foreword: input.foreword?.trim() || null,
      featuredQuote: input.featuredQuote?.trim() || null,
      coverImage: input.coverImage || null,
      status: "DRAFT",
      authorId: input.authorId,
      year: input.year.trim(),
      tags: input.tags ?? [],
      sortOrder: input.sortOrder ?? (maxSort._max.sortOrder ?? 0) + 1,
    },
  });
}

export async function updateCollection(
  id: string,
  input: Partial<AdminCollectionInput> & { status?: "DRAFT" | "PUBLISHED" | "ARCHIVED" },
) {
  await requireAdmin();
  const existing = await prisma.collection.findUnique({ where: { id } });
  if (!existing) throw new Error("Collection not found");
  return prisma.collection.update({
    where: { id },
    data: {
      ...(input.title !== undefined ? { title: input.title.trim() } : {}),
      ...(input.subtitle !== undefined ? { subtitle: input.subtitle?.trim() || null } : {}),
      ...(input.description !== undefined ? { description: input.description.trim() } : {}),
      ...(input.foreword !== undefined ? { foreword: input.foreword?.trim() || null } : {}),
      ...(input.featuredQuote !== undefined
        ? { featuredQuote: input.featuredQuote?.trim() || null }
        : {}),
      ...(input.coverImage !== undefined ? { coverImage: input.coverImage || null } : {}),
      ...(input.authorId !== undefined ? { authorId: input.authorId } : {}),
      ...(input.year !== undefined ? { year: input.year.trim() } : {}),
      ...(input.tags !== undefined ? { tags: input.tags } : {}),
      ...(input.sortOrder !== undefined ? { sortOrder: input.sortOrder } : {}),
      ...(input.status !== undefined ? { status: input.status } : {}),
    },
  });
}

export async function publishCollection(id: string) {
  await requireAdmin();
  return prisma.collection.update({ where: { id }, data: { status: "PUBLISHED" } });
}

export async function archiveCollection(id: string) {
  await requireAdmin();
  return prisma.collection.update({ where: { id }, data: { status: "ARCHIVED" } });
}

export async function deleteCollection(id: string) {
  await requireAdmin();
  return prisma.collection.delete({ where: { id } });
}

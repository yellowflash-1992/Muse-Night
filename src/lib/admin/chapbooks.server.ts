import { prisma } from "@/lib/prisma";
import { requireAdmin } from "./auth.server";

export async function listChapbooksAdmin() {
  await requireAdmin();
  return prisma.chapbook.findMany({ orderBy: [{ sortOrder: "asc" }, { year: "desc" }] });
}

export async function getAdminChapbook(id: string) {
  await requireAdmin();
  return prisma.chapbook.findUnique({ where: { id } });
}

export interface AdminChapbookInput {
  title: string;
  authorId: string;
  description: string;
  quote: string;
  coverImage: string;
  price: string;
  year: string;
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  sortOrder?: number;
}

export async function createChapbook(input: AdminChapbookInput) {
  await requireAdmin();
  const maxSort = await prisma.chapbook.aggregate({ _max: { sortOrder: true } });
  const id =
    input.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "chapbook";
  let candidate = id;
  let i = 2;
  while (await prisma.chapbook.findUnique({ where: { id: candidate } })) {
    candidate = `${id}-${i}`;
    i++;
  }
  return prisma.chapbook.create({
    data: {
      id: candidate,
      title: input.title.trim(),
      authorId: input.authorId,
      description: input.description.trim(),
      quote: input.quote.trim(),
      coverImage: input.coverImage,
      price: input.price.trim(),
      year: input.year.trim(),

      status: input.status ?? "DRAFT",
      sortOrder: input.sortOrder ?? (maxSort._max.sortOrder ?? 0) + 1,
    },
  });
}

export async function updateChapbook(id: string, input: Partial<AdminChapbookInput>) {
  await requireAdmin();
  const existing = await prisma.chapbook.findUnique({ where: { id } });
  if (!existing) throw new Error("Chapbook not found");
  return prisma.chapbook.update({
    where: { id },
    data: {
      ...(input.title !== undefined ? { title: input.title.trim() } : {}),
      ...(input.authorId !== undefined ? { authorId: input.authorId } : {}),
      ...(input.description !== undefined ? { description: input.description.trim() } : {}),
      ...(input.quote !== undefined ? { quote: input.quote.trim() } : {}),
      ...(input.coverImage !== undefined ? { coverImage: input.coverImage } : {}),
      ...(input.price !== undefined ? { price: input.price.trim() } : {}),
      ...(input.year !== undefined ? { year: input.year.trim() } : {}),

      ...(input.status !== undefined ? { status: input.status } : {}),
      ...(input.sortOrder !== undefined ? { sortOrder: input.sortOrder } : {}),
    },
  });
}

export async function publishChapbook(id: string) {
  await requireAdmin();
  return prisma.chapbook.update({ where: { id }, data: { status: "PUBLISHED" } });
}

export async function archiveChapbook(id: string) {
  await requireAdmin();
  return prisma.chapbook.update({ where: { id }, data: { status: "ARCHIVED" } });
}

export async function deleteChapbook(id: string) {
  await requireAdmin();
  return prisma.chapbook.delete({ where: { id } });
}

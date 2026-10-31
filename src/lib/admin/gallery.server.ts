import { prisma } from "@/lib/prisma";
import { requireAdmin } from "./auth.server";

export async function listGalleryItems() {
  await requireAdmin();
  return prisma.galleryItem.findMany({ orderBy: [{ category: "asc" }, { sortOrder: "asc" }] });
}

export interface AdminGalleryInput {
  title: string;
  category: "MYSTERY" | "MASTERWORKS" | "POEM_FRAMES" | "RELICS" | "MYTH" | "VISUAL_POETRY";
  description: string;
  visual: "MYSTERY" | "PORTRAIT" | "FRAME" | "RELIC" | "MYTH" | "POETRY";
  status?: "CURATED" | "BUILT_IN" | "COMING_SOON";
  artist?: string | null;
  era?: string | null;
  source?: string | null;
  learnMoreUrl?: string | null;
  frameStyle?:
    "MINIMAL" | "ROMANTIC" | "MELANCHOLIC" | "MYSTICAL" | "VINTAGE" | "MANUSCRIPT" | null;
  imageUrl?: string | null;
  bookId?: string | null;
  poemId?: string | null;
  sortOrder?: number;
}

export async function createGalleryItem(input: AdminGalleryInput) {
  await requireAdmin();
  const maxSort = await prisma.galleryItem.aggregate({ _max: { sortOrder: true } });
  const id =
    input.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "gallery-item";
  // ensure unique
  let candidate = id;
  let i = 2;
  while (await prisma.galleryItem.findUnique({ where: { id: candidate } })) {
    candidate = `${id}-${i}`;
    i++;
  }
  return prisma.galleryItem.create({
    data: {
      id: candidate,
      title: input.title.trim(),
      category: input.category,
      description: input.description.trim(),
      visual: input.visual,
      status: input.status ?? "COMING_SOON",
      artist: input.artist?.trim() || null,
      era: input.era?.trim() || null,
      source: input.source?.trim() || null,
      learnMoreUrl: input.learnMoreUrl?.trim() || null,
      frameStyle: input.frameStyle ?? null,
      imageUrl: input.imageUrl || null,
      bookId: input.bookId || null,
      poemId: input.poemId || null,
      sortOrder: input.sortOrder ?? (maxSort._max.sortOrder ?? 0) + 1,
    },
  });
}

export async function updateGalleryItem(id: string, input: Partial<AdminGalleryInput>) {
  await requireAdmin();
  const existing = await prisma.galleryItem.findUnique({ where: { id } });
  if (!existing) throw new Error("Gallery item not found");
  return prisma.galleryItem.update({
    where: { id },
    data: {
      ...(input.title !== undefined ? { title: input.title.trim() } : {}),
      ...(input.category !== undefined ? { category: input.category } : {}),
      ...(input.description !== undefined ? { description: input.description.trim() } : {}),
      ...(input.visual !== undefined ? { visual: input.visual } : {}),
      ...(input.status !== undefined ? { status: input.status } : {}),
      ...(input.artist !== undefined ? { artist: input.artist?.trim() || null } : {}),
      ...(input.era !== undefined ? { era: input.era?.trim() || null } : {}),
      ...(input.source !== undefined ? { source: input.source?.trim() || null } : {}),
      ...(input.learnMoreUrl !== undefined
        ? { learnMoreUrl: input.learnMoreUrl?.trim() || null }
        : {}),
      ...(input.frameStyle !== undefined ? { frameStyle: input.frameStyle } : {}),
      ...(input.imageUrl !== undefined ? { imageUrl: input.imageUrl || null } : {}),
      ...(input.bookId !== undefined ? { bookId: input.bookId || null } : {}),
      ...(input.poemId !== undefined ? { poemId: input.poemId || null } : {}),
      ...(input.sortOrder !== undefined ? { sortOrder: input.sortOrder } : {}),
    },
  });
}

export async function deleteGalleryItem(id: string) {
  await requireAdmin();
  return prisma.galleryItem.delete({ where: { id } });
}

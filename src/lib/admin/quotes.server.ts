import { prisma } from "@/lib/prisma";
import { requireAdmin } from "./auth.server";

export async function listQuotes() {
  await requireAdmin();
  return prisma.quote.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });
}

export async function createQuote(text: string, author?: string, sortOrder?: number) {
  await requireAdmin();
  const maxSort = await prisma.quote.aggregate({ _max: { sortOrder: true } });
  return prisma.quote.create({
    data: {
      text: text.trim(),
      author: author?.trim() || "Muse Night",
      status: "PUBLISHED",
      sortOrder: sortOrder ?? (maxSort._max.sortOrder ?? 0) + 1,
    },
  });
}

export async function updateQuote(
  id: string,
  data: { text?: string; author?: string; status?: string; sortOrder?: number },
) {
  await requireAdmin();
  return prisma.quote.update({
    where: { id },
    data: {
      ...(data.text !== undefined ? { text: data.text.trim() } : {}),
      ...(data.author !== undefined ? { author: data.author.trim() || "Muse Night" } : {}),
      ...(data.status !== undefined ? { status: data.status } : {}),
      ...(data.sortOrder !== undefined ? { sortOrder: data.sortOrder } : {}),
    },
  });
}

export async function deleteQuote(id: string) {
  await requireAdmin();
  return prisma.quote.delete({ where: { id } });
}

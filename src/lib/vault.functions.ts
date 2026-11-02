import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getCurrentUser, requireUser } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma";

const poemIdSchema = z.string().trim().min(1);

export interface SavedPoemData {
  id: string;
  poemId: string;
  title: string;
  author: string;
  excerpt: string | null;
  year: string;
}

export const getSavedPoemsFn = createServerFn({ method: "GET" }).handler(
  async (): Promise<SavedPoemData[]> => {
    const user = await getCurrentUser();
    if (!user) return [];

    const savedPoems = await prisma.savedPoem.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        poem: {
          select: {
            id: true,
            title: true,
            excerpt: true,
            year: true,
            status: true,
            penName: { select: { name: true } },
          },
        },
      },
    });

    return savedPoems
      .filter(({ poem }) => poem.status === "PUBLISHED")
      .map(({ id, poem }) => ({
        id,
        poemId: poem.id,
        title: poem.title,
        author: poem.penName.name,
        excerpt: poem.excerpt,
        year: poem.year,
      }));
  },
);

export const isPoemSavedFn = createServerFn({ method: "GET" })
  .validator((input: unknown) => poemIdSchema.parse(input))
  .handler(async ({ data: poemId }): Promise<boolean> => {
    const user = await getCurrentUser();
    if (!user) return false;

    const savedPoem = await prisma.savedPoem.findUnique({
      where: { userId_poemId: { userId: user.id, poemId } },
      select: { id: true },
    });
    return savedPoem !== null;
  });

export const toggleSavePoemFn = createServerFn({ method: "POST" })
  .validator((input: unknown) => poemIdSchema.parse(input))
  .handler(async ({ data: poemId }): Promise<boolean> => {
    const user = await requireUser();
    const existing = await prisma.savedPoem.findUnique({
      where: { userId_poemId: { userId: user.id, poemId } },
      select: { id: true },
    });

    if (existing) {
      await prisma.savedPoem.delete({ where: { id: existing.id } });
      return false;
    }

    await prisma.savedPoem.create({
      data: { userId: user.id, poemId },
    });
    return true;
  });

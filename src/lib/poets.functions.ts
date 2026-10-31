import { createServerFn } from "@tanstack/react-start";

import { prisma } from "@/lib/prisma";

export type PoetCard = {
  id: string;
  legalName: string;
  role: string;
  bio: string;
  primaryPenName: string;
  latestPublishedPoemTitle: string | null;
};

export const listPoetCardsPublic = createServerFn({ method: "GET" }).handler(
  async (): Promise<PoetCard[]> => {
    const persons = await prisma.person.findMany({
      orderBy: { createdAt: "asc" },
      include: {
        penNames: {
          where: { isPrimary: true },
          select: { id: true, name: true },
          take: 1,
        },
      },
    });

    const results: PoetCard[] = [];
    for (const p of persons) {
      const primary = p.penNames[0];
      let title: string | null = null;
      if (primary) {
        const latest = await prisma.poem.findFirst({
          where: { penNameId: primary.id, status: "PUBLISHED" },
          orderBy: [{ publishedAt: { sort: "desc", nulls: "last" } }, { createdAt: "desc" }],
          select: { title: true },
        });
        title = latest?.title ?? null;
      }
      results.push({
        id: p.id,
        legalName: p.legalName,
        role: p.role,
        bio: p.bio,
        primaryPenName: primary?.name ?? "",
        latestPublishedPoemTitle: title,
      });
    }
    return results;
  },
);

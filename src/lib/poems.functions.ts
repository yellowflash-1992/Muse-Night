import { createServerFn } from "@tanstack/react-start";

import { getCurrentUser } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma";
import { getPublishedPoemRaw, getPublishedPoemsListRaw, type UiPoem } from "./poems.server";

export const getPublishedPoem = createServerFn({ method: "GET" })
  .validator((id: unknown) => {
    if (typeof id !== "string" || id.length === 0) {
      throw new Error("A poem id is required");
    }
    return id;
  })
  .handler(async ({ data: id }): Promise<UiPoem | null> => {
    const poem = await getPublishedPoemRaw(id, true);
    if (!poem || !poem.isExclusive) return poem;

    const user = await getCurrentUser().catch((error: unknown) => {
      console.error("Could not verify access to exclusive poem:", error);
      return null;
    });
    if (!user) return null;

    const now = new Date();
    const todayStart = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
    );
    const tomorrowStart = new Date(todayStart);
    tomorrowStart.setUTCDate(tomorrowStart.getUTCDate() + 1);
    const todayRange = { gte: todayStart, lt: tomorrowStart };

    const [readingLog, duelVote, story] = await Promise.all([
      prisma.readingLog.findFirst({
        where: { userId: user.id, createdAt: todayRange },
        select: { id: true },
      }),
      prisma.duelVote.findFirst({
        where: { userId: user.id, createdAt: todayRange },
        select: { id: true },
      }),
      prisma.sixWordStory.findFirst({
        where: { userId: user.id, createdAt: todayRange },
        select: { id: true },
      }),
    ]);

    if (!readingLog || (!duelVote && !story)) return null;
    return poem;
  });

export const getPublishedPoemsList = createServerFn({ method: "GET" }).handler(
  async (): Promise<UiPoem[]> => {
    return getPublishedPoemsListRaw();
  },
);

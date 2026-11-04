import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getCurrentUser, requireUser } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma";
import { getDisplayName } from "@/lib/user-utils";

const gameIdSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid game date");
const voteSchema = z.object({
  gameId: gameIdSchema,
  side: z.enum(["a", "b"]),
});
const storySchema = z.object({
  gameId: gameIdSchema,
  text: z.string().trim().min(1).max(500),
});

export interface DailyGameData {
  id: string;
  prompt: string;
  lineA: string;
  poetA: string;
  lineB: string;
  poetB: string;
  totalVotesA: number;
  totalVotesB: number;
  totalVotes: number;
  votedSide: "a" | "b" | null;
  stories: {
    id: string;
    text: string;
    authorName: string;
    votes: number;
    hasUpvoted: boolean;
    isMine: boolean;
  }[];
}

export const getDailyGameFn = createServerFn({ method: "GET" }).handler(
  async (): Promise<DailyGameData | null> => {
    const today = new Date().toISOString().slice(0, 10);
    const user = await getCurrentUser();
    const game = await prisma.dailyGame.findUnique({
      where: { id: today },
      include: {
        votes: {
          where: { userId: user?.id ?? "" },
          select: { side: true },
        },
        stories: {
          orderBy: [{ createdAt: "desc" }],
          include: {
            userVotes: {
              where: { userId: user?.id ?? "" },
              select: { id: true },
            },
          },
        },
      },
    });

    if (!game) return null;

    const voteCounts = await prisma.duelVote.groupBy({
      by: ["side"],
      where: { gameId: today },
      _count: { side: true },
    });
    const totalVotesA = voteCounts.find((vote) => vote.side === "a")?._count.side ?? 0;
    const totalVotesB = voteCounts.find((vote) => vote.side === "b")?._count.side ?? 0;

    return {
      id: game.id,
      prompt: game.prompt,
      lineA: game.lineA,
      poetA: game.poetA,
      lineB: game.lineB,
      poetB: game.poetB,
      totalVotesA,
      totalVotesB,
      totalVotes: totalVotesA + totalVotesB,
      votedSide:
        game.votes[0]?.side === "a" || game.votes[0]?.side === "b" ? game.votes[0].side : null,
      stories: game.stories.map((story) => ({
        id: story.id,
        text: story.text,
        authorName: story.authorName,
        votes: story.votes,
        hasUpvoted: story.userVotes.length > 0,
        isMine: Boolean(user && story.userId === user.id),
      })),
    };
  },
);

export const submitDuelVoteFn = createServerFn({ method: "POST" })
  .validator((input: unknown) => voteSchema.parse(input))
  .handler(async ({ data }) => {
    const user = await requireUser();
    return prisma.duelVote.upsert({
      where: {
        gameId_userId: { gameId: data.gameId, userId: user.id },
      },
      update: { side: data.side },
      create: { gameId: data.gameId, userId: user.id, side: data.side },
    });
  });

export const submitStoryFn = createServerFn({ method: "POST" })
  .validator((input: unknown) => storySchema.parse(input))
  .handler(async ({ data }) => {
    const words = data.text.split(/\s+/).filter(Boolean);
    if (words.length !== 6) {
      throw new Error("A story must contain exactly six words");
    }

    const user = await requireUser();
    return prisma.sixWordStory.create({
      data: {
        gameId: data.gameId,
        userId: user.id,
        text: data.text,
        authorName: await getDisplayName(user.id),
      },
    });
  });

export const upvoteStoryFn = createServerFn({ method: "POST" })
  .validator((storyId: unknown) => z.string().uuid().parse(storyId))
  .handler(async ({ data: storyId }) => {
    const user = await requireUser();
    return prisma.$transaction(async (transaction) => {
      const story = await transaction.sixWordStory.findUnique({
        where: { id: storyId },
        select: { id: true },
      });
      if (!story) throw new Error("Story not found");

      const inserted = await transaction.storyVote.createMany({
        data: [{ storyId, userId: user.id }],
        skipDuplicates: true,
      });
      return transaction.sixWordStory.update({
        where: { id: storyId },
        data: inserted.count === 1 ? { votes: { increment: 1 } } : {},
      });
    });
  });

export interface StreakData {
  currentStreak: number;
  tasksDoneToday: number;
  readToday: boolean;
  playedToday: boolean;
  bonusPoem: {
    id: string;
    title: string;
    excerpt: string;
    authorName: string;
  } | null;
}

export const getUserStreakFn = createServerFn({ method: "GET" }).handler(
  async (): Promise<StreakData | null> => {
    const user = await getCurrentUser();
    if (!user) return null;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const [duelVotes, stories, readingLogs] = await Promise.all([
      prisma.duelVote.findMany({
        where: { userId: user.id },
        select: { createdAt: true },
      }),
      prisma.sixWordStory.findMany({
        where: { userId: user.id },
        select: { createdAt: true },
      }),
      prisma.readingLog.findMany({
        where: { userId: user.id },
        select: { createdAt: true },
      }),
    ]);

    // Combine every activity into a set of UTC day keys ("YYYY-MM-DD").
    const activeDays = new Set<string>();
    for (const row of [...duelVotes, ...stories, ...readingLogs]) {
      activeDays.add(row.createdAt.toISOString().slice(0, 10));
    }

    // Count consecutive days backwards, starting today (or yesterday if the
    // user hasn't been active yet today — the streak shouldn't reset until
    // the day actually passes).
    const today = new Date().toISOString().slice(0, 10);
    let currentStreak = 0;
    const cursor = new Date();
    if (!activeDays.has(today)) {
      cursor.setUTCDate(cursor.getUTCDate() - 1);
    }
    while (activeDays.has(cursor.toISOString().slice(0, 10))) {
      currentStreak += 1;
      cursor.setUTCDate(cursor.getUTCDate() - 1);
    }

    // Two tasks per day: read a poem, play the daily game.
    const todayPrefix = `${today}T`;
    const readToday = readingLogs.some((log) => log.createdAt.toISOString().startsWith(todayPrefix));
    const playedToday =
      duelVotes.some((vote) => vote.createdAt.toISOString().startsWith(todayPrefix)) ||
      stories.some((story) => story.createdAt.toISOString().startsWith(todayPrefix));
    const tasksDoneToday = (readToday ? 1 : 0) + (playedToday ? 1 : 0);

    // Unlock reward: a random published poem once both tasks are complete.
    let bonusPoem: StreakData["bonusPoem"] = null;
    if (tasksDoneToday >= 2) {
      const count = await prisma.poem.count({ where: { status: "PUBLISHED" } });
      if (count > 0) {
        const poem = await prisma.poem.findFirst({
          where: { status: "PUBLISHED" },
          skip: Math.floor(Math.random() * count),
          select: {
            id: true,
            title: true,
            excerpt: true,
            penName: { select: { name: true } },
          },
        });
        if (poem) {
          bonusPoem = {
            id: poem.id,
            title: poem.title,
            excerpt: poem.excerpt ?? "",
            authorName: poem.penName.name,
          };
        }
      }
    }

    return { currentStreak, tasksDoneToday, readToday, playedToday, bonusPoem };
  },
);

export const logPoemReadFn = createServerFn({ method: "POST" })
  .validator((input: unknown) => z.string().trim().min(1).parse(input))
  .handler(async ({ data: poemId }) => {
    const user = await getCurrentUser();
    if (!user) return null;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const existing = await prisma.readingLog.findFirst({
      where: {
        userId: user.id,
        poemId,
        createdAt: { gte: startOfDay },
      },
      select: { id: true },
    });

    if (existing) return existing;

    return prisma.readingLog.create({
      data: { userId: user.id, poemId },
    });
  });

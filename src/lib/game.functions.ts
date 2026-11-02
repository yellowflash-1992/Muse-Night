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
      votedSide: game.votes[0]?.side === "a" || game.votes[0]?.side === "b"
        ? game.votes[0].side
        : null,
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

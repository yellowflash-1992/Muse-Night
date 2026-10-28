import { prisma } from "@/lib/prisma";

export async function getInteractionsRaw(poemId: string, userId: string | null) {
  const DEFAULT_EMOJIS = ["❤️", "🔥", "😢", "👏"]; // Add whatever emojis you want here

  // 1. Get Reactions (Aggregated)
  const reactionRows = await prisma.reaction.findMany({ where: { poemId } });
  const reactionCounts: Record<string, number> = {};

  // Initialize counts for default emojis so the buttons always show up
  DEFAULT_EMOJIS.forEach((e) => {
    reactionCounts[e] = 0;
  });

  reactionRows.forEach((r) => {
    reactionCounts[r.emoji] = (reactionCounts[r.emoji] || 0) + 1;
  });

  const reactions = Object.entries(reactionCounts).map(([emoji, count]) => ({
    emoji,
    count,
    isReacted: userId ? reactionRows.some((r) => r.emoji === emoji && r.userId === userId) : false,
  }));

  // 2. Get Reflections (with Profile & Likes)
  // ... (leave the rest of the function exactly as it is)

  // 2. Get Reflections (with Profile & Likes)
  const reflections = await prisma.reflection.findMany({
    where: { poemId },
    include: {
      likes: true,
    },
    orderBy: { createdAt: "desc" },
  });

  // Fetch member profiles for the reflections
  const userIds = [...new Set(reflections.map((r) => r.userId))];
  const profiles = await prisma.memberProfile.findMany({
    where: { id: { in: userIds } },
    select: { id: true, displayName: true, penName: true },
  });
  const profileMap = Object.fromEntries(profiles.map((p) => [p.id, p]));

  return {
    reactions,
    reflections: reflections.map((r) => {
      const profile = profileMap[r.userId];
      return {
        id: r.id,
        name: r.isAnonymous ? "Anonymous" : profile?.penName || profile?.displayName || "A Reader",
        text: r.text,
        hearts: r.likes.length,
        isHearted: userId ? r.likes.some((l) => l.userId === userId) : false,
        date: r.createdAt.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        poetReply: null, // Future feature
      };
    }),
  };
}

export async function toggleReactionRaw(poemId: string, userId: string, emoji: string) {
  const existing = await prisma.reaction.findUnique({
    where: { poemId_userId_emoji: { poemId, userId, emoji } },
  });
  if (existing) {
    await prisma.reaction.delete({ where: { id: existing.id } });
    return { action: "removed" };
  } else {
    await prisma.reaction.create({ data: { poemId, userId, emoji } });
    return { action: "added" };
  }
}

export async function createReflectionRaw(
  poemId: string,
  userId: string,
  text: string,
  isAnonymous: boolean,
) {
  return prisma.reflection.create({ data: { poemId, userId, text, isAnonymous } });
}

export async function toggleReflectionLikeRaw(reflectionId: string, userId: string) {
  const existing = await prisma.reflectionLike.findUnique({
    where: { reflectionId_userId: { reflectionId, userId } },
  });
  if (existing) {
    await prisma.reflectionLike.delete({ where: { id: existing.id } });
    return { action: "removed" };
  } else {
    await prisma.reflectionLike.create({ data: { reflectionId, userId } });
    return { action: "added" };
  }
}

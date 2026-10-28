import { prisma } from "@/lib/prisma";

export async function getInteractionsRaw(poemId: string, userId: string | null) {
  const DEFAULT_EMOJIS = ["❤️", "🔥", "😢", "👍"];
  const reactionRows = await prisma.reaction.findMany({ where: { poemId } });

  const reactionCounts: Record<string, number> = {};
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

  const reflections = await prisma.reflection.findMany({
    where: { poemId },
    include: { likes: true },
    orderBy: { createdAt: "desc" },
  });

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
        poetReply: null,
      };
    }),
  };
}

export async function toggleReactionRaw(poemId: string, userId: string, emoji: string) {
  const existing = await prisma.reaction.findUnique({
    where: { poemId_userId: { poemId, userId } },
  });

  if (existing) {
    if (existing.emoji === emoji) {
      await prisma.reaction.delete({ where: { id: existing.id } });
      return { action: "removed" };
    } else {
      await prisma.reaction.update({ where: { id: existing.id }, data: { emoji } });
      return { action: "updated" };
    }
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

    // --- NOTIFICATION LOGIC ---
    try {
      const reflection = await prisma.reflection.findUnique({
        where: { id: reflectionId },
        select: { userId: true, poemId: true },
      });

      // Only notify if they are liking someone else's comment
      if (reflection && reflection.userId !== userId) {
        // Find the actor's name
        const actor = await prisma.memberProfile.findUnique({
          where: { id: userId },
          select: { displayName: true, penName: true },
        });
        const actorName = actor?.penName || actor?.displayName || "Someone";

        await prisma.notification.create({
          data: {
            userId: reflection.userId, // The receiver
            actorId: userId, // The liker
            type: "LIKE",
            message: `${actorName} loved your reflection.`,
            link: `/library/${reflection.poemId}`,
          },
        });
      }
    } catch (error) {
      console.error("Failed to create notification:", error);
    }
    return { action: "added" };
  }
}

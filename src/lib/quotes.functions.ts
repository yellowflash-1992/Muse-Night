import { createServerFn } from "@tanstack/react-start";

import { prisma } from "@/lib/prisma";

export const getPublishedQuotes = createServerFn({ method: "GET" }).handler(async () => {
  const quotes = await prisma.quote.findMany({
    where: { status: "PUBLISHED" },
    take: 10,
    include: {
      penName: {
        select: {
          name: true,
          person: { select: { imageUrl: true, userId: true } },
        },
      },
    },
  });
  const userIds = [
    ...new Set(
      quotes
        .map((quote) => quote.penName?.person.userId)
        .filter((userId): userId is string => Boolean(userId)),
    ),
  ];
  const memberProfiles =
    userIds.length > 0
      ? await prisma.memberProfile.findMany({
          where: { id: { in: userIds } },
          select: { id: true, avatarUrl: true },
        })
      : [];
  const profilesByUserId = new Map(memberProfiles.map((profile) => [profile.id, profile]));

  return quotes.map((quote) => {
    if (!quote.penName) return quote;

    const person = quote.penName.person;
    const profile = person.userId ? profilesByUserId.get(person.userId) : undefined;
    return {
      ...quote,
      penName: {
        ...quote.penName,
        person: {
          ...person,
          user: profile ? { avatarUrl: profile.avatarUrl } : null,
        },
      },
    };
  });
});

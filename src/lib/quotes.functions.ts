import { createServerFn } from "@tanstack/react-start";

import { prisma } from "@/lib/prisma";

export const getPublishedQuotes = createServerFn({ method: "GET" }).handler(async () =>
  prisma.quote.findMany({
    where: { status: "PUBLISHED" },
    take: 10,
    include: {
      penName: {
        select: {
          name: true,
          person: { select: { imageUrl: true } },
        },
      },
    },
  }),
);

import { createServerFn } from "@tanstack/react-start";

import { prisma } from "@/lib/prisma";

export const getCuratedMoodsFn = createServerFn({ method: "GET" }).handler(async () =>
  prisma.moodCurator.findMany({
    where: { poem: { status: "PUBLISHED" } },
    orderBy: { mood: "asc" },
    include: {
      poem: {
        include: { penName: true },
      },
    },
  }),
);

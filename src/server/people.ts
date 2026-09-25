import { createServerFn } from "@tanstack/react-start";

import { prisma } from "@/lib/prisma";

export const getPeople = createServerFn({ method: "GET" }).handler(async () => {
  return prisma.person.findMany({
    orderBy: {
      legalName: "asc",
    },
  });
});

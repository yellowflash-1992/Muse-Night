import { Prisma } from "@/generated/prisma/client";
import { createServerFn } from "@tanstack/react-start";

import { prisma } from "@/lib/prisma";

export type PersonWithPenNames = Prisma.PersonGetPayload<{
  include: {
    penNames: { select: { id: true; name: true; isPrimary: true; literaryIdentity: true } };
  };
}>;

export const listPersonsPublic = createServerFn({ method: "GET" }).handler(
  async (): Promise<PersonWithPenNames[]> => {
    return prisma.person.findMany({
      orderBy: { createdAt: "asc" },
      include: {
        penNames: {
          select: {
            id: true,
            name: true,
            isPrimary: true,
            literaryIdentity: true,
          },
        },
      },
    });
  },
);

export const listPenNamesPublic = createServerFn({ method: "GET" }).handler(async () => {
  return prisma.penName.findMany({
    include: { person: { select: { id: true, legalName: true, displayOrder: true } } },
    orderBy: { name: "asc" },
  });
});

export const listLiteraryWorldsPublic = createServerFn({ method: "GET" }).handler(async () => {
  return prisma.literaryWorld.findMany({ orderBy: { name: "asc" } });
});

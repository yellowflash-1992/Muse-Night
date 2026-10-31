import { prisma } from "@/lib/prisma";
import { requireAdmin } from "./auth.server";

export async function listPenNames() {
  await requireAdmin();
  return prisma.penName.findMany({
    include: { person: { select: { id: true, legalName: true } } },
    orderBy: { name: "asc" },
  });
}

export async function listPersons() {
  await requireAdmin();
  return prisma.person.findMany({ orderBy: { displayOrder: "desc" } });
}

export async function listLiteraryWorlds() {
  await requireAdmin();
  return prisma.literaryWorld.findMany({ orderBy: { name: "asc" } });
}

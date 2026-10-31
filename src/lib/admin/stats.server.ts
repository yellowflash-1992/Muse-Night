import { prisma } from "@/lib/prisma";
import { requireAdmin } from "./auth.server";

export async function getAdminStats() {
  await requireAdmin();
  const [
    poemsTotal,
    poemsDraft,
    poemsPublished,
    collectionsTotal,
    chapbooksTotal,
    galleryTotal,
    quotesTotal,
    submissionsNew,
    submissionsTotal,
    accessPending,
    personsTotal,
    penNamesTotal,
  ] = await Promise.all([
    prisma.poem.count(),
    prisma.poem.count({ where: { status: "DRAFT" } }),
    prisma.poem.count({ where: { status: "PUBLISHED" } }),
    prisma.collection.count(),
    prisma.chapbook.count(),
    prisma.galleryItem.count(),
    prisma.quote.count(),
    prisma.submission.count({ where: { status: "NEW" } }),
    prisma.submission.count(),
    prisma.adminAccessRequest.count({ where: { status: "PENDING" } }),
    prisma.person.count(),
    prisma.penName.count(),
  ]);
  return {
    poemsTotal,
    poemsDraft,
    poemsPublished,
    collectionsTotal,
    chapbooksTotal,
    galleryTotal,
    quotesTotal,
    submissionsNew,
    submissionsTotal,
    accessPending,
    personsTotal,
    penNamesTotal,
  };
}

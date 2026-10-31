import { prisma } from "@/lib/prisma";
import { requireAdmin } from "./auth.server";

export async function listSubmissions(status?: "NEW" | "UNDER_REVIEW" | "ACCEPTED" | "REJECTED") {
  await requireAdmin();
  const where = status ? { status } : undefined;
  return prisma.submission.findMany({
    ...(where ? { where } : {}),
    orderBy: { createdAt: "desc" },
  });
}

export async function getSubmission(id: string) {
  await requireAdmin();
  return prisma.submission.findUnique({ where: { id } });
}

export interface ReviewSubmissionInput {
  status: "UNDER_REVIEW" | "ACCEPTED" | "REJECTED";
  rejectionReason?: string | null;
  editorialNote?: string | null;
  // For ACCEPTED: create a draft poem under this pen name
  acceptedPoem?: {
    title: string;
    penNameId: string;
    year: string;
    tags?: string[];
    stanzas: string[][];
    collectionId?: string | null;
    literaryWorldId?: string | null;
    note?: string | null;
    form?: string | null;
    featured?: boolean;
  } | null;
}

export async function reviewSubmission(id: string, input: ReviewSubmissionInput) {
  await requireAdmin();
  const admin = await requireAdmin();
  const submission = await prisma.submission.findUnique({ where: { id } });
  if (!submission) throw new Error("Submission not found");

  let acceptedPoemId: string | null = submission.acceptedPoemId;

  if (input.status === "ACCEPTED" && input.acceptedPoem) {
    const { stanzasToBody, computeExcerpt, computeLinesCount, computeReadTime } =
      await import("@/lib/poem/format");
    const stanzas = input.acceptedPoem.stanzas;
    const derived = {
      body: stanzasToBody(stanzas),
      excerpt: computeExcerpt(stanzas),
      linesCount: computeLinesCount(stanzas),
      readTime: computeReadTime(computeLinesCount(stanzas)),
    };
    const maxSort = await prisma.poem.aggregate({ _max: { sortOrder: true } });
    const sortOrder = (maxSort._max.sortOrder ?? 0) + 1;
    const baseId =
      input.acceptedPoem.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 80) || "poem";
    let candidate = baseId;
    let i = 2;
    while (await prisma.poem.findUnique({ where: { id: candidate } })) {
      candidate = `${baseId}-${i}`;
      i++;
    }
    const poem = await prisma.poem.create({
      data: {
        id: candidate,
        title: input.acceptedPoem.title.trim(),
        stanzas: stanzas as unknown as object,
        body: derived.body,
        excerpt: derived.excerpt,
        status: "DRAFT",
        featured: input.acceptedPoem.featured ?? false,
        penNameId: input.acceptedPoem.penNameId,
        collectionId: input.acceptedPoem.collectionId || null,
        literaryWorldId: input.acceptedPoem.literaryWorldId || null,
        tags: input.acceptedPoem.tags ?? [],
        year: input.acceptedPoem.year.trim(),
        form: input.acceptedPoem.form || null,
        linesCount: derived.linesCount,
        readTime: derived.readTime,
        note: input.acceptedPoem.note?.trim() || null,
        sortOrder,
        publishedAt: null,
      },
    });
    acceptedPoemId = poem.id;
  }

  return prisma.submission.update({
    where: { id },
    data: {
      status: input.status,
      reviewerId: admin.userId,
      reviewedAt: new Date(),
      rejectionReason: input.rejectionReason?.trim() || null,
      editorialNote: input.editorialNote?.trim() || null,
      acceptedPoemId,
    },
  });
}

/**
 * Submission write path.
 * Reads the current Supabase session to identify the submitter, then inserts
 * via Prisma. RLS is enforced on read; this server function is the trusted
 * insert path.
 */

import { prisma } from "@/lib/prisma";

export interface CreateSubmissionInput {
  title: string;
  manuscript: string;
  submissionType: string;
  name: string;
  email: string;
  bio?: string | undefined;
  preferredPenNameId?: string | null | undefined;
}

export interface CreateSubmissionResult {
  id: string;
}

export async function createSubmission(
  input: CreateSubmissionInput,
  userId: string,
): Promise<CreateSubmissionResult> {
  if (!input.title.trim()) throw new Error("Title is required");
  if (!input.manuscript.trim()) throw new Error("Manuscript is required");
  if (!input.name.trim()) throw new Error("Your name is required");
  if (!input.email.trim()) throw new Error("Email is required");
  if (input.manuscript.length < 20) throw new Error("Manuscript too short — minimum 20 characters");
  if (input.manuscript.length > 50000)
    throw new Error("Manuscript too long — maximum 50,000 characters");

  const submission = await prisma.submission.create({
    data: {
      title: input.title.trim().slice(0, 200),
      manuscript: input.manuscript.trim(),
      submissionType: input.submissionType,
      submitterName: input.name.trim().slice(0, 200),
      submitterEmail: input.email.trim().slice(0, 200),
      submitterBio: input.bio?.trim().slice(0, 2000) || null,
      submitterUserId: userId,
      preferredPenNameId: input.preferredPenNameId || null,
      status: "NEW",
      updatedAt: new Date(),
    },
    select: { id: true },
  });

  return { id: submission.id };
}

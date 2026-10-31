import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  getSubmission,
  listSubmissions,
  reviewSubmission,
  type ReviewSubmissionInput,
} from "./submissions.server";

const reviewSchema = z.object({
  status: z.enum(["UNDER_REVIEW", "ACCEPTED", "REJECTED"]),
  rejectionReason: z.string().nullable().optional(),
  editorialNote: z.string().nullable().optional(),
  acceptedPoem: z
    .object({
      title: z.string().min(1),
      penNameId: z.string().min(1),
      year: z.string().min(1),
      tags: z.array(z.string()).optional(),
      stanzas: z.array(z.array(z.string())),
      collectionId: z.string().nullable().optional(),
      literaryWorldId: z.string().nullable().optional(),
      note: z.string().nullable().optional(),
      form: z.string().nullable().optional(),
      featured: z.boolean().optional(),
    })
    .nullable()
    .optional(),
});

export const listSubmissionsFn = createServerFn({ method: "GET" })
  .validator((status: unknown) => (typeof status === "string" ? status : undefined))
  .handler(async ({ data }) => listSubmissions(data as never));

export const getSubmissionFn = createServerFn({ method: "GET" })
  .validator((id: unknown) => {
    if (typeof id !== "string" || !id) throw new Error("id required");
    return id;
  })
  .handler(async ({ data }) => getSubmission(data));

export const reviewSubmissionFn = createServerFn({ method: "POST" })
  .validator((d: unknown) => {
    const obj = d as { id: string; input: unknown };
    if (typeof obj?.id !== "string") throw new Error("id required");
    return { id: obj.id, input: reviewSchema.parse(obj.input) as ReviewSubmissionInput };
  })
  .handler(async ({ data }) => reviewSubmission(data.id, data.input));

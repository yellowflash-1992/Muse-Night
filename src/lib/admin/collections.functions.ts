import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  archiveCollection,
  createCollection,
  deleteCollection,
  getAdminCollection,
  listAdminCollections,
  publishCollection,
  updateCollection,
  type AdminCollectionInput,
} from "./collections.server";

const collectionInputSchema = z.object({
  title: z.string().min(1).max(200),
  subtitle: z.string().nullable().optional(),
  description: z.string().min(1),
  foreword: z.string().nullable().optional(),
  featuredQuote: z.string().nullable().optional(),
  coverImage: z.string().nullable().optional(),
  authorId: z.string().min(1),
  year: z.string().min(1).max(20),
  tags: z.array(z.string()).optional(),
  sortOrder: z.number().optional(),
});

export const listAdminCollectionsFn = createServerFn({ method: "GET" }).handler(async () =>
  listAdminCollections(),
);
export const getAdminCollectionFn = createServerFn({ method: "GET" })
  .validator((id: unknown) => {
    if (typeof id !== "string" || !id) throw new Error("id required");
    return id;
  })
  .handler(async ({ data }) => getAdminCollection(data));
export const createCollectionFn = createServerFn({ method: "POST" })
  .validator((input: unknown) => collectionInputSchema.parse(input) as AdminCollectionInput)
  .handler(async ({ data }) => createCollection(data));
export const updateCollectionFn = createServerFn({ method: "POST" })
  .validator((d: unknown) => {
    const obj = d as { id: string; input: unknown; status?: string };
    if (typeof obj?.id !== "string") throw new Error("id required");
    return {
      id: obj.id,
      input: collectionInputSchema.partial().parse(obj.input) as Partial<AdminCollectionInput>,
      status: obj.status as "DRAFT" | "PUBLISHED" | "ARCHIVED" | undefined,
    };
  })
  .handler(async ({ data }) =>
    updateCollection(data.id, data.status ? { ...data.input, status: data.status } : data.input),
  );
export const publishCollectionFn = createServerFn({ method: "POST" })
  .validator((id: unknown) => {
    if (typeof id !== "string" || !id) throw new Error("id required");
    return id;
  })
  .handler(async ({ data }) => publishCollection(data));
export const archiveCollectionFn = createServerFn({ method: "POST" })
  .validator((id: unknown) => {
    if (typeof id !== "string" || !id) throw new Error("id required");
    return id;
  })
  .handler(async ({ data }) => archiveCollection(data));
export const deleteCollectionFn = createServerFn({ method: "POST" })
  .validator((id: unknown) => {
    if (typeof id !== "string" || !id) throw new Error("id required");
    return id;
  })
  .handler(async ({ data }) => deleteCollection(data));

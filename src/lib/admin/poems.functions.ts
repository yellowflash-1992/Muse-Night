import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  archivePoem,
  createDraftPoem,
  deletePoem,
  getAdminPoem,
  listAdminPoems,
  publishPoem,
  updatePoem,
  type AdminPoemInput,
} from "./poems.server";

const stanzaSchema = z.array(z.array(z.string()));

const poemInputSchema = z.object({
  title: z.string().min(1).max(200),
  penNameId: z.string().min(1),
  year: z.string().min(1).max(20),
  readTime: z.string().optional(),
  tags: z.array(z.string()).optional(),
  stanzas: stanzaSchema,
  collectionId: z.string().nullable().optional(),
  literaryWorldId: z.string().nullable().optional(),
  note: z.string().nullable().optional(),
  form: z.string().nullable().optional(),
  featured: z.boolean().optional(),
  lineNotes: z
    .record(z.object({ count: z.number(), excerpt: z.string() }))
    .nullable()
    .optional(),
});

export const listAdminPoemsFn = createServerFn({ method: "GET" })
  .validator((status: unknown) => (typeof status === "string" ? status : undefined))
  .handler(async ({ data }) => {
    return listAdminPoems(data as never);
  });

export const getAdminPoemFn = createServerFn({ method: "GET" })
  .validator((id: unknown) => {
    if (typeof id !== "string" || !id) throw new Error("id required");
    return id;
  })
  .handler(async ({ data }) => getAdminPoem(data));

export const createDraftPoemFn = createServerFn({ method: "POST" })
  .validator((input: unknown) => poemInputSchema.parse(input) as AdminPoemInput)
  .handler(async ({ data }) => createDraftPoem(data));

export const updatePoemFn = createServerFn({ method: "POST" })
  .validator((d: unknown) => {
    const obj = d as { id: string; input: unknown };
    if (typeof obj?.id !== "string") throw new Error("id required");
    return {
      id: obj.id,
      input: poemInputSchema.partial().parse(obj.input) as Partial<AdminPoemInput>,
    };
  })
  .handler(async ({ data }) => updatePoem(data.id, data.input));

export const publishPoemFn = createServerFn({ method: "POST" })
  .validator((id: unknown) => {
    if (typeof id !== "string" || !id) throw new Error("id required");
    return id;
  })
  .handler(async ({ data }) => publishPoem(data));

export const archivePoemFn = createServerFn({ method: "POST" })
  .validator((id: unknown) => {
    if (typeof id !== "string" || !id) throw new Error("id required");
    return id;
  })
  .handler(async ({ data }) => archivePoem(data));

export const deletePoemFn = createServerFn({ method: "POST" })
  .validator((id: unknown) => {
    if (typeof id !== "string" || !id) throw new Error("id required");
    return id;
  })
  .handler(async ({ data }) => deletePoem(data));

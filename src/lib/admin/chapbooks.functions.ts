import { createServerFn } from "@tanstack/react-start";

import {
  archiveChapbook,
  createChapbook,
  deleteChapbook,
  getAdminChapbook,
  listChapbooksAdmin,
  publishChapbook,
  updateChapbook,
  type AdminChapbookInput,
} from "./chapbooks.server";

export const listChapbooksAdminFn = createServerFn({ method: "GET" }).handler(async () =>
  listChapbooksAdmin(),
);
export const getAdminChapbookFn = createServerFn({ method: "GET" })
  .validator((id: unknown) => {
    if (typeof id !== "string" || !id) throw new Error("id required");
    return id;
  })
  .handler(async ({ data }) => getAdminChapbook(data));
export const createChapbookFn = createServerFn({ method: "POST" })
  .validator((input: unknown) => input as AdminChapbookInput)
  .handler(async ({ data }) => createChapbook(data));
export const updateChapbookFn = createServerFn({ method: "POST" })
  .validator((d: unknown) => {
    const obj = d as { id: string; input: Partial<AdminChapbookInput> };
    if (typeof obj?.id !== "string") throw new Error("id required");
    return obj;
  })
  .handler(async ({ data }) => updateChapbook(data.id, data.input));
export const publishChapbookFn = createServerFn({ method: "POST" })
  .validator((id: unknown) => {
    if (typeof id !== "string" || !id) throw new Error("id required");
    return id;
  })
  .handler(async ({ data }) => publishChapbook(data));
export const archiveChapbookFn = createServerFn({ method: "POST" })
  .validator((id: unknown) => {
    if (typeof id !== "string" || !id) throw new Error("id required");
    return id;
  })
  .handler(async ({ data }) => archiveChapbook(data));
export const deleteChapbookFn = createServerFn({ method: "POST" })
  .validator((id: unknown) => {
    if (typeof id !== "string" || !id) throw new Error("id required");
    return id;
  })
  .handler(async ({ data }) => deleteChapbook(data));

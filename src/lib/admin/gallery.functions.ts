import { createServerFn } from "@tanstack/react-start";

import {
  createGalleryItem,
  deleteGalleryItem,
  listGalleryItems,
  updateGalleryItem,
  type AdminGalleryInput,
} from "./gallery.server";

export const listGalleryItemsAdminFn = createServerFn({ method: "GET" }).handler(async () =>
  listGalleryItems(),
);
export const createGalleryItemFn = createServerFn({ method: "POST" })
  .validator((input: unknown) => input as AdminGalleryInput)
  .handler(async ({ data }) => createGalleryItem(data));
export const updateGalleryItemFn = createServerFn({ method: "POST" })
  .validator((d: unknown) => {
    const obj = d as { id: string; input: Partial<AdminGalleryInput> };
    if (typeof obj?.id !== "string") throw new Error("id required");
    return obj;
  })
  .handler(async ({ data }) => updateGalleryItem(data.id, data.input));
export const deleteGalleryItemFn = createServerFn({ method: "POST" })
  .validator((id: unknown) => {
    if (typeof id !== "string" || !id) throw new Error("id required");
    return id;
  })
  .handler(async ({ data }) => deleteGalleryItem(data));

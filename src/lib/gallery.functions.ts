import { createServerFn } from "@tanstack/react-start";
import { getGalleryItemsRaw } from "./gallery.server";

export const getGalleryItems = createServerFn({ method: "GET" }).handler(async () => {
  return getGalleryItemsRaw();
});

import { createServerFn } from "@tanstack/react-start";
import {
  getPublishedChapbookByIdRaw,
  getPublishedChapbooksRaw,
  type UiChapbook,
} from "./chapbooks.server";

export const listPublishedChapbooks = createServerFn({ method: "GET" }).handler(
  async (): Promise<UiChapbook[]> => {
    return getPublishedChapbooksRaw();
  },
);

export const getPublishedChapbook = createServerFn({ method: "GET" })
  .validator((id: unknown) => {
    if (typeof id !== "string" || id.length === 0) {
      throw new Error("A chapbook id is required");
    }
    return id;
  })
  .handler(async ({ data: id }): Promise<UiChapbook | null> => {
    return getPublishedChapbookByIdRaw(id);
  });

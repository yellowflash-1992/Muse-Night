import { createServerFn } from "@tanstack/react-start";

import { getPublishedPoemRaw, getPublishedPoemsListRaw, type UiPoem } from "./poems.server";

export const getPublishedPoem = createServerFn({ method: "GET" })
  .validator((id: unknown) => {
    if (typeof id !== "string" || id.length === 0) {
      throw new Error("A poem id is required");
    }
    return id;
  })
  .handler(async ({ data: id }): Promise<UiPoem | null> => {
    return getPublishedPoemRaw(id);
  });

export const getPublishedPoemsList = createServerFn({ method: "GET" }).handler(
  async (): Promise<UiPoem[]> => {
    return getPublishedPoemsListRaw();
  },
);

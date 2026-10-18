import { createServerFn } from "@tanstack/react-start";

import { getPublishedPoemRaw, type UiPoem } from "./poems.server";

/**
 * Fetches one published poem by id with its public relations, mapped for the UI.
 * Returns `null` when the poem does not exist or is not PUBLISHED — the route
 * renders the existing not-found branch in that case (no static fallback).
 */
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

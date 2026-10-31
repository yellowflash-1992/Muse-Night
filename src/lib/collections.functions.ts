import { createServerFn } from "@tanstack/react-start";

import {
  getPublishedCollectionByIdRaw,
  getPublishedCollectionsListRaw,
  type UiCollectionDetail,
  type UiCollectionSummary,
} from "./collections.server";

export const listPublishedCollections = createServerFn({ method: "GET" }).handler(
  async (): Promise<UiCollectionSummary[]> => {
    return getPublishedCollectionsListRaw();
  },
);

export const getPublishedCollection = createServerFn({ method: "GET" })
  .validator((id: unknown) => {
    if (typeof id !== "string" || id.length === 0) {
      throw new Error("A collection id is required");
    }
    return id;
  })
  .handler(async ({ data: id }): Promise<UiCollectionDetail | null> => {
    return getPublishedCollectionByIdRaw(id);
  });

import { createFileRoute } from "@tanstack/react-router";

import { CollectionsIndexPage } from "@/features/collections/CollectionsIndexPage";

import { listPublishedCollections } from "@/lib/collections.functions";

export const Route = createFileRoute("/collections/")({
  loader: async () => {
    const collections = await listPublishedCollections();
    return { collections };
  },
  head: () => ({
    meta: [
      { title: "Poetry Collections &mdash; Muse Night" },
      {
        name: "description",
        content: "Explore our published poetry collections, suites, and collaborative anthologies.",
      },
    ],
  }),
  component: CollectionsIndexPage,
});

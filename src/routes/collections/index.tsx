import { createFileRoute } from "@tanstack/react-router";

import { CollectionsIndexPage } from "@/features/collections/CollectionsIndexPage";

export const Route = createFileRoute("/collections/")({
  head: () => ({
    meta: [
      { title: "Poetry Collections — Muse Books" },
      {
        name: "description",
        content:
          "Explore our published poetry collections, suites, and collaborative anthologies.",
      },
    ],
  }),
  component: CollectionsIndexPage,
});

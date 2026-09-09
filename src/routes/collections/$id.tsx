import { createFileRoute } from "@tanstack/react-router";

import { CollectionDetailPage } from "@/features/collections/CollectionDetailPage";

export const Route = createFileRoute("/collections/$id")({
  head: () => ({
    meta: [
      { title: "Collection — Muse Books" },
      {
        name: "description",
        content:
          "Poetry collection by Muse Books.",
      },
    ],
  }),
  component: CollectionDetailPage,
});

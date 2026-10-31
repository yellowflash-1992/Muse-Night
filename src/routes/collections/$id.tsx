import { createFileRoute } from "@tanstack/react-router";

import { CollectionDetailPage } from "@/features/collections/CollectionDetailPage";

import { getPublishedCollection } from "@/lib/collections.functions";

export const Route = createFileRoute("/collections/$id")({
  loader: async ({ params }) => {
    const collection = await getPublishedCollection({ data: params.id });
    return { collection };
  },
  head: () => ({
    meta: [
      { title: "Collection &mdash; Muse Night" },
      {
        name: "description",
        content: "Poetry collection by Muse Night.",
      },
    ],
  }),
  component: CollectionDetailPage,
});

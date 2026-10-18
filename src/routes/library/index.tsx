import { createFileRoute } from "@tanstack/react-router";

import { LibraryIndexPage } from "@/features/library/LibraryIndexPage";
import { getPublishedPoemsList } from "@/lib/poems.functions";

export const Route = createFileRoute("/library/")({
  loader: async () => {
    const poems = await getPublishedPoemsList();
    return { poems };
  },
  head: () => ({
    meta: [
      { title: "Library Archive — Muse Books" },
      {
        name: "description",
        content:
          "Browse all poems, prose poetry, epistles, and literary works in the Muse Books archive.",
      },
    ],
  }),
  component: LibraryIndexPage,
});

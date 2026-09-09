import { createFileRoute } from "@tanstack/react-router";

import { LibraryIndexPage } from "@/features/library/LibraryIndexPage";

export const Route = createFileRoute("/library/")({
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

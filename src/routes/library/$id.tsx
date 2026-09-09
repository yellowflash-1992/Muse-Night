import { createFileRoute } from "@tanstack/react-router";

import { LibraryPoemPage } from "@/features/library/LibraryPoemPage";

export const Route = createFileRoute("/library/$id")({
  head: () => ({
    meta: [
      { title: "Work — Muse Books" },
      {
        name: "description",
        content:
          "Browse works from Muse Books.",
      },
    ],
  }),
  component: LibraryPoemPage,
});

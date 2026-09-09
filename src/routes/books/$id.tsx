import { createFileRoute } from "@tanstack/react-router";

import { BookDetailPage } from "@/features/books/BookDetailPage";

export const Route = createFileRoute("/books/$id")({
  head: () => ({
    meta: [
      { title: "Chapbook — Muse Books" },
      {
        name: "description",
        content:
          "Hand-bound chapbook by Muse Books.",
      },
    ],
  }),
  component: BookDetailPage,
});

import { createFileRoute } from "@tanstack/react-router";

import { BooksIndexPage } from "@/features/books/BooksIndexPage";

export const Route = createFileRoute("/books/")({
  head: () => ({
    meta: [
      { title: "Hand-Bound Chapbooks — Muse Books" },
      {
        name: "description",
        content:
          "Hand-set metal type, mould-made rag paper, and Smyth-sewn bindings. Explore our limited letterpress chapbooks.",
      },
    ],
  }),
  component: BooksIndexPage,
});

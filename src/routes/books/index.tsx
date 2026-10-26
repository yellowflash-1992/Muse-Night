import { createFileRoute } from "@tanstack/react-router";

import { BooksIndexPage } from "@/features/books/BooksIndexPage";

import { listPublishedChapbooks } from "@/lib/chapbooks.functions";

export const Route = createFileRoute("/books/")({
  loader: async () => {
    const chapbooks = await listPublishedChapbooks();
    return { chapbooks };
  },
  head: () => ({
    meta: [
      { title: "Hand-Bound Chapbooks &mdash; Muse Books" },
      {
        name: "description",
        content:
          "Hand-set metal type, mould-made rag paper, and Smyth-sewn bindings. Explore our limited letterpress chapbooks.",
      },
    ],
  }),
  component: BooksIndexPage,
});

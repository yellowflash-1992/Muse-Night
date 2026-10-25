import { createFileRoute } from "@tanstack/react-router";

import { BookDetailPage } from "@/features/books/BookDetailPage";

import { getPublishedChapbook } from "@/lib/chapbooks.functions";

export const Route = createFileRoute("/books/$id")({
  loader: async ({ params }) => {
    const chapbook = await getPublishedChapbook({ data: params.id });
    return { chapbook };
  },
  head: () => ({
    meta: [
      { title: "Chapbook — Muse Books" },
      {
        name: "description",
        content: "Hand-bound chapbook by Muse Books.",
      },
    ],
  }),
  component: BookDetailPage,
});

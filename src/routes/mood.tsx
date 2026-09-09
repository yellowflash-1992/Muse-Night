import { createFileRoute } from "@tanstack/react-router";

import { MoodPage } from "@/features/mood/MoodPage";

export const Route = createFileRoute("/mood")({
  head: () => ({
    meta: [
      { title: "A Poem for Your Mood — Muse Books" },
      {
        name: "description",
        content:
          "Pick how you're feeling — or flip a penny — and receive a poem written for that exact mood.",
      },
    ],
  }),
  component: MoodPage,
});

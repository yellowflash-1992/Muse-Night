import { createFileRoute } from "@tanstack/react-router";

import { MoodPage } from "@/features/mood/MoodPage";

export const Route = createFileRoute("/mood")({
  head: () => ({
    meta: [
      { title: "A Poem for Your Mood &mdash; Muse Books" },
      {
        name: "description",
        content:
          "Pick how you're feeling &mdash; or flip a penny &mdash; and receive a poem written for that exact mood.",
      },
    ],
  }),
  component: MoodPage,
});

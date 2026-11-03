import { createFileRoute } from "@tanstack/react-router";

import { MoodPage } from "@/features/mood/MoodPage";
import { getCuratedMoodsFn } from "@/lib/mood.functions";

export const Route = createFileRoute("/mood")({
  loader: async () => ({ curatedMoods: await getCuratedMoodsFn() }),
  head: () => ({
    meta: [
      { title: "A Poem for Your Mood &mdash; Muse Night" },
      {
        name: "description",
        content:
          "Pick how you're feeling &mdash; or flip a penny &mdash; and receive a poem written for that exact mood.",
      },
    ],
  }),
  component: MoodPage,
});

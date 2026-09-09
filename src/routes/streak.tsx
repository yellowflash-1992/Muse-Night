import { createFileRoute } from "@tanstack/react-router";

import { StreakPage } from "@/features/streak/StreakPage";

export const Route = createFileRoute("/streak")({
  head: () => ({
    meta: [
      { title: "Daily Streak — Muse Books" },
      {
        name: "description",
        content:
          "Keep your daily streak and unlock today's bonus poem.",
      },
    ],
  }),
  component: StreakPage,
});

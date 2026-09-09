import { createFileRoute } from "@tanstack/react-router";

import { DailyPage } from "@/features/daily/DailyPage";

export const Route = createFileRoute("/daily")({
  head: () => ({
    meta: [
      { title: "Poetry Game — Muse Books" },
      {
        name: "description",
        content:
          "Poetry battles and six-word story challenges to unlock bonus poems.",
      },
    ],
  }),
  component: DailyPage,
});

import { createFileRoute } from "@tanstack/react-router";

import { StudyHallPage } from "@/features/study/StudyHallPage";

export const Route = createFileRoute("/study")({
  head: () => ({
    meta: [
      { title: "Study Hall — JAMB & WAEC Literature Room | Muse Books" },
      {
        name: "description",
        content:
          "Curated study guides, prescribed syllabus poetry annotations, drama breakdowns, and past question analysis for JAMB & WAEC Literature-in-English scholars.",
      },
    ],
  }),
  component: StudyHallPage,
});

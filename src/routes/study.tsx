import { createFileRoute } from "@tanstack/react-router";

import { StudyHallPage } from "@/features/study/StudyHallPage";

export const Route = createFileRoute("/study")({
  head: () => ({
    meta: [
      { title: "Study Hall — JAMB & WAEC Literature Room | Muse Books" },
      {
        name: "description",
        content:
          "A calm Literature-in-English preparation space for JAMB and WAEC, with study-room placeholders and a path into the Muse Night Library.",
      },
    ],
  }),
  component: StudyHallPage,
});

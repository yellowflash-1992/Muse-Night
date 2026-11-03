import { createFileRoute } from "@tanstack/react-router";

import { StudyHallPage } from "@/features/study/StudyHallPage";
import { getStudyGuidesFn } from "@/lib/study.functions";

export const Route = createFileRoute("/study/")({
  loader: async () => ({ guides: await getStudyGuidesFn() }),
  head: () => ({
    meta: [
      { title: "Study Hall &mdash; JAMB & WAEC Literature Room | Muse Night" },
      {
        name: "description",
        content: "Published Literature-in-English study guides for JAMB, WAEC, poetry, and drama.",
      },
    ],
  }),
  component: StudyHallPage,
});

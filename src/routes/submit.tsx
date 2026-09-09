import { createFileRoute } from "@tanstack/react-router";

import { SubmitPage } from "@/features/submit/SubmitPage";

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Submissions & Call for Poetry — Muse Books" },
      {
        name: "description",
        content:
          "Submit your poems, chapbook manuscripts, and literary musings to Muse Books. We read year-round.",
      },
    ],
  }),
  component: SubmitPage,
});

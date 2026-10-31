import { createFileRoute } from "@tanstack/react-router";

import { SubmitPage } from "@/features/submit/SubmitPage";

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Submissions & Call for Poetry &mdash; Muse Night" },
      {
        name: "description",
        content:
          "Submit your poems, chapbook manuscripts, and literary musings to Muse Night. We read year-round.",
      },
    ],
  }),
  component: SubmitPage,
});

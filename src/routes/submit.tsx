import { createFileRoute } from "@tanstack/react-router";

import { SubmitPage } from "@/features/submit/SubmitPage";
import { getSiteSettingsFn } from "@/lib/settings.functions";

export const Route = createFileRoute("/submit")({
  loader: async () => ({ settings: await getSiteSettingsFn() }),
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
  component: SubmitRoute,
});

function SubmitRoute() {
  const { settings } = Route.useLoaderData();
  return <SubmitPage settings={settings} />;
}

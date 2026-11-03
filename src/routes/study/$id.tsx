import { createFileRoute } from "@tanstack/react-router";

import { StudyGuideDetailPage } from "@/features/study/StudyGuideDetailPage";
import { getStudyGuideByIdFn } from "@/lib/study.functions";

export const Route = createFileRoute("/study/$id")({
  loader: async ({ params }) => {
    const guide = await getStudyGuideByIdFn({ data: params.id });
    return { guide };
  },
  head: ({ match }) => {
    const guide = match?.loaderData?.guide;
    return {
      meta: [
        {
          title: guide
            ? `${guide.title} &mdash; Study Hall | Muse Night`
            : "Study Guide &mdash; Muse Night",
        },
        {
          name: "description",
          content: guide
            ? `Read the full analysis of "${guide.title}" by ${guide.author}.`
            : "Read Literature-in-English study guides on Muse Night.",
        },
      ],
    };
  },
  component: StudyGuideDetailPage,
});

import { createFileRoute } from "@tanstack/react-router";

import { LibraryPoemPage } from "@/features/library/LibraryPoemPage";
import { getPublishedPoem } from "@/lib/poems.functions";

export const Route = createFileRoute("/library/$id")({
  // Server-side read: explicitly filters status PUBLISHED (RLS is not enforced
  // on the direct Prisma connection). Returns null for missing/unpublished.
  loader: async ({ params }) => {
    const poem = await getPublishedPoem({ data: params.id });
    return { poem };
  },
  head: ({ match }) => {
    const poem = match?.loaderData?.poem;
    return {
      meta: [
        {
          title: poem ? `${poem.title} — Muse Night` : "Work — Muse Night",
        },
        {
          name: "description",
          content: poem
            ? `Read “${poem.title}” by ${poem.author} in the Muse Night archive.`
            : "Browse works from Muse Night.",
        },
      ],
    };
  },
  component: LibraryPoemPage,
});

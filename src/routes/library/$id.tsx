import { createFileRoute } from "@tanstack/react-router";

import { LibraryPoemPage } from "@/features/library/LibraryPoemPage";
import { getPublishedPoem, getPublishedPoemsList } from "@/lib/poems.functions";

export const Route = createFileRoute("/library/$id")({
  validateSearch: (
    search: Record<string, unknown>,
  ): {
    from?: string | undefined;
    source?: string | undefined;
    collectionId?: string | undefined;
  } => {
    return {
      from: typeof search["from"] === "string" ? search["from"] : undefined,
      source: typeof search["source"] === "string" ? search["source"] : undefined,
      collectionId: typeof search["collectionId"] === "string" ? search["collectionId"] : undefined,
    };
  },
  loader: async ({ params }) => {
    const [poem, poems] = await Promise.all([
      getPublishedPoem({ data: params.id }),
      getPublishedPoemsList(),
    ]);
    return { poem, poems };
  },
  head: ({ match }) => {
    const poem = match?.loaderData?.poem;
    return {
      meta: [
        {
          title: poem ? `${poem.title} &mdash; Muse Night` : "Work &mdash; Muse Night",
        },
        {
          name: "description",
          content: poem
            ? `Read "${poem.title}" by ${poem.author} &mdash; a poem from the Muse Night archive.`
            : "Read poems from the Muse Night archive.",
        },
      ],
    };
  },
  component: LibraryPoemPage,
});

import { createFileRoute } from "@tanstack/react-router";

import { LibraryPoemPage } from "@/features/library/LibraryPoemPage";
import { getPublishedPoem, getPublishedPoemsList } from "@/lib/poems.functions";

export const Route = createFileRoute("/library/$id")({
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
          title: poem ? `${poem.title} — Muse Night` : "Work — Muse Night",
        },
        {
          name: "description",
          content: poem
            ? `Read "${poem.title}" by ${poem.author} — a poem from the Muse Books archive.`
            : "Read poems from the Muse Books archive.",
        },
      ],
    };
  },
  component: LibraryPoemPage,
});

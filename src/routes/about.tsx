import { createFileRoute } from "@tanstack/react-router";

import { AboutPage } from "@/features/about/AboutPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Press & Poets &mdash; Muse Night" },
      {
        name: "description",
        content: "Meet the voices of Muse Night: Irshand, Child of the Wilderness, and InkbyNur.",
      },
    ],
  }),
  component: AboutPage,
});

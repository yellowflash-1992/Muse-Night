import { createFileRoute } from "@tanstack/react-router";

import { AboutPage } from "@/features/about/AboutPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Press & Poets — Muse Books" },
      {
        name: "description",
        content:
          "Meet the voices of Muse Books: Irshand, Child of the Wilderness, and Raji Nurudeen Olawale.",
      },
    ],
  }),
  component: AboutPage,
});

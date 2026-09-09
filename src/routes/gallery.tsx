import { createFileRoute } from "@tanstack/react-router";

import { GalleryPage } from "@/features/gallery/GalleryPage";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Press Gallery & Plates — Muse Books" },
      {
        name: "description",
        content:
          "Visual archives of Muse Books: hand-bound chapbook covers, letterpress type specimens, studio photography, and portraits of the poets.",
      },
    ],
  }),
  component: GalleryPage,
});

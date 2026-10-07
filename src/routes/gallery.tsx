import { createFileRoute } from "@tanstack/react-router";

import { GalleryPage } from "@/features/gallery/GalleryPage";

export const Route = createFileRoute("/gallery")({
  validateSearch: (search: Record<string, unknown>) => ({
    category:
      search["category"] === "mystery" ||
      search["category"] === "masterworks" ||
      search["category"] === "poem-frames" ||
      search["category"] === "relics" ||
      search["category"] === "myth" ||
      search["category"] === "visual-poetry"
        ? search["category"]
        : undefined,
  }),
  head: () => ({
    meta: [
      { title: "A Literary Museum — Visual Archive | Muse Books" },
      {
        name: "description",
        content:
          "Explore Muse Night's literary museum: mystery, masterworks, poem frames, literary relics, myth and visual poetry.",
      },
    ],
  }),
  component: GalleryPage,
});

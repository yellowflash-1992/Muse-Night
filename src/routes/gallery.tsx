import { GalleryPage } from "@/features/gallery/GalleryPage";
import { getGalleryItems } from "@/lib/gallery.functions";
import { createFileRoute } from "@tanstack/react-router";

type GallerySearch = {
  category?: string | undefined;
};

export const Route = createFileRoute("/gallery")({
  validateSearch: (search: Record<string, unknown>): GallerySearch => {
    return { category: (search["category"] as string) || undefined };
  },
  loader: async () => {
    const collections = await getGalleryItems();
    return { collections };
  },
  component: GalleryPage,
});

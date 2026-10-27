import { GalleryPage } from "@/features/gallery/GalleryPage";
import { getGalleryItems } from "@/lib/gallery.functions";
import { ClientOnly, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/gallery")({
  validateSearch: (search: Record<string, unknown>): { category?: string | undefined } => {
    return { category: (search["category"] as string) || undefined };
  },
  loader: async () => {
    const collections = await getGalleryItems();
    return { collections };
  },
  component: () => (
    <ClientOnly
      fallback={<div className="p-12 text-center text-paper-dim">Loading gallery...</div>}
    >
      <GalleryPage />
    </ClientOnly>
  ),
});

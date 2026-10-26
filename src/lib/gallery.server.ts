import { prisma } from "@/lib/prisma";

export type GalleryCategoryId =
  "mystery" | "masterworks" | "poem-frames" | "relics" | "myth" | "visual-poetry";

export interface GalleryItemUI {
  id: string;
  title: string;
  image?: string;
  category: GalleryCategoryId;
  description: string;
  artist?: string;
  era?: string;
  source?: string;
  learnMoreUrl?: string;
  status: "curated" | "built-in" | "coming-soon";
  visual: "mystery" | "portrait" | "frame" | "relic" | "myth" | "poetry";
  frameStyle?: "minimal" | "romantic" | "melancholic" | "mystical" | "vintage" | "manuscript";
  bookId?: string;
  poemId?: string;
}

export async function getGalleryItemsRaw(): Promise<Record<GalleryCategoryId, GalleryItemUI[]>> {
  const rows = await prisma.galleryItem.findMany({
    where: { status: { in: ["CURATED", "BUILT_IN"] } },
    orderBy: { sortOrder: "asc" },
  });

  const collections: Record<GalleryCategoryId, GalleryItemUI[]> = {
    mystery: [],
    masterworks: [],
    "poem-frames": [],
    relics: [],
    myth: [],
    "visual-poetry": [],
  };

  for (const row of rows) {
    const categoryMap: Record<string, GalleryCategoryId> = {
      MYSTERY: "mystery",
      MASTERWORKS: "masterworks",
      POEM_FRAMES: "poem-frames",
      RELICS: "relics",
      MYTH: "myth",
      VISUAL_POETRY: "visual-poetry",
    };
    const statusMap: Record<string, "curated" | "built-in" | "coming-soon"> = {
      CURATED: "curated",
      BUILT_IN: "built-in",
      COMING_SOON: "coming-soon",
    };
    const visualMap: Record<
      string,
      "mystery" | "portrait" | "frame" | "relic" | "myth" | "poetry"
    > = {
      MYSTERY: "mystery",
      PORTRAIT: "portrait",
      FRAME: "frame",
      RELIC: "relic",
      MYTH: "myth",
      POETRY: "poetry",
    };
    const frameMap: Record<
      string,
      "minimal" | "romantic" | "melancholic" | "mystical" | "vintage" | "manuscript"
    > = {
      MINIMAL: "minimal",
      ROMANTIC: "romantic",
      MELANCHOLIC: "melancholic",
      MYSTICAL: "mystical",
      VINTAGE: "vintage",
      MANUSCRIPT: "manuscript",
    };

    const catId = categoryMap[row.category]!;

    collections[catId].push({
      id: row.id,
      title: row.title,
      category: catId,
      description: row.description,
      status: statusMap[row.status]!,
      visual: visualMap[row.visual]!,
      ...(row.imageUrl ? { image: row.imageUrl } : {}),
      ...(row.artist ? { artist: row.artist } : {}),
      ...(row.era ? { era: row.era } : {}),
      ...(row.source ? { source: row.source } : {}),
      ...(row.learnMoreUrl ? { learnMoreUrl: row.learnMoreUrl } : {}),
      ...(row.frameStyle ? { frameStyle: frameMap[row.frameStyle]! } : {}),
      ...(row.bookId ? { bookId: row.bookId } : {}),
      ...(row.poemId ? { poemId: row.poemId } : {}),
    });
  }
  return collections;
}

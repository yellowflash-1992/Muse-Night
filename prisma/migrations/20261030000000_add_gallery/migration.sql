-- Migration: Add GalleryItem model
-- Created: 2026-10-30

CREATE TYPE "GalleryCategory" AS ENUM ('MYSTERY', 'MASTERWORKS', 'POEM_FRAMES', 'RELICS', 'MYTH', 'VISUAL_POETRY');
CREATE TYPE "GalleryStatus" AS ENUM ('CURATED', 'BUILT_IN', 'COMING_SOON');
CREATE TYPE "GalleryVisual" AS ENUM ('MYSTERY', 'PORTRAIT', 'FRAME', 'RELIC', 'MYTH', 'POETRY');
CREATE TYPE "FrameStyle" AS ENUM ('MINIMAL', 'ROMANTIC', 'MELANCHOLIC', 'MYSTICAL', 'VINTAGE', 'MANUSCRIPT');

CREATE TABLE "GalleryItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" "GalleryCategory" NOT NULL,
    "description" TEXT NOT NULL,
    "artist" TEXT,
    "era" TEXT,
    "source" TEXT,
    "learnMoreUrl" TEXT,
    "status" "GalleryStatus" NOT NULL DEFAULT 'COMING_SOON',
    "visual" "GalleryVisual" NOT NULL,
    "frameStyle" "FrameStyle",
    "imageUrl" TEXT,
    "bookId" TEXT,
    "poemId" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GalleryItem_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "GalleryItem_category_idx" ON "GalleryItem"("category");
CREATE INDEX "GalleryItem_status_idx" ON "GalleryItem"("status");

ALTER TABLE "GalleryItem" ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON TABLE "GalleryItem" TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE "GalleryItem" TO authenticated;

CREATE POLICY "public_read_published_gallery" ON "GalleryItem"
  FOR SELECT USING ("status" != 'COMING_SOON'); -- Public sees CURATED and BUILT_IN

CREATE POLICY "admin_all_gallery" ON "GalleryItem"
  FOR ALL TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

NOTIFY pgrst, 'reload schema';

-- Migration: Add Chapbook model (minimal, 9 content fields)
-- Created: 2026-10-24
-- Physical specs (binding, paper, dimensions, edition) live in a shared
-- frontend "Press Specifications" block — they're identical for every
-- chapbook, so no reason to duplicate per row.

CREATE TABLE "Chapbook" (
    "id"          TEXT NOT NULL,
    "title"       TEXT NOT NULL,
    "authorId"    TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quote"       TEXT NOT NULL,
    "coverImage"  TEXT NOT NULL,
    "price"       TEXT NOT NULL,
    "year"        TEXT NOT NULL,
    "status"      "PublicationStatus" NOT NULL DEFAULT 'DRAFT',
    "sortOrder"   INTEGER NOT NULL DEFAULT 0,
    "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"   TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chapbook_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Chapbook_authorId_idx"  ON "Chapbook"("authorId");
CREATE INDEX "Chapbook_status_idx"    ON "Chapbook"("status");
CREATE INDEX "Chapbook_sortOrder_idx" ON "Chapbook"("sortOrder");

ALTER TABLE "Chapbook"
  ADD CONSTRAINT "Chapbook_authorId_fkey"
  FOREIGN KEY ("authorId") REFERENCES "PenName"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Chapbook" ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON TABLE "Chapbook" TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE "Chapbook" TO authenticated;

CREATE POLICY "public_read_published_chapbook" ON "Chapbook"
  FOR SELECT USING ("status" = 'PUBLISHED');

CREATE POLICY "admin_read_chapbook" ON "Chapbook"
  FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));

CREATE POLICY "admin_insert_chapbook" ON "Chapbook"
  FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "admin_update_chapbook" ON "Chapbook"
  FOR UPDATE TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "admin_delete_chapbook" ON "Chapbook"
  FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

NOTIFY pgrst, 'reload schema';

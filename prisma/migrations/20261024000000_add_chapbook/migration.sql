-- Migration: Add Chapbook model with RLS policies
-- Created: 2026-10-24
-- Enables letterpress chapbook catalog. RLS + policies included inline so
-- every environment gets the full security posture on `migrate deploy` —
-- no manual SQL Editor steps required (lesson from add_submission gap).

-- ============================================================================
-- 1. Create table
-- ============================================================================

CREATE TABLE "Chapbook" (
    "id"              TEXT NOT NULL,
    "title"           TEXT NOT NULL,
    "authorId"        TEXT NOT NULL,
    "price"           TEXT NOT NULL,
    "pages"           INTEGER NOT NULL,
    "edition"         TEXT NOT NULL,
    "binding"         TEXT NOT NULL,
    "paper"           TEXT NOT NULL,
    "dimensions"      TEXT NOT NULL,
    "printRun"        TEXT NOT NULL,
    "proofNotes"      TEXT NOT NULL,
    "description"     TEXT NOT NULL,
    "quote"           TEXT NOT NULL,
    "tableOfContents" TEXT[],
    "coverImage"      TEXT NOT NULL,
    "inStock"         BOOLEAN NOT NULL DEFAULT true,
    "year"            TEXT NOT NULL,
    "tags"            TEXT[],
    "status"          "PublicationStatus" NOT NULL DEFAULT 'DRAFT',
    "sortOrder"       INTEGER NOT NULL DEFAULT 0,
    "createdAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"       TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chapbook_pkey" PRIMARY KEY ("id")
);

-- ============================================================================
-- 2. Indexes
-- ============================================================================

CREATE INDEX "Chapbook_authorId_idx"  ON "Chapbook"("authorId");
CREATE INDEX "Chapbook_status_idx"    ON "Chapbook"("status");
CREATE INDEX "Chapbook_sortOrder_idx" ON "Chapbook"("sortOrder");

-- ============================================================================
-- 3. Foreign key (PenName)
-- ============================================================================

ALTER TABLE "Chapbook"
  ADD CONSTRAINT "Chapbook_authorId_fkey"
  FOREIGN KEY ("authorId") REFERENCES "PenName"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;

-- ============================================================================
-- 4. Enable RLS
-- ============================================================================

ALTER TABLE "Chapbook" ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 5. Grants
-- ============================================================================

-- Public read (matches Poem/Collection pattern)
GRANT SELECT ON TABLE "Chapbook" TO anon;
-- Full CRUD for authenticated (RLS gates what each role can do)
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE "Chapbook" TO authenticated;

-- ============================================================================
-- 6. RLS Policies
-- ============================================================================

-- Public read: any role (including anon) can see PUBLISHED chapbooks
CREATE POLICY "public_read_published_chapbook" ON "Chapbook"
  FOR SELECT
  USING ("status" = 'PUBLISHED');

-- Admin read: admins see all chapbooks including drafts + archived
CREATE POLICY "admin_read_chapbook" ON "Chapbook"
  FOR SELECT TO authenticated
  USING (public.is_admin(auth.uid()));

-- Admin insert
CREATE POLICY "admin_insert_chapbook" ON "Chapbook"
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin(auth.uid()));

-- Admin update
CREATE POLICY "admin_update_chapbook" ON "Chapbook"
  FOR UPDATE TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- Admin delete
CREATE POLICY "admin_delete_chapbook" ON "Chapbook"
  FOR DELETE TO authenticated
  USING (public.is_admin(auth.uid()));

-- ============================================================================
-- 7. Reload PostgREST schema cache
-- ============================================================================

NOTIFY pgrst, 'reload schema';

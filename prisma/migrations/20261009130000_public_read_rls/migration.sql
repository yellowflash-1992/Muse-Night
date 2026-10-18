-- Migration: Public read RLS policies for content tables
-- Created: 2026-10-09
-- Depends on: 20261009120000_add_content_models (tables must exist)

-- ============================================================================
-- RLS Policies for Public Content Read Access
-- Targets physical table names: "PenName", "Collection", "Poem"
-- These match the Prisma model names (no @@map, PascalCase)
-- ============================================================================

-- Enable RLS on content tables
ALTER TABLE "PenName" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Collection" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Poem" ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- PUBLIC READ: Published content only
-- Uses Supabase anon key (auth.uid() = NULL)
-- Applied via PostgREST (Supabase client), NOT direct Prisma connection
-- ============================================================================

-- PenName: Public read all (needed for author pages, bylines)
CREATE POLICY "public_read_pen_name" ON "PenName"
  FOR SELECT USING (true);

-- Collection: Public read only PUBLISHED
CREATE POLICY "public_read_published_collection" ON "Collection"
  FOR SELECT USING ("status" = 'PUBLISHED');

-- Poem: Public read only PUBLISHED
CREATE POLICY "public_read_published_poem" ON "Poem"
  FOR SELECT USING ("status" = 'PUBLISHED');

-- ============================================================================
-- GRANTS: Ensure anon role can SELECT through PostgREST
-- (RLS policies handle filtering; grants allow table access)
-- ============================================================================

GRANT SELECT ON "PenName" TO anon;
GRANT SELECT ON "Collection" TO anon;
GRANT SELECT ON "Poem" TO anon;

-- ============================================================================
-- VERIFICATION QUERIES (run after applying in Supabase SQL Editor)
-- ============================================================================

-- 1. Verify RLS enabled
-- SELECT tablename, rowsecurity FROM pg_tables WHERE tablename IN ('PenName', 'Collection', 'Poem');

-- 2. Verify policies exist
-- SELECT policyname, tablename, cmd, qual FROM pg_policies WHERE tablename IN ('PenName', 'Collection', 'Poem');

-- 3. Test anon access via PostgREST (should return only published)
-- curl -H "apikey: $ANON_KEY" "https://$PROJECT.supabase.co/rest/v1/Poem?select=id,title,status&status=eq.PUBLISHED"
-- curl -H "apikey: $ANON_KEY" "https://$PROJECT.supabase.co/rest/v1/Poem?select=id,title,status&status=eq.DRAFT"
-- (Second query should return empty array)

-- 4. IMPORTANT: Public app uses Prisma direct connection (bypasses RLS)
-- Public read queries MUST filter: .where({ status: 'PUBLISHED' })
-- RLS only protects PostgREST/Supabase client access (Admin writes, future public API)
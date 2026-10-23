-- Migration: Enable RLS + per-user policies on auth tables
-- Created: 2026-10-23
-- Purpose: launch blocker — prevents signed-in users from reading each
-- other's role/admin/access-request records via PostgREST.

-- ============================================================================
-- 1. SECURITY DEFINER helper: is_admin(uid)
-- ============================================================================
-- Uses plpgsql (not sql) to prevent inlining, which would lose SECURITY
-- DEFINER context and cause infinite recursion when called from a policy on
-- a table that queries UserRole.

CREATE OR REPLACE FUNCTION public.is_admin(uid uuid)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM "UserRole"
    WHERE "userId" = uid::text
      AND role = 'ADMIN'
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO authenticated;

-- ============================================================================
-- 2. MemberProfile — user sees/updates only their own row
-- ============================================================================

ALTER TABLE "MemberProfile" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "member_profile_read_own" ON "MemberProfile"
  FOR SELECT TO authenticated
  USING (id = (SELECT auth.uid())::text);

CREATE POLICY "member_profile_update_own" ON "MemberProfile"
  FOR UPDATE TO authenticated
  USING (id = (SELECT auth.uid())::text)
  WITH CHECK (id = (SELECT auth.uid())::text);

CREATE POLICY "member_profile_insert_own" ON "MemberProfile"
  FOR INSERT TO authenticated
  WITH CHECK (id = (SELECT auth.uid())::text);

-- ============================================================================
-- 3. UserRole — user sees only their own role; no client writes
-- ============================================================================

ALTER TABLE "UserRole" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_role_read_own" ON "UserRole"
  FOR SELECT TO authenticated
  USING ("userId" = (SELECT auth.uid())::text);

-- ============================================================================
-- 4. FounderAdmin — user sees only their own founder record
-- ============================================================================

ALTER TABLE "FounderAdmin" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "founder_admin_read_own" ON "FounderAdmin"
  FOR SELECT TO authenticated
  USING ("userId" = (SELECT auth.uid())::text);

-- ============================================================================
-- 5. AdminAccessRequest — own requests + admins see all
-- ============================================================================

ALTER TABLE "AdminAccessRequest" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "access_request_read_own" ON "AdminAccessRequest"
  FOR SELECT TO authenticated
  USING ("requesterId" = (SELECT auth.uid())::text);

CREATE POLICY "access_request_admin_read_all" ON "AdminAccessRequest"
  FOR SELECT TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "access_request_insert_own" ON "AdminAccessRequest"
  FOR INSERT TO authenticated
  WITH CHECK ("requesterId" = (SELECT auth.uid())::text);

CREATE POLICY "access_request_admin_update" ON "AdminAccessRequest"
  FOR UPDATE TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- ============================================================================
-- 6. Person — authenticated read only (public site uses Prisma, not PostgREST)
-- ============================================================================

ALTER TABLE "Person" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "person_read_authenticated" ON "Person"
  FOR SELECT TO authenticated
  USING (true);

-- ============================================================================
-- 7. LiteraryWorld — authenticated read only (reference data)
-- ============================================================================

ALTER TABLE "LiteraryWorld" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "literary_world_read_authenticated" ON "LiteraryWorld"
  FOR SELECT TO authenticated
  USING (true);

-- ============================================================================
-- 8. Force PostgREST to reload schema + policies
-- ============================================================================

NOTIFY pgrst, 'reload schema';

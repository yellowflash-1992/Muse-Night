-- Migration: Harden public content table privileges
-- Created: 2026-10-09
-- Depends on: 20261009130000_public_read_rls (tables + public-read policies exist)
--
-- Scope (narrow, by audit request):
--   * Only three existing tables: "PenName", "Collection", "Poem".
--   * Only three roles:            anon, authenticated, service_role.
--   * Only these privileges:       REFERENCES, TRIGGER, TRUNCATE, MAINTAIN.
--   * No change to:                SELECT / INSERT / UPDATE / DELETE grants,
--                                  RLS policies, triggers, table data, or any
--                                  other table in any schema.
--
-- Background: a live privilege audit found anon/authenticated/service_role hold
-- REFERENCES, TRIGGER and TRUNCATE on these tables. pg_default_acl shows these
-- come from default table privileges for objects created by role postgres in
-- schema public (MAINTAIN included in the defaults). We therefore revoke both
-- on the existing tables AND from the defaults so future tables created by
-- postgres in public do not re-acquire them.
--
-- PostgreSQL 17 notes:
--   * MAINTAIN is a PostgreSQL 17+ table privilege (introduced in PG17), valid
--     in both GRANT and REVOKE, and valid inside ALTER DEFAULT PRIVILEGES.
--   * REVOKE without CASCADE removes only the listed privileges and fails only
--     if a dependent object (e.g. a FK created BY that role) exists. REVOKE
--     ... GRANT OPTION FOR ... CASCADE (below) removes any grant options those
--     roles may have passed on. Neither drops table data.
--   * All statements are idempotent in effect: revoking a privilege the role
--     does not hold is a successful no-op.
--   * Ordering: GRANT OPTION FOR ... CASCADE runs BEFORE the plain REVOKE, so
--     dependent grants are removed first and the RESTRICT default of the plain
--     REVOKE cannot abort the migration.

-- ============================================================================
-- 1. Revoke table privileges on the three EXISTING content tables
-- ============================================================================
-- ORDER MATTERS. A plain REVOKE defaults to RESTRICT and will fail if the
-- privilege being revoked is itself a grant option that has been passed on
-- (dependent grants). So the GRANT OPTION FOR ... CASCADE statement runs
-- FIRST, clearing any options and dependent grants, before the base
-- privileges are revoked.

-- Step 1a: drop grant options (and, with CASCADE, any dependent grants made
-- using them) so the plain REVOKE below cannot fail on RESTRICT.
REVOKE GRANT OPTION FOR REFERENCES, TRIGGER, TRUNCATE, MAINTAIN
  ON TABLE "PenName", "Collection", "Poem"
  FROM anon, authenticated, service_role CASCADE;

-- Step 1b: revoke the base privileges themselves. Idempotent: revoking a
-- privilege the role does not hold is a successful no-op.
REVOKE REFERENCES, TRIGGER, TRUNCATE, MAINTAIN
  ON TABLE "PenName", "Collection", "Poem"
  FROM anon, authenticated, service_role;

-- ============================================================================
-- 2. Revoke DEFAULT TABLE PRIVILEGES for future objects created by postgres
--    in schema public (this is where pg_default_acl showed them configured)
-- ============================================================================
-- Same ordering as section 1: grant options first (CASCADE), then the base
-- revocation.

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public
  REVOKE GRANT OPTION FOR REFERENCES, TRIGGER, TRUNCATE, MAINTAIN ON TABLES
  FROM anon, authenticated, service_role CASCADE;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public
  REVOKE REFERENCES, TRIGGER, TRUNCATE, MAINTAIN ON TABLES
  FROM anon, authenticated, service_role;

-- ============================================================================
-- 3. Preserve the intended public read path (no-op if already present)
--    Keeps the existing anon SELECT grant intact after the revokes above.
-- ============================================================================

GRANT SELECT ON TABLE "PenName", "Collection", "Poem" TO anon;

-- ============================================================================
-- 4. Verification queries (run manually after deploy; NOT executed here)
-- ============================================================================
-- Table privileges remaining for the three roles (expect: SELECT only, anon only):
-- SELECT grantee, table_name, privilege_type
--   FROM information_schema.role_table_grants
--  WHERE table_schema = 'public'
--    AND table_name IN ('PenName', 'Collection', 'Poem')
--    AND grantee IN ('anon', 'authenticated', 'service_role')
--  ORDER BY table_name, grantee, privilege_type;
--
-- Remaining default ACLs for postgres in public (expect: no rows for these roles):
-- SELECT * FROM pg_default_acl
--  WHERE defaclnamespace = 'public'::regnamespace
--    AND defaclrole = 'postgres'::regrole;

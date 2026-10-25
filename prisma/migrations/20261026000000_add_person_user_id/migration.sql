-- Migration: Add Person.userId for per-user pen name scoping
-- Idempotent: dev already has this column manually; prod needs it
-- Created: 2026-10-26

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'Person'
      AND column_name = 'userId'
  ) THEN
    ALTER TABLE "Person" ADD COLUMN "userId" TEXT;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'Person_userId_key'
  ) THEN
    ALTER TABLE "Person" ADD CONSTRAINT "Person_userId_key" UNIQUE ("userId");
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS "Person_userId_idx" ON "Person"("userId");

NOTIFY pgrst, 'reload schema';

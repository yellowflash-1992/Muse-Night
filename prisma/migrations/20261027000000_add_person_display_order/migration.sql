-- Migration: Add Person.displayOrder for poet ordering
-- Idempotent: safe on dev (column exists manually) and prod (adds column)
-- Created: 2026-10-27

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'Person'
      AND column_name = 'displayOrder'
  ) THEN
    ALTER TABLE "Person" ADD COLUMN "displayOrder" INTEGER NOT NULL DEFAULT 0;
  END IF;
END $$;

NOTIFY pgrst, 'reload schema';

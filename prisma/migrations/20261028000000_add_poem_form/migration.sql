-- Migration: Add form column to Poem
-- Idempotent: safe to run on dev (no-op) and prod (adds column)

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'Poem' AND column_name = 'form'
  ) THEN
    ALTER TABLE "Poem" ADD COLUMN "form" TEXT;
  END IF;
END $$;

NOTIFY pgrst, 'reload schema';

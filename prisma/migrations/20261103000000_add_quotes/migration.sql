CREATE TABLE "Quote" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "author" TEXT NOT NULL DEFAULT 'Muse Night',
    "status" TEXT NOT NULL DEFAULT 'PUBLISHED',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Quote" ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON TABLE "Quote" TO anon;
GRANT ALL ON TABLE "Quote" TO authenticated;

CREATE POLICY "public_read_quotes" ON "Quote" FOR SELECT USING (status = 'PUBLISHED');
CREATE POLICY "admin_all_quotes" ON "Quote" FOR ALL TO authenticated USING (public.is_admin(auth.uid()));

NOTIFY pgrst, 'reload schema';

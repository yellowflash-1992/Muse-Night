CREATE TABLE "ReflectionLike" (
    "id" TEXT NOT NULL,
    "reflectionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "ReflectionLike_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ReflectionLike_reflectionId_userId_key" ON "ReflectionLike"("reflectionId", "userId");
CREATE INDEX "ReflectionLike_reflectionId_idx" ON "ReflectionLike"("reflectionId");

ALTER TABLE "ReflectionLike" ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, DELETE ON TABLE "ReflectionLike" TO authenticated;
GRANT SELECT ON TABLE "ReflectionLike" TO anon;

CREATE POLICY "public_read_likes" ON "ReflectionLike" FOR SELECT USING (true);
CREATE POLICY "user_insert_likes" ON "ReflectionLike" FOR INSERT TO authenticated WITH CHECK (auth.uid()::text = "userId");
CREATE POLICY "user_delete_own_likes" ON "ReflectionLike" FOR DELETE TO authenticated USING (auth.uid()::text = "userId");

ALTER TABLE "ReflectionLike" ADD CONSTRAINT "ReflectionLike_reflectionId_fkey" FOREIGN KEY ("reflectionId") REFERENCES "Reflection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

NOTIFY pgrst, 'reload schema';

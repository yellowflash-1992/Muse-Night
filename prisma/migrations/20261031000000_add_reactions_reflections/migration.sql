CREATE TABLE "Reaction" (
    "id" TEXT NOT NULL,
    "poemId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Reflection" (
    "id" TEXT NOT NULL,
    "poemId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Reflection_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Reaction_poemId_userId_emoji_key" ON "Reaction"("poemId", "userId", "emoji");
CREATE INDEX "Reaction_poemId_idx" ON "Reaction"("poemId");
CREATE INDEX "Reflection_poemId_idx" ON "Reflection"("poemId");

ALTER TABLE "Reaction" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Reflection" ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, DELETE ON TABLE "Reaction" TO authenticated;
GRANT SELECT, INSERT, DELETE ON TABLE "Reflection" TO authenticated;
GRANT SELECT ON TABLE "Reaction" TO anon;
GRANT SELECT ON TABLE "Reflection" TO anon;

-- Policies for Reactions
CREATE POLICY "public_read_reactions" ON "Reaction" FOR SELECT USING (true);
CREATE POLICY "user_insert_reactions" ON "Reaction" FOR INSERT TO authenticated WITH CHECK (auth.uid()::text = "userId");
CREATE POLICY "user_delete_own_reactions" ON "Reaction" FOR DELETE TO authenticated USING (auth.uid()::text = "userId");

-- Policies for Reflections
CREATE POLICY "public_read_reflections" ON "Reflection" FOR SELECT USING (true);
CREATE POLICY "user_insert_reflections" ON "Reflection" FOR INSERT TO authenticated WITH CHECK (auth.uid()::text = "userId");
CREATE POLICY "user_delete_own_reflections" ON "Reflection" FOR DELETE TO authenticated USING (auth.uid()::text = "userId");

NOTIFY pgrst, 'reload schema';

-- Drop the old unique constraint that allowed multiple reactions
DROP INDEX IF EXISTS "Reaction_poemId_userId_emoji_key";

-- Add the new unique constraint (one reaction per user per poem)
CREATE UNIQUE INDEX "Reaction_poemId_userId_key" ON "Reaction"("poemId", "userId");

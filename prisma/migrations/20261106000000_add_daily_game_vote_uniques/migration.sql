CREATE UNIQUE INDEX "DuelVote_gameId_userId_key" ON "DuelVote"("gameId", "userId");

CREATE INDEX "SixWordStory_gameId_idx" ON "SixWordStory"("gameId");

CREATE UNIQUE INDEX "StoryVote_storyId_userId_key" ON "StoryVote"("storyId", "userId");

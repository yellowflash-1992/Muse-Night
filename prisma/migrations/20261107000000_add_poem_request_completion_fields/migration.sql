ALTER TABLE "PoemRequest"
ADD COLUMN "adminResponse" TEXT,
ADD COLUMN "deliveredPoemId" TEXT;

CREATE INDEX "PoemRequest_userId_createdAt_idx"
ON "PoemRequest"("userId", "createdAt");

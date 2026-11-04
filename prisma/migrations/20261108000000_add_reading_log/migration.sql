-- CreateTable
CREATE TABLE "ReadingLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "poemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReadingLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ReadingLog_userId_idx" ON "ReadingLog"("userId");

-- CreateIndex
CREATE INDEX "ReadingLog_poemId_idx" ON "ReadingLog"("poemId");

-- CreateIndex
CREATE INDEX "ReadingLog_createdAt_idx" ON "ReadingLog"("createdAt");

-- CreateTable
CREATE TABLE "LiteraryWorld" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LiteraryWorld_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LiteraryWorld_creatorId_idx" ON "LiteraryWorld"("creatorId");

-- AddForeignKey
ALTER TABLE "LiteraryWorld" ADD CONSTRAINT "LiteraryWorld_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


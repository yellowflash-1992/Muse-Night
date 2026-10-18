-- Migration: Add content models (PenName, Collection, Poem)
-- Created: 2026-10-09
-- Depends on: 20261008180000_add_role_based_authorization (for Person, LiteraryWorld, enums)

-- CreateEnum
CREATE TYPE "PublicationStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateTable: PenName
CREATE TABLE "PenName" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "literaryIdentity" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "literaryWorldId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PenName_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Collection
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT NOT NULL,
    "foreword" TEXT,
    "featuredQuote" TEXT,
    "coverImage" TEXT,
    "status" "PublicationStatus" NOT NULL DEFAULT 'DRAFT',
    "authorId" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "tags" TEXT[],
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Poem
CREATE TABLE "Poem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "stanzas" JSONB NOT NULL,
    "body" TEXT,
    "excerpt" TEXT,
    "status" "PublicationStatus" NOT NULL DEFAULT 'DRAFT',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "penNameId" TEXT NOT NULL,
    "collectionId" TEXT,
    "literaryWorldId" TEXT,
    "tags" TEXT[],
    "year" TEXT NOT NULL,
    "linesCount" INTEGER NOT NULL,
    "readTime" TEXT NOT NULL,
    "note" TEXT,
    "lineNotes" JSONB,
    "coverImage" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Poem_pkey" PRIMARY KEY ("id")
);

-- CreateIndexes
CREATE UNIQUE INDEX "PenName_name_key" ON "PenName"("name");
CREATE INDEX "PenName_personId_idx" ON "PenName"("personId");
CREATE INDEX "PenName_literaryWorldId_idx" ON "PenName"("literaryWorldId");

CREATE INDEX "Collection_authorId_idx" ON "Collection"("authorId");
CREATE INDEX "Collection_status_idx" ON "Collection"("status");
CREATE INDEX "Collection_sortOrder_idx" ON "Collection"("sortOrder");

CREATE INDEX "Poem_penNameId_idx" ON "Poem"("penNameId");
CREATE INDEX "Poem_collectionId_idx" ON "Poem"("collectionId");
CREATE INDEX "Poem_literaryWorldId_idx" ON "Poem"("literaryWorldId");
CREATE INDEX "Poem_status_idx" ON "Poem"("status");
CREATE INDEX "Poem_featured_idx" ON "Poem"("featured");
CREATE INDEX "Poem_sortOrder_idx" ON "Poem"("sortOrder");
CREATE INDEX "Poem_publishedAt_idx" ON "Poem"("publishedAt");

-- AddForeignKeys
-- PenName.personId -> Person.id (CASCADE: deleting person deletes pen names)
ALTER TABLE "PenName" ADD CONSTRAINT "PenName_personId_fkey"
    FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- PenName.literaryWorldId -> LiteraryWorld.id (SET NULL)
ALTER TABLE "PenName" ADD CONSTRAINT "PenName_literaryWorldId_fkey"
    FOREIGN KEY ("literaryWorldId") REFERENCES "LiteraryWorld"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Collection.authorId -> PenName.id (RESTRICT: cannot delete pen name with collections)
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_authorId_fkey"
    FOREIGN KEY ("authorId") REFERENCES "PenName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Poem.penNameId -> PenName.id (RESTRICT)
ALTER TABLE "Poem" ADD CONSTRAINT "Poem_penNameId_fkey"
    FOREIGN KEY ("penNameId") REFERENCES "PenName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Poem.collectionId -> Collection.id (SET NULL)
ALTER TABLE "Poem" ADD CONSTRAINT "Poem_collectionId_fkey"
    FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Poem.literaryWorldId -> LiteraryWorld.id (SET NULL)
ALTER TABLE "Poem" ADD CONSTRAINT "Poem_literaryWorldId_fkey"
    FOREIGN KEY ("literaryWorldId") REFERENCES "LiteraryWorld"("id") ON DELETE SET NULL ON UPDATE CASCADE;
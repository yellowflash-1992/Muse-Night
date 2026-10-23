-- Migration: Add Submission model
-- Created: 2026-10-21
-- Enables editorial inbox for external poem submissions

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('NEW', 'UNDER_REVIEW', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "manuscript" TEXT NOT NULL,
    "submissionType" TEXT NOT NULL,
    "submitterName" TEXT NOT NULL,
    "submitterEmail" TEXT NOT NULL,
    "submitterBio" TEXT,
    "submitterUserId" TEXT,
    "preferredPenNameId" TEXT,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'NEW',
    "reviewerId" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "rejectionReason" TEXT,
    "editorialNote" TEXT,
    "acceptedPoemId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Submission_acceptedPoemId_key" ON "Submission"("acceptedPoemId");
CREATE INDEX "Submission_status_idx" ON "Submission"("status");
CREATE INDEX "Submission_submitterEmail_idx" ON "Submission"("submitterEmail");
CREATE INDEX "Submission_submitterUserId_idx" ON "Submission"("submitterUserId");
CREATE INDEX "Submission_createdAt_idx" ON "Submission"("createdAt");

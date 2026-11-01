ALTER TABLE "Quote"
ADD COLUMN "penNameId" TEXT;

UPDATE "Quote"
SET "penNameId" = "PenName"."id"
FROM "PenName"
WHERE "Quote"."author" = "PenName"."name";

CREATE INDEX "Quote_penNameId_idx" ON "Quote"("penNameId");

ALTER TABLE "Quote"
ADD CONSTRAINT "Quote_penNameId_fkey"
FOREIGN KEY ("penNameId") REFERENCES "PenName"("id")
ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateEnum safely
DO $$ BEGIN
    CREATE TYPE "AppRole" AS ENUM ('EDITOR', 'ADMIN');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "AccessRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- CreateTable: UserRole
CREATE TABLE IF NOT EXISTS "UserRole" (
    "userId" TEXT NOT NULL,
    "role" "AppRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("userId")
);

-- CreateTable: FounderAdmin
CREATE TABLE IF NOT EXISTS "FounderAdmin" (
    "slot" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "FounderAdmin_pkey" PRIMARY KEY ("slot"),
    CONSTRAINT "FounderAdmin_slot_check" CHECK ("slot" IN (1, 2))
);

-- CreateTable: AdminAccessRequest
CREATE TABLE IF NOT EXISTS "AdminAccessRequest" (
    "id" TEXT NOT NULL,
    "requesterId" TEXT NOT NULL,
    "requestedRole" "AppRole" NOT NULL DEFAULT 'ADMIN',
    "status" "AccessRequestStatus" NOT NULL DEFAULT 'PENDING',
    "reviewerId" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "rejectionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "AdminAccessRequest_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "AdminAccessRequest_no_self_review" CHECK ("reviewerId" IS NULL OR "requesterId" <> "reviewerId")
);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "UserRole_role_idx" ON "UserRole"("role");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "FounderAdmin_userId_key" ON "FounderAdmin"("userId");
CREATE INDEX IF NOT EXISTS "FounderAdmin_userId_idx" ON "FounderAdmin"("userId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "AdminAccessRequest_requesterId_idx" ON "AdminAccessRequest"("requesterId");
CREATE INDEX IF NOT EXISTS "AdminAccessRequest_reviewerId_idx" ON "AdminAccessRequest"("reviewerId");
CREATE INDEX IF NOT EXISTS "AdminAccessRequest_status_idx" ON "AdminAccessRequest"("status");

-- AddForeignKey
DO $$ BEGIN
    ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "MemberProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE "FounderAdmin" ADD CONSTRAINT "FounderAdmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "MemberProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE "AdminAccessRequest" ADD CONSTRAINT "AdminAccessRequest_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "MemberProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE "AdminAccessRequest" ADD CONSTRAINT "AdminAccessRequest_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "MemberProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- DB Guard: Founder Admins must always hold role 'ADMIN' in UserRole and cannot be deleted or demoted from UserRole
CREATE OR REPLACE FUNCTION public.check_founder_admin_role_integrity()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- When a founder slot is claimed, ensure the user has ADMIN role
        INSERT INTO public."UserRole" ("userId", "role", "createdAt", "updatedAt")
        VALUES (NEW."userId", 'ADMIN', now(), now())
        ON CONFLICT ("userId") DO UPDATE SET "role" = 'ADMIN', "updatedAt" = now();
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        IF NEW."userId" <> OLD."userId" THEN
            -- Ensure new user has role ADMIN
            INSERT INTO public."UserRole" ("userId", "role", "createdAt", "updatedAt")
            VALUES (NEW."userId", 'ADMIN', now(), now())
            ON CONFLICT ("userId") DO UPDATE SET "role" = 'ADMIN', "updatedAt" = now();
        END IF;
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS trg_founder_admin_insert_role ON public."FounderAdmin";
CREATE TRIGGER trg_founder_admin_insert_role
AFTER INSERT OR UPDATE ON public."FounderAdmin"
FOR EACH ROW
EXECUTE PROCEDURE public.check_founder_admin_role_integrity();

-- DB Guard: Protect Founder Admins in UserRole from being removed or downgraded from ADMIN
CREATE OR REPLACE FUNCTION public.protect_founder_admin_user_role()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        IF EXISTS (SELECT 1 FROM public."FounderAdmin" WHERE "userId" = OLD."userId") THEN
            RAISE EXCEPTION 'Cannot delete UserRole for a Founder Admin';
        END IF;
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        IF EXISTS (SELECT 1 FROM public."FounderAdmin" WHERE "userId" = OLD."userId") AND NEW."role" <> 'ADMIN' THEN
            RAISE EXCEPTION 'Cannot alter role of a Founder Admin; role must remain ADMIN';
        END IF;
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS trg_protect_founder_user_role ON public."UserRole";
CREATE TRIGGER trg_protect_founder_user_role
BEFORE UPDATE OR DELETE ON public."UserRole"
FOR EACH ROW
EXECUTE PROCEDURE public.protect_founder_admin_user_role();

-- DB Guard: When AdminAccessRequest is APPROVED, auto-grant ADMIN role to requester, and verify reviewer is ADMIN
CREATE OR REPLACE FUNCTION public.process_admin_access_request_review()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
    reviewer_role "AppRole";
BEGIN
    IF NEW."status" = 'APPROVED' AND (OLD IS NULL OR OLD."status" <> 'APPROVED') THEN
        -- Guard: Reviewer is required
        IF NEW."reviewerId" IS NULL THEN
            RAISE EXCEPTION 'Reviewer is required to approve an access request';
        END IF;

        -- Guard: Requester cannot approve their own request
        IF NEW."reviewerId" = NEW."requesterId" THEN
            RAISE EXCEPTION 'Requester cannot review or approve their own access request';
        END IF;

        -- Guard: Reviewer must have ADMIN role (EDITOR cannot approve)
        SELECT "role" INTO reviewer_role FROM public."UserRole" WHERE "userId" = NEW."reviewerId";
        IF reviewer_role IS NULL OR reviewer_role <> 'ADMIN' THEN
            RAISE EXCEPTION 'Only users with role ADMIN can approve access requests';
        END IF;

        -- Auto-elevate requester to requested role (ADMIN)
        INSERT INTO public."UserRole" ("userId", "role", "createdAt", "updatedAt")
        VALUES (NEW."requesterId", NEW."requestedRole", now(), now())
        ON CONFLICT ("userId") DO UPDATE SET "role" = EXCLUDED."role", "updatedAt" = now();

        IF NEW."reviewedAt" IS NULL THEN
            NEW."reviewedAt" := now();
        END IF;
    ELSIF NEW."status" = 'REJECTED' AND (OLD IS NULL OR OLD."status" <> 'REJECTED') THEN
        -- Guard: Reviewer cannot be requester
        IF NEW."reviewerId" IS NOT NULL AND NEW."reviewerId" = NEW."requesterId" THEN
            RAISE EXCEPTION 'Requester cannot reject their own access request';
        END IF;

        IF NEW."reviewerId" IS NOT NULL THEN
            SELECT "role" INTO reviewer_role FROM public."UserRole" WHERE "userId" = NEW."reviewerId";
            IF reviewer_role IS NULL OR reviewer_role <> 'ADMIN' THEN
                RAISE EXCEPTION 'Only users with role ADMIN can review access requests';
            END IF;
        END IF;

        IF NEW."reviewedAt" IS NULL THEN
            NEW."reviewedAt" := now();
        END IF;
    END IF;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_process_admin_access_request ON public."AdminAccessRequest";
CREATE TRIGGER trg_process_admin_access_request
BEFORE INSERT OR UPDATE ON public."AdminAccessRequest"
FOR EACH ROW
EXECUTE PROCEDURE public.process_admin_access_request_review();
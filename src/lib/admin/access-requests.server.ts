import { $Enums } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "./auth.server";

type AppRole = $Enums.AppRole;

export async function listAccessRequests(status?: "PENDING" | "APPROVED" | "REJECTED") {
  await requireAdmin();
  const where = status ? { status } : undefined;
  return prisma.adminAccessRequest.findMany({
    ...(where ? { where } : {}),
    include: {
      requester: { select: { id: true, displayName: true, penName: true } },
      reviewer: { select: { id: true, displayName: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function approveAccessRequest(id: string, role: AppRole = "ADMIN") {
  await requireAdmin();
  const admin = await requireAdmin();
  const req = await prisma.adminAccessRequest.findUnique({ where: { id } });
  if (!req) throw new Error("Request not found");
  // Upsert UserRole
  await prisma.userRole.upsert({
    where: { userId: req.requesterId },
    update: { role },
    create: { userId: req.requesterId, role },
  });
  return prisma.adminAccessRequest.update({
    where: { id },
    data: { status: "APPROVED", reviewerId: admin.userId, reviewedAt: new Date() },
  });
}

export async function rejectAccessRequest(id: string, reason?: string) {
  await requireAdmin();
  const admin = await requireAdmin();
  return prisma.adminAccessRequest.update({
    where: { id },
    data: {
      status: "REJECTED",
      reviewerId: admin.userId,
      reviewedAt: new Date(),
      rejectionReason: reason?.trim() || null,
    },
  });
}

export async function createAccessRequest(requestedRole: AppRole = "ADMIN") {
  // Any authenticated member can request admin access.
  const { requireUser } = await import("@/lib/auth/server");
  const user = await requireUser();
  const existing = await prisma.adminAccessRequest.findFirst({
    where: { requesterId: user.id, status: "PENDING" },
  });
  if (existing) return existing;
  return prisma.adminAccessRequest.create({
    data: { requesterId: user.id, requestedRole, status: "PENDING" },
  });
}

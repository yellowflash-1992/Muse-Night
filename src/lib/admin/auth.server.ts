/**
 * Admin authorization helpers for server functions.
 *
 * An admin is either:
 *   - a FounderAdmin (slot row in FounderAdmin), or
 *   - a MemberProfile with UserRole.role === ADMIN.
 *
 * EDITOR role is treated as non-admin for write operations but may be
 * extended later. All admin server functions MUST call requireAdmin() first.
 */

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/server";

export interface AdminContext {
  userId: string; // Supabase auth user id == MemberProfile.id
  role: "ADMIN" | "FOUNDER";
}

export async function getCurrentAdminContext(): Promise<AdminContext | null> {
  const user = await (async () => {
    try {
      return await requireUser();
    } catch {
      return null;
    }
  })();
  if (!user) return null;

  const profile = await prisma.memberProfile.findUnique({
    where: { id: user.id },
    include: { userRole: true, founderAdmin: true },
  });
  if (!profile) return null;

  if (profile.founderAdmin) {
    return { userId: user.id, role: "FOUNDER" };
  }
  if (profile.userRole?.role === "ADMIN") {
    return { userId: user.id, role: "ADMIN" };
  }
  return null;
}

export async function requireAdmin(): Promise<AdminContext> {
  const ctx = await getCurrentAdminContext();
  if (!ctx) {
    throw new Error("Forbidden: admin access required");
  }
  return ctx;
}

export async function isAdminUser(): Promise<boolean> {
  return (await getCurrentAdminContext()) !== null;
}

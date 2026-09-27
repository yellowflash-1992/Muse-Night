import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/server";
import { z } from "zod";

const displayNameSchema = z
  .string()
  .trim()
  .min(1, "Display name is required")
  .max(100, "Display name is too long");

const penNameSchema = z.string().trim().max(100, "Pen name is too long").optional().nullable();

const profileTitleSchema = z
  .string()
  .trim()
  .min(1, "Profile title is required")
  .max(100, "Profile title is too long");

const bioSchema = z.string().trim().max(500, "Bio is too long").optional().nullable();

const avatarUrlSchema = z
  .string()
  .trim()
  .url("Invalid avatar URL")
  .max(500, "Avatar URL is too long")
  .optional()
  .nullable();

const updateMemberProfileInputSchema = z.object({
  displayName: displayNameSchema,
  penName: penNameSchema,
  profileTitle: profileTitleSchema,
  bio: bioSchema,
  avatarUrl: avatarUrlSchema,
});

export type UpdateMemberProfileInput = z.infer<typeof updateMemberProfileInputSchema>;

function deriveDisplayNameFromAuthUser(user: {
  user_metadata?: Record<string, unknown>;
  email?: string | null;
}): string {
  const metadata = user.user_metadata ?? {};
  const name = metadata["name"];
  const fullName = metadata["full_name"];
  return (
    (typeof name === "string" && name.trim()) ||
    (typeof fullName === "string" && fullName.trim()) ||
    user.email?.split("@")[0]?.trim() ||
    "Patron"
  );
}

function deriveProfileTitleFromAuthUser(user: { user_metadata?: Record<string, unknown> }): string {
  const metadata = user.user_metadata ?? {};
  const profileTitle = metadata["profileTitle"];
  return typeof profileTitle === "string" && profileTitle.trim()
    ? profileTitle.trim()
    : "Reader & Patron";
}

function deriveAvatarUrlFromAuthUser(user: {
  user_metadata?: Record<string, unknown>;
}): string | null {
  const metadata = user.user_metadata ?? {};
  const avatarUrl = metadata["avatar_url"];
  return typeof avatarUrl === "string" && avatarUrl.trim() ? avatarUrl.trim() : null;
}

export async function getCurrentMemberProfile() {
  const user = await requireUser();
  const userId = user.id;

  let profile = await prisma.memberProfile.findUnique({
    where: { id: userId },
  });

  if (!profile) {
    profile = await prisma.memberProfile.create({
      data: {
        id: userId,
        displayName: deriveDisplayNameFromAuthUser(user),
        penName: null,
        profileTitle: deriveProfileTitleFromAuthUser(user),
        bio: null,
        avatarUrl: deriveAvatarUrlFromAuthUser(user),
      },
    });
  }

  return profile;
}

export async function updateCurrentMemberProfile(input: UpdateMemberProfileInput) {
  const user = await requireUser();
  const userId = user.id;

  const validated = updateMemberProfileInputSchema.parse(input);

  const profile = await prisma.memberProfile.upsert({
    where: { id: userId },
    update: {
      displayName: validated.displayName,
      penName: validated.penName ?? null,
      profileTitle: validated.profileTitle,
      bio: validated.bio ?? null,
      avatarUrl: validated.avatarUrl ?? null,
    },
    create: {
      id: userId,
      displayName: validated.displayName,
      penName: validated.penName ?? null,
      profileTitle: validated.profileTitle,
      bio: validated.bio ?? null,
      avatarUrl: validated.avatarUrl ?? null,
    },
  });

  return profile;
}

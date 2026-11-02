import type { MemberProfileData } from "@/hooks/useMemberProfile";
import { resolveDisplayName } from "@/lib/display-name";

export function useDisplayName(
  profile: MemberProfileData | null | undefined,
  fallback = "Anonymous",
): string {
  return resolveDisplayName(
    {
      penName: profile?.primaryPenName,
      displayName: profile?.displayName,
    },
    fallback,
  );
}

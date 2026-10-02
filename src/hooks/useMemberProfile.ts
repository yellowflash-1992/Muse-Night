import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@/hooks/useAuth";
import { getCurrentMemberProfileFn } from "@/lib/member-profile.functions";

export interface MemberProfileData {
  id: string;
  displayName: string;
  penName: string | null;
  profileTitle: string;
  bio: string | null;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export function useMemberProfile() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  const query = useQuery<MemberProfileData, Error>({
    queryKey: ["member-profile", user?.id],
    queryFn: async () => {
      const profile = await getCurrentMemberProfileFn();
      return profile;
    },
    enabled: !authLoading && isAuthenticated && Boolean(user?.id),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    profile: query.data ?? null,
    isLoading: authLoading || (isAuthenticated && query.isLoading),
    error: query.error,
    refetch: query.refetch,
  };
}

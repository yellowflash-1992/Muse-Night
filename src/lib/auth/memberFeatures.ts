export const MEMBER_FEATURES = {
  vault: "vault",
  reflections: "reflections",
  poemRequests: "poem-requests",
  submissions: "submissions",
  streak: "streak",
  profile: "profile",
} as const;

export type MemberFeature = (typeof MEMBER_FEATURES)[keyof typeof MEMBER_FEATURES];

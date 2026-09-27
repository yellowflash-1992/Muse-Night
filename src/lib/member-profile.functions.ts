import { createServerFn } from "@tanstack/react-start";
import {
  getCurrentMemberProfile,
  updateCurrentMemberProfile,
  type UpdateMemberProfileInput,
} from "@/lib/member-profile.server";

export const getCurrentMemberProfileFn = createServerFn({ method: "GET" }).handler(async () => {
  return getCurrentMemberProfile();
});

export const updateCurrentMemberProfileFn = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    return input as UpdateMemberProfileInput;
  })
  .handler(async ({ data }) => {
    return updateCurrentMemberProfile(data);
  });

import { createClient } from "@/lib/supabase/server";
import { createServerFn } from "@tanstack/react-start";
import {
  createReflectionRaw,
  getInteractionsRaw,
  toggleReactionRaw,
  toggleReflectionLikeRaw,
} from "./interactions.server";

export const getInteractions = createServerFn({ method: "GET" })
  .validator((d: { poemId: string }) => d)
  .handler(async ({ data }) => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return getInteractionsRaw(data.poemId, user?.id ?? null);
  });

export const toggleReactionFn = createServerFn({ method: "POST" })
  .validator((d: { poemId: string; emoji: string }) => d)
  .handler(async ({ data }) => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Must be logged in");
    return toggleReactionRaw(data.poemId, user.id, data.emoji);
  });

export const createReflectionFn = createServerFn({ method: "POST" })
  .validator((d: { poemId: string; text: string; isAnonymous: boolean }) => d)
  .handler(async ({ data }) => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Must be logged in");
    return createReflectionRaw(data.poemId, user.id, data.text, data.isAnonymous);
  });

export const toggleReflectionLikeFn = createServerFn({ method: "POST" })
  .validator((d: { reflectionId: string }) => d)
  .handler(async ({ data }) => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Must be logged in");
    return toggleReflectionLikeRaw(data.reflectionId, user.id);
  });

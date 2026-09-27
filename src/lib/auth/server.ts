import { isAuthSessionMissingError, type User } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/server";

/**
 * Checks if a Supabase auth error represents a normal signed-out condition
 * (missing or unauthenticated session) rather than an infrastructure or network failure.
 */
function isSessionMissing(error: unknown): boolean {
  if (isAuthSessionMissingError(error)) {
    return true;
  }

  if (typeof error === "object" && error !== null) {
    const errorName = "name" in error ? String((error as { name?: unknown }).name) : "";
    const errorMessage =
      "message" in error ? String((error as { message?: unknown }).message).toLowerCase() : "";

    if (errorName === "AuthSessionMissingError") {
      return true;
    }

    if (errorMessage.includes("auth session missing") || errorMessage.includes("session missing")) {
      return true;
    }
  }

  return false;
}

/**
 * Retrieves the currently authenticated Supabase user on the server.
 * Returns the `User` object if a valid session exists, or `null` if the visitor is signed out.
 * Treats a genuinely missing/expired session as normal signed-out state.
 * Rethrows any unexpected server/network/infrastructure errors.
 */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    if (isSessionMissing(error)) {
      return null;
    }
    throw error;
  }

  return data.user ?? null;
}

/**
 * Requires an authenticated Supabase user for server functions.
 * Returns the authenticated `User` object, or throws an Error when the visitor is signed out.
 */
export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized: Member authentication required");
  }

  return user;
}

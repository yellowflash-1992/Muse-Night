import type { User as SupabaseUser } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";

export interface User {
  id: string;
  name: string;
  penName?: string | undefined;
  email: string;
  bio?: string | undefined;
  avatar?: string | undefined;
  profileTitle?: string | undefined;
  memberSince?: string | undefined;
  isAnonymous?: boolean;
}

export interface AuthResult {
  error: string | null;
  hasSession: boolean;
}

function mapAuthUser(authUser: SupabaseUser): User {
  const metadata = authUser.user_metadata ?? {};

  const metadataName =
    typeof metadata["name"] === "string" && metadata["name"].trim()
      ? metadata["name"].trim()
      : undefined;

  const emailName = authUser.email?.split("@")[0]?.trim();

  const name = metadataName || emailName || "Reader";

  const memberSince = new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(new Date(authUser.created_at));

  const profileTitleFromMetadata =
    typeof metadata["profileTitle"] === "string" && metadata["profileTitle"].trim()
      ? metadata["profileTitle"].trim()
      : typeof metadata["role"] === "string" && metadata["role"].trim()
        ? metadata["role"].trim()
        : "Reader & Patron";

  return {
    id: authUser.id,
    name,
    penName:
      typeof metadata["penName"] === "string" && metadata["penName"].trim()
        ? metadata["penName"]
        : undefined,
    email: authUser.email ?? "",
    bio:
      typeof metadata["bio"] === "string" && metadata["bio"].trim() ? metadata["bio"] : undefined,
    avatar:
      typeof metadata["avatar"] === "string" && metadata["avatar"].trim()
        ? metadata["avatar"]
        : undefined,
    profileTitle: profileTitleFromMetadata,
    memberSince,
    isAnonymous: Boolean((authUser as SupabaseUser & { is_anonymous?: boolean })["is_anonymous"]),
  };
}
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;

    const loadUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (!mounted) return;

      if (error) {
        if (error.name !== "AuthSessionMissingError") {
          console.error("Failed to load authenticated user:", error);
        }

        setUser(null);
      } else {
        setUser(data.user ? mapAuthUser(data.user) : null);
      }

      setLoading(false);
    };

    void loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;

      setUser(session?.user ? mapAuthUser(session.user) : null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<AuthResult> => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    return {
      error: error?.message ?? null,
      hasSession: Boolean(data.session),
    };
  };

  const signUp = async (email: string, password: string, name: string): Promise<AuthResult> => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
        data: {
          name: name.trim(),
          profileTitle: "Reader & Patron",
        },
      },
    });

    return {
      error: error?.message ?? null,
      hasSession: Boolean(data.session),
    };
  };

  const signInWithGoogle = async (): Promise<AuthResult> => {
    const supabase = createClient();

    const returnTo = window.location.pathname + window.location.search + window.location.hash;
    sessionStorage.setItem("muse-auth-return-to", returnTo);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/confirm`,
      },
    });

    return {
      error: error?.message ?? null,
      hasSession: false,
    };
  };

  const logout = async (): Promise<{ error: string | null }> => {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut({
      scope: "local",
    });

    if (error) {
      console.error("Failed to sign out:", error);
    } else {
      setUser(null);
    }

    return {
      error: error?.message ?? null,
    };
  };

  return {
    user,
    isAuthenticated: Boolean(user),
    loading,
    login,
    signUp,
    signInWithGoogle,
    logout,
  };
}

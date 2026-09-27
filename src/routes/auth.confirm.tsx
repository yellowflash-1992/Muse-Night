import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { createClient } from "@/lib/supabase/client";

export const Route = createFileRoute("/auth/confirm")({
  component: AuthConfirmPage,
});

function getValidInternalDestination(target: string | null): string {
  if (!target) return "/";
  const trimmed = target.trim();
  // Must start with a single slash (internal route), not double slash // (protocol-relative external redirect)
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) {
    return "/";
  }
  return trimmed;
}

function AuthConfirmPage() {
  const handledRef = useRef(false);
  const [message, setMessage] = useState("Confirming your account...");

  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;

    const confirmAccount = async () => {
      const supabase = createClient();

      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");

      if (code) {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
        if (exchangeError) {
          console.error("OAuth code exchange failed:", exchangeError.message);
          window.location.replace("/?auth=confirmation-failed");
          return;
        }
      }

      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        if (error && error.name !== "AuthSessionMissingError") {
          console.error("Authentication confirmation failed:", error.message);
        }
        window.location.replace("/?auth=confirmation-failed");
        return;
      }

      const rawReturnTo = sessionStorage.getItem("muse-auth-return-to");
      sessionStorage.removeItem("muse-auth-return-to");
      const destination = getValidInternalDestination(rawReturnTo);

      setMessage("Welcome to the Reading Room");

      window.setTimeout(() => {
        window.location.replace(destination);
      }, 400);
    };

    void confirmAccount();
  }, []);

  return (
    <main className="min-h-screen bg-ink text-paper flex items-center justify-center px-6">
      <div className="text-center">
        <div className="mx-auto mb-5 h-10 w-10 rounded-full border border-neon/30 bg-neon/10 animate-pulse" />

        <p className="text-[10px] uppercase tracking-[0.25em] text-neon">Muse Night</p>

        <h1 className="mt-2 font-display text-2xl text-paper">{message}</h1>

        <p className="mt-3 text-sm text-paper-dim">Opening your reading room...</p>
      </div>
    </main>
  );
}

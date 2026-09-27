import type { ReactNode } from "react";
import { useState } from "react";

import { AuthModal } from "@/components/auth/AuthModal";
import { MEMBER_FEATURES, type MemberFeature } from "@/lib/auth/memberFeatures";
import { useAuth } from "@/hooks/useAuth";

interface MemberGateProps {
  feature: MemberFeature;
  children: ReactNode;
}

const featureLabels: Record<MemberFeature, string> = {
  [MEMBER_FEATURES.vault]: "Your personal Vault",
  [MEMBER_FEATURES.reflections]: "Reader reflections",
  [MEMBER_FEATURES.poemRequests]: "Poem requests",
  [MEMBER_FEATURES.submissions]: "Literary submissions",
  [MEMBER_FEATURES.streak]: "Your reading streak",
  [MEMBER_FEATURES.profile]: "Your reader profile",
};

export function MemberGate({ feature, children }: MemberGateProps) {
  const { isAuthenticated, loading } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-paper-faint">
          Opening the reading room...
        </p>
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="min-h-[60vh] flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-2xl border border-neon/20 bg-ink-2 p-8 text-center shadow-2xl">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-neon/30 bg-neon/10 text-neon">
            <span className="font-display text-lg">M</span>
          </div>

          <p className="text-[10px] uppercase tracking-[0.25em] text-neon">Muse Night Members</p>

          <h1 className="mt-2 font-display text-3xl text-paper">
            This belongs to your member space.
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-paper-dim">
            {featureLabels[feature]} is available to registered Muse Night members. You can still
            read and explore the public archive without an account.
          </p>

          <button
            type="button"
            onClick={() => setAuthModalOpen(true)}
            className="mt-7 rounded-xl bg-neon px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-ink transition hover:bg-neon/90"
          >
            Sign In or Create Account
          </button>
        </div>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode="signin"
      />
    </>
  );
}

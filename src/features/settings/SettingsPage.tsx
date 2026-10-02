import { Link } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  Bookmark,
  Check,
  Feather,
  Flame,
  GraduationCap,
  LogOut,
  Save,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";

import { MemberGate } from "@/components/auth/MemberGate";
import { useAuth } from "@/hooks/useAuth";
import { useMemberProfile } from "@/hooks/useMemberProfile";
import { MEMBER_FEATURES } from "@/lib/auth/memberFeatures";
import { updateCurrentMemberProfileFn } from "@/lib/member-profile.functions";

export function SettingsPage() {
  return (
    <MemberGate feature={MEMBER_FEATURES.profile}>
      <SettingsContent />
    </MemberGate>
  );
}

function SettingsContent() {
  const { user, isAuthenticated, logout } = useAuth();
  const { profile, isLoading, error: profileError } = useMemberProfile();
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [penName, setPenName] = useState("");
  const [bio, setBio] = useState("");
  const [profileTitle, setProfileTitle] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (profile && !isInitialized) {
      setName(profile.displayName || "");
      setPenName(profile.penName || "");
      setBio(profile.bio || "");
      setProfileTitle(profile.profileTitle || "Reader & Patron");
      setIsInitialized(true);
    }
  }, [profile, isInitialized]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || isSaving) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      await updateCurrentMemberProfileFn({
        data: {
          displayName: name.trim() || "Patron",
          penName: penName.trim() || null,
          profileTitle: profileTitle.trim() || "Reader & Patron",
          bio: bio.trim() || null,
          avatarUrl: profile?.avatarUrl ?? null,
        },
      });

      await queryClient.invalidateQueries({
        queryKey: ["member-profile", user?.id],
      });

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  const getInitial = () => {
    if (penName.trim()) return penName.trim().charAt(0).toUpperCase();
    if (name.trim()) return name.trim().charAt(0).toUpperCase();
    if (profile?.displayName) return profile.displayName.charAt(0).toUpperCase();
    if (user?.name) return user.name.charAt(0).toUpperCase();
    return "P";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ink text-paper selection:bg-neon selection:text-ink pt-24 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon" />
          </div>
        </div>
      </div>
    );
  }

  const displayedError = saveError || (profileError ? profileError.message : null);

  return (
    <div className="min-h-screen bg-ink text-paper selection:bg-neon selection:text-ink pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Masthead Header */}
        <div className="border-b border-neon/15 pb-6">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-neon/80 mb-2 font-medium">
            <Feather className="h-3.5 w-3.5 text-neon" />
            <span>Patron Studio & Profile</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold text-paper leading-tight">
            Account & <span className="italic font-light text-neon">Pen Name</span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-paper-dim max-w-xl font-karla leading-relaxed">
            Customize how your literary mark appears across Muse Night, your hand-bound orders,
            reading vault, and student study notes.
          </p>
        </div>

        {/* Profile Editing Form & Live Card Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Live Profile Stamp Card */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-neon/80 block">
              // Studio Signature Card
            </span>

            <div className="rounded-2xl border border-neon/25 bg-gradient-to-br from-ink-2/95 via-ink to-ink-2 p-6 shadow-xl relative overflow-hidden space-y-5">
              <div className="pointer-events-none absolute -right-16 -bottom-16 h-40 w-40 rounded-full bg-neon/10 blur-2xl" />

              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-neon/30 via-neon/15 to-transparent border border-neon/40 text-neon font-display text-2xl font-bold shadow-md">
                  {getInitial()}
                </div>
                <div className="min-w-0">
                  <p className="font-display text-xl text-paper font-medium truncate">
                    {penName.trim() || name.trim() || "Anonymous Poet"}
                  </p>
                  {penName.trim() && name.trim() && (
                    <p className="text-[11px] text-paper-dim truncate">Legal Name: {name.trim()}</p>
                  )}
                  <span className="inline-block mt-1 text-[9px] uppercase tracking-wider text-neon bg-neon/10 px-2 py-0.5 rounded-full border border-neon/20">
                    {profileTitle || "Reader & Patron"}
                  </span>
                </div>
              </div>

              <div className="border-t border-neon/10 pt-4 space-y-2">
                <p className="text-[10px] uppercase tracking-[0.2em] text-paper-faint font-mono">
                  Member Email
                </p>
                <p className="text-xs text-paper-dim truncate">{user?.email}</p>
              </div>

              <div className="border-t border-neon/10 pt-4 space-y-2">
                <p className="text-[10px] uppercase tracking-[0.2em] text-paper-faint font-mono">
                  Personal Soliloquy
                </p>
                <p className="font-serif italic text-xs text-paper-dim leading-relaxed">
                  "{bio.trim() || "A solitary reader leaving the light on after midnight."}"
                </p>
              </div>

              <div className="border-t border-neon/10 pt-3 flex items-center justify-between text-[10px] text-paper-faint font-mono">
                <span>Muse Night Scribe</span>
                <span>Est. {user?.memberSince || "Winter 2024"}</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="rounded-2xl border border-neon/15 bg-ink-2/60 p-4 space-y-2 text-xs">
              <Link
                to="/vault"
                className="flex items-center justify-between p-2 rounded-xl text-paper-dim hover:text-paper hover:bg-neon/10 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Bookmark className="h-4 w-4 text-amber-400" />
                  <span>Your Saved Vault</span>
                </span>
                <span className="text-paper-faint">&rarr;</span>
              </Link>
              <Link
                to="/streak"
                className="flex items-center justify-between p-2 rounded-xl text-paper-dim hover:text-paper hover:bg-neon/10 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-amber-400" />
                  <span>Reading Streaks</span>
                </span>
                <span className="text-paper-faint">&rarr;</span>
              </Link>
              <Link
                to="/study"
                className="flex items-center justify-between p-2 rounded-xl text-paper-dim hover:text-paper hover:bg-neon/10 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-emerald-400" />
                  <span>JAMB/WAEC Study Hall</span>
                </span>
                <span className="text-paper-faint">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Editing Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSave}
              className="rounded-2xl border border-neon/20 bg-ink-2/80 p-6 sm:p-8 space-y-6 shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-neon/10 pb-4">
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4 text-neon" />
                  <h2 className="font-display text-xl text-paper font-medium">
                    Edit Scribe Profile
                  </h2>
                </div>
                {savedSuccess && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-400/30 px-3 py-1 rounded-full animate-in fade-in">
                    <Check className="h-3.5 w-3.5" />
                    <span>Saved successfully</span>
                  </span>
                )}
                {displayedError && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-rose-400 bg-rose-500/10 border border-rose-400/30 px-3 py-1 rounded-full animate-in fade-in">
                    <span className="h-3.5 w-3.5">!</span>
                    <span>{displayedError}</span>
                  </span>
                )}
              </div>

              {/* Pen Name Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-neon">
                  Poet / Literary Pen Name
                </label>
                <input
                  type="text"
                  value={penName}
                  onChange={(e) => setPenName(e.target.value)}
                  placeholder="e.g. InkbyNur, Serein-Serene, Iris-Hand"
                  className="w-full rounded-xl bg-ink border border-neon/25 px-4 py-2.5 text-sm text-paper placeholder:text-paper-faint/50 focus:border-neon focus:outline-none transition-colors"
                />
                <p className="text-[11px] text-paper-dim leading-snug">
                  Your artistic pseudonym or author mark displayed next to verses and manuscript
                  submissions.
                </p>
              </div>

              {/* Real / Display Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-paper-dim">
                  Display Name / Patron Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Raji Nurudeen Olawale"
                  className="w-full rounded-xl bg-ink border border-neon/25 px-4 py-2.5 text-sm text-paper placeholder:text-paper-faint/50 focus:border-neon focus:outline-none transition-colors"
                />
              </div>

              {/* Patron Title */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-paper-dim">
                  Patron Title
                </label>
                <input
                  type="text"
                  value={profileTitle}
                  onChange={(e) => setProfileTitle(e.target.value)}
                  placeholder="e.g. Reader & Patron, Child of the Wilderness"
                  className="w-full rounded-xl bg-ink border border-neon/25 px-4 py-2.5 text-sm text-paper placeholder:text-paper-faint/50 focus:border-neon focus:outline-none transition-colors"
                />
              </div>

              {/* Literary Bio / Personal Soliloquy */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-paper-dim">
                  Personal Soliloquy / Short Bio
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Share a short verse, quote, or note on what writing and reading by lamplight means to you..."
                  className="w-full rounded-xl bg-ink border border-neon/25 p-4 text-sm text-paper placeholder:text-paper-faint/50 focus:border-neon focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-neon/10 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 rounded-xl bg-neon px-6 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-ink shadow-md hover:bg-neon/90 transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="h-4 w-4" />
                  <span>{isSaving ? "Saving..." : "Save Profile Changes"}</span>
                </button>

                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer border border-rose-400/20"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

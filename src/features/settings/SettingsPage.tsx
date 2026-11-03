import { useQueryClient } from "@tanstack/react-query";
import { Check, Feather, Loader2, LogOut, Save, Settings } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { MemberGate } from "@/components/auth/MemberGate";
import { useAuth } from "@/hooks/useAuth";
import { useMemberProfile } from "@/hooks/useMemberProfile";
import { MEMBER_FEATURES } from "@/lib/auth/memberFeatures";
import { updateCurrentMemberProfileFn } from "@/lib/member-profile.functions";
import { createClient } from "@/lib/supabase/client";

const isRealAvatar = (url?: string | null): url is string =>
  Boolean(url && !url.includes("googleusercontent.com"));

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [penName, setPenName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (profile && !isInitialized) {
      setName(profile.displayName || "");
      setPenName(profile.penName || "");
      setBio(profile.bio || "");
      setAvatarUrl(isRealAvatar(profile.avatarUrl) ? profile.avatarUrl : null);
      setIsInitialized(true);
    }
  }, [profile, isInitialized]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !isAuthenticated || isUploading) return;

    setIsUploading(true);
    setSaveError(null);

    try {
      const supabase = createClient();
      const fileExt = file.name.split(".").pop();
      const fileName = `${user?.id}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage.from("avatars").upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
      setAvatarUrl(data.publicUrl);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Failed to upload image");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } finally {
      setIsUploading(false);
    }
  };

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
          profileTitle: profile?.profileTitle || "Reader & Patron",
          bio: bio.trim() || null,
          avatarUrl,
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
    return "P";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ink text-paper selection:bg-neon selection:text-ink pt-24 pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
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
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="border-b border-neon/15 pb-6">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-neon/80 mb-2 font-medium">
            <Feather className="h-3.5 w-3.5 text-neon" />
            <span>Profile Settings</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold text-paper leading-tight">
            Account &amp; <span className="italic font-light text-neon">Pen Name</span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-paper-dim max-w-xl font-karla leading-relaxed">
            Manage how your profile appears across Muse Night.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Profile Preview & Avatar Upload */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-neon/80 block">
              // Profile Preview
            </span>

            <div className="rounded-2xl border border-neon/25 bg-gradient-to-br from-ink-2/95 via-ink to-ink-2 p-6 shadow-xl relative overflow-hidden space-y-5">
              <div className="pointer-events-none absolute -right-16 -bottom-16 h-40 w-40 rounded-full bg-neon/10 blur-2xl" />

              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-neon/30 via-neon/15 to-transparent border border-neon/40 text-neon font-display text-2xl font-bold shadow-md">
                  {isRealAvatar(avatarUrl) ? (
                    <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      {getInitial()}
                    </div>
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-ink/70">
                      <Loader2 className="h-5 w-5 text-neon animate-spin" />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-display text-xl text-paper font-medium truncate">
                    {penName.trim() || name.trim() || "Profile"}
                  </p>
                  <p className="text-[11px] text-paper-dim truncate">{user?.email}</p>
                </div>
              </div>

              <div className="border-t border-neon/10 pt-4 space-y-2">
                <p className="text-[10px] uppercase tracking-[0.2em] text-paper-faint font-mono">
                  Bio
                </p>
                <p className="font-serif italic text-xs text-paper-dim leading-relaxed">
                  {bio.trim() || "No bio yet."}
                </p>
              </div>
            </div>

            {/* Avatar Upload */}
            <div className="rounded-2xl border border-neon/15 bg-ink-2/60 p-4 space-y-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-paper-dim block">
                Profile Picture
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                disabled={isUploading}
                className="w-full text-xs text-paper-dim file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-neon file:text-ink file:text-xs file:font-bold file:uppercase file:tracking-wider file:cursor-pointer hover:file:bg-neon/90 file:transition-colors cursor-pointer"
              />
              <p className="text-[11px] text-paper-faint leading-snug">
                {isUploading ? "Uploading..." : "Choose an image, then click Save to apply."}
              </p>
            </div>
          </div>

          {/* Editing Form */}
          <div className="lg:col-span-8">
            <form
              onSubmit={handleSave}
              className="rounded-2xl border border-neon/20 bg-ink-2/80 p-6 sm:p-8 space-y-6 shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-neon/10 pb-4">
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4 text-neon" />
                  <h2 className="font-display text-xl text-paper font-medium">Edit Profile</h2>
                </div>
                {savedSuccess && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-400/30 px-3 py-1 rounded-full animate-in fade-in">
                    <Check className="h-3.5 w-3.5" />
                    <span>Saved</span>
                  </span>
                )}
                {displayedError && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-rose-400 bg-rose-500/10 border border-rose-400/30 px-3 py-1 rounded-full animate-in fade-in">
                    <span className="h-3.5 w-3.5">!</span>
                    <span>{displayedError}</span>
                  </span>
                )}
              </div>

              {/* Display Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-paper-dim">
                  Display Name
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

              {/* Pen Name (Optional) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-neon">
                  Literary Pen Name (Optional)
                </label>
                <input
                  type="text"
                  value={penName}
                  onChange={(e) => setPenName(e.target.value)}
                  placeholder="e.g. InkbyNur"
                  className="w-full rounded-xl bg-ink border border-neon/25 px-4 py-2.5 text-sm text-paper placeholder:text-paper-faint/50 focus:border-neon focus:outline-none transition-colors"
                />
              </div>

              {/* Short Bio */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-paper-dim">
                  Short Bio
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="A few words about yourself..."
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
                  <span>{isSaving ? "Saving..." : "Save Changes"}</span>
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

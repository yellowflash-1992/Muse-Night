import { Check, Feather, Lock, Mail, Sparkles, User, X } from "lucide-react";
import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/useAuth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "signin" | "signup";
}

export function AuthModal({ isOpen, onClose, initialMode = "signin" }: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const { login } = useAuth();

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    login(email, mode === "signup" ? name : undefined);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1200);
  };

  const handleQuickOAuth = (provider: string) => {
    const mockEmail = provider === "google" ? "patron.reader@gmail.com" : "reader@musebooks.press";
    login(mockEmail, "Reader");
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-ink/80 backdrop-blur-md animate-[fadeIn_0.2s_ease-out] pt-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-neon/30 bg-ink-2 p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-paper-dim hover:text-paper hover:bg-neon/10 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="py-10 text-center animate-[fadeIn_0.2s_ease-out]">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neon/20 border border-neon/40 text-neon">
              <Check className="h-7 w-7" />
            </div>
            <h3 className="font-display text-2xl text-paper font-medium">
              Welcome to the Reading Room
            </h3>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-paper-dim">
              Signed in as a Patron of Muse Books
            </p>
          </div>
        ) : (
          <div>
            {/* Header with Avatar Shape / Emblem */}
            <div className="text-center mb-6">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-neon/15 border border-neon/35 text-neon shadow-inner">
                <Feather className="h-5 w-5" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-neon font-medium">
                Muse Books · Reader Sanctuary
              </p>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-medium text-paper">
                {mode === "signin" ? "Sign In to Your Vault" : "Create Patron Account"}
              </h2>
              <p className="mt-2 text-xs text-paper-dim leading-relaxed max-w-xs mx-auto">
                {mode === "signin"
                  ? "Access your saved verses, annotations, and reading streaks."
                  : "Keep your saved poems forever across every reading session."}
              </p>
            </div>

            {/* Mode Switch Tabs */}
            <div className="flex rounded-xl bg-ink/70 p-1 border border-neon/15 mb-6">
              <button
                type="button"
                onClick={() => setMode("signin")}
                className={`flex-1 rounded-lg py-2 text-xs uppercase tracking-[0.16em] font-medium transition-all ${
                  mode === "signin"
                    ? "bg-neon text-ink font-semibold shadow-sm"
                    : "text-paper-dim hover:text-paper"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode("signup")}
                className={`flex-1 rounded-lg py-2 text-xs uppercase tracking-[0.16em] font-medium transition-all ${
                  mode === "signup"
                    ? "bg-neon text-ink font-semibold shadow-sm"
                    : "text-paper-dim hover:text-paper"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-paper-dim mb-1.5 font-medium">
                    Your Name or Pen Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-paper-faint" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Serein or Reader"
                      className="w-full rounded-xl bg-ink border border-neon/20 pl-10 pr-4 py-2.5 text-sm text-paper placeholder:text-paper-faint focus:border-neon focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-paper-dim mb-1.5 font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-paper-faint" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="reader@lamplight.press"
                    className="w-full rounded-xl bg-ink border border-neon/20 pl-10 pr-4 py-2.5 text-sm text-paper placeholder:text-paper-faint focus:border-neon focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-paper-dim mb-1.5 font-medium">
                  Password or Passkey
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-paper-faint" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-xl bg-ink border border-neon/20 pl-10 pr-4 py-2.5 text-sm text-paper placeholder:text-paper-faint focus:border-neon focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-neon py-3 text-xs uppercase tracking-[0.2em] font-bold text-ink hover:bg-neon/90 shadow-lg active:scale-95 transition-all mt-2"
              >
                {mode === "signin" ? "Sign In" : "Create Account"}
              </button>
            </form>

            {/* Divider */}
            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-neon/10" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-paper-faint">
                or continue with
              </span>
              <div className="h-px flex-1 bg-neon/10" />
            </div>

            {/* Quick OAuth Buttons */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleQuickOAuth("google")}
                className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-neon/20 bg-ink/50 py-2.5 text-xs text-paper hover:bg-neon/10 hover:border-neon/40 active:scale-95 transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickOAuth("email")}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-neon/15 bg-ink/30 py-2.5 text-xs text-paper-dim hover:text-paper hover:bg-neon/10 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-neon" />
                <span>Quick Guest Reader Sign-in</span>
              </button>
            </div>

            <p className="mt-5 text-center text-[10px] text-paper-faint">
              By continuing, you become a patron of Muse Books lamplit archives.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  Copy,
  Download,
  Heart,
  Mail,
  Send,
  Share2,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";

import { getLibraryPoemById, LIBRARY_POEMS } from "@/data/literature";
import { useAuth } from "@/hooks/useAuth";

export function LibraryPoemPage() {
  const { id } = useParams({ from: "/library/$id" });
  const poem = getLibraryPoemById(id);
  const { user, isAuthenticated } = useAuth();

  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");
  const [warmMode, setWarmMode] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [openLine, setOpenLine] = useState<number | null>(null);
  const [reacted, setReacted] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [shareOpen, setShareOpen] = useState(false);
  const [cardFormat, setCardFormat] = useState<"Square" | "Story" | "Pin">("Square");
  const [showAllComments, setShowAllComments] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showGate, setShowGate] = useState(false);
  const [toast, setToast] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  if (!poem) {
    return (
      <div className="py-20 text-center mx-auto max-w-lg px-6">
        <h1 className="font-display text-4xl text-paper">Work not found</h1>
        <p className="mt-3 text-paper-dim">
          The work you are looking for does not exist or may have been re-indexed.
        </p>
        <div className="mt-6">
          <Link
            to="/library"
            className="inline-flex items-center gap-2 rounded bg-neon px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Library</span>
          </Link>
        </div>
      </div>
    );
  }

  // Next / Prev poem logic
  const currentIndex = LIBRARY_POEMS.findIndex((p) => p.id === poem.id);

  const prevPoem =
    LIBRARY_POEMS[currentIndex - 1] ?? LIBRARY_POEMS[LIBRARY_POEMS.length - 1] ?? poem;
  const nextPoem = LIBRARY_POEMS[currentIndex + 1] ?? LIBRARY_POEMS[0] ?? poem;

  const handleCopy = async () => {
    const text = poem.stanzas.flat().join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink text-paper">
      <div className="mx-auto max-w-[1040px] px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/library"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-paper-dim hover:text-neon transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to archive</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setFontSize(fontSize === "sm" ? "base" : fontSize === "base" ? "lg" : "sm")
              }
              className="rounded-full border border-neon/20 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-paper-dim hover:border-neon hover:text-paper transition"
            >
              {fontSize}
            </button>
            <button
              type="button"
              onClick={() => setWarmMode((v) => !v)}
              className="rounded-full border border-neon/20 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-paper-dim hover:border-neon hover:text-paper transition"
            >
              {warmMode ? "Warm" : "Quiet"}
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-full border border-neon/20 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-paper-dim hover:border-neon hover:text-paper transition"
            >
              {copied ? "Copied" : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <article className="rounded-[2rem] border border-neon/15 bg-ink-2 p-8 sm:p-12">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.24em] text-neon">
                {poem.author}
              </span>
              <h1 className="font-display text-4xl sm:text-6xl text-paper mt-3">{poem.title}</h1>
            </div>
            <button
              type="button"
              className="rounded-full border border-neon/20 p-3 hover:border-neon transition"
              onClick={() => setSaved(!saved)}
            >
              <Bookmark className={`h-4 w-4 ${saved ? "text-neon" : "text-paper-dim"}`} />
            </button>
          </div>

          <div className="mt-8 border-t border-neon/10 pt-6">
            <div
              className={`space-y-3 ${fontSize === "sm" ? "text-sm" : fontSize === "lg" ? "text-lg" : "text-base"}`}
            >
              {poem.stanzas.map((stanza, sIdx) => (
                <div key={sIdx} className="space-y-2">
                  {stanza.map((line, lIdx) => (
                    <p
                      key={`${sIdx}-${lIdx}`}
                      className="font-display italic text-paper leading-relaxed"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setShareOpen(!shareOpen)}
              className="inline-flex items-center gap-2 rounded-full border border-neon/20 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-paper hover:border-neon hover:bg-neon/10 transition"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
            <button
              type="button"
              onClick={() => setShowGate(true)}
              className="inline-flex items-center gap-2 rounded-full border border-neon/20 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-paper hover:border-neon hover:bg-neon/10 transition"
            >
              <Mail className="h-4 w-4" />
              Comment
            </button>
            <button
              type="button"
              onClick={() => setShowGate(true)}
              className="inline-flex items-center gap-2 rounded-full border border-neon/20 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-paper hover:border-neon hover:bg-neon/10 transition"
            >
              <Heart className="h-4 w-4" />
              React
            </button>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-neon/10 pt-8">
            <Link
              to="/library/$id"
              params={{ id: prevPoem.id }}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-paper-dim hover:text-neon transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Link>
            <Link
              to="/library/$id"
              params={{ id: nextPoem.id }}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-paper-dim hover:text-neon transition"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>

        {showGate && (
          <div className="fixed inset-0 z-50 bg-ink/90 flex items-center justify-center p-6">
            <div className="w-full max-w-md rounded-2xl border border-neon/20 bg-ink-2 p-8">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.22em] text-neon">
                  Reading room
                </span>
                <button type="button" onClick={() => setShowGate(false)}>
                  <X className="h-4 w-4 text-paper-dim" />
                </button>
              </div>
              <p className="mt-4 font-display text-2xl text-paper">Join the conversation</p>
              <div className="mt-5 space-y-4">
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={4}
                  placeholder="Leave a note..."
                  className="w-full rounded-xl border border-neon/20 bg-ink px-4 py-3 text-sm text-paper placeholder:text-paper-faint outline-none focus:border-neon resize-none"
                />
                <label className="flex items-center gap-2 text-sm text-paper-dim">
                  <input
                    type="checkbox"
                    checked={anonymous}
                    onChange={() => setAnonymous(!anonymous)}
                  />
                  Post anonymously
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setToast(true);
                    setShowGate(false);
                  }}
                  className="w-full rounded-full bg-neon px-6 py-3 text-xs uppercase tracking-[0.22em] font-medium text-ink hover:bg-neon/90 transition"
                >
                  <Send className="h-4 w-4 inline-block mr-2" />
                  Send note
                </button>
              </div>
            </div>
          </div>
        )}

        {toast && (
          <div className="fixed bottom-5 right-5 rounded-2xl border border-neon/20 bg-ink-2 px-5 py-3 text-xs uppercase tracking-[0.2em] text-paper">
            <Check className="h-4 w-4 inline-block mr-2 text-neon" />
            note received
          </div>
        )}

        {shareOpen && (
          <div className="fixed bottom-5 left-5 rounded-2xl border border-neon/20 bg-ink-2 p-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="rounded-full border border-neon/20 px-3 py-2"
              >
                <Copy className="h-4 w-4 text-neon" />
              </button>
              <button
                type="button"
                onClick={() => setShareOpen(false)}
                className="rounded-full border border-neon/20 px-3 py-2"
              >
                <X className="h-4 w-4 text-paper-dim" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

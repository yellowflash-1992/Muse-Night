import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  Copy,
  Download,
  Feather,
  Heart,
  Send,
  Share2,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";

import { getLibraryPoemById, LIBRARY_POEMS } from "@/data/literature";
import { useAuth } from "@/hooks/useAuth";

const cardFormats: Record<string, string> = {
  Square: "aspect-square w-full max-w-[240px]",
  Story: "aspect-[9/16] w-[170px]",
  Pin: "aspect-[2/3] w-[190px]",
};

const moodGradients: Record<string, string> = {
  reflective: "bg-gradient-to-br from-teal-950 via-slate-900 to-ink",
  grief: "bg-gradient-to-br from-purple-950 via-slate-900 to-ink",
  love: "bg-gradient-to-br from-rose-950 via-slate-900 to-ink",
  joy: "bg-gradient-to-br from-amber-950 via-slate-900 to-ink",
};

export function LibraryPoemPage() {
  const { id } = useParams({ from: "/library/$id" });
  const poem = getLibraryPoemById(id);
  const { user } = useAuth();

  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");
  const [warmMode, setWarmMode] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [openLine, setOpenLine] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState<"reflective" | "grief" | "love" | "joy">(
    "reflective",
  );
  const [cardFormat, setCardFormat] = useState<"Square" | "Story" | "Pin">("Square");
  const [reactedEmoji, setReactedEmoji] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  const [reactions, setReactions] = useState([
    { emoji: "❤️", label: "moved me", count: 341 },
    { emoji: "😢", label: "made me cry", count: 128 },
    { emoji: "✨", label: "stirred my soul", count: 94 },
    { emoji: "🔥", label: "loved the writing", count: 52 },
  ]);

  const [reflections, setReflections] = useState([
    {
      id: "ref-1",
      name: "Anonymous",
      text: "This is the first piece of literature that made the quiet feel less lonely instead of heavier.",
      hearts: 214,
      isHearted: false,
      poetReply: `Thank you for trusting this poem with that. Sending you steadiness under the lamplight. — ${poem?.author?.split(" ")[0] || "The Poet"}`,
      date: "2 days ago",
    },
    {
      id: "ref-2",
      name: "Aisha O.",
      text: "“The desk keeps its own small weather” — I read it three times and still felt the room fold around me.",
      hearts: 96,
      isHearted: false,
      poetReply: null,
      date: "1 week ago",
    },
    {
      id: "ref-3",
      name: "Kaelen M.",
      text: "There is an unbearable tenderness in these lines. Reading it feels like being listened to.",
      hearts: 58,
      isHearted: false,
      poetReply: `That tenderness is where we meet our readers. With deep gratitude. — ${poem?.author || "Muse Press"}`,
      date: "3 days ago",
    },
  ]);

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

  const lineNotes = poem.lineNotes || {
    1: {
      count: 48,
      excerpt: "This line stopped me in my tracks. It captured what silence actually feels like.",
    },
    2: {
      count: 86,
      excerpt:
        "I had to pause reading for a moment. This line broke me and mended me in the same breath.",
    },
  };

  const cardExcerpt = poem.stanzas[0]?.slice(0, 3).join("\n") ?? "";

  const handleCopy = async () => {
    const text = `"${poem.title}"\nby ${poem.author}\n\n${poem.stanzas.map((s) => s.join("\n")).join("\n\n")}\n\n(via Muse Books)`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${poem.title} — Muse Books`,
          text: `"${cardExcerpt}"\n— ${poem.author}\n`,
          url: window.location.href,
        });
      } catch {
        // user cancelled share
      }
    } else {
      handleCopy();
      setToast("Poem text copied to clipboard!");
      setTimeout(() => setToast(null), 2500);
    }
  };

  const toggleReaction = (emoji: string) => {
    if (reactedEmoji === emoji) {
      setReactedEmoji(null);
      setReactions((prev) =>
        prev.map((r) => (r.emoji === emoji ? { ...r, count: r.count - 1 } : r)),
      );
    } else {
      setReactedEmoji(emoji);
      setReactions((prev) =>
        prev.map((r) => {
          if (r.emoji === emoji) return { ...r, count: r.count + 1 };
          if (r.emoji === reactedEmoji) return { ...r, count: r.count - 1 };
          return r;
        }),
      );
    }
  };

  const toggleHeart = (refId: string) => {
    setReflections((prev) =>
      prev.map((r) => {
        if (r.id === refId) {
          const isHearted = !r.isHearted;
          return {
            ...r,
            isHearted,
            hearts: isHearted ? r.hearts + 1 : r.hearts - 1,
          };
        }
        return r;
      }),
    );
  };

  const handleShareReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;

    const authorName = anonymous ? "Anonymous" : user?.penName || user?.name || "A Visiting Reader";

    const newReflection = {
      id: `ref-${Date.now()}`,
      name: authorName,
      text: note.trim(),
      hearts: 1,
      isHearted: true,
      poetReply: null,
      date: "Just now",
    };

    setReflections([newReflection, ...reflections]);
    setNote("");
    setToast("Your reflection has been shared by lamplight.");
    setTimeout(() => setToast(null), 3000);
  };

  // Helper counter for global line indexing across stanzas
  let globalLineCount = 0;

  return (
    <div className="min-h-screen bg-ink text-paper">
      <div className="mx-auto max-w-xl px-5 sm:px-6 pt-24 pb-20 space-y-8">
        {/* Simple Top Navigation Bar */}
        <div className="flex items-center justify-between py-2">
          <Link
            to="/library"
            className="inline-flex items-center gap-2 rounded-full border border-neon/20 bg-ink-2/80 hover:bg-neon/10 hover:border-neon/40 px-3.5 py-1.5 text-xs uppercase tracking-[0.18em] text-paper-dim hover:text-paper transition-all shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-neon" strokeWidth={1.5} />
            <span>Back to archive</span>
          </Link>
        </div>

        {/* Title Header */}
        <div className="text-center space-y-3 pt-2 pb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-neon/25 bg-neon/10 px-3.5 py-1 text-[10px] uppercase tracking-[0.22em] text-neon font-medium shadow-sm">
            <Feather className="h-3 w-3 animate-pulse" />
            <span>
              From “{poem.collection}” · {poem.year}
            </span>
          </div>
          <h1 className="font-display italic text-4xl sm:text-6xl text-paper tracking-[-0.01em] leading-[1.12] text-balance drop-shadow-sm">
            {poem.title}
          </h1>
          <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs font-karla text-paper-dim">
            <span className="font-medium text-paper">by {poem.author}</span>
            <span className="hidden sm:inline text-paper-faint">·</span>
            <span className="text-paper-faint font-mono text-[11px]">
              {poem.linesCount} lines · {poem.readTime} read
            </span>
          </div>
          <div className="w-14 h-0.5 bg-gradient-to-r from-transparent via-neon/40 to-transparent mx-auto mt-3" />
        </div>

        {/* Poem Reader Body */}
        <div
          className={`rounded-3xl border p-6 sm:p-10 relative overflow-hidden transition-all duration-500 ${
            warmMode
              ? "bg-gradient-to-b from-[#25180f] via-[#1d120a] to-[#140b05] border-amber-400/40 shadow-[0_0_45px_rgba(251,191,36,0.22)] ring-1 ring-amber-400/20"
              : "border-neon/15 bg-ink-2/80 shadow-2xl"
          }`}
        >
          {warmMode && (
            <>
              {/* Warm Lamplight Overhead Aura */}
              <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-to-b from-amber-400/20 via-amber-300/10 to-transparent blur-3xl" />
              {/* Subtle Amber Edge Light */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.1),transparent_70%)]" />
            </>
          )}

          {/* Warm Mode Active Indicator */}
          {warmMode && (
            <div className="mb-4 flex items-center justify-end">
              <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-amber-300/90 font-mono bg-amber-400/10 border border-amber-400/25 px-2.5 py-0.5 rounded-full">
                <Sparkles className="h-3 w-3 text-amber-300 animate-pulse" />
                Lamplit Glow
              </span>
            </div>
          )}

          <div
            className={`font-display italic leading-[2.2rem] space-y-6 transition-colors duration-300 ${
              warmMode ? "text-[#fffbeb] drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]" : "text-paper"
            } ${
              fontSize === "sm"
                ? "text-base sm:text-lg leading-[2rem]"
                : fontSize === "lg"
                  ? "text-xl sm:text-2xl leading-[2.5rem]"
                  : "text-lg sm:text-xl leading-[2.2rem]"
            }`}
          >
            {poem.stanzas.map((stanza, sIdx) => (
              <div key={sIdx} className="space-y-1">
                {stanza.map((line) => {
                  const lineIdx = globalLineCount++;
                  const noteData = lineNotes[lineIdx];
                  const hasNote = !!noteData;

                  return (
                    <div key={lineIdx}>
                      <button
                        type="button"
                        onClick={() => {
                          if (hasNote) {
                            setOpenLine(openLine === lineIdx ? null : lineIdx);
                          }
                        }}
                        className={`text-left w-full transition-colors ${
                          hasNote
                            ? warmMode
                              ? "underline decoration-dotted decoration-amber-400/60 underline-offset-[5px] hover:decoration-amber-300 hover:text-amber-200 cursor-pointer"
                              : "underline decoration-dotted decoration-neon/50 underline-offset-[5px] hover:decoration-neon hover:text-neon cursor-pointer"
                            : "cursor-default"
                        }`}
                      >
                        {line}
                      </button>

                      {hasNote && openLine === lineIdx && (
                        <div
                          className={`my-3 ml-1 pl-4 border-l-2 py-2.5 px-3.5 rounded-r-xl animate-in fade-in space-y-1 not-italic ${
                            warmMode
                              ? "border-amber-400/70 bg-amber-400/10"
                              : "border-neon/50 bg-neon/5"
                          }`}
                        >
                          <p
                            className={`text-xs font-sans font-semibold flex items-center gap-1.5 ${
                              warmMode ? "text-amber-300" : "text-neon"
                            }`}
                          >
                            <Sparkles className="h-3 w-3" />
                            <span>{noteData.count} readers felt this line too</span>
                          </p>
                          <p className="text-sm font-sans text-paper-dim leading-relaxed">
                            “{noteData.excerpt}”
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <p className="text-xs text-paper-faint mt-8 text-center font-sans not-italic">
            Tap an underlined line to see what it made others feel
          </p>

          {/* Previous / Next Editorial Navigation Cards */}
          <div className="mt-10 pt-8 border-t border-neon/15 grid grid-cols-1 sm:grid-cols-2 gap-3.5 not-italic font-sans">
            {/* Previous Poem Card */}
            <Link
              to="/library/$id"
              params={{ id: prevPoem.id }}
              className="group flex flex-col justify-between p-4 rounded-2xl border border-neon/15 bg-ink/60 hover:bg-neon/10 hover:border-neon/35 transition-all shadow-sm active:scale-[0.99] text-left"
            >
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-paper-faint group-hover:text-neon transition-colors">
                <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>Previous Work</span>
              </div>
              <p className="font-display italic text-base sm:text-lg text-paper group-hover:text-neon transition-colors line-clamp-1 mt-1.5">
                “{prevPoem.title}”
              </p>
              <span className="text-[10px] text-paper-faint mt-1 font-karla">
                by {prevPoem.author}
              </span>
            </Link>

            {/* Next Poem Card */}
            <Link
              to="/library/$id"
              params={{ id: nextPoem.id }}
              className="group flex flex-col justify-between p-4 rounded-2xl border border-neon/15 bg-ink/60 hover:bg-neon/10 hover:border-neon/35 transition-all shadow-sm active:scale-[0.99] text-left sm:text-right"
            >
              <div className="flex items-center justify-start sm:justify-end gap-1.5 text-[10px] uppercase tracking-[0.2em] text-paper-faint group-hover:text-neon transition-colors">
                <span>Next Work</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="font-display italic text-base sm:text-lg text-paper group-hover:text-neon transition-colors line-clamp-1 mt-1.5">
                “{nextPoem.title}”
              </p>
              <span className="text-[10px] text-paper-faint mt-1 font-karla">
                by {nextPoem.author}
              </span>
            </Link>
          </div>
        </div>

        {/* Reactions — Simple Emoji Options */}
        <div className="flex justify-center gap-2.5 pt-4 pb-2 flex-wrap">
          {reactions.map((r) => (
            <button
              key={r.emoji}
              type="button"
              onClick={() => toggleReaction(r.emoji)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-medium transition cursor-pointer active:scale-95 ${
                reactedEmoji === r.emoji
                  ? "bg-amber-400/15 border-amber-400/50 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.25)]"
                  : "border-neon/20 bg-ink-2/60 text-paper-dim hover:border-neon hover:text-paper"
              }`}
            >
              <span className="text-base leading-none">{r.emoji}</span>
              <span>{r.count}</span>
            </button>
          ))}
        </div>

        <div className="border-t border-neon/15" />

        {/* Reflections — What this poem stirred */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display italic text-2xl text-paper font-medium">
              What this poem stirred
            </h2>
            <span className="text-xs text-paper-faint font-sans">
              {reflections.length} reflections
            </span>
          </div>

          {/* Write Box */}
          <form
            onSubmit={handleShareReflection}
            className="rounded-2xl border border-neon/20 bg-ink-2/70 p-4 sm:p-5 space-y-3 shadow-md"
          >
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Share what you felt while reading this verse..."
              className="w-full bg-ink border border-neon/20 rounded-xl p-3.5 text-sm text-paper placeholder:text-paper-faint/60 focus:outline-none focus:border-neon transition-colors resize-none font-sans"
            />
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => setAnonymous(!anonymous)}
                className={`text-xs px-3 py-1.5 rounded-full border transition cursor-pointer ${
                  anonymous
                    ? "border-neon/30 bg-neon/10 text-neon"
                    : "border-neon/15 text-paper-dim hover:text-paper"
                }`}
              >
                {anonymous
                  ? "Posting anonymously"
                  : `Posting as ${user?.penName || user?.name || "you"}`}
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-1.5 text-xs px-5 py-2 rounded-full bg-neon text-ink font-bold uppercase tracking-wider hover:bg-neon/90 transition-all active:scale-95 shadow-md cursor-pointer"
              >
                <Send className="h-3 w-3" />
                <span>Share</span>
              </button>
            </div>
          </form>

          {/* Reflections List */}
          <div className="space-y-5 pt-2">
            {reflections.map((r) => (
              <div
                key={r.id}
                className="rounded-2xl border border-neon/15 bg-ink-2/50 p-5 space-y-3 shadow-sm hover:border-neon/30 transition"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-paper font-sans">{r.name}</p>
                  <span className="text-[10px] text-paper-faint font-mono">{r.date}</span>
                </div>

                <p className="font-display italic text-base text-paper leading-relaxed">
                  “{r.text}”
                </p>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => toggleHeart(r.id)}
                    className={`flex items-center gap-1.5 text-xs font-sans transition cursor-pointer ${
                      r.isHearted
                        ? "text-rose-400 font-semibold"
                        : "text-paper-faint hover:text-rose-400"
                    }`}
                  >
                    <Heart className="h-3.5 w-3.5" fill={r.isHearted ? "currentColor" : "none"} />
                    <span>{r.hearts}</span>
                  </button>
                </div>

                {/* Poet Reply Card */}
                {r.poetReply && (
                  <div className="mt-3 pl-4 border-l-2 border-amber-400/50 bg-amber-400/5 p-3.5 rounded-r-xl space-y-1">
                    <p className="text-[11px] text-amber-300 font-semibold flex items-center gap-1 font-sans">
                      <Feather className="h-3 w-3" />
                      <span>The poet replied</span>
                    </p>
                    <p className="font-display italic text-sm text-paper-dim leading-relaxed">
                      {r.poetReply}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Confirmation Toast */}
      {toast && (
        <div className="fixed bottom-20 sm:bottom-6 right-6 z-50 rounded-2xl border border-neon/30 bg-ink-2 px-5 py-3 text-xs uppercase tracking-[0.18em] text-paper shadow-2xl flex items-center gap-2 animate-in fade-in">
          <Check className="h-4 w-4 text-neon" />
          <span>{toast}</span>
        </div>
      )}

      {/* MOBILE FLOATING READER BAR (Fixed at bottom with spacious responsive spacing on all mobile screens) */}
      <div className="sm:hidden fixed bottom-4 left-2.5 right-2.5 max-w-md mx-auto z-40 bg-ink-2/95 backdrop-blur-md border border-neon/20 rounded-2xl px-3 py-2.5 shadow-2xl flex items-center justify-between gap-1.5">
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() =>
              setFontSize((prev) => (prev === "sm" ? "base" : prev === "base" ? "lg" : "sm"))
            }
            className="px-2 py-1 rounded-full bg-ink border border-neon/20 text-[11px] text-paper font-mono shrink-0 whitespace-nowrap active:scale-95 transition"
            title="Toggle text size"
          >
            Aa · {fontSize.toUpperCase()}
          </button>
          <button
            type="button"
            onClick={() => setWarmMode(!warmMode)}
            aria-pressed={warmMode}
            className={`p-1.5 rounded-full border shrink-0 transition active:scale-95 ${
              warmMode
                ? "border-amber-400 bg-amber-400/20 text-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.3)]"
                : "border-neon/20 bg-ink text-paper-dim hover:text-paper"
            }`}
            title="Toggle warm lamplight mode"
          >
            <Sparkles className="h-3.5 w-3.5" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => setShareOpen(true)}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-ink border border-neon/20 text-[11px] font-medium uppercase tracking-[0.12em] text-paper-dim hover:text-neon cursor-pointer shrink-0 active:scale-95 transition"
          title="Share poem card"
        >
          <Share2 className="h-3.5 w-3.5" />
          <span>Share</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setSaved(!saved);
            setToast(saved ? "Removed from your reading vault" : "Saved to your reading vault");
            setTimeout(() => setToast(null), 2500);
          }}
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-ink border border-neon/20 text-[11px] font-medium uppercase tracking-[0.12em] text-paper-dim hover:text-neon cursor-pointer shrink-0 active:scale-95 transition ${
            saved ? "text-amber-300 border-amber-400/40" : ""
          }`}
          title={saved ? "Remove from vault" : "Save to vault"}
        >
          <Bookmark
            className="h-3.5 w-3.5"
            strokeWidth={1.5}
            fill={saved ? "currentColor" : "none"}
          />
          <span>{saved ? "Saved" : "Save"}</span>
        </button>
      </div>

      {/* SHARE CARD BOTTOM SHEET (Card Generator with Mood Background) */}
      {shareOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-[fadeIn_0.2s_ease-out]">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setShareOpen(false)}
          />

          <div className="relative w-full max-w-md bg-ink-2 border-t sm:border border-neon/20 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl z-10 max-h-[92vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-neon/10">
              <div>
                <span className="text-[10px] uppercase tracking-[0.24em] text-neon font-semibold">
                  Poetic Card Studio
                </span>
                <h3 className="font-display text-xl text-paper font-medium">
                  Share With Background
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShareOpen(false)}
                className="p-1 rounded-full hover:bg-neon/10 text-paper-dim hover:text-paper cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mood Theme Selector */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-[0.16em] text-paper-faint font-mono">
                Background Atmosphere
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(["reflective", "grief", "love", "joy"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setSelectedMood(m)}
                    className={`py-1.5 px-2 rounded-xl text-[11px] capitalize font-medium transition-all cursor-pointer ${
                      selectedMood === m
                        ? "bg-neon/20 border border-neon text-neon shadow-sm"
                        : "bg-ink border border-neon/15 text-paper-dim hover:text-paper"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Format Picker */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.16em] text-paper-faint font-mono">
                Format:
              </span>
              <div className="flex gap-1.5">
                {(["Square", "Story", "Pin"] as const).map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setCardFormat(fmt)}
                    className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold transition cursor-pointer ${
                      cardFormat === fmt
                        ? "bg-neon text-ink shadow-sm"
                        : "bg-ink border border-neon/20 text-paper-dim hover:text-paper"
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Preview Card with Mood Background Gradient */}
            <div className="flex justify-center py-2">
              <div
                className={`${cardFormats[cardFormat]} rounded-2xl ${moodGradients[selectedMood]} flex flex-col items-center justify-between text-center p-6 relative overflow-hidden border border-neon/20 shadow-2xl transition-all duration-300`}
              >
                {/* Atmosphere Tag */}
                <div className="w-full flex justify-start">
                  <span className="text-[9px] uppercase tracking-wider bg-white/10 text-paper px-2 py-0.5 rounded-full border border-white/15">
                    {selectedMood}
                  </span>
                </div>

                <div className="space-y-3 my-auto py-2">
                  <p className="font-display italic text-paper text-sm sm:text-base leading-relaxed text-pretty">
                    “{cardExcerpt}”
                  </p>
                  <p className="text-[11px] text-neon/90 font-medium tracking-wide">
                    — {poem.author}
                  </p>
                </div>

                {/* Watermark Branding */}
                <div className="pt-2 flex flex-col items-center gap-0.5">
                  <p className="font-display italic text-[11px] text-paper/80">Muse Books</p>
                  <p className="text-[8px] uppercase tracking-[0.2em] text-paper-faint">
                    musebooks.press
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleNativeShare}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-neon text-ink py-3 text-xs font-bold uppercase tracking-[0.16em] shadow-md hover:bg-neon/90 transition-all active:scale-95 cursor-pointer"
              >
                <Share2 className="h-4 w-4" />
                <span>Share to Instagram, WhatsApp...</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-neon/30 bg-ink py-2.5 text-xs text-paper hover:bg-neon/10 transition cursor-pointer"
                >
                  {copied ? <Check className="h-4 w-4 text-neon" /> : <Copy className="h-4 w-4" />}
                  <span>{copied ? "Copied" : "Copy text"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleCopy();
                    setToast("Card text copied with background format!");
                    setTimeout(() => setToast(null), 2500);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-neon/30 bg-ink py-2.5 text-xs text-paper hover:bg-neon/10 transition cursor-pointer"
                >
                  <Download className="h-4 w-4 text-amber-400" />
                  <span>Save Image</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

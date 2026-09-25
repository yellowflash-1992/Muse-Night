import { Link, useParams, useSearch } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Feather } from "lucide-react";
import { useMemo, useState } from "react";

import {
  type ReaderReaction,
  type ReaderReflection,
  getReaderDataForPoem,
} from "@/data/library-reader";
import { getLibraryPoemById, getLiteraryWorldById, LIBRARY_POEMS } from "@/data/literature";
import { useAuth } from "@/hooks/useAuth";
import { getPoemNavigation, resolveNavigationPoems } from "./lib/library-navigation";
import { formatPoemCitation } from "./lib/share";
import { useToast } from "./lib/useToast";
import { LibraryPoemReactions } from "./LibraryPoemReactions";
import { LibraryPoemReader } from "./LibraryPoemReader";
import { LibraryPoemReflections } from "./LibraryPoemReflections";
import { type CardFormat, type CardMood, LibraryPoemShareSheet } from "./LibraryPoemShareSheet";
import { LibraryReaderControlsBar } from "./LibraryReaderControlsBar";

export function LibraryPoemPage() {
  const { id } = useParams({ from: "/library/$id" });
  const { from } = useSearch({ from: "/library/$id" }) as { from?: string };
  const poem = getLibraryPoemById(id);
  const literaryWorld = poem?.literaryWorldId
    ? getLiteraryWorldById(poem.literaryWorldId)
    : undefined;
  const { user } = useAuth();

  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");
  const [warmMode, setWarmMode] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [openLine, setOpenLine] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState<CardMood>("reflective");
  const [cardFormat, setCardFormat] = useState<CardFormat>("Square");
  const [reactedEmoji, setReactedEmoji] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const { toast, showToast } = useToast();

  const readerData = getReaderDataForPoem(id, poem?.author);

  const [reactions, setReactions] = useState<ReaderReaction[]>(() => readerData.reactions);

  const [reflections, setReflections] = useState<ReaderReflection[]>(() => readerData.reflections);

  // Next / Prev poem logic
  const navigationPoems = useMemo(() => resolveNavigationPoems(LIBRARY_POEMS, from), [from]);

  const { previous: prevPoem, next: nextPoem } = useMemo(() => {
    return poem
      ? getPoemNavigation(navigationPoems, poem.id)
      : { previous: undefined, next: undefined };
  }, [navigationPoems, poem]);

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

  const lineNotes = poem?.lineNotes ?? readerData.lineNotes;

  const cardExcerpt = poem.stanzas[0]?.slice(0, 3).join("\n") ?? "";

  const handleCopy = async () => {
    const text = formatPoemCitation(poem);
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
          title: `${poem.title} — Muse Night`,
          text: `"${cardExcerpt}"\n— ${poem.author}\n`,
          url: window.location.href,
        });
      } catch {
        // user cancelled share
      }
    } else {
      handleCopy();
      showToast("Poem text copied to clipboard!");
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
    showToast("Your reflection has been shared by lamplight.", 3000);
  };

  return (
    <div className="min-h-screen bg-ink text-paper">
      <div className="mx-auto max-w-xl px-5 sm:px-6 pt-12 pb-20 space-y-8">
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

            {literaryWorld && (
              <>
                <span className="hidden sm:inline text-paper-faint">·</span>
                <span className="italic text-paper-dim">{literaryWorld.name}</span>
              </>
            )}

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
          <LibraryPoemReader
            poem={poem}
            fontSize={fontSize}
            warmMode={warmMode}
            openLine={openLine}
            lineNotes={lineNotes}
            onToggleLineNote={(lineIdx) => setOpenLine(openLine === lineIdx ? null : lineIdx)}
          />

          {/* Previous / Next Editorial Navigation Cards */}
          {/* Previous / Next Editorial Navigation Cards */}
          {(prevPoem || nextPoem) && (
            <div className="mt-10 pt-8 border-t border-neon/15 grid grid-cols-1 sm:grid-cols-2 gap-3.5 not-italic font-sans">
              {/* Previous Poem Card */}
              {prevPoem && (
                <Link
                  to="/library/$id"
                  params={{ id: prevPoem.id }}
                  {...(from ? { search: { from } } : {})}
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
              )}

              {/* Next Poem Card */}
              {nextPoem && (
                <Link
                  to="/library/$id"
                  params={{ id: nextPoem.id }}
                  {...(from ? { search: { from } } : {})}
                  className={`group flex flex-col justify-between p-4 rounded-2xl border border-neon/15 bg-ink/60 hover:bg-neon/10 hover:border-neon/35 transition-all shadow-sm active:scale-[0.99] text-left ${
                    !prevPoem ? "sm:col-start-2 sm:text-right" : "sm:text-right"
                  }`}
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
              )}
            </div>
          )}
        </div>

        {/* Reactions — Simple Emoji Options */}
        <LibraryPoemReactions
          reactions={reactions}
          reactedEmoji={reactedEmoji}
          onToggleReaction={toggleReaction}
        />

        <div className="border-t border-neon/15" />

        {/* Reflections — What this poem stirred */}
        <LibraryPoemReflections
          reflections={reflections}
          note={note}
          anonymous={anonymous}
          userDisplayName={user?.penName || user?.name || "you"}
          onNoteChange={setNote}
          onAnonymousChange={setAnonymous}
          onToggleHeart={toggleHeart}
          onSubmit={handleShareReflection}
        />
      </div>

      {/* Confirmation Toast */}
      {toast && (
        <div className="fixed bottom-20 sm:bottom-6 right-6 z-50 rounded-2xl border border-neon/30 bg-ink-2 px-5 py-3 text-xs uppercase tracking-[0.18em] text-paper shadow-2xl flex items-center gap-2 animate-in fade-in">
          <Check className="h-4 w-4 text-neon" />
          <span>{toast}</span>
        </div>
      )}

      {/* Mobile floating reader controls */}
      <LibraryReaderControlsBar
        fontSize={fontSize}
        warmMode={warmMode}
        saved={saved}
        onFontSizeChange={() =>
          setFontSize((prev) => (prev === "sm" ? "base" : prev === "base" ? "lg" : "sm"))
        }
        onWarmModeToggle={() => setWarmMode(!warmMode)}
        onShareOpen={() => setShareOpen(true)}
        onSavedToggle={() => {
          setSaved(!saved);
          showToast(saved ? "Removed from your reading vault" : "Saved to your reading vault");
        }}
      />

      {/* SHARE CARD BOTTOM SHEET (Card Generator with Mood Background) */}
      <LibraryPoemShareSheet
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        poem={poem}
        cardExcerpt={cardExcerpt}
        selectedMood={selectedMood}
        onSelectMood={setSelectedMood}
        cardFormat={cardFormat}
        onSelectFormat={setCardFormat}
        onNativeShare={handleNativeShare}
        onCopy={handleCopy}
        onSaveImage={() => {
          handleCopy();
          showToast("Card text copied with background format!");
        }}
        copied={copied}
      />
    </div>
  );
}

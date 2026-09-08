import { createFileRoute, Link } from "@tanstack/react-router";
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

export const Route = createFileRoute("/library/$id")({
  head: ({ params }) => {
    const poem = getLibraryPoemById(params.id);
    return {
      meta: [
        { title: `${poem ? poem.title : "Work"} — Muse Books` },
        {
          name: "description",
          content: poem
            ? `Read "${poem.title}" by ${poem.author}.`
            : "Browse works from Muse Books.",
        },
      ],
    };
  },
  component: PoemReader,
});

function PoemReader() {
  const { id } = Route.useParams();
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
  const prevPoem = currentIndex > 0 ? LIBRARY_POEMS[currentIndex - 1] : null;
  const nextPoem = currentIndex < LIBRARY_POEMS.length - 1 ? LIBRARY_POEMS[currentIndex + 1] : null;

  const handleCopy = () => {
    const textToCopy =
      `${poem.title}\nBy ${poem.author}\n\n` +
      poem.stanzas.map((s) => s.join("\n")).join("\n\n") +
      `\n\n— Muse Books (${window.location.href})`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cardExcerpt = poem.stanzas[0]?.slice(0, 3).join("\n") ?? "";

  const mood = (() => {
    const tags = poem.tags.map((t) => t.toLowerCase());
    if (tags.some((t) => ["grief", "sympathy", "loss", "winter", "silence"].includes(t)))
      return "grief";
    if (tags.some((t) => ["love", "romantic", "wedding", "anniversary"].includes(t))) return "love";
    if (tags.some((t) => ["joy", "playful", "wonder", "nature", "homecoming"].includes(t)))
      return "joy";
    return "reflective";
  })();

  const moodGradient: Record<string, string> = {
    grief: "bg-gradient-to-br from-purple-950 via-stone-950 to-stone-950",
    love: "bg-gradient-to-br from-rose-950 via-stone-950 to-stone-950",
    joy: "bg-gradient-to-br from-amber-950 via-stone-950 to-stone-950",
    reflective: "bg-gradient-to-br from-teal-950 via-stone-950 to-stone-950",
  };

  const moodAccent: Record<string, string> = {
    grief: "text-amber-400",
    love: "text-rose-400",
    joy: "text-amber-400",
    reflective: "text-neon",
  };

  const cardFormats = {
    Square: "aspect-square w-full max-w-[240px]",
    Story: "aspect-[9/16] w-[170px]",
    Pin: "aspect-[2/3] w-[190px]",
  } as const;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: poem.title,
          text: `${poem.title}\nby ${poem.author}\n\n${cardExcerpt}\n\n— Muse Books`,
          url: window.location.href,
        });
      } catch {
        // ignore abort
      }
    }
  };

  const getVault = () => {
    try {
      const raw = localStorage.getItem("muse-vault-poems");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const saveToVault = (item: {
    id: string;
    title: string;
    author: string;
    line?: string;
    mood?: string;
  }) => {
    const vault = getVault();
    const next = vault.some((p: { id: string }) => p.id === item.id)
      ? vault.filter((p: { id: string }) => p.id !== item.id)
      : [...vault, item];
    localStorage.setItem("muse-vault-poems", JSON.stringify(next));
    return next;
  };

  const handleSaveTap = () => {
    if (saved) {
      setSaved(false);
      saveToVault({
        id: poem.id,
        title: poem.title,
        author: poem.author,
        ...(poem.stanzas[0]?.[0] ? { line: poem.stanzas[0][0] } : {}),
        ...(poem.tags[0] ? { mood: poem.tags[0] } : {}),
      });
      return;
    }
    if (!loggedIn) {
      setShowGate(true);
      return;
    }
    completeSave();
  };

  const completeSave = () => {
    const next = saveToVault({
      id: poem.id,
      title: poem.title,
      author: poem.author,
      ...(poem.stanzas[0]?.[0] ? { line: poem.stanzas[0][0] } : {}),
      ...(poem.tags[0] ? { mood: poem.tags[0] } : {}),
    });
    setSaved(next.some((p: { id: string }) => p.id === poem.id));
    setToast(true);
    setTimeout(() => setToast(false), 2200);
  };

  const handleQuickSignup = () => {
    setLoggedIn(true);
    setShowGate(false);
    completeSave();
  };

  const fontSizeClasses = {
    sm: "text-lg sm:text-xl leading-[1.8]",
    base: "text-xl sm:text-2xl leading-[1.9]",
    lg: "text-2xl sm:text-3xl leading-[2.0]",
  }[fontSize];

  return (
    <div className="py-12 sm:py-20 pb-24 sm:pb-20 transition-colors duration-500">
      <div className="mx-auto max-w-285 px-6 sm:px-10">
        {/* Top bar — archive link + reader controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-10">
          <Link
            to="/library"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-paper-dim hover:text-neon transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>All Works</span>
          </Link>

          {/* Desktop Reader controls */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Font size picker */}
            <div className="flex items-center rounded-md border border-neon/20 bg-ink-2 p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setFontSize("sm")}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  fontSize === "sm"
                    ? "bg-neon text-ink font-bold"
                    : "text-paper-dim hover:text-paper"
                }`}
                title="Small text"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => setFontSize("base")}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  fontSize === "base"
                    ? "bg-neon text-ink font-bold"
                    : "text-paper-dim hover:text-paper"
                }`}
                title="Default text"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setFontSize("lg")}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  fontSize === "lg"
                    ? "bg-neon text-ink font-bold"
                    : "text-paper-dim hover:text-paper"
                }`}
                title="Large text"
              >
                A+
              </button>
            </div>

            {/* Warm light mode toggle */}
            <button
              type="button"
              onClick={() => setWarmMode(!warmMode)}
              aria-pressed={warmMode}
              aria-label={warmMode ? "Disable warm lamplight mode" : "Enable warm lamplight mode"}
              className={`p-2 rounded-md border text-xs transition-colors ${
                warmMode
                  ? "border-amber-400/40 bg-amber-400/10 text-amber-200"
                  : "border-neon/20 bg-ink-2 text-paper-dim hover:text-paper"
              }`}
              title="Toggle warm lamplight mode"
            >
              <Sparkles className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => setShareOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-neon/20 bg-ink-2 text-xs uppercase tracking-[0.18em] text-paper-dim hover:text-neon transition-colors"
              title="Share poem card"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Share</span>
            </button>

            <button
              type="button"
              onClick={handleSaveTap}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-neon/20 bg-ink-2 text-xs uppercase tracking-[0.18em] text-paper-dim hover:text-neon transition-colors"
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
        </div>

        {/* POEM HEADER */}
        <header className="space-y-4 border-b border-neon/10 pb-8 text-center max-w-xl mx-auto">
          <div className="reveal d1 inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-neon/90 font-medium">
            <span>{poem.collection}</span>
            <span>·</span>
            <span>{poem.year}</span>
          </div>

          <h1 className="reveal d2 font-display text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-paper text-balance leading-tight">
            {poem.title}
          </h1>

          <div className="reveal d3 pt-1">
            <Link
              to="/about"
              className="text-xs uppercase tracking-[0.22em] text-paper-dim hover:text-neon transition-colors inkline"
            >
              By {poem.author}
            </Link>
          </div>

          <div className="flex justify-center items-center gap-3 pt-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-paper-faint">
            <span>{poem.linesCount} lines</span>
            <span>·</span>
            <span>{poem.readTime} read</span>
          </div>
        </header>

        {/* POEM BODY */}
        <article className="my-12 sm:my-14 pt-8 max-w-2xl mx-auto">
          {/* Reading surface — warm mode turns it into an amber lamplit page */}
          <div
            className={`rounded-2xl border px-6 sm:px-10 py-8 sm:py-12 shadow-lg transition-colors duration-500 ${
              warmMode
                ? "bg-amber-400/10 border-amber-400/30 text-amber-100"
                : "bg-ink-2/80 border-neon/15 text-paper"
            }`}
          >
            <div className={`font-display space-y-8 ${fontSizeClasses}`}>
              {poem.stanzas.map((stanza, sIdx) => {
                const globalIdx = poem.stanzas.slice(0, sIdx).reduce((sum, s) => sum + s.length, 0);
                return (
                  <div key={sIdx} className="space-y-2">
                    {stanza.map((line, lIdx) => {
                      const idx = globalIdx + lIdx;
                      const noteData = poem.lineNotes?.[idx];
                      return (
                        <div key={lIdx}>
                          <button
                            type="button"
                            onClick={() =>
                              noteData ? setOpenLine(openLine === idx ? null : idx) : undefined
                            }
                            className={`text-left w-full ${
                              noteData
                                ? "underline decoration-dotted decoration-neon/30 underline-offset-4"
                                : ""
                            }`}
                          >
                            <p className="tracking-wide text-pretty">{line}</p>
                          </button>

                          {openLine === idx && noteData && (
                            <div className="mt-3 mb-2 ml-1 pl-4 border-l-2 border-neon/20">
                              <p className="text-sm not-italic font-sans text-paper-dim mb-2">
                                {noteData.count} people felt this line too
                              </p>
                              <p className="text-base not-italic font-sans text-paper leading-relaxed">
                                &ldquo;{noteData.excerpt}&rdquo;
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Poet's footnote / note if available */}
          {poem.note && (
            <div className="mt-10 p-5 sm:p-6 rounded-lg bg-ink-2 border-l-2 border-neon">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-neon not-italic font-medium mb-2">
                Poet&apos;s Note
              </p>
              <p className="font-display text-base sm:text-lg text-paper italic leading-relaxed">
                &ldquo;{poem.note}&rdquo;
              </p>
            </div>
          )}

          {/* Tags */}
          <div className="mt-8 flex flex-wrap gap-2">
            {poem.tags.map((t) => (
              <Link
                key={t}
                to="/library"
                className="text-[11px] uppercase tracking-[0.16em] text-paper-faint hover:text-neon bg-ink-2 border border-neon/15 px-2.5 py-1 rounded-full transition-colors"
              >
                #{t}
              </Link>
            ))}
          </div>

          {/* Reactions */}
          <div className="mt-10 pt-8 border-t border-neon/10">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-paper-faint mb-4 text-center">
              How this poem moved you
            </p>
            <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
              {[
                { emoji: "❤️", label: "moved me", count: 341 },
                { emoji: "😢", label: "made me cry", count: 128 },
                { emoji: "🔥", label: "loved the writing", count: 52 },
              ].map((r) => {
                const active = reacted === r.label;
                const displayCount = r.count + (active ? 1 : 0);
                return (
                  <button
                    key={r.label}
                    type="button"
                    onClick={() => setReacted(active ? null : r.label)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs transition ${
                      active
                        ? "border-neon text-neon bg-neon/10"
                        : "border-neon/15 text-paper-dim hover:border-neon/40"
                    }`}
                  >
                    <span className="text-base leading-none">{r.emoji}</span>
                    <span>{displayCount}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reflections */}
          <div className="mt-10 sm:mt-12 pt-8 border-t border-neon/10">
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-paper mb-6">
              What this poem stirred
            </h2>

            <div className="rounded-xl border border-neon/15 bg-ink-2 p-4 sm:p-6 mb-8">
              <label className="block text-[10px] sm:text-xs uppercase tracking-[0.2em] text-paper-dim mb-2">
                Share what you felt
              </label>
              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="This poem reminded me of..."
                className="w-full bg-ink border border-neon/20 rounded-lg px-3.5 py-2.5 text-sm text-paper placeholder:text-paper-faint focus:outline-none focus:border-neon/60 resize-none"
              />
              <div className="flex items-center justify-between mt-3">
                <button
                  type="button"
                  onClick={() => setAnonymous(!anonymous)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition ${
                    anonymous ? "border-neon/30 text-paper" : "border-neon/15 text-paper-dim"
                  }`}
                >
                  {anonymous ? "Posting anonymously" : "Posting as you"}
                </button>
                <button
                  type="button"
                  className="text-xs uppercase tracking-[0.2em] px-5 py-2 rounded-full bg-neon text-ink font-medium hover:bg-neon/90 transition"
                >
                  Share
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-neon/15 bg-ink-2 p-5 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-paper-faint">
                    {showAllComments ? "All comments" : "Top comments"}
                  </span>
                  <span className="text-[10px] text-paper-faint">3 comments</span>
                </div>

                <div className="space-y-5">
                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neon/15 text-neon text-xs font-bold">
                      A
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-paper-dim mb-1">Anonymous</p>
                      <p className="text-sm sm:text-base text-paper leading-relaxed">
                        I lost my dad in March. This is the first thing that&apos;s made the loss
                        feel less lonely instead of heavier.
                      </p>
                      <button className="flex items-center gap-1.5 text-xs text-paper-faint mt-2">
                        <Heart className="h-3.5 w-3.5" />
                        214
                      </button>
                      <div className="mt-3 pl-4 border-l-2 border-neon/20">
                        <p className="text-[10px] sm:text-xs text-neon mb-1 uppercase tracking-[0.2em]">
                          The poet replied
                        </p>
                        <p className="text-sm text-paper leading-relaxed">
                          Thank you for trusting this poem with that. Sending you steadiness. — R.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neon/15 text-neon text-xs font-bold">
                      {isAuthenticated && user ? user.name.charAt(0).toUpperCase() : "A"}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-paper-dim mb-1">
                        {isAuthenticated && user && !anonymous ? user.name : "Anonymous"}
                      </p>
                      <p className="text-sm sm:text-base text-paper leading-relaxed">
                        “the kettle still set for two” — I had to stop reading for a minute.
                      </p>
                      <button className="flex items-center gap-1.5 text-xs text-paper-faint mt-2">
                        <Heart className="h-3.5 w-3.5" />
                        96
                      </button>
                    </div>
                  </div>

                  {showAllComments && (
                    <div className="flex gap-3 animate-in fade-in">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neon/15 text-neon text-xs font-bold">
                        M
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-paper-dim mb-1">Maya</p>
                        <p className="text-sm sm:text-base text-paper leading-relaxed">
                          I keep rereading this late at night. Something about the silence in it.
                        </p>
                        <button className="flex items-center gap-1.5 text-xs text-paper-faint mt-2">
                          <Heart className="h-3.5 w-3.5" />
                          12
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setShowAllComments(!showAllComments)}
                  className="mt-5 flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-neon hover:underline"
                >
                  {showAllComments ? "Show fewer comments" : "Read all comments"}
                  {!showAllComments && <span className="text-[10px] text-paper-faint">(3)</span>}
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* PREV / NEXT NAVIGATION */}
        <nav className="mt-14 sm:mt-16 pt-10 border-t border-neon/10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {prevPoem ? (
            <Link
              to="/library/$id"
              params={{ id: prevPoem.id }}
              className="group p-4 sm:p-5 rounded-xl border border-neon/15 bg-ink-2 hover:border-neon/40 active:scale-[0.98] transition-all flex flex-col items-start"
            >
              <span className="text-[10px] uppercase tracking-[0.22em] text-paper-faint flex items-center gap-1.5 mb-1">
                <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
                Previous Work
              </span>
              <span className="font-display text-lg sm:text-xl text-paper group-hover:text-neon transition-colors">
                {prevPoem.title}
              </span>
              <span className="text-xs text-paper-dim mt-0.5">{prevPoem.author}</span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nextPoem ? (
            <Link
              to="/library/$id"
              params={{ id: nextPoem.id }}
              className="group p-4 sm:p-5 rounded-xl border border-neon/15 bg-ink-2 hover:border-neon/40 active:scale-[0.98] transition-all flex flex-col items-end text-right"
            >
              <span className="text-[10px] uppercase tracking-[0.22em] text-paper-faint flex items-center gap-1.5 mb-1">
                Next Work
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="font-display text-lg sm:text-xl text-paper group-hover:text-neon transition-colors">
                {nextPoem.title}
              </span>
              <span className="text-xs text-paper-dim mt-0.5">{nextPoem.author}</span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}
        </nav>
      </div>

      {/* SHARE BOTTOM SHEET */}
      {shareOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShareOpen(false)} />
          <div className="relative w-full max-w-md bg-ink-2 border-t border-neon/20 rounded-t-2xl px-6 pt-4 pb-8 z-10">
            <div className="w-10 h-1 bg-neon/20 rounded-full mx-auto mb-5" />

            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl text-paper">Share this poem</h2>
              <button
                type="button"
                onClick={() => setShareOpen(false)}
                className="p-1 rounded-full hover:bg-neon/10 text-paper-dim"
                aria-label="Close share sheet"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Live preview */}
            <div className="flex justify-center mb-6">
              <div
                className={`${cardFormats[cardFormat]} rounded-2xl ${moodGradient[mood]} flex flex-col items-center justify-center text-center p-6 relative overflow-hidden border border-neon/10`}
              >
                <span
                  className={`absolute top-3 left-3 text-[9px] uppercase tracking-wider bg-white/10 px-2 py-1 rounded-full ${moodAccent[mood]}`}
                >
                  {mood}
                </span>
                <p className="font-display italic text-stone-200 text-sm leading-relaxed relative z-10 text-pretty">
                  {cardExcerpt}
                </p>
                <p className="text-[10px] text-stone-400 mt-3 relative z-10">— {poem.author}</p>
                <div className="absolute bottom-3 flex flex-col items-center gap-0.5">
                  <p className="font-display italic text-[10px] text-stone-300">Muse Books</p>
                  <p className="text-[8px] text-stone-500">musebooks.press</p>
                </div>
              </div>
            </div>

            {/* Format tabs */}
            <div className="flex justify-center gap-2 mb-7">
              {Object.keys(cardFormats).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setCardFormat(f as typeof cardFormat)}
                  className={`px-4 py-1.5 rounded-full text-xs border transition ${
                    cardFormat === f
                      ? "border-neon text-neon bg-neon/10"
                      : "border-neon/20 text-paper-dim hover:border-neon/40"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleNativeShare}
                className="flex items-center justify-center gap-2 bg-neon text-ink text-sm font-medium py-3 rounded-full hover:bg-neon/90 transition"
              >
                <Send className="w-4 h-4" strokeWidth={1.5} />
                Share to Instagram, WhatsApp...
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center justify-center gap-2 border border-neon/20 text-paper text-sm py-3 rounded-full hover:bg-neon/10 transition"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-neon" strokeWidth={1.5} />
                ) : (
                  <Copy className="w-4 h-4" strokeWidth={1.5} />
                )}
                {copied ? "Copied" : "Copy text"}
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 border border-neon/20 text-paper text-sm py-3 rounded-full hover:bg-neon/10 transition"
              >
                <Download className="w-4 h-4" strokeWidth={1.5} />
                Download image
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SAVE GATE MODAL */}
      {showGate && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowGate(false)} />
          <div className="relative w-full max-w-sm bg-ink-2 border-t border-neon/20 rounded-t-2xl sm:rounded-2xl px-6 pt-6 pb-8 z-10">
            <button
              type="button"
              onClick={() => setShowGate(false)}
              className="absolute top-4 right-4 text-paper-dim hover:text-paper"
              aria-label="Close"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>

            <div className="text-center mb-6">
              <Bookmark className="w-8 h-8 text-neon mx-auto mb-4" strokeWidth={1.5} />
              <h2 className="font-display text-xl text-paper mb-2">Keep this poem</h2>
              <p className="text-sm text-paper-dim leading-relaxed">
                Create a free account and this poem — and every one you save after — waits for you
                in your own vault.
              </p>
            </div>

            <button
              type="button"
              onClick={handleQuickSignup}
              className="w-full flex items-center justify-center gap-2 bg-neon text-ink text-sm font-medium py-3 rounded-full mb-3 hover:bg-neon/90 transition"
            >
              <Mail className="w-4 h-4" strokeWidth={1.5} />
              Continue with email
            </button>
            <button
              type="button"
              onClick={handleQuickSignup}
              className="w-full border border-neon/20 text-paper text-sm py-3 rounded-full hover:bg-neon/10 transition"
            >
              Continue with Google
            </button>

            <p className="text-xs text-paper-faint text-center mt-5">
              Takes 10 seconds. No password to remember.
            </p>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-ink-2 border border-neon/30 rounded-full px-5 py-2.5 flex items-center gap-2 text-sm text-paper z-50 shadow-lg">
          <Check className="w-4 h-4 text-neon" strokeWidth={1.5} />
          Saved to your vault
        </div>
      )}

      {/* MOBILE FLOATING READER BAR (Accessible for readers holding phones with one hand) */}
      <div className="sm:hidden fixed bottom-4 left-4 right-4 z-40 bg-ink-2/95 backdrop-blur-md border border-neon/20 rounded-2xl px-4 py-2.5 shadow-2xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              setFontSize((prev) => (prev === "sm" ? "base" : prev === "base" ? "lg" : "sm"))
            }
            className="px-2.5 py-1 rounded-full bg-ink border border-neon/20 text-xs text-paper"
            title="Toggle Text Size"
          >
            Size: {fontSize.toUpperCase()}
          </button>
          <button
            type="button"
            onClick={() => setWarmMode(!warmMode)}
            aria-pressed={warmMode}
            aria-label={warmMode ? "Disable warm lamplight mode" : "Enable warm lamplight mode"}
            className={`p-1.5 rounded-full border ${
              warmMode
                ? "border-amber-400 bg-amber-400/20 text-amber-200"
                : "border-neon/20 bg-ink text-paper-dim"
            }`}
            title="Toggle Warm Light"
          >
            <Sparkles className="h-3.5 w-3.5" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setShareOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ink border border-neon/20 text-xs font-medium uppercase tracking-[0.15em] text-paper-dim hover:text-neon"
          title="Share poem card"
        >
          <Share2 className="h-3.5 w-3.5" />
          <span>Share</span>
        </button>

        <button
          type="button"
          onClick={handleSaveTap}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ink border border-neon/20 text-xs font-medium uppercase tracking-[0.15em] text-paper-dim hover:text-neon"
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
    </div>
  );
}

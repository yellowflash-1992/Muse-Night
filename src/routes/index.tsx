import { createFileRoute, getRouteApi, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  Check,
  Feather,
  Layers,
  Quote,
  RefreshCw,
  Share2,
  Sparkles,
  Users,
} from "lucide-react";
import { useRef, useState } from "react";

import { MobileLanding } from "@/components/mobile/MobileLanding";
import { listPublishedChapbooks } from "@/lib/chapbooks.functions";
import { listPublishedCollections } from "@/lib/collections.functions";
import { listPersonsPublic } from "@/lib/people.functions";
import { getPublishedPoemsList } from "@/lib/poems.functions";
import { listPoetCardsPublic } from "@/lib/poets.functions";
import { getPublishedQuotes } from "@/lib/quotes.functions";

import { coverThemes } from "@/data/mobileLandingData";
import { useSwipeSlider } from "@/hooks/useSwipeSlider";

const routeApi = getRouteApi("/");

export const Route = createFileRoute("/")({
  loader: async () => {
    const [poems, chapbooks, collections, poets, poetCards, quotes] = await Promise.all([
      getPublishedPoemsList(),
      listPublishedChapbooks(),
      listPublishedCollections(),
      listPersonsPublic(),
      listPoetCardsPublic(),
      getPublishedQuotes(),
    ]);
    return { poems, chapbooks, collections, poets, poetCards, quotes };
  },
  head: () => ({
    meta: [
      { title: "Muse Night &mdash; A Small Press for Poetry & Literature" },
      {
        name: "description",
        content:
          "A small lamplit press for poetry, chapbooks, and literature. Hand-bound editions and verses by Irshand and InkbyNur.",
      },
      { property: "og:title", content: "Muse Night &mdash; A Small Press for Poetry & Literature" },
      {
        property: "og:description",
        content:
          "A small lamplit press for poetry, chapbooks, and literature. Hand-bound editions and verses.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { poems, chapbooks, collections, poets, poetCards, quotes } = routeApi.useLoaderData();
  const [poemIndex, setPoemIndex] = useState(0);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const swipeHandlers = useSwipeSlider(heroRef);

  // 4 Alternating background panels + 1 cloned first panel for seamless looping
  const desktopPanels = [
    {
      id: "desktop-night-1",
      type: "image",
      src: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1920&q=80",
      title: "Night Study",
    },
    {
      id: "desktop-grid-1",
      type: "grid",
      title: "Letterpress Grid",
    },
    {
      id: "desktop-night-2",
      type: "image",
      src: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1920&q=80",
      title: "Nocturnal Paper",
    },
    {
      id: "desktop-grid-2",
      type: "grid",
      title: "Letterpress Blueprint",
    },
    // Clone of Item 1 for seamless infinite step transition
    {
      id: "desktop-night-1-clone",
      type: "image",
      src: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1920&q=80",
      title: "Night Study Clone",
      isClone: true,
    },
  ];

  const activePoem = poems.length > 0 ? (poems[poemIndex % poems.length] ?? poems[0]) : null;
  const featuredPoem = poems.filter((p) => p.featured)[0] ?? null;
  const curatedPoems = poems.filter((p) => p.featured).slice(0, 4);
  const featuredBook = chapbooks[0] ?? null;

  const handleShuffleVerse = () => {
    if (poems.length === 0) return;
    setPoemIndex((prev) => (prev + 1) % poems.length);
  };

  const handleCopyVerse = () => {
    if (!activePoem) return;
    const lines = activePoem.stanzas[0]?.slice(0, 3) ?? [];
    const text = `"${lines.join("\n")}"\n&mdash; ${activePoem.author}, ${activePoem.title}\n(via Muse Night)`;
    navigator.clipboard.writeText(text);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const portals = [
    {
      title: "Library Archive",
      desc: "An open archive of poems, prose poetry, epistles, and literary works.",
      to: "/library",
      count: `${poems.length} works`,
      icon: BookOpen,
      action: "Browse archive",
      badge: "Poems & prose",
    },
    {
      title: "Collections",
      desc: "Curated suites and seasonal anthologies charting inner and outer weather.",
      to: "/collections",
      count: `${collections.length} Volumes`,
      icon: Layers,
      action: "Explore suites",
      badge: "Curated suites",
    },
    {
      title: "Hand-Bound Chapbooks",
      desc: "Limited letterpress editions printed on mould-made rag paper using metal type.",
      to: "/books",
      count: `${chapbooks.length} Editions`,
      icon: BookMarked,
      action: "View editions",
      badge: "Numbered printings",
    },
    {
      title: "The Press & Poets",
      desc: "The story of Irshand and InkbyNur, the voices behind our shared lamp and literary studio.",
      to: "/about",
      count: `${poets.length} Poets`,
      icon: Users,
      action: "Meet the poets",
      badge: "Biographies",
    },
    {
      title: "Submissions",
      desc: "We read standalone poems, suites, and chapbook manuscripts on a rolling basis.",
      to: "/submit",
      count: "Open year-round",
      icon: Feather,
      action: "Submit manuscript",
      badge: "No reading fees",
    },
    {
      title: "JAMB & WAEC Literature",
      desc: "Syllabus-aligned poetry analysis, literary devices, and exam companion guides.",
      to: "/study",
      count: "Study Hub",
      icon: BookMarked,
      action: "Explore guides",
      badge: "Exam Companion",
    },
  ];

  return (
    <div className="space-y-0 overflow-hidden">
      {/* MOBILE-ONLY IMMERSIVE VIEW (Exact dark/night aesthetic from project) */}
      <MobileLanding />

      {/* DESKTOP-ONLY EDITORIAL VIEW */}
      <div className="hidden md:block">
        {/* MASTHEAD / HERO WITH STEP-BY-STEP SEAMLESS SLIDER BACKGROUND */}
        <section
          ref={heroRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={(e) => {
            swipeHandlers.onTouchStart(e);
            setIsPaused(true);
          }}
          onTouchEnd={(e) => {
            swipeHandlers.onTouchEnd(e);
            setIsPaused(false);
          }}
          onTouchCancel={() => setIsPaused(false)}
          className={`hero-slider-container border-b border-neon/10 py-16 lg:py-24 relative overflow-hidden min-h-[500px] flex items-center isolate ${
            isPaused ? "is-paused" : ""
          }`}
        >
          {/* STEP-BY-STEP SLIDER TRACK (Item 1 -> Item 2 -> Item 3 -> Item 4 -> Clone Item 1) */}
          <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none bg-ink">
            <div className="step-slider-track">
              {desktopPanels.map((panel, idx) => (
                <div
                  key={`${panel.id}-${idx}`}
                  className="relative h-full w-[100vw] shrink-0 overflow-hidden bg-ink"
                  aria-hidden={panel.isClone ? "true" : undefined}
                >
                  {panel.type === "image" ? (
                    <img
                      src={panel.src}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover object-center transform-gpu"
                      loading="eager"
                    />
                  ) : (
                    /* Signature Letterpress Net Grid Pattern */
                    <div className="absolute inset-0 bg-ink">
                      <div className="absolute inset-0 gridbg opacity-95" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon/15 rounded-full blur-3xl" />
                    </div>
                  )}
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-ink/70" />
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 w-full relative z-10">
            <div className="grid grid-cols-12 gap-10 items-end">
              <div className="col-span-8">
                {/* Responsive Pill Badge with overflow protection */}
                <div className="inline-flex max-w-full items-center gap-1.5 sm:gap-2 mb-4 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-[11px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.25em] text-neon font-medium shadow-sm">
                  <Sparkles className="h-3 w-3 shrink-0 animate-pulse text-neon" />
                  <span className="truncate">Small Press for Verse &amp; Literature</span>
                </div>

                <h1 className="reveal d1 font-display text-[clamp(4rem,9vw,7.5rem)] leading-[0.92] font-medium tracking-[-0.02em] text-paper text-balance">
                  Muse Night
                </h1>

                <p className="reveal d2 mt-6 font-display text-2xl lg:text-3xl text-paper-dim italic max-w-[28ch] leading-snug">
                  “We do not write to be found. We write to leave the light on.”
                </p>

                {/* Continuous Reel Indicator */}
                <div className="mt-8 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-neon animate-ping" />
                  <span className="text-xs uppercase tracking-[0.2em] text-paper-dim font-mono">
                    Continuous Lamplight Reel
                  </span>
                </div>
              </div>

              <div className="reveal d3 col-span-4 pl-8 border-l border-neon/15">
                <p className="text-sm leading-relaxed text-paper-dim text-pretty">
                  Dedicated pages for poems, seasonal collections, physical chapbooks, and essays
                  from{" "}
                  <Link
                    to="/about"
                    className="font-medium text-neon hover:text-amber-300 underline underline-offset-4"
                  >
                    Irshand
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/about"
                    className="font-medium text-neon hover:text-amber-300 underline underline-offset-4"
                  >
                    InkbyNur
                  </Link>
                  .
                </p>

                <div className="mt-6 flex gap-3">
                  <Link
                    to="/library"
                    className="inline-flex items-center gap-2 rounded bg-neon px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-ink transition-all hover:bg-neon/90 shadow-md"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Explore Archive</span>
                  </Link>
                  <Link
                    to="/submit"
                    className="inline-flex items-center gap-2 rounded border border-neon/30 bg-ink-2/60 px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-paper transition-all hover:bg-neon/10"
                  >
                    <Feather className="h-4 w-4" />
                    <span>Submit Work</span>
                  </Link>
                </div>

                <div className="mt-4">
                  <Link
                    to="/mood"
                    className="inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-amber-300/10 px-6 py-3 text-xs uppercase tracking-[0.22em] font-semibold text-amber-200 shadow-[0_0_25px_rgba(254,240,138,0.25)] hover:shadow-[0_0_45px_rgba(254,240,138,0.55)] hover:bg-amber-300/20 active:scale-95 transition-all animate-golden-pulse"
                  >
                    <Sparkles className="h-4 w-4 text-amber-200" />
                    <span>A poem for your mood</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LITERARY STATS BAR */}
        <section className="border-y border-neon/15 bg-ink-2/90 py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-4 gap-4 text-center">
              <Link to="/library" className="flex flex-col items-center">
                <span className="font-display text-2xl font-medium text-neon">{poems.length}</span>
                <span className="text-[10px] uppercase tracking-[0.12em] text-paper-dim">
                  Works
                </span>
              </Link>
              <Link to="/collections" className="flex flex-col items-center">
                <span className="font-display text-2xl font-medium text-amber-300">
                  {collections.length}
                </span>
                <span className="text-[10px] uppercase tracking-[0.12em] text-paper-dim">
                  Suites
                </span>
              </Link>
              <Link to="/books" className="flex flex-col items-center">
                <span className="font-display text-2xl font-medium text-rose-300">
                  {chapbooks.length}
                </span>
                <span className="text-[10px] uppercase tracking-[0.12em] text-paper-dim">
                  Books
                </span>
              </Link>
              <Link to="/about" className="flex flex-col items-center">
                <span className="font-display text-2xl font-medium text-paper">{poets.length}</span>
                <span className="text-[10px] uppercase tracking-[0.12em] text-paper-dim">
                  Poets
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* INTERACTIVE "VERSE OF THE HOUR" DISCOVERY MODULE (Engaging for readers & casual visitors) */}
        {/* INTERACTIVE "VERSE OF THE HOUR" DISCOVERY MODULE (Engaging for readers & casual visitors) */}
        {activePoem && (
          <section className="border-b border-neon/10 bg-gradient-to-b from-ink-2/80 to-ink py-10 sm:py-16">
            <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
              <div className="rounded-2xl border border-neon/20 bg-ink-2/90 p-5 sm:p-10 shadow-xl relative overflow-hidden">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neon/10">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-neon font-medium">
                    <Quote className="h-4 w-4 text-neon" />
                    <span>Verse of the Hour · Tap to shuffle</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyVerse}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neon/20 bg-ink text-xs uppercase tracking-[0.15em] text-paper-dim hover:text-paper active:scale-95 transition-all"
                    >
                      {copiedSnippet ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-neon" />
                          <span className="text-neon">Copied</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="h-3.5 w-3.5" />
                          <span>Share</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleShuffleVerse}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neon text-ink text-xs uppercase tracking-[0.16em] font-medium hover:bg-neon/90 active:scale-95 transition-all shadow-sm"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span>Next Verse</span>
                    </button>
                  </div>
                </div>

                <div className="py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-8">
                    <h3 className="text-xs uppercase tracking-[0.2em] text-paper-faint mb-2">
                      From “{activePoem.title}” · {activePoem.readTime}
                    </h3>
                    <div className="font-display text-2xl sm:text-3xl text-paper leading-[1.6] space-y-2 italic">
                      {(activePoem.stanzas[0] ?? []).slice(0, 3).map((line, lIdx) => (
                        <p key={lIdx}>“{line}”</p>
                      ))}
                    </div>
                    <p className="mt-4 text-xs uppercase tracking-[0.2em] text-neon/80 font-medium">
                      &mdash; {activePoem.author} ({activePoem.year})
                    </p>
                  </div>

                  <div className="lg:col-span-4 lg:border-l lg:border-neon/15 lg:pl-8 flex flex-col justify-between gap-4">
                    <p className="text-xs sm:text-sm text-paper-dim leading-relaxed">
                      {activePoem.note ||
                        "Hand-printed under single lamplight for readers who take time."}
                    </p>
                    <Link
                      to="/library/$id"
                      params={{ id: activePoem.id }}
                      search={{ source: "home" }}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neon inkline font-medium"
                    >
                      <span>Read full work in reader</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* EXPLORE GATEWAY PORTALS */}
        <section className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10 py-16 sm:py-20">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-10 gap-2 border-b border-neon/10 pb-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-neon/80 font-medium">
                Navigation Portal
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-paper mt-1">
                Explore Our Literary Pages
              </h2>
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-paper-faint">
              Independent Pages &amp; Archives
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portals.map((portal) => {
              const Icon = portal.icon;
              return (
                <Link
                  key={portal.to}
                  to={portal.to}
                  className="group rounded-xl border border-neon/15 bg-ink-2 p-6 flex flex-col justify-between transition-all hover:border-neon/40 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-paper-faint uppercase tracking-[0.2em] mb-4">
                      <div className="p-2.5 rounded-md bg-ink border border-neon/20 text-neon group-hover:bg-neon group-hover:text-ink transition-colors">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span>{portal.count}</span>
                    </div>
                    <h3 className="font-display text-2xl font-medium text-paper group-hover:text-neon transition-colors">
                      {portal.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-paper-dim leading-relaxed">
                      {portal.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neon/10 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-neon font-medium">
                    <span>{portal.action}</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* VERSES BY LAMPLIGHT (Curated Covers) */}
        {curatedPoems.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-16 sm:py-20">
            <div className="flex items-baseline justify-between border-b border-neon/10 pb-3 mb-6">
              <div>
                <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-neon">
                  Selected Works
                </span>
                <h2 className="font-display text-2xl text-paper font-medium mt-0.5">
                  Verses by Lamplight
                </h2>
              </div>
              <Link
                to="/library"
                className="text-[11px] uppercase tracking-[0.16em] text-neon font-medium"
              >
                All {poems.length} &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {curatedPoems.map((poem, index) => {
                const theme = (coverThemes[index % coverThemes.length] ?? coverThemes[0])!;
                return (
                  <Link
                    key={poem.id}
                    to="/library/$id"
                    params={{ id: poem.id }}
                    search={{ source: "home" }}
                    className="group relative flex flex-col text-left"
                  >
                    <div
                      className={`relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br ${theme.gradient} border ${theme.border} p-4 flex flex-col justify-between shadow-lg ${theme.glow}`}
                    >
                      <div className="absolute left-0 top-0 h-full w-1.5 bg-black/40" />
                      <div className="flex items-center gap-1.5">
                        <div className={`h-1.5 w-1.5 rounded-full ${theme.dot}`} />
                        <span
                          className={`text-[9px] font-medium uppercase tracking-[0.18em] ${theme.accent}`}
                        >
                          {poem.year.split(" ")[0]}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-medium leading-tight text-paper group-hover:text-neon transition-colors line-clamp-2">
                          {poem.title}
                        </h3>
                        <p className="mt-1 text-[10px] text-paper-dim/80 truncate">
                          {poem.author.split(" ")[0]} · {poem.readTime}
                        </p>
                      </div>
                      <div className="pt-1 flex justify-end">
                        <span className="text-[9px] uppercase tracking-[0.14em] text-neon font-medium bg-black/40 px-2 py-0.5 rounded-full border border-white/10">
                          Read
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 text-[11px] text-paper-dim/90 font-serif italic line-clamp-2 leading-snug px-0.5">
                      “{poem.stanzas[0]?.[0]}”
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* FEATURED POEM SPOTLIGHT */}
        {/* FEATURED POEM SPOTLIGHT */}
        {featuredPoem && (
          <section className="bg-ink-2/60 border-y border-neon/10 py-16 sm:py-24">
            <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
                <div className="col-span-12 lg:col-span-4 space-y-4">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-neon/80 font-medium">
                    Poem of the Season
                  </p>
                  <h2 className="font-display text-3xl sm:text-5xl font-medium text-paper leading-tight">
                    {featuredPoem.title}
                  </h2>
                  <p className="text-xs uppercase tracking-[0.2em] text-paper-faint">
                    By {featuredPoem.author} · {featuredPoem.linesCount} lines ·{" "}
                    {featuredPoem.readTime}
                  </p>
                  <p className="text-sm text-paper-dim leading-relaxed pt-2">{featuredPoem.note}</p>
                  <div className="pt-2">
                    <Link
                      to="/library/$id"
                      params={{ id: featuredPoem.id }}
                      search={{ source: "home" }}
                      className="inline-flex items-center gap-2 rounded bg-neon px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium text-ink hover:bg-neon/90 transition-all"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>Enter Reading Room</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-8 lg:border-l lg:border-neon/15 lg:pl-10">
                  <div className="font-display text-xl sm:text-2xl text-paper leading-[1.7] space-y-4 bg-ink p-6 sm:p-8 rounded-xl border border-neon/15 shadow-inner">
                    {featuredPoem.stanzas.slice(0, 2).map((stanza, idx) => (
                      <div key={idx} className="space-y-1">
                        {stanza.map((line, lIdx) => (
                          <p key={lIdx}>{line}</p>
                        ))}
                      </div>
                    ))}
                    <div className="pt-4 text-right">
                      <Link
                        to="/library/$id"
                        params={{ id: featuredPoem.id }}
                        search={{ source: "home" }}
                        className="text-xs uppercase tracking-[0.2em] text-neon hover:underline"
                      >
                        Read complete work with reader controls &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* IN THEIR WORDS (Testimonials) */}
        {quotes.length > 0 && (
          <section className="border-y border-neon/10 bg-ink-2/60 py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
              <div className="mb-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neon block mb-3">
                  // In Their Words
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-medium text-paper leading-tight">
                  Voices from <span className="italic font-light text-paper-dim">the page</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quotes.slice(0, 4).map((quote) => {
                  const person = quote.penName?.person;
                  const avatarUrl = [person?.imageUrl, quote.avatarUrl].find(Boolean);
                  return (
                    <article
                      key={quote.id}
                      className="glass-card rounded-xl border border-neon/15 bg-ink-2/60 p-6 space-y-4"
                    >
                      <div className="font-display text-4xl text-neon/30 leading-none select-none">
                        “
                      </div>
                      <p className="font-display italic text-paper text-lg leading-relaxed">
                        {quote.text}
                      </p>
                      <div className="flex items-center gap-3 pt-2 border-t border-neon/10">
                        {avatarUrl ? (
                          <img
                            src={avatarUrl}
                            alt=""
                            className="w-9 h-9 rounded-full object-cover shrink-0"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-xl bg-neon/20 flex items-center justify-center text-neon font-bold shrink-0">
                            {quote.author.charAt(0)}
                          </div>
                        )}
                        <p className="text-sm font-semibold text-paper">{quote.author}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* HIGHLIGHT: PHYSICAL EDITION & ESSAY */}
        {/* HIGHLIGHT: PHYSICAL EDITION & ESSAY */}
        {featuredBook && (
          <section className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Chapbook feature */}
              <article className="rounded-xl border border-neon/15 bg-ink-2 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-neon/80 uppercase tracking-[0.2em] mb-4">
                    <span>Featured Letterpress Edition</span>
                    <span className="font-mono text-paper font-medium">{featuredBook.price}</span>
                  </div>
                  <h3 className="font-display text-3xl font-medium text-paper">
                    {featuredBook.title}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-paper-faint">
                    By {featuredBook.author} · {featuredBook.year}
                  </p>
                  <p className="mt-4 text-sm text-paper-dim leading-relaxed">
                    {featuredBook.description}
                  </p>
                  <p className="mt-4 p-3 rounded bg-ink text-xs italic text-paper-dim border-l-2 border-neon/40">
                    “{featuredBook.quote}”
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neon/10 flex items-center justify-between">
                  <span className="text-xs text-paper-faint">Hand-numbered copies</span>
                  <Link
                    to="/books/$id"
                    params={{ id: featuredBook.id }}
                    className="text-xs uppercase tracking-[0.2em] text-neon inkline font-medium inline-flex items-center gap-1.5"
                  >
                    <span>Book Details &amp; Order</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            </div>
          </section>
        )}

        {/* TWO VOICES, ONE LAMP (Authors Spotlight) */}
        {poetCards.length > 0 && (
          <section className="border-t border-neon/15 bg-gradient-to-b from-ink-2 to-ink py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
              <div className="text-center mb-8 space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-neon">
                  The Writers
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-medium text-paper">
                  Two Voices, One Lamp
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {poetCards.map((poet, i) => (
                  <div
                    key={poet.id}
                    className={`rounded-xl border border-neon/15 bg-gradient-to-br ${
                      i === 0 ? "from-amber-950/40 to-ink-2" : "from-teal-950/40 to-ink-2"
                    } p-6 space-y-3 shadow-md`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-neon/10 border border-neon/30 flex items-center justify-center shrink-0">
                        <Feather className="h-4 w-4 text-neon" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl text-paper font-medium">
                          {poet.primaryPenName}
                        </h3>
                        <p className="text-[11px] uppercase tracking-[0.15em] text-neon/80 font-medium">
                          {poet.role} · {poet.legalName}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-paper-dim leading-relaxed">{poet.bio}</p>
                    <div className="pt-2 flex justify-between items-center text-[11px] uppercase tracking-[0.14em]">
                      {poet.latestPublishedPoemTitle ? (
                        <span className="text-paper-faint">{poet.latestPublishedPoemTitle}</span>
                      ) : (
                        <span className="text-paper-faint" aria-hidden="true">
                          &nbsp;
                        </span>
                      )}
                      <Link to="/about" className="text-neon hover:underline font-medium">
                        Bio &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* JAMB & WAEC STUDY HALL */}
        <section className="border-t border-emerald-500/20 bg-gradient-to-b from-ink via-emerald-950/20 to-ink py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                <span>🎓</span>
                <span>JAMB &amp; WAEC Study Hall</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-paper">
                Literature-in-English{" "}
                <span className="italic font-light text-emerald-300">Companion</span>
              </h2>
              <p className="text-sm text-paper-dim leading-relaxed max-w-xl">
                Curated syllabus poetry breakdowns, drama summaries, and exam-tested literary device
                guides.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/study"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#10B981] text-[#062419] px-5 py-2.5 text-xs font-bold tracking-wider shadow-md hover:bg-emerald-400 transition-all"
              >
                <span>🎓</span>
                <span>Open Study Room</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/request"
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/50 bg-emerald-500/10 text-emerald-200 px-4 py-2.5 text-xs font-semibold tracking-wider hover:bg-emerald-500/20 transition-all"
              >
                <span>Request Guide</span>
              </Link>
            </div>
          </div>
        </section>

        {/* CALL FOR SUBMISSIONS BANNER */}
        <section className="border-t border-neon/10 py-16 bg-gradient-to-b from-ink to-ink-2">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10 text-center">
            <div className="mx-auto max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-neon">
                <Feather className="h-3 w-3" />
                <span>Call for Writers</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-medium text-paper">
                Do You Write by Lamplight?
              </h2>
              <p className="text-sm sm:text-base text-paper-dim leading-relaxed max-w-xl mx-auto">
                We welcome submissions of standalone poems, chapbook suites, and craft essays from
                poets and writers worldwide.
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <Link
                  to="/submit"
                  className="inline-flex items-center gap-2 rounded bg-neon px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-ink hover:bg-neon/90 transition-all"
                >
                  <span>Submit Your Manuscript</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded border border-neon/30 px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-paper hover:bg-neon/10 transition-all"
                >
                  <span>About Our Press</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

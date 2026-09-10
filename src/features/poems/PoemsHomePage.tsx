import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookMarked,
  BookOpen,
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
import { CHAPBOOKS, POEMS } from "@/data/literature";
import { useSwipeSlider } from "@/hooks/useSwipeSlider";

export function Index() {
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

  const activePoem = (POEMS[poemIndex % POEMS.length] ?? POEMS[0])!;
  const featuredPoem = (POEMS.find((p) => p.featured) ?? POEMS[0])!;
  const featuredBook = CHAPBOOKS[0]!;

  const handleShuffleVerse = () => {
    setPoemIndex((prev) => (prev + 1) % POEMS.length);
  };

  const handleCopyVerse = () => {
    const lines = activePoem.stanzas[0]?.slice(0, 3) ?? [];
    const text = `"${lines.join("\n")}"\n— ${activePoem.author}, ${activePoem.title}\n(via Muse Books)`;
    navigator.clipboard.writeText(text);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const portals = [
    {
      title: "Library Archive",
      desc: "An open archive of poems, prose poetry, epistles, and literary works.",
      to: "/library",
      count: `${POEMS.length} works`,
      icon: BookOpen,
      action: "Browse archive",
      badge: "Poems & prose",
    },
    {
      title: "Collections",
      desc: "Curated suites and seasonal anthologies charting inner and outer weather.",
      to: "/collections",
      count: "4 Volumes",
      icon: Layers,
      action: "Explore suites",
      badge: "Curated suites",
    },
    {
      title: "Hand-Bound Chapbooks",
      desc: "Limited letterpress editions printed on mould-made rag paper using metal type.",
      to: "/books",
      count: "Albion Press",
      icon: BookMarked,
      action: "View editions",
      badge: "Numbered printings",
    },
    {
      title: "The Press & Poets",
      desc: "The story of Irshand and InkbyNur, the voices behind our shared lamp and literary studio.",
      to: "/about",
      count: "Edinburgh & Stockholm",
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
                  Muse Books
                </h1>

                <p className="reveal d2 mt-6 font-display text-2xl lg:text-3xl text-paper-dim italic max-w-[28ch] leading-snug">
                  “We do not write to be found. We write to leave the light on.”
                </p>

                {/* Continuous Reel Indicator */}
              </div>

              <div className="col-span-4 flex justify-end">
                <div className="reveal d3 flex flex-col items-end gap-3">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-ink-2 px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-paper hover:border-neon hover:bg-neon/10 transition-all"
                    onClick={handleShuffleVerse}
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Shuffle verse</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyVerse}
                    className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-ink-2 px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-paper hover:border-neon hover:bg-neon/10 transition-all"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>{copiedSnippet ? "Copied" : "Copy a line"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED POEM / ARCHIVE / CHAPBOOKS PORTALS */}
        <section className="bg-ink py-16">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(540px,1.4fr)_minmax(320px,0.9fr)] gap-10">
              {/* FEATURED POEM */}
              <article className="rounded-[2rem] border border-neon/20 bg-ink-2 px-8 py-8 lg:px-12 lg:py-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-neon/80">
                    Featured poem
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.24em] text-paper-faint">
                    {featuredPoem.author}
                  </span>
                </div>

                <div className="mt-8 border-b border-neon/10 pb-8">
                  <p className="font-display text-3xl lg:text-4xl text-paper italic leading-relaxed">
                    “{featuredPoem.stanzas[0]?.[0] ?? ""}”
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="rounded-2xl border border-neon/10 bg-ink/30 p-4">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-paper-faint">
                      Collection
                    </span>
                    <p className="font-display text-xl text-paper mt-2">
                      {featuredPoem.collection}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-neon/10 bg-ink/30 p-4">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-paper-faint">
                      Issue
                    </span>
                    <p className="font-display text-xl text-paper mt-2">{featuredPoem.year}</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    to="/library/$id"
                    params={{ id: featuredPoem.id }}
                    className="inline-flex items-center gap-2 rounded-full bg-neon px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-ink hover:bg-neon/90 transition"
                  >
                    <BookOpen className="h-4 w-4" />
                    Read poem
                  </Link>
                  <Link
                    to="/library"
                    className="inline-flex items-center gap-2 rounded-full border border-neon/20 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-paper hover:border-neon hover:bg-neon/10 transition"
                  >
                    Browse archive
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>

              {/* ACTIVE POEM / AUTHORS / FEATURED BOOK */}
              <aside className="space-y-6">
                <div className="rounded-[2rem] border border-neon/15 bg-ink-2 p-7">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-neon">
                      Current verse
                    </span>
                    <button
                      type="button"
                      onClick={handleShuffleVerse}
                      className="text-paper-faint hover:text-neon transition"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-6">
                    <p className="font-display italic text-2xl text-paper leading-relaxed">
                      “{activePoem.title}”
                    </p>
                    <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-paper-dim">
                      by {activePoem.author}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-neon/10 pt-4">
                    <div className="grid grid-cols-2 gap-2">
                      {activePoem.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-neon/10 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-paper-faint text-center"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-neon/15 bg-ink-2 p-7">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-neon">
                      Letterpress
                    </span>
                    <Sparkles className="h-4 w-4 text-neon" />
                  </div>

                  <div className="mt-5">
                    <p className="font-display text-2xl text-paper italic">{featuredBook.title}</p>
                    <p className="mt-3 text-xs text-paper-dim leading-relaxed">
                      {featuredBook.edition}
                    </p>
                  </div>

                  <Link
                    to="/books/$id"
                    params={{ id: featuredBook.id }}
                    className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-neon hover:text-paper transition"
                  >
                    <BookMarked className="h-4 w-4" />
                    View chapbook
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* PORTALS GRID */}
        <section className="py-16 bg-ink">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-neon/80">
                  The Press Rooms
                </p>
                <h2 className="font-display text-3xl lg:text-4xl text-paper mt-2">
                  Browse the archive
                </h2>
              </div>
              <div className="hidden md:block">
                <Quote className="h-8 w-8 text-paper-faint" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
              {portals.map((portal) => {
                const Icon = portal.icon;
                return (
                  <Link
                    key={portal.title}
                    to={portal.to}
                    className="group rounded-2xl border border-neon/15 bg-ink-2 p-6 transition-all hover:border-neon/50 hover:bg-ink-3 hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded-full border border-neon/20 px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-neon">
                        {portal.badge}
                      </span>
                      <Icon className="h-4 w-4 text-paper-faint group-hover:text-neon transition" />
                    </div>
                    <div className="mt-8">
                      <p className="font-display text-xl text-paper group-hover:text-neon transition">
                        {portal.title}
                      </p>
                      <p className="mt-3 text-[11px] leading-relaxed text-paper-dim">
                        {portal.desc}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center justify-between border-t border-neon/10 pt-4">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-paper-faint">
                        {portal.count}
                      </span>
                      <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-neon">
                        {portal.action}
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* FEATURE CTA */}
        <section className="py-16 border-t border-neon/10 bg-ink">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
            <div className="rounded-[2rem] border border-neon/20 bg-ink-2 p-10 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.28em] text-neon">
                    Open the reading room
                  </span>
                  <h2 className="font-display text-4xl lg:text-5xl text-paper mt-4">
                    Begin with a single line.
                  </h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/library"
                    className="inline-flex items-center gap-2 rounded-full bg-neon px-6 py-3 text-xs uppercase tracking-[0.22em] font-medium text-ink hover:bg-neon/90 transition"
                  >
                    <BookOpen className="h-4 w-4" />
                    Enter library
                  </Link>
                  <Link
                    to="/submit"
                    className="inline-flex items-center gap-2 rounded-full border border-neon/20 px-6 py-3 text-xs uppercase tracking-[0.22em] text-paper hover:border-neon hover:bg-neon/10 transition"
                  >
                    <Feather className="h-4 w-4" />
                    Submit work
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

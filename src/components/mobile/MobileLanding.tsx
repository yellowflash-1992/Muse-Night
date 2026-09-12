import { Link } from "@tanstack/react-router";
import { ArrowRight, Feather, Quote, Send, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { CHAPBOOKS, COLLECTIONS, POEMS, POETS } from "@/data/literature";
import { useSwipeSlider } from "@/hooks/useSwipeSlider";

const heroLines = [
  "Words that breathe.",
  "Stories that linger.",
  "Verses that remember you.",
  "Written by lamplight.",
];

export function MobileLanding() {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "erasing">("typing");
  const [isPaused, setIsPaused] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const swipeHandlers = useSwipeSlider(heroRef);

  // 4 Alternating background panels + 1 cloned first panel for seamless looping
  const panels = [
    {
      id: "muse-night-image-1",
      type: "image",
      src: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1920&q=80",
      overlay: "bg-black/50 dark:bg-black/50 light:bg-[#f7f5f1]/40",
      title: "Night Study",
    },
    {
      id: "net-grid-1",
      type: "grid",
      overlay: "bg-gradient-to-b from-ink/20 via-ink/40 to-ink/65",
      title: "Letterpress Net Grid",
    },
    {
      id: "muse-night-image-2",
      type: "image",
      src: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1920&q=80",
      overlay: "bg-black/55 dark:bg-black/55 light:bg-[#f7f5f1]/40",
      title: "Nocturnal Paper",
    },
    {
      id: "net-grid-2",
      type: "grid",
      overlay: "bg-gradient-to-b from-ink/20 via-ink/40 to-ink/65",
      title: "Letterpress Blueprint",
    },
    // Clone of Item 1 for seamless infinite step transition
    {
      id: "muse-night-image-1-clone",
      type: "image",
      src: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1920&q=80",
      overlay: "bg-black/50 dark:bg-black/50 light:bg-[#f7f5f1]/40",
      title: "Night Study Clone",
      isClone: true,
    },
  ];

  useEffect(() => {
    const current = (heroLines[lineIndex] ?? heroLines[0])!;

    if (phase === "typing") {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 45);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("holding"), 1800);
        return () => clearTimeout(t);
      }
    }

    if (phase === "holding") {
      const t = setTimeout(() => setPhase("erasing"), 200);
      return () => clearTimeout(t);
    }

    if (phase === "erasing") {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 25);
        return () => clearTimeout(t);
      } else {
        setLineIndex((prev) => (prev + 1) % heroLines.length);
        setPhase("typing");
      }
    }

    return undefined;
  }, [displayed, phase, lineIndex]);

  const coverThemes = [
    {
      gradient: "from-amber-950 via-orange-950 to-stone-900",
      accent: "text-amber-300",
      dot: "bg-amber-400",
      glow: "shadow-amber-950/50",
      border: "border-amber-700/30",
    },
    {
      gradient: "from-teal-950 via-cyan-950 to-stone-900",
      accent: "text-teal-300",
      dot: "bg-teal-400",
      glow: "shadow-teal-950/50",
      border: "border-teal-700/30",
    },
    {
      gradient: "from-rose-950 via-pink-950 to-stone-900",
      accent: "text-rose-300",
      dot: "bg-rose-400",
      glow: "shadow-rose-950/50",
      border: "border-rose-700/30",
    },
    {
      gradient: "from-indigo-950 via-slate-900 to-stone-900",
      accent: "text-indigo-300",
      dot: "bg-indigo-400",
      glow: "shadow-indigo-950/50",
      border: "border-indigo-700/30",
    },
  ];

  const testimonials = [
    {
      quote:
        "The silence between words is where the poem lives. I am always writing toward that silence.",
      author: "Elara Voss",
      work: "Cartographies of Grief",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      rotation: "-rotate-2",
    },
    {
      quote:
        "To write about water is to write about everything that cannot be held — and everything we keep trying to hold anyway.",
      author: "Soren Adeyemi",
      work: "The Glass River",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      rotation: "rotate-1",
    },
    {
      quote:
        "I never know a poem is finished. I only know when I have stopped being able to change it for the better.",
      author: "Elara Voss",
      work: "On Craft",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      rotation: "-rotate-1",
    },
    {
      quote:
        "Memory is the first editor. It cuts what we cannot bear and keeps what we cannot release.",
      author: "Soren Adeyemi",
      work: "A Museum of Unfinished Things",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      rotation: "rotate-2",
    },
    {
      quote:
        "Language is the oldest technology. We forget that every word was once invented — by someone desperate to be understood.",
      author: "Elara Voss",
      work: "The Weight of Dusk",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      rotation: "-rotate-3",
    },
  ];

  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollAmount = 460;

  const updateSliderButtons = () => {
    const el = sliderRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(Math.ceil(el.scrollLeft + el.clientWidth) < el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    // On mount, scroll to Card 2 so Card 1 is partially sunk off the left screen
    const firstCard = el.children[0] as HTMLElement;
    if (firstCard) {
      const gap = 20; // Matches `gap-5` (1.25rem = 20px)
      const cardWidth = firstCard.offsetWidth + gap;
      const scrollPadding = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
      el.scrollLeft = cardWidth - scrollPadding;
    }

    updateSliderButtons();

    el.addEventListener("scroll", updateSliderButtons);
    window.addEventListener("resize", updateSliderButtons);
    return () => {
      el.removeEventListener("scroll", updateSliderButtons);
      window.removeEventListener("resize", updateSliderButtons);
    };
  }, []);

  return (
    <div className="block md:hidden bg-ink font-karla text-paper selection:bg-neon selection:text-ink pt-20">
      {/* MUSE NIGHT HERO CONTAINER WITH STEP-BY-STEP SEAMLESS SLIDER BACKGROUND */}
      <section
        ref={heroRef}
        onTouchStart={(e) => {
          swipeHandlers.onTouchStart(e);
          setIsPaused(true);
        }}
        onTouchEnd={(e) => {
          swipeHandlers.onTouchEnd(e);
          setIsPaused(false);
        }}
        onTouchCancel={() => setIsPaused(false)}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className={`hero-slider-container relative min-h-[82vh] flex flex-col justify-between p-4 sm:p-6 overflow-hidden isolate ${
          isPaused ? "is-paused" : ""
        }`}
      >
        {/* STEP-BY-STEP SLIDER TRACK (Item 1 -> Item 2 -> Item 3 -> Item 4 -> Seamless Clone Item 1) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-ink">
          <div className="step-slider-track">
            {panels.map((panel, idx) => (
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
                  /* Main Net / Grid Background */
                  <div className="absolute inset-0 bg-ink">
                    <div className="absolute inset-0 gridbg opacity-95" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-neon/15 rounded-full blur-3xl pointer-events-none" />
                  </div>
                )}
                {/* Dark atmospheric overlay */}
                <div className={`absolute inset-0 ${panel.overlay}`} />
              </div>
            ))}
          </div>
        </div>

        {/* MAIN HERO CONTENT */}
        <main className="w-full max-w-7xl mx-auto px-2 sm:px-4 pt-4 relative z-10">
          {/* Animated Typewriter Tagline */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm px-3.5 py-1 text-xs font-medium text-[#fef08a] shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#fef08a] animate-pulse" />
            <span>{displayed}</span>
            <span className="inline-block h-3.5 w-0.5 animate-pulse bg-[#fef08a] align-middle" />
          </div>

          <h1 className="font-josefin font-bold text-white leading-[1.1] text-[clamp(2.4rem,8vw,4.5rem)] text-balance">
            Websites that turn words into{" "}
            <span className="text-[#fef08a] italic font-normal drop-shadow-sm">worlds</span>
          </h1>

          <p className="mt-3 font-karla text-sm text-stone-200 leading-relaxed max-w-md text-pretty">
            A small lamplit press for poetry, hand-bound chapbooks, and literature from{" "}
            <span className="font-medium text-neon">Irshand</span> &amp;{" "}
            <span className="font-medium text-neon">InkbyNur</span>.
          </p>

          {/* Quick Category Chips / CTA Buttons */}
          <div className="flex flex-col items-start mt-4 space-y-4">
            {/* Primary Action Buttons Row - side-by-side responsively on all mobile screens */}
            <div className="flex items-center gap-2.5 sm:gap-3 w-full max-w-sm">
              {/* Primary CTA Button: READ LIBRARY */}
              <Link
                to="/library"
                className="flex-1 min-w-0 inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-[22px] bg-[#E8763B] text-[#2a1408] px-2 sm:px-4 py-3 text-[11.5px] sm:text-[13px] font-bold tracking-[0.2px] sm:tracking-[0.4px] shadow-[0_4px_16px_rgba(232,118,59,0.35)] hover:brightness-105 active:scale-95 transition-all whitespace-nowrap light:border light:border-[#F0DE38] light:shadow-none"
              >
                <span className="shrink-0">📖</span>
                <span className="truncate">READ LIBRARY</span>
              </Link>

              {/* Classroom Button with fancy JAMB badge for mobile */}
              <div className="relative flex-1 min-w-0 inline-flex">
                <a
                  href="#jamb-waec"
                  className="w-full inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-[22px] bg-[#10B981] text-[#062419] px-3 sm:px-5 py-3 text-[11.5px] sm:text-[13px] font-bold tracking-[0.2px] sm:tracking-[0.4px] shadow-[0_4px_16px_rgba(16,185,129,0.35)] hover:brightness-105 active:scale-95 transition-all whitespace-nowrap"
                >
                  <span className="shrink-0">🎓</span>
                  <span className="truncate">CLASSROOM</span>
                </a>
                <span className="absolute -top-2.5 -right-1 pointer-events-none inline-flex items-center rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 px-1.5 sm:px-2 py-0.5 text-[8.5px] sm:text-[9px] font-black uppercase tracking-wider text-[#241407] shadow-md border border-white/70 animate-pulse">
                  JAMB/WAEC
                </span>
              </div>
            </div>

            {/* Secondary Links Row - Specific to hero */}
            <div className="hero-secondary-links flex items-center gap-4 flex-wrap text-xs">
              <Link
                to="/collections"
                className="text-[#c9bcae] hover:text-white underline underline-offset-[3px] transition-colors"
              >
                Collections
              </Link>
              <Link
                to="/books"
                className="text-[#c9bcae] hover:text-white underline underline-offset-[3px] transition-colors"
              >
                Chapbooks
              </Link>
              <Link
                to="/mood"
                className="text-[#c9bcae] hover:text-white underline underline-offset-[3px] transition-colors"
              >
                Muse
              </Link>
            </div>

            {/* Muse for your Mood CTA Button */}
            <Link
              to="/mood"
              className="inline-flex items-center gap-2 rounded-[20px] border border-[#F0DE38] text-[#F0DE38] px-4 py-2.5 text-xs font-bold shadow-[0_0_14px_rgba(240,222,56,0.5)] hover:bg-[#F0DE38]/10 active:scale-95 transition-all animate-golden-pulse mt-6 ml-15"
            >
              <span>✨</span>
              <span>A MUSE FOR YOUR MOOD</span>
            </Link>
          </div>
        </main>

        {/* FOOTER BADGE */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between text-xs z-10 ">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-neon animate-ping" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-stone-300 font-karla">
              Infinite Reel
            </span>
          </div>

          <div className="bg-white/95 text-[#1E2028] text-[11px] font-semibold px-3.5 py-1.5 rounded-full shadow-md backdrop-blur-sm font-karla">
            Hand-bound by lamplight
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-y border-neon/15 bg-ink-2/90 px-4 py-4">
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <Link to="/library" className="flex flex-col items-center">
            <span className="font-display text-lg font-medium text-neon">{POEMS.length}</span>
            <span className="text-[10px] uppercase tracking-[0.12em] text-paper-dim">Works</span>
          </Link>
          <Link to="/collections" className="flex flex-col items-center">
            <span className="font-display text-lg font-medium text-amber-300">
              {COLLECTIONS.length}
            </span>
            <span className="text-[10px] uppercase tracking-[0.12em] text-paper-dim">Suites</span>
          </Link>
          <Link to="/books" className="flex flex-col items-center">
            <span className="font-display text-lg font-medium text-rose-300">
              {CHAPBOOKS.length}
            </span>
            <span className="text-[10px] uppercase tracking-[0.12em] text-paper-dim">Books</span>
          </Link>
          <Link to="/about" className="flex flex-col items-center">
            <span className="font-display text-lg font-medium text-paper">2</span>
            <span className="text-[10px] uppercase tracking-[0.12em] text-paper-dim">Poets</span>
          </Link>
        </div>
      </section>

      {/* CURATED POETRY COVERS (PieceCard Style) */}
      <section id="library" className="px-5 py-12 space-y-6 scroll-mt-20">
        <div className="flex items-baseline justify-between border-b border-neon/10 pb-3">
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
            All {POEMS.length} &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          {POEMS.slice(0, 4).map((poem, index) => {
            const theme = (coverThemes[index % coverThemes.length] ?? coverThemes[0])!;
            return (
              <Link
                key={poem.id}
                to="/library/$id"
                params={{ id: poem.id }}
                className="group relative flex flex-col text-left active:scale-[0.98] transition-transform"
              >
                {/* Book Cover */}
                <div
                  className={`relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br ${theme.gradient} border ${theme.border} p-3.5 flex flex-col justify-between shadow-lg ${theme.glow}`}
                >
                  {/* Left Spine Line */}
                  <div className="absolute left-0 top-0 h-full w-1.5 bg-black/40" />

                  {/* Category Pill */}
                  <div className="flex items-center gap-1.5">
                    <div className={`h-1.5 w-1.5 rounded-full ${theme.dot}`} />
                    <span
                      className={`text-[9px] font-medium uppercase tracking-[0.18em] ${theme.accent}`}
                    >
                      {poem.collection.split(" ")[0]}
                    </span>
                  </div>

                  {/* Title & Author */}
                  <div>
                    <h3 className="font-display text-base font-medium leading-tight text-paper group-hover:text-neon transition-colors line-clamp-2">
                      {poem.title}
                    </h3>
                    <p className="mt-1 text-[10px] text-paper-dim/80 truncate">
                      {poem.author.split(" ")[0]} · {poem.readTime}
                    </p>
                  </div>

                  {/* Quick Read Badge */}
                  <div className="pt-1 flex justify-end">
                    <span className="text-[9px] uppercase tracking-[0.14em] text-neon font-medium bg-black/40 px-2 py-0.5 rounded-full border border-white/10">
                      Read
                    </span>
                  </div>
                </div>

                {/* Excerpt Snippet */}
                <p className="mt-2 text-[11px] text-paper-dim/90 font-serif italic line-clamp-2 leading-snug px-0.5">
                  “{poem.stanzas[0]?.[0]}”
                </p>
              </Link>
            );
          })}
        </div>
      </section>
      {/* TESTIMONIALS / VOICES FROM THE PAGE */}
      <section className="relative overflow-hidden border-y border-white/10 bg-[linear-gradient(145deg,var(--ink),var(--ink-2)_52%,var(--ink))]">
        <div className="pointer-events-none absolute -left-24 top-16 h-56 w-56 rounded-full bg-neon/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-8 h-64 w-64 rounded-full bg-rose/10 blur-3xl" />
        <div className="px-5 pt-12 pb-8">
          <div className="flex items-end justify-between mb-2">
            <div>
              <span className="text-neon text-[10px] font-bold tracking-[0.4em] uppercase block mb-3">
                // In Their Words
              </span>
              <h2 className="font-display text-[clamp(2rem,7vw,3.5rem)] font-semibold text-paper leading-[1.1]">
                Voices from
                <br />
                <span className="italic font-light text-paper-dim">the page</span>
              </h2>
            </div>

            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                onClick={() =>
                  sliderRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" })
                }
                disabled={!canScrollLeft}
                className="w-9 h-9 rounded-full border border-neon/30 flex items-center justify-center text-neon hover:border-neon hover:bg-neon/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous quote"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() =>
                  sliderRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" })
                }
                disabled={!canScrollRight}
                className="w-9 h-9 rounded-full bg-neon text-ink flex items-center justify-center hover:bg-amber-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next quote"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Subtle edge fades that do not clip card borders */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-ink to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-ink to-transparent" />

          {/* Ambient backlight under track so the intense glass blur pops dramatically */}
          <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 h-36 w-36 rounded-full bg-neon/20 blur-3xl" />
          <div className="pointer-events-none absolute top-1/2 right-1/4 -translate-y-1/2 h-40 w-40 rounded-full bg-rose/20 blur-3xl" />

          {/* CHANGE 1: Changed `px-5` to `pl-2 pr-5` and added `snap-x snap-mandatory scroll-pl-2` */}
          <div
            ref={sliderRef}
            className="flex gap-5 overflow-x-auto pl-2 pr-5 pt-8 pb-12 -my-4 snap-x snap-mandatory scroll-pl-[50px]"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((item, idx) => (
              /* CHANGE 2: Added `snap-start snap-always`. Card width/height untouched! */
              <article
                key={idx}
                className={`glass-card min-w-[calc(100vw-88px)] sm:min-w-[380px] max-w-[380px] p-4 shrink-0 snap-start snap-always ${item.rotation} transition-all duration-300 hover:scale-[1.02] hover:rotate-0 hover:z-10`}
              >
                <div className="font-display text-5xl text-accent/30 leading-none mb-2 select-none">
                  "
                </div>
                <p className="font-display italic text-foreground text-lg leading-relaxed mb-6">
                  {item.quote}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
                    <img
                      alt={item.author}
                      className="object-cover w-full h-full"
                      src={item.image}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.author}</p>
                    <p className="text-xs text-muted-foreground">{item.work}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* JAMB & WAEC STUDY HALL SECTION (Compact & Professional) */}
      <section
        id="jamb-waec"
        className="relative overflow-hidden border-t border-emerald-500/20 bg-gradient-to-b from-ink via-emerald-950/20 to-ink px-5 py-8 space-y-4 scroll-mt-20"
      >
        {/* Subtle decorative glow */}
        <div className="pointer-events-none absolute -right-16 top-0 h-44 w-44 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-44 w-44 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-2.5 max-w-sm mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300 shadow-sm">
            <span>🎓</span>
            <span>JAMB &amp; WAEC Study Hall</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-paper leading-tight">
            Literature-in-English{" "}
            <span className="italic font-light text-emerald-300">Companion</span>
          </h2>

          <p className="font-karla text-xs text-paper-dim leading-relaxed">
            Curated syllabus poetry breakdowns, drama summaries, and exam-tested literary device
            guides.
          </p>

          {/* Direct Study Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <Link
              to="/library"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#10B981] text-[#062419] px-4.5 py-2.5 text-xs font-bold tracking-wider shadow-md hover:bg-emerald-400 active:scale-95 transition-all"
            >
              <span>📖</span>
              <span>Study Archive</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to="/request"
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/50 bg-emerald-500/10 text-emerald-200 px-4 py-2.5 text-xs font-semibold tracking-wider hover:bg-emerald-500/20 active:scale-95 transition-all"
            >
              <span>Request Guide</span>
            </Link>
          </div>
        </div>
      </section>

      {/* TWO VOICES / AUTHORS SPOTLIGHT (From project/About.tsx) */}
      <section className="border-t border-neon/15 bg-gradient-to-b from-ink-2 to-ink px-5 py-12 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-neon">
            The Writers
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-medium text-paper">
            Two Voices, One Lamp
          </h2>
        </div>

        <div className="space-y-4">
          {Object.values(POETS).map((poet, i) => (
            <div
              key={poet.id}
              className={`rounded-xl border border-neon/15 bg-gradient-to-br ${
                i === 0 ? "from-amber-950/40 to-ink-2" : "from-teal-950/40 to-ink-2"
              } p-5 space-y-3 shadow-md`}
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-neon/10 border border-neon/30 flex items-center justify-center shrink-0">
                  <Feather className="h-4 w-4 text-neon" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-paper font-medium">{poet.penName}</h3>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-neon/80 font-medium">
                    {poet.role} · {poet.legalName}
                  </p>
                </div>
              </div>

              <p className="text-xs text-paper-dim leading-relaxed">{poet.bio}</p>

              <div className="pt-2 flex justify-between items-center text-[11px] uppercase tracking-[0.14em]">
                <span className="text-paper-faint">{poet.works[0] ?? ""}</span>
                <Link to="/about" className="text-neon hover:underline font-medium">
                  Bio &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Literary Quote */}
        <div className="p-4 rounded-xl border border-neon/10 bg-ink text-center space-y-2">
          <Quote className="h-4 w-4 text-neon mx-auto opacity-70" />
          <p className="font-display text-sm italic text-paper-dim leading-relaxed">
            “We do not write to be found. We write to leave the light on for whoever passes at
            midnight.”
          </p>
        </div>
      </section>

      {/* QUICK SUBMIT CALLOUT */}
      <section className="border-t border-neon/10 px-5 py-10 text-center space-y-4 bg-ink-2">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-neon">
          <Send className="h-3 w-3" />
          <span>Call for Poetry</span>
        </div>
        <h3 className="font-display text-2xl font-medium text-paper">Do You Write by Lamplight?</h3>
        <p className="text-xs text-paper-dim leading-relaxed max-w-xs mx-auto">
          We welcome standalone poems and chapbook manuscripts. No reading fees.
        </p>
        <Link
          to="/submit"
          className="inline-flex items-center gap-2 rounded-full bg-neon px-6 py-2.5 text-xs uppercase tracking-[0.18em] font-medium text-ink shadow-md active:scale-95 transition-all"
        >
          <span>Submit Your Work</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </section>
    </div>
  );
}

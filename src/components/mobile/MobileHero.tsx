import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useSwipeSlider } from "@/hooks/useSwipeSlider";
import { heroLines, panels } from "./mobileLandingData";

export function MobileHero() {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "erasing">("typing");
  const [isPaused, setIsPaused] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const swipeHandlers = useSwipeSlider(heroRef);

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

  return (
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
          <div className="hero-secondary-links flex items-center gap-4 flex-wrap text-xs ml-2">
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
  );
}

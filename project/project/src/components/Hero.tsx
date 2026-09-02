import { useEffect, useState } from "react";
import { Feather, BookOpen, PenTool } from "lucide-react";

const heroLines = ["Words that breathe.", "Stories that linger.", "Verses that remember you."];

export function Hero({ onNavigate }: { onNavigate: (section: string) => void }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "erasing">("typing");

  useEffect(() => {
    const current = heroLines[lineIndex];

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
  }, [displayed, phase, lineIndex]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-stone-950">
      {/* Ambient gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-10 h-[500px] w-[500px] rounded-full bg-amber-900/20 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-[600px] w-[600px] rounded-full bg-teal-900/15 blur-[140px]" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-900/10 blur-[100px]" />
      </div>

      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Logo mark */}
        <div className="mb-8 flex items-center gap-3 animate-[fadeIn_1s_ease-out]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-700/40 bg-amber-950/30">
            <Feather className="h-6 w-6 text-amber-400" />
          </div>
          <span className="font-serif text-2xl tracking-wide text-stone-200">Inkwell & Ash</span>
        </div>

        {/* Typewriter line */}
        <div className="mb-10 h-8 sm:h-10">
          <p className="font-serif text-xl text-amber-200/90 sm:text-2xl">
            {displayed}
            <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-amber-300 align-middle sm:h-6" />
          </p>
        </div>

        {/* Main heading */}
        <h1 className="max-w-4xl font-serif text-4xl leading-[1.15] text-stone-100 sm:text-6xl md:text-7xl animate-[fadeIn_1.2s_ease-out_0.3s_both]">
          A literary home for
          <br />
          <span className="italic text-amber-300">two voices</span> and the
          <br />
          stories they carry.
        </h1>

        <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-stone-400 animate-[fadeIn_1.2s_ease-out_0.6s_both]">
          Poetry, prose, and books by Elena Marsh and Theo Ashburn. Read, linger, and return — the
          page is always open.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row animate-[fadeIn_1.2s_ease-out_0.9s_both]">
          <button
            onClick={() => onNavigate("poetry")}
            className="group flex items-center justify-center gap-2 rounded-full bg-amber-700 px-7 py-3.5 text-sm font-medium text-stone-50 transition-all hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-900/40"
          >
            <Feather className="h-4 w-4 transition-transform group-hover:rotate-12" />
            Explore Poetry
          </button>
          <button
            onClick={() => onNavigate("prose")}
            className="group flex items-center justify-center gap-2 rounded-full border border-stone-700 px-7 py-3.5 text-sm font-medium text-stone-300 transition-all hover:border-stone-500 hover:bg-stone-900/50 hover:text-stone-100"
          >
            <PenTool className="h-4 w-4 transition-transform group-hover:rotate-12" />
            Read Prose
          </button>
          <button
            onClick={() => onNavigate("books")}
            className="group flex items-center justify-center gap-2 rounded-full border border-stone-700 px-7 py-3.5 text-sm font-medium text-stone-300 transition-all hover:border-stone-500 hover:bg-stone-900/50 hover:text-stone-100"
          >
            <BookOpen className="h-4 w-4 transition-transform group-hover:rotate-12" />
            Browse Books
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-[bounce_2s_ease-in-out_infinite]">
        <div className="flex h-10 w-6 justify-center rounded-full border border-stone-700 pt-2">
          <div className="h-2 w-1 rounded-full bg-stone-500" />
        </div>
      </div>
    </section>
  );
}

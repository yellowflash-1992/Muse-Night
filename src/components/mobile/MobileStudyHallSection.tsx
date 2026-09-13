import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function MobileStudyHallSection() {
  return (
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
            to="/study"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#10B981] text-[#062419] px-4.5 py-2.5 text-xs font-bold tracking-wider shadow-md hover:bg-emerald-400 active:scale-95 transition-all"
          >
            <span>🎓</span>
            <span>Open Study Room</span>
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
  );
}

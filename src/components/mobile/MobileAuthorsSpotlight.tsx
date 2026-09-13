import { Link } from "@tanstack/react-router";
import { Feather, Quote } from "lucide-react";

import { POETS } from "@/data/literature";

export function MobileAuthorsSpotlight() {
  return (
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
  );
}

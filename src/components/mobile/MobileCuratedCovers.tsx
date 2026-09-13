import { Link } from "@tanstack/react-router";

import { POEMS } from "@/data/literature";
import { coverThemes } from "./mobileLandingData";

export function MobileCuratedCovers() {
  return (
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
                    {poem.year.split(" ")[0]}
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
  );
}

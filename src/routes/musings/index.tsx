import { createFileRoute, Link } from "@tanstack/react-router";
import { Feather, ArrowRight, BookOpen, Sparkles, Clock } from "lucide-react";

import { MUSINGS } from "@/data/literature";

export const Route = createFileRoute("/musings/")({
  head: () => ({
    meta: [
      { title: "Musings & Essays on Literature — Muse Books" },
      {
        name: "description",
        content:
          "Reflections on poetry, the letterpress craft, and the quiet hours of writing by Adaeze Okafor and Theo Lindqvist.",
      },
    ],
  }),
  component: MusingsIndex,
});

function MusingsIndex() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-10">
        {/* Header */}
        <div className="border-b border-neon/10 pb-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-neon/80 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>The Literary Journal</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-medium text-paper">
            Musings &amp; Essays
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paper-dim max-w-[50ch] text-pretty">
            Essays on poetic craft, letterpress philosophy, and reflections written during the quiet
            intervals between poems.
          </p>
        </div>

        {/* Musings List */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MUSINGS.map((musing) => (
            <article
              key={musing.id}
              className="group rounded-xl border border-neon/15 bg-ink-2 p-6 sm:p-8 flex flex-col justify-between hover:border-neon/40 hover:-translate-y-1 transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-paper-faint uppercase tracking-[0.2em] mb-4">
                  <span className="text-neon/90 font-medium">{musing.category}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {musing.readTime}
                  </span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-medium text-paper leading-tight group-hover:text-neon transition-colors">
                  <Link to="/musings/$id" params={{ id: musing.id }}>
                    {musing.title}
                  </Link>
                </h2>

                <p className="mt-4 text-sm text-paper-dim leading-relaxed">{musing.excerpt}</p>
              </div>

              <div className="mt-8 pt-5 border-t border-neon/10 flex items-center justify-between">
                <div className="text-xs text-paper-faint">
                  <span>By {musing.author}</span>
                  <span className="block text-[10px] text-paper-faint mt-0.5">{musing.date}</span>
                </div>

                <Link
                  to="/musings/$id"
                  params={{ id: musing.id }}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-neon inkline font-medium"
                >
                  <span>Read Essay</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

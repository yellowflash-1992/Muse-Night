import { createFileRoute, Link } from "@tanstack/react-router";
import { BookMarked, ArrowRight, CheckCircle2, Sparkles, Feather } from "lucide-react";

import { CHAPBOOKS } from "@/data/literature";

export const Route = createFileRoute("/books/")({
  head: () => ({
    meta: [
      { title: "Hand-Bound Chapbooks — Muse Books" },
      {
        name: "description",
        content:
          "Hand-set metal type, mould-made rag paper, and Smyth-sewn bindings. Explore our limited letterpress chapbooks.",
      },
    ],
  }),
  component: ChapbooksIndex,
});

function ChapbooksIndex() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-10">
        {/* Header */}
        <div className="border-b border-neon/10 pb-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-neon/80 mb-3">
            <BookMarked className="h-3.5 w-3.5" />
            <span>The Letterpress Editions</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-medium text-paper">
            Hand-Bound Chapbooks
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paper-dim max-w-[52ch] text-pretty">
            Printed on an 1890s Albion press using hand-set lead type, 100% cotton rag paper, and
            traditional archival bindings.
          </p>
        </div>

        {/* Studio Specs Banner */}
        <div className="my-10 rounded-lg border border-neon/20 bg-ink-2/60 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-paper-dim">
          <div className="space-y-1">
            <p className="text-neon uppercase tracking-[0.2em] font-medium">Letterpress Printing</p>
            <p className="leading-relaxed">
              Set by hand in metal Bembo and Caslon type, impression pulled leaf by leaf.
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-neon uppercase tracking-[0.2em] font-medium">Archival Papers</p>
            <p className="leading-relaxed">
              Deckle-edged Zerkall and Hahnemühle cotton mould-made sheets.
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-neon uppercase tracking-[0.2em] font-medium">Hand-Sewn Bindings</p>
            <p className="leading-relaxed">
              Stitched using pure Irish linen thread and Japanese silk cord.
            </p>
          </div>
        </div>

        {/* Chapbooks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {CHAPBOOKS.map((book) => (
            <article
              key={book.id}
              className="group rounded-xl border border-neon/15 bg-ink-2 p-6 sm:p-8 flex flex-col justify-between hover:border-neon/40 transition-all"
            >
              <div>
                <Link to="/books/$id" params={{ id: book.id }}>
                  <div className="overflow-hidden rounded-lg bg-ink-3 aspect-[4/5] mb-6 border border-neon/10">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>

                <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-neon/80">
                  <span>{book.author}</span>
                  <span className="font-mono text-sm text-paper">{book.price}</span>
                </div>

                <h2 className="mt-2 font-display text-3xl sm:text-4xl font-medium text-paper group-hover:text-neon transition-colors">
                  <Link to="/books/$id" params={{ id: book.id }}>
                    {book.title}
                  </Link>
                </h2>

                <p className="mt-4 text-sm text-paper-dim italic">“{book.quote}”</p>

                {/* Specs list */}
                <div className="mt-6 pt-5 border-t border-neon/10 space-y-2 text-xs text-paper-dim">
                  <div className="flex justify-between">
                    <span className="text-paper-faint uppercase tracking-[0.16em]">Edition:</span>
                    <span>{book.edition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-paper-faint uppercase tracking-[0.16em]">Binding:</span>
                    <span className="truncate max-w-[24ch] text-right">{book.binding}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-paper-faint uppercase tracking-[0.16em]">Paper:</span>
                    <span className="truncate max-w-[24ch] text-right">{book.paper}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-neon/10 flex flex-wrap gap-4 items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs text-neon">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Limited copies available</span>
                </span>
                <Link
                  to="/books/$id"
                  params={{ id: book.id }}
                  className="inline-flex items-center gap-2 rounded bg-neon px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium text-ink hover:bg-neon/90 transition-all"
                >
                  <span>View Edition &amp; Order</span>
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

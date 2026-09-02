import { createFileRoute, Link } from "@tanstack/react-router";
import { BookMarked, ArrowRight, BookOpen, Layers } from "lucide-react";

import { COLLECTIONS } from "@/data/literature";

export const Route = createFileRoute("/collections/")({
  head: () => ({
    meta: [
      { title: "Poetry Collections — Muse Books" },
      {
        name: "description",
        content: "Explore our published poetry collections, suites, and collaborative anthologies.",
      },
    ],
  }),
  component: CollectionsIndex,
});

function CollectionsIndex() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-10">
        {/* Header */}
        <div className="border-b border-neon/10 pb-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-neon/80 mb-3">
            <Layers className="h-3.5 w-3.5" />
            <span>Anthologies &amp; Suites</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-medium text-paper">
            Poetry Collections
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paper-dim max-w-[50ch] text-pretty">
            Cohesive volumes of verse curated around distinct seasons, geographies, and spiritual
            atmospheres.
          </p>
        </div>

        {/* Collections list */}
        <div className="mt-12 space-y-12">
          {COLLECTIONS.map((collection, index) => (
            <article
              key={collection.id}
              className="rounded-xl border border-neon/15 bg-ink-2 p-6 sm:p-10 transition-all hover:border-neon/30 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center"
            >
              {/* Optional Cover image if present */}
              {collection.coverImage && (
                <div className="col-span-12 md:col-span-4 lg:col-span-3">
                  <Link to="/collections/$id" params={{ id: collection.id }}>
                    <div className="overflow-hidden rounded-lg bg-ink aspect-[4/5] shadow-lg group">
                      <img
                        src={collection.coverImage}
                        alt={collection.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </Link>
                </div>
              )}

              <div
                className={`col-span-12 ${
                  collection.coverImage ? "md:col-span-8 lg:col-span-9" : "col-span-12"
                } space-y-4`}
              >
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-paper-faint">
                  <span className="text-neon/90 font-medium">{collection.author}</span>
                  <span>·</span>
                  <span>{collection.year}</span>
                  <span>·</span>
                  <span>{collection.poemsCount} Works</span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl font-medium text-paper hover:text-neon transition-colors">
                  <Link to="/collections/$id" params={{ id: collection.id }}>
                    {collection.title}
                  </Link>
                </h2>

                <p className="font-display text-lg sm:text-xl text-paper-dim italic">
                  {collection.subtitle}
                </p>

                <p className="text-sm text-paper-dim leading-relaxed max-w-[65ch]">
                  {collection.description}
                </p>

                <div className="p-4 rounded-md bg-ink border-l-2 border-neon/40 text-xs sm:text-sm text-paper-dim italic">
                  “{collection.featuredQuote}”
                </div>

                <div className="pt-4 flex flex-wrap gap-4 items-center">
                  <Link
                    to="/collections/$id"
                    params={{ id: collection.id }}
                    className="inline-flex items-center gap-2 rounded bg-neon px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium text-ink hover:bg-neon/90 transition-all"
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>View Collection &amp; Contents</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

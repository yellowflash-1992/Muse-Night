import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BookOpen, Layers, Feather, Quote } from "lucide-react";

import { getCollectionById, POEMS, COLLECTIONS } from "@/data/literature";

export const Route = createFileRoute("/collections/$id")({
  head: ({ params }) => {
    const collection = getCollectionById(params.id);
    return {
      meta: [
        { title: `${collection ? collection.title : "Collection"} — Muse Books` },
        {
          name: "description",
          content: collection ? collection.description : "Poetry collection by Muse Books.",
        },
      ],
    };
  },
  component: CollectionDetail,
});

function CollectionDetail() {
  const { id } = Route.useParams();
  const collection = getCollectionById(id);

  if (!collection) {
    return (
      <div className="py-20 text-center mx-auto max-w-lg px-6">
        <h1 className="font-display text-4xl text-paper">Collection not found</h1>
        <p className="mt-3 text-paper-dim">The collection could not be located in our archives.</p>
        <div className="mt-6">
          <Link
            to="/collections"
            className="inline-flex items-center gap-2 rounded bg-neon px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Collections</span>
          </Link>
        </div>
      </div>
    );
  }

  // Get matching poems from POEMS dataset
  const includedPoems = POEMS.filter(
    (p) => p.collectionId === collection.id || collection.poemIds.includes(p.id),
  );

  return (
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-[1040px] px-6 sm:px-10">
        {/* Breadcrumb Back */}
        <div className="mb-8">
          <Link
            to="/collections"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-paper-dim hover:text-neon transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>All Collections</span>
          </Link>
        </div>

        {/* Collection Hero */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start border-b border-neon/10 pb-12">
          {collection.coverImage && (
            <div className="col-span-12 md:col-span-5 lg:col-span-4">
              <div className="overflow-hidden rounded-lg bg-ink-3 aspect-[4/5] shadow-2xl border border-neon/20">
                <img
                  src={collection.coverImage}
                  alt={collection.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}

          <div
            className={`col-span-12 ${
              collection.coverImage ? "md:col-span-7 lg:col-span-8" : "col-span-12"
            } space-y-4`}
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-neon/80">
              <Layers className="h-3.5 w-3.5" />
              <span>Volume Published {collection.year}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-medium text-paper">
              {collection.title}
            </h1>

            <p className="font-display text-xl sm:text-2xl text-paper-dim italic">
              {collection.subtitle}
            </p>

            <div className="text-xs uppercase tracking-[0.2em] text-paper-faint pt-1">
              Authored by{" "}
              <Link to="/about" className="text-paper underline hover:text-neon">
                {collection.author}
              </Link>
            </div>

            <p className="text-sm text-paper-dim leading-relaxed pt-2">{collection.description}</p>
          </div>
        </div>

        {/* Foreword section */}
        <div className="py-12 border-b border-neon/10 max-w-2xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-neon/80 mb-3">
            <Quote className="h-3.5 w-3.5" />
            <span>Author's Foreword</span>
          </div>
          <p className="font-display text-xl sm:text-2xl text-paper leading-relaxed italic">
            “{collection.foreword}”
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-paper-faint">
            — {collection.author}
          </p>
        </div>

        {/* Table of Contents / Poems inside */}
        <div className="py-12">
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-neon/80">Table of Contents</p>
              <h2 className="font-display text-3xl font-medium text-paper mt-1">
                Poems in this Collection
              </h2>
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-paper-faint">
              {includedPoems.length} Available to read
            </span>
          </div>

          <div className="divide-y divide-neon/10 border-y border-neon/10">
            {includedPoems.map((poem, idx) => (
              <div
                key={poem.id}
                className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-neon/5 px-3 rounded transition-colors"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-xs text-neon/70 tabular-nums">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl text-paper group-hover:text-neon transition-colors">
                      <Link to="/poems/$id" params={{ id: poem.id }}>
                        {poem.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-paper-faint mt-0.5">
                      {poem.linesCount} lines · {poem.readTime} read
                    </p>
                  </div>
                </div>

                <Link
                  to="/poems/$id"
                  params={{ id: poem.id }}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-neon inkline font-medium"
                >
                  <span>Read Poem</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Explore Other Collections */}
        <div className="pt-10 border-t border-neon/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/collections"
            className="text-xs uppercase tracking-[0.2em] text-paper-dim hover:text-paper"
          >
            &larr; View all collections
          </Link>
          <Link
            to="/books"
            className="text-xs uppercase tracking-[0.2em] text-neon hover:underline"
          >
            Browse physical chapbook editions &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

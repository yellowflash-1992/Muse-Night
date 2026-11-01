import { Link, getRouteApi, useParams } from "@tanstack/react-router";
import { ArrowLeft, Layers, Quote } from "lucide-react";

const routeApi = getRouteApi("/collections/$id");

export function CollectionDetailPage() {
  const { id } = useParams({ from: "/collections/$id" });
  const { collection } = routeApi.useLoaderData();

  if (!collection) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl text-paper mb-3">Collection not found</h1>
        <Link
          to="/collections"
          className="text-xs uppercase tracking-[0.2em] text-neon hover:underline"
        >
          &larr; Back to collections
        </Link>
      </div>
    );
  }

  const includedPoems = collection.poems;

  return (
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-[1040px] px-6 sm:px-10">
        <div className="mb-8">
          <Link
            to="/collections"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-paper-dim hover:text-neon transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>All Collections</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start border-b border-neon/10 pb-12">
          {collection.coverImage ? (
            <div className="col-span-12 md:col-span-5 lg:col-span-4">
              <div className="overflow-hidden rounded-xl border border-neon/15 aspect-[4/5] bg-ink-3 shadow-2xl">
                <img
                  src={collection.coverImage}
                  alt={collection.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="col-span-12 md:col-span-5 lg:col-span-4">
              <div className="rounded-xl border border-neon/15 aspect-[4/5] bg-gradient-to-br from-ink-3 via-ink-2 to-ink flex items-center justify-center relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.15),transparent_60%)]" />
                <span className="font-display text-5xl font-medium text-neon/60 relative z-10">
                  {collection.title.charAt(0).toUpperCase()}
                </span>
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
          </div>
        </div>

        <div className="py-12 border-b border-neon/10 max-w-2xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-neon/80 mb-3">
            <Quote className="h-3.5 w-3.5" />
            <span>Author's Foreword</span>
          </div>
          <p className="font-display text-xl sm:text-2xl text-paper leading-relaxed italic">
            &ldquo;{collection.foreword}&rdquo;
          </p>
        </div>

        <div className="py-12">
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-neon/80">Table of Contents</p>
              <h2 className="font-display text-3xl font-medium text-paper mt-1">
                Poems in this Collection
              </h2>
            </div>
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
                      <Link to="/library/$id" params={{ id: poem.id }} search={{ from: collection.poems?.map((p) => p.id).join(","), source: "collection", collectionId: collection.id }}>
                        {poem.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-paper-faint mt-0.5">
                      {poem.linesCount} lines &middot; {poem.readTime} read
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

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

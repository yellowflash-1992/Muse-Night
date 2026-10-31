import { Link, getRouteApi } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Layers } from "lucide-react";

const routeApi = getRouteApi("/collections/");

export function CollectionsIndexPage() {
  const { collections } = routeApi.useLoaderData();

  if (collections.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl text-paper mb-3">Poetry Collections</h1>
        <p className="text-sm text-paper-dim">No collections published yet. Check back soon.</p>
        <Link to="/library" className="mt-6 inline-block text-xs uppercase tracking-[0.2em] text-neon hover:underline">
          Browse the library &rarr;
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-10">
        <div className="border-b border-neon/10 pb-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-neon/80 mb-3">
            <Layers className="h-3.5 w-3.5" />
            <span>Anthologies &amp; Suites</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-medium text-paper">
            Poetry Collections
          </h1>
        </div>

        <div className="mt-12 space-y-12">
          {collections.map((collection) => (
            <article
              key={collection.id}
              className="rounded-xl border border-neon/15 bg-ink-2 p-6 sm:p-10 transition-all hover:border-neon/30 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center"
            >
              {collection.coverImage ? (
                <div className="col-span-12 md:col-span-4 lg:col-span-3">
                  <Link to="/collections/$id" params={{ id: collection.id }}>
                    <div className="overflow-hidden rounded-xl border border-neon/15 aspect-[4/5] bg-ink-3">
                      <img
                        src={collection.coverImage}
                        alt={collection.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="col-span-12 md:col-span-4 lg:col-span-3">
                  <Link to="/collections/$id" params={{ id: collection.id }}>
                    <div className="rounded-xl border border-neon/15 aspect-[4/5] bg-gradient-to-br from-ink-3 via-ink-2 to-ink flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.15),transparent_60%)]" />
                      <span className="font-display text-5xl font-medium text-neon/60 relative z-10">
                        {collection.title.charAt(0).toUpperCase()}
                      </span>
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
                  <span>&middot;</span>
                  <span>{collection.year}</span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl font-medium text-paper hover:text-neon transition-colors">
                  <Link to="/collections/$id" params={{ id: collection.id }}>
                    {collection.title}
                  </Link>
                </h2>

                {collection.featuredQuote && (
                  <div className="p-4 rounded-md bg-ink border-l-2 border-neon/40 text-xs sm:text-sm text-paper-dim italic">
                    &ldquo;{collection.featuredQuote}&rdquo;
                  </div>
                )}

                <div className="pt-4 flex flex-wrap gap-4 items-center">
                  <Link
                    to="/collections/$id"
                    params={{ id: collection.id }}
                    className="inline-flex items-center gap-2 rounded bg-neon px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium text-ink hover:bg-neon/90 transition-all"
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>View Collection</span>
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
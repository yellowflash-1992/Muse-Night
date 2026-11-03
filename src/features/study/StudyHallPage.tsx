import { Link, getRouteApi } from "@tanstack/react-router";
import { BookOpen, BookText, GraduationCap, Library, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

const routeApi = getRouteApi("/study/");
const filters = ["All", "JAMB", "WAEC", "Poetry", "Drama"] as const;
type GuideFilter = (typeof filters)[number];

export function StudyHallPage() {
  const { guides } = routeApi.useLoaderData();
  const [activeFilter, setActiveFilter] = useState<GuideFilter>("All");

  const filteredGuides = useMemo(
    () =>
      guides.filter((guide) => {
        if (activeFilter === "All") return true;
        if (activeFilter === "JAMB" || activeFilter === "WAEC") {
          return guide.examBody === activeFilter || guide.examBody === "BOTH";
        }
        return guide.genre.toLowerCase() === activeFilter.toLowerCase();
      }),
    [activeFilter, guides],
  );

  return (
    <main className="min-h-screen bg-ink px-4 pb-20 pt-24 text-paper selection:bg-neon selection:text-ink sm:px-6">
      <div className="mx-auto max-w-7xl space-y-10 sm:space-y-14">
        <header className="relative overflow-hidden rounded-3xl border border-neon/20 bg-gradient-to-br from-emerald-950/50 via-ink-2 to-ink p-7 shadow-2xl sm:p-12">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
          <div className="relative max-w-3xl space-y-5">
            <p className="inline-flex items-center gap-2 font-karla text-sm font-medium text-emerald-300">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
              Literature-in-English preparation
            </p>
            <h1 className="font-display text-5xl font-semibold leading-tight sm:text-6xl">
              Study Hall
            </h1>
            <p className="max-w-2xl font-karla text-base leading-relaxed text-paper-dim sm:text-lg">
              Carefully prepared guides for close reading, literary analysis, and exam preparation.
              Explore published notes by exam body or genre.
            </p>
          </div>
        </header>

        <section aria-labelledby="guides-heading" className="space-y-6">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="space-y-1">
              <h2 id="guides-heading" className="font-display text-3xl font-semibold sm:text-4xl">
                Study guides
              </h2>
              <p className="font-karla text-sm text-paper-dim">
                {filteredGuides.length} published{" "}
                {filteredGuides.length === 1 ? "guide" : "guides"}
              </p>
            </div>
            <nav aria-label="Filter study guides" className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`min-h-10 rounded-full border px-4 py-2 font-karla text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon ${
                    activeFilter === filter
                      ? "border-neon bg-neon/10 font-semibold text-neon"
                      : "border-neon/20 bg-ink-2 text-paper-dim hover:border-neon/50 hover:text-paper"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </nav>
          </div>

          {filteredGuides.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neon/20 px-6 py-16 text-center">
              <BookOpen className="mx-auto h-8 w-8 text-paper-faint" aria-hidden="true" />
              <p className="mt-4 font-display text-xl text-paper">No guides in this section yet</p>
              <p className="mt-2 font-karla text-sm text-paper-dim">
                Try another filter or return to all published study guides.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {filteredGuides.map((guide) => (
                <article
                  key={guide.id}
                  className="flex flex-col rounded-2xl border border-neon/15 bg-ink-2 p-6 shadow-lg transition hover:border-neon/35"
                >
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-200">
                      <GraduationCap className="h-3 w-3" aria-hidden="true" />
                      {guide.examBody}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-neon/20 bg-neon/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-neon">
                      <Sparkles className="h-3 w-3" aria-hidden="true" />
                      {guide.genre}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold leading-snug text-paper">
                    {guide.title}
                  </h3>
                  <p className="mt-2 font-karla text-xs uppercase tracking-[0.14em] text-paper-faint">
                    By {guide.author}
                  </p>
                  <p className="mt-4 flex-1 whitespace-pre-wrap font-karla text-sm leading-relaxed text-paper-dim">
                    {guide.summary}
                  </p>
                  <Link
                    to="/study/$id"
                    params={{ id: guide.id }}
                    className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-neon/25 px-4 py-2.5 font-karla text-sm font-semibold text-paper transition hover:border-neon/50 hover:text-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon"
                  >
                    <BookText className="h-4 w-4" aria-hidden="true" />
                    Read Full Analysis
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-neon/15 pt-6 sm:flex-row sm:items-center">
          <p className="max-w-xl font-karla text-sm leading-relaxed text-paper-faint">
            Keep building your understanding through careful reading and thoughtful analysis.
          </p>
          <a
            href="/library"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-neon/25 px-4 py-2.5 font-karla text-sm font-semibold text-paper transition hover:border-neon/50 hover:text-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon"
          >
            <Library className="h-4 w-4" aria-hidden="true" />
            Visit the Library
          </a>
        </div>
      </div>
    </main>
  );
}

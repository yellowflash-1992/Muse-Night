import { Link, getRouteApi } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, GraduationCap, Sparkles } from "lucide-react";

const routeApi = getRouteApi("/study/$id");

export function StudyGuideDetailPage() {
  const { guide } = routeApi.useLoaderData();

  if (!guide) {
    return (
      <main className="min-h-screen bg-ink px-4 pb-20 pt-24 text-paper selection:bg-neon selection:text-ink sm:px-6">
        <div className="mx-auto max-w-4xl py-16 text-center">
          <BookOpen className="mx-auto h-10 w-10 text-paper-faint" aria-hidden="true" />
          <h1 className="mt-4 font-display text-4xl text-paper">Guide not found</h1>
          <p className="mt-3 font-karla text-paper-dim">
            The study guide you are looking for is not published or does not exist.
          </p>
          <Link
            to="/study"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl border border-neon/25 px-4 py-2.5 font-karla text-sm font-semibold text-paper transition hover:border-neon/50 hover:text-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Return to Study Hall
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ink px-4 pb-20 pt-24 text-paper selection:bg-neon selection:text-ink sm:px-6">
      <article className="mx-auto max-w-4xl space-y-10 sm:space-y-12">
        <header className="space-y-6">
          <Link
            to="/study"
            className="inline-flex items-center gap-2 font-karla text-sm font-semibold text-paper-dim transition hover:text-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Study Hall
          </Link>

          <div className="space-y-5">
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
            <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
              {guide.title}
            </h1>
            <p className="font-karla text-sm uppercase tracking-[0.14em] text-paper-faint">
              By {guide.author}
            </p>
          </div>
        </header>

        <section aria-labelledby="introduction-heading" className="space-y-3">
          <h2
            id="introduction-heading"
            className="font-display text-2xl font-semibold text-paper sm:text-3xl"
          >
            Introduction
          </h2>
          <p className="whitespace-pre-wrap font-karla text-base leading-relaxed text-paper-dim">
            {guide.summary}
          </p>
        </section>

        <section aria-labelledby="background-heading" className="space-y-3">
          <h2
            id="background-heading"
            className="font-display text-2xl font-semibold text-paper sm:text-3xl"
          >
            Background of the Text
          </h2>
          {guide.background ? (
            <p className="whitespace-pre-wrap font-karla text-base leading-relaxed text-paper-dim">
              {guide.background}
            </p>
          ) : (
            <p className="font-karla text-sm text-paper-faint">
              No background notes have been added to this guide yet.
            </p>
          )}
        </section>

        <section aria-labelledby="analysis-heading" className="space-y-3">
          <h2
            id="analysis-heading"
            className="font-display text-2xl font-semibold text-paper sm:text-3xl"
          >
            Stanza-by-Stanza Analysis
          </h2>
          {guide.fullAnalysis ? (
            <p className="whitespace-pre-wrap font-karla text-base leading-relaxed text-paper-dim">
              {guide.fullAnalysis}
            </p>
          ) : (
            <p className="font-karla text-sm text-paper-faint">
              A detailed stanza-by-stanza analysis is not yet available for this guide.
            </p>
          )}
        </section>

        <section aria-labelledby="themes-heading" className="space-y-3">
          <h2
            id="themes-heading"
            className="font-display text-2xl font-semibold text-paper sm:text-3xl"
          >
            Themes
          </h2>
          {guide.themes.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {guide.themes.map((theme) => (
                <li
                  key={theme}
                  className="rounded-full border border-neon/20 bg-neon/5 px-3 py-1.5 font-karla text-sm text-paper-dim"
                >
                  {theme}
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-karla text-sm text-paper-faint">
              No themes have been added to this guide.
            </p>
          )}
        </section>

        <section aria-labelledby="devices-heading" className="space-y-3">
          <h2
            id="devices-heading"
            className="font-display text-2xl font-semibold text-paper sm:text-3xl"
          >
            Poetic Devices
          </h2>
          {guide.devices.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {guide.devices.map((device) => (
                <li
                  key={device}
                  className="rounded-full border border-neon/20 bg-neon/5 px-3 py-1.5 font-karla text-sm text-paper-dim"
                >
                  {device}
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-karla text-sm text-paper-faint">
              No poetic devices have been added to this guide.
            </p>
          )}
        </section>
      </article>
    </main>
  );
}

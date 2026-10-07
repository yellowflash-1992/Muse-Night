import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bookmark,
  ExternalLink,
  Feather,
  FileText,
  GraduationCap,
  Library,
  Lightbulb,
  Sparkles,
  Theater,
} from "lucide-react";
import { useState } from "react";

import { LIBRARY_POEMS } from "@/data/literature";

type ExamRoom = "jamb" | "waec";

const studyAreas = [
  {
    id: "study-materials",
    title: "Study Materials",
    description: "Clear guides to help you build your Literature-in-English foundations.",
    icon: BookOpen,
  },
  {
    id: "poetry",
    title: "Poetry",
    description: "Read poems closely and explore how meaning takes shape, line by line.",
    icon: Feather,
  },
  {
    id: "drama",
    title: "Drama",
    description: "Explore plays, characters, dialogue and what happens on stage.",
    icon: Theater,
  },
  {
    id: "prose",
    title: "Prose",
    description: "Make sense of stories, narrators, characters and the worlds they inhabit.",
    icon: FileText,
  },
  {
    id: "themes",
    title: "Themes & Literary Ideas",
    description: "Follow the questions and ideas that connect a literary work.",
    icon: Lightbulb,
  },
  {
    id: "literary-devices",
    title: "Literary Devices",
    description: "Notice the choices writers make with language, sound and form.",
    icon: Sparkles,
  },
  {
    id: "authors",
    title: "Authors & Context",
    description: "Discover the people, places and moments surrounding a work.",
    icon: Bookmark,
  },
  {
    id: "practice",
    title: "Practice",
    description: "Check your understanding with thoughtful practice activities.",
    icon: GraduationCap,
  },
];

const poetryPath = [
  "Read the poem",
  "Understand the context",
  "Identify themes",
  "Study literary devices",
  "Examine imagery, tone & structure",
  "Think about the poet's ideas",
  "Test your understanding",
];

const examRooms = {
  jamb: {
    name: "JAMB",
    officialName: "Joint Admissions and Matriculation Board",
    url: "https://www.jamb.gov.ng/",
  },
  waec: {
    name: "WAEC",
    officialName: "West African Examinations Council",
    url: "https://www.waecnigeria.org/",
  },
} as const;

export function StudyHallPage() {
  const [activeRoom, setActiveRoom] = useState<ExamRoom | null>(null);

  if (!activeRoom) {
    return (
      <div className="min-h-screen bg-ink px-4 pb-20 pt-24 text-paper selection:bg-neon selection:text-ink sm:px-6">
        <div className="mx-auto max-w-5xl space-y-10 sm:space-y-14">
          <header className="relative overflow-hidden rounded-3xl border border-neon/20 bg-gradient-to-br from-emerald-950/50 via-ink-2 to-ink p-7 shadow-2xl sm:p-12">
            <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
            <div className="relative max-w-2xl space-y-5">
              <div className="inline-flex items-center gap-2 text-sm font-medium text-emerald-300">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
                <span>Your quiet place to prepare</span>
              </div>
              <h1 className="font-display text-5xl font-semibold leading-tight text-paper sm:text-6xl">
                Study Hall
              </h1>
              <p className="max-w-xl font-karla text-lg leading-relaxed text-paper-dim sm:text-xl">
                Literature-in-English preparation for JAMB and WAEC.
              </p>
              <p className="font-karla text-sm leading-relaxed text-paper-faint sm:text-base">
                Choose the exam you are preparing for to enter your study room.
              </p>
            </div>
          </header>

          <section aria-labelledby="choose-exam-heading" className="space-y-5">
            <div className="space-y-1">
              <h2
                id="choose-exam-heading"
                className="font-display text-3xl font-semibold text-paper sm:text-4xl"
              >
                Choose your exam
              </h2>
              <p className="font-karla text-base text-paper-dim">
                Each room brings your literature study areas together.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              {(["jamb", "waec"] as const).map((room) => {
                const exam = examRooms[room];
                const isJamb = room === "jamb";

                return (
                  <button
                    key={room}
                    type="button"
                    onClick={() => setActiveRoom(room)}
                    className={`group flex min-h-52 w-full flex-col justify-between rounded-2xl border bg-ink-2 p-6 text-left transition hover:-translate-y-1 hover:bg-ink-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:min-h-60 sm:p-8 ${
                      isJamb
                        ? "border-emerald-400/30 hover:border-emerald-300/70"
                        : "border-amber-300/25 hover:border-amber-200/60"
                    }`}
                    aria-label={`Enter the ${exam.name} study room`}
                  >
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                        isJamb
                          ? "bg-emerald-400/10 text-emerald-300"
                          : "bg-amber-300/10 text-amber-200"
                      }`}
                    >
                      <BookOpen className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="mt-8 flex w-full items-end justify-between gap-3">
                      <span>
                        <span className="block font-display text-3xl font-semibold text-paper sm:text-4xl">
                          {exam.name} Room
                        </span>
                        <span className="mt-1 block font-karla text-sm text-paper-faint">
                          Literature-in-English
                        </span>
                      </span>
                      <ArrowRight
                        className="mb-1 h-5 w-5 shrink-0 text-paper-faint transition group-hover:translate-x-1 group-hover:text-neon"
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <div className="flex flex-col items-start justify-between gap-4 border-t border-neon/15 pt-6 sm:flex-row sm:items-center">
            <p className="max-w-xl font-karla text-sm leading-relaxed text-paper-faint">
              Start with the exam room that fits your plans. You can return here whenever you need
              to change rooms.
            </p>
            <Link
              to="/library"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-neon/25 px-4 py-2.5 font-karla text-sm font-semibold text-paper transition hover:border-neon/50 hover:text-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon"
            >
              <Library className="h-4 w-4" aria-hidden="true" />
              Visit the Library
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const exam = examRooms[activeRoom];
  const librarySelections = LIBRARY_POEMS.slice(0, 3);

  return (
    <div className="min-h-screen bg-ink px-4 pb-20 pt-24 text-paper selection:bg-neon selection:text-ink sm:px-6">
      <div className="mx-auto max-w-5xl space-y-10 sm:space-y-14">
        <header className="relative overflow-hidden rounded-3xl border border-neon/20 bg-gradient-to-br from-emerald-950/40 via-ink-2 to-ink p-6 shadow-2xl sm:p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl" />
          <div className="relative space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveRoom(null)}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-medium text-paper-dim transition hover:text-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Study Hall
              </button>
              <Link
                to="/library"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-medium text-paper-dim transition hover:text-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon"
              >
                <Library className="h-4 w-4" aria-hidden="true" />
                Library
              </Link>
            </div>

            <div className="max-w-2xl space-y-3">
              <p className="inline-flex items-center gap-2 font-karla text-sm font-medium text-emerald-300">
                <GraduationCap className="h-4 w-4" aria-hidden="true" />
                Literature-in-English preparation
              </p>
              <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
                {exam.name} Room
              </h1>
              <p className="font-karla text-base leading-relaxed text-paper-dim sm:text-lg">
                A calm place to read, understand and prepare. Choose a study area below, or begin
                with a poem in the Muse Night Library.
              </p>
            </div>
          </div>
        </header>

        <nav aria-label={`${exam.name} room sections`} className="flex flex-wrap gap-2">
          {[
            ["study-areas", "Study areas"],
            ["poetry-deep-dive", "Poetry deep dive"],
            ["library-reading", "Read in the Library"],
            ["syllabus-resources", "Syllabus & official resources"],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="inline-flex min-h-10 items-center rounded-full border border-neon/20 bg-ink-2 px-4 py-2 font-karla text-sm text-paper-dim transition hover:border-neon/50 hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon"
            >
              {label}
            </a>
          ))}
        </nav>

        <section
          id="study-areas"
          aria-labelledby="study-areas-heading"
          className="scroll-mt-8 space-y-5"
        >
          <div className="space-y-1">
            <h2
              id="study-areas-heading"
              className="font-display text-3xl font-semibold sm:text-4xl"
            >
              Choose a study area
            </h2>
            <p className="font-karla text-base text-paper-dim">
              These rooms are being prepared. No practice questions or syllabus guides are published
              here yet.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {studyAreas.map(({ id, title, description, icon: Icon }) => (
              <article
                key={id}
                id={id}
                className="scroll-mt-8 rounded-2xl border border-neon/15 bg-ink-2 p-5 transition hover:border-neon/35"
              >
                <Icon className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl font-semibold text-paper">{title}</h3>
                <p className="mt-2 font-karla text-sm leading-relaxed text-paper-dim">
                  {description}
                </p>
                <p className="mt-4 border-t border-neon/10 pt-3 font-karla text-xs font-medium text-paper-faint">
                  {title === "Practice"
                    ? "Practice questions will be added here."
                    : `${title} study guides are coming soon.`}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="poetry-deep-dive"
          aria-labelledby="poetry-deep-dive-heading"
          className="scroll-mt-8 overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-950/25 via-ink-2 to-ink p-6 sm:p-9"
        >
          <div className="max-w-2xl space-y-3">
            <p className="font-karla text-sm font-medium text-emerald-300">
              A future learning path
            </p>
            <h2
              id="poetry-deep-dive-heading"
              className="font-display text-3xl font-semibold sm:text-4xl"
            >
              Poetry, read more deeply
            </h2>
            <p className="font-karla text-base leading-relaxed text-paper-dim">
              The Poetry Deep Dive will help you move from reading a poem to thinking carefully
              about how and why it works.
            </p>
          </div>

          <ol className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {poetryPath.map((step, index) => (
              <li
                key={step}
                className="flex min-h-16 items-center gap-3 rounded-xl border border-neon/10 bg-ink/70 p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-400/10 font-karla text-sm font-semibold text-emerald-300">
                  {index + 1}
                </span>
                <span className="font-karla text-sm leading-snug text-paper">{step}</span>
              </li>
            ))}
          </ol>

          <p className="mt-5 font-karla text-sm text-paper-faint">
            Guided activities for this pathway will be added later. For now, begin by reading a poem
            in the Library.
          </p>
        </section>

        <section
          id="library-reading"
          aria-labelledby="library-reading-heading"
          className="scroll-mt-8 space-y-5"
        >
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div className="space-y-1">
              <p className="font-karla text-sm font-medium text-emerald-300">
                Read an actual Muse Night work
              </p>
              <h2
                id="library-reading-heading"
                className="font-display text-3xl font-semibold sm:text-4xl"
              >
                From exam prep to the poem
              </h2>
              <p className="font-karla text-base text-paper-dim">
                These are Library poems, not prescribed JAMB or WAEC texts.
              </p>
            </div>
            <Link
              to="/library"
              className="inline-flex min-h-11 items-center gap-2 self-start rounded-xl border border-neon/25 px-4 py-2.5 font-karla text-sm font-semibold text-paper transition hover:border-neon/50 hover:text-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon sm:self-auto"
            >
              <Library className="h-4 w-4" aria-hidden="true" />
              Browse the Library
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {librarySelections.map((poem) => (
              <article
                key={poem.id}
                className="flex min-w-0 flex-col rounded-2xl border border-neon/15 bg-ink-2 p-5"
              >
                <p className="font-karla text-xs text-paper-faint">{poem.collection}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-paper">
                  {poem.title}
                </h3>
                <p className="mt-1 font-karla text-sm text-paper-dim">By {poem.author}</p>
                <Link
                  to="/library/$id"
                  params={{ id: poem.id }}
                  className="mt-5 inline-flex min-h-11 items-center gap-2 self-start font-karla text-sm font-semibold text-neon hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon"
                >
                  Read this poem
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section
          id="syllabus-resources"
          aria-labelledby="syllabus-resources-heading"
          className="scroll-mt-8 rounded-3xl border border-neon/15 bg-ink-2 p-6 sm:p-9"
        >
          <div className="max-w-2xl space-y-2">
            <p className="font-karla text-sm font-medium text-amber-200">External resources</p>
            <h2
              id="syllabus-resources-heading"
              className="font-display text-3xl font-semibold sm:text-4xl"
            >
              Syllabus & texts
            </h2>
            <p className="font-karla text-base leading-relaxed text-paper-dim">
              Consult the relevant examination body's official website for current syllabus,
              prescribed-text and examination information. Verified Study Hall guides will be added
              here when available.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a
              href={exam.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-20 items-center justify-between gap-4 rounded-2xl border border-neon/15 bg-ink p-5 transition hover:border-neon/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon"
            >
              <span>
                <span className="block font-display text-xl font-semibold text-paper">
                  Official {exam.name} website
                </span>
                <span className="mt-1 block font-karla text-sm text-paper-faint">
                  {exam.officialName}
                </span>
              </span>
              <ExternalLink
                className="h-5 w-5 shrink-0 text-paper-faint transition group-hover:text-neon"
                aria-label="Opens in a new tab"
              />
            </a>
            <div className="flex min-h-20 items-center gap-4 rounded-2xl border border-dashed border-neon/20 p-5">
              <Bookmark className="h-5 w-5 shrink-0 text-paper-faint" aria-hidden="true" />
              <p className="font-karla text-sm leading-relaxed text-paper-faint">
                Exam-specific syllabus and text guides will appear here after they are verified.
              </p>
            </div>
          </div>
          <p className="mt-5 font-karla text-xs leading-relaxed text-paper-faint">
            External links lead to the examination body. Muse Night is an independent study space
            and is not affiliated with or endorsed by {exam.name}.
          </p>
        </section>

        <footer className="flex flex-col justify-between gap-4 border-t border-neon/15 pt-6 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => setActiveRoom(null)}
            className="inline-flex min-h-11 items-center gap-2 self-start rounded-lg px-2 font-karla text-sm font-medium text-paper-dim transition hover:text-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Study Hall
          </button>
          <Link
            to="/library"
            className="inline-flex min-h-11 items-center gap-2 self-start rounded-lg px-2 font-karla text-sm font-medium text-paper-dim transition hover:text-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon sm:self-auto"
          >
            <Library className="h-4 w-4" aria-hidden="true" />
            Visit the Library
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </footer>
      </div>
    </div>
  );
}

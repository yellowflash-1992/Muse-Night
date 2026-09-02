import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, Feather, Sparkles, BookOpen } from "lucide-react";

import { getMusingById, MUSINGS } from "@/data/literature";

export const Route = createFileRoute("/musings/$id")({
  head: ({ params }) => {
    const musing = getMusingById(params.id);
    return {
      meta: [
        { title: `${musing ? musing.title : "Musing"} — Muse Books` },
        {
          name: "description",
          content: musing ? musing.excerpt : "Literary essay by Muse Books.",
        },
      ],
    };
  },
  component: MusingDetail,
});

function MusingDetail() {
  const { id } = Route.useParams();
  const musing = getMusingById(id);

  if (!musing) {
    return (
      <div className="py-20 text-center mx-auto max-w-lg px-6">
        <h1 className="font-display text-4xl text-paper">Essay not found</h1>
        <p className="mt-3 text-paper-dim">The requested dispatch is not in our journal index.</p>
        <div className="mt-6">
          <Link
            to="/musings"
            className="inline-flex items-center gap-2 rounded bg-neon px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Musings</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-[800px] px-6 sm:px-10">
        {/* Back Link */}
        <div className="mb-10">
          <Link
            to="/musings"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-paper-dim hover:text-neon transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>All Musings &amp; Essays</span>
          </Link>
        </div>

        {/* Essay Header */}
        <header className="space-y-4 border-b border-neon/10 pb-8">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-neon/80">
            <span>{musing.category}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {musing.readTime}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-paper text-balance leading-tight">
            {musing.title}
          </h1>

          <div className="flex items-center justify-between pt-2 text-xs uppercase tracking-[0.18em] text-paper-faint">
            <Link to="/about" className="text-paper hover:text-neon transition-colors">
              Written by {musing.author}
            </Link>
            <span>{musing.date}</span>
          </div>
        </header>

        {/* Excerpt Pullquote */}
        <div className="my-8 p-6 rounded-lg bg-ink-2 border-l-2 border-neon text-lg sm:text-xl font-display text-paper italic leading-relaxed">
          “{musing.excerpt}”
        </div>

        {/* Essay Body */}
        <article className="prose prose-invert max-w-none text-base sm:text-lg leading-[1.85] text-paper/90 space-y-6">
          {musing.content.map((paragraph, index) => (
            <p key={index} className="tracking-wide">
              {paragraph}
            </p>
          ))}
        </article>

        {/* Author Bio Box */}
        <div className="mt-16 pt-8 border-t border-neon/15 bg-ink-2 p-6 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-neon font-medium">
              About the Author
            </p>
            <p className="font-display text-xl text-paper mt-1">{musing.author}</p>
            <p className="text-xs text-paper-dim mt-1">
              Co-founder of Muse Books and author of hand-printed chapbook editions.
            </p>
          </div>
          <Link
            to="/about"
            className="rounded border border-neon/30 px-4 py-2 text-xs uppercase tracking-[0.18em] text-paper hover:bg-neon/10 transition-colors shrink-0"
          >
            Author Bio &rarr;
          </Link>
        </div>

        {/* Explore Next Essays */}
        <div className="mt-12 flex justify-between items-center text-xs uppercase tracking-[0.2em] text-paper-dim">
          <Link to="/musings" className="hover:text-neon">
            &larr; Back to all essays
          </Link>
          <Link to="/poems" className="text-neon hover:underline">
            Read poetry archive &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

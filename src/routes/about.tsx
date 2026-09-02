import { createFileRoute, Link } from "@tanstack/react-router";
import { Feather, Heart, MapPin, Sparkles, BookOpen, Layers, Compass } from "lucide-react";

import { POETS } from "@/data/literature";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Press & Poets — Muse Books" },
      {
        name: "description",
        content:
          "Learn about Muse Books, our letterpress press in Edinburgh and Stockholm, and poets Adaeze Okafor and Theo Lindqvist.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-10 space-y-20">
        {/* Header / Origin */}
        <section className="border-b border-neon/10 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
            <div className="col-span-12 lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-neon/80">
                <Feather className="h-3.5 w-3.5" />
                <span>Our Story &amp; Ethos</span>
              </div>
              <h1 className="font-display text-4xl sm:text-7xl font-medium text-paper text-balance leading-[0.95]">
                Two Friends, One Lamp
              </h1>
              <p className="font-display text-2xl sm:text-3xl text-paper-dim italic">
                “We do not write to be found. We write to leave the light on.”
              </p>
            </div>
            <div className="col-span-12 lg:col-span-4 text-sm text-paper-dim leading-relaxed lg:border-l lg:border-neon/15 lg:pl-8">
              Muse Books was founded on a rainy winter night in Edinburgh in 2022. Frustrated by the
              disposable speed of contemporary digital media, we set out to build a quiet sanctuary
              for literature that takes its time.
            </div>
          </div>
        </section>

        {/* The Poets Profiles */}
        <section className="space-y-10">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-neon/80 font-medium">
              The Founders &amp; Writers
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-paper mt-1">
              Meet the Poets
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {Object.values(POETS).map((poet) => (
              <div
                key={poet.id}
                className="rounded-xl border border-neon/15 bg-ink-2 p-6 sm:p-8 space-y-6"
              >
                <div className="overflow-hidden rounded-lg bg-ink-3 aspect-[4/3] shadow-lg">
                  <img
                    src={poet.image}
                    alt={poet.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-neon/80">
                    <span>{poet.role}</span>
                    <span className="flex items-center gap-1 text-paper-faint">
                      <MapPin className="h-3 w-3" />
                      {poet.location}
                    </span>
                  </div>
                  <h3 className="font-display text-3xl font-medium text-paper mt-2">{poet.name}</h3>
                </div>

                <p className="text-sm text-paper-dim leading-relaxed">{poet.longBio}</p>

                <div className="p-4 rounded bg-ink border border-neon/10 space-y-1">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-neon">
                    Aesthetic Territory
                  </span>
                  <p className="text-xs text-paper-dim italic">{poet.aesthetic}</p>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-[0.18em] text-paper-faint block mb-2">
                    Published Works at Muse:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {poet.works.map((w) => (
                      <span
                        key={w}
                        className="text-xs bg-ink px-2.5 py-1 rounded text-paper border border-neon/15"
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The Letterpress Studio */}
        <section className="rounded-2xl border border-neon/15 bg-ink-2/70 p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-neon/80 mb-2">
              <Compass className="h-3.5 w-3.5" />
              <span>Craft &amp; Method</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-medium text-paper">
              The Letterpress Studio
            </h2>
            <p className="text-sm sm:text-base text-paper-dim leading-relaxed mt-4">
              Every physical volume bearing the Muse imprint is handset in metal type and printed on
              our restored 1890s Albion hand press. We do not use commercial high-speed offset
              machinery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-neon/10">
            <div className="space-y-2">
              <h4 className="font-display text-xl text-paper">Lead &amp; Zinc Type</h4>
              <p className="text-xs text-paper-dim leading-relaxed">
                Hand-set letter by letter in Monotype Bembo, Caslon Old Face, and Garamond.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-display text-xl text-paper">Deckle Rag Papers</h4>
              <p className="text-xs text-paper-dim leading-relaxed">
                Acid-free, 100% cotton mould-made paper made with pure spring water in Bavaria and
                Somerset.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-display text-xl text-paper">Hand Stitched</h4>
              <p className="text-xs text-paper-dim leading-relaxed">
                Each signature is folded by hand and sewn with unbleached Irish linen thread or
                Japanese silk.
              </p>
            </div>
          </div>
        </section>

        {/* The Press Manifesto */}
        <section className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <p className="text-xs uppercase tracking-[0.28em] text-neon font-medium">
              The Muse Books Manifesto
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-paper">
              Principles by Lamplight
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg border border-neon/10 bg-ink-2 space-y-2">
              <span className="font-mono text-neon text-sm">01</span>
              <h3 className="font-display text-xl text-paper">Silence Over Noise</h3>
              <p className="text-xs text-paper-dim leading-relaxed">
                We prefer one resonant line over ten thousand disposable words.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-neon/10 bg-ink-2 space-y-2">
              <span className="font-mono text-neon text-sm">02</span>
              <h3 className="font-display text-xl text-paper">Physical Weight</h3>
              <p className="text-xs text-paper-dim leading-relaxed">
                A poem belongs on paper that outlasts the electrical grid.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-neon/10 bg-ink-2 space-y-2">
              <span className="font-mono text-neon text-sm">03</span>
              <h3 className="font-display text-xl text-paper">Intimacy First</h3>
              <p className="text-xs text-paper-dim leading-relaxed">
                We write to the singular reader reading alone at midnight.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-neon/10 bg-ink-2 space-y-2">
              <span className="font-mono text-neon text-sm">04</span>
              <h3 className="font-display text-xl text-paper">Epistolary Soul</h3>
              <p className="text-xs text-paper-dim leading-relaxed">
                Every poem is a letter sent into the open weather of the world.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-neon/10 bg-ink-2 space-y-2">
              <span className="font-mono text-neon text-sm">05</span>
              <h3 className="font-display text-xl text-paper">Open Gateways</h3>
              <p className="text-xs text-paper-dim leading-relaxed">
                We welcome voices everywhere who write with patience and wonder.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-neon/10 bg-ink-2 space-y-2 flex flex-col justify-between">
              <div>
                <span className="font-mono text-neon text-sm">06</span>
                <h3 className="font-display text-xl text-paper">Your Voice</h3>
                <p className="text-xs text-paper-dim leading-relaxed">
                  Join our open reading seasons and share your poetry.
                </p>
              </div>
              <Link
                to="/submit"
                className="text-xs uppercase tracking-[0.2em] text-neon hover:underline mt-4 inline-block"
              >
                Submit Poetry &rarr;
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

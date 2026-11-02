import { Link } from "@tanstack/react-router";
import { ArrowRight, Feather, Sparkles } from "lucide-react";

import type { PersonWithPenNames } from "@/lib/people.functions";
import type { SiteSettings } from "@/lib/settings.functions";

interface AboutPageProps {
  siteSettings: SiteSettings | null;
  persons: PersonWithPenNames[];
}

export function AboutPage({ siteSettings, persons }: AboutPageProps) {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
        <section className="mb-10 border-b border-neon/10 pb-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-neon/80 mb-3">
            <Feather className="h-3.5 w-3.5" />
            <span>The Press &amp; Poets</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-medium text-paper">
            {siteSettings?.tagline || "About the Press"}
          </h1>
          {siteSettings?.about && (
            <p className="mt-4 text-base sm:text-lg text-paper-dim max-w-[56ch] text-pretty">
              {siteSettings.about}
            </p>
          )}
        </section>

        <section className="grid gap-8 md:grid-cols-2">
          {persons.map((person) => {
            const penName =
              person.penNames.find((name) => name.isPrimary)?.name ??
              person.penNames[0]?.name ??
              person.legalName;

            return (
              <article
                key={person.id}
                className="rounded-xl border border-neon/15 bg-ink-2 p-6 sm:p-8"
              >
                <div className="overflow-hidden rounded-lg bg-ink-3 border border-neon/20 h-80 sm:h-96 lg:h-[420px]">
                  {person.imageUrl ? (
                    <img
                      src={person.imageUrl}
                      alt={penName}
                      className="h-full w-full object-cover object-center"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center font-display text-5xl text-neon/60">
                      {penName.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="mt-6">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-neon/80">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>{person.role}</span>
                  </div>
                  <h2 className="font-display mt-3 text-3xl text-paper sm:text-4xl">
                    {penName}
                  </h2>
                  <p className="text-xs uppercase tracking-[0.2em] text-paper-faint mt-2">
                    {person.legalName}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-paper-dim">{person.longBio}</p>
                  <div className="mt-6">
                    <span className="text-xs uppercase tracking-[0.24em] text-neon">
                      Aesthetic Territory
                    </span>
                    <p className="mt-2 text-sm text-paper-dim">{person.aesthetic}</p>
                  </div>
                  {person.penNames.length > 1 && (
                    <div className="mt-6">
                      <span className="text-xs uppercase tracking-[0.24em] text-neon">
                        Literary Names
                      </span>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {person.penNames.map((name) => (
                          <span
                            key={name.id}
                            className="rounded-full border border-neon/20 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-paper-dim"
                          >
                            {name.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="mt-8">
                    <Link
                      to="/library"
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-neon hover:text-paper"
                    >
                      <span>Read the archive</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </div>
  );
}

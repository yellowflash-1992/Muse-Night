import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Feather, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { POEMS, POETS } from "@/data/literature";

export const Route = createFileRoute("/poems/")({
  head: () => ({
    meta: [
      { title: "Poems Library — Muse Books" },
      {
        name: "description",
        content: "Browse all poems, epistles, and verses published by Muse Books.",
      },
    ],
  }),
  component: PoemsIndex,
});

function PoemsIndex() {
  const [search, setSearch] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    POEMS.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return Array.from(tags);
  }, []);

  const filteredPoems = useMemo(() => {
    return POEMS.filter((poem) => {
      const matchSearch =
        search === "" ||
        poem.title.toLowerCase().includes(search.toLowerCase()) ||
        poem.author.toLowerCase().includes(search.toLowerCase()) ||
        poem.stanzas.some((s) => s.some((l) => l.toLowerCase().includes(search.toLowerCase())));

      const matchAuthor = selectedAuthor === "all" || poem.authorId === selectedAuthor;

      const matchTag = selectedTag === "all" || poem.tags.includes(selectedTag);

      return matchSearch && matchAuthor && matchTag;
    });
  }, [search, selectedAuthor, selectedTag]);

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-10">
        {/* Header */}
        <div className="border-b border-neon/10 pb-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-neon/80 mb-3">
            <Feather className="h-3.5 w-3.5" />
            <span>The Verse Library</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-medium text-paper">Poem Library</h1>
          <p className="mt-4 text-base sm:text-lg text-paper-dim max-w-[50ch] text-pretty">
            An archive of verses, epistles, and quiet observations written by lamplight and printed
            on cotton paper.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="mt-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-paper-faint" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search poems, lines, or themes..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-ink-2 border border-neon/20 text-paper text-sm placeholder:text-paper-faint focus:border-neon focus:outline-none transition-colors shadow-inner"
              />
            </div>

            {/* Author filter buttons - Horizontal scroll on mobile */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <button
                type="button"
                onClick={() => setSelectedAuthor("all")}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs uppercase tracking-[0.16em] transition-all shrink-0 ${
                  selectedAuthor === "all"
                    ? "bg-neon text-ink font-medium shadow-sm"
                    : "bg-ink-2 text-paper-dim hover:text-paper border border-neon/10"
                }`}
              >
                All Poets ({POEMS.length})
              </button>
              {Object.values(POETS).map((poet) => (
                <button
                  key={poet.id}
                  type="button"
                  onClick={() => setSelectedAuthor(poet.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-xs uppercase tracking-[0.16em] transition-all shrink-0 ${
                    selectedAuthor === poet.id
                      ? "bg-neon text-ink font-medium shadow-sm"
                      : "bg-ink-2 text-paper-dim hover:text-paper border border-neon/10"
                  }`}
                >
                  {poet.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tag filters - Horizontal scrollable on mobile */}
          <div className="flex items-center gap-2 pt-3 border-t border-neon/5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] uppercase tracking-[0.2em] text-paper-faint mr-1 shrink-0">
              Themes:
            </span>
            <button
              type="button"
              onClick={() => setSelectedTag("all")}
              className={`text-xs px-3 py-1 rounded-full whitespace-nowrap transition-colors shrink-0 ${
                selectedTag === "all"
                  ? "bg-neon/15 text-neon border border-neon/30 font-medium"
                  : "text-paper-dim hover:text-paper bg-ink-2 border border-transparent"
              }`}
            >
              All Themes
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`text-xs px-3 py-1 rounded-full whitespace-nowrap transition-colors shrink-0 ${
                  selectedTag === tag
                    ? "bg-neon/15 text-neon border border-neon/30 font-medium"
                    : "text-paper-dim hover:text-paper bg-ink-2 border border-transparent"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Poems Grid */}
        <div className="mt-10">
          {filteredPoems.length === 0 ? (
            <div className="text-center py-20 rounded-lg border border-dashed border-neon/20 bg-ink-2/40">
              <BookOpen className="mx-auto h-8 w-8 text-paper-faint mb-3" />
              <p className="font-display text-2xl text-paper">No poems found</p>
              <p className="text-sm text-paper-dim mt-1">
                Try loosening your search term or selecting another theme filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedAuthor("all");
                  setSelectedTag("all");
                }}
                className="mt-4 px-4 py-1.5 text-xs uppercase tracking-[0.2em] bg-neon text-ink rounded hover:bg-neon/90"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPoems.map((poem) => (
                <article
                  key={poem.id}
                  className="group rounded-lg border border-neon/15 bg-ink-2 p-6 flex flex-col justify-between transition-all hover:border-neon/40 hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-paper-faint mb-3">
                      <span className="text-neon/80">{poem.author}</span>
                      <span>{poem.readTime}</span>
                    </div>

                    <h2 className="font-display text-2xl sm:text-[1.75rem] font-medium leading-tight text-paper group-hover:text-neon transition-colors">
                      <Link to="/poems/$id" params={{ id: poem.id }}>
                        {poem.title}
                      </Link>
                    </h2>

                    <p className="mt-2 text-xs uppercase tracking-[0.16em] text-paper-faint">
                      Collection: {poem.collection} ({poem.year})
                    </p>

                    {/* First stanza preview */}
                    <div className="mt-4 font-display text-base text-paper-dim/90 leading-relaxed italic border-l border-neon/20 pl-3">
                      {poem.stanzas[0]?.slice(0, 3).map((line, lIdx) => (
                        <p key={lIdx} className="truncate">
                          {line}
                        </p>
                      ))}
                      {(poem.stanzas[0]?.length ?? 0) > 3 && (
                        <p className="text-paper-faint">...</p>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {poem.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] uppercase tracking-[0.15em] bg-ink px-2 py-0.5 rounded text-paper-faint border border-neon/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neon/10 flex items-center justify-between">
                    <span className="text-xs text-paper-faint">{poem.linesCount} lines</span>
                    <Link
                      to="/poems/$id"
                      params={{ id: poem.id }}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-neon inkline font-medium"
                    >
                      <span>Read Poem</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

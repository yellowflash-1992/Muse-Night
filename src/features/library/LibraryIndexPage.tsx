import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Feather, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { LIBRARY_POEMS, POETS } from "@/data/literature";

export function LibraryIndexPage() {
  const [search, setSearch] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [selectedForm, setSelectedForm] = useState<string>("all");

  const poeticForms = [
    { label: "Free Verse", detail: "Open Form" },
    { label: "Sonnet", detail: "14 Lines" },
    { label: "Haiku", detail: "3 Lines · 5-7-5" },
    { label: "Epistle", detail: "Verse Letter" },
    { label: "Prose Poetry", detail: "Poetic Prose" },
  ] as const;

  const getPoemForm = (p: (typeof LIBRARY_POEMS)[0]) => {
    // 1. Haiku: strictly 3 lines (traditional 5-7-5 syllables)
    if (p.linesCount === 3 || p.tags.includes("Haiku") || p.title.toLowerCase().includes("haiku")) {
      return "Haiku";
    }
    // 2. Sonnet: classical 14 lines
    if (p.linesCount === 14 || p.tags.includes("Sonnet")) {
      return "Sonnet";
    }
    // 3. Epistle: Letter in verse
    if (
      p.tags.includes("Letters") ||
      p.tags.includes("Epistle") ||
      p.title.toLowerCase().includes("letter")
    ) {
      return "Epistle";
    }
    // 4. Prose Poetry: Poetic prose & narrative entries
    if (p.tags.includes("Prose") || p.tags.includes("Travel") || p.tags.includes("Maps")) {
      return "Prose Poetry";
    }
    // 5. Free Verse: Open form non-metrical poetry
    return "Free Verse";
  };

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    LIBRARY_POEMS.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return Array.from(tags);
  }, []);

  const filteredPoems = useMemo(() => {
    return LIBRARY_POEMS.filter((poem) => {
      const matchSearch =
        search === "" ||
        poem.title.toLowerCase().includes(search.toLowerCase()) ||
        poem.author.toLowerCase().includes(search.toLowerCase()) ||
        poem.stanzas.some((s) => s.some((l) => l.toLowerCase().includes(search.toLowerCase())));

      const matchAuthor = selectedAuthor === "all" || poem.authorId === selectedAuthor;

      const matchTag = selectedTag === "all" || poem.tags.includes(selectedTag);

      const matchForm =
        selectedForm === "all" || getPoemForm(poem).toLowerCase() === selectedForm.toLowerCase();

      return matchSearch && matchAuthor && matchTag && matchForm;
    });
  }, [search, selectedAuthor, selectedTag, selectedForm]);

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-310 px-6 sm:px-10">
        {/* Header */}
        <div className="border-b border-neon/10 pb-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-neon/80 mb-3">
            <Feather className="h-3.5 w-3.5" />
            <span>Library Archive</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-medium text-paper">
            Library &amp; Archive
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paper-dim max-w-[56ch] text-pretty">
            An archive of poems, prose poetry, epistles, and literary works — from our two founding
            poets and invited contributors writing by lamplight.
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
                All Works ({LIBRARY_POEMS.length})
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
                  {poet.penName}
                </button>
              ))}
            </div>
          </div>

          {/* Tag filters - Horizontal scrollable on mobile */}
          <div className="flex items-center gap-2 pt-3 border-t border-neon/5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] uppercase tracking-[0.2em] text-paper-faint mr-1 shrink-0 font-medium font-karla">
              Themes:
            </span>
            <button
              type="button"
              onClick={() => setSelectedTag("all")}
              className={`text-xs px-3 py-1 rounded-full whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
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
                className={`text-xs px-3 py-1 rounded-full whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
                  selectedTag === tag
                    ? "bg-neon/15 text-neon border border-neon/30 font-medium"
                    : "text-paper-dim hover:text-paper bg-ink-2 border border-transparent"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* Form filters - Up to 5 poetic forms with structural notes */}
          <div className="flex items-center gap-2 pt-3 border-t border-neon/5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] uppercase tracking-[0.2em] text-paper-faint mr-1 shrink-0 font-medium font-karla">
              Forms:
            </span>
            <button
              type="button"
              onClick={() => setSelectedForm("all")}
              className={`text-xs px-3 py-1 rounded-full whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
                selectedForm === "all"
                  ? "bg-amber-400/20 text-amber-300 border border-amber-400/40 font-medium shadow-sm"
                  : "text-paper-dim hover:text-paper bg-ink-2 border border-transparent"
              }`}
            >
              All Forms
            </button>
            {poeticForms.map((form) => (
              <button
                key={form.label}
                type="button"
                onClick={() => setSelectedForm(form.label)}
                className={`text-xs px-3 py-1 rounded-full whitespace-nowrap transition-colors shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  selectedForm === form.label
                    ? "bg-amber-400/20 text-amber-300 border border-amber-400/40 font-medium shadow-sm"
                    : "text-paper-dim hover:text-paper bg-ink-2 border border-transparent"
                }`}
              >
                <span>{form.label}</span>
                <span className="text-[9.5px] font-mono text-paper-faint/80">({form.detail})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Poems Grid */}
        <div className="mt-10">
          {filteredPoems.length === 0 ? (
            <div className="text-center py-20 rounded-lg border border-dashed border-neon/20 bg-ink-2/40">
              <BookOpen className="mx-auto h-8 w-8 text-paper-faint mb-3" />
              <p className="font-display text-2xl text-paper">No works found</p>
              <p className="text-sm text-paper-dim mt-1">
                Try loosening your search term or selecting another theme or author.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedAuthor("all");
                  setSelectedTag("all");
                  setSelectedForm("all");
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
                  className="group rounded-2xl border border-neon/15 bg-ink-2 p-5 sm:p-6 flex flex-col justify-between transition-all hover:border-neon/40 hover:-translate-y-1 overflow-hidden min-w-0 shadow-md"
                >
                  <div className="min-w-0 overflow-hidden">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="font-display text-2xl sm:text-[1.75rem] font-medium leading-tight text-paper group-hover:text-neon transition-colors line-clamp-2 break-words min-w-0">
                        <Link to="/library/$id" params={{ id: poem.id }}>
                          {poem.title}
                        </Link>
                      </h2>
                      <span className="shrink-0 rounded bg-neon/10 px-2 py-0.5 text-[9.5px] uppercase tracking-wider text-neon font-mono border border-neon/20">
                        {getPoemForm(poem)}
                      </span>
                    </div>

                    <p className="mt-2 text-xs uppercase tracking-[0.16em] text-paper-faint truncate">
                      Collection: {poem.collection} ({poem.year})
                    </p>

                    {/* First stanza preview */}
                    <div className="mt-4 font-display text-base text-paper-dim/90 leading-relaxed italic border-l border-neon/20 pl-3 overflow-hidden min-w-0">
                      {poem.stanzas[0]?.slice(0, 3).map((line, lIdx) => (
                        <p key={lIdx} className="truncate block w-full">
                          {line}
                        </p>
                      ))}
                      {(poem.stanzas[0]?.length ?? 0) > 3 && (
                        <p className="text-paper-faint">...</p>
                      )}
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-neon/10 pt-3 text-[11px] uppercase tracking-[0.2em] text-paper-faint">
                      <span className="text-neon/80 font-medium truncate mr-2">{poem.author}</span>
                      <span className="shrink-0">{poem.readTime}</span>
                    </div>

                    {/* Tags / Themes */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {poem.tags.map((t) => (
                        <span
                          key={t}
                          className="inline-block max-w-full text-[10px] uppercase tracking-[0.1em] bg-ink px-2.5 py-0.5 rounded text-paper-faint border border-neon/15 whitespace-nowrap"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neon/10 flex items-center justify-between">
                    <span className="text-xs text-paper-faint">{poem.linesCount} lines</span>
                    <Link
                      to="/library/$id"
                      params={{ id: poem.id }}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-neon inkline font-medium"
                    >
                      <span>Read</span>
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

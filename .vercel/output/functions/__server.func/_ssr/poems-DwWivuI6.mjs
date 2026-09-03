import { r as __toESM } from "../_runtime.mjs";
import { a as POETS, i as POEMS } from "./literature-qxY3elwu.mjs";
import {
  n as require_jsx_runtime,
  r as require_react,
} from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import {
  C as BookOpen,
  T as ArrowRight,
  g as Feather,
  s as Search,
} from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/poems-DwWivuI6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PoemsIndex() {
  const [search, setSearch] = (0, import_react.useState)("");
  const [selectedAuthor, setSelectedAuthor] = (0, import_react.useState)("all");
  const [selectedTag, setSelectedTag] = (0, import_react.useState)("all");
  const allTags = (0, import_react.useMemo)(() => {
    const tags = /* @__PURE__ */ new Set();
    POEMS.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return Array.from(tags);
  }, []);
  const filteredPoems = (0, import_react.useMemo)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    className: "py-12 sm:py-16",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
      className: "mx-auto max-w-[1240px] px-6 sm:px-10",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "border-b border-neon/10 pb-10",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className:
                "flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-neon/80 mb-3",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feather, { className: "h-3.5 w-3.5" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                  children: "The Verse Library",
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
              className: "font-display text-4xl sm:text-6xl font-medium text-paper",
              children: "Poem Library",
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
              className: "mt-4 text-base sm:text-lg text-paper-dim max-w-[50ch] text-pretty",
              children:
                "An archive of verses, epistles, and quiet observations written by lamplight and printed on cotton paper.",
            }),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "mt-8 space-y-4",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className:
                "flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "relative flex-1 max-w-md",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
                      className:
                        "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-paper-faint",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
                      type: "text",
                      value: search,
                      onChange: (e) => setSearch(e.target.value),
                      placeholder: "Search poems, lines, or themes...",
                      className:
                        "w-full pl-10 pr-4 py-2.5 rounded-lg bg-ink-2 border border-neon/20 text-paper text-sm placeholder:text-paper-faint focus:border-neon focus:outline-none transition-colors shadow-inner",
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
                      type: "button",
                      onClick: () => setSelectedAuthor("all"),
                      className: `whitespace-nowrap px-4 py-2 rounded-full text-xs uppercase tracking-[0.16em] transition-all shrink-0 ${selectedAuthor === "all" ? "bg-neon text-ink font-medium shadow-sm" : "bg-ink-2 text-paper-dim hover:text-paper border border-neon/10"}`,
                      children: ["All Poets (", POEMS.length, ")"],
                    }),
                    Object.values(POETS).map((poet) =>
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        "button",
                        {
                          type: "button",
                          onClick: () => setSelectedAuthor(poet.id),
                          className: `whitespace-nowrap px-4 py-2 rounded-full text-xs uppercase tracking-[0.16em] transition-all shrink-0 ${selectedAuthor === poet.id ? "bg-neon text-ink font-medium shadow-sm" : "bg-ink-2 text-paper-dim hover:text-paper border border-neon/10"}`,
                          children: poet.name,
                        },
                        poet.id,
                      ),
                    ),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className:
                "flex items-center gap-2 pt-3 border-t border-neon/5 overflow-x-auto pb-1 scrollbar-none",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                  className:
                    "text-[11px] uppercase tracking-[0.2em] text-paper-faint mr-1 shrink-0",
                  children: "Themes:",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
                  type: "button",
                  onClick: () => setSelectedTag("all"),
                  className: `text-xs px-3 py-1 rounded-full whitespace-nowrap transition-colors shrink-0 ${selectedTag === "all" ? "bg-neon/15 text-neon border border-neon/30 font-medium" : "text-paper-dim hover:text-paper bg-ink-2 border border-transparent"}`,
                  children: "All Themes",
                }),
                allTags.map((tag) =>
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                    "button",
                    {
                      type: "button",
                      onClick: () => setSelectedTag(tag),
                      className: `text-xs px-3 py-1 rounded-full whitespace-nowrap transition-colors shrink-0 ${selectedTag === tag ? "bg-neon/15 text-neon border border-neon/30 font-medium" : "text-paper-dim hover:text-paper bg-ink-2 border border-transparent"}`,
                      children: ["#", tag],
                    },
                    tag,
                  ),
                ),
              ],
            }),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
          className: "mt-10",
          children:
            filteredPoems.length === 0
              ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className:
                    "text-center py-20 rounded-lg border border-dashed border-neon/20 bg-ink-2/40",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
                      className: "mx-auto h-8 w-8 text-paper-faint mb-3",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                      className: "font-display text-2xl text-paper",
                      children: "No poems found",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                      className: "text-sm text-paper-dim mt-1",
                      children: "Try loosening your search term or selecting another theme filter.",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
                      type: "button",
                      onClick: () => {
                        setSearch("");
                        setSelectedAuthor("all");
                        setSelectedTag("all");
                      },
                      className:
                        "mt-4 px-4 py-1.5 text-xs uppercase tracking-[0.2em] bg-neon text-ink rounded hover:bg-neon/90",
                      children: "Reset Filters",
                    }),
                  ],
                })
              : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                  className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                  children: filteredPoems.map((poem) =>
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                      "article",
                      {
                        className:
                          "group rounded-lg border border-neon/15 bg-ink-2 p-6 flex flex-col justify-between transition-all hover:border-neon/40 hover:-translate-y-1",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                                className:
                                  "flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-paper-faint mb-3",
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                                    className: "text-neon/80",
                                    children: poem.author,
                                  }),
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                                    children: poem.readTime,
                                  }),
                                ],
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
                                className:
                                  "font-display text-2xl sm:text-[1.75rem] font-medium leading-tight text-paper group-hover:text-neon transition-colors",
                                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
                                  to: "/poems/$id",
                                  params: { id: poem.id },
                                  children: poem.title,
                                }),
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
                                className:
                                  "mt-2 text-xs uppercase tracking-[0.16em] text-paper-faint",
                                children: ["Collection: ", poem.collection, " (", poem.year, ")"],
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                                className:
                                  "mt-4 font-display text-base text-paper-dim/90 leading-relaxed italic border-l border-neon/20 pl-3",
                                children: [
                                  poem.stanzas[0]?.slice(0, 3).map((line, lIdx) =>
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                      "p",
                                      {
                                        className: "truncate",
                                        children: line,
                                      },
                                      lIdx,
                                    ),
                                  ),
                                  (poem.stanzas[0]?.length ?? 0) > 3 &&
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                                      className: "text-paper-faint",
                                      children: "...",
                                    }),
                                ],
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                                className: "mt-5 flex flex-wrap gap-1.5",
                                children: poem.tags.map((t) =>
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                    "span",
                                    {
                                      className:
                                        "text-[10px] uppercase tracking-[0.15em] bg-ink px-2 py-0.5 rounded text-paper-faint border border-neon/10",
                                      children: t,
                                    },
                                    t,
                                  ),
                                ),
                              }),
                            ],
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                            className:
                              "mt-6 pt-4 border-t border-neon/10 flex items-center justify-between",
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                                className: "text-xs text-paper-faint",
                                children: [poem.linesCount, " lines"],
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
                                to: "/poems/$id",
                                params: { id: poem.id },
                                className:
                                  "inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-neon inkline font-medium",
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                                    children: "Read Poem",
                                  }),
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
                                    className: "h-3 w-3",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      },
                      poem.id,
                    ),
                  ),
                }),
        }),
      ],
    }),
  });
}
//#endregion
export { PoemsIndex as component };

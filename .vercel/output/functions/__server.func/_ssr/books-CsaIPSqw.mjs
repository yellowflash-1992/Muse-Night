import { t as CHAPBOOKS } from "./literature-qxY3elwu.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as ArrowRight, b as CircleCheck, w as BookMarked } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/books-CsaIPSqw.js
var import_jsx_runtime = require_jsx_runtime();
function ChapbooksIndex() {
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
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookMarked, {
                  className: "h-3.5 w-3.5",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                  children: "The Letterpress Editions",
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
              className: "font-display text-4xl sm:text-6xl font-medium text-paper",
              children: "Hand-Bound Chapbooks",
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
              className: "mt-4 text-base sm:text-lg text-paper-dim max-w-[52ch] text-pretty",
              children:
                "Printed on an 1890s Albion press using hand-set lead type, 100% cotton rag paper, and traditional archival bindings.",
            }),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className:
            "my-10 rounded-lg border border-neon/20 bg-ink-2/60 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-paper-dim",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "space-y-1",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                  className: "text-neon uppercase tracking-[0.2em] font-medium",
                  children: "Letterpress Printing",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                  className: "leading-relaxed",
                  children:
                    "Set by hand in metal Bembo and Caslon type, impression pulled leaf by leaf.",
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "space-y-1",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                  className: "text-neon uppercase tracking-[0.2em] font-medium",
                  children: "Archival Papers",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                  className: "leading-relaxed",
                  children: "Deckle-edged Zerkall and Hahnemühle cotton mould-made sheets.",
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "space-y-1",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                  className: "text-neon uppercase tracking-[0.2em] font-medium",
                  children: "Hand-Sewn Bindings",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                  className: "leading-relaxed",
                  children: "Stitched using pure Irish linen thread and Japanese silk cord.",
                }),
              ],
            }),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
          className: "grid grid-cols-1 lg:grid-cols-2 gap-10",
          children: CHAPBOOKS.map((book) =>
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "article",
              {
                className:
                  "group rounded-xl border border-neon/15 bg-ink-2 p-6 sm:p-8 flex flex-col justify-between hover:border-neon/40 transition-all",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
                        to: "/books/$id",
                        params: { id: book.id },
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                          className:
                            "overflow-hidden rounded-lg bg-ink-3 aspect-[4/5] mb-6 border border-neon/10",
                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
                            src: book.coverImage,
                            alt: book.title,
                            loading: "lazy",
                            className:
                              "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
                          }),
                        }),
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                        className:
                          "flex items-center justify-between text-xs uppercase tracking-[0.22em] text-neon/80",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                            children: book.author,
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                            className: "font-mono text-sm text-paper",
                            children: book.price,
                          }),
                        ],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
                        className:
                          "mt-2 font-display text-3xl sm:text-4xl font-medium text-paper group-hover:text-neon transition-colors",
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
                          to: "/books/$id",
                          params: { id: book.id },
                          children: book.title,
                        }),
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
                        className: "mt-4 text-sm text-paper-dim italic",
                        children: ["“", book.quote, "”"],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                        className:
                          "mt-6 pt-5 border-t border-neon/10 space-y-2 text-xs text-paper-dim",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                            className: "flex justify-between",
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                                className: "text-paper-faint uppercase tracking-[0.16em]",
                                children: "Edition:",
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                                children: book.edition,
                              }),
                            ],
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                            className: "flex justify-between",
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                                className: "text-paper-faint uppercase tracking-[0.16em]",
                                children: "Binding:",
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                                className: "truncate max-w-[24ch] text-right",
                                children: book.binding,
                              }),
                            ],
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                            className: "flex justify-between",
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                                className: "text-paper-faint uppercase tracking-[0.16em]",
                                children: "Paper:",
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                                className: "truncate max-w-[24ch] text-right",
                                children: book.paper,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                    className:
                      "mt-8 pt-5 border-t border-neon/10 flex flex-wrap gap-4 items-center justify-between",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                        className: "inline-flex items-center gap-1.5 text-xs text-neon",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
                            className: "h-4 w-4",
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                            children: "Limited copies available",
                          }),
                        ],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
                        to: "/books/$id",
                        params: { id: book.id },
                        className:
                          "inline-flex items-center gap-2 rounded bg-neon px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium text-ink hover:bg-neon/90 transition-all",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                            children: "View Edition & Order",
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
                            className: "h-3.5 w-3.5",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              },
              book.id,
            ),
          ),
        }),
      ],
    }),
  });
}
//#endregion
export { ChapbooksIndex as component };

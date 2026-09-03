import { n as COLLECTIONS } from "./literature-qxY3elwu.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as BookOpen, T as ArrowRight, m as Layers } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/collections-Cku59l7_.js
var import_jsx_runtime = require_jsx_runtime();
function CollectionsIndex() {
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
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-3.5 w-3.5" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                  children: "Anthologies & Suites",
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
              className: "font-display text-4xl sm:text-6xl font-medium text-paper",
              children: "Poetry Collections",
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
              className: "mt-4 text-base sm:text-lg text-paper-dim max-w-[50ch] text-pretty",
              children:
                "Cohesive volumes of verse curated around distinct seasons, geographies, and spiritual atmospheres.",
            }),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
          className: "mt-12 space-y-12",
          children: COLLECTIONS.map((collection, index) =>
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "article",
              {
                className:
                  "rounded-xl border border-neon/15 bg-ink-2 p-6 sm:p-10 transition-all hover:border-neon/30 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center",
                children: [
                  collection.coverImage &&
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                      className: "col-span-12 md:col-span-4 lg:col-span-3",
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
                        to: "/collections/$id",
                        params: { id: collection.id },
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                          className:
                            "overflow-hidden rounded-lg bg-ink aspect-[4/5] shadow-lg group",
                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
                            src: collection.coverImage,
                            alt: collection.title,
                            loading: "lazy",
                            className:
                              "h-full w-full object-cover transition-transform duration-500 hover:scale-105",
                          }),
                        }),
                      }),
                    }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                    className: `col-span-12 ${collection.coverImage ? "md:col-span-8 lg:col-span-9" : "col-span-12"} space-y-4`,
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                        className:
                          "flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-paper-faint",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                            className: "text-neon/90 font-medium",
                            children: collection.author,
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                            children: collection.year,
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                            children: [collection.poemsCount, " Works"],
                          }),
                        ],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
                        className:
                          "font-display text-3xl sm:text-4xl font-medium text-paper hover:text-neon transition-colors",
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
                          to: "/collections/$id",
                          params: { id: collection.id },
                          children: collection.title,
                        }),
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                        className: "font-display text-lg sm:text-xl text-paper-dim italic",
                        children: collection.subtitle,
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                        className: "text-sm text-paper-dim leading-relaxed max-w-[65ch]",
                        children: collection.description,
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                        className:
                          "p-4 rounded-md bg-ink border-l-2 border-neon/40 text-xs sm:text-sm text-paper-dim italic",
                        children: ["“", collection.featuredQuote, "”"],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                        className: "pt-4 flex flex-wrap gap-4 items-center",
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
                          to: "/collections/$id",
                          params: { id: collection.id },
                          className:
                            "inline-flex items-center gap-2 rounded bg-neon px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium text-ink hover:bg-neon/90 transition-all",
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
                              className: "h-3.5 w-3.5",
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                              children: "View Collection & Contents",
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
                              className: "h-3.5 w-3.5",
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                ],
              },
              collection.id,
            ),
          ),
        }),
      ],
    }),
  });
}
//#endregion
export { CollectionsIndex as component };

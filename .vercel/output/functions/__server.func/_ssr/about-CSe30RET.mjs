import { a as POETS } from "./literature-qxY3elwu.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as MapPin, g as Feather, v as Compass } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-CSe30RET.js
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    className: "py-12 sm:py-20",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
      className: "mx-auto max-w-[1240px] px-6 sm:px-10 space-y-20",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
          className: "border-b border-neon/10 pb-16",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "col-span-12 lg:col-span-8 space-y-4",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                    className:
                      "inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-neon/80",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feather, {
                        className: "h-3.5 w-3.5",
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                        children: "Our Story & Ethos",
                      }),
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
                    className:
                      "font-display text-4xl sm:text-7xl font-medium text-paper text-balance leading-[0.95]",
                    children: "Two Friends, One Lamp",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                    className: "font-display text-2xl sm:text-3xl text-paper-dim italic",
                    children: "“We do not write to be found. We write to leave the light on.”",
                  }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                className:
                  "col-span-12 lg:col-span-4 text-sm text-paper-dim leading-relaxed lg:border-l lg:border-neon/15 lg:pl-8",
                children:
                  "Muse Books was founded on a rainy winter night in Edinburgh in 2022. Frustrated by the disposable speed of contemporary digital media, we set out to build a quiet sanctuary for literature that takes its time.",
              }),
            ],
          }),
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
          className: "space-y-10",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                  className: "text-xs uppercase tracking-[0.25em] text-neon/80 font-medium",
                  children: "The Founders & Writers",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
                  className: "font-display text-3xl sm:text-4xl font-medium text-paper mt-1",
                  children: "Meet the Poets",
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
              className: "grid grid-cols-1 lg:grid-cols-2 gap-12",
              children: Object.values(POETS).map((poet) =>
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                  "div",
                  {
                    className: "rounded-xl border border-neon/15 bg-ink-2 p-6 sm:p-8 space-y-6",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                        className: "overflow-hidden rounded-lg bg-ink-3 aspect-[4/3] shadow-lg",
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
                          src: poet.image,
                          alt: poet.name,
                          loading: "lazy",
                          className: "h-full w-full object-cover",
                        }),
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                            className:
                              "flex items-center justify-between text-xs uppercase tracking-[0.2em] text-neon/80",
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                                children: poet.role,
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                                className: "flex items-center gap-1 text-paper-faint",
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
                                    className: "h-3 w-3",
                                  }),
                                  poet.location,
                                ],
                              }),
                            ],
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
                            className: "font-display text-3xl font-medium text-paper mt-2",
                            children: poet.name,
                          }),
                        ],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                        className: "text-sm text-paper-dim leading-relaxed",
                        children: poet.longBio,
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                        className: "p-4 rounded bg-ink border border-neon/10 space-y-1",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                            className: "text-[11px] uppercase tracking-[0.18em] text-neon",
                            children: "Aesthetic Territory",
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                            className: "text-xs text-paper-dim italic",
                            children: poet.aesthetic,
                          }),
                        ],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                            className:
                              "text-xs uppercase tracking-[0.18em] text-paper-faint block mb-2",
                            children: "Published Works at Muse:",
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                            className: "flex flex-wrap gap-2",
                            children: poet.works.map((w) =>
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                "span",
                                {
                                  className:
                                    "text-xs bg-ink px-2.5 py-1 rounded text-paper border border-neon/15",
                                  children: w,
                                },
                                w,
                              ),
                            ),
                          }),
                        ],
                      }),
                    ],
                  },
                  poet.id,
                ),
              ),
            }),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
          className: "rounded-2xl border border-neon/15 bg-ink-2/70 p-8 sm:p-12 space-y-8",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "max-w-2xl",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className:
                    "flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-neon/80 mb-2",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, {
                      className: "h-3.5 w-3.5",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                      children: "Craft & Method",
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
                  className: "font-display text-3xl sm:text-5xl font-medium text-paper",
                  children: "The Letterpress Studio",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                  className: "text-sm sm:text-base text-paper-dim leading-relaxed mt-4",
                  children:
                    "Every physical volume bearing the Muse imprint is handset in metal type and printed on our restored 1890s Albion hand press. We do not use commercial high-speed offset machinery.",
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-neon/10",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "space-y-2",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
                      className: "font-display text-xl text-paper",
                      children: "Lead & Zinc Type",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                      className: "text-xs text-paper-dim leading-relaxed",
                      children:
                        "Hand-set letter by letter in Monotype Bembo, Caslon Old Face, and Garamond.",
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "space-y-2",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
                      className: "font-display text-xl text-paper",
                      children: "Deckle Rag Papers",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                      className: "text-xs text-paper-dim leading-relaxed",
                      children:
                        "Acid-free, 100% cotton mould-made paper made with pure spring water in Bavaria and Somerset.",
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "space-y-2",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
                      className: "font-display text-xl text-paper",
                      children: "Hand Stitched",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                      className: "text-xs text-paper-dim leading-relaxed",
                      children:
                        "Each signature is folded by hand and sewn with unbleached Irish linen thread or Japanese silk.",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
          className: "space-y-8",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "text-center max-w-xl mx-auto space-y-3",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                  className: "text-xs uppercase tracking-[0.28em] text-neon font-medium",
                  children: "The Muse Books Manifesto",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
                  className: "font-display text-3xl sm:text-4xl font-medium text-paper",
                  children: "Principles by Lamplight",
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "p-6 rounded-lg border border-neon/10 bg-ink-2 space-y-2",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                      className: "font-mono text-neon text-sm",
                      children: "01",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
                      className: "font-display text-xl text-paper",
                      children: "Silence Over Noise",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                      className: "text-xs text-paper-dim leading-relaxed",
                      children: "We prefer one resonant line over ten thousand disposable words.",
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "p-6 rounded-lg border border-neon/10 bg-ink-2 space-y-2",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                      className: "font-mono text-neon text-sm",
                      children: "02",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
                      className: "font-display text-xl text-paper",
                      children: "Physical Weight",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                      className: "text-xs text-paper-dim leading-relaxed",
                      children: "A poem belongs on paper that outlasts the electrical grid.",
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "p-6 rounded-lg border border-neon/10 bg-ink-2 space-y-2",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                      className: "font-mono text-neon text-sm",
                      children: "03",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
                      className: "font-display text-xl text-paper",
                      children: "Intimacy First",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                      className: "text-xs text-paper-dim leading-relaxed",
                      children: "We write to the singular reader reading alone at midnight.",
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "p-6 rounded-lg border border-neon/10 bg-ink-2 space-y-2",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                      className: "font-mono text-neon text-sm",
                      children: "04",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
                      className: "font-display text-xl text-paper",
                      children: "Epistolary Soul",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                      className: "text-xs text-paper-dim leading-relaxed",
                      children: "Every poem is a letter sent into the open weather of the world.",
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "p-6 rounded-lg border border-neon/10 bg-ink-2 space-y-2",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                      className: "font-mono text-neon text-sm",
                      children: "05",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
                      className: "font-display text-xl text-paper",
                      children: "Open Gateways",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                      className: "text-xs text-paper-dim leading-relaxed",
                      children: "We welcome voices everywhere who write with patience and wonder.",
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className:
                    "p-6 rounded-lg border border-neon/10 bg-ink-2 space-y-2 flex flex-col justify-between",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                          className: "font-mono text-neon text-sm",
                          children: "06",
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
                          className: "font-display text-xl text-paper",
                          children: "Your Voice",
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                          className: "text-xs text-paper-dim leading-relaxed",
                          children: "Join our open reading seasons and share your poetry.",
                        }),
                      ],
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
                      to: "/submit",
                      className:
                        "text-xs uppercase tracking-[0.2em] text-neon hover:underline mt-4 inline-block",
                      children: "Submit Poetry →",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
//#endregion
export { AboutPage as component };

import { r as __toESM } from "../_runtime.mjs";
import {
  a as POETS,
  i as POEMS,
  n as COLLECTIONS,
  r as MUSINGS,
  t as CHAPBOOKS,
} from "./literature-qxY3elwu.mjs";
import {
  n as require_jsx_runtime,
  r as require_react,
} from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import {
  C as BookOpen,
  T as ArrowRight,
  a as Share2,
  c as RefreshCw,
  g as Feather,
  h as FileText,
  i as Sparkles,
  l as Quote,
  m as Layers,
  n as Users,
  o as Send,
  w as BookMarked,
  x as Check,
} from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C1gky0un.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var heroLines = [
  "Words that breathe.",
  "Stories that linger.",
  "Verses that remember you.",
  "Written by lamplight.",
];
function MobileLanding() {
  const [lineIndex, setLineIndex] = (0, import_react.useState)(0);
  const [displayed, setDisplayed] = (0, import_react.useState)("");
  const [phase, setPhase] = (0, import_react.useState)("typing");
  const [isPaused, setIsPaused] = (0, import_react.useState)(false);
  const panels = [
    {
      id: "muse-night-image-1",
      type: "image",
      src: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1920&q=80",
      overlay: "bg-black/50 dark:bg-black/50 light:bg-[#f7f5f1]/40",
      title: "Night Study",
    },
    {
      id: "net-grid-1",
      type: "grid",
      overlay: "bg-gradient-to-b from-ink/20 via-ink/40 to-ink/65",
      title: "Letterpress Net Grid",
    },
    {
      id: "muse-night-image-2",
      type: "image",
      src: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1920&q=80",
      overlay: "bg-black/55 dark:bg-black/55 light:bg-[#f7f5f1]/40",
      title: "Nocturnal Paper",
    },
    {
      id: "net-grid-2",
      type: "grid",
      overlay: "bg-gradient-to-b from-ink/20 via-ink/40 to-ink/65",
      title: "Letterpress Blueprint",
    },
    {
      id: "muse-night-image-1-clone",
      type: "image",
      src: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1920&q=80",
      overlay: "bg-black/50 dark:bg-black/50 light:bg-[#f7f5f1]/40",
      title: "Night Study Clone",
      isClone: true,
    },
  ];
  (0, import_react.useEffect)(() => {
    const current = heroLines[lineIndex] ?? heroLines[0];
    if (phase === "typing")
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 45);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("holding"), 1800);
        return () => clearTimeout(t);
      }
    if (phase === "holding") {
      const t = setTimeout(() => setPhase("erasing"), 200);
      return () => clearTimeout(t);
    }
    if (phase === "erasing")
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 25);
        return () => clearTimeout(t);
      } else {
        setLineIndex((prev) => (prev + 1) % heroLines.length);
        setPhase("typing");
      }
  }, [displayed, phase, lineIndex]);
  const coverThemes = [
    {
      gradient: "from-amber-950 via-orange-950 to-stone-900",
      accent: "text-amber-300",
      dot: "bg-amber-400",
      glow: "shadow-amber-950/50",
      border: "border-amber-700/30",
    },
    {
      gradient: "from-teal-950 via-cyan-950 to-stone-900",
      accent: "text-teal-300",
      dot: "bg-teal-400",
      glow: "shadow-teal-950/50",
      border: "border-teal-700/30",
    },
    {
      gradient: "from-rose-950 via-pink-950 to-stone-900",
      accent: "text-rose-300",
      dot: "bg-rose-400",
      glow: "shadow-rose-950/50",
      border: "border-rose-700/30",
    },
    {
      gradient: "from-indigo-950 via-slate-900 to-stone-900",
      accent: "text-indigo-300",
      dot: "bg-indigo-400",
      glow: "shadow-indigo-950/50",
      border: "border-indigo-700/30",
    },
  ];
  const testimonials = [
    {
      quote:
        "The silence between words is where the poem lives. I am always writing toward that silence.",
      author: "Elara Voss",
      work: "Cartographies of Grief",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      rotation: "-rotate-2",
    },
    {
      quote:
        "To write about water is to write about everything that cannot be held — and everything we keep trying to hold anyway.",
      author: "Soren Adeyemi",
      work: "The Glass River",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      rotation: "rotate-1",
    },
    {
      quote:
        "I never know a poem is finished. I only know when I have stopped being able to change it for the better.",
      author: "Elara Voss",
      work: "On Craft",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      rotation: "-rotate-1",
    },
    {
      quote:
        "Memory is the first editor. It cuts what we cannot bear and keeps what we cannot release.",
      author: "Soren Adeyemi",
      work: "A Museum of Unfinished Things",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      rotation: "rotate-2",
    },
    {
      quote:
        "Language is the oldest technology. We forget that every word was once invented — by someone desperate to be understood.",
      author: "Elara Voss",
      work: "The Weight of Dusk",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      rotation: "-rotate-3",
    },
  ];
  const sliderRef = (0, import_react.useRef)(null);
  const [canScrollLeft, setCanScrollLeft] = (0, import_react.useState)(false);
  const [canScrollRight, setCanScrollRight] = (0, import_react.useState)(true);
  const scrollAmount = 460;
  const updateSliderButtons = () => {
    const el = sliderRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(Math.ceil(el.scrollLeft + el.clientWidth) < el.scrollWidth - 1);
  };
  (0, import_react.useEffect)(() => {
    const el = sliderRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateSliderButtons);
    window.addEventListener("resize", updateSliderButtons);
    updateSliderButtons();
    return () => {
      el.removeEventListener("scroll", updateSliderButtons);
      window.removeEventListener("resize", updateSliderButtons);
    };
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: "block md:hidden bg-ink font-karla text-paper selection:bg-neon selection:text-ink",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
        onTouchStart: () => setIsPaused(true),
        onTouchEnd: () => setIsPaused(false),
        onTouchCancel: () => setIsPaused(false),
        onMouseEnter: () => setIsPaused(true),
        onMouseLeave: () => setIsPaused(false),
        className: `hero-slider-container relative min-h-[92vh] flex flex-col justify-between p-4 sm:p-6 overflow-hidden isolate ${isPaused ? "is-paused" : ""}`,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
            className: "absolute inset-0 z-0 overflow-hidden pointer-events-none bg-ink",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
              className: "step-slider-track",
              children: panels.map((panel, idx) =>
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                  "div",
                  {
                    className: "relative h-full w-[100vw] shrink-0 overflow-hidden bg-ink",
                    "aria-hidden": panel.isClone ? "true" : void 0,
                    children: [
                      panel.type === "image"
                        ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
                            src: panel.src,
                            alt: "",
                            className:
                              "absolute inset-0 h-full w-full object-cover object-center transform-gpu",
                            loading: "eager",
                          })
                        : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                            className: "absolute inset-0 bg-ink",
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                                className: "absolute inset-0 gridbg opacity-95",
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                                className:
                                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-neon/15 rounded-full blur-3xl pointer-events-none",
                              }),
                            ],
                          }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                        className: `absolute inset-0 ${panel.overlay}`,
                      }),
                    ],
                  },
                  `${panel.id}-${idx}`,
                ),
              ),
            }),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
            className: "w-full max-w-7xl mx-auto my-auto px-2 sm:px-4 py-8 relative z-10",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className:
                  "mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm px-3.5 py-1 text-xs font-medium text-[#fef08a] shadow-sm",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
                    className: "h-3.5 w-3.5 text-[#fef08a] animate-pulse",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: displayed }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                    className: "inline-block h-3.5 w-0.5 animate-pulse bg-[#fef08a] align-middle",
                  }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
                className:
                  "font-josefin font-bold text-white leading-[1.1] text-[clamp(2.4rem,8vw,4.5rem)] text-balance",
                children: [
                  "Websites that turn words into",
                  " ",
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                    className: "text-[#fef08a] italic font-normal drop-shadow-sm",
                    children: "worlds",
                  }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                className:
                  "mt-4 font-karla text-sm text-stone-200 leading-relaxed max-w-md text-pretty",
                children:
                  "A small lamplit press for poetry, hand-bound chapbooks, and literature from Adaeze Okafor & Theo Lindqvist.",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "mt-6 flex flex-wrap gap-2.5",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
                    to: "/poems",
                    className:
                      "inline-flex items-center gap-1.5 rounded-xl bg-neon px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-ink shadow-lg shadow-neon/20 active:scale-95 transition-all",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feather, {
                        className: "h-3.5 w-3.5",
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                        children: "Read Poems",
                      }),
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
                    to: "/collections",
                    className:
                      "inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-white hover:bg-white/20 active:scale-95 transition-all",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, {
                        className: "h-3.5 w-3.5 text-neon",
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                        children: "Collections",
                      }),
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
                    to: "/books",
                    className:
                      "inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-white hover:bg-white/20 active:scale-95 transition-all",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
                        className: "h-3.5 w-3.5 text-neon",
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                        children: "Chapbooks",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className:
              "w-full max-w-7xl mx-auto flex items-center justify-between pb-1 text-xs z-10",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "flex items-center gap-2",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                    className: "h-1.5 w-1.5 rounded-full bg-neon animate-ping",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                    className: "text-[10px] uppercase tracking-[0.18em] text-stone-300 font-karla",
                    children: "Infinite Reel",
                  }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                className:
                  "bg-white/95 text-[#1E2028] text-[11px] font-semibold px-3.5 py-1.5 rounded-full shadow-md backdrop-blur-sm font-karla",
                children: "Hand-bound by lamplight",
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
        className: "border-y border-neon/15 bg-ink-2/90 px-4 py-4",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "grid grid-cols-4 gap-2 text-center text-xs",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
              to: "/poems",
              className: "flex flex-col items-center",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                  className: "font-display text-lg font-medium text-neon",
                  children: POEMS.length,
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                  className: "text-[10px] uppercase tracking-[0.12em] text-paper-dim",
                  children: "Poems",
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
              to: "/collections",
              className: "flex flex-col items-center",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                  className: "font-display text-lg font-medium text-amber-300",
                  children: COLLECTIONS.length,
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                  className: "text-[10px] uppercase tracking-[0.12em] text-paper-dim",
                  children: "Suites",
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
              to: "/books",
              className: "flex flex-col items-center",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                  className: "font-display text-lg font-medium text-rose-300",
                  children: CHAPBOOKS.length,
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                  className: "text-[10px] uppercase tracking-[0.12em] text-paper-dim",
                  children: "Books",
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
              to: "/about",
              className: "flex flex-col items-center",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                  className: "font-display text-lg font-medium text-paper",
                  children: "2",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                  className: "text-[10px] uppercase tracking-[0.12em] text-paper-dim",
                  children: "Poets",
                }),
              ],
            }),
          ],
        }),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
        className: "px-5 py-12 space-y-6",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "flex items-baseline justify-between border-b border-neon/10 pb-3",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                    className: "text-[10px] font-medium uppercase tracking-[0.22em] text-neon",
                    children: "Selected Works",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
                    className: "font-display text-2xl text-paper font-medium mt-0.5",
                    children: "Verses by Lamplight",
                  }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
                to: "/poems",
                className: "text-[11px] uppercase tracking-[0.16em] text-neon font-medium",
                children: ["All ", POEMS.length, " →"],
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
            className: "grid grid-cols-2 gap-3.5",
            children: POEMS.slice(0, 4).map((poem, index) => {
              const theme = coverThemes[index % coverThemes.length] ?? coverThemes[0];
              return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                Link,
                {
                  to: "/poems/$id",
                  params: { id: poem.id },
                  className:
                    "group relative flex flex-col text-left active:scale-[0.98] transition-transform",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                      className: `relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br ${theme.gradient} border ${theme.border} p-3.5 flex flex-col justify-between shadow-lg ${theme.glow}`,
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                          className: "absolute left-0 top-0 h-full w-1.5 bg-black/40",
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                          className: "flex items-center gap-1.5",
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                              className: `h-1.5 w-1.5 rounded-full ${theme.dot}`,
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                              className: `text-[9px] font-medium uppercase tracking-[0.18em] ${theme.accent}`,
                              children: poem.collection.split(" ")[0],
                            }),
                          ],
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
                              className:
                                "font-display text-base font-medium leading-tight text-paper group-hover:text-neon transition-colors line-clamp-2",
                              children: poem.title,
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
                              className: "mt-1 text-[10px] text-paper-dim/80 truncate",
                              children: [poem.author.split(" ")[0], " · ", poem.readTime],
                            }),
                          ],
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                          className: "pt-1 flex justify-end",
                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                            className:
                              "text-[9px] uppercase tracking-[0.14em] text-neon font-medium bg-black/40 px-2 py-0.5 rounded-full border border-white/10",
                            children: "Read",
                          }),
                        }),
                      ],
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
                      className:
                        "mt-2 text-[11px] text-paper-dim/90 font-serif italic line-clamp-2 leading-snug px-0.5",
                      children: ["“", poem.stanzas[0]?.[0], "”"],
                    }),
                  ],
                },
                poem.id,
              );
            }),
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
        className: "bg-ink overflow-hidden",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
            className: "px-5 pt-12 pb-8",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "flex items-end justify-between mb-2",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                      className:
                        "text-amber-300 text-[10px] font-bold tracking-[0.4em] uppercase block mb-3",
                      children: "// In Their Words",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
                      className:
                        "font-display text-[clamp(2rem,7vw,3.5rem)] font-semibold text-paper leading-[1.15]",
                      children: [
                        "Voices from",
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                          className: "italic font-light text-paper-dim",
                          children: "the page",
                        }),
                      ],
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "flex gap-2 shrink-0",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
                      type: "button",
                      onClick: () =>
                        sliderRef.current?.scrollBy({
                          left: -460,
                          behavior: "smooth",
                        }),
                      disabled: !canScrollLeft,
                      className:
                        "w-9 h-9 rounded-full border border-neon/30 flex items-center justify-center text-neon hover:border-neon hover:bg-neon/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed",
                      "aria-label": "Previous quote",
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
                        width: "14",
                        height: "14",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
                          d: "M19 12H5M12 5l-7 7 7 7",
                        }),
                      }),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
                      type: "button",
                      onClick: () =>
                        sliderRef.current?.scrollBy({
                          left: scrollAmount,
                          behavior: "smooth",
                        }),
                      disabled: !canScrollRight,
                      className:
                        "w-9 h-9 rounded-full bg-neon text-ink flex items-center justify-center hover:bg-amber-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed",
                      "aria-label": "Next quote",
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
                        width: "14",
                        height: "14",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
                          d: "M5 12h14M12 5l7 7-7 7",
                        }),
                      }),
                    }),
                  ],
                }),
              ],
            }),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "relative",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                className:
                  "pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent z-10",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                className:
                  "pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent z-10",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                ref: sliderRef,
                className: "flex gap-4 overflow-x-auto pb-6 px-5",
                style: {
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                },
                children: testimonials.map((item, idx) =>
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                    "article",
                    {
                      className: `min-w-[280px] sm:min-w-[340px] max-w-[380px] shrink-0 rounded-2xl border border-white/10 bg-ink-2/70 backdrop-blur-xl p-6 shadow-2xl shadow-black/40 ${item.rotation} transition-transform duration-300 hover:scale-[1.03] hover:shadow-neon/10 relative`,
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                          className:
                            "absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none",
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                          className:
                            "font-display text-5xl text-neon/25 leading-none mb-2 select-none",
                          children: '"',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                          className:
                            "font-display italic text-paper-dim text-base leading-relaxed mb-5 relative",
                          children: item.quote,
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                          className: "flex items-center gap-3 relative",
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                              className:
                                "h-10 w-10 rounded-xl overflow-hidden shrink-0 border border-neon/20",
                              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
                                alt: item.author,
                                className: "h-full w-full object-cover",
                                src: item.image,
                              }),
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                                  className: "text-sm font-semibold text-paper",
                                  children: item.author,
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                                  className: "text-[11px] text-paper-faint",
                                  children: item.work,
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    },
                    idx,
                  ),
                ),
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
        className:
          "border-t border-neon/15 bg-gradient-to-b from-ink-2 to-ink px-5 py-12 space-y-6",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "text-center space-y-1",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                className: "text-[10px] font-medium uppercase tracking-[0.25em] text-neon",
                children: "The Writers",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
                className: "font-display text-2xl sm:text-3xl font-medium text-paper",
                children: "Two Voices, One Lamp",
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
            className: "space-y-4",
            children: Object.values(POETS).map((poet, i) =>
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "div",
                {
                  className: `rounded-xl border border-neon/15 bg-gradient-to-br ${i === 0 ? "from-amber-950/40 to-ink-2" : "from-teal-950/40 to-ink-2"} p-5 space-y-3 shadow-md`,
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                      className: "flex items-center gap-3",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                          className:
                            "h-10 w-10 rounded-full bg-neon/10 border border-neon/30 flex items-center justify-center shrink-0",
                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feather, {
                            className: "h-4 w-4 text-neon",
                          }),
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
                              className: "font-display text-xl text-paper font-medium",
                              children: poet.name,
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
                              className:
                                "text-[11px] uppercase tracking-[0.15em] text-neon/80 font-medium",
                              children: [poet.role, " · ", poet.location.split("&")[0]],
                            }),
                          ],
                        }),
                      ],
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                      className: "text-xs text-paper-dim leading-relaxed",
                      children: poet.bio,
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                      className:
                        "pt-2 flex justify-between items-center text-[11px] uppercase tracking-[0.14em]",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                          className: "text-paper-faint",
                          children: poet.works[0] ?? "",
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
                          to: "/about",
                          className: "text-neon hover:underline font-medium",
                          children: "Bio →",
                        }),
                      ],
                    }),
                  ],
                },
                poet.id,
              ),
            ),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "p-4 rounded-xl border border-neon/10 bg-ink text-center space-y-2",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, {
                className: "h-4 w-4 text-neon mx-auto opacity-70",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                className: "font-display text-sm italic text-paper-dim leading-relaxed",
                children:
                  "“We do not write to be found. We write to leave the light on for whoever passes at midnight.”",
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
        className: "border-t border-neon/10 px-5 py-10 text-center space-y-4 bg-ink-2",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className:
              "inline-flex items-center gap-1.5 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-neon",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-3 w-3" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Call for Poetry" }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
            className: "font-display text-2xl font-medium text-paper",
            children: "Do You Write by Lamplight?",
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
            className: "text-xs text-paper-dim leading-relaxed max-w-xs mx-auto",
            children: "We welcome standalone poems and chapbook manuscripts. No reading fees.",
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
            to: "/submit",
            className:
              "inline-flex items-center gap-2 rounded-full bg-neon px-6 py-2.5 text-xs uppercase tracking-[0.18em] font-medium text-ink shadow-md active:scale-95 transition-all",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Submit Your Work" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" }),
            ],
          }),
        ],
      }),
    ],
  });
}
function Index() {
  const [poemIndex, setPoemIndex] = (0, import_react.useState)(0);
  const [copiedSnippet, setCopiedSnippet] = (0, import_react.useState)(false);
  const [isPaused, setIsPaused] = (0, import_react.useState)(false);
  const desktopPanels = [
    {
      id: "desktop-night-1",
      type: "image",
      src: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1920&q=80",
      title: "Night Study",
    },
    {
      id: "desktop-grid-1",
      type: "grid",
      title: "Letterpress Grid",
    },
    {
      id: "desktop-night-2",
      type: "image",
      src: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1920&q=80",
      title: "Nocturnal Paper",
    },
    {
      id: "desktop-grid-2",
      type: "grid",
      title: "Letterpress Blueprint",
    },
    {
      id: "desktop-night-1-clone",
      type: "image",
      src: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1920&q=80",
      title: "Night Study Clone",
      isClone: true,
    },
  ];
  const activePoem = POEMS[poemIndex % POEMS.length] ?? POEMS[0];
  const featuredPoem = POEMS.find((p) => p.featured) ?? POEMS[0];
  const featuredBook = CHAPBOOKS[0];
  const recentMusing = MUSINGS[0];
  const handleShuffleVerse = () => {
    setPoemIndex((prev) => (prev + 1) % POEMS.length);
  };
  const handleCopyVerse = () => {
    const text = `"${(activePoem.stanzas[0]?.slice(0, 3) ?? []).join("\n")}"\n— ${activePoem.author}, ${activePoem.title}\n(via Muse Books)`;
    navigator.clipboard.writeText(text);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2e3);
  };
  const portals = [
    {
      title: "Poem Library",
      desc: "An open archive of standalone verses, epistles, and nocturnal observations.",
      to: "/poems",
      count: `${POEMS.length} Poems`,
      icon: BookOpen,
      action: "Browse poems",
      badge: "Fast 1-min reads",
    },
    {
      title: "Collections",
      desc: "Curated suites and seasonal anthologies charting inner and outer weather.",
      to: "/collections",
      count: "4 Volumes",
      icon: Layers,
      action: "Explore suites",
      badge: "Curated suites",
    },
    {
      title: "Hand-Bound Chapbooks",
      desc: "Limited letterpress editions printed on mould-made rag paper using metal type.",
      to: "/books",
      count: "Albion Press",
      icon: BookMarked,
      action: "View editions",
      badge: "Numbered printings",
    },
    {
      title: "Musings & Essays",
      desc: "Reflections on poetic craft, letterpress method, and the art of midnight writing.",
      to: "/musings",
      count: `${MUSINGS.length} Dispatches`,
      icon: FileText,
      action: "Read journal",
      badge: "Craft notes",
    },
    {
      title: "The Press & Poets",
      desc: "The story of Adaeze Okafor and Theo Lindqvist, our shared lamp, and letterpress studio.",
      to: "/about",
      count: "Edinburgh & Stockholm",
      icon: Users,
      action: "Meet the poets",
      badge: "Biographies",
    },
    {
      title: "Submissions",
      desc: "We read standalone poems, suites, and chapbook manuscripts on a rolling basis.",
      to: "/submit",
      count: "Open year-round",
      icon: Feather,
      action: "Submit manuscript",
      badge: "No reading fees",
    },
  ];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: "space-y-0 overflow-hidden",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileLanding, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: "hidden md:block",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
            onMouseEnter: () => setIsPaused(true),
            onMouseLeave: () => setIsPaused(false),
            onTouchStart: () => setIsPaused(true),
            onTouchEnd: () => setIsPaused(false),
            className: `hero-slider-container border-b border-neon/10 py-16 lg:py-24 relative overflow-hidden min-h-[500px] flex items-center isolate ${isPaused ? "is-paused" : ""}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                className: "absolute inset-0 -z-20 overflow-hidden pointer-events-none bg-ink",
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                  className: "step-slider-track",
                  children: desktopPanels.map((panel, idx) =>
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                      "div",
                      {
                        className: "relative h-full w-[100vw] shrink-0 overflow-hidden bg-ink",
                        "aria-hidden": panel.isClone ? "true" : void 0,
                        children: [
                          panel.type === "image"
                            ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
                                src: panel.src,
                                alt: "",
                                className:
                                  "absolute inset-0 h-full w-full object-cover object-center transform-gpu",
                                loading: "eager",
                              })
                            : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                                className: "absolute inset-0 bg-ink",
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                                    className: "absolute inset-0 gridbg opacity-95",
                                  }),
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                                    className:
                                      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon/15 rounded-full blur-3xl",
                                  }),
                                ],
                              }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                            className: "absolute inset-0 bg-ink/70",
                          }),
                        ],
                      },
                      `${panel.id}-${idx}`,
                    ),
                  ),
                }),
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                className: "mx-auto max-w-[1240px] px-6 lg:px-10 w-full relative z-10",
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "grid grid-cols-12 gap-10 items-end",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                      className: "col-span-8",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                          className:
                            "inline-flex max-w-full items-center gap-1.5 sm:gap-2 mb-4 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-[11px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.25em] text-neon font-medium shadow-sm",
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
                              className: "h-3 w-3 shrink-0 animate-pulse text-neon",
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                              className: "truncate",
                              children: "Small Press for Verse & Literature",
                            }),
                          ],
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
                          className:
                            "reveal d1 font-display text-[clamp(4rem,9vw,7.5rem)] leading-[0.92] font-medium tracking-[-0.02em] text-paper text-balance",
                          children: "Muse Books",
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                          className:
                            "reveal d2 mt-6 font-display text-2xl lg:text-3xl text-paper-dim italic max-w-[28ch] leading-snug",
                          children:
                            "“We do not write to be found. We write to leave the light on.”",
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                          className: "mt-8 flex items-center gap-2",
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                              className: "h-2 w-2 rounded-full bg-neon animate-ping",
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                              className:
                                "text-xs uppercase tracking-[0.2em] text-paper-dim font-mono",
                              children: "Continuous Lamplight Reel",
                            }),
                          ],
                        }),
                      ],
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                      className: "reveal d3 col-span-4 pl-8 border-l border-neon/15",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
                          className: "text-sm leading-relaxed text-paper-dim text-pretty",
                          children: [
                            "Dedicated pages for poems, seasonal collections, physical chapbooks, and essays from",
                            " ",
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
                              to: "/about",
                              className: "text-paper hover:text-neon underline underline-offset-4",
                              children: "Adaeze Okafor",
                            }),
                            " ",
                            "and",
                            " ",
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
                              to: "/about",
                              className: "text-paper hover:text-neon underline underline-offset-4",
                              children: "Theo Lindqvist",
                            }),
                            ".",
                          ],
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                          className: "mt-6 flex gap-3",
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
                              to: "/poems",
                              className:
                                "inline-flex items-center gap-2 rounded bg-neon px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-ink transition-all hover:bg-neon/90 shadow-md",
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
                                  className: "h-4 w-4",
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                                  children: "Explore Library",
                                }),
                              ],
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
                              to: "/submit",
                              className:
                                "inline-flex items-center gap-2 rounded border border-neon/30 bg-ink-2/60 px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-paper transition-all hover:bg-neon/10",
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feather, {
                                  className: "h-4 w-4",
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                                  children: "Submit Work",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
            className:
              "border-b border-neon/10 bg-gradient-to-b from-ink-2/80 to-ink py-10 sm:py-16",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
              className: "mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className:
                  "rounded-2xl border border-neon/20 bg-ink-2/90 p-5 sm:p-10 shadow-xl relative overflow-hidden",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                    className:
                      "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neon/10",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                        className:
                          "flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-neon font-medium",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, {
                            className: "h-4 w-4 text-neon",
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                            children: "Verse of the Hour · Tap to shuffle",
                          }),
                        ],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
                            type: "button",
                            onClick: handleCopyVerse,
                            className:
                              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neon/20 bg-ink text-xs uppercase tracking-[0.15em] text-paper-dim hover:text-paper active:scale-95 transition-all",
                            children: copiedSnippet
                              ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                  import_jsx_runtime.Fragment,
                                  {
                                    children: [
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
                                        className: "h-3.5 w-3.5 text-neon",
                                      }),
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                                        className: "text-neon",
                                        children: "Copied",
                                      }),
                                    ],
                                  },
                                )
                              : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                  import_jsx_runtime.Fragment,
                                  {
                                    children: [
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, {
                                        className: "h-3.5 w-3.5",
                                      }),
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                                        children: "Share",
                                      }),
                                    ],
                                  },
                                ),
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
                            type: "button",
                            onClick: handleShuffleVerse,
                            className:
                              "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neon text-ink text-xs uppercase tracking-[0.16em] font-medium hover:bg-neon/90 active:scale-95 transition-all shadow-sm",
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
                                className: "h-3.5 w-3.5",
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                                children: "Next Verse",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                    className: "py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                        className: "lg:col-span-8",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
                            className: "text-xs uppercase tracking-[0.2em] text-paper-faint mb-2",
                            children: ["From “", activePoem.title, "” · ", activePoem.readTime],
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                            className:
                              "font-display text-2xl sm:text-3xl text-paper leading-[1.6] space-y-2 italic",
                            children: (activePoem.stanzas[0] ?? [])
                              .slice(0, 3)
                              .map((line, lIdx) =>
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                  "p",
                                  { children: ["“", line, "”"] },
                                  lIdx,
                                ),
                              ),
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
                            className:
                              "mt-4 text-xs uppercase tracking-[0.2em] text-neon/80 font-medium",
                            children: ["— ", activePoem.author, " (", activePoem.year, ")"],
                          }),
                        ],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                        className:
                          "lg:col-span-4 lg:border-l lg:border-neon/15 lg:pl-8 flex flex-col justify-between gap-4",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                            className: "text-xs sm:text-sm text-paper-dim leading-relaxed",
                            children:
                              activePoem.note ||
                              "Hand-printed under single lamplight for readers who take time.",
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
                            to: "/poems/$id",
                            params: { id: activePoem.id },
                            className:
                              "inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neon inkline font-medium",
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                                children: "Read full poem in reader",
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
                                className: "h-3.5 w-3.5",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
            className: "mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10 py-16 sm:py-20",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className:
                  "flex flex-col sm:flex-row sm:items-baseline justify-between mb-10 gap-2 border-b border-neon/10 pb-6",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                        className:
                          "text-[11px] uppercase tracking-[0.28em] text-neon/80 font-medium",
                        children: "Navigation Portal",
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
                        className: "font-display text-3xl sm:text-4xl font-medium text-paper mt-1",
                        children: "Explore Our Literary Pages",
                      }),
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                    className: "text-xs uppercase tracking-[0.2em] text-paper-faint",
                    children: "Independent Pages & Archives",
                  }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
                children: portals.map((portal) => {
                  const Icon = portal.icon;
                  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                    Link,
                    {
                      to: portal.to,
                      className:
                        "group rounded-xl border border-neon/15 bg-ink-2 p-6 flex flex-col justify-between transition-all hover:border-neon/40 hover:-translate-y-1 hover:shadow-lg",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                              className:
                                "flex items-center justify-between text-xs text-paper-faint uppercase tracking-[0.2em] mb-4",
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                                  className:
                                    "p-2.5 rounded-md bg-ink border border-neon/20 text-neon group-hover:bg-neon group-hover:text-ink transition-colors",
                                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
                                    className: "h-4 w-4",
                                  }),
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                                  children: portal.count,
                                }),
                              ],
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
                              className:
                                "font-display text-2xl font-medium text-paper group-hover:text-neon transition-colors",
                              children: portal.title,
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                              className: "mt-2.5 text-xs sm:text-sm text-paper-dim leading-relaxed",
                              children: portal.desc,
                            }),
                          ],
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                          className:
                            "mt-6 pt-4 border-t border-neon/10 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-neon font-medium",
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                              children: portal.action,
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
                              className:
                                "h-3.5 w-3.5 group-hover:translate-x-1 transition-transform",
                            }),
                          ],
                        }),
                      ],
                    },
                    portal.to,
                  );
                }),
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
            className: "bg-ink-2/60 border-y border-neon/10 py-16 sm:py-24",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
              className: "mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                    className: "col-span-12 lg:col-span-4 space-y-4",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                        className:
                          "text-[11px] uppercase tracking-[0.28em] text-neon/80 font-medium",
                        children: "Poem of the Season",
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
                        className:
                          "font-display text-3xl sm:text-5xl font-medium text-paper leading-tight",
                        children: featuredPoem.title,
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
                        className: "text-xs uppercase tracking-[0.2em] text-paper-faint",
                        children: [
                          "By ",
                          featuredPoem.author,
                          " · ",
                          featuredPoem.linesCount,
                          " lines ·",
                          " ",
                          featuredPoem.readTime,
                        ],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                        className: "text-sm text-paper-dim leading-relaxed pt-2",
                        children: featuredPoem.note,
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                        className: "pt-2",
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
                          to: "/poems/$id",
                          params: { id: featuredPoem.id },
                          className:
                            "inline-flex items-center gap-2 rounded bg-neon px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium text-ink hover:bg-neon/90 transition-all",
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
                              className: "h-3.5 w-3.5",
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                              children: "Enter Reading Room",
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
                              className: "h-3.5 w-3.5",
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                    className: "col-span-12 lg:col-span-8 lg:border-l lg:border-neon/15 lg:pl-10",
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                      className:
                        "font-display text-xl sm:text-2xl text-paper leading-[1.7] space-y-4 bg-ink p-6 sm:p-8 rounded-xl border border-neon/15 shadow-inner",
                      children: [
                        featuredPoem.stanzas.slice(0, 2).map((stanza, idx) =>
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                            "div",
                            {
                              className: "space-y-1",
                              children: stanza.map((line, lIdx) =>
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                  "p",
                                  { children: line },
                                  lIdx,
                                ),
                              ),
                            },
                            idx,
                          ),
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                          className: "pt-4 text-right",
                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
                            to: "/poems/$id",
                            params: { id: featuredPoem.id },
                            className:
                              "text-xs uppercase tracking-[0.2em] text-neon hover:underline",
                            children: "Read complete poem with reader controls →",
                          }),
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
            className: "mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10 py-16 sm:py-24",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-8",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
                  className:
                    "rounded-xl border border-neon/15 bg-ink-2 p-6 sm:p-8 flex flex-col justify-between",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                          className:
                            "flex items-center justify-between text-xs text-neon/80 uppercase tracking-[0.2em] mb-4",
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                              children: "Featured Letterpress Edition",
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                              className: "font-mono text-paper font-medium",
                              children: featuredBook.price,
                            }),
                          ],
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
                          className: "font-display text-3xl font-medium text-paper",
                          children: featuredBook.title,
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
                          className: "mt-1 text-xs uppercase tracking-[0.18em] text-paper-faint",
                          children: [
                            "By ",
                            featuredBook.author,
                            " · ",
                            featuredBook.pages,
                            " Pages",
                          ],
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                          className: "mt-4 text-sm text-paper-dim leading-relaxed",
                          children: featuredBook.description,
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
                          className:
                            "mt-4 p-3 rounded bg-ink text-xs italic text-paper-dim border-l-2 border-neon/40",
                          children: ["“", featuredBook.quote, "”"],
                        }),
                      ],
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                      className:
                        "mt-6 pt-4 border-t border-neon/10 flex items-center justify-between",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                          className: "text-xs text-paper-faint",
                          children: "Hand-numbered copies",
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
                          to: "/books/$id",
                          params: { id: featuredBook.id },
                          className:
                            "text-xs uppercase tracking-[0.2em] text-neon inkline font-medium inline-flex items-center gap-1.5",
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                              children: "Book Details & Order",
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
                              className: "h-3.5 w-3.5",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
                  className:
                    "rounded-xl border border-neon/15 bg-ink-2 p-6 sm:p-8 flex flex-col justify-between",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                          className:
                            "flex items-center justify-between text-xs text-neon/80 uppercase tracking-[0.2em] mb-4",
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                              children: "From the Literary Journal",
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                              children: recentMusing.readTime,
                            }),
                          ],
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
                          className: "font-display text-3xl font-medium text-paper",
                          children: recentMusing.title,
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
                          className: "mt-1 text-xs uppercase tracking-[0.18em] text-paper-faint",
                          children: ["By ", recentMusing.author, " · ", recentMusing.date],
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                          className: "mt-4 text-sm text-paper-dim leading-relaxed",
                          children: recentMusing.excerpt,
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
                          className:
                            "mt-4 p-3 rounded bg-ink text-xs italic text-paper-dim border-l-2 border-neon/40",
                          children: ["“", recentMusing.content[0], "”"],
                        }),
                      ],
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                      className:
                        "mt-6 pt-4 border-t border-neon/10 flex items-center justify-between",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                          className: "text-xs text-paper-faint",
                          children: recentMusing.category,
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
                          to: "/musings/$id",
                          params: { id: recentMusing.id },
                          className:
                            "text-xs uppercase tracking-[0.2em] text-neon inkline font-medium inline-flex items-center gap-1.5",
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                              children: "Read Full Essay",
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
                              className: "h-3.5 w-3.5",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
            className: "border-t border-neon/10 py-16 bg-gradient-to-b from-ink to-ink-2",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
              className: "mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10 text-center",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "mx-auto max-w-2xl space-y-4",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                    className:
                      "inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-neon",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feather, {
                        className: "h-3 w-3",
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                        children: "Call for Writers",
                      }),
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
                    className: "font-display text-3xl sm:text-5xl font-medium text-paper",
                    children: "Do You Write by Lamplight?",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                    className:
                      "text-sm sm:text-base text-paper-dim leading-relaxed max-w-xl mx-auto",
                    children:
                      "We welcome submissions of standalone poems, chapbook suites, and craft essays from poets and writers worldwide.",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                    className: "pt-4 flex flex-wrap justify-center gap-4",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
                        to: "/submit",
                        className:
                          "inline-flex items-center gap-2 rounded bg-neon px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-ink hover:bg-neon/90 transition-all",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                            children: "Submit Your Manuscript",
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
                            className: "h-3.5 w-3.5",
                          }),
                        ],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
                        to: "/about",
                        className:
                          "inline-flex items-center gap-2 rounded border border-neon/30 px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-paper hover:bg-neon/10 transition-all",
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                          children: "About Our Press",
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
    ],
  });
}
//#endregion
export { Index as component };

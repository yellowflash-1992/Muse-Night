import { r as __toESM } from "../_runtime.mjs";
import { i as POEMS } from "./literature-qxY3elwu.mjs";
import {
  n as require_jsx_runtime,
  r as require_react,
  t as QueryClientProvider,
} from "../_libs/react+tanstack__react-query.mjs";
import {
  _ as useRouter,
  c as HeadContent,
  d as createRouter,
  f as Outlet,
  g as Link,
  h as createRootRouteWithContext,
  l as useRouterState,
  m as createFileRoute,
  p as lazyRouteComponent,
  s as Scripts,
} from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$8 } from "../_id-DBGFn7oI.mjs";
import {
  C as BookOpen,
  d as Moon,
  g as Feather,
  h as FileText,
  i as Sparkles,
  m as Layers,
  n as Users,
  p as Mail,
  r as Sun,
  t as X,
  x as Check,
} from "../_libs/lucide-react.mjs";
import { t as Route$9 } from "../_id-B5BexOYf.mjs";
import { t as Route$10 } from "../_id-DXOQLRRr.mjs";
import { t as Route$11 } from "../_id-CrZ2GHCE.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CdSHRIIW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-m_EHsum6.css";
/**
 * Standard Application Error Reporting
 * Works standalone in production, local dev, Docker, GitHub Pages, Vercel, Netlify, and Cloudflare.
 */
function reportAppError(error, context = {}) {
  if (typeof window === "undefined") return;
  const message =
    error instanceof Response
      ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`
      : error instanceof Error
        ? error.message
        : String(error);
  const stack = error instanceof Error ? error.stack : void 0;
  console.error("[App Error]", {
    message,
    stack,
    route: window.location.pathname,
    ...context,
  });
}
function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = (0, import_react.useState)("dark");
  const [mounted, setMounted] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    setMounted(true);
    const initialTheme = localStorage.getItem("muse-theme") || "dark";
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);
  const applyTheme = (t) => {
    const root = document.documentElement;
    if (t === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
    }
  };
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("muse-theme", next);
    applyTheme(next);
  };
  if (!mounted)
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
      className: `h-9 w-9 rounded-full border border-neon/20 bg-ink-2/80 ${className}`,
      "aria-hidden": "true",
    });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
    type: "button",
    onClick: toggleTheme,
    "aria-label":
      theme === "dark" ? "Switch to Sunlit Florentine mode" : "Switch to Midnight Lamplight mode",
    title:
      theme === "dark"
        ? "Switch to Sunlit Florentine (Light Mode)"
        : "Switch to Midnight Lamplight (Dark Mode)",
    className: `group relative inline-flex h-9 items-center gap-2 rounded-full border border-neon/30 bg-ink-2 px-3 py-1.5 text-xs font-medium text-paper transition-all hover:border-neon hover:shadow-md active:scale-95 ${className}`,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        className: "relative flex h-4 w-4 items-center justify-center",
        children:
          theme === "dark"
            ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, {
                className:
                  "h-4 w-4 text-neon transition-transform duration-300 group-hover:-rotate-12",
              })
            : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, {
                className:
                  "h-4 w-4 text-amber-500 transition-transform duration-300 group-hover:rotate-45",
              }),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
        className:
          "text-[10px] uppercase tracking-[0.2em] text-paper-dim group-hover:text-paper hidden sm:inline",
        children: theme === "dark" ? "Midnight" : "Sunlit",
      }),
    ],
  });
}
function Navbar() {
  const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
  const currentPath = useRouterState().location.pathname;
  const links = [
    {
      to: "/poems",
      label: "Poems",
      icon: Feather,
      color: "text-amber-400",
      count: `${POEMS.length} poems`,
    },
    {
      to: "/collections",
      label: "Collections",
      icon: Layers,
      color: "text-teal-400",
      count: "4 volumes",
    },
    {
      to: "/books",
      label: "Chapbooks",
      icon: BookOpen,
      color: "text-rose-400",
      count: "Albion Press",
    },
    {
      to: "/musings",
      label: "Musings",
      icon: FileText,
      color: "text-indigo-400",
      count: "Craft notes",
    },
    {
      to: "/about",
      label: "About",
      icon: Users,
      color: "text-stone-300",
      count: "The Poets",
    },
    {
      to: "/submit",
      label: "Submit",
      icon: Sparkles,
      color: "text-neon",
      count: "Open call",
    },
  ];
  const isActive = (to) => {
    if (to === "/") return currentPath === "/";
    return currentPath.startsWith(to);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
        className:
          "hidden md:block sticky top-0 z-50 bg-ink/90 backdrop-blur-md border-b border-neon/10 transition-colors",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "mx-auto max-w-[1240px] px-6 sm:px-10",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className:
                "flex items-center justify-between py-2 text-[10px] uppercase tracking-[0.28em] text-paper-faint border-b border-neon/5",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                  children: "Vol. II — Winter 2024",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                  children: "A Small Press for Two Poets & Literary Works",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                  children: "Est. Edinburgh & Stockholm",
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "flex items-center justify-between py-4",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
                  to: "/",
                  className: "group flex items-center gap-3 transition-transform hover:opacity-95",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                      className:
                        "flex h-9 w-9 items-center justify-center rounded-sm bg-neon/10 border border-neon/30 text-neon group-hover:bg-neon/20 transition-all",
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feather, {
                        className: "h-4 w-4",
                      }),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                          className:
                            "font-display text-2xl sm:text-3xl font-medium tracking-[-0.01em] text-paper block leading-none",
                          children: "Muse Books",
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                          className:
                            "text-[9px] uppercase tracking-[0.25em] text-neon/70 block mt-1",
                          children: "Poetry & Literature",
                        }),
                      ],
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
                  className: "flex items-center gap-7",
                  children: links.map((link) => {
                    const active = isActive(link.to);
                    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                      Link,
                      {
                        to: link.to,
                        className: `text-xs uppercase tracking-[0.22em] transition-all relative py-1 ${active ? "text-neon font-medium" : "text-paper-dim hover:text-paper inkline"}`,
                        children: [
                          link.label,
                          active &&
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                              className:
                                "absolute -bottom-1 left-0 right-0 h-[1.5px] bg-neon rounded-full",
                            }),
                        ],
                      },
                      link.to,
                    );
                  }),
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "flex items-center gap-3",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
                      to: "/poems",
                      className:
                        "inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/5 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] text-neon transition-all hover:bg-neon/15 hover:border-neon",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
                          className: "h-3.5 w-3.5",
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                          children: "Read Poems",
                        }),
                      ],
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        className: "block md:hidden sticky top-3 z-50 px-4 py-1 pointer-events-none",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
          className:
            "w-full max-w-7xl mx-auto bg-ink-2/95 backdrop-blur-md rounded-2xl px-5 py-3 flex items-center justify-between shadow-2xl border border-neon/20 pointer-events-auto",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
              to: "/",
              className:
                "font-josefin text-xl font-bold tracking-tight text-paper flex items-center gap-2",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                  className:
                    "flex h-7 w-7 items-center justify-center rounded-lg bg-neon/15 border border-neon/40 text-neon",
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feather, {
                    className: "h-4 w-4",
                  }),
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "muse night" }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "flex items-center gap-3",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
                  to: "/poems",
                  className:
                    "font-karla text-xs sm:text-sm font-semibold text-ink bg-neon hover:bg-neon/90 px-3.5 sm:px-4 py-2 rounded-xl transition-all shadow-md active:scale-95",
                  children: "Start reading",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
                  type: "button",
                  "aria-label": "Open mobile menu",
                  onClick: () => setMobileOpen(true),
                  className:
                    "p-2 text-paper hover:bg-neon/10 rounded-xl transition-all active:scale-95 focus:outline-none",
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: "2",
                    stroke: "currentColor",
                    className: "w-6 h-6",
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5",
                    }),
                  }),
                }),
              ],
            }),
          ],
        }),
      }),
      mobileOpen &&
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
          className:
            "md:hidden fixed inset-0 z-50 bg-ink/80 backdrop-blur-md flex flex-col p-4 animate-[fadeIn_0.2s_ease-out]",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className:
              "w-full max-w-md mx-auto bg-ink-2 border border-neon/20 rounded-2xl p-5 shadow-2xl flex flex-col justify-between h-full max-h-[92vh] overflow-y-auto",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "space-y-5",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                    className: "flex items-center justify-between border-b border-neon/10 pb-3.5",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                            className:
                              "flex h-7 w-7 items-center justify-center rounded-lg bg-neon/20 text-neon",
                            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feather, {
                              className: "h-4 w-4",
                            }),
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                            className: "font-josefin text-xl font-bold text-paper",
                            children: "muse night",
                          }),
                        ],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
                        type: "button",
                        onClick: () => setMobileOpen(false),
                        className:
                          "p-1.5 rounded-full hover:bg-neon/10 text-paper-dim hover:text-paper",
                        "aria-label": "Close menu",
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
                          className: "w-6 h-6",
                        }),
                      }),
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
                    className: "flex flex-col gap-2 font-karla text-sm",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
                        to: "/",
                        onClick: () => setMobileOpen(false),
                        className: `flex items-center justify-between p-3 rounded-xl transition-colors ${currentPath === "/" ? "bg-neon/20 text-neon font-semibold border border-neon/30" : "bg-ink/50 hover:bg-neon/5 text-paper font-medium"}`,
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                            className: "flex items-center gap-3",
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
                                className: "h-4 w-4 text-neon",
                              }),
                              "Home Masthead",
                            ],
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                            className: "text-xs text-paper-faint",
                            children: "→",
                          }),
                        ],
                      }),
                      links.map((link) => {
                        const Icon = link.icon;
                        const active = isActive(link.to);
                        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                          Link,
                          {
                            to: link.to,
                            onClick: () => setMobileOpen(false),
                            className: `flex items-center justify-between p-3 rounded-xl transition-colors ${active ? "bg-neon/20 text-neon font-semibold border border-neon/30" : "bg-ink/50 hover:bg-neon/5 text-paper font-medium"}`,
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                                className: "flex items-center gap-3",
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
                                    className: `h-4 w-4 ${link.color}`,
                                  }),
                                  link.label,
                                ],
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                                className: "text-xs text-paper-faint",
                                children: link.count,
                              }),
                            ],
                          },
                          link.to,
                        );
                      }),
                    ],
                  }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "pt-5 border-t border-neon/10 space-y-3",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                    className: "flex items-center justify-between",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                        className: "text-xs text-paper-dim uppercase tracking-widest font-karla",
                        children: "Theme Light/Dark",
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
                    to: "/submit",
                    onClick: () => setMobileOpen(false),
                    className:
                      "block text-center rounded-xl bg-neon py-3 text-xs uppercase tracking-[0.18em] font-bold text-ink hover:bg-neon/90 shadow-lg active:scale-95 transition-all",
                    children: "Submit Your Manuscript",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                    className: "text-[11px] text-paper-faint text-center font-serif italic",
                    children: "“We do not write to be found. We write to leave the light on.”",
                  }),
                ],
              }),
            ],
          }),
        }),
    ],
  });
}
function Footer() {
  const [subscribed, setSubscribed] = (0, import_react.useState)(false);
  const [email, setEmail] = (0, import_react.useState)("");
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
    className: "border-t border-neon/10 bg-ink-2 text-paper transition-colors",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
      className: "mx-auto max-w-[1240px] px-6 sm:px-10 py-16",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "col-span-12 sm:col-span-2 lg:col-span-5 space-y-4",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "flex items-center gap-3",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                      className:
                        "flex h-8 w-8 items-center justify-center rounded-sm bg-neon/10 border border-neon/30 text-neon",
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feather, {
                        className: "h-4 w-4",
                      }),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                      className: "font-display text-2xl font-medium tracking-tight text-paper",
                      children: "Muse Books",
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                  className: "text-sm leading-relaxed text-paper-dim max-w-[36ch] text-pretty",
                  children:
                    "A lamplit press dedicated to poetry, chapbooks, and reflective literature. Founded by Adaeze Okafor & Theo Lindqvist to celebrate verse written in quiet hours.",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                  className: "pt-2 text-xs text-paper-faint italic font-serif",
                  children: "“We do not write to be found. We write to leave the light on.”",
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "col-span-6 sm:col-span-1 lg:col-span-2 space-y-3",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                  className: "text-[11px] uppercase tracking-[0.25em] text-neon/80 font-medium",
                  children: "Navigation",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
                  className: "space-y-2 text-sm text-paper-dim",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
                        to: "/",
                        className: "hover:text-paper transition-colors inkline",
                        children: "Home",
                      }),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
                        to: "/poems",
                        className: "hover:text-paper transition-colors inkline",
                        children: "Poem Library",
                      }),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
                        to: "/collections",
                        className: "hover:text-paper transition-colors inkline",
                        children: "Collections",
                      }),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
                        to: "/books",
                        className: "hover:text-paper transition-colors inkline",
                        children: "Chapbooks",
                      }),
                    }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "col-span-6 sm:col-span-1 lg:col-span-2 space-y-3",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                  className: "text-[11px] uppercase tracking-[0.25em] text-neon/80 font-medium",
                  children: "About & Writing",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
                  className: "space-y-2 text-sm text-paper-dim",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
                        to: "/musings",
                        className: "hover:text-paper transition-colors inkline",
                        children: "Musings & Essays",
                      }),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
                        to: "/about",
                        className: "hover:text-paper transition-colors inkline",
                        children: "The Press & Poets",
                      }),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
                        to: "/submit",
                        className: "hover:text-paper transition-colors inkline",
                        children: "Submissions",
                      }),
                    }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "col-span-12 sm:col-span-2 lg:col-span-3 space-y-3",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                  className: "text-[11px] uppercase tracking-[0.25em] text-neon/80 font-medium",
                  children: "Letters by Lamplight",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                  className: "text-xs text-paper-dim leading-relaxed",
                  children: "Receive one unpublished poem and literary dispatch each full moon.",
                }),
                subscribed
                  ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                      className:
                        "flex items-center gap-2 rounded border border-neon/30 bg-neon/10 p-3 text-xs text-neon",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
                          className: "h-4 w-4",
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                          children: "You're inscribed on our letter list.",
                        }),
                      ],
                    })
                  : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
                      onSubmit: handleSubscribe,
                      className: "space-y-2",
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                        className: "relative",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
                            type: "email",
                            required: true,
                            value: email,
                            onChange: (e) => setEmail(e.target.value),
                            placeholder: "Enter your email address",
                            className:
                              "w-full rounded bg-ink-3 border border-neon/20 px-3 py-2 text-xs text-paper placeholder:text-paper-faint focus:border-neon focus:outline-none",
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
                            type: "submit",
                            className:
                              "absolute right-1 top-1 bottom-1 px-2.5 rounded bg-neon text-ink text-xs hover:bg-neon/90 transition-colors flex items-center justify-center",
                            "aria-label": "Subscribe",
                            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
                              className: "h-3.5 w-3.5",
                            }),
                          }),
                        ],
                      }),
                    }),
              ],
            }),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className:
            "mt-14 pt-8 border-t border-neon/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs uppercase tracking-[0.22em] text-paper-faint",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
              children: "Muse Books — Hand-bound & Typeset · MMXXIV",
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
              children: "Cormorant & Spectral Typography",
            }),
          ],
        }),
      ],
    }),
  });
}
function NotFoundComponent() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    className: "flex min-h-screen items-center justify-center bg-background px-4",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
      className: "max-w-md text-center",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
          className: "text-7xl font-bold text-foreground",
          children: "404",
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
          className: "mt-4 text-xl font-semibold text-foreground",
          children: "Page not found",
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
          className: "mt-2 text-sm text-muted-foreground",
          children: "The page you're looking for doesn't exist or has been moved.",
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
          className: "mt-6",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
            to: "/",
            className:
              "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
            children: "Go home",
          }),
        }),
      ],
    }),
  });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  (0, import_react.useEffect)(() => {
    reportAppError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    className: "flex min-h-screen items-center justify-center bg-background px-4",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
      className: "max-w-md text-center",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
          className: "text-xl font-semibold tracking-tight text-foreground",
          children: "This page didn't load",
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
          className: "mt-2 text-sm text-muted-foreground",
          children: "Something went wrong on our end. You can try refreshing or head back home.",
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "mt-6 flex flex-wrap justify-center gap-2",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
              onClick: () => {
                router.invalidate();
                reset();
              },
              className:
                "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
              children: "Try again",
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
              href: "/",
              className:
                "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
              children: "Go home",
            }),
          ],
        }),
      ],
    }),
  });
}
var Route$7 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { title: "Muse Books — A Small Press for Poetry & Literature" },
      {
        name: "description",
        content:
          "Poems, collections and hand-bound chapbooks from two friends writing by lamplight.",
      },
      {
        name: "author",
        content: "Muse Books",
      },
      {
        property: "og:title",
        content: "Muse Books — A Small Press for Poetry & Literature",
      },
      {
        property: "og:description",
        content:
          "Poems, collections and hand-bound chapbooks from two friends writing by lamplight.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Josefin+Sans:wght@600;700&family=Karla:wght@400;500;600&family=Spectral:ital,wght@0,300;0,400;0,500;1,400&display=swap",
      },
      {
        rel: "stylesheet",
        href: styles_default,
      },
      {
        rel: "icon",
        href: "/favicon.ico",
        type: "image/x-icon",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});
function RootShell({ children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
    lang: "en",
    className: "dark overflow-x-hidden",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
            dangerouslySetInnerHTML: {
              __html: `
              try {
                const saved = localStorage.getItem('muse-theme');
                if (saved === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                } else {
                  document.documentElement.classList.remove('light');
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
            },
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
        className: "overflow-y-auto",
        children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})],
      }),
    ],
  });
}
function RootComponent() {
  const { queryClient } = Route$7.useRouteContext();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
    client: queryClient,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
      className:
        "min-h-screen bg-ink text-paper font-body flex flex-col selection:bg-neon selection:text-ink",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
          className: "flex-1",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
      ],
    }),
  });
}
var $$splitComponentImporter$6 = () => import("./routes-C1gky0un.mjs");
var Route$6 = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Muse Books — A Small Press for Poetry & Literature" },
      {
        name: "description",
        content:
          "A small lamplit press for poetry, chapbooks, and literature. Hand-bound editions and verses by Adaeze Okafor and Theo Lindqvist.",
      },
      {
        property: "og:title",
        content: "Muse Books — A Small Press for Poetry & Literature",
      },
      {
        property: "og:description",
        content:
          "A small lamplit press for poetry, chapbooks, and literature. Hand-bound editions and verses.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component"),
});
var $$splitComponentImporter$5 = () => import("./about-CSe30RET.mjs");
var Route$5 = createFileRoute("/about")({
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
  component: lazyRouteComponent($$splitComponentImporter$5, "component"),
});
var $$splitComponentImporter$4 = () => import("./submit-B4fj2BIA.mjs");
var Route$4 = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Submissions & Call for Poetry — Muse Books" },
      {
        name: "description",
        content:
          "Submit your poems, chapbook manuscripts, and literary musings to Muse Books. We read year-round.",
      },
    ],
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component"),
});
var $$splitComponentImporter$3 = () => import("./books-CsaIPSqw.mjs");
var Route$3 = createFileRoute("/books/")({
  head: () => ({
    meta: [
      { title: "Hand-Bound Chapbooks — Muse Books" },
      {
        name: "description",
        content:
          "Hand-set metal type, mould-made rag paper, and Smyth-sewn bindings. Explore our limited letterpress chapbooks.",
      },
    ],
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component"),
});
var $$splitComponentImporter$2 = () => import("./collections-Cku59l7_.mjs");
var Route$2 = createFileRoute("/collections/")({
  head: () => ({
    meta: [
      { title: "Poetry Collections — Muse Books" },
      {
        name: "description",
        content: "Explore our published poetry collections, suites, and collaborative anthologies.",
      },
    ],
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component"),
});
var $$splitComponentImporter$1 = () => import("./musings-CuOfwfMM.mjs");
var Route$1 = createFileRoute("/musings/")({
  head: () => ({
    meta: [
      { title: "Musings & Essays on Literature — Muse Books" },
      {
        name: "description",
        content:
          "Reflections on poetry, the letterpress craft, and the quiet hours of writing by Adaeze Okafor and Theo Lindqvist.",
      },
    ],
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
});
var $$splitComponentImporter = () => import("./poems-DwWivuI6.mjs");
var Route = createFileRoute("/poems/")({
  head: () => ({
    meta: [
      { title: "Poems Library — Muse Books" },
      {
        name: "description",
        content: "Browse all poems, epistles, and verses published by Muse Books.",
      },
    ],
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component"),
});
var IndexRoute = Route$6.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$7,
});
var AboutRoute = Route$5.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$7,
});
var SubmitRoute = Route$4.update({
  id: "/submit",
  path: "/submit",
  getParentRoute: () => Route$7,
});
var BooksIndexRoute = Route$3.update({
  id: "/books/",
  path: "/books/",
  getParentRoute: () => Route$7,
});
var BooksIdRoute = Route$11.update({
  id: "/books/$id",
  path: "/books/$id",
  getParentRoute: () => Route$7,
});
var CollectionsIndexRoute = Route$2.update({
  id: "/collections/",
  path: "/collections/",
  getParentRoute: () => Route$7,
});
var CollectionsIdRoute = Route$9.update({
  id: "/collections/$id",
  path: "/collections/$id",
  getParentRoute: () => Route$7,
});
var MusingsIndexRoute = Route$1.update({
  id: "/musings/",
  path: "/musings/",
  getParentRoute: () => Route$7,
});
var MusingsIdRoute = Route$8.update({
  id: "/musings/$id",
  path: "/musings/$id",
  getParentRoute: () => Route$7,
});
var PoemsIndexRoute = Route.update({
  id: "/poems/",
  path: "/poems/",
  getParentRoute: () => Route$7,
});
var rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  SubmitRoute,
  BooksIdRoute,
  CollectionsIdRoute,
  MusingsIdRoute,
  PoemsIdRoute: Route$10.update({
    id: "/poems/$id",
    path: "/poems/$id",
    getParentRoute: () => Route$7,
  }),
  BooksIndexRoute,
  CollectionsIndexRoute,
  MusingsIndexRoute,
  PoemsIndexRoute,
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
  const queryClient = new QueryClient();
  return createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });
};
//#endregion
export { getRouter };

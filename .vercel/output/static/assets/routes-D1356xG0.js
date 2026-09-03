import { K as e, W as t, c as n, n as r, t as i } from "./createLucideIcon-BnNKfcXr.js";
import { t as a } from "./arrow-right-Z_xHovhc.js";
import { t as o } from "./book-marked-CbT39qVx.js";
import { t as s } from "./book-open-0u_Fddua.js";
import { t as c } from "./check-Dz3QWjsN.js";
import { t as l } from "./feather-CywcPIGl.js";
import { t as u } from "./file-text-9PefKp3N.js";
import { t as d } from "./layers-DEWR5DJu.js";
import { t as f } from "./quote-D42mR2Vo.js";
import { t as p } from "./send-DWuMIr-w.js";
import { t as m } from "./share-2-DzXqWaLc.js";
import { t as h } from "./sparkles-arFjGQUh.js";
import { t as g } from "./users-BfnbH_Fg.js";
import { a as _, i as v, n as y, r as b, t as x } from "./literature-j2lTA6at.js";
var S = i(`refresh-cw`, [
    [`path`, { d: `M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8`, key: `v9h5vc` }],
    [`path`, { d: `M21 3v5h-5`, key: `1q7to0` }],
    [`path`, { d: `M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16`, key: `3uifl3` }],
    [`path`, { d: `M8 16H3v5`, key: `1cv678` }],
  ]),
  C = e(t(), 1),
  w = n(),
  T = [
    `Words that breathe.`,
    `Stories that linger.`,
    `Verses that remember you.`,
    `Written by lamplight.`,
  ];
function E() {
  let [e, t] = (0, C.useState)(0),
    [n, i] = (0, C.useState)(``),
    [o, c] = (0, C.useState)(`typing`),
    [u, m] = (0, C.useState)(!1),
    g = [
      {
        id: `muse-night-image-1`,
        type: `image`,
        src: `https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1920&q=80`,
        overlay: `bg-black/50 dark:bg-black/50 light:bg-[#f7f5f1]/40`,
        title: `Night Study`,
      },
      {
        id: `net-grid-1`,
        type: `grid`,
        overlay: `bg-gradient-to-b from-ink/20 via-ink/40 to-ink/65`,
        title: `Letterpress Net Grid`,
      },
      {
        id: `muse-night-image-2`,
        type: `image`,
        src: `https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1920&q=80`,
        overlay: `bg-black/55 dark:bg-black/55 light:bg-[#f7f5f1]/40`,
        title: `Nocturnal Paper`,
      },
      {
        id: `net-grid-2`,
        type: `grid`,
        overlay: `bg-gradient-to-b from-ink/20 via-ink/40 to-ink/65`,
        title: `Letterpress Blueprint`,
      },
      {
        id: `muse-night-image-1-clone`,
        type: `image`,
        src: `https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1920&q=80`,
        overlay: `bg-black/50 dark:bg-black/50 light:bg-[#f7f5f1]/40`,
        title: `Night Study Clone`,
        isClone: !0,
      },
    ];
  (0, C.useEffect)(() => {
    let r = T[e] ?? T[0];
    if (o === `typing`)
      if (n.length < r.length) {
        let e = setTimeout(() => i(r.slice(0, n.length + 1)), 45);
        return () => clearTimeout(e);
      } else {
        let e = setTimeout(() => c(`holding`), 1800);
        return () => clearTimeout(e);
      }
    if (o === `holding`) {
      let e = setTimeout(() => c(`erasing`), 200);
      return () => clearTimeout(e);
    }
    if (o === `erasing`)
      if (n.length > 0) {
        let e = setTimeout(() => i(r.slice(0, n.length - 1)), 25);
        return () => clearTimeout(e);
      } else (t((e) => (e + 1) % T.length), c(`typing`));
  }, [n, o, e]);
  let b = [
      {
        gradient: `from-amber-950 via-orange-950 to-stone-900`,
        accent: `text-amber-300`,
        dot: `bg-amber-400`,
        glow: `shadow-amber-950/50`,
        border: `border-amber-700/30`,
      },
      {
        gradient: `from-teal-950 via-cyan-950 to-stone-900`,
        accent: `text-teal-300`,
        dot: `bg-teal-400`,
        glow: `shadow-teal-950/50`,
        border: `border-teal-700/30`,
      },
      {
        gradient: `from-rose-950 via-pink-950 to-stone-900`,
        accent: `text-rose-300`,
        dot: `bg-rose-400`,
        glow: `shadow-rose-950/50`,
        border: `border-rose-700/30`,
      },
      {
        gradient: `from-indigo-950 via-slate-900 to-stone-900`,
        accent: `text-indigo-300`,
        dot: `bg-indigo-400`,
        glow: `shadow-indigo-950/50`,
        border: `border-indigo-700/30`,
      },
    ],
    S = [
      {
        quote: `The silence between words is where the poem lives. I am always writing toward that silence.`,
        author: `Elara Voss`,
        work: `Cartographies of Grief`,
        image: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80`,
        rotation: `-rotate-2`,
      },
      {
        quote: `To write about water is to write about everything that cannot be held — and everything we keep trying to hold anyway.`,
        author: `Soren Adeyemi`,
        work: `The Glass River`,
        image: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80`,
        rotation: `rotate-1`,
      },
      {
        quote: `I never know a poem is finished. I only know when I have stopped being able to change it for the better.`,
        author: `Elara Voss`,
        work: `On Craft`,
        image: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80`,
        rotation: `-rotate-1`,
      },
      {
        quote: `Memory is the first editor. It cuts what we cannot bear and keeps what we cannot release.`,
        author: `Soren Adeyemi`,
        work: `A Museum of Unfinished Things`,
        image: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80`,
        rotation: `rotate-2`,
      },
      {
        quote: `Language is the oldest technology. We forget that every word was once invented — by someone desperate to be understood.`,
        author: `Elara Voss`,
        work: `The Weight of Dusk`,
        image: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80`,
        rotation: `-rotate-3`,
      },
    ],
    E = (0, C.useRef)(null),
    [D, O] = (0, C.useState)(!1),
    [k, A] = (0, C.useState)(!0),
    j = () => {
      let e = E.current;
      e && (O(e.scrollLeft > 0), A(Math.ceil(e.scrollLeft + e.clientWidth) < e.scrollWidth - 1));
    };
  return (
    (0, C.useEffect)(() => {
      let e = E.current;
      if (e)
        return (
          e.addEventListener(`scroll`, j),
          window.addEventListener(`resize`, j),
          j(),
          () => {
            (e.removeEventListener(`scroll`, j), window.removeEventListener(`resize`, j));
          }
        );
    }, []),
    (0, w.jsxs)(`div`, {
      className: `block md:hidden bg-ink font-karla text-paper selection:bg-neon selection:text-ink`,
      children: [
        (0, w.jsxs)(`section`, {
          onTouchStart: () => m(!0),
          onTouchEnd: () => m(!1),
          onTouchCancel: () => m(!1),
          onMouseEnter: () => m(!0),
          onMouseLeave: () => m(!1),
          className: `hero-slider-container relative min-h-[92vh] flex flex-col justify-between p-4 sm:p-6 overflow-hidden isolate ${u ? `is-paused` : ``}`,
          children: [
            (0, w.jsx)(`div`, {
              className: `absolute inset-0 z-0 overflow-hidden pointer-events-none bg-ink`,
              children: (0, w.jsx)(`div`, {
                className: `step-slider-track`,
                children: g.map((e, t) =>
                  (0, w.jsxs)(
                    `div`,
                    {
                      className: `relative h-full w-[100vw] shrink-0 overflow-hidden bg-ink`,
                      "aria-hidden": e.isClone ? `true` : void 0,
                      children: [
                        e.type === `image`
                          ? (0, w.jsx)(`img`, {
                              src: e.src,
                              alt: ``,
                              className: `absolute inset-0 h-full w-full object-cover object-center transform-gpu`,
                              loading: `eager`,
                            })
                          : (0, w.jsxs)(`div`, {
                              className: `absolute inset-0 bg-ink`,
                              children: [
                                (0, w.jsx)(`div`, {
                                  className: `absolute inset-0 gridbg opacity-95`,
                                }),
                                (0, w.jsx)(`div`, {
                                  className: `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-neon/15 rounded-full blur-3xl pointer-events-none`,
                                }),
                              ],
                            }),
                        (0, w.jsx)(`div`, { className: `absolute inset-0 ${e.overlay}` }),
                      ],
                    },
                    `${e.id}-${t}`,
                  ),
                ),
              }),
            }),
            (0, w.jsxs)(`main`, {
              className: `w-full max-w-7xl mx-auto my-auto px-2 sm:px-4 py-8 relative z-10`,
              children: [
                (0, w.jsxs)(`div`, {
                  className: `mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm px-3.5 py-1 text-xs font-medium text-[#fef08a] shadow-sm`,
                  children: [
                    (0, w.jsx)(h, { className: `h-3.5 w-3.5 text-[#fef08a] animate-pulse` }),
                    (0, w.jsx)(`span`, { children: n }),
                    (0, w.jsx)(`span`, {
                      className: `inline-block h-3.5 w-0.5 animate-pulse bg-[#fef08a] align-middle`,
                    }),
                  ],
                }),
                (0, w.jsxs)(`h1`, {
                  className: `font-josefin font-bold text-white leading-[1.1] text-[clamp(2.4rem,8vw,4.5rem)] text-balance`,
                  children: [
                    `Websites that turn words into`,
                    ` `,
                    (0, w.jsx)(`span`, {
                      className: `text-[#fef08a] italic font-normal drop-shadow-sm`,
                      children: `worlds`,
                    }),
                  ],
                }),
                (0, w.jsx)(`p`, {
                  className: `mt-4 font-karla text-sm text-stone-200 leading-relaxed max-w-md text-pretty`,
                  children: `A small lamplit press for poetry, hand-bound chapbooks, and literature from Adaeze Okafor & Theo Lindqvist.`,
                }),
                (0, w.jsxs)(`div`, {
                  className: `mt-6 flex flex-wrap gap-2.5`,
                  children: [
                    (0, w.jsxs)(r, {
                      to: `/poems`,
                      className: `inline-flex items-center gap-1.5 rounded-xl bg-neon px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-ink shadow-lg shadow-neon/20 active:scale-95 transition-all`,
                      children: [
                        (0, w.jsx)(l, { className: `h-3.5 w-3.5` }),
                        (0, w.jsx)(`span`, { children: `Read Poems` }),
                      ],
                    }),
                    (0, w.jsxs)(r, {
                      to: `/collections`,
                      className: `inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-white hover:bg-white/20 active:scale-95 transition-all`,
                      children: [
                        (0, w.jsx)(d, { className: `h-3.5 w-3.5 text-neon` }),
                        (0, w.jsx)(`span`, { children: `Collections` }),
                      ],
                    }),
                    (0, w.jsxs)(r, {
                      to: `/books`,
                      className: `inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-white hover:bg-white/20 active:scale-95 transition-all`,
                      children: [
                        (0, w.jsx)(s, { className: `h-3.5 w-3.5 text-neon` }),
                        (0, w.jsx)(`span`, { children: `Chapbooks` }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, w.jsxs)(`div`, {
              className: `w-full max-w-7xl mx-auto flex items-center justify-between pb-1 text-xs z-10`,
              children: [
                (0, w.jsxs)(`div`, {
                  className: `flex items-center gap-2`,
                  children: [
                    (0, w.jsx)(`span`, {
                      className: `h-1.5 w-1.5 rounded-full bg-neon animate-ping`,
                    }),
                    (0, w.jsx)(`span`, {
                      className: `text-[10px] uppercase tracking-[0.18em] text-stone-300 font-karla`,
                      children: `Infinite Reel`,
                    }),
                  ],
                }),
                (0, w.jsx)(`div`, {
                  className: `bg-white/95 text-[#1E2028] text-[11px] font-semibold px-3.5 py-1.5 rounded-full shadow-md backdrop-blur-sm font-karla`,
                  children: `Hand-bound by lamplight`,
                }),
              ],
            }),
          ],
        }),
        (0, w.jsx)(`section`, {
          className: `border-y border-neon/15 bg-ink-2/90 px-4 py-4`,
          children: (0, w.jsxs)(`div`, {
            className: `grid grid-cols-4 gap-2 text-center text-xs`,
            children: [
              (0, w.jsxs)(r, {
                to: `/poems`,
                className: `flex flex-col items-center`,
                children: [
                  (0, w.jsx)(`span`, {
                    className: `font-display text-lg font-medium text-neon`,
                    children: v.length,
                  }),
                  (0, w.jsx)(`span`, {
                    className: `text-[10px] uppercase tracking-[0.12em] text-paper-dim`,
                    children: `Poems`,
                  }),
                ],
              }),
              (0, w.jsxs)(r, {
                to: `/collections`,
                className: `flex flex-col items-center`,
                children: [
                  (0, w.jsx)(`span`, {
                    className: `font-display text-lg font-medium text-amber-300`,
                    children: y.length,
                  }),
                  (0, w.jsx)(`span`, {
                    className: `text-[10px] uppercase tracking-[0.12em] text-paper-dim`,
                    children: `Suites`,
                  }),
                ],
              }),
              (0, w.jsxs)(r, {
                to: `/books`,
                className: `flex flex-col items-center`,
                children: [
                  (0, w.jsx)(`span`, {
                    className: `font-display text-lg font-medium text-rose-300`,
                    children: x.length,
                  }),
                  (0, w.jsx)(`span`, {
                    className: `text-[10px] uppercase tracking-[0.12em] text-paper-dim`,
                    children: `Books`,
                  }),
                ],
              }),
              (0, w.jsxs)(r, {
                to: `/about`,
                className: `flex flex-col items-center`,
                children: [
                  (0, w.jsx)(`span`, {
                    className: `font-display text-lg font-medium text-paper`,
                    children: `2`,
                  }),
                  (0, w.jsx)(`span`, {
                    className: `text-[10px] uppercase tracking-[0.12em] text-paper-dim`,
                    children: `Poets`,
                  }),
                ],
              }),
            ],
          }),
        }),
        (0, w.jsxs)(`section`, {
          className: `px-5 py-12 space-y-6`,
          children: [
            (0, w.jsxs)(`div`, {
              className: `flex items-baseline justify-between border-b border-neon/10 pb-3`,
              children: [
                (0, w.jsxs)(`div`, {
                  children: [
                    (0, w.jsx)(`span`, {
                      className: `text-[10px] font-medium uppercase tracking-[0.22em] text-neon`,
                      children: `Selected Works`,
                    }),
                    (0, w.jsx)(`h2`, {
                      className: `font-display text-2xl text-paper font-medium mt-0.5`,
                      children: `Verses by Lamplight`,
                    }),
                  ],
                }),
                (0, w.jsxs)(r, {
                  to: `/poems`,
                  className: `text-[11px] uppercase tracking-[0.16em] text-neon font-medium`,
                  children: [`All `, v.length, ` →`],
                }),
              ],
            }),
            (0, w.jsx)(`div`, {
              className: `grid grid-cols-2 gap-3.5`,
              children: v.slice(0, 4).map((e, t) => {
                let n = b[t % b.length] ?? b[0];
                return (0, w.jsxs)(
                  r,
                  {
                    to: `/poems/$id`,
                    params: { id: e.id },
                    className: `group relative flex flex-col text-left active:scale-[0.98] transition-transform`,
                    children: [
                      (0, w.jsxs)(`div`, {
                        className: `relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br ${n.gradient} border ${n.border} p-3.5 flex flex-col justify-between shadow-lg ${n.glow}`,
                        children: [
                          (0, w.jsx)(`div`, {
                            className: `absolute left-0 top-0 h-full w-1.5 bg-black/40`,
                          }),
                          (0, w.jsxs)(`div`, {
                            className: `flex items-center gap-1.5`,
                            children: [
                              (0, w.jsx)(`div`, { className: `h-1.5 w-1.5 rounded-full ${n.dot}` }),
                              (0, w.jsx)(`span`, {
                                className: `text-[9px] font-medium uppercase tracking-[0.18em] ${n.accent}`,
                                children: e.collection.split(` `)[0],
                              }),
                            ],
                          }),
                          (0, w.jsxs)(`div`, {
                            children: [
                              (0, w.jsx)(`h3`, {
                                className: `font-display text-base font-medium leading-tight text-paper group-hover:text-neon transition-colors line-clamp-2`,
                                children: e.title,
                              }),
                              (0, w.jsxs)(`p`, {
                                className: `mt-1 text-[10px] text-paper-dim/80 truncate`,
                                children: [e.author.split(` `)[0], ` · `, e.readTime],
                              }),
                            ],
                          }),
                          (0, w.jsx)(`div`, {
                            className: `pt-1 flex justify-end`,
                            children: (0, w.jsx)(`span`, {
                              className: `text-[9px] uppercase tracking-[0.14em] text-neon font-medium bg-black/40 px-2 py-0.5 rounded-full border border-white/10`,
                              children: `Read`,
                            }),
                          }),
                        ],
                      }),
                      (0, w.jsxs)(`p`, {
                        className: `mt-2 text-[11px] text-paper-dim/90 font-serif italic line-clamp-2 leading-snug px-0.5`,
                        children: [`“`, e.stanzas[0]?.[0], `”`],
                      }),
                    ],
                  },
                  e.id,
                );
              }),
            }),
          ],
        }),
        (0, w.jsxs)(`section`, {
          className: `bg-ink overflow-hidden`,
          children: [
            (0, w.jsx)(`div`, {
              className: `px-5 pt-12 pb-8`,
              children: (0, w.jsxs)(`div`, {
                className: `flex items-end justify-between mb-2`,
                children: [
                  (0, w.jsxs)(`div`, {
                    children: [
                      (0, w.jsx)(`span`, {
                        className: `text-amber-300 text-[10px] font-bold tracking-[0.4em] uppercase block mb-3`,
                        children: `// In Their Words`,
                      }),
                      (0, w.jsxs)(`h2`, {
                        className: `font-display text-[clamp(2rem,7vw,3.5rem)] font-semibold text-paper leading-[1.15]`,
                        children: [
                          `Voices from`,
                          (0, w.jsx)(`br`, {}),
                          (0, w.jsx)(`span`, {
                            className: `italic font-light text-paper-dim`,
                            children: `the page`,
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, w.jsxs)(`div`, {
                    className: `flex gap-2 shrink-0`,
                    children: [
                      (0, w.jsx)(`button`, {
                        type: `button`,
                        onClick: () => E.current?.scrollBy({ left: -460, behavior: `smooth` }),
                        disabled: !D,
                        className: `w-9 h-9 rounded-full border border-neon/30 flex items-center justify-center text-neon hover:border-neon hover:bg-neon/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed`,
                        "aria-label": `Previous quote`,
                        children: (0, w.jsx)(`svg`, {
                          width: `14`,
                          height: `14`,
                          viewBox: `0 0 24 24`,
                          fill: `none`,
                          stroke: `currentColor`,
                          strokeWidth: `2`,
                          children: (0, w.jsx)(`path`, { d: `M19 12H5M12 5l-7 7 7 7` }),
                        }),
                      }),
                      (0, w.jsx)(`button`, {
                        type: `button`,
                        onClick: () => E.current?.scrollBy({ left: 460, behavior: `smooth` }),
                        disabled: !k,
                        className: `w-9 h-9 rounded-full bg-neon text-ink flex items-center justify-center hover:bg-amber-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed`,
                        "aria-label": `Next quote`,
                        children: (0, w.jsx)(`svg`, {
                          width: `14`,
                          height: `14`,
                          viewBox: `0 0 24 24`,
                          fill: `none`,
                          stroke: `currentColor`,
                          strokeWidth: `2`,
                          children: (0, w.jsx)(`path`, { d: `M5 12h14M12 5l7 7-7 7` }),
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            }),
            (0, w.jsxs)(`div`, {
              className: `relative`,
              children: [
                (0, w.jsx)(`div`, {
                  className: `pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent z-10`,
                }),
                (0, w.jsx)(`div`, {
                  className: `pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent z-10`,
                }),
                (0, w.jsx)(`div`, {
                  ref: E,
                  className: `flex gap-4 overflow-x-auto pb-6 px-5`,
                  style: { scrollbarWidth: `none`, msOverflowStyle: `none` },
                  children: S.map((e, t) =>
                    (0, w.jsxs)(
                      `article`,
                      {
                        className: `min-w-[280px] sm:min-w-[340px] max-w-[380px] shrink-0 rounded-2xl border border-white/10 bg-ink-2/70 backdrop-blur-xl p-6 shadow-2xl shadow-black/40 ${e.rotation} transition-transform duration-300 hover:scale-[1.03] hover:shadow-neon/10 relative`,
                        children: [
                          (0, w.jsx)(`div`, {
                            className: `absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none`,
                          }),
                          (0, w.jsx)(`div`, {
                            className: `font-display text-5xl text-neon/25 leading-none mb-2 select-none`,
                            children: `"`,
                          }),
                          (0, w.jsx)(`p`, {
                            className: `font-display italic text-paper-dim text-base leading-relaxed mb-5 relative`,
                            children: e.quote,
                          }),
                          (0, w.jsxs)(`div`, {
                            className: `flex items-center gap-3 relative`,
                            children: [
                              (0, w.jsx)(`div`, {
                                className: `h-10 w-10 rounded-xl overflow-hidden shrink-0 border border-neon/20`,
                                children: (0, w.jsx)(`img`, {
                                  alt: e.author,
                                  className: `h-full w-full object-cover`,
                                  src: e.image,
                                }),
                              }),
                              (0, w.jsxs)(`div`, {
                                children: [
                                  (0, w.jsx)(`p`, {
                                    className: `text-sm font-semibold text-paper`,
                                    children: e.author,
                                  }),
                                  (0, w.jsx)(`p`, {
                                    className: `text-[11px] text-paper-faint`,
                                    children: e.work,
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      },
                      t,
                    ),
                  ),
                }),
              ],
            }),
          ],
        }),
        (0, w.jsxs)(`section`, {
          className: `border-t border-neon/15 bg-gradient-to-b from-ink-2 to-ink px-5 py-12 space-y-6`,
          children: [
            (0, w.jsxs)(`div`, {
              className: `text-center space-y-1`,
              children: [
                (0, w.jsx)(`span`, {
                  className: `text-[10px] font-medium uppercase tracking-[0.25em] text-neon`,
                  children: `The Writers`,
                }),
                (0, w.jsx)(`h2`, {
                  className: `font-display text-2xl sm:text-3xl font-medium text-paper`,
                  children: `Two Voices, One Lamp`,
                }),
              ],
            }),
            (0, w.jsx)(`div`, {
              className: `space-y-4`,
              children: Object.values(_).map((e, t) =>
                (0, w.jsxs)(
                  `div`,
                  {
                    className: `rounded-xl border border-neon/15 bg-gradient-to-br ${t === 0 ? `from-amber-950/40 to-ink-2` : `from-teal-950/40 to-ink-2`} p-5 space-y-3 shadow-md`,
                    children: [
                      (0, w.jsxs)(`div`, {
                        className: `flex items-center gap-3`,
                        children: [
                          (0, w.jsx)(`div`, {
                            className: `h-10 w-10 rounded-full bg-neon/10 border border-neon/30 flex items-center justify-center shrink-0`,
                            children: (0, w.jsx)(l, { className: `h-4 w-4 text-neon` }),
                          }),
                          (0, w.jsxs)(`div`, {
                            children: [
                              (0, w.jsx)(`h3`, {
                                className: `font-display text-xl text-paper font-medium`,
                                children: e.name,
                              }),
                              (0, w.jsxs)(`p`, {
                                className: `text-[11px] uppercase tracking-[0.15em] text-neon/80 font-medium`,
                                children: [e.role, ` · `, e.location.split(`&`)[0]],
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, w.jsx)(`p`, {
                        className: `text-xs text-paper-dim leading-relaxed`,
                        children: e.bio,
                      }),
                      (0, w.jsxs)(`div`, {
                        className: `pt-2 flex justify-between items-center text-[11px] uppercase tracking-[0.14em]`,
                        children: [
                          (0, w.jsx)(`span`, {
                            className: `text-paper-faint`,
                            children: e.works[0] ?? ``,
                          }),
                          (0, w.jsx)(r, {
                            to: `/about`,
                            className: `text-neon hover:underline font-medium`,
                            children: `Bio →`,
                          }),
                        ],
                      }),
                    ],
                  },
                  e.id,
                ),
              ),
            }),
            (0, w.jsxs)(`div`, {
              className: `p-4 rounded-xl border border-neon/10 bg-ink text-center space-y-2`,
              children: [
                (0, w.jsx)(f, { className: `h-4 w-4 text-neon mx-auto opacity-70` }),
                (0, w.jsx)(`p`, {
                  className: `font-display text-sm italic text-paper-dim leading-relaxed`,
                  children: `“We do not write to be found. We write to leave the light on for whoever passes at midnight.”`,
                }),
              ],
            }),
          ],
        }),
        (0, w.jsxs)(`section`, {
          className: `border-t border-neon/10 px-5 py-10 text-center space-y-4 bg-ink-2`,
          children: [
            (0, w.jsxs)(`div`, {
              className: `inline-flex items-center gap-1.5 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-neon`,
              children: [
                (0, w.jsx)(p, { className: `h-3 w-3` }),
                (0, w.jsx)(`span`, { children: `Call for Poetry` }),
              ],
            }),
            (0, w.jsx)(`h3`, {
              className: `font-display text-2xl font-medium text-paper`,
              children: `Do You Write by Lamplight?`,
            }),
            (0, w.jsx)(`p`, {
              className: `text-xs text-paper-dim leading-relaxed max-w-xs mx-auto`,
              children: `We welcome standalone poems and chapbook manuscripts. No reading fees.`,
            }),
            (0, w.jsxs)(r, {
              to: `/submit`,
              className: `inline-flex items-center gap-2 rounded-full bg-neon px-6 py-2.5 text-xs uppercase tracking-[0.18em] font-medium text-ink shadow-md active:scale-95 transition-all`,
              children: [
                (0, w.jsx)(`span`, { children: `Submit Your Work` }),
                (0, w.jsx)(a, { className: `h-3.5 w-3.5` }),
              ],
            }),
          ],
        }),
      ],
    })
  );
}
function D() {
  let [e, t] = (0, C.useState)(0),
    [n, i] = (0, C.useState)(!1),
    [p, _] = (0, C.useState)(!1),
    y = [
      {
        id: `desktop-night-1`,
        type: `image`,
        src: `https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1920&q=80`,
        title: `Night Study`,
      },
      { id: `desktop-grid-1`, type: `grid`, title: `Letterpress Grid` },
      {
        id: `desktop-night-2`,
        type: `image`,
        src: `https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1920&q=80`,
        title: `Nocturnal Paper`,
      },
      { id: `desktop-grid-2`, type: `grid`, title: `Letterpress Blueprint` },
      {
        id: `desktop-night-1-clone`,
        type: `image`,
        src: `https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1920&q=80`,
        title: `Night Study Clone`,
        isClone: !0,
      },
    ],
    T = v[e % v.length] ?? v[0],
    D = v.find((e) => e.featured) ?? v[0],
    O = x[0],
    k = b[0],
    A = () => {
      t((e) => (e + 1) % v.length);
    },
    j = () => {
      let e = `"${(T.stanzas[0]?.slice(0, 3) ?? []).join(`
`)}"\n— ${T.author}, ${T.title}\n(via Muse Books)`;
      (navigator.clipboard.writeText(e), i(!0), setTimeout(() => i(!1), 2e3));
    },
    M = [
      {
        title: `Poem Library`,
        desc: `An open archive of standalone verses, epistles, and nocturnal observations.`,
        to: `/poems`,
        count: `${v.length} Poems`,
        icon: s,
        action: `Browse poems`,
        badge: `Fast 1-min reads`,
      },
      {
        title: `Collections`,
        desc: `Curated suites and seasonal anthologies charting inner and outer weather.`,
        to: `/collections`,
        count: `4 Volumes`,
        icon: d,
        action: `Explore suites`,
        badge: `Curated suites`,
      },
      {
        title: `Hand-Bound Chapbooks`,
        desc: `Limited letterpress editions printed on mould-made rag paper using metal type.`,
        to: `/books`,
        count: `Albion Press`,
        icon: o,
        action: `View editions`,
        badge: `Numbered printings`,
      },
      {
        title: `Musings & Essays`,
        desc: `Reflections on poetic craft, letterpress method, and the art of midnight writing.`,
        to: `/musings`,
        count: `${b.length} Dispatches`,
        icon: u,
        action: `Read journal`,
        badge: `Craft notes`,
      },
      {
        title: `The Press & Poets`,
        desc: `The story of Adaeze Okafor and Theo Lindqvist, our shared lamp, and letterpress studio.`,
        to: `/about`,
        count: `Edinburgh & Stockholm`,
        icon: g,
        action: `Meet the poets`,
        badge: `Biographies`,
      },
      {
        title: `Submissions`,
        desc: `We read standalone poems, suites, and chapbook manuscripts on a rolling basis.`,
        to: `/submit`,
        count: `Open year-round`,
        icon: l,
        action: `Submit manuscript`,
        badge: `No reading fees`,
      },
    ];
  return (0, w.jsxs)(`div`, {
    className: `space-y-0 overflow-hidden`,
    children: [
      (0, w.jsx)(E, {}),
      (0, w.jsxs)(`div`, {
        className: `hidden md:block`,
        children: [
          (0, w.jsxs)(`section`, {
            onMouseEnter: () => _(!0),
            onMouseLeave: () => _(!1),
            onTouchStart: () => _(!0),
            onTouchEnd: () => _(!1),
            className: `hero-slider-container border-b border-neon/10 py-16 lg:py-24 relative overflow-hidden min-h-[500px] flex items-center isolate ${p ? `is-paused` : ``}`,
            children: [
              (0, w.jsx)(`div`, {
                className: `absolute inset-0 -z-20 overflow-hidden pointer-events-none bg-ink`,
                children: (0, w.jsx)(`div`, {
                  className: `step-slider-track`,
                  children: y.map((e, t) =>
                    (0, w.jsxs)(
                      `div`,
                      {
                        className: `relative h-full w-[100vw] shrink-0 overflow-hidden bg-ink`,
                        "aria-hidden": e.isClone ? `true` : void 0,
                        children: [
                          e.type === `image`
                            ? (0, w.jsx)(`img`, {
                                src: e.src,
                                alt: ``,
                                className: `absolute inset-0 h-full w-full object-cover object-center transform-gpu`,
                                loading: `eager`,
                              })
                            : (0, w.jsxs)(`div`, {
                                className: `absolute inset-0 bg-ink`,
                                children: [
                                  (0, w.jsx)(`div`, {
                                    className: `absolute inset-0 gridbg opacity-95`,
                                  }),
                                  (0, w.jsx)(`div`, {
                                    className: `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon/15 rounded-full blur-3xl`,
                                  }),
                                ],
                              }),
                          (0, w.jsx)(`div`, { className: `absolute inset-0 bg-ink/70` }),
                        ],
                      },
                      `${e.id}-${t}`,
                    ),
                  ),
                }),
              }),
              (0, w.jsx)(`div`, {
                className: `mx-auto max-w-[1240px] px-6 lg:px-10 w-full relative z-10`,
                children: (0, w.jsxs)(`div`, {
                  className: `grid grid-cols-12 gap-10 items-end`,
                  children: [
                    (0, w.jsxs)(`div`, {
                      className: `col-span-8`,
                      children: [
                        (0, w.jsxs)(`div`, {
                          className: `inline-flex max-w-full items-center gap-1.5 sm:gap-2 mb-4 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-[11px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.25em] text-neon font-medium shadow-sm`,
                          children: [
                            (0, w.jsx)(h, {
                              className: `h-3 w-3 shrink-0 animate-pulse text-neon`,
                            }),
                            (0, w.jsx)(`span`, {
                              className: `truncate`,
                              children: `Small Press for Verse & Literature`,
                            }),
                          ],
                        }),
                        (0, w.jsx)(`h1`, {
                          className: `reveal d1 font-display text-[clamp(4rem,9vw,7.5rem)] leading-[0.92] font-medium tracking-[-0.02em] text-paper text-balance`,
                          children: `Muse Books`,
                        }),
                        (0, w.jsx)(`p`, {
                          className: `reveal d2 mt-6 font-display text-2xl lg:text-3xl text-paper-dim italic max-w-[28ch] leading-snug`,
                          children: `“We do not write to be found. We write to leave the light on.”`,
                        }),
                        (0, w.jsxs)(`div`, {
                          className: `mt-8 flex items-center gap-2`,
                          children: [
                            (0, w.jsx)(`span`, {
                              className: `h-2 w-2 rounded-full bg-neon animate-ping`,
                            }),
                            (0, w.jsx)(`span`, {
                              className: `text-xs uppercase tracking-[0.2em] text-paper-dim font-mono`,
                              children: `Continuous Lamplight Reel`,
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, w.jsxs)(`div`, {
                      className: `reveal d3 col-span-4 pl-8 border-l border-neon/15`,
                      children: [
                        (0, w.jsxs)(`p`, {
                          className: `text-sm leading-relaxed text-paper-dim text-pretty`,
                          children: [
                            `Dedicated pages for poems, seasonal collections, physical chapbooks, and essays from`,
                            ` `,
                            (0, w.jsx)(r, {
                              to: `/about`,
                              className: `text-paper hover:text-neon underline underline-offset-4`,
                              children: `Adaeze Okafor`,
                            }),
                            ` `,
                            `and`,
                            ` `,
                            (0, w.jsx)(r, {
                              to: `/about`,
                              className: `text-paper hover:text-neon underline underline-offset-4`,
                              children: `Theo Lindqvist`,
                            }),
                            `.`,
                          ],
                        }),
                        (0, w.jsxs)(`div`, {
                          className: `mt-6 flex gap-3`,
                          children: [
                            (0, w.jsxs)(r, {
                              to: `/poems`,
                              className: `inline-flex items-center gap-2 rounded bg-neon px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-ink transition-all hover:bg-neon/90 shadow-md`,
                              children: [
                                (0, w.jsx)(s, { className: `h-4 w-4` }),
                                (0, w.jsx)(`span`, { children: `Explore Library` }),
                              ],
                            }),
                            (0, w.jsxs)(r, {
                              to: `/submit`,
                              className: `inline-flex items-center gap-2 rounded border border-neon/30 bg-ink-2/60 px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-paper transition-all hover:bg-neon/10`,
                              children: [
                                (0, w.jsx)(l, { className: `h-4 w-4` }),
                                (0, w.jsx)(`span`, { children: `Submit Work` }),
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
          (0, w.jsx)(`section`, {
            className: `border-b border-neon/10 bg-gradient-to-b from-ink-2/80 to-ink py-10 sm:py-16`,
            children: (0, w.jsx)(`div`, {
              className: `mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10`,
              children: (0, w.jsxs)(`div`, {
                className: `rounded-2xl border border-neon/20 bg-ink-2/90 p-5 sm:p-10 shadow-xl relative overflow-hidden`,
                children: [
                  (0, w.jsxs)(`div`, {
                    className: `flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neon/10`,
                    children: [
                      (0, w.jsxs)(`div`, {
                        className: `flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-neon font-medium`,
                        children: [
                          (0, w.jsx)(f, { className: `h-4 w-4 text-neon` }),
                          (0, w.jsx)(`span`, { children: `Verse of the Hour · Tap to shuffle` }),
                        ],
                      }),
                      (0, w.jsxs)(`div`, {
                        className: `flex items-center gap-2`,
                        children: [
                          (0, w.jsx)(`button`, {
                            type: `button`,
                            onClick: j,
                            className: `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neon/20 bg-ink text-xs uppercase tracking-[0.15em] text-paper-dim hover:text-paper active:scale-95 transition-all`,
                            children: n
                              ? (0, w.jsxs)(w.Fragment, {
                                  children: [
                                    (0, w.jsx)(c, { className: `h-3.5 w-3.5 text-neon` }),
                                    (0, w.jsx)(`span`, {
                                      className: `text-neon`,
                                      children: `Copied`,
                                    }),
                                  ],
                                })
                              : (0, w.jsxs)(w.Fragment, {
                                  children: [
                                    (0, w.jsx)(m, { className: `h-3.5 w-3.5` }),
                                    (0, w.jsx)(`span`, { children: `Share` }),
                                  ],
                                }),
                          }),
                          (0, w.jsxs)(`button`, {
                            type: `button`,
                            onClick: A,
                            className: `inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neon text-ink text-xs uppercase tracking-[0.16em] font-medium hover:bg-neon/90 active:scale-95 transition-all shadow-sm`,
                            children: [
                              (0, w.jsx)(S, { className: `h-3.5 w-3.5` }),
                              (0, w.jsx)(`span`, { children: `Next Verse` }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, w.jsxs)(`div`, {
                    className: `py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center`,
                    children: [
                      (0, w.jsxs)(`div`, {
                        className: `lg:col-span-8`,
                        children: [
                          (0, w.jsxs)(`h3`, {
                            className: `text-xs uppercase tracking-[0.2em] text-paper-faint mb-2`,
                            children: [`From “`, T.title, `” · `, T.readTime],
                          }),
                          (0, w.jsx)(`div`, {
                            className: `font-display text-2xl sm:text-3xl text-paper leading-[1.6] space-y-2 italic`,
                            children: (T.stanzas[0] ?? [])
                              .slice(0, 3)
                              .map((e, t) => (0, w.jsxs)(`p`, { children: [`“`, e, `”`] }, t)),
                          }),
                          (0, w.jsxs)(`p`, {
                            className: `mt-4 text-xs uppercase tracking-[0.2em] text-neon/80 font-medium`,
                            children: [`— `, T.author, ` (`, T.year, `)`],
                          }),
                        ],
                      }),
                      (0, w.jsxs)(`div`, {
                        className: `lg:col-span-4 lg:border-l lg:border-neon/15 lg:pl-8 flex flex-col justify-between gap-4`,
                        children: [
                          (0, w.jsx)(`p`, {
                            className: `text-xs sm:text-sm text-paper-dim leading-relaxed`,
                            children:
                              T.note ||
                              `Hand-printed under single lamplight for readers who take time.`,
                          }),
                          (0, w.jsxs)(r, {
                            to: `/poems/$id`,
                            params: { id: T.id },
                            className: `inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neon inkline font-medium`,
                            children: [
                              (0, w.jsx)(`span`, { children: `Read full poem in reader` }),
                              (0, w.jsx)(a, { className: `h-3.5 w-3.5` }),
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
          (0, w.jsxs)(`section`, {
            className: `mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10 py-16 sm:py-20`,
            children: [
              (0, w.jsxs)(`div`, {
                className: `flex flex-col sm:flex-row sm:items-baseline justify-between mb-10 gap-2 border-b border-neon/10 pb-6`,
                children: [
                  (0, w.jsxs)(`div`, {
                    children: [
                      (0, w.jsx)(`p`, {
                        className: `text-[11px] uppercase tracking-[0.28em] text-neon/80 font-medium`,
                        children: `Navigation Portal`,
                      }),
                      (0, w.jsx)(`h2`, {
                        className: `font-display text-3xl sm:text-4xl font-medium text-paper mt-1`,
                        children: `Explore Our Literary Pages`,
                      }),
                    ],
                  }),
                  (0, w.jsx)(`span`, {
                    className: `text-xs uppercase tracking-[0.2em] text-paper-faint`,
                    children: `Independent Pages & Archives`,
                  }),
                ],
              }),
              (0, w.jsx)(`div`, {
                className: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`,
                children: M.map((e) => {
                  let t = e.icon;
                  return (0, w.jsxs)(
                    r,
                    {
                      to: e.to,
                      className: `group rounded-xl border border-neon/15 bg-ink-2 p-6 flex flex-col justify-between transition-all hover:border-neon/40 hover:-translate-y-1 hover:shadow-lg`,
                      children: [
                        (0, w.jsxs)(`div`, {
                          children: [
                            (0, w.jsxs)(`div`, {
                              className: `flex items-center justify-between text-xs text-paper-faint uppercase tracking-[0.2em] mb-4`,
                              children: [
                                (0, w.jsx)(`div`, {
                                  className: `p-2.5 rounded-md bg-ink border border-neon/20 text-neon group-hover:bg-neon group-hover:text-ink transition-colors`,
                                  children: (0, w.jsx)(t, { className: `h-4 w-4` }),
                                }),
                                (0, w.jsx)(`span`, { children: e.count }),
                              ],
                            }),
                            (0, w.jsx)(`h3`, {
                              className: `font-display text-2xl font-medium text-paper group-hover:text-neon transition-colors`,
                              children: e.title,
                            }),
                            (0, w.jsx)(`p`, {
                              className: `mt-2.5 text-xs sm:text-sm text-paper-dim leading-relaxed`,
                              children: e.desc,
                            }),
                          ],
                        }),
                        (0, w.jsxs)(`div`, {
                          className: `mt-6 pt-4 border-t border-neon/10 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-neon font-medium`,
                          children: [
                            (0, w.jsx)(`span`, { children: e.action }),
                            (0, w.jsx)(a, {
                              className: `h-3.5 w-3.5 group-hover:translate-x-1 transition-transform`,
                            }),
                          ],
                        }),
                      ],
                    },
                    e.to,
                  );
                }),
              }),
            ],
          }),
          (0, w.jsx)(`section`, {
            className: `bg-ink-2/60 border-y border-neon/10 py-16 sm:py-24`,
            children: (0, w.jsx)(`div`, {
              className: `mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10`,
              children: (0, w.jsxs)(`div`, {
                className: `grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center`,
                children: [
                  (0, w.jsxs)(`div`, {
                    className: `col-span-12 lg:col-span-4 space-y-4`,
                    children: [
                      (0, w.jsx)(`p`, {
                        className: `text-[11px] uppercase tracking-[0.28em] text-neon/80 font-medium`,
                        children: `Poem of the Season`,
                      }),
                      (0, w.jsx)(`h2`, {
                        className: `font-display text-3xl sm:text-5xl font-medium text-paper leading-tight`,
                        children: D.title,
                      }),
                      (0, w.jsxs)(`p`, {
                        className: `text-xs uppercase tracking-[0.2em] text-paper-faint`,
                        children: [
                          `By `,
                          D.author,
                          ` · `,
                          D.linesCount,
                          ` lines ·`,
                          ` `,
                          D.readTime,
                        ],
                      }),
                      (0, w.jsx)(`p`, {
                        className: `text-sm text-paper-dim leading-relaxed pt-2`,
                        children: D.note,
                      }),
                      (0, w.jsx)(`div`, {
                        className: `pt-2`,
                        children: (0, w.jsxs)(r, {
                          to: `/poems/$id`,
                          params: { id: D.id },
                          className: `inline-flex items-center gap-2 rounded bg-neon px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium text-ink hover:bg-neon/90 transition-all`,
                          children: [
                            (0, w.jsx)(s, { className: `h-3.5 w-3.5` }),
                            (0, w.jsx)(`span`, { children: `Enter Reading Room` }),
                            (0, w.jsx)(a, { className: `h-3.5 w-3.5` }),
                          ],
                        }),
                      }),
                    ],
                  }),
                  (0, w.jsx)(`div`, {
                    className: `col-span-12 lg:col-span-8 lg:border-l lg:border-neon/15 lg:pl-10`,
                    children: (0, w.jsxs)(`div`, {
                      className: `font-display text-xl sm:text-2xl text-paper leading-[1.7] space-y-4 bg-ink p-6 sm:p-8 rounded-xl border border-neon/15 shadow-inner`,
                      children: [
                        D.stanzas
                          .slice(0, 2)
                          .map((e, t) =>
                            (0, w.jsx)(
                              `div`,
                              {
                                className: `space-y-1`,
                                children: e.map((e, t) => (0, w.jsx)(`p`, { children: e }, t)),
                              },
                              t,
                            ),
                          ),
                        (0, w.jsx)(`div`, {
                          className: `pt-4 text-right`,
                          children: (0, w.jsx)(r, {
                            to: `/poems/$id`,
                            params: { id: D.id },
                            className: `text-xs uppercase tracking-[0.2em] text-neon hover:underline`,
                            children: `Read complete poem with reader controls →`,
                          }),
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
          }),
          (0, w.jsx)(`section`, {
            className: `mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10 py-16 sm:py-24`,
            children: (0, w.jsxs)(`div`, {
              className: `grid grid-cols-1 md:grid-cols-2 gap-8`,
              children: [
                (0, w.jsxs)(`article`, {
                  className: `rounded-xl border border-neon/15 bg-ink-2 p-6 sm:p-8 flex flex-col justify-between`,
                  children: [
                    (0, w.jsxs)(`div`, {
                      children: [
                        (0, w.jsxs)(`div`, {
                          className: `flex items-center justify-between text-xs text-neon/80 uppercase tracking-[0.2em] mb-4`,
                          children: [
                            (0, w.jsx)(`span`, { children: `Featured Letterpress Edition` }),
                            (0, w.jsx)(`span`, {
                              className: `font-mono text-paper font-medium`,
                              children: O.price,
                            }),
                          ],
                        }),
                        (0, w.jsx)(`h3`, {
                          className: `font-display text-3xl font-medium text-paper`,
                          children: O.title,
                        }),
                        (0, w.jsxs)(`p`, {
                          className: `mt-1 text-xs uppercase tracking-[0.18em] text-paper-faint`,
                          children: [`By `, O.author, ` · `, O.pages, ` Pages`],
                        }),
                        (0, w.jsx)(`p`, {
                          className: `mt-4 text-sm text-paper-dim leading-relaxed`,
                          children: O.description,
                        }),
                        (0, w.jsxs)(`p`, {
                          className: `mt-4 p-3 rounded bg-ink text-xs italic text-paper-dim border-l-2 border-neon/40`,
                          children: [`“`, O.quote, `”`],
                        }),
                      ],
                    }),
                    (0, w.jsxs)(`div`, {
                      className: `mt-6 pt-4 border-t border-neon/10 flex items-center justify-between`,
                      children: [
                        (0, w.jsx)(`span`, {
                          className: `text-xs text-paper-faint`,
                          children: `Hand-numbered copies`,
                        }),
                        (0, w.jsxs)(r, {
                          to: `/books/$id`,
                          params: { id: O.id },
                          className: `text-xs uppercase tracking-[0.2em] text-neon inkline font-medium inline-flex items-center gap-1.5`,
                          children: [
                            (0, w.jsx)(`span`, { children: `Book Details & Order` }),
                            (0, w.jsx)(a, { className: `h-3.5 w-3.5` }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, w.jsxs)(`article`, {
                  className: `rounded-xl border border-neon/15 bg-ink-2 p-6 sm:p-8 flex flex-col justify-between`,
                  children: [
                    (0, w.jsxs)(`div`, {
                      children: [
                        (0, w.jsxs)(`div`, {
                          className: `flex items-center justify-between text-xs text-neon/80 uppercase tracking-[0.2em] mb-4`,
                          children: [
                            (0, w.jsx)(`span`, { children: `From the Literary Journal` }),
                            (0, w.jsx)(`span`, { children: k.readTime }),
                          ],
                        }),
                        (0, w.jsx)(`h3`, {
                          className: `font-display text-3xl font-medium text-paper`,
                          children: k.title,
                        }),
                        (0, w.jsxs)(`p`, {
                          className: `mt-1 text-xs uppercase tracking-[0.18em] text-paper-faint`,
                          children: [`By `, k.author, ` · `, k.date],
                        }),
                        (0, w.jsx)(`p`, {
                          className: `mt-4 text-sm text-paper-dim leading-relaxed`,
                          children: k.excerpt,
                        }),
                        (0, w.jsxs)(`p`, {
                          className: `mt-4 p-3 rounded bg-ink text-xs italic text-paper-dim border-l-2 border-neon/40`,
                          children: [`“`, k.content[0], `”`],
                        }),
                      ],
                    }),
                    (0, w.jsxs)(`div`, {
                      className: `mt-6 pt-4 border-t border-neon/10 flex items-center justify-between`,
                      children: [
                        (0, w.jsx)(`span`, {
                          className: `text-xs text-paper-faint`,
                          children: k.category,
                        }),
                        (0, w.jsxs)(r, {
                          to: `/musings/$id`,
                          params: { id: k.id },
                          className: `text-xs uppercase tracking-[0.2em] text-neon inkline font-medium inline-flex items-center gap-1.5`,
                          children: [
                            (0, w.jsx)(`span`, { children: `Read Full Essay` }),
                            (0, w.jsx)(a, { className: `h-3.5 w-3.5` }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
          (0, w.jsx)(`section`, {
            className: `border-t border-neon/10 py-16 bg-gradient-to-b from-ink to-ink-2`,
            children: (0, w.jsx)(`div`, {
              className: `mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10 text-center`,
              children: (0, w.jsxs)(`div`, {
                className: `mx-auto max-w-2xl space-y-4`,
                children: [
                  (0, w.jsxs)(`div`, {
                    className: `inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-neon`,
                    children: [
                      (0, w.jsx)(l, { className: `h-3 w-3` }),
                      (0, w.jsx)(`span`, { children: `Call for Writers` }),
                    ],
                  }),
                  (0, w.jsx)(`h2`, {
                    className: `font-display text-3xl sm:text-5xl font-medium text-paper`,
                    children: `Do You Write by Lamplight?`,
                  }),
                  (0, w.jsx)(`p`, {
                    className: `text-sm sm:text-base text-paper-dim leading-relaxed max-w-xl mx-auto`,
                    children: `We welcome submissions of standalone poems, chapbook suites, and craft essays from poets and writers worldwide.`,
                  }),
                  (0, w.jsxs)(`div`, {
                    className: `pt-4 flex flex-wrap justify-center gap-4`,
                    children: [
                      (0, w.jsxs)(r, {
                        to: `/submit`,
                        className: `inline-flex items-center gap-2 rounded bg-neon px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-ink hover:bg-neon/90 transition-all`,
                        children: [
                          (0, w.jsx)(`span`, { children: `Submit Your Manuscript` }),
                          (0, w.jsx)(a, { className: `h-3.5 w-3.5` }),
                        ],
                      }),
                      (0, w.jsx)(r, {
                        to: `/about`,
                        className: `inline-flex items-center gap-2 rounded border border-neon/30 px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-paper hover:bg-neon/10 transition-all`,
                        children: (0, w.jsx)(`span`, { children: `About Our Press` }),
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
export { D as component };

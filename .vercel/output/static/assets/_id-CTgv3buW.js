import { K as e, W as t, c as n, n as r, t as i } from "./createLucideIcon-BnNKfcXr.js";
import { t as a } from "./arrow-left-CaFqYGEK.js";
import { t as o } from "./arrow-right-Z_xHovhc.js";
import { t as s } from "./check-Dz3QWjsN.js";
import { t as c } from "./share-2-DzXqWaLc.js";
import { t as l } from "./sparkles-arFjGQUh.js";
import { i as u, l as d } from "./literature-j2lTA6at.js";
import { t as f } from "./_id-BtAp-TD5.js";
var p = i(`copy`, [
    [`rect`, { width: `14`, height: `14`, x: `8`, y: `8`, rx: `2`, ry: `2`, key: `17jyea` }],
    [`path`, { d: `M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2`, key: `zix9uf` }],
  ]),
  m = e(t()),
  h = n();
function g() {
  let { id: e } = f.useParams(),
    t = d(e),
    [n, i] = (0, m.useState)(`base`),
    [g, _] = (0, m.useState)(!1),
    [v, y] = (0, m.useState)(!1);
  if (!t)
    return (0, h.jsxs)(`div`, {
      className: `py-20 text-center mx-auto max-w-lg px-6`,
      children: [
        (0, h.jsx)(`h1`, {
          className: `font-display text-4xl text-paper`,
          children: `Poem not found`,
        }),
        (0, h.jsx)(`p`, {
          className: `mt-3 text-paper-dim`,
          children: `The poem you are looking for does not exist or may have been re-indexed.`,
        }),
        (0, h.jsx)(`div`, {
          className: `mt-6`,
          children: (0, h.jsxs)(r, {
            to: `/poems`,
            className: `inline-flex items-center gap-2 rounded bg-neon px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium text-ink`,
            children: [
              (0, h.jsx)(a, { className: `h-4 w-4` }),
              (0, h.jsx)(`span`, { children: `Return to Poems Library` }),
            ],
          }),
        }),
      ],
    });
  let b = u.findIndex((e) => e.id === t.id),
    x = b > 0 ? u[b - 1] : null,
    S = b < u.length - 1 ? u[b + 1] : null,
    C = () => {
      let e =
        `${t.title}\nBy ${t.author}\n\n` +
        t.stanzas.map((e) =>
          e.join(`
`),
        ).join(`

`) +
        `\n\n— Muse Books (${window.location.href})`;
      (navigator.clipboard.writeText(e), y(!0), setTimeout(() => y(!1), 2e3));
    },
    w = {
      sm: `text-lg sm:text-xl leading-[1.8]`,
      base: `text-xl sm:text-2xl leading-[1.9]`,
      lg: `text-2xl sm:text-3xl leading-[2.0]`,
    }[n];
  return (0, h.jsxs)(`div`, {
    className: `py-8 sm:py-20 transition-colors duration-500 pb-24 sm:pb-20 ${g ? `bg-[#161210] text-[#f4efe8]` : ``}`,
    children: [
      (0, h.jsxs)(`div`, {
        className: `mx-auto max-w-[900px] px-4 sm:px-6 lg:px-10`,
        children: [
          (0, h.jsxs)(`div`, {
            className: `flex items-center justify-between gap-4 pb-6 border-b border-neon/10`,
            children: [
              (0, h.jsxs)(r, {
                to: `/poems`,
                className: `inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-paper-dim hover:text-paper transition-colors`,
                children: [
                  (0, h.jsx)(a, { className: `h-3.5 w-3.5` }),
                  (0, h.jsx)(`span`, { children: `All Poems` }),
                ],
              }),
              (0, h.jsxs)(`div`, {
                className: `hidden sm:flex items-center gap-3`,
                children: [
                  (0, h.jsxs)(`div`, {
                    className: `flex items-center rounded-md border border-neon/20 bg-ink-2 p-0.5 text-xs`,
                    children: [
                      (0, h.jsx)(`button`, {
                        type: `button`,
                        onClick: () => i(`sm`),
                        className: `px-2.5 py-1 rounded text-xs transition-colors ${n === `sm` ? `bg-neon text-ink font-bold` : `text-paper-dim hover:text-paper`}`,
                        title: `Small text`,
                        children: `A-`,
                      }),
                      (0, h.jsx)(`button`, {
                        type: `button`,
                        onClick: () => i(`base`),
                        className: `px-2.5 py-1 rounded text-xs transition-colors ${n === `base` ? `bg-neon text-ink font-bold` : `text-paper-dim hover:text-paper`}`,
                        title: `Default text`,
                        children: `A`,
                      }),
                      (0, h.jsx)(`button`, {
                        type: `button`,
                        onClick: () => i(`lg`),
                        className: `px-2.5 py-1 rounded text-xs transition-colors ${n === `lg` ? `bg-neon text-ink font-bold` : `text-paper-dim hover:text-paper`}`,
                        title: `Large text`,
                        children: `A+`,
                      }),
                    ],
                  }),
                  (0, h.jsx)(`button`, {
                    type: `button`,
                    onClick: () => _(!g),
                    className: `p-2 rounded-md border text-xs transition-colors ${g ? `border-amber-400/40 bg-amber-400/10 text-amber-200` : `border-neon/20 bg-ink-2 text-paper-dim hover:text-paper`}`,
                    title: `Toggle warm lamplight mode`,
                    children: (0, h.jsx)(l, { className: `h-4 w-4` }),
                  }),
                  (0, h.jsxs)(`button`, {
                    type: `button`,
                    onClick: C,
                    className: `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-neon/20 bg-ink-2 text-xs uppercase tracking-[0.18em] text-paper-dim hover:text-neon transition-colors`,
                    title: `Copy poem text & link`,
                    children: [
                      v
                        ? (0, h.jsx)(s, { className: `h-3.5 w-3.5 text-neon` })
                        : (0, h.jsx)(p, { className: `h-3.5 w-3.5` }),
                      (0, h.jsx)(`span`, { children: v ? `Copied` : `Share` }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, h.jsxs)(`header`, {
            className: `pt-8 sm:pt-16 pb-6 text-center max-w-xl mx-auto space-y-3`,
            children: [
              (0, h.jsxs)(`div`, {
                className: `inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-neon/90 font-medium`,
                children: [
                  (0, h.jsx)(`span`, { children: t.collection }),
                  (0, h.jsx)(`span`, { children: `·` }),
                  (0, h.jsx)(`span`, { children: t.year }),
                ],
              }),
              (0, h.jsx)(`h1`, {
                className: `font-display text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-paper text-balance leading-tight`,
                children: t.title,
              }),
              (0, h.jsx)(`div`, {
                className: `pt-1`,
                children: (0, h.jsxs)(r, {
                  to: `/about`,
                  className: `text-xs uppercase tracking-[0.22em] text-paper-dim hover:text-neon transition-colors`,
                  children: [`By `, t.author],
                }),
              }),
              (0, h.jsxs)(`div`, {
                className: `flex justify-center items-center gap-3 pt-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-paper-faint`,
                children: [
                  (0, h.jsxs)(`span`, { children: [t.linesCount, ` lines`] }),
                  (0, h.jsx)(`span`, { children: `·` }),
                  (0, h.jsxs)(`span`, { children: [t.readTime, ` read`] }),
                ],
              }),
            ],
          }),
          (0, h.jsxs)(`article`, {
            className: `py-6 sm:py-10 max-w-lg mx-auto`,
            children: [
              (0, h.jsx)(`div`, {
                className: `font-display text-paper/95 space-y-8 ${w}`,
                children: t.stanzas.map((e, t) =>
                  (0, h.jsx)(
                    `div`,
                    {
                      className: `space-y-2`,
                      children: e.map((e, t) =>
                        (0, h.jsx)(`p`, { className: `tracking-wide text-pretty`, children: e }, t),
                      ),
                    },
                    t,
                  ),
                ),
              }),
              t.note &&
                (0, h.jsxs)(`div`, {
                  className: `mt-12 sm:mt-16 pt-6 border-t border-neon/15 text-xs sm:text-sm text-paper-dim italic bg-ink-2/60 p-4 sm:p-5 rounded-lg border border-neon/10`,
                  children: [
                    (0, h.jsx)(`p`, {
                      className: `text-[10px] sm:text-xs uppercase tracking-[0.2em] text-neon not-italic font-medium mb-1.5`,
                      children: `Poet's Note`,
                    }),
                    (0, h.jsxs)(`p`, { children: [`“`, t.note, `”`] }),
                  ],
                }),
              (0, h.jsx)(`div`, {
                className: `mt-8 flex flex-wrap gap-2`,
                children: t.tags.map((e) =>
                  (0, h.jsxs)(
                    r,
                    {
                      to: `/poems`,
                      className: `text-[11px] uppercase tracking-[0.16em] text-paper-faint hover:text-neon bg-ink-2 border border-neon/15 px-2.5 py-1 rounded-full transition-colors`,
                      children: [`#`, e],
                    },
                    e,
                  ),
                ),
              }),
            ],
          }),
          (0, h.jsxs)(`nav`, {
            className: `mt-12 sm:mt-16 pt-8 border-t border-neon/15 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6`,
            children: [
              x
                ? (0, h.jsxs)(r, {
                    to: `/poems/$id`,
                    params: { id: x.id },
                    className: `group p-4 sm:p-5 rounded-xl border border-neon/15 bg-ink-2 hover:border-neon/40 active:scale-[0.98] transition-all flex flex-col items-start`,
                    children: [
                      (0, h.jsxs)(`span`, {
                        className: `text-[10px] uppercase tracking-[0.22em] text-paper-faint flex items-center gap-1.5 mb-1`,
                        children: [
                          (0, h.jsx)(a, {
                            className: `h-3 w-3 group-hover:-translate-x-1 transition-transform`,
                          }),
                          `Previous Poem`,
                        ],
                      }),
                      (0, h.jsx)(`span`, {
                        className: `font-display text-lg sm:text-xl text-paper group-hover:text-neon transition-colors`,
                        children: x.title,
                      }),
                      (0, h.jsx)(`span`, {
                        className: `text-xs text-paper-dim mt-0.5`,
                        children: x.author,
                      }),
                    ],
                  })
                : (0, h.jsx)(`div`, { className: `hidden sm:block` }),
              S
                ? (0, h.jsxs)(r, {
                    to: `/poems/$id`,
                    params: { id: S.id },
                    className: `group p-4 sm:p-5 rounded-xl border border-neon/15 bg-ink-2 hover:border-neon/40 active:scale-[0.98] transition-all flex flex-col items-end text-right`,
                    children: [
                      (0, h.jsxs)(`span`, {
                        className: `text-[10px] uppercase tracking-[0.22em] text-paper-faint flex items-center gap-1.5 mb-1`,
                        children: [
                          `Next Poem`,
                          (0, h.jsx)(o, {
                            className: `h-3 w-3 group-hover:translate-x-1 transition-transform`,
                          }),
                        ],
                      }),
                      (0, h.jsx)(`span`, {
                        className: `font-display text-lg sm:text-xl text-paper group-hover:text-neon transition-colors`,
                        children: S.title,
                      }),
                      (0, h.jsx)(`span`, {
                        className: `text-xs text-paper-dim mt-0.5`,
                        children: S.author,
                      }),
                    ],
                  })
                : (0, h.jsx)(`div`, { className: `hidden sm:block` }),
            ],
          }),
        ],
      }),
      (0, h.jsxs)(`div`, {
        className: `sm:hidden fixed bottom-4 left-4 right-4 z-40 bg-ink-2/95 backdrop-blur-md border border-neon/30 rounded-full px-4 py-2.5 shadow-2xl flex items-center justify-between`,
        children: [
          (0, h.jsxs)(`div`, {
            className: `flex items-center gap-2`,
            children: [
              (0, h.jsxs)(`button`, {
                type: `button`,
                onClick: () => i((e) => (e === `sm` ? `base` : e === `base` ? `lg` : `sm`)),
                className: `px-2.5 py-1 rounded-full bg-ink border border-neon/20 text-xs font-serif text-paper`,
                title: `Toggle Text Size`,
                children: [`Size: `, n.toUpperCase()],
              }),
              (0, h.jsx)(`button`, {
                type: `button`,
                onClick: () => _(!g),
                className: `p-1.5 rounded-full border ${g ? `border-amber-400 bg-amber-400/20 text-amber-200` : `border-neon/20 bg-ink text-paper-dim`}`,
                title: `Toggle Warm Light`,
                children: (0, h.jsx)(l, { className: `h-3.5 w-3.5` }),
              }),
            ],
          }),
          (0, h.jsxs)(`button`, {
            type: `button`,
            onClick: C,
            className: `inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon text-ink text-xs font-medium uppercase tracking-[0.15em]`,
            children: [
              v
                ? (0, h.jsx)(s, { className: `h-3.5 w-3.5` })
                : (0, h.jsx)(c, { className: `h-3.5 w-3.5` }),
              (0, h.jsx)(`span`, { children: v ? `Copied` : `Share` }),
            ],
          }),
        ],
      }),
    ],
  });
}
export { g as component };

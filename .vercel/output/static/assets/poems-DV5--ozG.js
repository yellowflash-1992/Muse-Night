import { K as e, W as t, c as n, n as r, t as i } from "./createLucideIcon-BnNKfcXr.js";
import { t as a } from "./arrow-right-Z_xHovhc.js";
import { t as o } from "./book-open-0u_Fddua.js";
import { t as s } from "./feather-CywcPIGl.js";
import { a as c, i as l } from "./literature-j2lTA6at.js";
var u = i(`search`, [
    [`path`, { d: `m21 21-4.34-4.34`, key: `14j7rj` }],
    [`circle`, { cx: `11`, cy: `11`, r: `8`, key: `4ej97u` }],
  ]),
  d = e(t()),
  f = n();
function p() {
  let [e, t] = (0, d.useState)(``),
    [n, i] = (0, d.useState)(`all`),
    [p, m] = (0, d.useState)(`all`),
    h = (0, d.useMemo)(() => {
      let e = new Set();
      return (l.forEach((t) => t.tags.forEach((t) => e.add(t))), Array.from(e));
    }, []),
    g = (0, d.useMemo)(
      () =>
        l.filter((t) => {
          let r =
              e === `` ||
              t.title.toLowerCase().includes(e.toLowerCase()) ||
              t.author.toLowerCase().includes(e.toLowerCase()) ||
              t.stanzas.some((t) => t.some((t) => t.toLowerCase().includes(e.toLowerCase()))),
            i = n === `all` || t.authorId === n,
            a = p === `all` || t.tags.includes(p);
          return r && i && a;
        }),
      [e, n, p],
    );
  return (0, f.jsx)(`div`, {
    className: `py-12 sm:py-16`,
    children: (0, f.jsxs)(`div`, {
      className: `mx-auto max-w-[1240px] px-6 sm:px-10`,
      children: [
        (0, f.jsxs)(`div`, {
          className: `border-b border-neon/10 pb-10`,
          children: [
            (0, f.jsxs)(`div`, {
              className: `flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-neon/80 mb-3`,
              children: [
                (0, f.jsx)(s, { className: `h-3.5 w-3.5` }),
                (0, f.jsx)(`span`, { children: `The Verse Library` }),
              ],
            }),
            (0, f.jsx)(`h1`, {
              className: `font-display text-4xl sm:text-6xl font-medium text-paper`,
              children: `Poem Library`,
            }),
            (0, f.jsx)(`p`, {
              className: `mt-4 text-base sm:text-lg text-paper-dim max-w-[50ch] text-pretty`,
              children: `An archive of verses, epistles, and quiet observations written by lamplight and printed on cotton paper.`,
            }),
          ],
        }),
        (0, f.jsxs)(`div`, {
          className: `mt-8 space-y-4`,
          children: [
            (0, f.jsxs)(`div`, {
              className: `flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center`,
              children: [
                (0, f.jsxs)(`div`, {
                  className: `relative flex-1 max-w-md`,
                  children: [
                    (0, f.jsx)(u, {
                      className: `absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-paper-faint`,
                    }),
                    (0, f.jsx)(`input`, {
                      type: `text`,
                      value: e,
                      onChange: (e) => t(e.target.value),
                      placeholder: `Search poems, lines, or themes...`,
                      className: `w-full pl-10 pr-4 py-2.5 rounded-lg bg-ink-2 border border-neon/20 text-paper text-sm placeholder:text-paper-faint focus:border-neon focus:outline-none transition-colors shadow-inner`,
                    }),
                  ],
                }),
                (0, f.jsxs)(`div`, {
                  className: `flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none`,
                  children: [
                    (0, f.jsxs)(`button`, {
                      type: `button`,
                      onClick: () => i(`all`),
                      className: `whitespace-nowrap px-4 py-2 rounded-full text-xs uppercase tracking-[0.16em] transition-all shrink-0 ${n === `all` ? `bg-neon text-ink font-medium shadow-sm` : `bg-ink-2 text-paper-dim hover:text-paper border border-neon/10`}`,
                      children: [`All Poets (`, l.length, `)`],
                    }),
                    Object.values(c).map((e) =>
                      (0, f.jsx)(
                        `button`,
                        {
                          type: `button`,
                          onClick: () => i(e.id),
                          className: `whitespace-nowrap px-4 py-2 rounded-full text-xs uppercase tracking-[0.16em] transition-all shrink-0 ${n === e.id ? `bg-neon text-ink font-medium shadow-sm` : `bg-ink-2 text-paper-dim hover:text-paper border border-neon/10`}`,
                          children: e.name,
                        },
                        e.id,
                      ),
                    ),
                  ],
                }),
              ],
            }),
            (0, f.jsxs)(`div`, {
              className: `flex items-center gap-2 pt-3 border-t border-neon/5 overflow-x-auto pb-1 scrollbar-none`,
              children: [
                (0, f.jsx)(`span`, {
                  className: `text-[11px] uppercase tracking-[0.2em] text-paper-faint mr-1 shrink-0`,
                  children: `Themes:`,
                }),
                (0, f.jsx)(`button`, {
                  type: `button`,
                  onClick: () => m(`all`),
                  className: `text-xs px-3 py-1 rounded-full whitespace-nowrap transition-colors shrink-0 ${p === `all` ? `bg-neon/15 text-neon border border-neon/30 font-medium` : `text-paper-dim hover:text-paper bg-ink-2 border border-transparent`}`,
                  children: `All Themes`,
                }),
                h.map((e) =>
                  (0, f.jsxs)(
                    `button`,
                    {
                      type: `button`,
                      onClick: () => m(e),
                      className: `text-xs px-3 py-1 rounded-full whitespace-nowrap transition-colors shrink-0 ${p === e ? `bg-neon/15 text-neon border border-neon/30 font-medium` : `text-paper-dim hover:text-paper bg-ink-2 border border-transparent`}`,
                      children: [`#`, e],
                    },
                    e,
                  ),
                ),
              ],
            }),
          ],
        }),
        (0, f.jsx)(`div`, {
          className: `mt-10`,
          children:
            g.length === 0
              ? (0, f.jsxs)(`div`, {
                  className: `text-center py-20 rounded-lg border border-dashed border-neon/20 bg-ink-2/40`,
                  children: [
                    (0, f.jsx)(o, { className: `mx-auto h-8 w-8 text-paper-faint mb-3` }),
                    (0, f.jsx)(`p`, {
                      className: `font-display text-2xl text-paper`,
                      children: `No poems found`,
                    }),
                    (0, f.jsx)(`p`, {
                      className: `text-sm text-paper-dim mt-1`,
                      children: `Try loosening your search term or selecting another theme filter.`,
                    }),
                    (0, f.jsx)(`button`, {
                      type: `button`,
                      onClick: () => {
                        (t(``), i(`all`), m(`all`));
                      },
                      className: `mt-4 px-4 py-1.5 text-xs uppercase tracking-[0.2em] bg-neon text-ink rounded hover:bg-neon/90`,
                      children: `Reset Filters`,
                    }),
                  ],
                })
              : (0, f.jsx)(`div`, {
                  className: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`,
                  children: g.map((e) =>
                    (0, f.jsxs)(
                      `article`,
                      {
                        className: `group rounded-lg border border-neon/15 bg-ink-2 p-6 flex flex-col justify-between transition-all hover:border-neon/40 hover:-translate-y-1`,
                        children: [
                          (0, f.jsxs)(`div`, {
                            children: [
                              (0, f.jsxs)(`div`, {
                                className: `flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-paper-faint mb-3`,
                                children: [
                                  (0, f.jsx)(`span`, {
                                    className: `text-neon/80`,
                                    children: e.author,
                                  }),
                                  (0, f.jsx)(`span`, { children: e.readTime }),
                                ],
                              }),
                              (0, f.jsx)(`h2`, {
                                className: `font-display text-2xl sm:text-[1.75rem] font-medium leading-tight text-paper group-hover:text-neon transition-colors`,
                                children: (0, f.jsx)(r, {
                                  to: `/poems/$id`,
                                  params: { id: e.id },
                                  children: e.title,
                                }),
                              }),
                              (0, f.jsxs)(`p`, {
                                className: `mt-2 text-xs uppercase tracking-[0.16em] text-paper-faint`,
                                children: [`Collection: `, e.collection, ` (`, e.year, `)`],
                              }),
                              (0, f.jsxs)(`div`, {
                                className: `mt-4 font-display text-base text-paper-dim/90 leading-relaxed italic border-l border-neon/20 pl-3`,
                                children: [
                                  e.stanzas[0]
                                    ?.slice(0, 3)
                                    .map((e, t) =>
                                      (0, f.jsx)(`p`, { className: `truncate`, children: e }, t),
                                    ),
                                  (e.stanzas[0]?.length ?? 0) > 3 &&
                                    (0, f.jsx)(`p`, {
                                      className: `text-paper-faint`,
                                      children: `...`,
                                    }),
                                ],
                              }),
                              (0, f.jsx)(`div`, {
                                className: `mt-5 flex flex-wrap gap-1.5`,
                                children: e.tags.map((e) =>
                                  (0, f.jsx)(
                                    `span`,
                                    {
                                      className: `text-[10px] uppercase tracking-[0.15em] bg-ink px-2 py-0.5 rounded text-paper-faint border border-neon/10`,
                                      children: e,
                                    },
                                    e,
                                  ),
                                ),
                              }),
                            ],
                          }),
                          (0, f.jsxs)(`div`, {
                            className: `mt-6 pt-4 border-t border-neon/10 flex items-center justify-between`,
                            children: [
                              (0, f.jsxs)(`span`, {
                                className: `text-xs text-paper-faint`,
                                children: [e.linesCount, ` lines`],
                              }),
                              (0, f.jsxs)(r, {
                                to: `/poems/$id`,
                                params: { id: e.id },
                                className: `inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-neon inkline font-medium`,
                                children: [
                                  (0, f.jsx)(`span`, { children: `Read Poem` }),
                                  (0, f.jsx)(a, { className: `h-3 w-3` }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      },
                      e.id,
                    ),
                  ),
                }),
        }),
      ],
    }),
  });
}
export { p as component };

import { c as e, n as t } from "./createLucideIcon-BnNKfcXr.js";
import { t as n } from "./arrow-left-CaFqYGEK.js";
import { t as r } from "./arrow-right-Z_xHovhc.js";
import { t as i } from "./layers-DEWR5DJu.js";
import { t as a } from "./quote-D42mR2Vo.js";
import { i as o, s } from "./literature-j2lTA6at.js";
import { t as c } from "./_id-vlxKwDN2.js";
var l = e();
function u() {
  let { id: e } = c.useParams(),
    u = s(e);
  if (!u)
    return (0, l.jsxs)(`div`, {
      className: `py-20 text-center mx-auto max-w-lg px-6`,
      children: [
        (0, l.jsx)(`h1`, {
          className: `font-display text-4xl text-paper`,
          children: `Collection not found`,
        }),
        (0, l.jsx)(`p`, {
          className: `mt-3 text-paper-dim`,
          children: `The collection could not be located in our archives.`,
        }),
        (0, l.jsx)(`div`, {
          className: `mt-6`,
          children: (0, l.jsxs)(t, {
            to: `/collections`,
            className: `inline-flex items-center gap-2 rounded bg-neon px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium text-ink`,
            children: [
              (0, l.jsx)(n, { className: `h-4 w-4` }),
              (0, l.jsx)(`span`, { children: `Return to Collections` }),
            ],
          }),
        }),
      ],
    });
  let d = o.filter((e) => e.collectionId === u.id || u.poemIds.includes(e.id));
  return (0, l.jsx)(`div`, {
    className: `py-12 sm:py-20`,
    children: (0, l.jsxs)(`div`, {
      className: `mx-auto max-w-[1040px] px-6 sm:px-10`,
      children: [
        (0, l.jsx)(`div`, {
          className: `mb-8`,
          children: (0, l.jsxs)(t, {
            to: `/collections`,
            className: `inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-paper-dim hover:text-neon transition-colors`,
            children: [
              (0, l.jsx)(n, { className: `h-3.5 w-3.5` }),
              (0, l.jsx)(`span`, { children: `All Collections` }),
            ],
          }),
        }),
        (0, l.jsxs)(`div`, {
          className: `grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start border-b border-neon/10 pb-12`,
          children: [
            u.coverImage &&
              (0, l.jsx)(`div`, {
                className: `col-span-12 md:col-span-5 lg:col-span-4`,
                children: (0, l.jsx)(`div`, {
                  className: `overflow-hidden rounded-lg bg-ink-3 aspect-[4/5] shadow-2xl border border-neon/20`,
                  children: (0, l.jsx)(`img`, {
                    src: u.coverImage,
                    alt: u.title,
                    className: `h-full w-full object-cover`,
                  }),
                }),
              }),
            (0, l.jsxs)(`div`, {
              className: `col-span-12 ${u.coverImage ? `md:col-span-7 lg:col-span-8` : `col-span-12`} space-y-4`,
              children: [
                (0, l.jsxs)(`div`, {
                  className: `flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-neon/80`,
                  children: [
                    (0, l.jsx)(i, { className: `h-3.5 w-3.5` }),
                    (0, l.jsxs)(`span`, { children: [`Volume Published `, u.year] }),
                  ],
                }),
                (0, l.jsx)(`h1`, {
                  className: `font-display text-4xl sm:text-6xl font-medium text-paper`,
                  children: u.title,
                }),
                (0, l.jsx)(`p`, {
                  className: `font-display text-xl sm:text-2xl text-paper-dim italic`,
                  children: u.subtitle,
                }),
                (0, l.jsxs)(`div`, {
                  className: `text-xs uppercase tracking-[0.2em] text-paper-faint pt-1`,
                  children: [
                    `Authored by`,
                    ` `,
                    (0, l.jsx)(t, {
                      to: `/about`,
                      className: `text-paper underline hover:text-neon`,
                      children: u.author,
                    }),
                  ],
                }),
                (0, l.jsx)(`p`, {
                  className: `text-sm text-paper-dim leading-relaxed pt-2`,
                  children: u.description,
                }),
              ],
            }),
          ],
        }),
        (0, l.jsxs)(`div`, {
          className: `py-12 border-b border-neon/10 max-w-2xl`,
          children: [
            (0, l.jsxs)(`div`, {
              className: `flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-neon/80 mb-3`,
              children: [
                (0, l.jsx)(a, { className: `h-3.5 w-3.5` }),
                (0, l.jsx)(`span`, { children: `Author's Foreword` }),
              ],
            }),
            (0, l.jsxs)(`p`, {
              className: `font-display text-xl sm:text-2xl text-paper leading-relaxed italic`,
              children: [`“`, u.foreword, `”`],
            }),
            (0, l.jsxs)(`p`, {
              className: `mt-4 text-xs uppercase tracking-[0.2em] text-paper-faint`,
              children: [`— `, u.author],
            }),
          ],
        }),
        (0, l.jsxs)(`div`, {
          className: `py-12`,
          children: [
            (0, l.jsxs)(`div`, {
              className: `flex items-baseline justify-between mb-8`,
              children: [
                (0, l.jsxs)(`div`, {
                  children: [
                    (0, l.jsx)(`p`, {
                      className: `text-xs uppercase tracking-[0.25em] text-neon/80`,
                      children: `Table of Contents`,
                    }),
                    (0, l.jsx)(`h2`, {
                      className: `font-display text-3xl font-medium text-paper mt-1`,
                      children: `Poems in this Collection`,
                    }),
                  ],
                }),
                (0, l.jsxs)(`span`, {
                  className: `text-xs uppercase tracking-[0.2em] text-paper-faint`,
                  children: [d.length, ` Available to read`],
                }),
              ],
            }),
            (0, l.jsx)(`div`, {
              className: `divide-y divide-neon/10 border-y border-neon/10`,
              children: d.map((e, n) =>
                (0, l.jsxs)(
                  `div`,
                  {
                    className: `py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-neon/5 px-3 rounded transition-colors`,
                    children: [
                      (0, l.jsxs)(`div`, {
                        className: `flex items-baseline gap-4`,
                        children: [
                          (0, l.jsx)(`span`, {
                            className: `text-xs text-neon/70 tabular-nums`,
                            children: String(n + 1).padStart(2, `0`),
                          }),
                          (0, l.jsxs)(`div`, {
                            children: [
                              (0, l.jsx)(`h3`, {
                                className: `font-display text-2xl text-paper group-hover:text-neon transition-colors`,
                                children: (0, l.jsx)(t, {
                                  to: `/poems/$id`,
                                  params: { id: e.id },
                                  children: e.title,
                                }),
                              }),
                              (0, l.jsxs)(`p`, {
                                className: `text-xs text-paper-faint mt-0.5`,
                                children: [e.linesCount, ` lines · `, e.readTime, ` read`],
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, l.jsxs)(t, {
                        to: `/poems/$id`,
                        params: { id: e.id },
                        className: `inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-neon inkline font-medium`,
                        children: [
                          (0, l.jsx)(`span`, { children: `Read Poem` }),
                          (0, l.jsx)(r, { className: `h-3.5 w-3.5` }),
                        ],
                      }),
                    ],
                  },
                  e.id,
                ),
              ),
            }),
          ],
        }),
        (0, l.jsxs)(`div`, {
          className: `pt-10 border-t border-neon/10 flex flex-col sm:flex-row items-center justify-between gap-4`,
          children: [
            (0, l.jsx)(t, {
              to: `/collections`,
              className: `text-xs uppercase tracking-[0.2em] text-paper-dim hover:text-paper`,
              children: `← View all collections`,
            }),
            (0, l.jsx)(t, {
              to: `/books`,
              className: `text-xs uppercase tracking-[0.2em] text-neon hover:underline`,
              children: `Browse physical chapbook editions →`,
            }),
          ],
        }),
      ],
    }),
  });
}
export { u as component };

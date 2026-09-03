import { c as e, n as t } from "./createLucideIcon-BnNKfcXr.js";
import { t as n } from "./arrow-right-Z_xHovhc.js";
import { t as r } from "./book-marked-CbT39qVx.js";
import { t as i } from "./circle-check-CXPeO8Jn.js";
import { t as a } from "./literature-j2lTA6at.js";
var o = e();
function s() {
  return (0, o.jsx)(`div`, {
    className: `py-12 sm:py-16`,
    children: (0, o.jsxs)(`div`, {
      className: `mx-auto max-w-[1240px] px-6 sm:px-10`,
      children: [
        (0, o.jsxs)(`div`, {
          className: `border-b border-neon/10 pb-10`,
          children: [
            (0, o.jsxs)(`div`, {
              className: `flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-neon/80 mb-3`,
              children: [
                (0, o.jsx)(r, { className: `h-3.5 w-3.5` }),
                (0, o.jsx)(`span`, { children: `The Letterpress Editions` }),
              ],
            }),
            (0, o.jsx)(`h1`, {
              className: `font-display text-4xl sm:text-6xl font-medium text-paper`,
              children: `Hand-Bound Chapbooks`,
            }),
            (0, o.jsx)(`p`, {
              className: `mt-4 text-base sm:text-lg text-paper-dim max-w-[52ch] text-pretty`,
              children: `Printed on an 1890s Albion press using hand-set lead type, 100% cotton rag paper, and traditional archival bindings.`,
            }),
          ],
        }),
        (0, o.jsxs)(`div`, {
          className: `my-10 rounded-lg border border-neon/20 bg-ink-2/60 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-paper-dim`,
          children: [
            (0, o.jsxs)(`div`, {
              className: `space-y-1`,
              children: [
                (0, o.jsx)(`p`, {
                  className: `text-neon uppercase tracking-[0.2em] font-medium`,
                  children: `Letterpress Printing`,
                }),
                (0, o.jsx)(`p`, {
                  className: `leading-relaxed`,
                  children: `Set by hand in metal Bembo and Caslon type, impression pulled leaf by leaf.`,
                }),
              ],
            }),
            (0, o.jsxs)(`div`, {
              className: `space-y-1`,
              children: [
                (0, o.jsx)(`p`, {
                  className: `text-neon uppercase tracking-[0.2em] font-medium`,
                  children: `Archival Papers`,
                }),
                (0, o.jsx)(`p`, {
                  className: `leading-relaxed`,
                  children: `Deckle-edged Zerkall and Hahnemühle cotton mould-made sheets.`,
                }),
              ],
            }),
            (0, o.jsxs)(`div`, {
              className: `space-y-1`,
              children: [
                (0, o.jsx)(`p`, {
                  className: `text-neon uppercase tracking-[0.2em] font-medium`,
                  children: `Hand-Sewn Bindings`,
                }),
                (0, o.jsx)(`p`, {
                  className: `leading-relaxed`,
                  children: `Stitched using pure Irish linen thread and Japanese silk cord.`,
                }),
              ],
            }),
          ],
        }),
        (0, o.jsx)(`div`, {
          className: `grid grid-cols-1 lg:grid-cols-2 gap-10`,
          children: a.map((e) =>
            (0, o.jsxs)(
              `article`,
              {
                className: `group rounded-xl border border-neon/15 bg-ink-2 p-6 sm:p-8 flex flex-col justify-between hover:border-neon/40 transition-all`,
                children: [
                  (0, o.jsxs)(`div`, {
                    children: [
                      (0, o.jsx)(t, {
                        to: `/books/$id`,
                        params: { id: e.id },
                        children: (0, o.jsx)(`div`, {
                          className: `overflow-hidden rounded-lg bg-ink-3 aspect-[4/5] mb-6 border border-neon/10`,
                          children: (0, o.jsx)(`img`, {
                            src: e.coverImage,
                            alt: e.title,
                            loading: `lazy`,
                            className: `h-full w-full object-cover transition-transform duration-500 group-hover:scale-105`,
                          }),
                        }),
                      }),
                      (0, o.jsxs)(`div`, {
                        className: `flex items-center justify-between text-xs uppercase tracking-[0.22em] text-neon/80`,
                        children: [
                          (0, o.jsx)(`span`, { children: e.author }),
                          (0, o.jsx)(`span`, {
                            className: `font-mono text-sm text-paper`,
                            children: e.price,
                          }),
                        ],
                      }),
                      (0, o.jsx)(`h2`, {
                        className: `mt-2 font-display text-3xl sm:text-4xl font-medium text-paper group-hover:text-neon transition-colors`,
                        children: (0, o.jsx)(t, {
                          to: `/books/$id`,
                          params: { id: e.id },
                          children: e.title,
                        }),
                      }),
                      (0, o.jsxs)(`p`, {
                        className: `mt-4 text-sm text-paper-dim italic`,
                        children: [`“`, e.quote, `”`],
                      }),
                      (0, o.jsxs)(`div`, {
                        className: `mt-6 pt-5 border-t border-neon/10 space-y-2 text-xs text-paper-dim`,
                        children: [
                          (0, o.jsxs)(`div`, {
                            className: `flex justify-between`,
                            children: [
                              (0, o.jsx)(`span`, {
                                className: `text-paper-faint uppercase tracking-[0.16em]`,
                                children: `Edition:`,
                              }),
                              (0, o.jsx)(`span`, { children: e.edition }),
                            ],
                          }),
                          (0, o.jsxs)(`div`, {
                            className: `flex justify-between`,
                            children: [
                              (0, o.jsx)(`span`, {
                                className: `text-paper-faint uppercase tracking-[0.16em]`,
                                children: `Binding:`,
                              }),
                              (0, o.jsx)(`span`, {
                                className: `truncate max-w-[24ch] text-right`,
                                children: e.binding,
                              }),
                            ],
                          }),
                          (0, o.jsxs)(`div`, {
                            className: `flex justify-between`,
                            children: [
                              (0, o.jsx)(`span`, {
                                className: `text-paper-faint uppercase tracking-[0.16em]`,
                                children: `Paper:`,
                              }),
                              (0, o.jsx)(`span`, {
                                className: `truncate max-w-[24ch] text-right`,
                                children: e.paper,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, o.jsxs)(`div`, {
                    className: `mt-8 pt-5 border-t border-neon/10 flex flex-wrap gap-4 items-center justify-between`,
                    children: [
                      (0, o.jsxs)(`span`, {
                        className: `inline-flex items-center gap-1.5 text-xs text-neon`,
                        children: [
                          (0, o.jsx)(i, { className: `h-4 w-4` }),
                          (0, o.jsx)(`span`, { children: `Limited copies available` }),
                        ],
                      }),
                      (0, o.jsxs)(t, {
                        to: `/books/$id`,
                        params: { id: e.id },
                        className: `inline-flex items-center gap-2 rounded bg-neon px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium text-ink hover:bg-neon/90 transition-all`,
                        children: [
                          (0, o.jsx)(`span`, { children: `View Edition & Order` }),
                          (0, o.jsx)(n, { className: `h-3.5 w-3.5` }),
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
      ],
    }),
  });
}
export { s as component };

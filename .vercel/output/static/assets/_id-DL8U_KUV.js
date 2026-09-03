import { c as e, n as t } from "./createLucideIcon-BnNKfcXr.js";
import { t as n } from "./arrow-left-CaFqYGEK.js";
import { t as r } from "./clock-BN_e3-oT.js";
import { c as i } from "./literature-j2lTA6at.js";
import { t as a } from "./_id-D3PgXy-Q.js";
var o = e();
function s() {
  let { id: e } = a.useParams(),
    s = i(e);
  return s
    ? (0, o.jsx)(`div`, {
        className: `py-12 sm:py-20`,
        children: (0, o.jsxs)(`div`, {
          className: `mx-auto max-w-[800px] px-6 sm:px-10`,
          children: [
            (0, o.jsx)(`div`, {
              className: `mb-10`,
              children: (0, o.jsxs)(t, {
                to: `/musings`,
                className: `inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-paper-dim hover:text-neon transition-colors`,
                children: [
                  (0, o.jsx)(n, { className: `h-3.5 w-3.5` }),
                  (0, o.jsx)(`span`, { children: `All Musings & Essays` }),
                ],
              }),
            }),
            (0, o.jsxs)(`header`, {
              className: `space-y-4 border-b border-neon/10 pb-8`,
              children: [
                (0, o.jsxs)(`div`, {
                  className: `flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-neon/80`,
                  children: [
                    (0, o.jsx)(`span`, { children: s.category }),
                    (0, o.jsx)(`span`, { children: `·` }),
                    (0, o.jsxs)(`span`, {
                      className: `flex items-center gap-1`,
                      children: [(0, o.jsx)(r, { className: `h-3 w-3` }), s.readTime],
                    }),
                  ],
                }),
                (0, o.jsx)(`h1`, {
                  className: `font-display text-3xl sm:text-5xl font-medium tracking-tight text-paper text-balance leading-tight`,
                  children: s.title,
                }),
                (0, o.jsxs)(`div`, {
                  className: `flex items-center justify-between pt-2 text-xs uppercase tracking-[0.18em] text-paper-faint`,
                  children: [
                    (0, o.jsxs)(t, {
                      to: `/about`,
                      className: `text-paper hover:text-neon transition-colors`,
                      children: [`Written by `, s.author],
                    }),
                    (0, o.jsx)(`span`, { children: s.date }),
                  ],
                }),
              ],
            }),
            (0, o.jsxs)(`div`, {
              className: `my-8 p-6 rounded-lg bg-ink-2 border-l-2 border-neon text-lg sm:text-xl font-display text-paper italic leading-relaxed`,
              children: [`“`, s.excerpt, `”`],
            }),
            (0, o.jsx)(`article`, {
              className: `prose prose-invert max-w-none text-base sm:text-lg leading-[1.85] text-paper/90 space-y-6`,
              children: s.content.map((e, t) =>
                (0, o.jsx)(`p`, { className: `tracking-wide`, children: e }, t),
              ),
            }),
            (0, o.jsxs)(`div`, {
              className: `mt-16 pt-8 border-t border-neon/15 bg-ink-2 p-6 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`,
              children: [
                (0, o.jsxs)(`div`, {
                  children: [
                    (0, o.jsx)(`p`, {
                      className: `text-xs uppercase tracking-[0.2em] text-neon font-medium`,
                      children: `About the Author`,
                    }),
                    (0, o.jsx)(`p`, {
                      className: `font-display text-xl text-paper mt-1`,
                      children: s.author,
                    }),
                    (0, o.jsx)(`p`, {
                      className: `text-xs text-paper-dim mt-1`,
                      children: `Co-founder of Muse Books and author of hand-printed chapbook editions.`,
                    }),
                  ],
                }),
                (0, o.jsx)(t, {
                  to: `/about`,
                  className: `rounded border border-neon/30 px-4 py-2 text-xs uppercase tracking-[0.18em] text-paper hover:bg-neon/10 transition-colors shrink-0`,
                  children: `Author Bio →`,
                }),
              ],
            }),
            (0, o.jsxs)(`div`, {
              className: `mt-12 flex justify-between items-center text-xs uppercase tracking-[0.2em] text-paper-dim`,
              children: [
                (0, o.jsx)(t, {
                  to: `/musings`,
                  className: `hover:text-neon`,
                  children: `← Back to all essays`,
                }),
                (0, o.jsx)(t, {
                  to: `/poems`,
                  className: `text-neon hover:underline`,
                  children: `Read poetry archive →`,
                }),
              ],
            }),
          ],
        }),
      })
    : (0, o.jsxs)(`div`, {
        className: `py-20 text-center mx-auto max-w-lg px-6`,
        children: [
          (0, o.jsx)(`h1`, {
            className: `font-display text-4xl text-paper`,
            children: `Essay not found`,
          }),
          (0, o.jsx)(`p`, {
            className: `mt-3 text-paper-dim`,
            children: `The requested dispatch is not in our journal index.`,
          }),
          (0, o.jsx)(`div`, {
            className: `mt-6`,
            children: (0, o.jsxs)(t, {
              to: `/musings`,
              className: `inline-flex items-center gap-2 rounded bg-neon px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium text-ink`,
              children: [
                (0, o.jsx)(n, { className: `h-4 w-4` }),
                (0, o.jsx)(`span`, { children: `Return to Musings` }),
              ],
            }),
          }),
        ],
      });
}
export { s as component };

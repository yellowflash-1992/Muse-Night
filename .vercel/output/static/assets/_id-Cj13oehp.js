import { K as e, W as t, c as n, n as r, t as i } from "./createLucideIcon-BnNKfcXr.js";
import { t as a } from "./arrow-left-CaFqYGEK.js";
import { t as o } from "./book-marked-CbT39qVx.js";
import { t as s } from "./circle-check-CXPeO8Jn.js";
import { t as c } from "./send-DWuMIr-w.js";
import { t as l } from "./sparkles-arFjGQUh.js";
import { o as u } from "./literature-j2lTA6at.js";
import { t as d } from "./_id-C5vDZ6DC.js";
var f = i(`package`, [
    [
      `path`,
      {
        d: `M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z`,
        key: `1a0edw`,
      },
    ],
    [`path`, { d: `M12 22V12`, key: `d0xqtd` }],
    [`polyline`, { points: `3.29 7 12 12 20.71 7`, key: `ousv84` }],
    [`path`, { d: `m7.5 4.27 9 5.15`, key: `1c824w` }],
  ]),
  p = e(t()),
  m = n();
function h() {
  let { id: e } = d.useParams(),
    t = u(e),
    [n, i] = (0, p.useState)(!1),
    [h, g] = (0, p.useState)(!1),
    [_, v] = (0, p.useState)(``),
    [y, b] = (0, p.useState)(``),
    [x, S] = (0, p.useState)(``),
    [C, w] = (0, p.useState)(`1`);
  return t
    ? (0, m.jsxs)(`div`, {
        className: `py-12 sm:py-20`,
        children: [
          (0, m.jsxs)(`div`, {
            className: `mx-auto max-w-[1140px] px-6 sm:px-10`,
            children: [
              (0, m.jsx)(`div`, {
                className: `mb-8`,
                children: (0, m.jsxs)(r, {
                  to: `/books`,
                  className: `inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-paper-dim hover:text-neon transition-colors`,
                  children: [
                    (0, m.jsx)(a, { className: `h-3.5 w-3.5` }),
                    (0, m.jsx)(`span`, { children: `All Chapbooks` }),
                  ],
                }),
              }),
              (0, m.jsxs)(`div`, {
                className: `grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-start`,
                children: [
                  (0, m.jsx)(`div`, {
                    className: `col-span-12 lg:col-span-5`,
                    children: (0, m.jsx)(`div`, {
                      className: `overflow-hidden rounded-xl bg-ink-3 aspect-[4/5] shadow-2xl border border-neon/20 lg:sticky lg:top-28`,
                      children: (0, m.jsx)(`img`, {
                        src: t.coverImage,
                        alt: t.title,
                        className: `h-full w-full object-cover`,
                      }),
                    }),
                  }),
                  (0, m.jsxs)(`div`, {
                    className: `col-span-12 lg:col-span-7 space-y-8`,
                    children: [
                      (0, m.jsxs)(`div`, {
                        children: [
                          (0, m.jsxs)(`div`, {
                            className: `flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-neon/80 mb-2`,
                            children: [
                              (0, m.jsx)(o, { className: `h-3.5 w-3.5` }),
                              (0, m.jsx)(`span`, { children: `Letterpress Chapbook Edition` }),
                            ],
                          }),
                          (0, m.jsx)(`h1`, {
                            className: `font-display text-4xl sm:text-5xl font-medium text-paper`,
                            children: t.title,
                          }),
                          (0, m.jsxs)(`p`, {
                            className: `mt-2 text-sm uppercase tracking-[0.2em] text-paper-dim`,
                            children: [
                              `By`,
                              ` `,
                              (0, m.jsx)(r, {
                                to: `/about`,
                                className: `text-paper underline hover:text-neon`,
                                children: t.author,
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, m.jsxs)(`div`, {
                        className: `flex items-baseline gap-4 py-3 border-y border-neon/10`,
                        children: [
                          (0, m.jsx)(`span`, {
                            className: `font-mono text-3xl font-medium text-paper`,
                            children: t.price,
                          }),
                          (0, m.jsxs)(`span`, {
                            className: `text-xs uppercase tracking-[0.2em] text-neon flex items-center gap-1.5`,
                            children: [
                              (0, m.jsx)(s, { className: `h-4 w-4` }),
                              (0, m.jsx)(`span`, { children: `In Stock · Ready for dispatch` }),
                            ],
                          }),
                        ],
                      }),
                      (0, m.jsx)(`p`, {
                        className: `text-base sm:text-lg leading-relaxed text-paper-dim`,
                        children: t.description,
                      }),
                      (0, m.jsxs)(`div`, {
                        className: `p-5 rounded-lg bg-ink-2 border-l-2 border-neon text-paper italic font-display text-xl leading-relaxed`,
                        children: [`“`, t.quote, `”`],
                      }),
                      (0, m.jsxs)(`div`, {
                        className: `rounded-lg border border-neon/15 bg-ink-2 p-6 space-y-4`,
                        children: [
                          (0, m.jsx)(`h3`, {
                            className: `text-xs uppercase tracking-[0.25em] text-neon/90 font-medium border-b border-neon/10 pb-2`,
                            children: `Physical Specifications`,
                          }),
                          (0, m.jsxs)(`dl`, {
                            className: `grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-xs`,
                            children: [
                              (0, m.jsxs)(`div`, {
                                children: [
                                  (0, m.jsx)(`dt`, {
                                    className: `text-paper-faint uppercase tracking-[0.16em]`,
                                    children: `Edition Run`,
                                  }),
                                  (0, m.jsx)(`dd`, {
                                    className: `text-paper font-medium mt-0.5`,
                                    children: t.edition,
                                  }),
                                ],
                              }),
                              (0, m.jsxs)(`div`, {
                                children: [
                                  (0, m.jsx)(`dt`, {
                                    className: `text-paper-faint uppercase tracking-[0.16em]`,
                                    children: `Page Count`,
                                  }),
                                  (0, m.jsxs)(`dd`, {
                                    className: `text-paper font-medium mt-0.5`,
                                    children: [t.pages, ` Pages`],
                                  }),
                                ],
                              }),
                              (0, m.jsxs)(`div`, {
                                children: [
                                  (0, m.jsx)(`dt`, {
                                    className: `text-paper-faint uppercase tracking-[0.16em]`,
                                    children: `Binding`,
                                  }),
                                  (0, m.jsx)(`dd`, {
                                    className: `text-paper font-medium mt-0.5`,
                                    children: t.binding,
                                  }),
                                ],
                              }),
                              (0, m.jsxs)(`div`, {
                                children: [
                                  (0, m.jsx)(`dt`, {
                                    className: `text-paper-faint uppercase tracking-[0.16em]`,
                                    children: `Paper Stock`,
                                  }),
                                  (0, m.jsx)(`dd`, {
                                    className: `text-paper font-medium mt-0.5`,
                                    children: t.paper,
                                  }),
                                ],
                              }),
                              (0, m.jsxs)(`div`, {
                                children: [
                                  (0, m.jsx)(`dt`, {
                                    className: `text-paper-faint uppercase tracking-[0.16em]`,
                                    children: `Dimensions`,
                                  }),
                                  (0, m.jsx)(`dd`, {
                                    className: `text-paper font-medium mt-0.5`,
                                    children: t.dimensions,
                                  }),
                                ],
                              }),
                              (0, m.jsxs)(`div`, {
                                children: [
                                  (0, m.jsx)(`dt`, {
                                    className: `text-paper-faint uppercase tracking-[0.16em]`,
                                    children: `Press`,
                                  }),
                                  (0, m.jsx)(`dd`, {
                                    className: `text-paper font-medium mt-0.5`,
                                    children: `1890s Albion Hand Press`,
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, m.jsxs)(`div`, {
                        className: `rounded-lg border border-neon/15 bg-ink-2 p-6 space-y-3`,
                        children: [
                          (0, m.jsx)(`h3`, {
                            className: `text-xs uppercase tracking-[0.25em] text-neon/90 font-medium border-b border-neon/10 pb-2`,
                            children: `Table of Contents`,
                          }),
                          (0, m.jsx)(`ul`, {
                            className: `space-y-2 text-sm text-paper-dim`,
                            children: t.tableOfContents.map((e, t) =>
                              (0, m.jsxs)(
                                `li`,
                                {
                                  className: `flex items-center gap-3`,
                                  children: [
                                    (0, m.jsx)(`span`, {
                                      className: `text-xs text-neon/70 tabular-nums`,
                                      children: String(t + 1).padStart(2, `0`),
                                    }),
                                    (0, m.jsx)(`span`, { className: `text-paper`, children: e }),
                                  ],
                                },
                                t,
                              ),
                            ),
                          }),
                        ],
                      }),
                      (0, m.jsxs)(`div`, {
                        className: `pt-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center`,
                        children: [
                          (0, m.jsxs)(`button`, {
                            type: `button`,
                            onClick: () => i(!0),
                            className: `inline-flex items-center justify-center gap-2 rounded bg-neon px-6 py-3.5 text-xs uppercase tracking-[0.22em] font-medium text-ink hover:bg-neon/90 transition-all shadow-md`,
                            children: [
                              (0, m.jsx)(f, { className: `h-4 w-4` }),
                              (0, m.jsx)(`span`, { children: `Reserve Hand-Numbered Copy` }),
                            ],
                          }),
                          (0, m.jsx)(r, {
                            to: `/poems`,
                            className: `inline-flex items-center justify-center gap-2 rounded border border-neon/30 px-5 py-3 text-xs uppercase tracking-[0.2em] font-medium text-paper hover:bg-neon/10 transition-all`,
                            children: (0, m.jsx)(`span`, { children: `Read Digital Verses` }),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          n &&
            (0, m.jsx)(`div`, {
              className: `fixed inset-0 z-50 flex items-center justify-center bg-ink/80 backdrop-blur-sm p-4 animate-in fade-in`,
              children: (0, m.jsxs)(`div`, {
                className: `w-full max-w-lg rounded-xl border border-neon/30 bg-ink-2 p-6 sm:p-8 shadow-2xl relative overflow-y-auto max-h-[90vh]`,
                children: [
                  (0, m.jsx)(`button`, {
                    type: `button`,
                    onClick: () => {
                      (i(!1), g(!1));
                    },
                    className: `absolute right-4 top-4 text-paper-dim hover:text-paper`,
                    children: `✕`,
                  }),
                  h
                    ? (0, m.jsxs)(`div`, {
                        className: `text-center py-8 space-y-4`,
                        children: [
                          (0, m.jsx)(`div`, {
                            className: `inline-flex p-3 rounded-full bg-neon/15 text-neon`,
                            children: (0, m.jsx)(s, { className: `h-10 w-10` }),
                          }),
                          (0, m.jsx)(`h3`, {
                            className: `font-display text-3xl text-paper`,
                            children: `Reservation Inscribed`,
                          }),
                          (0, m.jsxs)(`p`, {
                            className: `text-sm text-paper-dim leading-relaxed max-w-sm mx-auto`,
                            children: [
                              `Thank you, `,
                              (0, m.jsx)(`span`, {
                                className: `text-paper font-medium`,
                                children: _,
                              }),
                              `. We have reserved your copy of `,
                              (0, m.jsx)(`span`, {
                                className: `text-paper italic`,
                                children: t.title,
                              }),
                              `. A dispatch confirmation and tracking details will be sent to`,
                              ` `,
                              (0, m.jsx)(`span`, {
                                className: `text-paper font-medium`,
                                children: y,
                              }),
                              `.`,
                            ],
                          }),
                          (0, m.jsx)(`button`, {
                            type: `button`,
                            onClick: () => {
                              (i(!1), g(!1));
                            },
                            className: `mt-4 rounded bg-neon px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-ink`,
                            children: `Close Window`,
                          }),
                        ],
                      })
                    : (0, m.jsxs)(`form`, {
                        onSubmit: (e) => {
                          (e.preventDefault(), _ && y && g(!0));
                        },
                        className: `space-y-4`,
                        children: [
                          (0, m.jsxs)(`div`, {
                            children: [
                              (0, m.jsxs)(`div`, {
                                className: `flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-neon/80 mb-1`,
                                children: [
                                  (0, m.jsx)(l, { className: `h-3.5 w-3.5` }),
                                  (0, m.jsx)(`span`, { children: `Reserve Edition` }),
                                ],
                              }),
                              (0, m.jsxs)(`h3`, {
                                className: `font-display text-2xl text-paper`,
                                children: [`Order `, t.title, ` — `, t.price],
                              }),
                              (0, m.jsx)(`p`, {
                                className: `text-xs text-paper-dim mt-1`,
                                children: `Includes hand-numbered bookplate and postal dispatch in protective wax wrapping.`,
                              }),
                            ],
                          }),
                          (0, m.jsxs)(`div`, {
                            className: `space-y-3 pt-2`,
                            children: [
                              (0, m.jsxs)(`div`, {
                                children: [
                                  (0, m.jsx)(`label`, {
                                    className: `block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1`,
                                    children: `Your Full Name`,
                                  }),
                                  (0, m.jsx)(`input`, {
                                    type: `text`,
                                    required: !0,
                                    value: _,
                                    onChange: (e) => v(e.target.value),
                                    placeholder: `e.g. Eleanor Vance`,
                                    className: `w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper placeholder:text-paper-faint focus:border-neon focus:outline-none`,
                                  }),
                                ],
                              }),
                              (0, m.jsxs)(`div`, {
                                children: [
                                  (0, m.jsx)(`label`, {
                                    className: `block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1`,
                                    children: `Email Address`,
                                  }),
                                  (0, m.jsx)(`input`, {
                                    type: `email`,
                                    required: !0,
                                    value: y,
                                    onChange: (e) => b(e.target.value),
                                    placeholder: `eleanor@literature.org`,
                                    className: `w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper placeholder:text-paper-faint focus:border-neon focus:outline-none`,
                                  }),
                                ],
                              }),
                              (0, m.jsxs)(`div`, {
                                className: `grid grid-cols-1 sm:grid-cols-2 gap-3`,
                                children: [
                                  (0, m.jsxs)(`div`, {
                                    children: [
                                      (0, m.jsx)(`label`, {
                                        className: `block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1`,
                                        children: `Quantity`,
                                      }),
                                      (0, m.jsxs)(`select`, {
                                        value: C,
                                        onChange: (e) => w(e.target.value),
                                        className: `w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper focus:border-neon focus:outline-none`,
                                        children: [
                                          (0, m.jsxs)(`option`, {
                                            value: `1`,
                                            children: [`1 copy (`, t.price, `)`],
                                          }),
                                          (0, m.jsx)(`option`, {
                                            value: `2`,
                                            children: `2 copies`,
                                          }),
                                          (0, m.jsx)(`option`, {
                                            value: `3`,
                                            children: `3 copies (max)`,
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, m.jsxs)(`div`, {
                                    children: [
                                      (0, m.jsx)(`label`, {
                                        className: `block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1`,
                                        children: `Country`,
                                      }),
                                      (0, m.jsx)(`input`, {
                                        type: `text`,
                                        defaultValue: `United Kingdom / Europe`,
                                        className: `w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper focus:border-neon focus:outline-none`,
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, m.jsxs)(`div`, {
                                children: [
                                  (0, m.jsx)(`label`, {
                                    className: `block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1`,
                                    children: `Postal Shipping Address`,
                                  }),
                                  (0, m.jsx)(`textarea`, {
                                    rows: 2,
                                    required: !0,
                                    value: x,
                                    onChange: (e) => S(e.target.value),
                                    placeholder: `Street address, city, postcode...`,
                                    className: `w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper placeholder:text-paper-faint focus:border-neon focus:outline-none`,
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, m.jsxs)(`div`, {
                            className: `pt-3 flex items-center justify-between border-t border-neon/10`,
                            children: [
                              (0, m.jsx)(`span`, {
                                className: `text-xs text-paper-faint`,
                                children: `Free worldwide literary postal delivery`,
                              }),
                              (0, m.jsxs)(`button`, {
                                type: `submit`,
                                className: `inline-flex items-center gap-2 rounded bg-neon px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-ink hover:bg-neon/90`,
                                children: [
                                  (0, m.jsx)(c, { className: `h-3.5 w-3.5` }),
                                  (0, m.jsx)(`span`, { children: `Confirm Reservation` }),
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
      })
    : (0, m.jsxs)(`div`, {
        className: `py-20 text-center mx-auto max-w-lg px-6`,
        children: [
          (0, m.jsx)(`h1`, {
            className: `font-display text-4xl text-paper`,
            children: `Chapbook not found`,
          }),
          (0, m.jsx)(`p`, {
            className: `mt-3 text-paper-dim`,
            children: `The edition you requested is not in our catalogue.`,
          }),
          (0, m.jsx)(`div`, {
            className: `mt-6`,
            children: (0, m.jsxs)(r, {
              to: `/books`,
              className: `inline-flex items-center gap-2 rounded bg-neon px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium text-ink`,
              children: [
                (0, m.jsx)(a, { className: `h-4 w-4` }),
                (0, m.jsx)(`span`, { children: `Return to Chapbooks` }),
              ],
            }),
          }),
        ],
      });
}
export { h as component };

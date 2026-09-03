import { r as __toESM } from "../_runtime.mjs";
import {
  n as require_jsx_runtime,
  r as require_react,
} from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import {
  S as Calendar,
  b as CircleCheck,
  g as Feather,
  h as FileText,
  i as Sparkles,
  o as Send,
} from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/submit-B4fj2BIA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SubmitPage() {
  const [submitted, setSubmitted] = (0, import_react.useState)(false);
  const [name, setName] = (0, import_react.useState)("");
  const [email, setEmail] = (0, import_react.useState)("");
  const [type, setType] = (0, import_react.useState)("poem");
  const [title, setTitle] = (0, import_react.useState)("");
  const [manuscript, setManuscript] = (0, import_react.useState)("");
  const [bio, setBio] = (0, import_react.useState)("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && manuscript) {
      setSubmitted(true);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    className: "py-12 sm:py-20",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
      className: "mx-auto max-w-[1140px] px-6 sm:px-10",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "border-b border-neon/10 pb-12",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className:
                "flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-neon/80 mb-3",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feather, { className: "h-3.5 w-3.5" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                  children: "Open Call for Writers & Poets",
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
              className: "font-display text-4xl sm:text-6xl font-medium text-paper",
              children: "Submit Your Work",
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
              className: "mt-4 text-base sm:text-lg text-paper-dim max-w-[56ch] text-pretty",
              children:
                "We are always listening for voices that write with patience, attention to silence, and care for language. We accept standalone poems, chapbook suites, and craft musings.",
            }),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "grid grid-cols-1 md:grid-cols-3 gap-6 my-12",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "rounded-lg border border-neon/15 bg-ink-2 p-6 space-y-3",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neon",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4" }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                      children: "Reading Schedule",
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
                  className: "font-display text-xl text-paper",
                  children: "Year-Round Reading",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                  className: "text-xs text-paper-dim leading-relaxed",
                  children:
                    "We review submissions on a rolling basis. Expect a thoughtful personal response within 4 to 6 weeks.",
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "rounded-lg border border-neon/15 bg-ink-2 p-6 space-y-3",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neon",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                      children: "Formats Accepted",
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
                  className: "font-display text-xl text-paper",
                  children: "Poems & Chapbooks",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                  className: "text-xs text-paper-dim leading-relaxed",
                  children:
                    "1–5 poems per submission, or a full chapbook manuscript of 20–35 pages. Musings: 800–2,000 words.",
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "rounded-lg border border-neon/15 bg-ink-2 p-6 space-y-3",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neon",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                      children: "Letterpress Print",
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
                  className: "font-display text-xl text-paper",
                  children: "Physical Imprint",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                  className: "text-xs text-paper-dim leading-relaxed",
                  children:
                    "Selected poems are published digitally and considered for our limited letterpress chapbook runs.",
                }),
              ],
            }),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "col-span-12 lg:col-span-5 space-y-6",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "rounded-xl border border-neon/15 bg-ink-2 p-6 space-y-4",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
                      className: "font-display text-2xl text-paper",
                      children: "What We Seek",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
                      className: "space-y-3 text-xs text-paper-dim leading-relaxed",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
                          className: "flex items-start gap-2",
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                              className: "text-neon mt-0.5",
                              children: "•",
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                              children:
                                "Poems that honor sensory detail, domestic solitude, weather, and memory.",
                            }),
                          ],
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
                          className: "flex items-start gap-2",
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                              className: "text-neon mt-0.5",
                              children: "•",
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                              children:
                                "Epistolary poems (letters, postcards, dispatches to absent companions).",
                            }),
                          ],
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
                          className: "flex items-start gap-2",
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                              className: "text-neon mt-0.5",
                              children: "•",
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                              children:
                                "Essays reflecting on the physical craft of reading, typesetting, and writing.",
                            }),
                          ],
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
                          className: "flex items-start gap-2",
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                              className: "text-neon mt-0.5",
                              children: "•",
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                              children: "Translations of under-represented international poets.",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className:
                    "rounded-xl border border-neon/10 bg-ink-2/60 p-6 text-xs text-paper-dim space-y-2",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                      className: "text-neon uppercase tracking-[0.2em] font-medium",
                      children: "Author Rights",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                      className: "leading-relaxed",
                      children:
                        "Authors retain all copyrights to their original work. Muse Books requests first serial rights and non-exclusive archival rights.",
                    }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
              className: "col-span-12 lg:col-span-7",
              children: submitted
                ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                    className:
                      "rounded-xl border border-neon/40 bg-ink-2 p-8 sm:p-12 text-center space-y-6 animate-in fade-in",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                        className: "inline-flex p-4 rounded-full bg-neon/15 text-neon",
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
                          className: "h-12 w-12",
                        }),
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
                        className: "font-display text-4xl text-paper",
                        children: "Manuscript Received",
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
                        className: "text-sm text-paper-dim leading-relaxed max-w-md mx-auto",
                        children: [
                          "Thank you, ",
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                            className: "text-paper font-medium",
                            children: name,
                          }),
                          ". Your work",
                          " ",
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                            className: "text-paper italic",
                            children: ["“", title || "Untitled Submission", "”"],
                          }),
                          " has been delivered to our editorial desk. We will read it by lamplight and reply to",
                          " ",
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                            className: "text-paper font-medium",
                            children: email,
                          }),
                          ".",
                        ],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                        className: "pt-4 flex justify-center gap-4",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
                            type: "button",
                            onClick: () => {
                              setSubmitted(false);
                              setTitle("");
                              setManuscript("");
                              setBio("");
                            },
                            className:
                              "rounded bg-neon px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-ink hover:bg-neon/90",
                            children: "Submit Another Piece",
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
                            to: "/poems",
                            className:
                              "rounded border border-neon/30 px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-paper hover:bg-neon/10",
                            children: "Browse Archive",
                          }),
                        ],
                      }),
                    ],
                  })
                : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
                    onSubmit: handleSubmit,
                    className: "rounded-xl border border-neon/20 bg-ink-2 p-6 sm:p-8 space-y-6",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
                            className: "font-display text-3xl font-medium text-paper",
                            children: "Submit Manuscript",
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                            className: "text-xs text-paper-dim mt-1",
                            children: "Please paste your submission text directly below.",
                          }),
                        ],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                        className: "space-y-4",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
                                    className:
                                      "block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1",
                                    children: "Your Name / Pen Name *",
                                  }),
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
                                    type: "text",
                                    required: true,
                                    value: name,
                                    onChange: (e) => setName(e.target.value),
                                    placeholder: "e.g. Rowan Davies",
                                    className:
                                      "w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper placeholder:text-paper-faint focus:border-neon focus:outline-none",
                                  }),
                                ],
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
                                    className:
                                      "block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1",
                                    children: "Email Address *",
                                  }),
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
                                    type: "email",
                                    required: true,
                                    value: email,
                                    onChange: (e) => setEmail(e.target.value),
                                    placeholder: "rowan@example.com",
                                    className:
                                      "w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper placeholder:text-paper-faint focus:border-neon focus:outline-none",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
                                    className:
                                      "block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1",
                                    children: "Submission Category",
                                  }),
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
                                    value: type,
                                    onChange: (e) => setType(e.target.value),
                                    className:
                                      "w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper focus:border-neon focus:outline-none",
                                    children: [
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
                                        value: "poem",
                                        children: "Single Poem / Suite (1–5 poems)",
                                      }),
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
                                        value: "chapbook",
                                        children: "Chapbook Manuscript (20–35 pages)",
                                      }),
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
                                        value: "musing",
                                        children: "Literary Essay / Musing",
                                      }),
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
                                        value: "translation",
                                        children: "Poetry Translation",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
                                    className:
                                      "block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1",
                                    children: "Work Title *",
                                  }),
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
                                    type: "text",
                                    required: true,
                                    value: title,
                                    onChange: (e) => setTitle(e.target.value),
                                    placeholder: "e.g. Winter Letters",
                                    className:
                                      "w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper placeholder:text-paper-faint focus:border-neon focus:outline-none",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
                                className:
                                  "block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1",
                                children: "Poem / Manuscript Text *",
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
                                rows: 8,
                                required: true,
                                value: manuscript,
                                onChange: (e) => setManuscript(e.target.value),
                                placeholder:
                                  "Paste your poem(s) with your preferred stanza spacing and indentation...",
                                className:
                                  "w-full font-serif text-sm rounded bg-ink border border-neon/20 px-3 py-3 text-paper placeholder:text-paper-faint focus:border-neon focus:outline-none leading-relaxed",
                              }),
                            ],
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
                                className:
                                  "block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1",
                                children: "Brief Bio & Cover Note (Optional)",
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
                                rows: 3,
                                value: bio,
                                onChange: (e) => setBio(e.target.value),
                                placeholder:
                                  "Tell us a little about yourself, your location, and where you write...",
                                className:
                                  "w-full rounded bg-ink border border-neon/20 px-3 py-2 text-xs text-paper placeholder:text-paper-faint focus:border-neon focus:outline-none",
                              }),
                            ],
                          }),
                        ],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                        className:
                          "pt-4 border-t border-neon/10 flex flex-col sm:flex-row items-center justify-between gap-4",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                            className: "text-xs text-paper-faint text-center sm:text-left",
                            children:
                              "No reading fees. We never charge writers to read their work.",
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
                            type: "submit",
                            className:
                              "w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded bg-neon px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium text-ink hover:bg-neon/90 transition-all shadow-md",
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {
                                className: "h-3.5 w-3.5",
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
            }),
          ],
        }),
      ],
    }),
  });
}
//#endregion
export { SubmitPage as component };

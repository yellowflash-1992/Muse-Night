import { c as getMusingById } from "./_ssr/literature-qxY3elwu.mjs";
import { n as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./_id-DBGFn7oI.mjs";
import { E as ArrowLeft, y as Clock } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-BGcWjL3H.js
var import_jsx_runtime = require_jsx_runtime();
function MusingDetail() {
	const { id } = Route.useParams();
	const musing = getMusingById(id);
	if (!musing) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-20 text-center mx-auto max-w-lg px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl text-paper",
				children: "Essay not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-paper-dim",
				children: "The requested dispatch is not in our journal index."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/musings",
					className: "inline-flex items-center gap-2 rounded bg-neon px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Return to Musings" })]
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "py-12 sm:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[800px] px-6 sm:px-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/musings",
						className: "inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-paper-dim hover:text-neon transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "All Musings & Essays" })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "space-y-4 border-b border-neon/10 pb-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-neon/80",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: musing.category }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }), musing.readTime]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl sm:text-5xl font-medium tracking-tight text-paper text-balance leading-tight",
							children: musing.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between pt-2 text-xs uppercase tracking-[0.18em] text-paper-faint",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/about",
								className: "text-paper hover:text-neon transition-colors",
								children: ["Written by ", musing.author]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: musing.date })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "my-8 p-6 rounded-lg bg-ink-2 border-l-2 border-neon text-lg sm:text-xl font-display text-paper italic leading-relaxed",
					children: [
						"“",
						musing.excerpt,
						"”"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
					className: "prose prose-invert max-w-none text-base sm:text-lg leading-[1.85] text-paper/90 space-y-6",
					children: musing.content.map((paragraph, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tracking-wide",
						children: paragraph
					}, index))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-16 pt-8 border-t border-neon/15 bg-ink-2 p-6 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.2em] text-neon font-medium",
							children: "About the Author"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl text-paper mt-1",
							children: musing.author
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-paper-dim mt-1",
							children: "Co-founder of Muse Books and author of hand-printed chapbook editions."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/about",
						className: "rounded border border-neon/30 px-4 py-2 text-xs uppercase tracking-[0.18em] text-paper hover:bg-neon/10 transition-colors shrink-0",
						children: "Author Bio →"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 flex justify-between items-center text-xs uppercase tracking-[0.2em] text-paper-dim",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/musings",
						className: "hover:text-neon",
						children: "← Back to all essays"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/poems",
						className: "text-neon hover:underline",
						children: "Read poetry archive →"
					})]
				})
			]
		})
	});
}
//#endregion
export { MusingDetail as component };

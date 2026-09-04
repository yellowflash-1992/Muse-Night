import { r as MUSINGS } from "./literature-qxY3elwu.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as ArrowRight, i as Sparkles, y as Clock } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/musings-CuOfwfMM.js
var import_jsx_runtime = require_jsx_runtime();
function MusingsIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "py-12 sm:py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1240px] px-6 sm:px-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-neon/10 pb-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-neon/80 mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "The Literary Journal" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl sm:text-6xl font-medium text-paper",
						children: "Musings & Essays"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-base sm:text-lg text-paper-dim max-w-[50ch] text-pretty",
						children: "Essays on poetic craft, letterpress philosophy, and reflections written during the quiet intervals between poems."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
				children: MUSINGS.map((musing) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "group rounded-xl border border-neon/15 bg-ink-2 p-6 sm:p-8 flex flex-col justify-between hover:border-neon/40 hover:-translate-y-1 transition-all",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-xs text-paper-faint uppercase tracking-[0.2em] mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-neon/90 font-medium",
								children: musing.category
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }), musing.readTime]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl sm:text-3xl font-medium text-paper leading-tight group-hover:text-neon transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/musings/$id",
								params: { id: musing.id },
								children: musing.title
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-paper-dim leading-relaxed",
							children: musing.excerpt
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 pt-5 border-t border-neon/10 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-paper-faint",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["By ", musing.author] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-[10px] text-paper-faint mt-0.5",
								children: musing.date
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/musings/$id",
							params: { id: musing.id },
							className: "inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-neon inkline font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Read Essay" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
						})]
					})]
				}, musing.id))
			})]
		})
	});
}
//#endregion
export { MusingsIndex as component };

import { i as POEMS, s as getCollectionById } from "./_ssr/literature-qxY3elwu.mjs";
import { n as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { E as ArrowLeft, T as ArrowRight, l as Quote, m as Layers } from "./_libs/lucide-react.mjs";
import { t as Route } from "./_id-B5BexOYf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-DXlYHKK7.js
var import_jsx_runtime = require_jsx_runtime();
function CollectionDetail() {
	const { id } = Route.useParams();
	const collection = getCollectionById(id);
	if (!collection) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-20 text-center mx-auto max-w-lg px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl text-paper",
				children: "Collection not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-paper-dim",
				children: "The collection could not be located in our archives."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/collections",
					className: "inline-flex items-center gap-2 rounded bg-neon px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Return to Collections" })]
				})
			})
		]
	});
	const includedPoems = POEMS.filter((p) => p.collectionId === collection.id || collection.poemIds.includes(p.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "py-12 sm:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1040px] px-6 sm:px-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/collections",
						className: "inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-paper-dim hover:text-neon transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "All Collections" })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start border-b border-neon/10 pb-12",
					children: [collection.coverImage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "col-span-12 md:col-span-5 lg:col-span-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-hidden rounded-lg bg-ink-3 aspect-[4/5] shadow-2xl border border-neon/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: collection.coverImage,
								alt: collection.title,
								className: "h-full w-full object-cover"
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `col-span-12 ${collection.coverImage ? "md:col-span-7 lg:col-span-8" : "col-span-12"} space-y-4`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-neon/80",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Volume Published ", collection.year] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-4xl sm:text-6xl font-medium text-paper",
								children: collection.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl sm:text-2xl text-paper-dim italic",
								children: collection.subtitle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs uppercase tracking-[0.2em] text-paper-faint pt-1",
								children: [
									"Authored by",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/about",
										className: "text-paper underline hover:text-neon",
										children: collection.author
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-paper-dim leading-relaxed pt-2",
								children: collection.description
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-12 border-b border-neon/10 max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-neon/80 mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Author's Foreword" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-xl sm:text-2xl text-paper leading-relaxed italic",
							children: [
								"“",
								collection.foreword,
								"”"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-xs uppercase tracking-[0.2em] text-paper-faint",
							children: ["— ", collection.author]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between mb-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.25em] text-neon/80",
							children: "Table of Contents"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl font-medium text-paper mt-1",
							children: "Poems in this Collection"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs uppercase tracking-[0.2em] text-paper-faint",
							children: [includedPoems.length, " Available to read"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y divide-neon/10 border-y border-neon/10",
						children: includedPoems.map((poem, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-neon/5 px-3 rounded transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-neon/70 tabular-nums",
									children: String(idx + 1).padStart(2, "0")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-2xl text-paper group-hover:text-neon transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/poems/$id",
										params: { id: poem.id },
										children: poem.title
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-paper-faint mt-0.5",
									children: [
										poem.linesCount,
										" lines · ",
										poem.readTime,
										" read"
									]
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/poems/$id",
								params: { id: poem.id },
								className: "inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-neon inkline font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Read Poem" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
							})]
						}, poem.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pt-10 border-t border-neon/10 flex flex-col sm:flex-row items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/collections",
						className: "text-xs uppercase tracking-[0.2em] text-paper-dim hover:text-paper",
						children: "← View all collections"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/books",
						className: "text-xs uppercase tracking-[0.2em] text-neon hover:underline",
						children: "Browse physical chapbook editions →"
					})]
				})
			]
		})
	});
}
//#endregion
export { CollectionDetail as component };

import { r as __toESM } from "./_runtime.mjs";
import { i as POEMS, l as getPoemById } from "./_ssr/literature-qxY3elwu.mjs";
import { n as require_jsx_runtime, r as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { E as ArrowLeft, T as ArrowRight, _ as Copy, a as Share2, i as Sparkles, x as Check } from "./_libs/lucide-react.mjs";
import { t as Route } from "./_id-DXOQLRRr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-N4aHhSOP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PoemReader() {
	const { id } = Route.useParams();
	const poem = getPoemById(id);
	const [fontSize, setFontSize] = (0, import_react.useState)("base");
	const [warmMode, setWarmMode] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(false);
	if (!poem) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-20 text-center mx-auto max-w-lg px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl text-paper",
				children: "Poem not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-paper-dim",
				children: "The poem you are looking for does not exist or may have been re-indexed."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/poems",
					className: "inline-flex items-center gap-2 rounded bg-neon px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Return to Poems Library" })]
				})
			})
		]
	});
	const currentIndex = POEMS.findIndex((p) => p.id === poem.id);
	const prevPoem = currentIndex > 0 ? POEMS[currentIndex - 1] : null;
	const nextPoem = currentIndex < POEMS.length - 1 ? POEMS[currentIndex + 1] : null;
	const handleCopy = () => {
		const textToCopy = `${poem.title}\nBy ${poem.author}\n\n` + poem.stanzas.map((s) => s.join("\n")).join("\n\n") + `\n\n— Muse Books (${window.location.href})`;
		navigator.clipboard.writeText(textToCopy);
		setCopied(true);
		setTimeout(() => setCopied(false), 2e3);
	};
	const fontSizeClasses = {
		sm: "text-lg sm:text-xl leading-[1.8]",
		base: "text-xl sm:text-2xl leading-[1.9]",
		lg: "text-2xl sm:text-3xl leading-[2.0]"
	}[fontSize];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `py-8 sm:py-20 transition-colors duration-500 pb-24 sm:pb-20 ${warmMode ? "bg-[#161210] text-[#f4efe8]" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[900px] px-4 sm:px-6 lg:px-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-4 pb-6 border-b border-neon/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/poems",
						className: "inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-paper-dim hover:text-paper transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "All Poems" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden sm:flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center rounded-md border border-neon/20 bg-ink-2 p-0.5 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setFontSize("sm"),
										className: `px-2.5 py-1 rounded text-xs transition-colors ${fontSize === "sm" ? "bg-neon text-ink font-bold" : "text-paper-dim hover:text-paper"}`,
										title: "Small text",
										children: "A-"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setFontSize("base"),
										className: `px-2.5 py-1 rounded text-xs transition-colors ${fontSize === "base" ? "bg-neon text-ink font-bold" : "text-paper-dim hover:text-paper"}`,
										title: "Default text",
										children: "A"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setFontSize("lg"),
										className: `px-2.5 py-1 rounded text-xs transition-colors ${fontSize === "lg" ? "bg-neon text-ink font-bold" : "text-paper-dim hover:text-paper"}`,
										title: "Large text",
										children: "A+"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setWarmMode(!warmMode),
								className: `p-2 rounded-md border text-xs transition-colors ${warmMode ? "border-amber-400/40 bg-amber-400/10 text-amber-200" : "border-neon/20 bg-ink-2 text-paper-dim hover:text-paper"}`,
								title: "Toggle warm lamplight mode",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: handleCopy,
								className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-neon/20 bg-ink-2 text-xs uppercase tracking-[0.18em] text-paper-dim hover:text-neon transition-colors",
								title: "Copy poem text & link",
								children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 text-neon" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copied ? "Copied" : "Share" })]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "pt-8 sm:pt-16 pb-6 text-center max-w-xl mx-auto space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-neon/90 font-medium",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: poem.collection }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: poem.year })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-paper text-balance leading-tight",
							children: poem.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pt-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/about",
								className: "text-xs uppercase tracking-[0.22em] text-paper-dim hover:text-neon transition-colors",
								children: ["By ", poem.author]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-center items-center gap-3 pt-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-paper-faint",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [poem.linesCount, " lines"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [poem.readTime, " read"] })
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "py-6 sm:py-10 max-w-lg mx-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `font-display text-paper/95 space-y-8 ${fontSizeClasses}`,
							children: poem.stanzas.map((stanza, sIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2",
								children: stanza.map((line, lIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "tracking-wide text-pretty",
									children: line
								}, lIdx))
							}, sIdx))
						}),
						poem.note && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-12 sm:mt-16 pt-6 border-t border-neon/15 text-xs sm:text-sm text-paper-dim italic bg-ink-2/60 p-4 sm:p-5 rounded-lg border border-neon/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] sm:text-xs uppercase tracking-[0.2em] text-neon not-italic font-medium mb-1.5",
								children: "Poet's Note"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"“",
								poem.note,
								"”"
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 flex flex-wrap gap-2",
							children: poem.tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/poems",
								className: "text-[11px] uppercase tracking-[0.16em] text-paper-faint hover:text-neon bg-ink-2 border border-neon/15 px-2.5 py-1 rounded-full transition-colors",
								children: ["#", t]
							}, t))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "mt-12 sm:mt-16 pt-8 border-t border-neon/15 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6",
					children: [prevPoem ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/poems/$id",
						params: { id: prevPoem.id },
						className: "group p-4 sm:p-5 rounded-xl border border-neon/15 bg-ink-2 hover:border-neon/40 active:scale-[0.98] transition-all flex flex-col items-start",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[10px] uppercase tracking-[0.22em] text-paper-faint flex items-center gap-1.5 mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3 w-3 group-hover:-translate-x-1 transition-transform" }), "Previous Poem"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-lg sm:text-xl text-paper group-hover:text-neon transition-colors",
								children: prevPoem.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-paper-dim mt-0.5",
								children: prevPoem.author
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden sm:block" }), nextPoem ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/poems/$id",
						params: { id: nextPoem.id },
						className: "group p-4 sm:p-5 rounded-xl border border-neon/15 bg-ink-2 hover:border-neon/40 active:scale-[0.98] transition-all flex flex-col items-end text-right",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[10px] uppercase tracking-[0.22em] text-paper-faint flex items-center gap-1.5 mb-1",
								children: ["Next Poem", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3 group-hover:translate-x-1 transition-transform" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-lg sm:text-xl text-paper group-hover:text-neon transition-colors",
								children: nextPoem.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-paper-dim mt-0.5",
								children: nextPoem.author
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden sm:block" })]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sm:hidden fixed bottom-4 left-4 right-4 z-40 bg-ink-2/95 backdrop-blur-md border border-neon/30 rounded-full px-4 py-2.5 shadow-2xl flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setFontSize((prev) => prev === "sm" ? "base" : prev === "base" ? "lg" : "sm"),
					className: "px-2.5 py-1 rounded-full bg-ink border border-neon/20 text-xs font-serif text-paper",
					title: "Toggle Text Size",
					children: ["Size: ", fontSize.toUpperCase()]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setWarmMode(!warmMode),
					className: `p-1.5 rounded-full border ${warmMode ? "border-amber-400 bg-amber-400/20 text-amber-200" : "border-neon/20 bg-ink text-paper-dim"}`,
					title: "Toggle Warm Light",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: handleCopy,
				className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon text-ink text-xs font-medium uppercase tracking-[0.15em]",
				children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copied ? "Copied" : "Share" })]
			})]
		})]
	});
}
//#endregion
export { PoemReader as component };

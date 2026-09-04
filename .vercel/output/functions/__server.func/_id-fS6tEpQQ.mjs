import { r as __toESM } from "./_runtime.mjs";
import { o as getChapbookById } from "./_ssr/literature-qxY3elwu.mjs";
import { n as require_jsx_runtime, r as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { E as ArrowLeft, b as CircleCheck, i as Sparkles, o as Send, u as Package, w as BookMarked } from "./_libs/lucide-react.mjs";
import { t as Route } from "./_id-CrZ2GHCE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-fS6tEpQQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ChapbookDetail() {
	const { id } = Route.useParams();
	const book = getChapbookById(id);
	const [orderModalOpen, setOrderModalOpen] = (0, import_react.useState)(false);
	const [orderSubmitted, setOrderSubmitted] = (0, import_react.useState)(false);
	const [formName, setFormName] = (0, import_react.useState)("");
	const [formEmail, setFormEmail] = (0, import_react.useState)("");
	const [formAddress, setFormAddress] = (0, import_react.useState)("");
	const [copies, setCopies] = (0, import_react.useState)("1");
	if (!book) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-20 text-center mx-auto max-w-lg px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl text-paper",
				children: "Chapbook not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-paper-dim",
				children: "The edition you requested is not in our catalogue."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/books",
					className: "inline-flex items-center gap-2 rounded bg-neon px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Return to Chapbooks" })]
				})
			})
		]
	});
	const handleOrder = (e) => {
		e.preventDefault();
		if (formName && formEmail) setOrderSubmitted(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-12 sm:py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1140px] px-6 sm:px-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/books",
					className: "inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-paper-dim hover:text-neon transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "All Chapbooks" })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "col-span-12 lg:col-span-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-xl bg-ink-3 aspect-[4/5] shadow-2xl border border-neon/20 lg:sticky lg:top-28",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: book.coverImage,
							alt: book.title,
							className: "h-full w-full object-cover"
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-12 lg:col-span-7 space-y-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-neon/80 mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookMarked, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Letterpress Chapbook Edition" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-4xl sm:text-5xl font-medium text-paper",
								children: book.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm uppercase tracking-[0.2em] text-paper-dim",
								children: [
									"By",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/about",
										className: "text-paper underline hover:text-neon",
										children: book.author
									})
								]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline gap-4 py-3 border-y border-neon/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-3xl font-medium text-paper",
								children: book.price
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs uppercase tracking-[0.2em] text-neon flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "In Stock · Ready for dispatch" })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base sm:text-lg leading-relaxed text-paper-dim",
							children: book.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5 rounded-lg bg-ink-2 border-l-2 border-neon text-paper italic font-display text-xl leading-relaxed",
							children: [
								"“",
								book.quote,
								"”"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-neon/15 bg-ink-2 p-6 space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xs uppercase tracking-[0.25em] text-neon/90 font-medium border-b border-neon/10 pb-2",
								children: "Physical Specifications"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-paper-faint uppercase tracking-[0.16em]",
										children: "Edition Run"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "text-paper font-medium mt-0.5",
										children: book.edition
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-paper-faint uppercase tracking-[0.16em]",
										children: "Page Count"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
										className: "text-paper font-medium mt-0.5",
										children: [book.pages, " Pages"]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-paper-faint uppercase tracking-[0.16em]",
										children: "Binding"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "text-paper font-medium mt-0.5",
										children: book.binding
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-paper-faint uppercase tracking-[0.16em]",
										children: "Paper Stock"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "text-paper font-medium mt-0.5",
										children: book.paper
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-paper-faint uppercase tracking-[0.16em]",
										children: "Dimensions"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "text-paper font-medium mt-0.5",
										children: book.dimensions
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-paper-faint uppercase tracking-[0.16em]",
										children: "Press"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "text-paper font-medium mt-0.5",
										children: "1890s Albion Hand Press"
									})] })
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-neon/15 bg-ink-2 p-6 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xs uppercase tracking-[0.25em] text-neon/90 font-medium border-b border-neon/10 pb-2",
								children: "Table of Contents"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-2 text-sm text-paper-dim",
								children: book.tableOfContents.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-neon/70 tabular-nums",
										children: String(index + 1).padStart(2, "0")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-paper",
										children: item
									})]
								}, index))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setOrderModalOpen(true),
								className: "inline-flex items-center justify-center gap-2 rounded bg-neon px-6 py-3.5 text-xs uppercase tracking-[0.22em] font-medium text-ink hover:bg-neon/90 transition-all shadow-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reserve Hand-Numbered Copy" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/poems",
								className: "inline-flex items-center justify-center gap-2 rounded border border-neon/30 px-5 py-3 text-xs uppercase tracking-[0.2em] font-medium text-paper hover:bg-neon/10 transition-all",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Read Digital Verses" })
							})]
						})
					]
				})]
			})]
		}), orderModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-50 flex items-center justify-center bg-ink/80 backdrop-blur-sm p-4 animate-in fade-in",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-lg rounded-xl border border-neon/30 bg-ink-2 p-6 sm:p-8 shadow-2xl relative overflow-y-auto max-h-[90vh]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setOrderModalOpen(false);
						setOrderSubmitted(false);
					},
					className: "absolute right-4 top-4 text-paper-dim hover:text-paper",
					children: "✕"
				}), orderSubmitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center py-8 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "inline-flex p-3 rounded-full bg-neon/15 text-neon",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-10 w-10" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-3xl text-paper",
							children: "Reservation Inscribed"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-paper-dim leading-relaxed max-w-sm mx-auto",
							children: [
								"Thank you, ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-paper font-medium",
									children: formName
								}),
								". We have reserved your copy of ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-paper italic",
									children: book.title
								}),
								". A dispatch confirmation and tracking details will be sent to",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-paper font-medium",
									children: formEmail
								}),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setOrderModalOpen(false);
								setOrderSubmitted(false);
							},
							className: "mt-4 rounded bg-neon px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-ink",
							children: "Close Window"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleOrder,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-neon/80 mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reserve Edition" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-display text-2xl text-paper",
								children: [
									"Order ",
									book.title,
									" — ",
									book.price
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-paper-dim mt-1",
								children: "Includes hand-numbered bookplate and postal dispatch in protective wax wrapping."
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 pt-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1",
									children: "Your Full Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									value: formName,
									onChange: (e) => setFormName(e.target.value),
									placeholder: "e.g. Eleanor Vance",
									className: "w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper placeholder:text-paper-faint focus:border-neon focus:outline-none"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1",
									children: "Email Address"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									required: true,
									value: formEmail,
									onChange: (e) => setFormEmail(e.target.value),
									placeholder: "eleanor@literature.org",
									className: "w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper placeholder:text-paper-faint focus:border-neon focus:outline-none"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1",
										children: "Quantity"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: copies,
										onChange: (e) => setCopies(e.target.value),
										className: "w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper focus:border-neon focus:outline-none",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
												value: "1",
												children: [
													"1 copy (",
													book.price,
													")"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "2",
												children: "2 copies"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "3",
												children: "3 copies (max)"
											})
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1",
										children: "Country"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										defaultValue: "United Kingdom / Europe",
										className: "w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper focus:border-neon focus:outline-none"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1",
									children: "Postal Shipping Address"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									rows: 2,
									required: true,
									value: formAddress,
									onChange: (e) => setFormAddress(e.target.value),
									placeholder: "Street address, city, postcode...",
									className: "w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper placeholder:text-paper-faint focus:border-neon focus:outline-none"
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-3 flex items-center justify-between border-t border-neon/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-paper-faint",
								children: "Free worldwide literary postal delivery"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								className: "inline-flex items-center gap-2 rounded bg-neon px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-ink hover:bg-neon/90",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Confirm Reservation" })]
							})]
						})
					]
				})]
			})
		})]
	});
}
//#endregion
export { ChapbookDetail as component };

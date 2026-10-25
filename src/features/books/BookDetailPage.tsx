import { Link, getRouteApi } from "@tanstack/react-router";
import { ArrowLeft, BookMarked, CheckCircle2, Send } from "lucide-react";
import { useState } from "react";

const routeApi = getRouteApi("/books/$id");

export function BookDetailPage() {
  const { chapbook } = routeApi.useLoaderData();
  const book = chapbook ?? undefined;

  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [copies, setCopies] = useState("1");

  if (!book) {
    return (
      <div className="py-20 text-center mx-auto max-w-lg px-6">
        <h1 className="font-display text-4xl text-paper">Chapbook not found</h1>
        <p className="mt-3 text-paper-dim">The edition you requested is not in our catalogue.</p>
        <div className="mt-6">
          <Link
            to="/books"
            className="inline-flex items-center gap-2 rounded bg-neon px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Chapbooks</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (formName && formEmail) {
      setOrderSubmitted(true);
    }
  };

  return (
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-[1140px] px-6 sm:px-10">
        <div className="mb-8">
          <Link
            to="/books"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-paper-dim hover:text-neon transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>All Chapbooks</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-start">
          {/* Cover */}
          <div className="col-span-12 lg:col-span-5">
            <div className="overflow-hidden rounded-xl bg-ink-3 aspect-[4/5] shadow-2xl border border-neon/20 lg:sticky lg:top-28">
              <img src={book.coverImage} alt={book.title} className="h-full w-full object-cover" />
            </div>
          </div>

          {/* Info */}
          <div className="col-span-12 lg:col-span-7 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-neon/80 mb-2">
                <BookMarked className="h-3.5 w-3.5" />
                <span>Letterpress Chapbook Edition · {book.year}</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-medium text-paper">
                {book.title}
              </h1>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-paper-dim">
                By{" "}
                <Link to="/about" className="text-paper underline hover:text-neon">
                  {book.author}
                </Link>
              </p>
            </div>

            <div className="flex items-baseline gap-4 py-3 border-y border-neon/10">
              <span className="font-mono text-3xl font-medium text-paper">{book.price}</span>
              <span className="text-xs uppercase tracking-[0.2em] text-neon flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                <span>Available for order</span>
              </span>
            </div>

            <p className="text-base sm:text-lg leading-relaxed text-paper-dim">
              {book.description}
            </p>

            <div className="p-5 rounded-lg bg-ink-2 border-l-2 border-neon text-paper italic font-display text-xl leading-relaxed">
              “{book.quote}”
            </div>

            <button
              type="button"
              onClick={() => setOrderModalOpen(true)}
              className="inline-flex items-center gap-2 rounded bg-neon px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium text-ink hover:bg-neon/90 transition-all shadow-md"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Reserve a copy</span>
            </button>

            {/* Shared Press Specifications */}
            <div className="pt-8 border-t border-neon/10 space-y-4">
              <p className="text-xs uppercase tracking-[0.28em] text-neon/80">
                Press Specifications
              </p>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-paper-faint mb-1">
                    Edition
                  </dt>
                  <dd className="text-paper-dim">First Edition — 150 Hand-Numbered Copies</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-paper-faint mb-1">
                    Binding
                  </dt>
                  <dd className="text-paper-dim">Hand-sewn with archival linen or silk cord</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-paper-faint mb-1">
                    Paper
                  </dt>
                  <dd className="text-paper-dim">Cotton mould-made, deckle edge</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-paper-faint mb-1">
                    Dimensions
                  </dt>
                  <dd className="text-paper-dim">148 × 210 mm (A5)</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-xs uppercase tracking-[0.2em] text-paper-faint mb-1">
                    Printing
                  </dt>
                  <dd className="text-paper-dim">
                    Set by hand in metal type, impression pulled leaf by leaf on an 1890s Albion
                    press
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Order modal */}
      {orderModalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 backdrop-blur-sm px-4"
          onClick={() => !orderSubmitted && setOrderModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-xl border border-neon/20 bg-ink-2 p-6 sm:p-8 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {orderSubmitted ? (
              <div className="text-center space-y-3">
                <div className="inline-flex p-4 rounded-full bg-neon/15 text-neon">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="font-display text-2xl text-paper">Reservation received</h3>
                <p className="text-sm text-paper-dim">
                  We'll be in touch at {formEmail} to arrange dispatch.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setOrderModalOpen(false);
                    setOrderSubmitted(false);
                    setFormName("");
                    setFormEmail("");
                    setFormAddress("");
                    setCopies("1");
                  }}
                  className="mt-2 rounded border border-neon/30 px-4 py-2 text-xs uppercase tracking-[0.2em] text-paper hover:bg-neon/10"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleOrder} className="space-y-4">
                <div>
                  <h3 className="font-display text-2xl text-paper">Reserve “{book.title}”</h3>
                  <p className="text-sm text-paper-dim mt-1">
                    {book.price} · {book.year}
                  </p>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper placeholder:text-paper-faint focus:border-neon focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper placeholder:text-paper-faint focus:border-neon focus:outline-none"
                  />
                  <textarea
                    value={formAddress}
                    onChange={(e) => setFormAddress(e.target.value)}
                    placeholder="Shipping address (optional for now — we'll confirm by email)"
                    rows={2}
                    className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper placeholder:text-paper-faint focus:border-neon focus:outline-none"
                  />
                  <input
                    type="number"
                    min="1"
                    value={copies}
                    onChange={(e) => setCopies(e.target.value)}
                    placeholder="Copies"
                    className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper placeholder:text-paper-faint focus:border-neon focus:outline-none"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setOrderModalOpen(false)}
                    className="flex-1 rounded border border-neon/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-paper-dim hover:text-paper"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded bg-neon px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium text-ink hover:bg-neon/90"
                  >
                    Reserve
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

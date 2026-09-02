import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  BookMarked,
  CheckCircle2,
  Package,
  ShieldCheck,
  Send,
  Sparkles,
} from "lucide-react";

import { getChapbookById, CHAPBOOKS } from "@/data/literature";

export const Route = createFileRoute("/books/$id")({
  head: ({ params }) => {
    const book = getChapbookById(params.id);
    return {
      meta: [
        { title: `${book ? book.title : "Chapbook"} — Muse Books` },
        {
          name: "description",
          content: book
            ? `${book.title} by ${book.author}. ${book.edition}.`
            : "Hand-bound chapbook by Muse Books.",
        },
      ],
    };
  },
  component: ChapbookDetail,
});

function ChapbookDetail() {
  const { id } = Route.useParams();
  const book = getChapbookById(id);

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
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/books"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-paper-dim hover:text-neon transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>All Chapbooks</span>
          </Link>
        </div>

        {/* Main Book Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-start">
          {/* Cover & Gallery */}
          <div className="col-span-12 lg:col-span-5">
            <div className="overflow-hidden rounded-xl bg-ink-3 aspect-[4/5] shadow-2xl border border-neon/20 lg:sticky lg:top-28">
              <img src={book.coverImage} alt={book.title} className="h-full w-full object-cover" />
            </div>
          </div>

          {/* Book Information */}
          <div className="col-span-12 lg:col-span-7 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-neon/80 mb-2">
                <BookMarked className="h-3.5 w-3.5" />
                <span>Letterpress Chapbook Edition</span>
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
                <span>In Stock · Ready for dispatch</span>
              </span>
            </div>

            <p className="text-base sm:text-lg leading-relaxed text-paper-dim">
              {book.description}
            </p>

            {/* Featured Quote */}
            <div className="p-5 rounded-lg bg-ink-2 border-l-2 border-neon text-paper italic font-display text-xl leading-relaxed">
              “{book.quote}”
            </div>

            {/* Print & Binding Specifications */}
            <div className="rounded-lg border border-neon/15 bg-ink-2 p-6 space-y-4">
              <h3 className="text-xs uppercase tracking-[0.25em] text-neon/90 font-medium border-b border-neon/10 pb-2">
                Physical Specifications
              </h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-xs">
                <div>
                  <dt className="text-paper-faint uppercase tracking-[0.16em]">Edition Run</dt>
                  <dd className="text-paper font-medium mt-0.5">{book.edition}</dd>
                </div>
                <div>
                  <dt className="text-paper-faint uppercase tracking-[0.16em]">Page Count</dt>
                  <dd className="text-paper font-medium mt-0.5">{book.pages} Pages</dd>
                </div>
                <div>
                  <dt className="text-paper-faint uppercase tracking-[0.16em]">Binding</dt>
                  <dd className="text-paper font-medium mt-0.5">{book.binding}</dd>
                </div>
                <div>
                  <dt className="text-paper-faint uppercase tracking-[0.16em]">Paper Stock</dt>
                  <dd className="text-paper font-medium mt-0.5">{book.paper}</dd>
                </div>
                <div>
                  <dt className="text-paper-faint uppercase tracking-[0.16em]">Dimensions</dt>
                  <dd className="text-paper font-medium mt-0.5">{book.dimensions}</dd>
                </div>
                <div>
                  <dt className="text-paper-faint uppercase tracking-[0.16em]">Press</dt>
                  <dd className="text-paper font-medium mt-0.5">1890s Albion Hand Press</dd>
                </div>
              </dl>
            </div>

            {/* Table of Contents */}
            <div className="rounded-lg border border-neon/15 bg-ink-2 p-6 space-y-3">
              <h3 className="text-xs uppercase tracking-[0.25em] text-neon/90 font-medium border-b border-neon/10 pb-2">
                Table of Contents
              </h3>
              <ul className="space-y-2 text-sm text-paper-dim">
                {book.tableOfContents.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="text-xs text-neon/70 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-paper">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Purchase / Order CTA */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <button
                type="button"
                onClick={() => setOrderModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded bg-neon px-6 py-3.5 text-xs uppercase tracking-[0.22em] font-medium text-ink hover:bg-neon/90 transition-all shadow-md"
              >
                <Package className="h-4 w-4" />
                <span>Reserve Hand-Numbered Copy</span>
              </button>

              <Link
                to="/poems"
                className="inline-flex items-center justify-center gap-2 rounded border border-neon/30 px-5 py-3 text-xs uppercase tracking-[0.2em] font-medium text-paper hover:bg-neon/10 transition-all"
              >
                <span>Read Digital Verses</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ORDER / RESERVE MODAL */}
      {orderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-xl border border-neon/30 bg-ink-2 p-6 sm:p-8 shadow-2xl relative overflow-y-auto max-h-[90vh]">
            <button
              type="button"
              onClick={() => {
                setOrderModalOpen(false);
                setOrderSubmitted(false);
              }}
              className="absolute right-4 top-4 text-paper-dim hover:text-paper"
            >
              ✕
            </button>

            {orderSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="inline-flex p-3 rounded-full bg-neon/15 text-neon">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="font-display text-3xl text-paper">Reservation Inscribed</h3>
                <p className="text-sm text-paper-dim leading-relaxed max-w-sm mx-auto">
                  Thank you, <span className="text-paper font-medium">{formName}</span>. We have
                  reserved your copy of <span className="text-paper italic">{book.title}</span>. A
                  dispatch confirmation and tracking details will be sent to{" "}
                  <span className="text-paper font-medium">{formEmail}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setOrderModalOpen(false);
                    setOrderSubmitted(false);
                  }}
                  className="mt-4 rounded bg-neon px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-ink"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleOrder} className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-neon/80 mb-1">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Reserve Edition</span>
                  </div>
                  <h3 className="font-display text-2xl text-paper">
                    Order {book.title} — {book.price}
                  </h3>
                  <p className="text-xs text-paper-dim mt-1">
                    Includes hand-numbered bookplate and postal dispatch in protective wax wrapping.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper placeholder:text-paper-faint focus:border-neon focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="eleanor@literature.org"
                      className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper placeholder:text-paper-faint focus:border-neon focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1">
                        Quantity
                      </label>
                      <select
                        value={copies}
                        onChange={(e) => setCopies(e.target.value)}
                        className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper focus:border-neon focus:outline-none"
                      >
                        <option value="1">1 copy ({book.price})</option>
                        <option value="2">2 copies</option>
                        <option value="3">3 copies (max)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        defaultValue="United Kingdom / Europe"
                        className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper focus:border-neon focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1">
                      Postal Shipping Address
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={formAddress}
                      onChange={(e) => setFormAddress(e.target.value)}
                      placeholder="Street address, city, postcode..."
                      className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper placeholder:text-paper-faint focus:border-neon focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-neon/10">
                  <span className="text-xs text-paper-faint">
                    Free worldwide literary postal delivery
                  </span>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded bg-neon px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-ink hover:bg-neon/90"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Confirm Reservation</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

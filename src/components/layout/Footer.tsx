import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Check, Feather } from "lucide-react";

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="border-t border-neon/10 bg-ink-2 text-paper transition-colors">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-10 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
          {/* Brand & Manifesto Column */}
          <div className="col-span-12 sm:col-span-2 lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-neon/10 border border-neon/30 text-neon">
                <Feather className="h-4 w-4" />
              </div>
              <span className="font-display text-2xl font-medium tracking-tight text-paper">
                Muse Books
              </span>
            </div>
            <p className="text-sm leading-relaxed text-paper-dim max-w-[36ch] text-pretty">
              A lamplit press dedicated to poetry, chapbooks, and reflective literature. Founded by
              Adaeze Okafor &amp; Theo Lindqvist to celebrate verse written in quiet hours.
            </p>
            <div className="pt-2 text-xs text-paper-faint italic font-serif">
              “We do not write to be found. We write to leave the light on.”
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-6 sm:col-span-1 lg:col-span-2 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.25em] text-neon/80 font-medium">
              Navigation
            </p>
            <ul className="space-y-2 text-sm text-paper-dim">
              <li>
                <Link to="/" className="hover:text-paper transition-colors inkline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/poems" className="hover:text-paper transition-colors inkline">
                  Poem Library
                </Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-paper transition-colors inkline">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/books" className="hover:text-paper transition-colors inkline">
                  Chapbooks
                </Link>
              </li>
            </ul>
          </div>

          {/* Press & Info */}
          <div className="col-span-6 sm:col-span-1 lg:col-span-2 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.25em] text-neon/80 font-medium">
              About &amp; Writing
            </p>
            <ul className="space-y-2 text-sm text-paper-dim">
              <li>
                <Link to="/musings" className="hover:text-paper transition-colors inkline">
                  Musings &amp; Essays
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-paper transition-colors inkline">
                  The Press &amp; Poets
                </Link>
              </li>
              <li>
                <Link to="/submit" className="hover:text-paper transition-colors inkline">
                  Submissions
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Letters by Lamplight */}
          <div className="col-span-12 sm:col-span-2 lg:col-span-3 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.25em] text-neon/80 font-medium">
              Letters by Lamplight
            </p>
            <p className="text-xs text-paper-dim leading-relaxed">
              Receive one unpublished poem and literary dispatch each full moon.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 rounded border border-neon/30 bg-neon/10 p-3 text-xs text-neon">
                <Check className="h-4 w-4" />
                <span>You're inscribed on our letter list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full rounded bg-ink-3 border border-neon/20 px-3 py-2 text-xs text-paper placeholder:text-paper-faint focus:border-neon focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-2.5 rounded bg-neon text-ink text-xs hover:bg-neon/90 transition-colors flex items-center justify-center"
                    aria-label="Subscribe"
                  >
                    <Mail className="h-3.5 w-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-14 pt-8 border-t border-neon/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs uppercase tracking-[0.22em] text-paper-faint">
          <span>Muse Books — Hand-bound &amp; Typeset · MMXXIV</span>
          <span>Cormorant &amp; Spectral Typography</span>
        </div>
      </div>
    </footer>
  );
}

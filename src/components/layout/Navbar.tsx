import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, Feather, X, Sparkles, Layers, FileText, Users } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { POEMS } from "@/data/literature";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const links = [
    {
      to: "/poems",
      label: "Poems",
      icon: Feather,
      color: "text-amber-400",
      count: `${POEMS.length} poems`,
    },
    {
      to: "/collections",
      label: "Collections",
      icon: Layers,
      color: "text-teal-400",
      count: "4 volumes",
    },
    {
      to: "/books",
      label: "Chapbooks",
      icon: BookOpen,
      color: "text-rose-400",
      count: "Albion Press",
    },
    {
      to: "/musings",
      label: "Musings",
      icon: FileText,
      color: "text-indigo-400",
      count: "Craft notes",
    },
    { to: "/about", label: "About", icon: Users, color: "text-stone-300", count: "The Poets" },
    { to: "/submit", label: "Submit", icon: Sparkles, color: "text-neon", count: "Open call" },
  ];

  const isActive = (to: string) => {
    if (to === "/") return currentPath === "/";
    return currentPath.startsWith(to);
  };

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <header className="hidden md:block sticky top-0 z-50 bg-ink/90 backdrop-blur-md border-b border-neon/10 transition-colors">
        <div className="mx-auto max-w-[1240px] px-6 sm:px-10">
          {/* Top minimal bar */}
          <div className="flex items-center justify-between py-2 text-[10px] uppercase tracking-[0.28em] text-paper-faint border-b border-neon/5">
            <span>Vol. II — Winter 2024</span>
            <span>A Small Press for Two Poets &amp; Literary Works</span>
            <span>Est. Edinburgh &amp; Stockholm</span>
          </div>

          {/* Main Desktop Navbar */}
          <div className="flex items-center justify-between py-4">
            <Link
              to="/"
              className="group flex items-center gap-3 transition-transform hover:opacity-95"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-neon/10 border border-neon/30 text-neon group-hover:bg-neon/20 transition-all">
                <Feather className="h-4 w-4" />
              </div>
              <div>
                <span className="font-display text-2xl sm:text-3xl font-medium tracking-[-0.01em] text-paper block leading-none">
                  Muse Books
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-neon/70 block mt-1">
                  Poetry &amp; Literature
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="flex items-center gap-7">
              {links.map((link) => {
                const active = isActive(link.to);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`text-xs uppercase tracking-[0.22em] transition-all relative py-1 ${
                      active ? "text-neon font-medium" : "text-paper-dim hover:text-paper inkline"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-neon rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="flex items-center gap-3">
              <Link
                to="/poems"
                className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/5 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] text-neon transition-all hover:bg-neon/15 hover:border-neon"
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>Read Poems</span>
              </Link>

              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE FLOATING NAVBAR CARD */}
      <div
        className="block md:hidden fixed top-3 left-0 right-0 z-50 px-3 pointer-events-none"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <header className="w-full max-w-7xl mx-auto bg-ink-2/95 backdrop-blur-md rounded-2xl px-4 py-3 flex items-center justify-between shadow-2xl border border-neon/20 pointer-events-auto min-h-[56px]">
          {/* Logo */}
          <Link
            to="/"
            className="font-josefin text-lg font-bold tracking-tight text-paper flex items-center gap-2 shrink-0 whitespace-nowrap"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-neon/15 border border-neon/40 text-neon">
              <Feather className="h-4 w-4" />
            </div>
            <span>muse night</span>
          </Link>

          {/* Right Navigation Group */}
          <div className="flex items-center gap-2 shrink-0">
            {/* CTA Button */}
            <Link
              to="/poems"
              className="font-karla text-xs font-semibold text-ink bg-neon hover:bg-neon/90 px-3.5 py-2 rounded-xl transition-all shadow-md active:scale-95 whitespace-nowrap shrink-0"
            >
              Start reading
            </Link>

            {/* Hamburger Icon Button */}
            <button
              type="button"
              aria-label="Open mobile menu"
              onClick={() => setMobileOpen(true)}
              className="p-2 -mr-1 text-paper hover:bg-neon/10 rounded-xl transition-all active:scale-95 focus:outline-none shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </header>
      </div>

      {/* FULLSCREEN MOBILE NAVIGATION DRAWER */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-ink/80 backdrop-blur-md flex flex-col p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="w-full max-w-md mx-auto bg-ink-2 border border-neon/20 rounded-2xl p-5 shadow-2xl flex flex-col justify-between h-full max-h-[92vh] overflow-y-auto">
            <div className="space-y-5">
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-neon/10 pb-3.5">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-neon/20 text-neon">
                    <Feather className="h-4 w-4" />
                  </div>
                  <span className="font-josefin text-xl font-bold text-paper">muse night</span>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-full hover:bg-neon/10 text-paper-dim hover:text-paper"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-2 font-karla text-sm">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                    currentPath === "/"
                      ? "bg-neon/20 text-neon font-semibold border border-neon/30"
                      : "bg-ink/50 hover:bg-neon/5 text-paper font-medium"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Sparkles className="h-4 w-4 text-neon" />
                    Home Masthead
                  </span>
                  <span className="text-xs text-paper-faint">&rarr;</span>
                </Link>

                {links.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.to);
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                        active
                          ? "bg-neon/20 text-neon font-semibold border border-neon/30"
                          : "bg-ink/50 hover:bg-neon/5 text-paper font-medium"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className={`h-4 w-4 ${link.color}`} />
                        {link.label}
                      </span>
                      <span className="text-xs text-paper-faint">{link.count}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-5 border-t border-neon/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-paper-dim uppercase tracking-widest font-karla">
                  Theme Light/Dark
                </span>
                <ThemeToggle />
              </div>

              <Link
                to="/submit"
                onClick={() => setMobileOpen(false)}
                className="block text-center rounded-xl bg-neon py-3 text-xs uppercase tracking-[0.18em] font-bold text-ink hover:bg-neon/90 shadow-lg active:scale-95 transition-all"
              >
                Submit Your Manuscript
              </Link>

              <p className="text-[11px] text-paper-faint text-center font-serif italic">
                “We do not write to be found. We write to leave the light on.”
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

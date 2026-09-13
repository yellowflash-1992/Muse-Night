import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  ChevronDown,
  Feather,
  LogOut,
  Search,
  Settings,
  Sparkles,
  User,
  X,
} from "lucide-react";
import type { RefObject } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import type { User as AuthUser } from "@/hooks/useAuth";
import { hubItems, topLinks } from "./navItemsData";

interface MobileNavDrawerProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  user: AuthUser | null;
  isAuthenticated: boolean;
  logout: () => void;
  currentPath: string;
  searchOpen: boolean;
  setSearchOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  mobileHubOpen: boolean;
  setMobileHubOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  drawerUserMenuOpen: boolean;
  setDrawerUserMenuOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  setAuthModalOpen: (open: boolean) => void;
  setAuthModalMode: (mode: "signin" | "signup") => void;
  drawerUserMenuRef: RefObject<HTMLDivElement | null>;
}

export function MobileNavDrawer({
  mobileOpen,
  setMobileOpen,
  user,
  isAuthenticated,
  logout,
  currentPath,
  searchOpen,
  setSearchOpen,
  searchQuery,
  setSearchQuery,
  mobileHubOpen,
  setMobileHubOpen,
  drawerUserMenuOpen,
  setDrawerUserMenuOpen,
  setAuthModalOpen,
  setAuthModalMode,
  drawerUserMenuRef,
}: MobileNavDrawerProps) {
  if (!mobileOpen) return null;

  const isActive = (to: string) => {
    if (to === "/") return currentPath === "/";
    return currentPath.startsWith(to);
  };

  const isHubActive = hubItems.some((item) => isActive(item.to));

  const filteredHubItems = searchQuery
    ? hubItems.filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : hubItems;

  const filteredTopLinks = searchQuery
    ? topLinks.filter((link) => link.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : topLinks;

  const showSearchResults = searchQuery.trim().length > 0;

  return (
    <div className="lg:hidden fixed inset-0 z-50 bg-ink/80 backdrop-blur-md flex flex-col p-4 animate-[fadeIn_0.2s_ease-out]">
      <div className="w-full max-w-md mx-auto bg-ink-2 border border-neon/20 rounded-2xl py-3 px-4 shadow-2xl flex flex-col h-full max-h-[95vh] overflow-y-auto scrollbar-hide">
        <div className="space-y-5">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-neon/10 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-neon/20 text-neon">
                <Feather className="h-4 w-4" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-xl font-medium text-paper">
                  muse <span className="italic font-light text-[#fef08a]">night</span>
                </span>
                <span className="text-[8px] uppercase tracking-[0.26em] text-paper-dim/75 font-karla mt-0.5">
                  verse &amp; press
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-1.5 rounded-full hover:bg-neon/10 text-paper-dim hover:text-paper"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-full hover:bg-neon/10 text-paper-dim hover:text-paper"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div className="px-1 pt-2 animate-in fade-in">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-paper-faint" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search poems, collections..."
                  className="w-full rounded-xl bg-ink border border-neon/20 pl-9 pr-9 py-2.5 text-sm text-paper placeholder:text-paper-faint focus:border-neon focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-neon/10 text-paper-dim hover:text-paper"
                  aria-label="Cancel search"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Mobile Patron Auth Card with Avatar Shape */}
          {isAuthenticated && user ? (
            <div className="relative -mt-2" ref={drawerUserMenuRef}>
              <div className="rounded-xl border border-neon/30 bg-ink/70 p-3 flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neon text-ink font-bold text-sm shadow-md">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-karla text-xs font-bold text-paper truncate">{user.name}</p>
                    <p className="text-[10px] text-paper-dim truncate">{user.email}</p>
                  </div>
                </div>

                {/* Dropdown Menu Trigger Button */}
                <button
                  type="button"
                  onClick={() => setDrawerUserMenuOpen((prev) => !prev)}
                  aria-expanded={drawerUserMenuOpen}
                  aria-haspopup="menu"
                  aria-label="Account options"
                  className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold text-neon hover:text-paper bg-neon/10 hover:bg-neon/20 rounded-lg transition-all border border-neon/30 active:scale-95 cursor-pointer"
                >
                  <span>Menu</span>
                  <ChevronDown
                    className={`h-3 w-3 transition-transform duration-200 ${
                      drawerUserMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Dropdown Menu with Settings & Sign Out */}
              {drawerUserMenuOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-neon/30 bg-ink-2/98 backdrop-blur-2xl p-1.5 shadow-2xl z-50 animate-[fadeIn_0.15s_ease-out]"
                  role="menu"
                >
                  <Link
                    to="/settings"
                    onClick={() => {
                      setDrawerUserMenuOpen(false);
                      setMobileOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-paper-dim hover:text-paper hover:bg-neon/10 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <Settings className="h-3.5 w-3.5 text-neon" />
                      Profile
                    </span>
                    <span className="text-[9px] text-paper-faint">Settings</span>
                  </Link>

                  <div className="my-1 border-t border-neon/10" />

                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setDrawerUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-medium text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setAuthModalMode("signin");
                setAuthModalOpen(true);
              }}
              className="w-full rounded-xl border border-neon/30 bg-blue-600/10 hover:bg-neon/15 p-3 -mt-2 flex items-center justify-between transition-all group cursor-pointer text-left shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neon/25 border border-neon/50 text-neon group-hover:bg-neon group-hover:text-ink transition-colors shadow-inner">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-karla text-xs uppercase tracking-[0.16em] font-bold text-paper group-hover:text-neon">
                    Sign In / Sign Up
                  </p>
                  <p className="text-[10px] text-paper-dim">Join the reading vault &amp; streaks</p>
                </div>
              </div>
              <span className="text-xs text-neon">&rarr;</span>
            </button>
          )}

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2 font-karla text-sm">
            {showSearchResults ? (
              <>
                {/* Search Results */}
                {(() => {
                  const homeMatch = !searchQuery || "home".includes(searchQuery.toLowerCase());
                  const hubMatches = filteredHubItems;
                  const topMatches = filteredTopLinks;

                  if (!homeMatch && hubMatches.length === 0 && topMatches.length === 0) {
                    return (
                      <p className="text-center text-xs text-paper-faint py-4">
                        No results for "{searchQuery}"
                      </p>
                    );
                  }

                  return (
                    <>
                      {homeMatch && (
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
                      )}

                      {hubMatches.length > 0 && (
                        <div className="rounded-xl border border-neon/20 bg-ink/60 overflow-hidden">
                          <div className="p-3">
                            <span className="font-karla font-semibold text-sm text-neon">Hub</span>
                          </div>
                          <div className="p-1.5 space-y-1 bg-ink-2/80 border-t border-neon/10">
                            {hubMatches.map((item) => {
                              const Icon = item.icon;
                              const active = isActive(item.to);
                              return (
                                <Link
                                  key={item.to}
                                  to={item.to}
                                  onClick={() => setMobileOpen(false)}
                                  className={`flex items-center justify-between p-2.5 rounded-lg transition-colors pl-4 ${
                                    active
                                      ? "bg-neon/20 text-neon font-semibold border border-neon/30"
                                      : "text-paper-dim hover:text-paper hover:bg-neon/10"
                                  }`}
                                >
                                  <span className="flex items-center gap-2.5">
                                    <Icon className={`h-4 w-4 ${item.color}`} />
                                    <span className="font-medium">{item.label}</span>
                                  </span>
                                  <span className="text-[10px] text-paper-faint">{item.count}</span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {topMatches.map((link) => {
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
                    </>
                  );
                })()}
              </>
            ) : (
              <>
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

                {/* Hub Collapsible Group */}
                <div className="rounded-xl border border-neon/20 bg-ink/60 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setMobileHubOpen((prev) => !prev)}
                    className={`w-full flex items-center justify-between p-3 transition-colors ${
                      isHubActive
                        ? "bg-neon/15 text-neon font-semibold"
                        : "text-paper hover:bg-neon/5"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <BookOpen className="h-4 w-4 text-neon" />
                      <span className="font-karla font-semibold text-sm">Hub</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-wider text-neon/70">
                        6 Archives
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-neon/70 transition-transform duration-200 ${
                          mobileHubOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {mobileHubOpen && (
                    <div className="p-1.5 space-y-1 bg-ink-2/80 border-t border-neon/10">
                      {hubItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.to);
                        const isStudy = item.to === "/study";
                        return (
                          <div key={item.to}>
                            {isStudy && (
                              <div className="my-1.5 border-t border-neon/15 px-2 pt-1.5 pb-0.5 flex items-center justify-between">
                                <span className="text-[9px] uppercase tracking-[0.2em] text-emerald-400/90 font-semibold font-karla">
                                  Academic Hub
                                </span>
                                <span className="text-[8.5px] font-mono text-paper-faint">
                                  Exam Prep
                                </span>
                              </div>
                            )}
                            <Link
                              to={item.to}
                              onClick={() => setMobileOpen(false)}
                              className={`flex items-center justify-between p-2.5 rounded-lg transition-colors pl-4 ${
                                active
                                  ? "bg-neon/20 text-neon font-semibold border border-neon/30"
                                  : isStudy
                                    ? "text-emerald-200 hover:text-white bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20"
                                    : "text-paper-dim hover:text-paper hover:bg-neon/10"
                              }`}
                            >
                              <span className="flex items-center gap-2.5">
                                <Icon className={`h-4 w-4 ${item.color}`} />
                                <span className="font-medium">{item.label}</span>
                              </span>
                              <span
                                className={`text-[10px] ${
                                  isStudy ? "text-emerald-300 font-mono" : "text-paper-faint"
                                }`}
                              >
                                {item.count}
                              </span>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Other Top-Level Links */}
                {topLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.to);
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between p-3 mb-1 rounded-xl transition-colors ${
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
              </>
            )}
          </nav>
        </div>

        {/* Drawer Footer Actions */}
        <div className="pt-4 border-t border-neon/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-paper-dim uppercase tracking-widest font-karla">
              Theme: Winter/Summer
            </span>
            <ThemeToggle />
          </div>

          <Link
            to="/request"
            onClick={() => setMobileOpen(false)}
            className="block text-center rounded-xl bg-neon py-3 text-xs uppercase tracking-[0.18em] font-bold text-ink hover:bg-neon/90 shadow-lg active:scale-95 transition-all"
          >
            Request a Poem
          </Link>

          <p className="text-[11px] text-paper-faint text-center font-serif italic">
            “We do not write to be found. We write to leave the light on.”
          </p>
        </div>
      </div>
    </div>
  );
}

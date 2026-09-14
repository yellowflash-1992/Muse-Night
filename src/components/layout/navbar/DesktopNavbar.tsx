import { Link } from "@tanstack/react-router";
import { Bookmark, ChevronDown, Feather, Flame, LogOut, Settings, User } from "lucide-react";
import type { RefObject } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { hubItems, topLinks } from "@/data/navItemsData";
import type { User as AuthUser } from "@/hooks/useAuth";

interface DesktopNavbarProps {
  currentPath: string;
  user: AuthUser | null;
  isAuthenticated: boolean;
  logout: () => void;
  hubDropdownOpen: boolean;
  setHubDropdownOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  userMenuOpen: boolean;
  setUserMenuOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  setAuthModalOpen: (open: boolean) => void;
  setAuthModalMode: (mode: "signin" | "signup") => void;
  dropdownContainerRef: RefObject<HTMLDivElement | null>;
  userMenuRef: RefObject<HTMLDivElement | null>;
}

export function DesktopNavbar({
  currentPath,
  user,
  isAuthenticated,
  logout,
  hubDropdownOpen,
  setHubDropdownOpen,
  userMenuOpen,
  setUserMenuOpen,
  setAuthModalOpen,
  setAuthModalMode,
  dropdownContainerRef,
  userMenuRef,
}: DesktopNavbarProps) {
  const isActive = (to: string) => {
    if (to === "/") return currentPath === "/";
    return currentPath.startsWith(to);
  };

  const isHubActive = hubItems.some((item) => isActive(item.to));

  return (
    <header className="hidden lg:block sticky top-0 z-50 bg-ink/90 backdrop-blur-md border-b border-neon/10 transition-colors">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Top minimal bar (middle text hidden on narrow screens to prevent squashing) */}
        <div className="flex items-center justify-between py-2 text-[9px] lg:text-[10px] uppercase tracking-[0.2em] lg:tracking-[0.28em] text-paper-faint border-b border-neon/5">
          <span className="shrink-0 whitespace-nowrap">Vol. II — Winter 2024</span>
          <span className="hidden xl:inline">A Small Press for Two Poets &amp; Literary Works</span>
          <span className="shrink-0 whitespace-nowrap">Est. Edinburgh &amp; Stockholm</span>
        </div>

        {/* Main Desktop Navbar — flex-nowrap with stretched responsive spacing */}
        <div className="flex flex-nowrap items-center justify-between gap-3 lg:gap-4 xl:gap-8 py-3.5">
          <Link
            to="/"
            className="group flex shrink-0 items-center gap-2.5 xl:gap-3 transition-transform hover:opacity-95"
          >
            <div className="flex h-8 w-8 xl:h-9 xl:w-9 shrink-0 items-center justify-center rounded-sm bg-neon/10 border border-neon/30 text-neon group-hover:bg-neon/20 transition-all">
              <Feather className="h-4 w-4" />
            </div>
            <div>
              <span className="whitespace-nowrap font-display text-xl lg:text-2xl xl:text-3xl font-medium tracking-tight text-paper block leading-none">
                Muse Books
              </span>
              <span className="hidden 2xl:block text-[9px] uppercase tracking-[0.22em] text-neon/70 whitespace-nowrap mt-1">
                Poetry &amp; Literature
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links — streamlined spacing to fit without horizontal scroll */}
          <nav className="flex flex-nowrap items-center gap-2 lg:gap-3 xl:gap-5 min-w-0">
            {/* Hub Dropdown Item — click toggle so toggles never cause it to drop down */}
            <div ref={dropdownContainerRef} className="relative">
              <button
                type="button"
                onClick={() => setHubDropdownOpen((prev) => !prev)}
                aria-expanded={hubDropdownOpen}
                aria-haspopup="menu"
                className={`group flex items-center gap-1.5 whitespace-nowrap text-[11px] xl:text-xs uppercase tracking-[0.11em] xl:tracking-[0.15em] transition-all relative py-1 cursor-pointer focus:outline-none ${
                  isHubActive ? "text-neon font-medium" : "text-paper-dim hover:text-paper"
                }`}
              >
                <span>Hub</span>
                <ChevronDown
                  className={`h-3 w-3 transition-transform duration-200 text-neon/70 group-hover:text-neon ${
                    hubDropdownOpen ? "rotate-180" : ""
                  }`}
                />
                {isHubActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-neon rounded-full" />
                )}
              </button>

              {/* Dropdown Menu Panel */}
              {hubDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-3 w-76 rounded-2xl border border-neon/25 bg-ink-2/95 backdrop-blur-xl p-2.5 shadow-2xl z-50 animate-[fadeIn_0.15s_ease-out]"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="flex items-center justify-between px-3 py-1.5 border-b border-neon/10 text-[9px] uppercase tracking-[0.22em] text-paper-faint">
                    <span>Hub Directory</span>
                    <span className="text-neon/70">6 Archives</span>
                  </div>

                  <div className="mt-1 space-y-1">
                    {hubItems.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.to);
                      const isStudy = item.to === "/study";
                      return (
                        <div key={item.to}>
                          {isStudy && (
                            <div className="my-1.5 border-t border-neon/15 px-3 pt-1.5 pb-0.5 flex items-center justify-between text-[8.5px] uppercase tracking-[0.22em] text-emerald-400/80 font-semibold">
                              <span>Academic Hub</span>
                              <span className="font-mono text-paper-faint">JAMB / WAEC</span>
                            </div>
                          )}
                          <Link
                            to={item.to}
                            onClick={() => setHubDropdownOpen(false)}
                            className={`group flex items-center justify-between p-2.5 rounded-xl transition-all ${
                              active
                                ? "bg-neon/15 border border-neon/30 text-neon"
                                : isStudy
                                  ? "hover:bg-emerald-500/15 hover:border-emerald-500/30 border border-emerald-500/20 bg-emerald-500/5 text-paper"
                                  : "hover:bg-neon/10 hover:border-neon/20 border border-transparent text-paper"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neon/10 border border-neon/20 ${item.color} group-hover:bg-neon/20 transition-all`}
                              >
                                <Icon className="h-4 w-4" />
                              </div>
                              <div>
                                <span className="font-karla text-xs font-semibold text-paper group-hover:text-neon block leading-tight">
                                  {item.label}
                                </span>
                                <span className="text-[10px] text-paper-dim group-hover:text-paper-faint block mt-0.5 leading-tight">
                                  {item.description}
                                </span>
                              </div>
                            </div>
                            <span className="text-[9px] uppercase tracking-wider text-paper-faint shrink-0 ml-2">
                              {item.count}
                            </span>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Other Top-Level Links */}
            {topLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`whitespace-nowrap text-[11px] xl:text-xs uppercase tracking-[0.11em] xl:tracking-[0.15em] transition-all relative py-1 ${
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

          {/* Desktop Actions — comfortably fitted alongside nav links without scroll */}
          <div className="flex shrink-0 items-center gap-2 lg:gap-2.5 xl:gap-3.5">
            {isAuthenticated && user ? (
              /* Authenticated Patron Avatar & Menu */
              <div ref={userMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setHubDropdownOpen(false);
                    setUserMenuOpen((prev) => !prev);
                  }}
                  className="group inline-flex items-center gap-2 rounded-full border border-neon/35 bg-ink-2/80 hover:bg-neon/10 hover:border-neon py-1 pl-1 pr-2.5 text-xs transition-all shadow-sm active:scale-95 cursor-pointer"
                  aria-expanded={userMenuOpen}
                >
                  <div className="flex h-6.5 w-6.5 xl:h-7 xl:w-7 shrink-0 items-center justify-center rounded-full bg-neon text-ink font-bold text-xs shadow-inner">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-karla text-[10.5px] xl:text-[11px] font-semibold text-paper group-hover:text-neon transition-colors max-w-[90px] xl:max-w-[110px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown
                    className={`h-3 w-3 text-neon/70 transition-transform duration-200 ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* User Account Popover */}
                {userMenuOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-neon/30 bg-ink-2/95 backdrop-blur-xl p-3 shadow-2xl z-50 animate-[fadeIn_0.15s_ease-out]"
                    role="menu"
                  >
                    <div className="border-b border-neon/10 pb-3 mb-2 px-1">
                      <p className="font-karla text-xs font-semibold text-paper truncate">
                        {user.name}
                      </p>
                      <p className="text-[10px] text-paper-dim truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[9px] uppercase tracking-wider text-neon bg-neon/10 px-2 py-0.5 rounded-full border border-neon/20">
                        {user.role || "Patron of Muse Books"}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <Link
                        to="/settings"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center justify-between px-2.5 py-2 rounded-xl text-xs text-paper-dim hover:text-paper hover:bg-neon/10 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <Settings className="h-3.5 w-3.5 text-neon" />
                          Profile &amp; Pen Name
                        </span>
                        <span className="text-[10px] text-paper-faint">Settings</span>
                      </Link>
                      <Link
                        to="/vault"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center justify-between px-2.5 py-2 rounded-xl text-xs text-paper-dim hover:text-paper hover:bg-neon/10 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <Bookmark className="h-3.5 w-3.5 text-amber-400" />
                          Your Vault
                        </span>
                        <span className="text-[10px] text-paper-faint">Saved</span>
                      </Link>
                      <Link
                        to="/streak"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center justify-between px-2.5 py-2 rounded-xl text-xs text-paper-dim hover:text-paper hover:bg-neon/10 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <Flame className="h-3.5 w-3.5 text-amber-400" />
                          Reading Streak
                        </span>
                        <span className="text-[10px] text-paper-faint">Practice</span>
                      </Link>
                      <Link
                        to="/request"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center justify-between px-2.5 py-2 rounded-xl text-xs text-paper-dim hover:text-paper hover:bg-neon/10 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <Feather className="h-3.5 w-3.5 text-neon" />
                          Request a Poem
                        </span>
                        <span className="text-[10px] text-paper-faint">Commission</span>
                      </Link>
                    </div>

                    <div className="mt-2 pt-2 border-t border-neon/10">
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-center gap-2 px-2.5 py-2 rounded-xl text-xs text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Sign In / Sign Up with Circular Avatar Shape */
              <button
                type="button"
                onClick={() => {
                  setHubDropdownOpen(false);
                  setUserMenuOpen(false);
                  setAuthModalMode("signin");
                  setAuthModalOpen(true);
                }}
                className="group hidden lg:inline-flex items-center gap-2 rounded-full border border-neon/35 bg-neon/10 hover:bg-neon/20 hover:border-neon py-1 pl-1 pr-3 text-xs transition-all shadow-sm active:scale-95 cursor-pointer"
                aria-label="Sign In or Sign Up"
              >
                {/* Avatar Shape */}
                <div className="flex h-6.5 w-6.5 xl:h-7 xl:w-7 shrink-0 items-center justify-center rounded-full bg-neon/25 border border-neon/50 text-neon group-hover:bg-neon group-hover:text-ink transition-colors shadow-inner">
                  <User className="h-3.5 w-3.5" />
                </div>
                <div className="flex items-center gap-1 font-karla text-[10.5px] xl:text-[11px] uppercase tracking-[0.12em] xl:tracking-[0.15em] text-paper group-hover:text-neon transition-colors whitespace-nowrap">
                  <span className="font-semibold">Sign In</span>
                  <span className="text-neon/50">/</span>
                  <span>Sign Up</span>
                </div>
              </button>
            )}

            <div
              onClick={() => {
                setHubDropdownOpen(false);
                setUserMenuOpen(false);
              }}
            >
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

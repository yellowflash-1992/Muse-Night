import { Link } from "@tanstack/react-router";
import { Feather, LogOut, Settings, User } from "lucide-react";
import type { RefObject } from "react";

import type { User as AuthUser } from "@/hooks/useAuth";

interface MobileFloatingNavProps {
  user: AuthUser | null;
  isAuthenticated: boolean;
  logout: () => void;
  mobileUserMenuOpen: boolean;
  setMobileUserMenuOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  setMobileOpen: (open: boolean) => void;
  setHubDropdownOpen: (open: boolean) => void;
  setMobileHubOpen: (open: boolean) => void;
  setUserMenuOpen: (open: boolean) => void;
  setAuthModalOpen: (open: boolean) => void;
  setAuthModalMode: (mode: "signin" | "signup") => void;
  mobileUserMenuRef: RefObject<HTMLDivElement | null>;
}

export function MobileFloatingNav({
  user,
  isAuthenticated,
  logout,
  mobileUserMenuOpen,
  setMobileUserMenuOpen,
  setMobileOpen,
  setHubDropdownOpen,
  setMobileHubOpen,
  setUserMenuOpen,
  setAuthModalOpen,
  setAuthModalMode,
  mobileUserMenuRef,
}: MobileFloatingNavProps) {
  return (
    <div
      className="block lg:hidden fixed top-3 left-0 right-0 z-50 px-3 pointer-events-none"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <header className="w-full max-w-7xl mx-auto bg-ink-2/95 backdrop-blur-md rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between shadow-2xl border border-neon/20 pointer-events-auto min-h-[56px]">
        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2 shrink-0 whitespace-nowrap transition-transform active:scale-95"
        >
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-xl bg-neon/15 border border-neon/40 text-neon shadow-sm group-hover:bg-neon/25 transition-all">
            <Feather className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-[17px] sm:text-[19px] font-medium tracking-normal text-paper group-hover:text-neon transition-colors">
              muse <span className="italic font-light text-[#fef08a]">night</span>
            </span>
            <span className="text-[8px] uppercase tracking-[0.26em] text-paper-dim/75 font-karla mt-0.5">
              verse &amp; press
            </span>
          </div>
        </Link>

        {/* Right Navigation Group */}
        <div className="ml-6 flex items-center gap-1.5 sm:gap-5 shrink-0">
          {/* CTA Button */}
          <Link
            to="/streak"
            className="font-karla text-xs font-semibold text-ink bg-neon hover:bg-neon/90 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl transition-all shadow-md active:scale-95 whitespace-nowrap shrink-0"
          >
            Daily streak
          </Link>

          {/* Mobile Avatar Button with Dropdown Menu */}
          <div ref={mobileUserMenuRef} className="relative">
            <button
              type="button"
              onClick={() => {
                if (isAuthenticated) {
                  setMobileUserMenuOpen((prev) => !prev);
                } else {
                  setAuthModalMode("signin");
                  setAuthModalOpen(true);
                }
              }}
              aria-label={isAuthenticated && user ? `Account: ${user.name}` : "Sign In or Sign Up"}
              aria-expanded={mobileUserMenuOpen}
              aria-haspopup="menu"
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-neon/35 bg-neon/15 text-neon hover:bg-neon/25 transition-all active:scale-95 shrink-0 cursor-pointer shadow-inner"
            >
              {isAuthenticated && user ? (
                <span className="font-bold text-xs">{user.name.charAt(0).toUpperCase()}</span>
              ) : (
                <User className="h-4 w-4" />
              )}
            </button>

            {/* Mobile User Dropdown Menu */}
            {isAuthenticated && user && mobileUserMenuOpen && (
              <div
                className="absolute right-0 top-full mt-2.5 w-56 rounded-2xl border border-neon/30 bg-ink-2/98 backdrop-blur-2xl p-2.5 shadow-2xl z-50 animate-[fadeIn_0.15s_ease-out]"
                role="menu"
              >
                {/* User Profile Header */}
                <div className="border-b border-neon/10 pb-2.5 mb-2 px-2">
                  <p className="font-karla text-xs font-semibold text-paper truncate">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-paper-dim truncate">{user.email}</p>
                  <span className="inline-block mt-1 text-[8.5px] uppercase tracking-wider text-neon bg-neon/10 px-2 py-0.5 rounded-full border border-neon/20">
                    {user.role || "Patron of Muse Books"}
                  </span>
                </div>

                {/* Settings Item */}
                <div className="space-y-1">
                  <Link
                    to="/settings"
                    onClick={() => setMobileUserMenuOpen(false)}
                    className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs text-paper-dim hover:text-paper hover:bg-neon/10 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Settings className="h-3.5 w-3.5 text-neon" />
                      Profile &amp; Pen Name
                    </span>
                    <span className="text-[10px] text-paper-faint">Settings</span>
                  </Link>
                </div>

                {/* Log Out Item */}
                <div className="mt-1.5 pt-1.5 border-t border-neon/10">
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileUserMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-2.5 py-2 rounded-xl text-xs text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Hamburger Icon Button */}
          <button
            type="button"
            aria-label="Open mobile menu"
            onClick={() => {
              setHubDropdownOpen(false);
              setMobileHubOpen(false);
              setUserMenuOpen(false);
              setMobileOpen(true);
            }}
            className="p-2 text-paper hover:bg-neon/10 rounded-xl transition-all active:scale-95 focus:outline-none shrink-0 cursor-pointer"
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
  );
}

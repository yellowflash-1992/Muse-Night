import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bookmark,
  BookMarked,
  BookOpen,
  ChevronDown,
  Feather,
  Flame,
  Image as ImageIcon,
  Layers,
  LogOut,
  Search,
  Settings,
  Sparkles,
  User,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { AuthModal } from "@/components/auth/AuthModal";
import { ThemeToggle } from "@/components/theme-toggle";
import { POEMS } from "@/data/literature";
import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileHubOpen, setMobileHubOpen] = useState(false);
  const [hubDropdownOpen, setHubDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"signin" | "signup">("signin");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileUserMenuOpen, setMobileUserMenuOpen] = useState(false);
  const [drawerUserMenuOpen, setDrawerUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { user, isAuthenticated, logout } = useAuth();
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileUserMenuRef = useRef<HTMLDivElement>(null);
  const drawerUserMenuRef = useRef<HTMLDivElement>(null);

  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // Sub-items organized under "Hub"
  const hubItems = [
    {
      to: "/library",
      label: "Library",
      description: "Archive of poems, verses & epistles",
      icon: BookOpen,
      color: "text-amber-400",
      count: `${POEMS.length} works`,
    },
    {
      to: "/mood",
      label: "Muse",
      description: "A poem for your mood & feelings",
      icon: Sparkles,
      color: "text-neon",
      count: "Inspiration",
    },
    {
      to: "/collections",
      label: "Collections",
      description: "Curated suites & volumes",
      icon: Layers,
      color: "text-emerald-400",
      count: "4 Volumes",
    },
    {
      to: "/gallery",
      label: "Gallery",
      description: "Editions, covers & studio plates",
      icon: ImageIcon,
      color: "text-cyan-400",
      count: "Plates & Art",
    },
    {
      to: "/books",
      label: "Chapbooks",
      description: "Hand-bound letterpress editions",
      icon: BookMarked,
      color: "text-rose-400",
      count: "Albion Press",
    },
  ];

  // Remaining top-level links
  const topLinks = [
    {
      to: "/daily",
      label: "Poetry Game",
      icon: Flame,
      color: "text-amber-400",
      count: "Battle",
    },
    {
      to: "/about",
      label: "About",
      icon: Users,
      color: "text-stone-300",
      count: "The Poets",
    },
    {
      to: "/submit",
      label: "Submit",
      icon: Sparkles,
      color: "text-neon",
      count: "Open call",
    },
    {
      to: "/vault",
      label: "Vault",
      icon: Bookmark,
      color: "text-amber-400",
      count: "Saved",
    },
  ];

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

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (dropdownContainerRef.current && !dropdownContainerRef.current.contains(target)) {
        setHubDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setUserMenuOpen(false);
      }
      if (mobileUserMenuRef.current && !mobileUserMenuRef.current.contains(target)) {
        setMobileUserMenuOpen(false);
      }
      if (drawerUserMenuRef.current && !drawerUserMenuRef.current.contains(target)) {
        setDrawerUserMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setHubDropdownOpen(false);
        setUserMenuOpen(false);
        setMobileUserMenuOpen(false);
        setDrawerUserMenuOpen(false);
        setAuthModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close on route change
  useEffect(() => {
    setHubDropdownOpen(false);
    setUserMenuOpen(false);
    setMobileUserMenuOpen(false);
    setDrawerUserMenuOpen(false);
    setMobileHubOpen(false);
    setMobileOpen(false);
  }, [currentPath]);

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <header className="hidden lg:block sticky top-0 z-50 bg-ink/90 backdrop-blur-md border-b border-neon/10 transition-colors">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Top minimal bar (middle text hidden on narrow screens to prevent squashing) */}
          <div className="flex items-center justify-between py-2 text-[9px] lg:text-[10px] uppercase tracking-[0.2em] lg:tracking-[0.28em] text-paper-faint border-b border-neon/5">
            <span className="shrink-0 whitespace-nowrap">Vol. II — Winter 2024</span>
            <span className="hidden xl:inline">
              A Small Press for Two Poets &amp; Literary Works
            </span>
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
                      <span className="text-neon/70">5 Archives</span>
                    </div>

                    <div className="mt-1 space-y-1">
                      {hubItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.to);
                        return (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => setHubDropdownOpen(false)}
                            className={`group flex items-center justify-between p-2.5 rounded-xl transition-all ${
                              active
                                ? "bg-neon/15 border border-neon/30 text-neon"
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

      {/* MOBILE FLOATING NAVBAR CARD */}
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
          <div className="ml-8 flex items-center gap-1.5 sm:gap-5 shrink-0">
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
                aria-label={
                  isAuthenticated && user ? `Account: ${user.name}` : "Sign In or Sign Up"
                }
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
                    <button
                      type="button"
                      onClick={() => {
                        setMobileUserMenuOpen(false);
                        setMobileOpen(true);
                      }}
                      className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs text-paper-dim hover:text-paper hover:bg-neon/10 transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Settings className="h-3.5 w-3.5 text-neon" />
                        Settings
                      </span>
                      <span className="text-[10px] text-paper-faint">Preferences</span>
                    </button>
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

      {/* FULLSCREEN MOBILE NAVIGATION DRAWER */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-ink/80 backdrop-blur-md flex flex-col p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="w-full max-w-md mx-auto bg-ink-2 border border-neon/20 rounded-2xl py-3 px-4 shadow-2xl flex flex-col h-full max-h-[92vh] overflow-y-auto scrollbar-hide">
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
                        <p className="font-karla text-xs font-bold text-paper truncate">
                          {user.name}
                        </p>
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
                      <button
                        type="button"
                        onClick={() => {
                          setDrawerUserMenuOpen(false);
                          setSearchOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-paper-dim hover:text-paper hover:bg-neon/10 transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-2 font-medium">
                          <Settings className="h-3.5 w-3.5 text-neon" />
                          Settings
                        </span>
                        <span className="text-[9px] text-paper-faint">Preferences</span>
                      </button>

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
                      <p className="text-[10px] text-paper-dim">
                        Join the reading vault &amp; streaks
                      </p>
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
                                <span className="font-karla font-semibold text-sm text-neon">
                                  Hub
                                </span>
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
                                      <span className="text-[10px] text-paper-faint">
                                        {item.count}
                                      </span>
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
                            5 Archives
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
      )}

      {/* Auth Modal for Sign In / Sign Up */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </>
  );
}

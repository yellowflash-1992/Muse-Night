import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { AuthModal } from "@/components/auth/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { DesktopNavbar } from "./navbar/DesktopNavbar";
import { MobileFloatingNav } from "./navbar/MobileFloatingNav";
import { MobileNavDrawer } from "./navbar/MobileNavDrawer";

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
      <DesktopNavbar
        currentPath={currentPath}
        user={user}
        isAuthenticated={isAuthenticated}
        logout={logout}
        hubDropdownOpen={hubDropdownOpen}
        setHubDropdownOpen={setHubDropdownOpen}
        userMenuOpen={userMenuOpen}
        setUserMenuOpen={setUserMenuOpen}
        setAuthModalOpen={setAuthModalOpen}
        setAuthModalMode={setAuthModalMode}
        dropdownContainerRef={dropdownContainerRef}
        userMenuRef={userMenuRef}
      />

      {/* MOBILE FLOATING NAVBAR CARD */}
      <MobileFloatingNav
        user={user}
        isAuthenticated={isAuthenticated}
        logout={logout}
        mobileUserMenuOpen={mobileUserMenuOpen}
        setMobileUserMenuOpen={setMobileUserMenuOpen}
        setMobileOpen={setMobileOpen}
        setHubDropdownOpen={setHubDropdownOpen}
        setMobileHubOpen={setMobileHubOpen}
        setUserMenuOpen={setUserMenuOpen}
        setAuthModalOpen={setAuthModalOpen}
        setAuthModalMode={setAuthModalMode}
        mobileUserMenuRef={mobileUserMenuRef}
      />

      {/* FULLSCREEN MOBILE NAVIGATION DRAWER */}
      <MobileNavDrawer
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        user={user}
        isAuthenticated={isAuthenticated}
        logout={logout}
        currentPath={currentPath}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        mobileHubOpen={mobileHubOpen}
        setMobileHubOpen={setMobileHubOpen}
        drawerUserMenuOpen={drawerUserMenuOpen}
        setDrawerUserMenuOpen={setDrawerUserMenuOpen}
        setAuthModalOpen={setAuthModalOpen}
        setAuthModalMode={setAuthModalMode}
        drawerUserMenuRef={drawerUserMenuRef}
      />

      {/* Auth Modal for Sign In / Sign Up */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </>
  );
}

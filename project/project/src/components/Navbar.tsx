import { useEffect, useState } from "react";
import { Feather, Menu, X } from "lucide-react";

interface NavbarProps {
  onNavigate: (section: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Poetry", section: "poetry" },
    { label: "Prose", section: "prose" },
    { label: "Books", section: "books" },
    { label: "About", section: "about" },
  ];

  const handleNav = (section: string) => {
    onNavigate(section);
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-stone-950/90 py-3 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-12 lg:px-20">
        {/* Logo */}
        <button
          onClick={() => onNavigate("hero")}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-700/40 bg-amber-950/30">
            <Feather className="h-5 w-5 text-amber-400" />
          </div>
          <span
            className={`font-serif text-lg tracking-wide transition-colors ${
              scrolled ? "text-stone-200" : "text-stone-200"
            }`}
          >
            Inkwell & Ash
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <button
              key={link.section}
              onClick={() => handleNav(link.section)}
              className="text-sm font-light tracking-wide text-stone-400 transition-colors hover:text-amber-400"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-stone-300 md:hidden"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute inset-x-0 top-full bg-stone-950/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col px-6 py-4">
            {links.map((link) => (
              <button
                key={link.section}
                onClick={() => handleNav(link.section)}
                className="py-3 text-left text-sm font-light tracking-wide text-stone-400 transition-colors hover:text-amber-400"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

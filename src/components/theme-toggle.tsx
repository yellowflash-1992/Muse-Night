import { useEffect, useState } from "react";
import { Moon, Sun, Sparkles } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("muse-theme") as "dark" | "light" | null;
    const initialTheme = saved || "dark";
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (t: "dark" | "light") => {
    const root = document.documentElement;
    if (t === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
    }
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("muse-theme", next);
    applyTheme(next);
  };

  if (!mounted) {
    return (
      <div
        className={`h-9 w-9 rounded-full border border-neon/20 bg-ink-2/80 ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Switch to Sunlit Florentine mode" : "Switch to Midnight Lamplight mode"
      }
      title={
        theme === "dark"
          ? "Switch to Sunlit Florentine (Light Mode)"
          : "Switch to Midnight Lamplight (Dark Mode)"
      }
      className={`group relative inline-flex h-9 items-center gap-2 rounded-full border border-neon/30 bg-ink-2 px-3 py-1.5 text-xs font-medium text-paper transition-all hover:border-neon hover:shadow-md active:scale-95 ${className}`}
    >
      <div className="relative flex h-4 w-4 items-center justify-center">
        {theme === "dark" ? (
          <Moon className="h-4 w-4 text-neon transition-transform duration-300 group-hover:-rotate-12" />
        ) : (
          <Sun className="h-4 w-4 text-amber-500 transition-transform duration-300 group-hover:rotate-45" />
        )}
      </div>
      <span className="text-[10px] uppercase tracking-[0.2em] text-paper-dim group-hover:text-paper hidden sm:inline">
        {theme === "dark" ? "Midnight" : "Sunlit"}
      </span>
    </button>
  );
}

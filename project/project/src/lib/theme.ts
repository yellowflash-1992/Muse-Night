import { LiteraryPiece } from "@/lib/supabase";

export interface CoverTheme {
  gradient: string;
  accent: string;
  accentSoft: string;
  dot: string;
  glow: string;
  text: string;
  border: string;
}

export const coverThemes: Record<string, CoverTheme> = {
  amber: {
    gradient: "from-amber-900 via-orange-800 to-rose-900",
    accent: "text-amber-300",
    accentSoft: "text-amber-300/80",
    dot: "bg-amber-300",
    glow: "shadow-amber-900/40",
    text: "text-amber-50",
    border: "border-amber-700/40",
  },
  teal: {
    gradient: "from-teal-900 via-cyan-900 to-slate-900",
    accent: "text-teal-300",
    accentSoft: "text-teal-300/80",
    dot: "bg-teal-300",
    glow: "shadow-teal-900/40",
    text: "text-teal-50",
    border: "border-teal-700/40",
  },
  rose: {
    gradient: "from-rose-950 via-rose-900 to-stone-900",
    accent: "text-rose-300",
    accentSoft: "text-rose-300/80",
    dot: "bg-rose-300",
    glow: "shadow-rose-900/40",
    text: "text-rose-50",
    border: "border-rose-700/40",
  },
  slate: {
    gradient: "from-slate-800 via-slate-700 to-zinc-900",
    accent: "text-slate-300",
    accentSoft: "text-slate-300/80",
    dot: "bg-slate-300",
    glow: "shadow-slate-900/40",
    text: "text-slate-50",
    border: "border-slate-600/40",
  },
  blue: {
    gradient: "from-blue-950 via-blue-900 to-slate-900",
    accent: "text-blue-300",
    accentSoft: "text-blue-300/80",
    dot: "bg-blue-300",
    glow: "shadow-blue-900/40",
    text: "text-blue-50",
    border: "border-blue-700/40",
  },
};

export function getTheme(color: string): CoverTheme {
  return coverThemes[color] || coverThemes.amber;
}

export function categoryLabel(category: string): string {
  switch (category) {
    case "poetry":
      return "Poetry";
    case "prose":
      return "Prose";
    case "book":
      return "Book";
    default:
      return category;
  }
}

export function categoryPlural(category: string): string {
  switch (category) {
    case "poetry":
      return "Poems";
    case "prose":
      return "Prose";
    case "book":
      return "Books";
    default:
      return category;
  }
}

export function formatBody(body: string): string[] {
  return body.split("\n").filter((line) => line.trim().length > 0);
}

import { Bookmark, Share2, Sparkles } from "lucide-react";

import type { CardMood, CardFormat } from "./LibraryPoemShareSheet";

export interface LibraryReaderControlsBarProps {
  fontSize: "sm" | "base" | "lg";
  warmMode: boolean;
  saved: boolean;
  onFontSizeChange: () => void;
  onWarmModeToggle: () => void;
  onShareOpen: () => void;
  onSavedToggle: () => void;
}

export function LibraryReaderControlsBar({
  fontSize,
  warmMode,
  saved,
  onFontSizeChange,
  onWarmModeToggle,
  onShareOpen,
  onSavedToggle,
}: LibraryReaderControlsBarProps) {
  return (
    <div className="sm:hidden fixed bottom-4 left-2.5 right-2.5 max-w-md mx-auto z-40 bg-ink-2/95 backdrop-blur-md border border-neon/20 rounded-2xl px-3 py-2.5 shadow-2xl flex items-center justify-between gap-1.5">
      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={onFontSizeChange}
          className="px-2 py-1 rounded-full bg-ink border border-neon/20 text-[11px] text-paper font-mono shrink-0 whitespace-nowrap active:scale-95 transition"
          title="Toggle text size"
        >
          Aa · {fontSize.toUpperCase()}
        </button>
        <button
          type="button"
          onClick={onWarmModeToggle}
          aria-pressed={warmMode}
          className={`p-1.5 rounded-full border shrink-0 transition active:scale-95 ${
            warmMode
              ? "border-amber-400 bg-amber-400/20 text-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.3)]"
              : "border-neon/20 bg-ink text-paper-dim hover:text-paper"
          }`}
          title="Toggle warm lamplight mode"
        >
          <Sparkles className="h-3.5 w-3.5" />
        </button>
      </div>
      <button
        type="button"
        onClick={onShareOpen}
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-ink border border-neon/20 text-[11px] font-medium uppercase tracking-[0.12em] text-paper-dim hover:text-neon cursor-pointer shrink-0 active:scale-95 transition"
        title="Share poem card"
      >
        <Share2 className="h-3.5 w-3.5" />
        <span>Share</span>
      </button>
      <button
        type="button"
        onClick={onSavedToggle}
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-ink border border-neon/20 text-[11px] font-medium uppercase tracking-[0.12em] text-paper-dim hover:text-neon cursor-pointer shrink-0 active:scale-95 transition ${
          saved ? "text-amber-300 border-amber-400/40" : ""
        }`}
        title={saved ? "Remove from vault" : "Save to vault"}
      >
        <Bookmark
          className="h-3.5 w-3.5"
          strokeWidth={1.5}
          fill={saved ? "currentColor" : "none"}
        />
        <span>{saved ? "Saved" : "Save"}</span>
      </button>
    </div>
  );
}

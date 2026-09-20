import { Check, Copy, Download, Share2, X } from "lucide-react";
import type { Poem } from "@/data/literature";

export type CardMood = "reflective" | "grief" | "love" | "joy";
export type CardFormat = "Square" | "Story" | "Pin";

export const CARD_FORMATS: Record<CardFormat, string> = {
  Square: "aspect-square w-full max-w-[240px]",
  Story: "aspect-[9/16] w-[170px]",
  Pin: "aspect-[2/3] w-[190px]",
};

export const MOOD_GRADIENTS: Record<CardMood, string> = {
  reflective: "bg-gradient-to-br from-teal-950 via-slate-900 to-ink",
  grief: "bg-gradient-to-br from-purple-950 via-slate-900 to-ink",
  love: "bg-gradient-to-br from-rose-950 via-slate-900 to-ink",
  joy: "bg-gradient-to-br from-amber-950 via-slate-900 to-ink",
};

export interface LibraryPoemShareSheetProps {
  isOpen: boolean;
  onClose: () => void;
  poem: Poem;
  cardExcerpt: string;
  selectedMood: CardMood;
  onSelectMood: (mood: CardMood) => void;
  cardFormat: CardFormat;
  onSelectFormat: (format: CardFormat) => void;
  onNativeShare: () => void;
  onCopy: () => void;
  onSaveImage: () => void;
  copied: boolean;
}

export function LibraryPoemShareSheet({
  isOpen,
  onClose,
  poem,
  cardExcerpt,
  selectedMood,
  onSelectMood,
  cardFormat,
  onSelectFormat,
  onNativeShare,
  onCopy,
  onSaveImage,
  copied,
}: LibraryPoemShareSheetProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-[fadeIn_0.2s_ease-out]">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md bg-ink-2 border-t sm:border border-neon/20 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl z-10 max-h-[92vh] overflow-y-auto space-y-5">
        <div className="flex items-center justify-between pb-2 border-b border-neon/10">
          <div>
            <span className="text-[10px] uppercase tracking-[0.24em] text-neon font-semibold">
              Poetic Card Studio
            </span>
            <h3 className="font-display text-xl text-paper font-medium">Share With Background</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-neon/10 text-paper-dim hover:text-paper cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mood Theme Selector */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-[0.16em] text-paper-faint font-mono">
            Background Atmosphere
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {(["reflective", "grief", "love", "joy"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => onSelectMood(m)}
                className={`py-1.5 px-2 rounded-xl text-[11px] capitalize font-medium transition-all cursor-pointer ${
                  selectedMood === m
                    ? "bg-neon/20 border border-neon text-neon shadow-sm"
                    : "bg-ink border border-neon/15 text-paper-dim hover:text-paper"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Format Picker */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.16em] text-paper-faint font-mono">
            Format:
          </span>
          <div className="flex gap-1.5">
            {(["Square", "Story", "Pin"] as const).map((fmt) => (
              <button
                key={fmt}
                type="button"
                onClick={() => onSelectFormat(fmt)}
                className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold transition cursor-pointer ${
                  cardFormat === fmt
                    ? "bg-neon text-ink shadow-sm"
                    : "bg-ink border border-neon/20 text-paper-dim hover:text-paper"
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        {/* Live Preview Card with Mood Background Gradient */}
        <div className="flex justify-center py-2">
          <div
            className={`${CARD_FORMATS[cardFormat]} rounded-2xl ${MOOD_GRADIENTS[selectedMood]} flex flex-col items-center justify-between text-center p-6 relative overflow-hidden border border-neon/20 shadow-2xl transition-all duration-300`}
          >
            {/* Atmosphere Tag */}
            <div className="w-full flex justify-start">
              <span className="text-[9px] uppercase tracking-wider bg-white/10 text-paper px-2 py-0.5 rounded-full border border-white/15">
                {selectedMood}
              </span>
            </div>

            <div className="space-y-3 my-auto py-2">
              <p className="font-display italic text-paper text-sm sm:text-base leading-relaxed text-pretty">
                “{cardExcerpt}”
              </p>
              <p className="text-[11px] text-neon/90 font-medium tracking-wide">— {poem.author}</p>
            </div>

            {/* Watermark Branding */}
            <div className="pt-2 flex flex-col items-center gap-0.5">
              <p className="font-display italic text-[11px] text-paper/80">Muse Night</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={onNativeShare}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-neon text-ink py-3 text-xs font-bold uppercase tracking-[0.16em] shadow-md hover:bg-neon/90 transition-all active:scale-95 cursor-pointer"
          >
            <Share2 className="h-4 w-4" />
            <span>Share to Instagram, WhatsApp...</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={onCopy}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-neon/30 bg-ink py-2.5 text-xs text-paper hover:bg-neon/10 transition cursor-pointer"
            >
              {copied ? <Check className="h-4 w-4 text-neon" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? "Copied" : "Copy text"}</span>
            </button>

            <button
              type="button"
              onClick={onSaveImage}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-neon/30 bg-ink py-2.5 text-xs text-paper hover:bg-neon/10 transition cursor-pointer"
            >
              <Download className="h-4 w-4 text-amber-400" />
              <span>Save Image</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

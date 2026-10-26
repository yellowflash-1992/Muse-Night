import type { Poem } from "@/data/literature";
import { Check, Copy, Download, Share2, X } from "lucide-react";

export type CardMood = "reflective" | "grief" | "love" | "joy";
export type CardFormat = "Square" | "Story" | "Pin";
export type FrameStyle =
  "minimal" | "romantic" | "melancholic" | "mystical" | "vintage" | "manuscript" | null;

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

// The CSS mapping for your database Poem Frames
const FRAME_STYLES: Record<Exclude<FrameStyle, null>, { surface: string; paper: string }> = {
  minimal: { surface: "bg-ink-3", paper: "border border-paper/30 bg-ink/70" },
  romantic: {
    surface: "bg-gradient-to-br from-rose-950 via-ink-3 to-rose-950",
    paper:
      "border border-rose-200/40 bg-rose-950/35 shadow-[inset_0_0_0_5px_rgba(251,113,133,0.08)]",
  },
  melancholic: {
    surface: "bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900",
    paper:
      "border border-slate-300/30 bg-slate-950/35 shadow-[inset_0_0_0_4px_rgba(148,163,184,0.08)]",
  },
  mystical: {
    surface: "bg-gradient-to-br from-violet-950 via-ink-3 to-emerald-950",
    paper:
      "border border-violet-300/30 bg-violet-950/25 shadow-[inset_0_0_0_5px_rgba(196,181,253,0.08)]",
  },
  vintage: {
    surface: "bg-gradient-to-br from-amber-950 via-stone-900 to-amber-950",
    paper:
      "border-2 border-double border-amber-200/35 bg-amber-950/25 shadow-[inset_0_0_0_5px_rgba(217,119,6,0.08)]",
  },
  manuscript: {
    surface: "bg-gradient-to-br from-stone-800 via-amber-950 to-stone-900",
    paper: "border border-dashed border-amber-100/40 bg-stone-900/40",
  },
};

export interface LibraryPoemShareSheetProps {
  isOpen: boolean;
  onClose: () => void;
  poem: Poem;
  cardExcerpt: string;
  selectedMood: CardMood;
  onSelectMood: (mood: CardMood) => void;
  selectedFrame: FrameStyle;
  onSelectFrame: (frame: FrameStyle) => void;
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
  selectedFrame,
  onSelectFrame,
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

  // Determine which background to use based on selection
  const previewClasses = selectedFrame
    ? `${CARD_FORMATS[cardFormat]} rounded-sm ${FRAME_STYLES[selectedFrame].surface} flex flex-col items-center justify-between text-center p-4 relative overflow-hidden border border-neon/20 shadow-2xl transition-all duration-300`
    : `${CARD_FORMATS[cardFormat]} rounded-2xl ${MOOD_GRADIENTS[selectedMood]} flex flex-col items-center justify-between text-center p-6 relative overflow-hidden border border-neon/20 shadow-2xl transition-all duration-300`;

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

        {/* Frame / Mood Selector */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[10px] uppercase tracking-[0.16em] text-paper-faint font-mono">
              Background
            </label>
            {selectedFrame && (
              <button
                onClick={() => onSelectFrame(null)}
                className="text-[10px] text-neon hover:underline"
              >
                Clear Frame
              </button>
            )}
          </div>

          {!selectedFrame ? (
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
          ) : (
            <div className="text-xs text-paper-dim italic px-1">
              Using Gallery Frame: <span className="text-neon capitalize">{selectedFrame}</span>
            </div>
          )}

          {/* Gallery Frames (Hardcoded options for the UI - The DB stores these same names) */}
          <div className="pt-2">
            <label className="text-[10px] uppercase tracking-[0.16em] text-paper-faint font-mono mb-1.5 block">
              Gallery Frames
            </label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(FRAME_STYLES) as Array<Exclude<FrameStyle, null>>).map((frame) => (
                <button
                  key={frame}
                  type="button"
                  onClick={() => onSelectFrame(frame)}
                  className={`px-3 py-1.5 rounded-lg text-xs capitalize transition cursor-pointer border ${
                    selectedFrame === frame
                      ? "bg-neon text-ink border-neon font-medium"
                      : "bg-ink border-neon/20 text-paper-dim hover:text-paper"
                  }`}
                >
                  {frame}
                </button>
              ))}
            </div>
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

        {/* Live Preview Card */}
        <div className="flex justify-center py-2">
          <div className={previewClasses}>
            {/* If a frame is selected, we wrap the text in the inner "paper" div */}
            {selectedFrame ? (
              <div
                className={`w-full h-full flex flex-col items-center justify-center p-3 ${FRAME_STYLES[selectedFrame].paper}`}
              >
                <div className="space-y-3 my-auto">
                  <p className="font-display italic text-paper text-sm leading-relaxed text-pretty">
                    &ldquo;{cardExcerpt}&rdquo;
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-paper-faint">
                    &mdash; {poem.author}
                  </p>
                </div>
              </div>
            ) : (
              // Default Mood Layout
              <>
                <div className="w-full flex justify-start">
                  <span className="text-[9px] uppercase tracking-wider bg-white/10 text-paper px-2 py-0.5 rounded-full border border-white/15">
                    {selectedMood}
                  </span>
                </div>
                <div className="space-y-3 my-auto py-2">
                  <p className="font-display italic text-paper text-sm sm:text-base leading-relaxed text-pretty">
                    &ldquo;{cardExcerpt}&rdquo;
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-paper-faint">
                    &mdash; {poem.author}
                  </p>
                </div>
                <div className="w-full flex justify-between items-end">
                  <span className="text-[9px] uppercase tracking-wider text-paper-faint">
                    Muse Night
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neon/10">
          <button
            onClick={onNativeShare}
            className="flex flex-col items-center gap-1.5 py-2 rounded-xl bg-ink hover:bg-ink-3 transition text-paper-dim hover:text-paper cursor-pointer"
          >
            <Share2 className="h-5 w-5" />
            <span className="text-[10px] uppercase tracking-wider">Share</span>
          </button>

          <button
            onClick={onCopy}
            className="flex flex-col items-center gap-1.5 py-2 rounded-xl bg-ink hover:bg-ink-3 transition text-paper-dim hover:text-paper cursor-pointer"
          >
            {copied ? <Check className="h-5 w-5 text-emerald-400" /> : <Copy className="h-5 w-5" />}
            <span className="text-[10px] uppercase tracking-wider">
              {copied ? "Copied" : "Copy"}
            </span>
          </button>

          <button
            onClick={onSaveImage}
            className="flex flex-col items-center gap-1.5 py-2 rounded-xl bg-ink hover:bg-ink-3 transition text-paper-dim hover:text-paper cursor-pointer"
          >
            <Download className="h-5 w-5" />
            <span className="text-[10px] uppercase tracking-wider">Save</span>
          </button>
        </div>
      </div>
    </div>
  );
}

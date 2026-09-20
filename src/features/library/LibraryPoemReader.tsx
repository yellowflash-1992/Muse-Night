import { Sparkles } from "lucide-react";
import type { LineNoteExcerpt } from "@/data/library-reader";
import type { Poem } from "@/data/literature";

export interface LibraryPoemReaderProps {
  poem: Poem;
  fontSize: "sm" | "base" | "lg";
  warmMode: boolean;
  openLine: number | null;
  lineNotes: Record<number, LineNoteExcerpt>;
  onToggleLineNote: (lineIndex: number) => void;
}

export function LibraryPoemReader({
  poem,
  fontSize,
  warmMode,
  openLine,
  lineNotes,
  onToggleLineNote,
}: LibraryPoemReaderProps) {
  let globalLineCount = 0;

  return (
    <>
      {warmMode && (
        <>
          {/* Warm Lamplight Overhead Aura */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-to-b from-amber-400/20 via-amber-300/10 to-transparent blur-3xl" />
          {/* Subtle Amber Edge Light */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.1),transparent_70%)]" />
        </>
      )}

      {/* Warm Mode Active Indicator */}
      {warmMode && (
        <div className="mb-4 flex items-center justify-end">
          <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-amber-300/90 font-mono bg-amber-400/10 border border-amber-400/25 px-2.5 py-0.5 rounded-full">
            <Sparkles className="h-3 w-3 text-amber-300 animate-pulse" />
            Lamplit Glow
          </span>
        </div>
      )}

      <div
        className={`font-display italic leading-[2.2rem] space-y-6 transition-colors duration-300 ${
          warmMode ? "text-[#fffbeb] drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]" : "text-paper"
        } ${
          fontSize === "sm"
            ? "text-base sm:text-lg leading-[2rem]"
            : fontSize === "lg"
              ? "text-xl sm:text-2xl leading-[2.5rem]"
              : "text-lg sm:text-xl leading-[2.2rem]"
        }`}
      >
        {poem.stanzas.map((stanza, sIdx) => (
          <div key={sIdx} className="space-y-1">
            {stanza.map((line) => {
              const lineIdx = globalLineCount++;
              const noteData = lineNotes[lineIdx];
              const hasNote = !!noteData;

              return (
                <div key={lineIdx}>
                  <button
                    type="button"
                    onClick={() => {
                      if (hasNote) {
                        onToggleLineNote(lineIdx);
                      }
                    }}
                    className={`text-left w-full transition-colors ${
                      hasNote
                        ? warmMode
                          ? "underline decoration-dotted decoration-amber-400/60 underline-offset-[5px] hover:decoration-amber-300 hover:text-amber-200 cursor-pointer"
                          : "underline decoration-dotted decoration-neon/50 underline-offset-[5px] hover:decoration-neon hover:text-neon cursor-pointer"
                        : "cursor-default"
                    }`}
                  >
                    {line}
                  </button>

                  {hasNote && openLine === lineIdx && (
                    <div
                      className={`my-3 ml-1 pl-4 border-l-2 py-2.5 px-3.5 rounded-r-xl animate-in fade-in space-y-1 not-italic ${
                        warmMode
                          ? "border-amber-400/70 bg-amber-400/10"
                          : "border-neon/50 bg-neon/5"
                      }`}
                    >
                      <p
                        className={`text-xs font-sans font-semibold flex items-center gap-1.5 ${
                          warmMode ? "text-amber-300" : "text-neon"
                        }`}
                      >
                        <Sparkles className="h-3 w-3" />
                        <span>{noteData.count} readers felt this line too</span>
                      </p>
                      <p className="text-sm font-sans text-paper-dim leading-relaxed">
                        “{noteData.excerpt}”
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <p className="text-xs text-paper-faint mt-8 text-center font-sans not-italic">
        Tap an underlined line to see what it made others feel
      </p>
    </>
  );
}

import { useEffect, useRef } from "react";
import { X, Feather } from "lucide-react";
import { LiteraryPiece } from "@/lib/supabase";
import { getTheme, categoryLabel, formatBody } from "@/lib/theme";

interface ReadingModalProps {
  piece: LiteraryPiece | null;
  onClose: () => void;
}

export function ReadingModal({ piece, onClose }: ReadingModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (piece && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [piece]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (piece) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [piece, onClose]);

  if (!piece) return null;

  const theme = getTheme(piece.cover_color);
  const lines = formatBody(piece.body);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative my-4 mx-4 w-full max-w-2xl rounded-2xl bg-stone-50 shadow-2xl animate-[modalIn_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cover header */}
        <div
          className={`relative overflow-hidden rounded-t-2xl bg-gradient-to-br ${theme.gradient} px-8 pt-8 pb-10`}
        >
          <button
            onClick={onClose}
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-white/80 transition-all hover:scale-110 hover:bg-black/40 hover:text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2 mb-4">
            <Feather className={`h-4 w-4 ${theme.accent}`} />
            <span className={`text-xs font-medium uppercase tracking-[0.2em] ${theme.accent}`}>
              {categoryLabel(piece.category)}
            </span>
          </div>

          <h2 className={`font-serif text-3xl leading-tight ${theme.text} sm:text-4xl`}>
            {piece.title}
          </h2>

          <p className={`mt-3 text-sm font-light tracking-wide ${theme.accentSoft}`}>
            by {piece.author_name}
          </p>

          {piece.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {piece.tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full border ${theme.border} px-3 py-1 text-xs font-light ${theme.accent}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Decorative line */}
          <div className={`mt-6 h-px w-full ${theme.border}`} />
        </div>

        {/* Body */}
        <div ref={scrollRef} className="max-h-[55vh] overflow-y-auto px-8 py-10 sm:px-12">
          {piece.category === "poetry" ? (
            <div className="space-y-1">
              {lines.map((line, i) => (
                <p key={i} className="font-serif text-lg leading-relaxed text-stone-800">
                  {line}
                </p>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {piece.body.split("\n").map((para, i) =>
                para.trim() === "" ? null : (
                  <p
                    key={i}
                    className="font-serif text-base leading-relaxed text-stone-700 sm:text-lg"
                  >
                    {para}
                  </p>
                ),
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-stone-200 px-8 py-5 sm:px-12">
          <p className="text-xs font-light tracking-wide text-stone-400">{piece.author_name}</p>
          <button
            onClick={onClose}
            className="text-xs font-medium uppercase tracking-[0.15em] text-stone-500 transition-colors hover:text-stone-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

import { Feather, Heart, Send } from "lucide-react";
import type { FormEvent } from "react";

import type { ReaderReflection } from "@/data/library-reader";

export interface LibraryPoemReflectionsProps {
  reflections: ReaderReflection[];
  note: string;
  anonymous: boolean;
  userDisplayName?: string;
  onNoteChange: (value: string) => void;
  onAnonymousChange: (value: boolean) => void;
  onToggleHeart: (reflectionId: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function LibraryPoemReflections({
  reflections,
  note,
  anonymous,
  userDisplayName = "you",
  onNoteChange,
  onAnonymousChange,
  onToggleHeart,
  onSubmit,
}: LibraryPoemReflectionsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display italic text-2xl text-paper font-medium">
          What this poem stirred
        </h2>
        <span className="text-xs text-paper-faint font-sans">{reflections.length} reflections</span>
      </div>

      {/* Write Box */}
      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-neon/20 bg-ink-2/70 p-4 sm:p-5 space-y-3 shadow-md"
      >
        <textarea
          rows={3}
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder="Share what you felt while reading this verse..."
          className="w-full bg-ink border border-neon/20 rounded-xl p-3.5 text-sm text-paper placeholder:text-paper-faint/60 focus:outline-none focus:border-neon transition-colors resize-none font-sans"
        />
        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={() => onAnonymousChange(!anonymous)}
            className={`text-xs px-3 py-1.5 rounded-full border transition cursor-pointer ${
              anonymous
                ? "border-neon/30 bg-neon/10 text-neon"
                : "border-neon/15 text-paper-dim hover:text-paper"
            }`}
          >
            {anonymous ? "Posting anonymously" : `Posting as ${userDisplayName}`}
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-1.5 text-xs px-5 py-2 rounded-full bg-neon text-ink font-bold uppercase tracking-wider hover:bg-neon/90 transition-all active:scale-95 shadow-md cursor-pointer"
          >
            <Send className="h-3 w-3" />
            <span>Share</span>
          </button>
        </div>
      </form>

      {/* Reflections List */}
      <div className="space-y-5 pt-2">
        {reflections.map((r) => (
          <div
            key={r.id}
            className="rounded-2xl border border-neon/15 bg-ink-2/50 p-5 space-y-3 shadow-sm hover:border-neon/30 transition"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-paper font-sans">{r.name}</p>
              <span className="text-[10px] text-paper-faint font-mono">{r.date}</span>
            </div>

            <p className="font-display italic text-base text-paper leading-relaxed">“{r.text}”</p>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => onToggleHeart(r.id)}
                className={`flex items-center gap-1.5 text-xs font-sans transition cursor-pointer ${
                  r.isHearted
                    ? "text-rose-400 font-semibold"
                    : "text-paper-faint hover:text-rose-400"
                }`}
              >
                <Heart className="h-3.5 w-3.5" fill={r.isHearted ? "currentColor" : "none"} />
                <span>{r.hearts}</span>
              </button>
            </div>

            {/* Poet Reply Card */}
            {r.poetReply && (
              <div className="mt-3 pl-4 border-l-2 border-amber-400/50 bg-amber-400/5 p-3.5 rounded-r-xl space-y-1">
                <p className="text-[11px] text-amber-300 font-semibold flex items-center gap-1 font-sans">
                  <Feather className="h-3 w-3" />
                  <span>The poet replied</span>
                </p>
                <p className="font-display italic text-sm text-paper-dim leading-relaxed">
                  {r.poetReply}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

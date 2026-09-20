import type { ReaderReaction } from "@/data/library-reader";

export interface LibraryPoemReactionsProps {
  reactions: ReaderReaction[];
  reactedEmoji: string | null;
  onToggleReaction: (emoji: string) => void;
}

export function LibraryPoemReactions({
  reactions,
  reactedEmoji,
  onToggleReaction,
}: LibraryPoemReactionsProps) {
  return (
    <div className="flex justify-center gap-2.5 pt-4 pb-2 flex-wrap">
      {reactions.map((r) => (
        <button
          key={r.emoji}
          type="button"
          onClick={() => onToggleReaction(r.emoji)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-medium transition cursor-pointer active:scale-95 ${
            reactedEmoji === r.emoji
              ? "bg-amber-400/15 border-amber-400/50 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.25)]"
              : "border-neon/20 bg-ink-2/60 text-paper-dim hover:border-neon hover:text-paper"
          }`}
        >
          <span className="text-base leading-none">{r.emoji}</span>
          <span>{r.count}</span>
        </button>
      ))}
    </div>
  );
}

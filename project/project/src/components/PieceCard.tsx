import { LiteraryPiece } from "@/lib/supabase";
import { getTheme, categoryLabel } from "@/lib/theme";

interface PieceCardProps {
  piece: LiteraryPiece;
  onOpen: (piece: LiteraryPiece) => void;
  index: number;
}

export function PieceCard({ piece, onOpen, index }: PieceCardProps) {
  const theme = getTheme(piece.cover_color);

  return (
    <button
      onClick={() => onOpen(piece)}
      className="group relative flex flex-col overflow-hidden rounded-xl text-left transition-all duration-500 hover:-translate-y-2"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Cover */}
      <div
        className={`relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br ${theme.gradient} shadow-xl ${theme.glow} transition-all duration-500 group-hover:shadow-2xl`}
      >
        {/* Texture overlay */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Spine line */}
        <div className="absolute left-0 top-0 h-full w-1.5 bg-black/20" />

        {/* Content */}
        <div className="relative flex h-full flex-col p-5">
          <div className="flex items-center gap-1.5">
            <div className={`h-1 w-1 rounded-full ${theme.dot}`} />
            <span className={`text-[10px] font-medium uppercase tracking-[0.2em] ${theme.accent}`}>
              {categoryLabel(piece.category)}
            </span>
          </div>

          <h3 className={`mt-auto font-serif text-xl leading-tight ${theme.text}`}>
            {piece.title}
          </h3>

          <p className={`mt-2 text-xs font-light ${theme.accent} opacity-70`}>
            {piece.author_name}
          </p>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-full border border-white/30 px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm">
            Read
          </span>
        </div>
      </div>

      {/* Excerpt below cover */}
      {piece.excerpt && (
        <p className="mt-3 px-1 text-xs font-light leading-relaxed text-stone-500 line-clamp-2">
          {piece.excerpt}
        </p>
      )}
    </button>
  );
}

import { useEffect, useRef, useState } from "react";
import { LiteraryPiece } from "@/lib/supabase";
import { PieceCard } from "./PieceCard";
import { categoryPlural } from "@/lib/theme";

interface CollectionSectionProps {
  id: string;
  category: string;
  pieces: LiteraryPiece[];
  onOpen: (piece: LiteraryPiece) => void;
  icon: React.ReactNode;
  tagline: string;
}

export function CollectionSection({
  id,
  category,
  pieces,
  onOpen,
  icon,
  tagline,
}: CollectionSectionProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const filtered = pieces.filter((p) => p.category === category);

  if (filtered.length === 0) return null;

  return (
    <section id={id} ref={ref} className="relative px-6 py-24 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div
          className={`mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 text-stone-600">
              {icon}
            </div>
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-stone-400">
              {categoryPlural(category)}
            </span>
          </div>
          <h2 className="mt-4 font-serif text-3xl text-stone-900 sm:text-4xl">{tagline}</h2>
          <div className="mt-4 h-px w-16 bg-stone-300" />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((piece, i) => (
            <div
              key={piece.id}
              className={visible ? "animate-[cardIn_0.6s_ease-out_both]" : "opacity-0"}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <PieceCard piece={piece} onOpen={onOpen} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { getRouteApi } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const routeApi = getRouteApi("/");

// Rotations for the hand-placed aesthetic
const rotations = ["rotate-1", "-rotate-1", "rotate-2", "-rotate-2", "rotate-0"];

export function MobileTestimonials() {
  const { poems } = routeApi.useLoaderData();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // 1. Pick 4 random poems on load
  const [randomPoems, setRandomPoems] = useState<any[]>([]);

  useEffect(() => {
    if (poems.length > 0) {
      // Shuffle array and pick up to 4
      const shuffled = [...poems].sort(() => 0.5 - Math.random());
      setRandomPoems(shuffled.slice(0, 4));
    }
  }, [poems]);

  const scrollAmount = 460;

  const updateSliderButtons = () => {
    const el = sliderRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(Math.ceil(el.scrollLeft + el.clientWidth) < el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (!el || randomPoems.length === 0) return;

    // Scroll to Card 2 so Card 1 is partially sunk off the left screen
    const firstCard = el.children[0] as HTMLElement;
    if (firstCard) {
      const gap = 20;
      const cardWidth = firstCard.offsetWidth + gap;
      const scrollPadding = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
      el.scrollLeft = cardWidth - scrollPadding;
    }

    updateSliderButtons();

    el.addEventListener("scroll", updateSliderButtons);
    window.addEventListener("resize", updateSliderButtons);
    return () => {
      el.removeEventListener("scroll", updateSliderButtons);
      window.removeEventListener("resize", updateSliderButtons);
    };
  }, [randomPoems.length]);

  // Hide section if there are no poems yet
  if (poems.length === 0) return null;

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[linear-gradient(145deg,var(--ink),var(--ink-2)_52%,var(--ink))]">
      <div className="pointer-events-none absolute -left-24 top-16 h-56 w-56 rounded-full bg-neon/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-8 h-64 w-64 rounded-full bg-rose/10 blur-3xl" />
      <div className="px-5 pt-12 pb-8">
        <div className="flex items-end justify-between mb-2">
          <div>
            <span className="text-neon text-[10px] font-bold tracking-[0.4em] uppercase block mb-3">
              // In Their Words
            </span>
            <h2 className="font-display text-[clamp(2rem,7vw,3.5rem)] font-semibold text-paper leading-[1.1]">
              Voices from
              <br />
              <span className="italic font-light text-paper-dim">the page</span>
            </h2>
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              type="button"
              onClick={() =>
                sliderRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" })
              }
              disabled={!canScrollLeft}
              className="w-9 h-9 rounded-full border border-neon/30 flex items-center justify-center text-neon hover:border-neon hover:bg-neon/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous quote"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() =>
                sliderRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" })
              }
              disabled={!canScrollRight}
              className="w-9 h-9 rounded-full bg-neon text-ink flex items-center justify-center hover:bg-amber-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next quote"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-ink to-transparent" />

        <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 h-36 w-36 rounded-full bg-neon/20 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 right-1/4 -translate-y-1/2 h-40 w-40 rounded-full bg-rose/20 blur-3xl" />

        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-auto pl-2 pr-5 pt-8 pb-12 -my-4 snap-x snap-mandatory scroll-pl-[50px]"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {randomPoems.map((poem, idx) => {
            const rotation = rotations[idx % rotations.length];
            // Get the first stanza, joined by newlines
            const stanza = poem.stanzas[0]?.join("\n") || "A poem waiting to be read.";

            return (
              <article
                key={poem.id}
                className={`glass-card min-w-[calc(100vw-88px)] sm:min-w-[380px] max-w-[380px] p-4 shrink-0 snap-start snap-always ${rotation} transition-all duration-300 hover:scale-[1.02] hover:rotate-0 hover:z-10`}
              >
                <div className="font-display text-5xl text-accent/30 leading-none mb-2 select-none">
                  "
                </div>
                <p className="font-display italic text-foreground text-lg leading-relaxed mb-6 whitespace-pre-line line-clamp-6">
                  {stanza}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neon/20 flex items-center justify-center text-neon font-bold">
                    {poem.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{poem.author}</p>
                    <p className="text-xs text-muted-foreground">From "{poem.title}"</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

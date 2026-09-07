import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Eye, Feather, Image as ImageIcon, Sparkles, X } from "lucide-react";
import { useState } from "react";

import bookQuietHour from "@/assets/book-quiet-hour.jpg";
import bookUnsentFriend from "@/assets/book-unsent-friend.jpg";
import poetAdaeze from "@/assets/poet-adaeze.jpg";
import poetTheo from "@/assets/poet-theo.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Press Gallery & Plates — Muse Books" },
      {
        name: "description",
        content:
          "Visual archives of Muse Books: hand-bound chapbook covers, letterpress type specimens, studio photography, and portraits of the poets.",
      },
    ],
  }),
  component: GalleryPage,
});

interface GalleryItem {
  id: string;
  title: string;
  category: "editions" | "studio" | "portraits";
  categoryLabel: string;
  image: string;
  caption: string;
  year: string;
  link?: string;
  linkText?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "quiet-hour-cover",
    title: "The Quiet Hour — First Edition Cover",
    category: "editions",
    categoryLabel: "Letterpress Edition",
    image: bookQuietHour,
    caption:
      "Handset Bembo roman type stamped in metallic copper ink on 280gsm Zerkall deckle-edged mould-made paper.",
    year: "MMXXIV",
    link: "/books/the-quiet-hour",
    linkText: "View Chapbook",
  },
  {
    id: "unsent-friend-cover",
    title: "Letters to an Unsent Friend — Letterpress Proof",
    category: "editions",
    categoryLabel: "Letterpress Edition",
    image: bookUnsentFriend,
    caption:
      "Smyth-sewn binding with exposed French spine stitching using raw dyed indigo linen thread.",
    year: "MMXXIV",
    link: "/books/letters-to-an-unsent-friend",
    linkText: "View Chapbook",
  },
  {
    id: "poet-irshand",
    title: "Irshand — Child of the Wilderness",
    category: "portraits",
    categoryLabel: "Poet Portrait",
    image: poetAdaeze,
    caption: "Captured in the studio lamplight during the typesetting of the winter poetry suite.",
    year: "MMXXIV",
    link: "/about",
    linkText: "Read Biography",
  },
  {
    id: "poet-inkbynur",
    title: "Raji Nurudeen Olawale — Voice in Correspondence",
    category: "portraits",
    categoryLabel: "Poet Portrait",
    image: poetTheo,
    caption: "Photographed by the desk overlooking the print workshop in Stockholm.",
    year: "MMXXIV",
    link: "/about",
    linkText: "Read Biography",
  },
  {
    id: "studio-night",
    title: "Night Study at the Albion Hand Press",
    category: "studio",
    categoryLabel: "Studio & Press",
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1400&q=80",
    caption:
      "Hand-inking the chase before pulling proof sheets on our restored 1890s Albion relief press.",
    year: "MMXXIV",
  },
  {
    id: "studio-paper",
    title: "Nocturnal Paper & Proof Impressions",
    category: "studio",
    categoryLabel: "Studio & Press",
    image:
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1400&q=80",
    caption:
      "Drying racks for freshly pulled verses and proof copies laid under weight for binding.",
    year: "MMXXIV",
  },
];

function GalleryPage() {
  const [filter, setFilter] = useState<"all" | "editions" | "studio" | "portraits">("all");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems =
    filter === "all" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((item) => item.category === filter);

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-10">
        {/* Header */}
        <div className="border-b border-neon/10 pb-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-neon/80 mb-3">
            <ImageIcon className="h-3.5 w-3.5" />
            <span>Visual Archive &amp; Studio Plates</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-medium text-paper">
            Press Gallery
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paper-dim max-w-[56ch] text-pretty">
            Photographs of our handset editions, letterpress plates, studio machinery, and portraits
            of the poets behind Muse Books.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Archives" },
              { id: "editions", label: "Chapbook Editions" },
              { id: "studio", label: "Press & Studio" },
              { id: "portraits", label: "The Poets" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id as typeof filter)}
                className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.18em] transition-all ${
                  filter === f.id
                    ? "bg-neon text-ink font-semibold shadow-md"
                    : "bg-ink-2 border border-neon/15 text-paper-dim hover:text-paper hover:border-neon/30"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group cursor-pointer rounded-2xl border border-neon/15 bg-ink-2/60 overflow-hidden flex flex-col hover:border-neon/40 hover:shadow-xl transition-all"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] bg-ink-3 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute top-3 right-3 rounded-full bg-ink/75 backdrop-blur-sm border border-neon/20 px-2.5 py-1 text-[10px] uppercase tracking-wider text-neon">
                  {item.year}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-ink/30 backdrop-blur-[2px]">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-neon/90 text-ink px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase shadow-lg">
                    <Eye className="h-3.5 w-3.5" />
                    Expand
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-neon/70 block mb-1">
                    {item.categoryLabel}
                  </span>
                  <h3 className="font-display text-xl text-paper font-medium group-hover:text-neon transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-paper-dim leading-relaxed line-clamp-2">
                    {item.caption}
                  </p>
                </div>
                {item.link && (
                  <div className="mt-4 pt-3 border-t border-neon/10 flex items-center justify-between text-xs text-neon">
                    <span>{item.linkText}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-ink/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-ink-2 border border-neon/30 rounded-2xl overflow-hidden shadow-2xl animate-[fadeIn_0.2s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-ink/80 border border-neon/30 text-paper hover:text-neon hover:bg-ink transition-all"
              aria-label="Close image modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[60vh] overflow-hidden bg-ink-3">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full object-contain max-h-[60vh] mx-auto"
              />
            </div>

            <div className="p-6">
              <span className="text-[10px] uppercase tracking-[0.22em] text-neon block mb-1">
                {selectedImage.categoryLabel} · {selectedImage.year}
              </span>
              <h2 className="font-display text-2xl text-paper font-medium">
                {selectedImage.title}
              </h2>
              <p className="mt-2 text-sm text-paper-dim leading-relaxed">{selectedImage.caption}</p>

              {selectedImage.link && (
                <div className="mt-5">
                  <Link
                    to={selectedImage.link}
                    onClick={() => setSelectedImage(null)}
                    className="inline-flex items-center gap-2 rounded-lg bg-neon px-4 py-2 text-xs uppercase tracking-[0.16em] font-bold text-ink hover:bg-neon/90 transition-all"
                  >
                    <span>{selectedImage.linkText}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

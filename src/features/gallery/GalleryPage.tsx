import { Link, useSearch } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Feather,
  Flower2,
  Frame,
  Landmark,
  Moon,
  ScrollText,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import bookQuietHour from "@/assets/book-quiet-hour.jpg";
import bookUnsentFriend from "@/assets/book-unsent-friend.jpg";
import { LIBRARY_POEMS } from "@/data/literature";

type GalleryCategoryId =
  "mystery" | "masterworks" | "poem-frames" | "relics" | "myth" | "visual-poetry";

type GalleryItem = {
  id: string;
  title: string;
  image?: string;
  category: GalleryCategoryId;
  description: string;
  artist?: string;
  era?: string;
  source?: string;
  learnMoreUrl?: string;
  status: "curated" | "built-in" | "coming-soon";
  visual: "mystery" | "portrait" | "frame" | "relic" | "myth" | "poetry";
  frameStyle?: "minimal" | "romantic" | "melancholic" | "mystical" | "vintage" | "manuscript";
  bookId?: string;
  poemId?: string;
};

const categories: {
  id: GalleryCategoryId;
  title: string;
  description: string;
  tagline: string;
  icon: typeof Sparkles;
  portal: string;
  futureNote: string;
}[] = [
  {
    id: "mystery",
    title: "Mystery",
    description: "Artworks, symbols and historical mysteries that invite a closer look.",
    tagline: "Things that refuse to explain themselves.",
    icon: Moon,
    portal: "from-indigo-950 via-slate-950 to-ink-3",
    futureNote: "More mysteries will be curated here.",
  },
  {
    id: "masterworks",
    title: "Famous Art",
    description: "Culturally significant artworks and the stories that keep them in view.",
    tagline: "Works that outlived their makers.",
    icon: Landmark,
    portal: "from-amber-950 via-stone-900 to-ink-3",
    futureNote: "More works of art will join this collection as images are carefully sourced.",
  },
  {
    id: "poem-frames",
    title: "Poem Frames",
    description: "A growing collection of built-in visual styles for words and quiet moments.",
    tagline: "Rooms in which poems can live.",
    icon: Frame,
    portal: "from-rose-950 via-violet-950 to-ink-3",
    futureNote: "More frame designs will be added to the collection.",
  },
  {
    id: "relics",
    title: "Literary Relics",
    description: "Books, letters and tools that hold traces of a life spent writing.",
    tagline: "Objects that remember their readers.",
    icon: ScrollText,
    portal: "from-amber-950 via-ink-3 to-stone-900",
    futureNote: "More literary objects and relics will be gathered here.",
  },
  {
    id: "myth",
    title: "Myth & Symbol",
    description: "Story-rich figures and symbols, held with care for tradition and uncertainty.",
    tagline: "Signs older than their tellers.",
    icon: Sparkles,
    portal: "from-violet-950 via-ink-3 to-emerald-950",
    futureNote: "More myths, traditions and symbols will find a place here.",
  },
  {
    id: "visual-poetry",
    title: "Visual Poetry",
    description: "Atmospheres and images in conversation with poems in the Muse Night Library.",
    tagline: "Where images speak what poems cannot.",
    icon: Flower2,
    portal: "from-emerald-950 via-slate-950 to-indigo-950",
    futureNote: "More visual conversations with poetry will be added over time.",
  },
];

const galleryCollections: Record<GalleryCategoryId, GalleryItem[]> = {
  mystery: [
    {
      id: "unanswered-questions",
      title: "The Unanswered Room",
      category: "mystery",
      description:
        "A place for enigmatic artworks, puzzling objects and histories still open to interpretation.",
      status: "coming-soon",
      visual: "mystery",
    },
    {
      id: "traces-in-stone",
      title: "Traces in Stone",
      category: "mystery",
      description:
        "More historical mysteries and archaeological subjects of debate will be curated here.",
      status: "coming-soon",
      visual: "mystery",
    },
  ],
  masterworks: [
    {
      id: "mona-lisa",
      title: "Mona Lisa",
      category: "masterworks",
      description:
        "Leonardo da Vinci's portrait is celebrated for its subtle expression and atmospheric landscape. A properly sourced public-domain image will be added to this collection.",
      artist: "Leonardo da Vinci",
      era: "Early 16th century",
      source: "Louvre Collections",
      learnMoreUrl: "https://collections.louvre.fr/en/ark:/53355/cl010062370",
      status: "coming-soon",
      visual: "portrait",
    },
    {
      id: "masterworks-to-come",
      title: "A room for masterworks",
      category: "masterworks",
      description:
        "More culturally significant paintings, sculpture and illustration will join this collection as images are carefully sourced.",
      status: "coming-soon",
      visual: "portrait",
    },
  ],
  "poem-frames": [
    {
      id: "minimal-frame",
      title: "Quiet Margin",
      category: "poem-frames",
      description:
        "A restrained, minimal frame style. This built-in visual is a gallery sample, not yet connected to poem rendering.",
      status: "built-in",
      visual: "frame",
      frameStyle: "minimal",
    },
    {
      id: "romantic-frame",
      title: "Softly Gathered",
      category: "poem-frames",
      description:
        "A romantic frame style with gentle, flowing details. Shown as a visual sample only.",
      status: "built-in",
      visual: "frame",
      frameStyle: "romantic",
    },
    {
      id: "melancholic-frame",
      title: "Blue Hour",
      category: "poem-frames",
      description:
        "A subdued, melancholic frame style for the blue hour. Not yet connected to poem rendering.",
      status: "built-in",
      visual: "frame",
      frameStyle: "melancholic",
    },
    {
      id: "mystical-frame",
      title: "Night Garden",
      category: "poem-frames",
      description:
        "A mystical frame style inspired by a garden after dark. Shown here as a built-in visual sample.",
      status: "built-in",
      visual: "frame",
      frameStyle: "mystical",
    },
    {
      id: "vintage-frame",
      title: "The Old Folio",
      category: "poem-frames",
      description:
        "A vintage frame style with the feeling of a well-kept folio. Not yet connected to poem rendering.",
      status: "built-in",
      visual: "frame",
      frameStyle: "vintage",
    },
    {
      id: "manuscript-frame",
      title: "Ink & Paper",
      category: "poem-frames",
      description:
        "A manuscript-inspired frame style. This built-in visual is a gallery sample, not a poem card.",
      status: "built-in",
      visual: "frame",
      frameStyle: "manuscript",
    },
  ],
  relics: [
    {
      id: "quiet-hour-edition",
      title: "The Quiet Hour",
      image: bookQuietHour,
      category: "relics",
      description:
        "A Muse Night chapbook cover: a small literary object made to be held, opened and returned to.",
      artist: "Muse Night",
      era: "2023",
      status: "curated",
      visual: "relic",
      bookId: "the-quiet-hour-chapbook",
    },
    {
      id: "unsent-friend-edition",
      title: "Letters to an Unsent Friend",
      image: bookUnsentFriend,
      category: "relics",
      description:
        "A Muse Night chapbook gathered around correspondence, distance and the letters we keep.",
      artist: "Muse Night",
      era: "2024",
      status: "curated",
      visual: "relic",
      bookId: "letters-to-an-unsent-friend-chapbook",
    },
  ],
  myth: [
    {
      id: "folklore-and-symbol",
      title: "Signs in the Story",
      category: "myth",
      description:
        "A home for folklore, myth and literary symbols, presented as traditions and stories rather than verified history.",
      status: "coming-soon",
      visual: "myth",
    },
    {
      id: "legendary-figures",
      title: "Figures of Legend",
      category: "myth",
      description:
        "Legendary figures and storytelling objects will be explored with their traditions and interpretations in view.",
      status: "coming-soon",
      visual: "myth",
    },
  ],
  "visual-poetry": LIBRARY_POEMS.slice(0, 3).map((poem, index) => ({
    id: `visual-poem-${poem.id}`,
    title: poem.title,
    category: "visual-poetry",
    description: [
      "A quiet poem for the lamplit hour. Read the work in the Library, then return to imagine its visual world.",
      "A poem of distance and unsent words, inviting a visual language of its own.",
      "A collection of poems gathered under the name of a quiet hour.",
    ][index]!,
    artist: poem.author,
    era: poem.collection,
    status: "curated" as const,
    visual: "poetry" as const,
    poemId: poem.id,
  })),
};

function Artwork({ item, onExpand }: { item: GalleryItem; onExpand: () => void }) {
  if (item.image) {
    return (
      <button
        type="button"
        onClick={onExpand}
        className="group/art relative block aspect-[4/3] w-full overflow-hidden bg-ink-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neon"
        aria-label={`View larger image: ${item.title}`}
      >
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover/art:scale-[1.03]"
          loading="lazy"
        />
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 to-transparent px-4 pb-4 pt-10 font-karla text-xs text-paper/90">
          View image
        </span>
      </button>
    );
  }

  if (item.visual === "frame") {
    const frameStyles = {
      minimal: {
        surface: "bg-ink-3",
        paper: "border border-paper/30 bg-ink/70",
      },
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
    }[item.frameStyle ?? "minimal"];

    return (
      <div
        className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden p-6 ${frameStyles.surface}`}
        aria-label={`${item.title} built-in frame style sample`}
        role="img"
      >
        <div className={`flex h-full w-full items-center justify-center p-3 ${frameStyles.paper}`}>
          <div className="max-w-[15ch] text-center font-display text-xl italic leading-snug text-paper/75 sm:text-2xl">
            words find
            <br />a quiet place
          </div>
        </div>
      </div>
    );
  }

  const VisualIcon = {
    mystery: Moon,
    portrait: Landmark,
    relic: ScrollText,
    myth: Sparkles,
    poetry: Feather,
  }[item.visual];
  const placeholderStyle = {
    mystery: {
      surface: "bg-gradient-to-br from-indigo-950 via-slate-950 to-ink-3",
      halo: "bg-indigo-300/15",
    },
    portrait: {
      surface: "bg-gradient-to-br from-amber-950 via-stone-900 to-ink-3",
      halo: "bg-amber-200/15",
    },
    relic: {
      surface: "bg-gradient-to-br from-amber-950 via-ink-3 to-stone-900",
      halo: "bg-amber-100/10",
    },
    myth: {
      surface: "bg-gradient-to-br from-violet-950 via-ink-3 to-emerald-950",
      halo: "bg-violet-300/15",
    },
    poetry: {
      surface: "bg-gradient-to-br from-emerald-950 via-slate-950 to-indigo-950",
      halo: "bg-emerald-200/15",
    },
  }[item.visual];

  return (
    <div
      className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden p-6 ${placeholderStyle.surface}`}
      role="img"
      aria-label={`Artwork coming soon for ${item.title}`}
    >
      <div
        className={`pointer-events-none absolute h-40 w-40 rounded-full blur-3xl ${placeholderStyle.halo}`}
      />
      <VisualIcon className="relative h-10 w-10 text-paper/65" strokeWidth={1} aria-hidden="true" />
      {item.visual === "poetry" && (
        <span className="absolute bottom-5 left-6 right-6 text-center font-display text-sm italic text-paper/75">
          a visual interpretation is coming
        </span>
      )}
      {item.status === "coming-soon" && (
        <span className="absolute bottom-4 rounded-full border border-paper/15 bg-ink/55 px-3 py-1 font-karla text-[11px] text-paper/80">
          Artwork coming soon
        </span>
      )}
    </div>
  );
}

export function GalleryPage() {
  const { category: selectedCategoryId } = useSearch({ from: "/gallery" });
  const activeCategory = categories.find(({ id }) => id === selectedCategoryId);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const selectedItems = activeCategory ? galleryCollections[activeCategory.id] : [];

  useEffect(() => {
    if (!selectedImage) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImage(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedImage]);

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8 lg:px-10">
        {!activeCategory ? (
          <>
            <header className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
              <div className="mb-3 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.28em] text-neon/80">
                <Feather className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Muse Night · Visual Archive</span>
              </div>
              <h1 className="font-display text-4xl font-medium text-paper sm:text-6xl">Gallery</h1>
              <p className="mx-auto mt-4 max-w-[58ch] text-base text-paper-dim text-pretty sm:text-lg">
                Step into a collection. Each door opens onto its own visual world.
              </p>
            </header>

            <nav
              aria-label="Gallery categories"
              className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3"
            >
              {categories.map(({ id, title, description, tagline, icon: Icon, portal }, index) => (
                <Link
                  key={id}
                  to="/gallery"
                  search={{ category: id }}
                  className={`group relative isolate flex min-h-72 overflow-hidden transition duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:min-h-96 ${
                    id === "mystery"
                      ? "border border-amber-200/35 bg-[#17110d] p-2 shadow-[0_8px_24px_rgba(0,0,0,0.35),inset_0_0_0_1px_rgba(245,221,175,0.1)] hover:-translate-y-1.5 hover:border-amber-100/65 hover:shadow-[0_24px_70px_rgba(0,0,0,0.55)]"
                      : id === "masterworks"
                        ? "border border-[#c9b178]/65 bg-[#211a12] p-2 shadow-[0_10px_30px_rgba(0,0,0,0.45),inset_0_0_0_1px_rgba(255,236,190,0.16)] hover:-translate-y-1 hover:border-[#f0dba8]/85 hover:shadow-[0_20px_52px_rgba(0,0,0,0.5)] sm:p-3"
                        : id === "poem-frames"
                          ? "border border-[#c9959d]/45 bg-[#211820] shadow-[0_10px_30px_rgba(0,0,0,0.42),inset_0_0_0_1px_rgba(245,218,214,0.08)] motion-safe:hover:-translate-y-1 hover:border-[#e4b6b7]/70 hover:shadow-[0_20px_48px_rgba(0,0,0,0.48)] motion-reduce:transition-none"
                          : id === "relics"
                            ? "border border-[#806344]/80 bg-[#211a14] p-2 shadow-[0_10px_30px_rgba(0,0,0,0.48),inset_0_0_0_1px_rgba(227,196,148,0.12)] motion-safe:hover:-translate-y-1 hover:border-[#b49368] hover:shadow-[0_18px_44px_rgba(0,0,0,0.52)] motion-reduce:transition-none sm:p-3"
                            : id === "myth"
                              ? "border border-[#718078]/70 bg-[#202521] p-2 shadow-[0_10px_30px_rgba(0,0,0,0.48),inset_0_0_0_1px_rgba(210,211,177,0.1)] hover:border-[#aab298]/85 hover:shadow-[0_18px_46px_rgba(0,0,0,0.52)] motion-reduce:transition-none sm:p-3"
                              : id === "visual-poetry"
                                ? "border border-[#aebbd0]/20 bg-[#151923] shadow-[0_12px_32px_rgba(0,0,0,0.35),inset_0_0_28px_rgba(178,196,220,0.04)] hover:border-[#c8d0dc]/35 motion-reduce:transition-none"
                                : `rounded-2xl border border-paper/15 bg-gradient-to-br ${portal} p-0 hover:-translate-y-1.5 hover:border-neon/55 hover:shadow-[0_24px_70px_rgba(0,0,0,0.45)] sm:rounded-3xl`
                  }`}
                >
                  {id === "mystery" ? (
                    <>
                      <div className="pointer-events-none absolute inset-[5px] border border-amber-100/20 transition-colors duration-500 group-hover:border-amber-100/35 group-focus-visible:border-amber-100/35 sm:inset-[7px]" />
                      <div className="pointer-events-none absolute inset-[9px] border border-amber-100/10 transition-colors duration-500 group-hover:border-amber-100/25 group-focus-visible:border-amber-100/25 sm:inset-[12px]" />

                      <div className="relative flex flex-1 flex-col overflow-hidden border border-amber-100/20 bg-[#100f12] transition-colors duration-500 group-hover:border-amber-100/35 group-focus-visible:border-amber-100/35">
                        <div className="relative min-h-0 flex-1 overflow-hidden">
                          <svg
                            viewBox="0 0 420 430"
                            preserveAspectRatio="xMidYMid slice"
                            className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.025] group-focus-visible:scale-[1.025] motion-reduce:transition-none"
                            aria-hidden="true"
                          >
                            <defs>
                              <linearGradient id="mysteryCanvas" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0" stopColor="#33313a" />
                                <stop offset="0.48" stopColor="#17191f" />
                                <stop offset="1" stopColor="#090b10" />
                              </linearGradient>
                              <linearGradient id="mysteryDoor" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0" stopColor="#c6a878" stopOpacity="0.26" />
                                <stop offset="0.55" stopColor="#837253" stopOpacity="0.12" />
                                <stop offset="1" stopColor="#100e0d" stopOpacity="0.05" />
                              </linearGradient>
                              <radialGradient id="mysteryLight" cx="50%" cy="37%" r="56%">
                                <stop offset="0" stopColor="#dfc58f" stopOpacity="0.4" />
                                <stop offset="1" stopColor="#dfc58f" stopOpacity="0" />
                              </radialGradient>
                              <pattern
                                id="mysteryCanvasGrain"
                                width="7"
                                height="7"
                                patternUnits="userSpaceOnUse"
                              >
                                <path
                                  d="M0 6.5H7M6.5 0V7"
                                  stroke="#e8d7b6"
                                  strokeOpacity="0.055"
                                  strokeWidth="0.5"
                                />
                              </pattern>
                            </defs>

                            <rect width="420" height="430" fill="url(#mysteryCanvas)" />
                            <rect width="420" height="430" fill="url(#mysteryLight)" />
                            <path
                              d="M0 310C78 282 133 303 210 286c85-19 134 2 210-24v168H0Z"
                              fill="#090b10"
                              fillOpacity="0.72"
                            />
                            <circle cx="290" cy="106" r="31" fill="#d9c7a1" fillOpacity="0.68" />
                            <circle cx="302" cy="99" r="30" fill="#24242a" fillOpacity="0.72" />
                            <path
                              d="M105 351V202a105 105 0 0 1 210 0v149Z"
                              fill="url(#mysteryDoor)"
                              stroke="#c8ad7d"
                              strokeOpacity="0.78"
                              strokeWidth="3"
                            />
                            <path
                              d="M126 351V204a84 84 0 0 1 168 0v147"
                              fill="none"
                              stroke="#e2cfaa"
                              strokeOpacity="0.27"
                              strokeWidth="1"
                            />
                            <path
                              d="M157 351V213a53 53 0 0 1 106 0v138Z"
                              fill="#080a0e"
                              fillOpacity="0.76"
                              stroke="#d3bc92"
                              strokeOpacity="0.46"
                              strokeWidth="1.5"
                            />
                            <path
                              d="M184 351v-72a26 26 0 0 1 52 0v72"
                              fill="#ddc9a2"
                              fillOpacity="0.12"
                            />
                            <path
                              d="M52 351h316M76 368h268M102 386h216"
                              stroke="#c8ad7d"
                              strokeOpacity="0.38"
                              strokeWidth="1"
                            />
                            <path
                              d="M0 0h420v430H0z"
                              fill="url(#mysteryCanvasGrain)"
                              opacity="0.75"
                            />
                            <path
                              d="M0 0h420v430H0z"
                              fill="none"
                              stroke="#090a0c"
                              strokeOpacity="0.55"
                              strokeWidth="38"
                            />
                          </svg>

                          <div
                            className="pointer-events-none absolute inset-3 border border-amber-100/25 sm:inset-4"
                            aria-hidden="true"
                          />
                          <span className="absolute left-5 top-5 font-karla text-[9px] uppercase tracking-[0.3em] text-amber-100/60 sm:left-7 sm:top-7 sm:text-[10px]">
                            No. I · The threshold
                          </span>
                          <span
                            className="absolute bottom-4 right-5 h-1.5 w-1.5 rounded-full bg-amber-100/75 shadow-[0_0_12px_rgba(245,221,175,0.75)] sm:bottom-6 sm:right-7"
                            aria-hidden="true"
                          />
                        </div>

                        <div className="relative border-t border-amber-100/20 bg-gradient-to-b from-[#241d17] to-[#14100d] px-4 pb-4 pt-3 sm:px-6 sm:pb-5 sm:pt-4">
                          <div
                            className="pointer-events-none absolute left-1/2 top-0 h-px w-10 -translate-x-1/2 bg-amber-100/50"
                            aria-hidden="true"
                          />
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-karla text-[9px] uppercase tracking-[0.25em] text-amber-100/55 sm:text-[10px]">
                              The museum of the unknown
                            </span>
                            <ArrowRight
                              className="h-4 w-4 shrink-0 text-amber-100/65 transition-transform group-hover:translate-x-1 group-hover:text-amber-50 group-focus-visible:translate-x-1 group-focus-visible:text-amber-50 motion-reduce:transition-none"
                              aria-hidden="true"
                            />
                          </div>
                          <h2 className="mt-1.5 translate-x-0 font-display text-2xl font-semibold leading-tight text-[#f0e4ce] transition duration-300 group-hover:translate-x-px group-hover:text-amber-100 group-focus-visible:translate-x-px group-focus-visible:text-amber-100 motion-reduce:transition-none sm:mt-2 sm:text-4xl">
                            Mystery
                          </h2>
                          <p className="mt-1 font-display text-sm italic text-amber-50/65 sm:mt-1.5 sm:text-base">
                            {tagline}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : id === "masterworks" ? (
                    <div className="relative flex flex-1 flex-col border border-[#d5bd8a]/55 bg-gradient-to-br from-[#655138] via-[#30251a] to-[#17130f] p-1.5 sm:p-2">
                      <div className="pointer-events-none absolute inset-[4px] border border-[#f3e0b5]/25 sm:inset-[6px]" />
                      <div className="pointer-events-none absolute inset-[8px] border border-black/45 sm:inset-[11px]" />
                      <div className="relative flex min-h-0 flex-1 flex-col bg-[#17130f] p-2.5 sm:p-4">
                        <div className="pointer-events-none absolute inset-2 border border-[#d2bb8d]/45 sm:inset-3" />
                        <div className="pointer-events-none absolute inset-[13px] border border-[#e6d8bd]/20 sm:inset-[17px]" />

                        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-[#282117] p-3 sm:p-5">
                          <div
                            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(250,226,174,0.2),transparent_65%)] transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
                            aria-hidden="true"
                          />
                          <div
                            className="relative flex h-full w-full items-center justify-center border border-[#e3d1aa]/30 bg-[linear-gradient(145deg,rgba(227,208,166,0.09),rgba(28,23,17,0.12)_44%,rgba(244,226,189,0.06))] shadow-[inset_0_0_36px_rgba(0,0,0,0.28)] transition duration-700 group-hover:border-[#f0dfbb]/55 group-hover:shadow-[inset_0_0_24px_rgba(0,0,0,0.2),0_0_18px_rgba(226,204,157,0.08)] group-focus-visible:border-[#f0dfbb]/55 group-focus-visible:shadow-[inset_0_0_24px_rgba(0,0,0,0.2),0_0_18px_rgba(226,204,157,0.08)] motion-reduce:transition-none"
                            aria-hidden="true"
                          >
                            <div className="pointer-events-none absolute inset-2 border border-[#e5d4b1]/10 sm:inset-3" />
                            <span className="relative max-w-[18ch] text-center font-display text-sm italic leading-relaxed text-[#e5d8c1]/70 sm:text-base">
                              A curated collection
                              <br />
                              awaits its first canvas
                            </span>
                          </div>
                        </div>

                        <div className="relative mx-auto mt-2 flex min-h-12 w-full items-center justify-center border border-[#e1ca98]/65 bg-gradient-to-b from-[#786442] via-[#4b3b25] to-[#302416] px-1 py-2 text-center shadow-[inset_0_1px_0_rgba(255,245,218,0.25),0_2px_5px_rgba(0,0,0,0.35)] transition-colors duration-500 group-hover:border-[#f0dba8] group-focus-visible:border-[#f0dba8] motion-reduce:transition-none sm:mt-3 sm:min-h-14 sm:w-[82%] sm:px-3">
                          <h2 className="whitespace-nowrap font-display text-xs font-semibold uppercase tracking-[0.12em] text-[#f2e4c7] transition-colors duration-500 group-hover:text-white group-focus-visible:text-white motion-reduce:transition-none max-[360px]:text-[10px] max-[360px]:tracking-[0.06em] sm:text-xl sm:tracking-[0.2em]">
                            Famous Art
                          </h2>
                          <ArrowRight
                            className="absolute right-2.5 h-4 w-4 translate-x-1 text-[#f2e4c7]/0 transition duration-300 group-hover:translate-x-0 group-hover:text-[#f2e4c7]/80 group-focus-visible:translate-x-0 group-focus-visible:text-[#f2e4c7]/80 motion-reduce:transition-none sm:right-3"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </div>
                  ) : id === "poem-frames" ? (
                    <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden bg-[radial-gradient(ellipse_at_50%_35%,rgba(177,120,135,0.2),transparent_65%),linear-gradient(145deg,#34242d,#1b1720_62%,#17141a)] p-3 sm:p-5">
                      <div
                        className="pointer-events-none absolute inset-2 border border-[#eed6c5]/15 sm:inset-3"
                        aria-hidden="true"
                      />
                      <div
                        className="pointer-events-none absolute inset-x-5 top-4 h-px bg-gradient-to-r from-transparent via-[#eed6c5]/25 to-transparent sm:inset-x-8 sm:top-6"
                        aria-hidden="true"
                      />
                      <div
                        className="relative flex min-h-0 flex-1 items-center justify-center"
                        aria-hidden="true"
                      >
                        <div className="absolute left-[14%] top-[14%] h-[66%] w-[48%] -rotate-[9deg] border border-[#a9b29b]/45 bg-[#b2b39b]/10 shadow-[0_8px_18px_rgba(0,0,0,0.25)] transition-transform duration-700 motion-safe:group-hover:-translate-x-1 motion-safe:group-hover:-translate-y-1 motion-safe:group-focus-visible:-translate-x-1 motion-safe:group-focus-visible:-translate-y-1 motion-reduce:transition-none" />
                        <div className="absolute right-[13%] top-[10%] h-[70%] w-[48%] rotate-[8deg] border border-[#c99683]/55 bg-[#c99683]/10 shadow-[0_8px_18px_rgba(0,0,0,0.28)] transition-transform duration-700 motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1 motion-safe:group-focus-visible:translate-x-1 motion-safe:group-focus-visible:-translate-y-1 motion-reduce:transition-none">
                          <div className="absolute inset-1.5 border border-[#e9c9b5]/20 sm:inset-2" />
                        </div>
                        <div className="relative z-10 flex h-[78%] w-[58%] -translate-y-1 flex-col border border-[#d8b78f]/75 bg-gradient-to-br from-[#735c4d] via-[#43343a] to-[#30252b] p-1.5 shadow-[0_14px_26px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,238,210,0.2)] transition-transform duration-700 motion-safe:group-hover:-translate-y-2 motion-safe:group-focus-visible:-translate-y-2 motion-reduce:transition-none sm:p-2">
                          <div className="flex flex-1 flex-col items-center justify-center border border-[#ead8bb]/35 bg-[#e5d7bf] px-2 text-center shadow-[inset_0_0_18px_rgba(80,54,47,0.12)] sm:px-3">
                            <span className="font-display text-[11px] italic leading-relaxed text-[#594748]/75 sm:text-sm">
                              a room
                              <br />
                              for every verse
                            </span>
                            <span className="mt-2 h-px w-7 bg-[#9e7772]/50 sm:mt-3 sm:w-9" />
                            <span className="mt-2 flex gap-1" aria-hidden="true">
                              <span className="h-1 w-1 rounded-full bg-[#a88078]/50" />
                              <span className="h-1 w-1 rounded-full bg-[#a88078]/35" />
                              <span className="h-1 w-1 rounded-full bg-[#a88078]/50" />
                            </span>
                          </div>
                        </div>
                        <div className="absolute bottom-[8%] left-1/2 h-4 w-24 -translate-x-1/2 rounded-[50%] bg-black/25 blur-md sm:w-32" />
                      </div>
                      <div className="relative z-20 mx-auto flex min-h-11 w-full items-center justify-center border-t border-[#eed6c5]/20 px-2 pt-2 text-center sm:mt-1 sm:min-h-12">
                        <h2 className="whitespace-nowrap font-display text-sm font-medium uppercase tracking-[0.15em] text-[#f0dfd4] transition-colors duration-500 group-hover:text-white group-focus-visible:text-white motion-reduce:transition-none sm:text-xl sm:tracking-[0.18em]">
                          Poem Frames
                        </h2>
                        <ArrowRight
                          className="absolute right-1 h-4 w-4 text-[#f0dfd4]/0 transition duration-300 motion-safe:group-hover:translate-x-0.5 group-hover:text-[#f0dfd4]/75 motion-safe:group-focus-visible:translate-x-0.5 group-focus-visible:text-[#f0dfd4]/75 motion-reduce:transition-none"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  ) : id === "relics" ? (
                    <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden border border-[#a07a50]/45 bg-[linear-gradient(135deg,#59432e,#2c2119_48%,#493725)] p-2.5 sm:p-4">
                      <div
                        className="pointer-events-none absolute inset-[4px] border border-[#d5b585]/15 sm:inset-[6px]"
                        aria-hidden="true"
                      />
                      <div
                        className="pointer-events-none absolute inset-x-3 top-2 h-px bg-gradient-to-r from-transparent via-[#e2c49a]/35 to-transparent sm:inset-x-5 sm:top-3"
                        aria-hidden="true"
                      />
                      <div
                        className="relative flex min-h-0 flex-1 flex-col overflow-hidden border border-[#d1ad7c]/35 bg-[linear-gradient(180deg,#33271d,#211a15)] p-2 shadow-[inset_0_3px_12px_rgba(0,0,0,0.42)] sm:p-3"
                        aria-hidden="true"
                      >
                        <div className="flex min-h-5 items-center justify-between border-b border-[#c6a475]/20 px-1 pb-1">
                          <span className="font-karla text-[8px] uppercase tracking-[0.2em] text-[#d5ba91]/55 sm:text-[10px]">
                            Archive drawer
                          </span>
                          <span className="h-1.5 w-7 rounded-full border border-[#d7b886]/45 bg-gradient-to-b from-[#9c7951] to-[#473421] shadow-[0_1px_3px_rgba(0,0,0,0.4)] sm:w-9" />
                        </div>
                        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_35%,rgba(213,177,126,0.13),transparent_68%)]">
                          <div className="absolute bottom-[7%] h-3 w-[74%] rounded-[50%] bg-black/35 blur-md" />
                          <div className="relative flex h-[82%] w-[68%] -rotate-[2deg] flex-col border border-[#c5a775]/65 bg-[#d8c6a3] p-1.5 shadow-[0_8px_16px_rgba(0,0,0,0.42),inset_0_0_0_2px_rgba(103,76,52,0.12)] transition-transform duration-700 motion-safe:group-hover:-translate-y-1.5 motion-safe:group-focus-visible:-translate-y-1.5 motion-reduce:transition-none sm:p-2">
                            <div className="flex flex-1 flex-col border border-[#8e7054]/25 px-2 py-2 sm:px-3 sm:py-3">
                              <span className="font-karla text-[7px] uppercase tracking-[0.16em] text-[#725b46]/65 sm:text-[9px]">
                                Folio · 07
                              </span>
                              <span className="mt-2 h-px w-5 bg-[#92775a]/45 sm:mt-3 sm:w-7" />
                              <span className="mt-2 space-y-1.5 sm:mt-3 sm:space-y-2">
                                <span className="block h-px w-full bg-[#806b55]/40" />
                                <span className="block h-px w-[84%] bg-[#806b55]/35" />
                                <span className="block h-px w-[92%] bg-[#806b55]/40" />
                                <span className="block h-px w-[68%] bg-[#806b55]/30" />
                              </span>
                              <svg
                                viewBox="0 0 56 72"
                                className="mt-auto ml-auto h-8 w-7 opacity-75 sm:h-11 sm:w-9"
                              >
                                <path
                                  d="M8 63C24 47 38 28 46 8"
                                  fill="none"
                                  stroke="#604b3a"
                                  strokeWidth="2"
                                />
                                <path
                                  d="M44 10C33 14 23 20 20 33c11-2 20-10 24-23Z"
                                  fill="#80684f"
                                  fillOpacity=".64"
                                />
                                <path
                                  d="M42 12 24 31"
                                  fill="none"
                                  stroke="#d8c6a3"
                                  strokeOpacity=".7"
                                  strokeWidth="1"
                                />
                                <path
                                  d="M5 66h22"
                                  stroke="#604b3a"
                                  strokeOpacity=".65"
                                  strokeWidth="1"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative z-10 mx-auto mt-2 flex min-h-11 w-full items-center justify-center border border-[#b79260]/55 bg-[linear-gradient(180deg,#765a3b,#493522)] px-1 text-center shadow-[inset_0_1px_0_rgba(255,235,199,0.16),0_2px_5px_rgba(0,0,0,0.35)] transition-colors duration-500 group-hover:border-[#d2b17b]/80 group-focus-visible:border-[#d2b17b]/80 motion-reduce:transition-none sm:mt-3 sm:min-h-12 sm:w-[88%] sm:px-2">
                        <h2 className="whitespace-nowrap font-display text-[9px] font-medium uppercase tracking-[0.12em] text-[#ead9bb] transition-colors duration-500 group-hover:text-white group-focus-visible:text-white motion-reduce:transition-none max-[360px]:text-[8px] max-[360px]:tracking-[0.06em] sm:text-lg sm:tracking-[0.18em]">
                          Literary Relics
                        </h2>
                        <ArrowRight
                          className="absolute right-1.5 h-3.5 w-3.5 text-[#ead9bb]/0 transition duration-300 motion-safe:group-hover:translate-x-0.5 group-hover:text-[#ead9bb]/80 motion-safe:group-focus-visible:translate-x-0.5 group-focus-visible:text-[#ead9bb]/80 motion-reduce:transition-none sm:right-2 sm:h-4 sm:w-4"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  ) : id === "myth" ? (
                    <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden border border-[#8e9882]/45 bg-[radial-gradient(ellipse_at_50%_38%,rgba(160,171,137,0.12),transparent_60%),linear-gradient(145deg,#454a3d,#272c28_52%,#1c211f)] p-2.5 sm:p-4">
                      <div
                        className="pointer-events-none absolute inset-[4px] border border-[#d6d1aa]/15 sm:inset-[6px]"
                        aria-hidden="true"
                      />
                      <div
                        className="pointer-events-none absolute inset-[8px] border border-black/25 sm:inset-[11px]"
                        aria-hidden="true"
                      />
                      <div
                        className="relative flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden"
                        aria-hidden="true"
                      >
                        <div className="absolute inset-0 bg-[linear-gradient(32deg,transparent_49.5%,rgba(212,209,170,0.06)_50%,transparent_50.5%),linear-gradient(148deg,transparent_49.5%,rgba(0,0,0,0.16)_50%,transparent_50.5%)]" />
                        <svg
                          viewBox="0 0 240 260"
                          className="relative h-[88%] max-h-[280px] w-auto max-w-full transition-transform duration-700 motion-safe:group-hover:-translate-y-1 motion-safe:group-focus-visible:-translate-y-1 motion-reduce:transition-none"
                        >
                          <defs>
                            <radialGradient id="mythStone" cx="35%" cy="24%" r="82%">
                              <stop offset="0" stopColor="#92927a" />
                              <stop offset=".48" stopColor="#5c6254" />
                              <stop offset="1" stopColor="#343c38" />
                            </radialGradient>
                            <radialGradient id="mythSeal" cx="38%" cy="30%" r="75%">
                              <stop offset="0" stopColor="#777b64" />
                              <stop offset="1" stopColor="#41483f" />
                            </radialGradient>
                            <filter id="mythCarve" x="-20%" y="-20%" width="140%" height="140%">
                              <feGaussianBlur in="SourceAlpha" stdDeviation="1.1" result="blur" />
                              <feOffset dy="1" result="offset" />
                              <feComposite
                                in="SourceGraphic"
                                in2="offset"
                                operator="over"
                                result="carved"
                              />
                              <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="carved" />
                              </feMerge>
                            </filter>
                          </defs>
                          <path
                            d="M120 7 207 31l25 89-25 89-87 44-87-44-25-89 25-89Z"
                            fill="#171d1b"
                            opacity=".6"
                            transform="translate(2 4)"
                          />
                          <path
                            d="M120 7 207 31l25 89-25 89-87 44-87-44-25-89 25-89Z"
                            fill="url(#mythStone)"
                            stroke="#b5b291"
                            strokeOpacity=".62"
                            strokeWidth="2"
                          />
                          <path
                            d="m120 17 78 21 22 82-22 82-78 40-78-40-22-82 22-82Z"
                            fill="none"
                            stroke="#d0cba4"
                            strokeOpacity=".38"
                            strokeWidth="1.5"
                          />
                          <path
                            d="m120 28 66 18 18 74-18 74-66 34-66-34-18-74 18-74Z"
                            fill="none"
                            stroke="#252d29"
                            strokeOpacity=".72"
                            strokeWidth="2"
                          />
                          <circle
                            cx="120"
                            cy="125"
                            r="59"
                            fill="#252b27"
                            fillOpacity=".38"
                            stroke="#c3bd91"
                            strokeOpacity=".66"
                            strokeWidth="2"
                          />
                          <circle
                            cx="120"
                            cy="125"
                            r="49"
                            fill="url(#mythSeal)"
                            stroke="#d2cda6"
                            strokeOpacity=".32"
                            strokeWidth="1"
                          />
                          <circle
                            cx="120"
                            cy="125"
                            r="40"
                            fill="none"
                            stroke="#242d28"
                            strokeOpacity=".86"
                            strokeWidth="1.5"
                          />
                          <g
                            fill="none"
                            stroke="#d5d0a8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.4"
                            filter="url(#mythCarve)"
                          >
                            <path d="M120 91 128 111 148 119 128 127 120 147 112 127 92 119 112 111Z" />
                            <path d="M120 99v52M100 119h40" strokeOpacity=".72" />
                            <path d="M120 82v-9m0 104v-9M77 125h-9m104 0h-9" strokeOpacity=".72" />
                            <path
                              d="m91 96-6-6m70 70-6-6m0-58 6-6m-70 70-6 6"
                              strokeOpacity=".52"
                            />
                          </g>
                          <circle cx="120" cy="119" r="4" fill="#ddd7ad" />
                          <path
                            d="M47 36 58 40M193 36l-11 4M47 214l11-4m135 4-11-4M26 120h8m172 0h8"
                            stroke="#d3cda1"
                            strokeOpacity=".65"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </div>
                      <div className="relative z-10 mx-auto mt-1 flex min-h-11 w-full items-center justify-center border-t border-[#c7c39c]/35 px-1 pt-1 text-center sm:mt-2 sm:min-h-12">
                        <h2 className="whitespace-nowrap font-display text-[10px] font-medium uppercase tracking-[0.08em] text-[#dedab8] transition-colors duration-500 group-hover:text-white group-focus-visible:text-white motion-reduce:transition-none max-[360px]:text-[9px] max-[360px]:tracking-[0.04em] sm:text-lg sm:tracking-[0.16em]">
                          Myth &amp; Symbol
                        </h2>
                        <ArrowRight
                          className="absolute right-0.5 h-3.5 w-3.5 text-[#dedab8]/0 transition duration-300 motion-safe:group-hover:translate-x-0.5 group-hover:text-[#dedab8]/80 motion-safe:group-focus-visible:translate-x-0.5 group-focus-visible:text-[#dedab8]/80 motion-reduce:transition-none sm:right-1 sm:h-4 sm:w-4"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  ) : id === "visual-poetry" ? (
                    <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden bg-[#171923]">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_28%,rgba(191,194,211,0.2),transparent_38%),linear-gradient(180deg,#343447_0%,#262b3b_43%,#202b35_74%,#171d26_100%)]" />
                      <div
                        className="absolute inset-0 transition-opacity duration-1000 group-hover:opacity-80 group-focus-visible:opacity-80 motion-reduce:transition-none"
                        style={{
                          background:
                            "radial-gradient(ellipse at 50% 48%, rgba(219,210,205,0.12), transparent 38%), linear-gradient(115deg, transparent 20%, rgba(226,222,213,0.035) 50%, transparent 78%)",
                        }}
                        aria-hidden="true"
                      />
                      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                        <svg
                          viewBox="0 0 360 430"
                          preserveAspectRatio="xMidYMid slice"
                          className="h-full w-full"
                        >
                          <defs>
                            <linearGradient id="visualPoetryWater" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0" stopColor="#9ca9b3" stopOpacity=".28" />
                              <stop offset="1" stopColor="#9ca9b3" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="visualPoetryHaze" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0" stopColor="#b4b4c2" stopOpacity="0" />
                              <stop offset=".5" stopColor="#d3c9c5" stopOpacity=".22" />
                              <stop offset="1" stopColor="#b4b4c2" stopOpacity="0" />
                            </linearGradient>
                            <filter id="visualPoetrySoftGlow">
                              <feGaussianBlur stdDeviation="13" />
                            </filter>
                          </defs>
                          <g className="transition-transform duration-[1400ms] motion-safe:group-hover:-translate-y-1 motion-safe:group-focus-visible:-translate-y-1 motion-reduce:transition-none">
                            <circle
                              cx="235"
                              cy="126"
                              r="41"
                              fill="#e7dfd8"
                              fillOpacity=".13"
                              filter="url(#visualPoetrySoftGlow)"
                            />
                            <circle cx="235" cy="126" r="23" fill="#e4ddd6" fillOpacity=".72" />
                            <circle cx="244" cy="119" r="22" fill="#343447" fillOpacity=".45" />
                            <path
                              d="M0 246c49-18 92-12 137-25 58-17 117-4 223-24v233H0Z"
                              fill="#252c35"
                            />
                            <path
                              d="M0 273c69-28 124-7 182-28 68-24 112-8 178-29v214H0Z"
                              fill="#202a33"
                            />
                            <path
                              d="M0 296c54-19 103-10 158-19 82-14 125-3 202-23v176H0Z"
                              fill="#1a222c"
                            />
                            <path
                              d="M213 151c8 40 15 71 13 110 0 43-10 78-4 131h42c4-52-7-89-7-131 0-40 6-73 14-110Z"
                              fill="url(#visualPoetryWater)"
                              opacity=".65"
                            />
                            <path
                              d="M0 294c64-7 111 5 171-5 77-12 116 3 189-8"
                              fill="none"
                              stroke="url(#visualPoetryHaze)"
                              strokeWidth="2"
                              opacity=".55"
                            />
                            <path
                              d="M33 338c49-5 68 3 112-2m74 17c37-4 62 2 103-3M58 371c26-3 39 2 65 0m75-11c18-2 33 1 48-1"
                              fill="none"
                              stroke="#bdc0c2"
                              strokeOpacity=".16"
                              strokeWidth="1.5"
                            />
                            <path
                              d="M64 236c-3 25-7 45-16 62m16-39c11-12 17-22 21-36m-21 44c-9-8-16-13-27-16"
                              fill="none"
                              stroke="#a5aa9e"
                              strokeOpacity=".58"
                              strokeLinecap="round"
                              strokeWidth="2"
                            />
                            <path
                              d="M63 224c5-12 14-16 23-14-3 10-11 17-23 18m-1 8c-8-10-17-12-25-7 6 9 14 12 25 10"
                              fill="#9da797"
                              fillOpacity=".48"
                            />
                          </g>
                          <rect
                            width="360"
                            height="430"
                            fill="url(#visualPoetryHaze)"
                            opacity=".16"
                          />
                        </svg>
                      </div>
                      <div
                        className="pointer-events-none absolute inset-2 border border-white/10 transition-colors duration-700 group-hover:border-white/20 group-focus-visible:border-white/20 sm:inset-3"
                        aria-hidden="true"
                      />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#11151d]/95 via-[#151923]/60 to-transparent sm:h-48" />
                      <div className="relative z-10 mt-auto flex min-h-24 items-end justify-between gap-2 px-4 pb-4 pt-16 sm:min-h-32 sm:px-6 sm:pb-6 sm:pt-20">
                        <div className="min-w-0">
                          <p className="mb-1 font-karla text-[9px] uppercase tracking-[0.2em] text-[#d2d2d8]/55 transition-colors duration-700 group-hover:text-[#e7e1df]/75 group-focus-visible:text-[#e7e1df]/75 sm:text-[10px]">
                            Where feeling becomes image
                          </p>
                          <h2 className="font-display text-xl font-medium italic leading-tight text-[#eee8e4]/90 transition-colors duration-700 group-hover:text-white group-focus-visible:text-white motion-reduce:transition-none sm:text-3xl">
                            Visual Poetry
                          </h2>
                        </div>
                        <ArrowRight
                          className="mb-1 h-4 w-4 shrink-0 text-[#eee8e4]/35 transition duration-500 motion-safe:group-hover:translate-x-1 group-hover:text-[#eee8e4]/80 motion-safe:group-focus-visible:translate-x-1 group-focus-visible:text-[#eee8e4]/80 motion-reduce:transition-none"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Atmospheric image area - full bleed visual zone */}
                      <div className="relative flex-1 overflow-hidden">
                        {/* Base atmospheric gradient already applied via portal class */}
                        {/* Vignette overlay */}
                        <div
                          className="pointer-events-none absolute inset-0"
                          style={{
                            background:
                              "radial-gradient(ellipse at 50% 35%, transparent 30%, rgba(0,0,0,0.55) 100%)",
                          }}
                          aria-hidden="true"
                        />
                        {/* Subtle grain texture via repeating gradient */}
                        <div
                          className="pointer-events-none absolute inset-0 opacity-[0.04]"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 3px)",
                            backgroundSize: "8px 8px",
                          }}
                          aria-hidden="true"
                        />
                        {/* Layered frame border - inner reveal */}
                        <div
                          className="pointer-events-none absolute inset-3 rounded-t-[48%] border border-paper/10 transition duration-500 group-hover:inset-2 group-hover:border-paper/25 sm:inset-5"
                          aria-hidden="true"
                        />
                        {/* Atmospheric glow orb - category focal point */}
                        <div
                          className={`pointer-events-none absolute left-1/2 top-[42%] h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition duration-500 group-hover:h-40 group-hover:w-40 group-hover:blur-[60px] ${
                            index % 2 === 0
                              ? "bg-neon/20 group-hover:bg-neon/35"
                              : "bg-amber-200/15 group-hover:bg-amber-200/30"
                          }`}
                          aria-hidden="true"
                        />
                        {/* Category icon as portal focal marker */}
                        <div className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/20 bg-ink/40 text-paper/70 backdrop-blur-sm transition duration-500 group-hover:h-14 group-hover:w-14 group-hover:border-paper/35 group-hover:text-paper sm:h-14 sm:w-14">
                            <Icon
                              className="h-5 w-5 sm:h-6 sm:w-6"
                              strokeWidth={1.5}
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                        {/* Enter cue - appears on hover/focus */}
                        <div className="pointer-events-none absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-paper/15 bg-ink/50 px-2.5 py-1 font-karla text-[10px] uppercase tracking-[0.18em] text-paper/70 opacity-0 backdrop-blur-sm transition duration-300 group-hover:opacity-100 sm:px-3 sm:text-xs">
                          <span>Enter</span>
                          <ArrowRight className="h-3 w-3" aria-hidden="true" />
                        </div>
                      </div>

                      {/* Cinematic lower-third title area */}
                      <div className="relative z-10 bg-gradient-to-t from-ink/95 via-ink/70 to-transparent px-4 pb-4 pt-10 sm:px-6 sm:pb-6 sm:pt-12">
                        <h2 className="font-display text-2xl font-semibold leading-tight text-paper transition-colors duration-300 group-hover:text-neon sm:text-4xl">
                          {title}
                        </h2>
                        <p className="mt-1 font-display italic text-sm text-paper/60 sm:mt-1.5 sm:text-base">
                          {tagline}
                        </p>
                        <p className="mt-1 line-clamp-1 font-karla text-xs leading-relaxed text-paper/55 sm:mt-1.5 sm:text-sm">
                          {description}
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1.5 font-karla text-xs font-medium text-neon transition group-hover:gap-2.5 sm:mt-4 sm:text-sm">
                          Enter gallery
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      </div>
                    </>
                  )}
                </Link>
              ))}
            </nav>
          </>
        ) : (
          <>
            <header className="mb-8 border-b border-neon/10 pb-7 sm:mb-10 sm:pb-9">
              <Link
                to="/gallery"
                search={{ category: undefined }}
                className="mb-7 inline-flex min-h-11 items-center gap-2 rounded-lg px-2 font-karla text-sm font-medium text-paper-dim transition hover:text-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Gallery
              </Link>
              <div className="flex items-start gap-3">
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neon/15 bg-ink-2 text-neon">
                  <activeCategory.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="mb-1 font-karla text-xs uppercase tracking-[0.24em] text-neon/80">
                    Muse Night · Visual Archive
                  </p>
                  <h1 className="font-display text-4xl font-medium text-paper sm:text-6xl">
                    {activeCategory.title}
                  </h1>
                  <p className="mt-3 max-w-[58ch] text-base leading-relaxed text-paper-dim sm:text-lg">
                    {activeCategory.description}
                  </p>
                </div>
              </div>
            </header>

            <section aria-label={`${activeCategory.title} collection`}>
              {selectedItems.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                  {selectedItems.map((item) => (
                    <article
                      key={item.id}
                      className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-neon/15 bg-ink-2/70 transition-colors hover:border-neon/35"
                    >
                      <Artwork item={item} onExpand={() => setSelectedImage(item)} />
                      <div className="flex flex-1 flex-col p-4 sm:p-5">
                        <div className="flex-1">
                          <h2 className="font-display text-xl font-medium leading-snug text-paper transition-colors group-hover:text-neon sm:text-2xl">
                            {item.title}
                          </h2>
                          <p className="mt-2 text-sm leading-relaxed text-paper-dim">
                            {item.description}
                          </p>
                        </div>
                        {(item.artist || item.era || item.source) && (
                          <p className="mt-3 font-karla text-xs text-paper-faint">
                            {[item.artist, item.era, item.source].filter(Boolean).join(" · ")}
                          </p>
                        )}
                        {item.status === "built-in" && (
                          <p className="mt-3 inline-flex items-center gap-1.5 font-karla text-xs text-emerald-300/85">
                            <Frame className="h-3.5 w-3.5" aria-hidden="true" />
                            Built-in frame style
                          </p>
                        )}

                        {(item.learnMoreUrl || item.bookId || item.poemId) && (
                          <div className="mt-4 flex flex-wrap gap-x-4 border-t border-neon/10 pt-3">
                            {item.learnMoreUrl && (
                              <a
                                href={item.learnMoreUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-8 items-center gap-1.5 font-karla text-xs text-paper-faint transition hover:text-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon"
                              >
                                <span className="text-neon/80" aria-hidden="true">
                                  •
                                </span>
                                Learn more
                                <ArrowUpRight className="h-3 w-3" aria-label="Opens in a new tab" />
                              </a>
                            )}
                            {item.bookId && (
                              <Link
                                to="/books/$id"
                                params={{ id: item.bookId }}
                                className="inline-flex min-h-8 items-center gap-1.5 font-karla text-xs text-paper-faint transition hover:text-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon"
                              >
                                <span className="text-neon/80" aria-hidden="true">
                                  •
                                </span>
                                View chapbook
                                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                              </Link>
                            )}
                            {item.poemId && (
                              <Link
                                to="/library/$id"
                                params={{ id: item.poemId }}
                                className="inline-flex min-h-8 items-center gap-1.5 font-karla text-xs text-paper-faint transition hover:text-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon"
                              >
                                <span className="text-neon/80" aria-hidden="true">
                                  •
                                </span>
                                Read in the Library
                                <BookOpen className="h-3 w-3" aria-hidden="true" />
                              </Link>
                            )}
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="rounded-2xl border border-dashed border-neon/20 bg-ink-2/50 p-6 font-karla text-sm text-paper-dim">
                  This collection is being curated. New works will appear here as they are ready.
                </p>
              )}
            </section>

            <p className="mt-7 font-karla text-sm text-paper-faint">{activeCategory.futureNote}</p>
            <Link
              to="/gallery"
              search={{ category: undefined }}
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg px-2 font-karla text-sm font-medium text-paper-dim transition hover:text-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Gallery
            </Link>
          </>
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
          role="presentation"
        >
          <section
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-neon/30 bg-ink-2 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-lightbox-title"
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-neon/30 bg-ink/85 text-paper transition hover:text-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon"
              aria-label="Close image viewer"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="max-h-[65vh] overflow-hidden bg-ink-3">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="mx-auto max-h-[65vh] w-full object-contain"
              />
            </div>
            <div className="p-5 sm:p-6">
              <h2
                id="gallery-lightbox-title"
                className="font-display text-2xl font-medium text-paper"
              >
                {selectedImage.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-paper-dim">
                {selectedImage.description}
              </p>
              {selectedImage.bookId && (
                <Link
                  to="/books/$id"
                  params={{ id: selectedImage.bookId }}
                  onClick={() => setSelectedImage(null)}
                  className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg px-2 font-karla text-sm font-medium text-neon hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon"
                >
                  View chapbook
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

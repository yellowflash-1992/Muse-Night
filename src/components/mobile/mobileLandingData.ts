export const heroLines = [
  "Words that breathe.",
  "Stories that linger.",
  "Verses that remember you.",
  "Written by lamplight.",
];

export const panels = [
  {
    id: "muse-night-image-1",
    type: "image",
    src: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1920&q=80",
    overlay: "bg-black/50 dark:bg-black/50 light:bg-[#f7f5f1]/40",
    title: "Night Study",
  },
  {
    id: "net-grid-1",
    type: "grid",
    overlay: "bg-gradient-to-b from-ink/20 via-ink/40 to-ink/65",
    title: "Letterpress Net Grid",
  },
  {
    id: "muse-night-image-2",
    type: "image",
    src: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1920&q=80",
    overlay: "bg-black/55 dark:bg-black/55 light:bg-[#f7f5f1]/40",
    title: "Nocturnal Paper",
  },
  {
    id: "net-grid-2",
    type: "grid",
    overlay: "bg-gradient-to-b from-ink/20 via-ink/40 to-ink/65",
    title: "Letterpress Blueprint",
  },
  // Clone of Item 1 for seamless infinite step transition
  {
    id: "muse-night-image-1-clone",
    type: "image",
    src: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1920&q=80",
    overlay: "bg-black/50 dark:bg-black/50 light:bg-[#f7f5f1]/40",
    title: "Night Study Clone",
    isClone: true,
  },
];

export const coverThemes = [
  {
    gradient: "from-amber-950 via-orange-950 to-stone-900",
    accent: "text-amber-300",
    dot: "bg-amber-400",
    glow: "shadow-amber-950/50",
    border: "border-amber-700/30",
  },
  {
    gradient: "from-teal-950 via-cyan-950 to-stone-900",
    accent: "text-teal-300",
    dot: "bg-teal-400",
    glow: "shadow-teal-950/50",
    border: "border-teal-700/30",
  },
  {
    gradient: "from-rose-950 via-pink-950 to-stone-900",
    accent: "text-rose-300",
    dot: "bg-rose-400",
    glow: "shadow-rose-950/50",
    border: "border-rose-700/30",
  },
  {
    gradient: "from-indigo-950 via-slate-900 to-stone-900",
    accent: "text-indigo-300",
    dot: "bg-indigo-400",
    glow: "shadow-indigo-950/50",
    border: "border-indigo-700/30",
  },
];

export const testimonials = [
  {
    quote:
      "The silence between words is where the poem lives. I am always writing toward that silence.",
    author: "Elara Voss",
    work: "Cartographies of Grief",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    rotation: "-rotate-2",
  },
  {
    quote:
      "To write about water is to write about everything that cannot be held — and everything we keep trying to hold anyway.",
    author: "Soren Adeyemi",
    work: "The Glass River",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    rotation: "rotate-1",
  },
  {
    quote:
      "I never know a poem is finished. I only know when I have stopped being able to change it for the better.",
    author: "Elara Voss",
    work: "On Craft",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    rotation: "-rotate-1",
  },
  {
    quote:
      "Memory is the first editor. It cuts what we cannot bear and keeps what we cannot release.",
    author: "Soren Adeyemi",
    work: "A Museum of Unfinished Things",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    rotation: "rotate-2",
  },
  {
    quote:
      "Language is the oldest technology. We forget that every word was once invented — by someone desperate to be understood.",
    author: "Elara Voss",
    work: "The Weight of Dusk",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    rotation: "-rotate-3",
  },
];

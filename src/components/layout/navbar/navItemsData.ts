import {
  Bookmark,
  BookMarked,
  BookOpen,
  Flame,
  GraduationCap,
  Image as ImageIcon,
  Layers,
  Sparkles,
  Users,
} from "lucide-react";
import type { ComponentType } from "react";

import { POEMS } from "@/data/literature";

export interface NavItem {
  to: string;
  label: string;
  description?: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
  count: string;
}

export const hubItems: NavItem[] = [
  {
    to: "/library",
    label: "Library",
    description: "Archive of poems, verses & epistles",
    icon: BookOpen,
    color: "text-amber-400",
    count: `${POEMS.length} works`,
  },
  {
    to: "/collections",
    label: "Collections",
    description: "Curated suites & volumes",
    icon: Layers,
    color: "text-emerald-400",
    count: "4 Volumes",
  },
  {
    to: "/mood",
    label: "Muse",
    description: "A poem for your mood & feelings",
    icon: Sparkles,
    color: "text-neon",
    count: "Inspiration",
  },
  {
    to: "/books",
    label: "Chapbooks",
    description: "Hand-bound letterpress editions",
    icon: BookMarked,
    color: "text-rose-400",
    count: "Albion Press",
  },
  {
    to: "/gallery",
    label: "Gallery",
    description: "Editions, covers & studio plates",
    icon: ImageIcon,
    color: "text-cyan-400",
    count: "Plates & Art",
  },
  {
    to: "/study",
    label: "Study Room",
    description: "JAMB & WAEC Literature Companion",
    icon: GraduationCap,
    color: "text-emerald-400",
    count: "JAMB/WAEC",
  },
];

export const topLinks: NavItem[] = [
  {
    to: "/daily",
    label: "Poetry Game",
    icon: Flame,
    color: "text-amber-400",
    count: "Battle",
  },
  {
    to: "/about",
    label: "About",
    icon: Users,
    color: "text-stone-300",
    count: "The Poets",
  },
  {
    to: "/submit",
    label: "Submit",
    icon: Sparkles,
    color: "text-neon",
    count: "Open call",
  },
  {
    to: "/vault",
    label: "Vault",
    icon: Bookmark,
    color: "text-amber-400",
    count: "Saved",
  },
];

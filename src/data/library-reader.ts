export interface ReaderReaction {
  emoji: string;
  label: string;
  count: number;
}

export interface ReaderReflection {
  id: string;
  name: string;
  text: string;
  hearts: number;
  isHearted: boolean;
  poetReply: string | null;
  date: string;
}

export interface LineNoteExcerpt {
  count: number;
  excerpt: string;
}

export interface ReaderData {
  reactions: ReaderReaction[];
  reflections: ReaderReflection[];
  lineNotes: Record<number, LineNoteExcerpt>;
}

export const INITIAL_READER_REACTIONS: ReaderReaction[] = [
  { emoji: "❤️", label: "moved me", count: 341 },
  { emoji: "😢", label: "made me cry", count: 128 },
  { emoji: "✨", label: "stirred my soul", count: 94 },
  { emoji: "🔥", label: "loved the writing", count: 52 },
];

export function getInitialReflections(authorName?: string): ReaderReflection[] {
  const firstName = authorName?.split(" ")[0] || "The Poet";
  const fullName = authorName || "Muse Press";

  return [
    {
      id: "ref-1",
      name: "Anonymous",
      text: "This is the first piece of literature that made the quiet feel less lonely instead of heavier.",
      hearts: 214,
      isHearted: false,
      poetReply: `Thank you for trusting this poem with that. Sending you steadiness under the lamplight. — ${firstName}`,
      date: "2 days ago",
    },
    {
      id: "ref-2",
      name: "Aisha O.",
      text: "“The desk keeps its own small weather” — I read it three times and still felt the room fold around me.",
      hearts: 96,
      isHearted: false,
      poetReply: null,
      date: "1 week ago",
    },
    {
      id: "ref-3",
      name: "Kaelen M.",
      text: "There is an unbearable tenderness in these lines. Reading it feels like being listened to.",
      hearts: 58,
      isHearted: false,
      poetReply: `That tenderness is where we meet our readers. With deep gratitude. — ${fullName}`,
      date: "3 days ago",
    },
  ];
}

export const DEFAULT_LINE_NOTES: Record<number, LineNoteExcerpt> = {
  1: {
    count: 48,
    excerpt: "This line stopped me in my tracks. It captured what silence actually feels like.",
  },
  2: {
    count: 86,
    excerpt:
      "I had to pause reading for a moment. This line broke me and mended me in the same breath.",
  },
};

const READER_DATA_BY_POEM: Record<string, ReaderData> = {
  "lamplight-late-november": {
    reactions: [...INITIAL_READER_REACTIONS],
    reflections: getInitialReflections("Irshand"),
    lineNotes: {
      2: {
        count: 86,
        excerpt: "This line made me pause. I read it three times and still felt the room fold.",
      },
    },
  },
};

export function getReaderDataForPoem(poemId?: string, authorName?: string): ReaderData {
  if (poemId && READER_DATA_BY_POEM[poemId]) {
    const cached = READER_DATA_BY_POEM[poemId];
    return {
      reactions: [...cached.reactions],
      reflections: [...cached.reflections],
      lineNotes: { ...cached.lineNotes },
    };
  }

  return {
    reactions: [...INITIAL_READER_REACTIONS],
    reflections: getInitialReflections(authorName),
    lineNotes: { ...DEFAULT_LINE_NOTES },
  };
}

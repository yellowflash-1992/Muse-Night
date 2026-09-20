export interface LiteraryVoice {
  id: string;
  name: string;
  title: string;
  description: string;
}

export interface LiteraryWorld {
  id: string;
  name: string;
  authorId: string;
  description: string;
  voices?: LiteraryVoice[];
}

export const LITERARY_WORLDS: Record<string, LiteraryWorld> = {
  "child-of-the-wilderness": {
    id: "child-of-the-wilderness",
    name: "Child of the Wilderness",
    authorId: "muhammad-abdulnasir",
    description:
      "A literary sanctuary where language breathes, the landscape speaks its own biography, and stories pulse with enduring life.",
    voices: [
      {
        id: "irshand",
        name: "Irshand",
        title: "The Witness",
        description:
          "The primary voice of the wilderness, observing what moves between the inner world and the natural one.",
      },
      {
        id: "aporia",
        name: "Aporia",
        title: "The Logic-Puzzle",
        description: "Where the programmer meets the philosopher in deadlock.",
      },
      {
        id: "serein",
        name: "Serein",
        title: "The Twilight",
        description: "Rain from a cloudless sky; peaceful and melancholic.",
      },
      {
        id: "elyon",
        name: "Elyon",
        title: "The Ethereal",
        description: "The voice looking down from the highest peaks.",
      },
      {
        id: "wandera",
        name: "Wandera",
        title: "The Nomad",
        description: "The restless spirit searching the outskirts.",
      },
    ],
  },
};

export function getLiteraryWorldById(id: string): LiteraryWorld | undefined {
  return LITERARY_WORLDS[id];
}

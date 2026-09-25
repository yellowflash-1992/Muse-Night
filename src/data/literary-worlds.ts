export interface LiteraryWorld {
  id: string;
  name: string;
  authorId: string;
  description: string;
  penNameIds: string[];
}

export const LITERARY_WORLDS: Record<string, LiteraryWorld> = {
  "child-of-the-wilderness": {
    id: "child-of-the-wilderness",
    name: "Child of the Wilderness",
    authorId: "muhammad-abdulnasir",
    description:
      "A literary sanctuary where language breathes, the landscape speaks its own biography, and stories pulse with enduring life.",
    penNameIds: ["irshand", "aporia", "serein", "elyon", "wandera"],
  },
};

export function getLiteraryWorldById(id: string): LiteraryWorld | undefined {
  return LITERARY_WORLDS[id];
}

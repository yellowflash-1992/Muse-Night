import { LITERARY_WORLDS, type LiteraryVoice } from "./literary-worlds";
import { PEOPLE, type Person } from "./people";

export interface PenName {
  id: string;
  name: string;
  personId: string;
  title?: string;
  description?: string;
  literaryIdentity?: string;
  isPrimary?: boolean;
}

export interface Poet extends Person {
  penName: string;
  works: string[];
  literaryIdentity?: string;
  penNames?: string[];
  voices?: LiteraryVoice[];
}

const primaryPenNameByPersonId: Record<string, string> = {
  "muhammad-abdulnasir": "irshand",
  "nurudeen-abdullah": "inkbynur",
};

const worksByPersonId: Record<string, string[]> = {
  "muhammad-abdulnasir": ["irshand", "SEREIN-SERENE", "APORIA", "WANDERA", "ELYON"],
  "nurudeen-abdullah": ["InkbyNur"],
};

export const PEN_NAMES: Record<string, PenName> = {
  irshand: {
    id: "irshand",
    name: "Irshand",
    personId: "muhammad-abdulnasir",
    literaryIdentity: "Child of the Wilderness",
    isPrimary: true,
  },
  aporia: {
    id: "aporia",
    name: "Aporia",
    personId: "muhammad-abdulnasir",
    title: "The Logic-Puzzle",
    description: "Where the programmer meets the philosopher in deadlock.",
    literaryIdentity: "Child of the Wilderness",
  },
  serein: {
    id: "serein",
    name: "Serein",
    personId: "muhammad-abdulnasir",
    title: "The Twilight",
    description: "Rain from a cloudless sky; peaceful and melancholic.",
    literaryIdentity: "Child of the Wilderness",
  },
  elyon: {
    id: "elyon",
    name: "Elyon",
    personId: "muhammad-abdulnasir",
    title: "The Ethereal",
    description: "The voice looking down from the highest peaks.",
    literaryIdentity: "Child of the Wilderness",
  },
  wandera: {
    id: "wandera",
    name: "Wandera",
    personId: "muhammad-abdulnasir",
    title: "The Nomad",
    description: "The restless spirit searching the outskirts.",
    literaryIdentity: "Child of the Wilderness",
  },
  inkbynur: {
    id: "inkbynur",
    name: "InkbyNur",
    personId: "nurudeen-abdullah",
    isPrimary: true,
  },
};

const getPenNamesForPerson = (personId: string) =>
  Object.values(PEN_NAMES)
    .filter((penName) => penName.personId === personId)
    .map((penName) => penName.name);

export const POETS: Record<string, Poet> = Object.fromEntries(
  Object.values(PEOPLE).map((person) => {
    const primaryPenName = Object.values(PEN_NAMES).find(
      (penName) =>
        penName.personId === person.id && penName.id === primaryPenNameByPersonId[person.id],
    );
    const literaryWorld = Object.values(LITERARY_WORLDS).find(
      (world) => world.authorId === person.id,
    );

    return [
      person.id,
      {
        ...person,
        penName: primaryPenName?.name ?? person.legalName,
        works: worksByPersonId[person.id] ?? [],
        penNames: getPenNamesForPerson(person.id),
        ...(literaryWorld
          ? {
              literaryIdentity: literaryWorld.name,
              ...(literaryWorld.voices ? { voices: literaryWorld.voices } : {}),
            }
          : {}),
      },
    ];
  }),
) as Record<string, Poet>;

export function getPoetById(id: string): Poet | undefined {
  return POETS[id];
}

export function getPenNameById(id: string): PenName | undefined {
  return PEN_NAMES[id];
}

export function getPenNamesByPersonId(personId: string): PenName[] {
  return Object.values(PEN_NAMES).filter((penName) => penName.personId === personId);
}

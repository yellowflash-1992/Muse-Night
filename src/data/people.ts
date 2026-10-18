import poetTheo from "@/assets/poet-theo.jpg";

import { PEOPLE as CORE_PEOPLE, type Person as CorePerson } from "./core/literary-data";

export interface Person extends CorePerson {
  image?: string;
}

export const PEOPLE: Record<string, Person> = Object.fromEntries(
  Object.entries(CORE_PEOPLE).map(([id, person]) => [
    id,
    {
      ...person,
      image: poetTheo,
    },
  ]),
) as Record<string, Person>;

export function getPersonById(id: string): Person | undefined {
  return PEOPLE[id];
}

import {
  PEN_NAMES as CORE_PEN_NAMES,
  POETS as CORE_POETS,
  type PenName as CorePenName,
  type Poet as CorePoet,
} from "./core/literary-data";
import { PEOPLE } from "./people";

export type PenName = CorePenName;
export interface Poet extends CorePoet {
  image?: string;
}

export const PEN_NAMES = CORE_PEN_NAMES;
export const POETS: Record<string, Poet> = Object.fromEntries(
  Object.entries(CORE_POETS).map(([id, poet]) => [
    id,
    {
      ...poet,
      image: PEOPLE[id]?.image,
    },
  ]),
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

import bookQuietHour from "@/assets/book-quiet-hour.jpg";
import bookUnsentFriend from "@/assets/book-unsent-friend.jpg";

import { COLLECTIONS_CORE, type CollectionCore } from "./core/literary-data";

export interface Collection extends CollectionCore {
  coverImage?: string;
}

const coverImageMap: Record<string, string> = {
  "the-quiet-hour": bookQuietHour,
  "letters-to-an-unsent-friend": bookUnsentFriend,
};

export const COLLECTIONS: Collection[] = COLLECTIONS_CORE.map((collection) => ({
  ...collection,
  coverImage: coverImageMap[collection.id],
})) as Collection[];

export function getCollectionById(id: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.id === id);
}

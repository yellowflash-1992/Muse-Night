import "dotenv/config";
import { getPublishedPoemsListRaw } from "../src/lib/poems.server";

const poems = await getPublishedPoemsListRaw();
console.log(`Total: ${poems.length}`);
if (poems.length > 0) {
  const p = poems[0];
  console.log(`First: ${p.title}`);
  console.log(`  author: ${p.author}`);
  console.log(`  collectionAuthor: ${p.collectionAuthor ?? "(null)"}`);
}

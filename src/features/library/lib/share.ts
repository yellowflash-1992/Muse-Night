import type { Poem } from "@/data/poems";

export function formatPoemCitation(poem: Poem): string {
  return `"${poem.title}"\nby ${poem.author}\n\n${poem.stanzas.map((s) => s.join("\n")).join("\n\n")}\n\n(via Muse Night)`;
}

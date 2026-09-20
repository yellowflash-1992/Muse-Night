import type { Poem } from "@/data/literature";

export interface PoeticFormOption {
  label: string;
  detail: string;
}

export const POETIC_FORMS: readonly PoeticFormOption[] = [
  { label: "Free Verse", detail: "Open Form" },
  { label: "Sonnet", detail: "14 Lines" },
  { label: "Haiku", detail: "3 Lines · 5-7-5" },
  { label: "Epistle", detail: "Verse Letter" },
  { label: "Prose Poetry", detail: "Poetic Prose" },
] as const;

export function getPoemForm(p: Poem): string {
  // 1. Haiku: strictly 3 lines (traditional 5-7-5 syllables)
  if (p.linesCount === 3 || p.tags.includes("Haiku") || p.title.toLowerCase().includes("haiku")) {
    return "Haiku";
  }
  // 2. Sonnet: classical 14 lines
  if (p.linesCount === 14 || p.tags.includes("Sonnet")) {
    return "Sonnet";
  }
  // 3. Epistle: Letter in verse
  if (
    p.tags.includes("Letters") ||
    p.tags.includes("Epistle") ||
    p.title.toLowerCase().includes("letter")
  ) {
    return "Epistle";
  }
  // 4. Prose Poetry: Poetic prose & narrative entries
  if (p.tags.includes("Prose") || p.tags.includes("Travel") || p.tags.includes("Maps")) {
    return "Prose Poetry";
  }
  // 5. Free Verse: Open form non-metrical poetry
  return "Free Verse";
}

export interface LibraryFilterCriteria {
  search?: string;
  selectedAuthor?: string;
  selectedTag?: string;
  selectedForm?: string;
}

export function filterPoems(poems: Poem[], criteria: LibraryFilterCriteria): Poem[] {
  const {
    search = "",
    selectedAuthor = "all",
    selectedTag = "all",
    selectedForm = "all",
  } = criteria;

  return poems.filter((poem) => {
    const matchSearch =
      search === "" ||
      poem.title.toLowerCase().includes(search.toLowerCase()) ||
      poem.author.toLowerCase().includes(search.toLowerCase()) ||
      poem.stanzas.some((s) => s.some((l) => l.toLowerCase().includes(search.toLowerCase())));

    const matchAuthor = selectedAuthor === "all" || poem.authorId === selectedAuthor;

    const matchTag = selectedTag === "all" || poem.tags.includes(selectedTag);

    const matchForm =
      selectedForm === "all" || getPoemForm(poem).toLowerCase() === selectedForm.toLowerCase();

    return matchSearch && matchAuthor && matchTag && matchForm;
  });
}

/**
 * Offline unit tests for the poem mapper in src/server/poems.ts.
 *
 * The mapper is pure (no Prisma import), so these tests run without a database.
 */
import { describe, expect, it } from "vitest";

import { mapPoemRowToUi, type PublishedPoemRow } from "@/lib/poems.server";

const PEN_NAME = { id: "irshand", name: "Irshand" };
const PUBLISHED_COLLECTION = {
  id: "the-quiet-hour",
  title: "The Quiet Hour",
  author: { name: "Irshand" },
  status: "PUBLISHED",
};

const DRAFT_COLLECTION = { ...PUBLISHED_COLLECTION, status: "DRAFT" };

function baseRow(overrides: Partial<PublishedPoemRow> = {}): PublishedPoemRow {
  return {
    id: "lamplight-late-november",
    title: "Lamplight, Late November",
    stanzas: [
      ["The desk keeps its own small weather,", "a lamp the size of a held breath,"],
      ["We do not write to be found.", "We write to leave the light on"],
    ],
    excerpt: "The desk keeps its own small weather,\na lamp the size of a held breath,",
    status: "PUBLISHED",
    featured: true,
    tags: ["Solitude", "Night"],
    year: "2023",
    linesCount: 4,
    readTime: "1 min",
    note: "Written on a rainy Thursday at midnight.",
    lineNotes: { 2: { count: 86, excerpt: "This line made me pause." } },
    sortOrder: 0,
    penName: PEN_NAME,
    collection: PUBLISHED_COLLECTION,
    literaryWorld: { id: "child-of-the-wilderness", name: "Child of the Wilderness" },
    ...overrides,
  };
}

describe("mapPoemRowToUi — published poem with pen name", () => {
  it("maps the core fields from the database row", () => {
    const ui = mapPoemRowToUi(baseRow());
    expect(ui.id).toBe("lamplight-late-november");
    expect(ui.title).toBe("Lamplight, Late November");
    expect(ui.author).toBe("Irshand");
    expect(ui.authorId).toBe("irshand");
    expect(ui.penNameId).toBe("irshand");
    expect(ui.featured).toBe(true);
    expect(ui).not.toHaveProperty("status"); // status is not exposed
  });

  it("preserves stanza boundaries exactly (positional arrays, not from body)", () => {
    const stanzas = [["line one", "line two"], ["stanza two line one"]];
    const ui = mapPoemRowToUi(baseRow({ stanzas }));
    expect(ui.stanzas).toEqual(stanzas);
    expect(ui.stanzas).toHaveLength(2);
    expect(ui.stanzas[0]).toEqual(["line one", "line two"]);
  });

  it("passes through tags, line notes, linesCount, readTime and year", () => {
    const ui = mapPoemRowToUi(baseRow());
    expect(ui.tags).toEqual(["Solitude", "Night"]);
    expect(ui.linesCount).toBe(4);
    expect(ui.readTime).toBe("1 min");
    expect(ui.year).toBe("2023");
    expect(ui.note).toContain("rainy Thursday");
    expect(ui.lineNotes).toEqual({ 2: { count: 86, excerpt: "This line made me pause." } });
  });
});

describe("mapPoemRowToUi — collection handling", () => {
  it("exposes a PUBLISHED collection's id, title and author label", () => {
    const ui = mapPoemRowToUi(baseRow());
    expect(ui.collectionId).toBe("the-quiet-hour");
    expect(ui.collection).toBe("The Quiet Hour");
    expect(ui.collectionAuthor).toBe("Irshand");
  });

  it("maps a null collection without errors or invented values", () => {
    const ui = mapPoemRowToUi(baseRow({ collection: null }));
    // "" marks intentionally unassigned (PoemCore requires strings); the UI
    // guards on collectionId, so no title is ever fabricated.
    expect(ui.collectionId).toBe("");
    expect(ui.collection).toBe("");
    expect(ui.collectionAuthor).toBeNull();
    // Poem itself remains fully readable.
    expect(ui.id).toBe("lamplight-late-november");
    expect(ui.stanzas.length).toBeGreaterThan(0);
  });

  it("does NOT expose a DRAFT collection through the public mapping", () => {
    const ui = mapPoemRowToUi(baseRow({ collection: DRAFT_COLLECTION }));
    expect(ui.collectionId).toBe("");
    expect(ui.collection).toBe("");
    expect(ui.collectionAuthor).toBeNull();
  });

  it("preserves the collaborative attribution from the collection author label", () => {
    const collaborative = {
      ...PUBLISHED_COLLECTION,
      author: { name: "Irshand & InkbyNur" },
    };
    const ui = mapPoemRowToUi(baseRow({ collection: collaborative }));
    expect(ui.collectionAuthor).toBe("Irshand & InkbyNur");
    // The poem's own byline remains the pen name, unchanged.
    expect(ui.author).toBe("Irshand");
  });
});

describe("mapPoemRowToUi — literary world and publication date", () => {
  it("maps the literary world when present", () => {
    const ui = mapPoemRowToUi(baseRow());
    expect(ui.literaryWorldId).toBe("child-of-the-wilderness");
    expect(ui.literaryWorldName).toBe("Child of the Wilderness");
  });

  it("maps a missing literary world as undefined/null", () => {
    const ui = mapPoemRowToUi(baseRow({ literaryWorld: null }));
    expect(ui.literaryWorldId).toBeUndefined();
    expect(ui.literaryWorldName).toBeNull();
  });

  it("never fabricates a publication date", () => {
    const ui = mapPoemRowToUi(baseRow());
    expect(ui).not.toHaveProperty("publishedAt");
  });
});

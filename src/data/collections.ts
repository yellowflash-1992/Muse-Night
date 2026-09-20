import bookQuietHour from "@/assets/book-quiet-hour.jpg";
import bookUnsentFriend from "@/assets/book-unsent-friend.jpg";

export interface Collection {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  authorId: string;
  year: string;
  poemsCount: number;
  coverImage?: string;
  description: string;
  foreword: string;
  featuredQuote: string;
  poemIds: string[];
  tags: string[];
}

export const COLLECTIONS: Collection[] = [
  {
    id: "the-quiet-hour",
    title: "The Quiet Hour",
    subtitle: "Poems of Interior Life and Winter Solitude",
    author: "Irshand",
    authorId: "muhammad-abdulnasir",
    year: "2023",
    poemsCount: 18,
    coverImage: bookQuietHour,
    description:
      "A luminous suite of eighteen poems written across two northern winters. Irshand charts the secret geographies of tea rooms, solitary desks, and the slow accumulation of domestic quiet.",
    foreword:
      "These poems were born in silence. When everything outside was loud and fast, I chose to sit with the lamp until the noise softened into rhythm. This book is for the sleepless and the observant.",
    featuredQuote:
      "There is a clock in every room that only the lonely can hear, and it ticks in the direction of morning.",
    poemIds: ["lamplight-late-november", "the-quiet-hour", "the-winter-ledger"],
    tags: ["Winter", "Solitude", "Household", "Memory"],
  },
  {
    id: "letters-to-an-unsent-friend",
    title: "Letters to an Unsent Friend",
    subtitle: "Epistles from Harbors, Night Ferries, and Cold Trains",
    author: "InkbyNur",
    authorId: "nurudeen-abdullah",
    year: "2024",
    poemsCount: 22,
    coverImage: bookUnsentFriend,
    description:
      "A poetic cycle addressed to an unnamed recipient across oceans, borders, and years. InkbyNur explores the tension between utterance and silence, travel and longing.",
    foreword:
      "Every letter here was written with ink that could not be mailed. To publish them is not to send them, but to release them into the open weather where anyone may pick them up.",
    featuredQuote:
      "I have written you a hundred times and kept every letter, the way one keeps a candle one has not yet blown out.",
    poemIds: [
      "salt-for-the-wounded-season",
      "letters-to-an-unsent-friend",
      "cartography-of-longing",
      "night-ferry-to-lisbon",
    ],
    tags: ["Letters", "Friendship", "Travel", "Distance"],
  },
  {
    id: "a-field-guide-to-small-wonders",
    title: "A Field Guide to Small Wonders",
    subtitle: "Collaborative Epigrams and Observational Verse",
    author: "Irshand & InkbyNur",
    authorId: "muhammad-abdulnasir",
    year: "2024",
    poemsCount: 24,
    description:
      "A shared conversational notebook written between the far wilderness and open correspondence. Irshand and InkbyNur trade stanzas on the overlooked minutiae of everyday life.",
    foreword:
      "We kept this journal on a shared wooden table whenever our travels crossed. One wrote a line in the morning; the other answered by candlelight before sleep.",
    featuredQuote:
      "You do not need a telescope to see heaven. You only need to look at what you have stepped over.",
    poemIds: ["a-field-guide-to-small-wonders", "the-winter-ledger"],
    tags: ["Nature", "Wonder", "Field Guide", "Conversation"],
  },
  {
    id: "the-winter-ledger",
    title: "The Winter Ledger",
    subtitle: "Verses on Frugality, Cold Light, and Time",
    author: "Irshand",
    authorId: "muhammad-abdulnasir",
    year: "2024",
    poemsCount: 14,
    description:
      "A concise sequence of meditations on seasonal endurance, accounting for what is lost and preserved through long winter nights.",
    foreword: "Winter asks what we truly require. These poems are inventory sheets for the soul.",
    featuredQuote:
      "The frost is an honest accountant. It strikes through all superfluity, leaving only the branch, the stone, the root.",
    poemIds: ["the-winter-ledger", "lamplight-late-november"],
    tags: ["Winter", "Ledger", "Cold", "Reflection"],
  },
  {
    id: "irshand-verses",
    title: "Irshand Verses",
    subtitle: "Poems from the Wilderness",
    author: "Irshand",
    authorId: "muhammad-abdulnasir",
    year: "2025",
    poemsCount: 1,
    description: "A single poem that reminds us the heart finds its way home.",
    foreword: "This verse came quietly, like a kite crossing the sky between seasons.",
    featuredQuote: "Fortune has found its way home to rahmat.",
    poemIds: ["the-wondering-kite"],
    tags: ["Wilderness", "Kite", "Homecoming", "Poem"],
  },
];

export function getCollectionById(id: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.id === id);
}

import bookQuietHour from "@/assets/book-quiet-hour.jpg";
import bookUnsentFriend from "@/assets/book-unsent-friend.jpg";

export interface Chapbook {
  id: string;
  title: string;
  author: string;
  authorId: string;
  price: string;
  pages: number;
  edition: string;
  binding: string;
  paper: string;
  dimensions: string;
  coverImage: string;
  description: string;
  quote: string;
  tableOfContents: string[];
  inStock: boolean;
  year: string;
  tags: string[];
  printRun: string;
  proofNotes: string;
}

export const CHAPBOOKS: Chapbook[] = [
  {
    id: "the-quiet-hour-chapbook",
    title: "The Quiet Hour",
    author: "Irshand",
    authorId: "muhammad-abdulnasir",
    price: "£18.00",
    pages: 44,
    edition: "First Edition — 150 Hand-Numbered Copies",
    binding: "Smyth-sewn with Irish linen thread",
    paper: "120gsm Zerkall deckle-edge mould-made paper",
    dimensions: "148 × 210 mm (A5)",
    coverImage: bookQuietHour,
    description:
      "Hand-set in 12pt Monotype Bembo on an 1890s Albion press. Covered in deep indigo Japanese bookcloth with blind-embossed typography.",
    quote:
      "There is a clock in every room that only the lonely can hear, and it ticks in the direction of morning.",
    tableOfContents: [
      "I. The Desk at Dusk",
      "II. Lamplight, Late November",
      "III. The Quiet Hour",
      "IV. The Architecture of Silence",
      "V. Tea Leaves & Cold Linen",
      "VI. The Winter Ledger",
    ],
    inStock: true,
    year: "2023",
    tags: ["Winter", "Household", "Solitude", "Desk"],
    printRun: "First Edition — 150 Hand-Numbered Copies",
    proofNotes:
      "Printed in a small winter run, the chapbook gathers poems of the interior hour and the domestic lamp.",
  },
  {
    id: "letters-to-an-unsent-friend-chapbook",
    title: "Letters to an Unsent Friend",
    author: "InkbyNur",
    authorId: "nurudeen-abdullah",
    price: "£18.00",
    pages: 48,
    edition: "First Edition — 150 Hand-Numbered Copies",
    binding: "Japanese side-stab binding with navy silk cord",
    paper: "135gsm Hahnemühle Ingres laid paper",
    dimensions: "140 × 200 mm",
    coverImage: bookUnsentFriend,
    description:
      "Printed by hand from metal type. Features fold-out letterpress maps and hand-torn deckled fore-edges, enclosed in a slate-grey letterpress dustjacket.",
    quote:
      "I have written you a hundred times and kept every letter, the way one keeps a candle one has not yet blown out.",
    tableOfContents: [
      "I. Departure by Night Ferry",
      "II. Salt for the Wounded Season",
      "III. Letters to an Unsent Friend",
      "IV. Cartography of Longing",
      "V. The Harbor Lantern",
      "VI. Night Ferry to Lisbon",
    ],
    inStock: true,
    year: "2024",
    tags: ["Letters", "Friendship", "Distance", "Travel"],
    printRun: "First Edition — 150 Hand-Numbered Copies",
    proofNotes:
      "Fold-out correspondence fragments, ocean light, and letterpress marks gather around an absent friend.",
  },
];

export function getChapbookById(id: string): Chapbook | undefined {
  return CHAPBOOKS.find((b) => b.id === id);
}

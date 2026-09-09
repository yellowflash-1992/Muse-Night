import bookQuietHour from "@/assets/book-quiet-hour.jpg";
import bookUnsentFriend from "@/assets/book-unsent-friend.jpg";

export interface Poem {
  id: string;
  title: string;
  author: string;
  authorId: string;
  collection: string;
  collectionId: string;
  year: string;
  linesCount: number;
  readTime: string;
  tags: string[];
  stanzas: string[][];
  note?: string;
  featured?: boolean;
  lineNotes?: Record<number, { count: number; excerpt: string }>;
}

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

export interface Poet {
  id: string;
  name: string;
  role: string;
  location: string;
  bio: string;
  longBio: string;
  aesthetic: string;
  works: string[];
  legalName?: string;
  penNames?: string[];
  image?: string;
  voices?: { name: string; title: string; description: string }[] | undefined;
}

import poetTheo from "@/assets/poet-theo.jpg";

export const POETS: Record<string, Poet> = {
  "nurudeen-abdullah": {
    id: "nurudeen-abdullah",
    name: "Raji Nurudeen Olawale",
    role: "Poet & Correspondent",
    location: "A voice in correspondence",
    bio: "InkbyNur is the literary voice of Raji Nurudeen Olawale, a writer, author, and poet. He transforms thoughts, emotions, and life experiences into words that linger. His work explores love, faith, life, growth, and the beauty of being human. With every line, he gives voice to feelings often left unspoken. He writes to inspire hearts, stir minds, and leave lasting impressions. InkbyNur is where words breathe, emotions speak, and stories live.",
    longBio:
      "Raji Nurudeen Olawale is a poet, correspondent, and observer of feeling. Writing as InkbyNur, he transforms thoughts, emotions, and life experiences into words that linger. His work explores love, faith, life, growth, and the beauty of being human. Through letters, brief meditations, and restrained lines, he gives voice to feelings often left unspoken and leaves lasting impressions on every reader. InkbyNur is where words breathe, emotions speak, and stories live.",
    aesthetic: "Intimate correspondence, reflective prose, friendship, and night writing",
    works: ["InkbyNur"],
    legalName: "Raji Nurudeen Olawale",
    penNames: ["InkbyNur"],
    image: poetTheo,
  },

  "muhammad-abdulnasir": {
    id: "muhammad-abdulnasir",
    name: "Muhammad AbdulNasir",
    role: "Poet & Child of the Wilderness",
    location: "The far wilderness",
    bio: "Irshand is the literary voice of Muhammad AbdulNasir, a poet and observer of the natural world. He transforms the silence of wilderness into words that linger in the soul. His work explores spiritual inquiry, ecological attention, and the luminous discipline of attentive seeing. With every line, he gives voice to the threshold moments where uncertainty meets faith. He writes to inspire contemplation, stir minds, and leave lasting impressions. Irshand is where words breathe, the wilderness speaks, and stories live.",
    longBio:
      "Muhammad AbdulNasir is a poet and observer of the natural world. Writing as Irshand, he transforms the silence of wilderness into words that linger in the soul. His work explores spiritual inquiry, ecological attention, and the luminous discipline of attentive seeing. Through open forms and threshold meditations, he gives voice to the moments where uncertainty meets faith and leaves lasting impressions on every reader. Irshand is where words breathe, the wilderness speaks, and stories live.",
    aesthetic: "Wilderness lyric, spiritual inquiry, threshold states, and luminous solitude",
    works: ["irshand", "SEREIN-SERENE", "APORIA", "WANDERA", "ELYON"],
    legalName: "Muhammad AbdulNasir",
    penNames: ["irshand", "serein-serene", "aporia", "wandera", "elyon"],
    image: poetTheo,
    voices: [
      {
        name: "SEREIN-SERENE",
        title: "The Twilight",
        description: "Rain from a cloudless sky; peaceful and melancholic.",
      },
      {
        name: "APORIA",
        title: "The Logic-Puzzle",
        description: "Where the programmer meets the philosopher in deadlock.",
      },
      {
        name: "WANDERA",
        title: "The Nomad",
        description: "The restless spirit searching the outskirts.",
      },
      {
        name: "ELYON",
        title: "The Ethereal",
        description: "The voice looking down from the highest peaks.",
      },
    ],
  },
};

export const POEMS: Poem[] = [
  {
    id: "lamplight-late-november",
    title: "Lamplight, Late November",
    author: "Irshand",
    authorId: "muhammad-abdulnasir",
    collection: "The Quiet Hour",
    collectionId: "the-quiet-hour",
    year: "2023",
    linesCount: 14,
    readTime: "1 min",
    tags: ["Solitude", "Night", "Writing", "Winter"],
    featured: true,
    stanzas: [
      [
        "The desk keeps its own small weather,",
        "a lamp the size of a held breath,",
        "and the room folds its corners down",
        "until the only honest thing",
        "is the page turning, slow as snow",
        "in a window no one minds.",
      ],
      [
        "We do not write to be found.",
        "We write to leave the light on",
        "for whoever passes at midnight",
        "and wonders, briefly, at the glow.",
      ],
      [
        "Let the cold keep the pavement.",
        "Here, where paper drinks ink like tea,",
        "the hour is unbroken,",
        "and the silence knows our name.",
      ],
    ],
    note: "Written on a rainy Thursday at midnight during the first winter freeze in Edinburgh.",
    lineNotes: {
      2: {
        count: 86,
        excerpt: "This line made me pause. I read it three times and still felt the room fold.",
      },
    },
  },
  {
    id: "salt-for-the-wounded-season",
    title: "Salt for the Wounded Season",
    author: "InkbyNur",
    authorId: "nurudeen-abdullah",
    collection: "Letters to an Unsent Friend",
    collectionId: "letters-to-an-unsent-friend",
    year: "2024",
    linesCount: 18,
    readTime: "2 min",
    tags: ["Memory", "Distance", "Winter", "Sea"],
    stanzas: [
      [
        "The shoreline forgets its borders by December.",
        "Tides bring in rusted keys and driftwood bones,",
        "and I think of the letters that arrived too late",
        "to tell you that the ice had melted.",
      ],
      [
        "There is a kind of preservation in silence,",
        "the way salt cures the cod on Atlantic racks,",
        "keeping the flesh from yielding to decay",
        "while asking for nothing in return.",
      ],
      [
        "If you walk north tonight, look for the lantern",
        "swinging on the harbor buoy.",
        "It blinks once for what was given,",
        "and twice for what we could not bear to keep.",
      ],
    ],
    note: "Dedicated to the coastal towns along the Swedish west coast where winters settle deep in the marrow.",
  },
  {
    id: "the-quiet-hour",
    title: "The Quiet Hour",
    author: "Irshand",
    authorId: "muhammad-abdulnasir",
    collection: "The Quiet Hour",
    collectionId: "the-quiet-hour",
    year: "2023",
    linesCount: 16,
    readTime: "1.5 min",
    tags: ["Solitude", "Time", "Memory"],
    stanzas: [
      [
        "There is a clock in every room",
        "that only the lonely can hear,",
        "and it ticks in the direction of morning",
        "with an unbearable patience.",
      ],
      [
        "The tea cools in its ceramic cup.",
        "The shadows lean against the wainscot.",
        "Everything that mattered in daylight",
        "has now become small and tender.",
      ],
      [
        "Listen: the floorboards settle.",
        "The streetlamp hums its yellow tune.",
        "This is the hour between breathing in",
        "and deciding to begin again.",
      ],
    ],
    note: "Title poem of the collection published in November 2023.",
  },
  {
    id: "letters-to-an-unsent-friend",
    title: "Letters to an Unsent Friend",
    author: "InkbyNur",
    authorId: "nurudeen-abdullah",
    collection: "Letters to an Unsent Friend",
    collectionId: "letters-to-an-unsent-friend",
    year: "2024",
    linesCount: 20,
    readTime: "2 min",
    tags: ["Letters", "Friendship", "Longing"],
    stanzas: [
      [
        "I have written you a hundred times",
        "and kept every letter in the bottom drawer,",
        "the way one keeps a candle",
        "one has not yet blown out.",
      ],
      [
        "In the first, I wrote of train departures at dusk.",
        "In the tenth, I described the smell of wet cedar.",
        "By the fiftieth, I had stopped asking questions",
        "and started cataloging the things you would have loved:",
      ],
      [
        "A stray dog asleep by the bookstall,",
        "the second cup of coffee drunk cold,",
        "the sudden kindness of an archivist in Galway",
        "who gave me three minutes past closing time.",
      ],
      ["These pages are not monuments.", "They are just breath held in envelope form."],
    ],
  },
  {
    id: "a-field-guide-to-small-wonders",
    title: "A Field Guide to Small Wonders",
    author: "Irshand",
    authorId: "muhammad-abdulnasir",
    collection: "A Field Guide to Small Wonders",
    collectionId: "a-field-guide-to-small-wonders",
    year: "2024",
    linesCount: 15,
    readTime: "1.5 min",
    tags: ["Nature", "Wonder", "Everyday"],
    stanzas: [
      [
        "Item one: the moth resting upon a spine of Dante.",
        "Item two: the exact angle at four in the afternoon",
        "when sunlight cuts gold across a kitchen floor.",
      ],
      [
        "Item three: the phrase forgotten mid-sentence",
        "that wanders into the room hours later",
        "like an apology no longer necessary.",
      ],
      [
        "You do not need a telescope to see heaven.",
        "You only need to look at what you have stepped over",
        "on your way to becoming someone important.",
      ],
    ],
  },
  {
    id: "cartography-of-longing",
    title: "Cartography of Longing",
    author: "InkbyNur",
    authorId: "nurudeen-abdullah",
    collection: "Letters to an Unsent Friend",
    collectionId: "letters-to-an-unsent-friend",
    year: "2024",
    linesCount: 16,
    readTime: "1.5 min",
    tags: ["Maps", "Travel", "Distance"],
    stanzas: [
      [
        "Fold the map along the blue river line.",
        "Notice how two towns twenty miles apart",
        "now press their paper lips together.",
      ],
      [
        "If distance were only geometry,",
        "we could cross it with a compass and ruler.",
        "Instead it is made of railway schedules,",
        "missed calls, and the stubborn habit of waiting.",
      ],
      ["I draw a circle around your harbor.", "I leave the rest of the continent blank."],
    ],
  },
  {
    id: "the-winter-ledger",
    title: "The Winter Ledger",
    author: "Irshand",
    authorId: "muhammad-abdulnasir",
    collection: "The Winter Ledger",
    collectionId: "the-winter-ledger",
    year: "2024",
    linesCount: 18,
    readTime: "2 min",
    tags: ["Winter", "Time", "Reflection"],
    stanzas: [
      [
        "What remains after the harvest:",
        "three jars of apricot preserves,",
        "two notebooks half-filled with verse,",
        "and the quiet understanding that some days are merely for enduring.",
      ],
      [
        "The frost is an honest accountant.",
        "It strikes through all superfluity,",
        "leaving only the branch, the stone, the root.",
      ],
      [
        "Enter these in the ledger under profit:",
        "the hour you spent watching sparrows,",
        "the tea you shared without speaking,",
        "and the warmth returning slowly to your fingers.",
      ],
    ],
  },
  {
    id: "night-ferry-to-lisbon",
    title: "Night Ferry to Lisbon",
    author: "InkbyNur",
    authorId: "nurudeen-abdullah",
    collection: "Letters to an Unsent Friend",
    collectionId: "letters-to-an-unsent-friend",
    year: "2024",
    linesCount: 15,
    readTime: "1.5 min",
    tags: ["Night", "Travel", "Sea"],
    stanzas: [
      [
        "The diesel engine beats like an old heart beneath the deck.",
        "Fog swallows the red beacon of the shore.",
        "Everyone aboard is going somewhere they were once loved.",
      ],
      [
        "The water in the wake is luminous and dark,",
        "churned up by propellers into phosphorescent lace.",
        "I lean over the railing with my notebook",
        "and let the spray wet the edges of my words.",
      ],
    ],
  },
];

export const LIBRARY_POEMS: Poem[] = [
  ...POEMS,
  {
    id: "under-the-first-green",
    title: "Under the First Green",
    author: "irshand",
    authorId: "muhammad-abdulnasir",
    collection: "Child of the Wilderness",
    collectionId: "child-of-the-wilderness",
    year: "2025",
    linesCount: 12,
    readTime: "1 min",
    tags: ["Nature", "Belonging", "Dawn"],
    stanzas: [
      [
        "I learned my first alphabet from leaves,",
        "each vein a road returning to the root.",
        "The forest did not ask me to arrive,",
        "only to listen until I knew my name.",
      ],
      ["Now every morning opens like a hand,", "and I walk softly into what is green."],
    ],
    note: "Placeholder work for the irshand signature.",
  },
  {
    id: "wandera-field-notes",
    title: "Wandera: Field Notes",
    author: "wander",
    authorId: "muhammad-abdulnasir",
    collection: "Child of the Wilderness",
    collectionId: "child-of-the-wilderness",
    year: "2025",
    linesCount: 13,
    readTime: "1 min",
    tags: ["Wandering", "Roads", "Wonder"],
    stanzas: [
      [
        "I carry no compass, only the patience",
        "of a road that keeps changing its mind.",
        "At dusk, the far hill becomes a question",
        "I am willing to spend my life answering.",
      ],
      ["Call me by the name the wind invents.", "I will turn, eventually."],
    ],
    note: "Placeholder work for the wander signature.",
  },
  {
    id: "aporia-at-the-threshold",
    title: "Aporia at the Threshold",
    author: "aporia",
    authorId: "muhammad-abdulnasir",
    collection: "Child of the Wilderness",
    collectionId: "child-of-the-wilderness",
    year: "2025",
    linesCount: 14,
    readTime: "1.5 min",
    tags: ["Uncertainty", "Faith", "Thresholds"],
    stanzas: [
      [
        "The door is open, but the room is not,",
        "and every answer leaves a sharper shape.",
        "I stand between the almost and the never,",
        "keeping company with the honest doubt.",
      ],
      ["Some paths become clear by walking them.", "Some truths require the dark to speak."],
    ],
    note: "Placeholder work for the aporia signature.",
  },
  {
    id: "serein-after-rain",
    title: "Serein After Rain",
    author: "serein",
    authorId: "muhammad-abdulnasir",
    collection: "Child of the Wilderness",
    collectionId: "child-of-the-wilderness",
    year: "2025",
    linesCount: 12,
    readTime: "1 min",
    tags: ["Calm", "Rain", "Silence"],
    stanzas: [
      [
        "After the rain, the garden says less.",
        "Water gathers every scattered color,",
        "and the earth, released from its confession,",
        "rests beneath a softer kind of sky.",
      ],
      ["I call this peace by its older name:", "the moment nothing needs to be proved."],
    ],
    note: "Placeholder work for the serein signature.",
  },
  {
    id: "elyon-the-high-place",
    title: "Elyon, the High Place",
    author: "elyon",
    authorId: "muhammad-abdulnasir",
    collection: "Child of the Wilderness",
    collectionId: "child-of-the-wilderness",
    year: "2025",
    linesCount: 12,
    readTime: "1 min",
    tags: ["Ascent", "Light", "Prayer"],
    stanzas: [
      [
        "Above the tree line, the silence widens.",
        "No crown waits there, no witness, no applause,",
        "only the long blue patience of the mountain",
        "and a light that does not need a name.",
      ],
      ["I climb until the heart grows spacious", "enough to hold the world without possession."],
    ],
    note: "Placeholder work for the elyon signature.",
  },
  {
    id: "the-wondering-kite",
    title: "The Wondering Kite",
    author: "irshand",
    authorId: "muhammad-abdulnasir",
    collection: "Child of the Wilderness",
    collectionId: "child-of-the-wilderness",
    year: "2025",
    linesCount: 12,
    readTime: "1 min",
    tags: ["Wonder", "Playfulness", "Homecoming"],
    stanzas: [
      [
        "The wondering kite flew 🪁",
        "Playfully under the day;",
        "Never a something new",
        "From summer till May.",
      ],
      [
        "The late-night slept",
        "Silently through the rain,",
        "Till there's nothing left",
        "For the gutters to drain.",
      ],
      [
        "Maybe it's the sound",
        "From a lovely heart,",
        "But fortune has found",
        "Its way home to rahmat.",
      ],
    ],
  },
  {
    id: "inkbynur-between-letters",
    title: "Between Letters",
    author: "InkbyNur",
    authorId: "nurudeen-abdullah",
    collection: "Letters Kept Open",
    collectionId: "letters-kept-open",
    year: "2025",
    linesCount: 12,
    readTime: "1 min",
    tags: ["Friendship", "Letters", "Memory"],
    stanzas: [
      [
        "There are words we send and words we save,",
        "small birds folded into the desk drawer.",
        "Between them lives the truest conversation:",
        "the pause that knows what speech would bruise.",
      ],
      ["Write when the heart is ready.", "Read when the room is kind."],
    ],
    note: "Placeholder work for the InkbyNur archive.",
  },
];

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

export function getPoemById(id: string): Poem | undefined {
  return POEMS.find((p) => p.id === id);
}

export function getLibraryPoemById(id: string): Poem | undefined {
  return [...POEMS, ...LIBRARY_POEMS].find((p) => p.id === id);
}

export function getCollectionById(id: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.id === id);
}

export function getChapbookById(id: string): Chapbook | undefined {
  return CHAPBOOKS.find((b) => b.id === id);
}

export function getPoetById(id: string): Poet | undefined {
  return POETS[id];
}

/**
 * Core literary data &mdash; asset-free, database-ready.
 *
 * This module contains ONLY literary metadata needed for:
 * - Database migrations (importer)
 * - Server-side rendering
 * - Validation logic
 *
 * It MUST NOT import any frontend assets (.jpg, .png, .webp, .svg, etc.).
 * Image assets are attached at the presentation layer in the UI modules.
 */

// ============================================================
// PERSON (author identity &mdash; no images)
// ============================================================

export interface Person {
  id: string;
  legalName: string;
  role: string;
  bio: string;
  longBio: string;
  aesthetic: string;
  // image is intentionally omitted &mdash; added at presentation layer
}

export const PEOPLE: Record<string, Person> = {
  "nurudeen-abdullah": {
    id: "nurudeen-abdullah",
    legalName: "Raji Nurudeen Olawale",
    role: "Poet & Correspondent",
    bio: "Raji Nurudeen Olawale is a poet, correspondent, and observer of feeling. Writing as InkbyNur, he transforms thoughts, emotions, and life experiences into words that linger. His work explores love, faith, life, growth, and the beauty of being human. Through letters, brief meditations, and restrained lines, he gives voice to feelings often left unspoken and leaves lasting impressions on every reader. InkbyNur is where words breathe, emotions speak, and stories live.",
    longBio:
      "InkbyNur is the literary voice of Raji Nurudeen Olawale, a writer, author, and poet. He transforms thoughts, emotions, and life experiences into words that linger. His work explores love, faith, life, growth, and the beauty of being human. With every line, he gives voice to feelings often left unspoken. He writes to inspire hearts, stir minds, and leave lasting impressions. InkbyNur is where words breathe, emotions speak, and stories live.",
    aesthetic: "Intimate correspondence, reflective prose, friendship, and night writing",
  },
  "muhammad-abdulnasir": {
    id: "muhammad-abdulnasir",
    legalName: "Muhammad AbdulNasir",
    role: "Poet & Literary Voice",
    bio: "For Muhammad AbdulNasir, writing as Irshand, rigorous observation becomes a luminous art.\nAttuned to the earth's rhythms, he turns the wilderness's resonant hush into verse that settles deep within.\nHis work weaves metaphysical longing with ecological awareness, zeroing in on life's most fleeting instants.\nHe writes to spark introspection, break inertia, and craft impressions that outlast time.\nIrshand is a living sanctuary&mdash;not merely a name.\nThere, language breathes, the landscape speaks its own biography, and stories pulse with enduring life.",
    longBio:
      "Muhammad AbdulNasir is a poet and observer of the natural world. Writing as Irshand, he transforms the silence of wilderness into words that linger in the soul. The name grew from an earlier signature, Iris-hand, and the root of Irshad&mdash;an evolving mark that eventually found its own voice as Irshand. His work moves through spiritual inquiry, ecological attention, uncertainty, faith, and the quiet discipline of attentive seeing. Through open forms and threshold meditations, he gives language to moments where the inner and natural worlds meet. Irshand is where words breathe, the wilderness speaks, and stories live.",
    aesthetic: "Wilderness lyric, spiritual inquiry, threshold states, and luminous solitude",
  },
};

export function getPersonById(id: string): Person | undefined {
  return PEOPLE[id];
}

// ============================================================
// LITERARY WORLDS
// ============================================================

export interface LiteraryWorld {
  id: string;
  name: string;
  authorId: string;
  description: string;
  penNameIds: string[];
}

export const LITERARY_WORLDS: Record<string, LiteraryWorld> = {
  "child-of-the-wilderness": {
    id: "child-of-the-wilderness",
    name: "Child of the Wilderness",
    authorId: "muhammad-abdulnasir",
    description:
      "A literary sanctuary where language breathes, the landscape speaks its own biography, and stories pulse with enduring life.",
    penNameIds: ["irshand", "aporia", "serein", "elyon", "wandera"],
  },
};

export function getLiteraryWorldById(id: string): LiteraryWorld | undefined {
  return LITERARY_WORLDS[id];
}

// ============================================================
// PEN NAMES
// ============================================================

export interface PenName {
  id: string;
  name: string;
  personId: string;
  title?: string;
  description?: string;
  literaryIdentity?: string;
  isPrimary?: boolean;
}

const primaryPenNameByPersonId: Record<string, string> = {
  "muhammad-abdulnasir": "irshand",
  "nurudeen-abdullah": "inkbynur",
};

const worksByPersonId: Record<string, string[]> = {
  "muhammad-abdulnasir": ["irshand", "SEREIN-SERENE", "APORIA", "WANDERA", "ELYON"],
  "nurudeen-abdullah": ["InkbyNur"],
};

export const PEN_NAMES: Record<string, PenName> = {
  irshand: {
    id: "irshand",
    name: "Irshand",
    personId: "muhammad-abdulnasir",
    literaryIdentity: "Child of the Wilderness",
    isPrimary: true,
  },
  aporia: {
    id: "aporia",
    name: "Aporia",
    personId: "muhammad-abdulnasir",
    title: "The Logic-Puzzle",
    description: "Where the programmer meets the philosopher in deadlock.",
    literaryIdentity: "Child of the Wilderness",
  },
  serein: {
    id: "serein",
    name: "Serein",
    personId: "muhammad-abdulnasir",
    title: "The Twilight",
    description: "Rain from a cloudless sky; peaceful and melancholic.",
    literaryIdentity: "Child of the Wilderness",
  },
  elyon: {
    id: "elyon",
    name: "Elyon",
    personId: "muhammad-abdulnasir",
    title: "The Ethereal",
    description: "The voice looking down from the highest peaks.",
    literaryIdentity: "Child of the Wilderness",
  },
  wandera: {
    id: "wandera",
    name: "Wandera",
    personId: "muhammad-abdulnasir",
    title: "The Nomad",
    description: "The restless spirit searching the outskirts.",
    literaryIdentity: "Child of the Wilderness",
  },
  inkbynur: {
    id: "inkbynur",
    name: "InkbyNur",
    personId: "nurudeen-abdullah",
    isPrimary: true,
  },
};

const getPenNamesForPerson = (personId: string) =>
  Object.values(PEN_NAMES)
    .filter((penName) => penName.personId === personId)
    .map((penName) => penName.name);

// POETS combines person + pen name data for presentation layer
// This is a derived view &mdash; the importer doesn't need it
export interface Poet {
  id: string;
  legalName: string;
  role: string;
  bio: string;
  longBio: string;
  aesthetic: string;
  penName: string;
  works: string[];
  penNames: string[];
  literaryIdentity?: string;
  voices?: PenName[];
}

export const POETS: Record<string, Poet> = Object.fromEntries(
  Object.values(PEOPLE).map((person) => {
    const primaryPenName = Object.values(PEN_NAMES).find(
      (penName) =>
        penName.personId === person.id && penName.id === primaryPenNameByPersonId[person.id],
    );
    const literaryWorld = Object.values(LITERARY_WORLDS).find(
      (world) => world.authorId === person.id,
    );

    const voices = literaryWorld
      ? literaryWorld.penNameIds
          .map((penNameId) => PEN_NAMES[penNameId])
          .filter((penName): penName is PenName => penName !== undefined)
      : undefined;

    return [
      person.id,
      {
        ...person,
        penName: primaryPenName?.name ?? person.legalName,
        works: worksByPersonId[person.id] ?? [],
        penNames: getPenNamesForPerson(person.id),
        ...(literaryWorld
          ? {
              literaryIdentity: literaryWorld.name,
              ...(voices ? { voices } : {}),
            }
          : {}),
      },
    ];
  }),
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

// ============================================================
// COLLECTIONS (core metadata only &mdash; no cover images)
// ============================================================

export interface CollectionCore {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  authorId: string;
  year: string;
  poemsCount: number;
  // coverImage is intentionally omitted &mdash; added at presentation layer
  description: string;
  foreword: string;
  featuredQuote: string;
  poemIds: string[];
  tags: string[];
}

export const COLLECTIONS_CORE: CollectionCore[] = [
  {
    id: "the-quiet-hour",
    title: "The Quiet Hour",
    subtitle: "Poems of Interior Life and Winter Solitude",
    author: "Irshand",
    authorId: "muhammad-abdulnasir",
    year: "2023",
    poemsCount: 18,
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

export function getCollectionCoreById(id: string): CollectionCore | undefined {
  return COLLECTIONS_CORE.find((c) => c.id === id);
}

// ============================================================
// POEMS
// ============================================================

export interface PoemCore {
  id: string;
  title: string;
  author: string;
  authorId: string;
  penNameId: string;
  collection: string;
  collectionId: string;
  literaryWorldId?: string;
  year: string;
  linesCount: number;
  readTime: string;
  tags: string[];
  form?: string;
  stanzas: string[][];
  note?: string;
  featured?: boolean;
  lineNotes?: Record<number, { count: number; excerpt: string }>;
}

export const POEMS_CORE: PoemCore[] = [
  {
    id: "lamplight-late-november",
    title: "Lamplight, Late November",
    author: "Irshand",
    authorId: "muhammad-abdulnasir",
    penNameId: "irshand",
    collection: "The Quiet Hour",
    collectionId: "the-quiet-hour",
    literaryWorldId: "child-of-the-wilderness",
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
    penNameId: "inkbynur",
    collection: "Letters to an Unsent Friend",
    collectionId: "letters-to-an-unsent-friend",
    year: "2024",
    linesCount: 12,
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
    penNameId: "irshand",
    collection: "The Quiet Hour",
    collectionId: "the-quiet-hour",
    literaryWorldId: "child-of-the-wilderness",
    year: "2023",
    linesCount: 12,
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
    penNameId: "inkbynur",
    collection: "Letters to an Unsent Friend",
    collectionId: "letters-to-an-unsent-friend",
    year: "2024",
    linesCount: 14,
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
    penNameId: "irshand",
    collection: "A Field Guide to Small Wonders",
    collectionId: "a-field-guide-to-small-wonders",
    literaryWorldId: "child-of-the-wilderness",
    year: "2024",
    linesCount: 9,
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
    penNameId: "inkbynur",
    collection: "Letters to an Unsent Friend",
    collectionId: "letters-to-an-unsent-friend",
    year: "2024",
    linesCount: 9,
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
    penNameId: "irshand",
    collection: "The Winter Ledger",
    collectionId: "the-winter-ledger",
    literaryWorldId: "child-of-the-wilderness",
    year: "2024",
    linesCount: 11,
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
    penNameId: "inkbynur",
    collection: "Letters to an Unsent Friend",
    collectionId: "letters-to-an-unsent-friend",
    year: "2024",
    linesCount: 7,
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

// Extended poems for library (includes additional poems not in core POEMS_CORE)
export const LIBRARY_POEMS_CORE: PoemCore[] = [
  ...POEMS_CORE,
  {
    id: "under-the-first-green",
    title: "Under the First Green",
    author: "Irshand",
    authorId: "muhammad-abdulnasir",
    penNameId: "irshand",
    collection: "Child of the Wilderness",
    collectionId: "child-of-the-wilderness",
    literaryWorldId: "child-of-the-wilderness",
    year: "2025",
    linesCount: 6,
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
    author: "Wandera",
    authorId: "muhammad-abdulnasir",
    penNameId: "wandera",
    collection: "Child of the Wilderness",
    collectionId: "child-of-the-wilderness",
    literaryWorldId: "child-of-the-wilderness",
    year: "2025",
    linesCount: 6,
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
    author: "Aporia",
    authorId: "muhammad-abdulnasir",
    penNameId: "aporia",
    collection: "Child of the Wilderness",
    collectionId: "child-of-the-wilderness",
    literaryWorldId: "child-of-the-wilderness",
    year: "2025",
    linesCount: 6,
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
    author: "Serein",
    authorId: "muhammad-abdulnasir",
    penNameId: "serein",
    collection: "Child of the Wilderness",
    collectionId: "child-of-the-wilderness",
    literaryWorldId: "child-of-the-wilderness",
    year: "2025",
    linesCount: 6,
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
    author: "Elyon",
    authorId: "muhammad-abdulnasir",
    penNameId: "elyon",
    collection: "Child of the Wilderness",
    collectionId: "child-of-the-wilderness",
    literaryWorldId: "child-of-the-wilderness",
    year: "2025",
    linesCount: 6,
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
    author: "Irshand",
    authorId: "muhammad-abdulnasir",
    penNameId: "irshand",
    collection: "Child of the Wilderness",
    collectionId: "child-of-the-wilderness",
    literaryWorldId: "child-of-the-wilderness",
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
    penNameId: "inkbynur",
    collection: "Letters Kept Open",
    collectionId: "letters-kept-open",
    year: "2025",
    linesCount: 6,
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
  {
    id: "lamplit-midnight-haiku",
    title: "Midnight Ember (Haiku)",
    author: "Irshand",
    authorId: "muhammad-abdulnasir",
    penNameId: "irshand",
    collection: "A Field Guide to Small Wonders",
    collectionId: "a-field-guide-to-small-wonders",
    literaryWorldId: "child-of-the-wilderness",
    year: "2024",
    linesCount: 3,
    readTime: "30 sec",
    tags: ["Haiku", "Night", "Silence", "Writing"],
    stanzas: [
      ["Single lamp burns low,", "Ink drinks the unsaid quiet,", "Dawn waits at the door."],
    ],
    note: "Traditional 3-line Japanese haiku structure (5-7-5 syllables).",
  },
  {
    id: "coastal-letters-haiku",
    title: "First Frost (Haiku)",
    author: "InkbyNur",
    authorId: "nurudeen-abdullah",
    penNameId: "inkbynur",
    collection: "Letters to an Unsent Friend",
    collectionId: "letters-to-an-unsent-friend",
    year: "2024",
    linesCount: 3,
    readTime: "30 sec",
    tags: ["Haiku", "Winter", "Letters", "Memory"],
    stanzas: [
      [
        "Cold wind through the pines,",
        "Letters waiting in the drawer,",
        "Silence learns your name.",
      ],
    ],
    note: "Traditional 3-line Japanese haiku structure (5-7-5 syllables).",
  },
];

export function getPoemCoreById(id: string): PoemCore | undefined {
  return POEMS_CORE.find((p) => p.id === id);
}

export function getLibraryPoemCoreById(id: string): PoemCore | undefined {
  return LIBRARY_POEMS_CORE.find((p) => p.id === id) ?? POEMS_CORE.find((p) => p.id === id);
}

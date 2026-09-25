import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env["DIRECT_URL"]!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const nurudeen = await prisma.person.upsert({
    where: {
      id: "nurudeen-abdullah",
    },
    update: {
      legalName: "Raji Nurudeen Olawale",
      role: "Poet & Correspondent",
      bio: "Raji Nurudeen Olawale is a poet, correspondent, and observer of feeling. Writing as InkbyNur, he transforms thoughts, emotions, and life experiences into words that linger. His work explores love, faith, life, growth, and the beauty of being human. Through letters, brief meditations, and restrained lines, he gives voice to feelings often left unspoken and leaves lasting impressions on every reader. InkbyNur is where words breathe, emotions speak, and stories live.",
      longBio:
        "InkbyNur is the literary voice of Raji Nurudeen Olawale, a writer, author, and poet. He transforms thoughts, emotions, and life experiences into words that linger. His work explores love, faith, life, growth, and the beauty of being human. With every line, he gives voice to feelings often left unspoken. He writes to inspire hearts, stir minds, and leave lasting impressions. InkbyNur is where words breathe, emotions speak, and stories live.",
      aesthetic: "Intimate correspondence, reflective prose, friendship, and night writing",
      imageUrl: null,
    },
    create: {
      id: "nurudeen-abdullah",
      legalName: "Raji Nurudeen Olawale",
      role: "Poet & Correspondent",
      bio: "Raji Nurudeen Olawale is a poet, correspondent, and observer of feeling. Writing as InkbyNur, he transforms thoughts, emotions, and life experiences into words that linger. His work explores love, faith, life, growth, and the beauty of being human. Through letters, brief meditations, and restrained lines, he gives voice to feelings often left unspoken and leaves lasting impressions on every reader. InkbyNur is where words breathe, emotions speak, and stories live.",
      longBio:
        "InkbyNur is the literary voice of Raji Nurudeen Olawale, a writer, author, and poet. He transforms thoughts, emotions, and life experiences into words that linger. His work explores love, faith, life, growth, and the beauty of being human. With every line, he gives voice to feelings often left unspoken. He writes to inspire hearts, stir minds, and leave lasting impressions. InkbyNur is where words breathe, emotions speak, and stories live.",
      aesthetic: "Intimate correspondence, reflective prose, friendship, and night writing",
      imageUrl: null,
    },
  });

  const abdulnasir = await prisma.person.upsert({
    where: {
      id: "muhammad-abdulnasir",
    },
    update: {
      legalName: "Muhammad AbdulNasir",
      role: "Poet & Child of the Wilderness",
      bio: "For Muhammad AbdulNasir, writing as Irshand, rigorous observation becomes a luminous art. Attuned to the earth's rhythms, he turns the wilderness's resonant hush into verse that settles deep within. His work weaves metaphysical longing with ecological awareness, zeroing in on life's most fleeting instants. He writes to spark introspection, break inertia, and craft impressions that outlast time. Irshand is a living sanctuary—not merely a name. There, language breathes, the landscape speaks its own biography, and stories pulse with enduring life.",
      longBio:
        "Muhammad AbdulNasir is a poet and observer of the natural world. Writing as Irshand, he transforms the silence of wilderness into words that linger in the soul. The name grew from an earlier signature, Iris-hand, and the root of Irshad—an evolving mark that eventually found its own voice as Irshand. His work moves through spiritual inquiry, ecological attention, uncertainty, faith, and the quiet discipline of attentive seeing. Through open forms and threshold meditations, he gives language to moments where the inner and natural worlds meet. Irshand is where words breathe, the wilderness speaks, and stories live.",
      aesthetic: "Wilderness lyric, spiritual inquiry, threshold states, and luminous solitude",
      imageUrl: null,
    },
    create: {
      id: "muhammad-abdulnasir",
      legalName: "Muhammad AbdulNasir",
      role: "Poet & Child of the Wilderness",
      bio: "For Muhammad AbdulNasir, writing as Irshand, rigorous observation becomes a luminous art. Attuned to the earth's rhythms, he turns the wilderness's resonant hush into verse that settles deep within. His work weaves metaphysical longing with ecological awareness, zeroing in on life's most fleeting instants. He writes to spark introspection, break inertia, and craft impressions that outlast time. Irshand is a living sanctuary—not merely a name. There, language breathes, the landscape speaks its own biography, and stories pulse with enduring life.",
      longBio:
        "Muhammad AbdulNasir is a poet and observer of the natural world. Writing as Irshand, he transforms the silence of wilderness into words that linger in the soul. The name grew from an earlier signature, Iris-hand, and the root of Irshad—an evolving mark that eventually found its own voice as Irshand. His work moves through spiritual inquiry, ecological attention, uncertainty, faith, and the quiet discipline of attentive seeing. Through open forms and threshold meditations, he gives language to moments where the inner and natural worlds meet. Irshand is where words breathe, the wilderness speaks, and stories live.",
      aesthetic: "Wilderness lyric, spiritual inquiry, threshold states, and luminous solitude",
      imageUrl: null,
    },
  });

  console.log("Seeded person:", nurudeen.legalName);
  console.log("Seeded person:", abdulnasir.legalName);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

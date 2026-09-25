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
  const person = await prisma.person.upsert({
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

  console.log("Seeded person:", person.legalName);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

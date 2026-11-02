import { prisma } from "@/lib/prisma";
import { resolveDisplayName } from "@/lib/display-name";

export async function getDisplayName(userId: string): Promise<string> {
  const person = await prisma.person.findFirst({
    where: { userId },
    select: {
      penNames: {
        where: { isPrimary: true },
        select: { name: true },
        take: 1,
      },
    },
  });
  const profile = await prisma.memberProfile.findUnique({
    where: { id: userId },
    select: { displayName: true },
  });

  return resolveDisplayName({
    penName: person?.penNames[0]?.name,
    displayName: profile?.displayName,
  });
}

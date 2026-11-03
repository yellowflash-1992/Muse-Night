import { createServerFn } from "@tanstack/react-start";

import { prisma } from "@/lib/prisma";

export interface PublicStudyGuide {
  id: string;
  title: string;
  author: string;
  examBody: string;
  genre: string;
  summary: string;
  themes: string[];
  devices: string[];
  createdAt: Date;
}

export interface StudyGuideDetail extends PublicStudyGuide {
  background: string | null;
  fullAnalysis: string | null;
}

export const getStudyGuideByIdFn = createServerFn({ method: "GET" })
  .validator((id: string) => id)
  .handler(
    async ({ data }): Promise<StudyGuideDetail | null> =>
      prisma.studyGuide.findFirst({
        where: { id: data, status: "PUBLISHED" },
        select: {
          id: true,
          title: true,
          author: true,
          examBody: true,
          genre: true,
          summary: true,
          background: true,
          fullAnalysis: true,
          themes: true,
          devices: true,
          createdAt: true,
        },
      }),
  );

export const getStudyGuidesFn = createServerFn({ method: "GET" }).handler(
  async (): Promise<PublicStudyGuide[]> =>
    prisma.studyGuide.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        author: true,
        examBody: true,
        genre: true,
        summary: true,
        themes: true,
        devices: true,
        createdAt: true,
      },
    }),
);

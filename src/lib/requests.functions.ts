import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireUser } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma";

const createPoemRequestSchema = z.object({
  occasion: z.string().trim().min(1).max(100),
  tone: z.string().trim().min(1).max(100),
  delivery: z.enum(["WhatsApp", "Email"]),
  recipientName: z.string().trim().min(1).max(200),
  contactValue: z.string().trim().min(1).max(320),
  story: z.string().trim().min(1).max(5000),
});

export const createPoemRequestFn = createServerFn({ method: "POST" })
  .validator((input: unknown) => createPoemRequestSchema.parse(input))
  .handler(async ({ data }) => {
    const user = await requireUser();
    return prisma.poemRequest.create({
      data: {
        userId: user.id,
        occasion: data.occasion,
        tone: data.tone,
        delivery: data.delivery,
        recipientName: data.recipientName,
        contactValue: data.contactValue,
        story: data.story,
      },
      select: { id: true },
    });
  });

export interface MyPoemRequest {
  id: string;
  occasion: string;
  tone: string;
  status: string;
  adminResponse: string | null;
  deliveredPoemId: string | null;
  createdAt: Date;
}

export const getMyRequestsFn = createServerFn({ method: "GET" }).handler(
  async (): Promise<MyPoemRequest[]> => {
    const user = await requireUser();
    return prisma.poemRequest.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        occasion: true,
        tone: true,
        status: true,
        adminResponse: true,
        deliveredPoemId: true,
        createdAt: true,
      },
    });
  },
);

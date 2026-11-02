import { createServerFn } from "@tanstack/react-start";

import { prisma } from "@/lib/prisma";

export interface SiteSettings {
  id: string;
  name: string;
  tagline: string;
  about: string;
  contact: string;
  submissionsOpen: boolean;
  updatedAt: Date;
}

export const getSiteSettingsFn = createServerFn({ method: "GET" }).handler(
  async (): Promise<SiteSettings | null> =>
    prisma.siteSettings.findUnique({
      where: { id: "global" },
    }),
);

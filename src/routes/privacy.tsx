import { createFileRoute } from "@tanstack/react-router";

import { PrivacyPage } from "@/features/legal/PrivacyPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Muse Night" },
      { name: "description", content: "Learn how Muse Night collects and uses your information." },
    ],
  }),
  component: PrivacyPage,
});

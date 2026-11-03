import { createFileRoute } from "@tanstack/react-router";

import { TermsPage } from "@/features/legal/TermsPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Muse Night" },
      { name: "description", content: "Terms for using Muse Night and submitting work." },
    ],
  }),
  component: TermsPage,
});

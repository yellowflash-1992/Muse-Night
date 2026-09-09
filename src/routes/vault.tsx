import { createFileRoute } from "@tanstack/react-router";

import { VaultPage } from "@/features/vault/VaultPage";

export const Route = createFileRoute("/vault")({
  head: () => ({
    meta: [
      { title: "Your Vault — Muse Books" },
      {
        name: "description",
        content:
          "Your personal collection of saved poems.",
      },
    ],
  }),
  component: VaultPage,
});

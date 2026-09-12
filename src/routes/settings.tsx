import { createFileRoute } from "@tanstack/react-router";

import { SettingsPage } from "@/features/settings/SettingsPage";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Patron Profile & Pen Name — Muse Books" },
      {
        name: "description",
        content:
          "Manage your literary pen name, patron identity, and reader settings at Muse Books.",
      },
    ],
  }),
  component: SettingsPage,
});

import { createFileRoute } from "@tanstack/react-router";

import { RequestPage } from "@/features/requests/RequestPage";

export const Route = createFileRoute("/request")({
  head: () => ({
    meta: [
      { title: "Request a Poem — Muse Books" },
      {
        name: "description",
        content:
          "Commission an original handwritten poem for any occasion. Delivered to your WhatsApp or email within 3–5 days.",
      },
    ],
  }),
  component: RequestPage,
});

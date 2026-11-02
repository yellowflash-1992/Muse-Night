import { createFileRoute } from "@tanstack/react-router";

import { MyRequestsPage } from "@/features/requests/MyRequestsPage";

export const Route = createFileRoute("/my-requests")({
  head: () => ({
    meta: [
      { title: "My Requests &mdash; Muse Night" },
      { name: "description", content: "Track the progress of your poem requests." },
    ],
  }),
  component: MyRequestsPage,
});

import { createFileRoute } from "@tanstack/react-router";

import { DailyPage } from "@/features/game/DailyPage";
import { getDailyGameFn } from "@/lib/game.functions";

export const Route = createFileRoute("/daily")({
  loader: () => getDailyGameFn(),
  head: () => ({
    meta: [
      { title: "Poetry Game &mdash; Muse Night" },
      {
        name: "description",
        content: "Poetry battles and six-word story challenges to unlock bonus poems.",
      },
    ],
  }),
  component: DailyRoutePage,
});

function DailyRoutePage() {
  const game = Route.useLoaderData();
  return <DailyPage game={game} />;
}

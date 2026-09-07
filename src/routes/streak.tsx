import { useState } from "react";
import { Flame, Lock, Unlock } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/streak")({
  head: () => ({
    meta: [
      { title: "Daily Streak — Muse Books" },
      {
        name: "description",
        content: "Keep your daily streak and unlock today's bonus poem.",
      },
    ],
  }),
  component: StreakPage,
});

function StreakPage() {
  const [streak] = useState(4);
  const [tasksDone, setTasksDone] = useState(1);
  const unlocked = tasksDone >= 3;

  return (
    <div className="min-h-screen bg-ink text-paper px-6 py-12">
      <div className="mx-auto max-w-md space-y-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-neon mb-2">
              Daily Practice
            </p>
            <h1 className="font-display text-3xl text-paper">Your Streak</h1>
          </div>
          <Link
            to="/daily"
            className="text-[10px] uppercase tracking-[0.2em] text-neon hover:underline"
          >
            Play Poetry Game
          </Link>
        </div>

        <div className="flex items-center justify-between border border-neon/20 rounded-2xl px-5 py-4">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-amber-400" strokeWidth={1.5} />
            <span className="text-sm text-paper">{streak}-day streak</span>
          </div>
          <span className="text-xs text-paper-dim">come back tomorrow to keep it going</span>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-lg text-paper">Today&apos;s bonus poem</h2>
            {unlocked ? (
              <Unlock className="h-4 w-4 text-amber-400" strokeWidth={1.5} />
            ) : (
              <Lock className="h-4 w-4 text-paper-faint" strokeWidth={1.5} />
            )}
          </div>

          <div className="h-1.5 w-full rounded-full bg-ink-2">
            <div
              className="h-full rounded-full bg-neon transition-all"
              style={{ width: `${(tasksDone / 3) * 100}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-paper-dim">
            {unlocked
              ? "Unlocked — scroll to the bottom to read it"
              : `${tasksDone}/3 done today — play the poetry game to unlock`}
          </p>
        </div>

        {unlocked && (
          <div className="rounded-2xl bg-gradient-to-br from-ink-2 via-purple-950 to-ink p-6 text-center">
            <p className="mb-3 text-[10px] uppercase tracking-wide text-amber-400/80">
              bonus poem — unlocked today only
            </p>
            <p className="font-display italic leading-relaxed text-paper">
              some days grief is a language
              <br />
              I&apos;m still learning to speak softly.
            </p>
            <p className="mt-3 text-xs text-paper-dim">— Ada Nwosu</p>
          </div>
        )}
      </div>
    </div>
  );
}

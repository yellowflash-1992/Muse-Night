import { Link } from "@tanstack/react-router";
import { BookOpen, CheckCircle2, Circle, Flame, Lock, Unlock } from "lucide-react";
import { useEffect, useState } from "react";

import { MemberGate } from "@/components/auth/MemberGate";
import { MEMBER_FEATURES } from "@/lib/auth/memberFeatures";
import { getUserStreakFn, type StreakData } from "@/lib/game.functions";

export function StreakPage() {
  return (
    <MemberGate feature={MEMBER_FEATURES.streak}>
      <StreakContent />
    </MemberGate>
  );
}

function StreakContent() {
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getUserStreakFn()
      .then((data) => {
        if (!cancelled) setStreak(data);
      })
      .catch(console.error)
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const currentStreak = streak?.currentStreak ?? 0;
  const tasksDoneToday = streak?.tasksDoneToday ?? 0;
  const readToday = streak?.readToday ?? false;
  const playedToday = streak?.playedToday ?? false;
  const unlocked = tasksDoneToday >= 2;
  const nextBadgeAt =
    currentStreak < 3 ? 3 : currentStreak < 7 ? 7 : currentStreak < 30 ? 30 : null;

  const tasks = [
    {
      label: "Read a poem",
      done: readToday,
      href: "/library",
      cta: "Go to library",
    },
    {
      label: "Play the Daily Game",
      done: playedToday,
      href: "/daily",
      cta: "Play today",
    },
  ] as const;

  return (
    <div className="min-h-screen bg-ink text-paper px-6 py-12">
      <div className="mx-auto max-w-md space-y-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-neon mb-2">Daily Practice</p>
            <h1 className="font-display text-3xl text-paper">Your Streak</h1>
          </div>
          <Link
            to="/daily"
            className="text-[10px] uppercase tracking-[0.2em] text-neon hover:underline"
          >
            Play Poetry Game
          </Link>
        </div>

        <div className="border border-neon/20 rounded-2xl px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-amber-400" strokeWidth={1.5} />
              <span className="text-sm text-paper">{currentStreak}-day streak</span>
            </div>
            {streak?.badge && (
              <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-amber-300">
                {streak.badge}
              </span>
            )}
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-paper-dim">
              {nextBadgeAt === null
                ? "All streak badges earned"
                : `Next Badge at ${nextBadgeAt} Days`}
            </span>
            <span className="text-xs text-paper-dim">come back tomorrow to keep it going</span>
          </div>
        </div>

        {loading ? (
          <p className="text-xs text-paper-dim">Loading your streak&hellip;</p>
        ) : (
          <>
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-display text-lg text-paper">Today's bonus poem</h2>
                {unlocked ? (
                  <Unlock className="h-4 w-4 text-amber-400" strokeWidth={1.5} />
                ) : (
                  <Lock className="h-4 w-4 text-paper-faint" strokeWidth={1.5} />
                )}
              </div>

              <div className="h-1.5 w-full rounded-full bg-ink-2">
                <div
                  className="h-full rounded-full bg-neon transition-all"
                  style={{ width: `${(tasksDoneToday / 2) * 100}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-paper-dim">
                {unlocked
                  ? "Unlocked &mdash; scroll to the bottom to read it"
                  : `${tasksDoneToday}/2 done today &mdash; complete both tasks to unlock`}
              </p>
            </div>

            {/* Task checklist */}
            <div className="space-y-3">
              {tasks.map((task) => (
                <Link
                  key={task.label}
                  to={task.href}
                  className={`flex items-center justify-between border rounded-2xl px-5 py-4 transition-all ${
                    task.done
                      ? "border-neon/40 bg-neon/5"
                      : "border-neon/15 bg-ink-2/40 hover:border-neon/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {task.done ? (
                      <CheckCircle2 className="h-5 w-5 text-neon" strokeWidth={1.5} />
                    ) : (
                      <Circle className="h-5 w-5 text-paper-faint" strokeWidth={1.5} />
                    )}
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-paper-dim" strokeWidth={1.5} />
                      <span
                        className={`text-sm ${task.done ? "text-paper line-through opacity-60" : "text-paper"}`}
                      >
                        {task.label}
                      </span>
                    </div>
                  </div>
                  {!task.done && (
                    <span className="text-[10px] uppercase tracking-[0.2em] text-neon">
                      {task.cta}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {unlocked && streak?.bonusPoem && (
              <Link
                to="/library/$id"
                params={{ id: streak.bonusPoem.id }}
                className="block rounded-2xl bg-gradient-to-br from-ink-2 via-purple-950 to-ink p-6 text-center hover:from-ink-2/80 hover:via-purple-900 transition-all"
              >
                <p className="mb-3 text-[10px] uppercase tracking-wide text-amber-400/80">
                  exclusive bonus poem &mdash; unlocked today only
                </p>
                <p className="font-display italic leading-relaxed text-paper whitespace-pre-line">
                  {streak.bonusPoem.excerpt || streak.bonusPoem.title}
                </p>
                <p className="mt-3 text-xs text-paper-dim">&mdash; {streak.bonusPoem.authorName}</p>
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
}

import { Link, useRouter } from "@tanstack/react-router";
import { Check, Flame, Heart, Send, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
  submitDuelVoteFn,
  submitStoryFn,
  upvoteStoryFn,
  type DailyGameData,
} from "@/lib/game.functions";

function formatCountdown(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function msUntilMidnight(now: Date): number {
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return midnight.getTime() - now.getTime();
}

function CountdownTimer() {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    setRemaining(msUntilMidnight(new Date()));
    const timer = setInterval(() => setRemaining(msUntilMidnight(new Date())), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <p className="text-[11px] font-mono text-paper-faint">
      New arena in <span className="text-amber-200">{formatCountdown(remaining)}</span>
    </p>
  );
}

interface QuestChipProps {
  label: string;
  done: boolean;
  onClick: () => void;
}

function QuestChip({ label, done, onClick }: QuestChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-1 items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition-all cursor-pointer ${
        done
          ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-300"
          : "border-neon/20 bg-ink text-paper-dim hover:border-neon/40 hover:text-paper"
      }`}
    >
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
          done ? "border-emerald-400/60 bg-emerald-400/30" : "border-paper-faint/50 bg-ink"
        }`}
      >
        {done && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
      </span>
      <span className={done ? "line-through opacity-75" : ""}>{label}</span>
    </button>
  );
}

export function DailyPage({ game }: { game: DailyGameData | null }) {
  const router = useRouter();
  const [entry, setEntry] = useState("");
  const [pendingVote, setPendingVote] = useState(false);
  const [submittingStory, setSubmittingStory] = useState(false);
  const [upvotingStoryId, setUpvotingStoryId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  // Calculate word count
  const wordCount = useMemo(() => {
    return entry.trim().split(/\s+/).filter(Boolean).length;
  }, [entry]);

  const isValidStory = wordCount === 6;

  const [todayLabel, setTodayLabel] = useState("");

  useEffect(() => {
    setTodayLabel(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
    );
  }, []);

  const scrollToChallenge = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleVote = async (side: "a" | "b") => {
    if (!game || pendingVote || game.votedSide === side) return;
    setPendingVote(true);
    setActionError(null);
    try {
      await submitDuelVoteFn({ data: { gameId: game.id, side } });
      await router.invalidate();
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Could not submit your vote.");
    } finally {
      setPendingVote(false);
    }
  };

  const battle = game
    ? {
        a: {
          id: "a" as const,
          line: game.lineA,
          poet: game.poetA,
          votes: game.totalVotesA,
        },
        b: {
          id: "b" as const,
          line: game.lineB,
          poet: game.poetB,
          votes: game.totalVotesB,
        },
      }
    : null;
  const votedSide = game?.votedSide ?? null;
  const hasVoted = votedSide !== null;
  const totalVotesA = game?.totalVotesA ?? 0;
  const totalVotesB = game?.totalVotesB ?? 0;
  const totalVotes = game?.totalVotes ?? 0;
  const percentA = totalVotes > 0 ? Math.round((totalVotesA / totalVotes) * 100) : 50;
  const percentB = totalVotes > 0 ? Math.round((totalVotesB / totalVotes) * 100) : 50;

  const handleSubmitStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!game || !isValidStory || submittingStory) return;

    setSubmittingStory(true);
    setActionError(null);
    try {
      await submitStoryFn({ data: { gameId: game.id, text: entry.trim() } });
      setEntry("");
      await router.invalidate();
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Could not submit your story.");
    } finally {
      setSubmittingStory(false);
    }
  };

  const handleUpvoteStory = async (storyId: string) => {
    if (upvotingStoryId) return;
    setUpvotingStoryId(storyId);
    setActionError(null);
    try {
      await upvoteStoryFn({ data: storyId });
      await router.invalidate();
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Could not applaud this story.");
    } finally {
      setUpvotingStoryId(null);
    }
  };

  if (!game) {
    return (
      <div className="min-h-screen bg-ink text-paper px-4 sm:px-6 pt-24 pb-20">
        <div className="mx-auto max-w-lg space-y-10">
          <div className="flex items-center justify-between border-b border-neon/15 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-neon font-semibold mb-1">
                <Sparkles className="h-3 w-3" />
                <span>Daily Arena</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-medium text-paper">
                Muse Night Arena
              </h1>
            </div>
            <Link
              to="/streak"
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1.5 text-xs text-amber-200 hover:bg-amber-400/20 transition-all font-medium"
            >
              <Flame className="h-3.5 w-3.5 text-amber-400" />
              <span>Streak</span>
            </Link>
          </div>
          <div className="rounded-2xl border border-neon/20 bg-ink-2/80 p-8 text-center shadow-sm">
            <Sparkles className="mx-auto mb-4 h-8 w-8 text-neon" />
            <h2 className="font-display text-xl text-paper">Poetry Game Coming Soon.</h2>
          </div>
        </div>
      </div>
    );
  }

  const votedDuel = hasVoted;
  const submittedStory = game.stories.some((story) => story.isMine);

  return (
    <div className="min-h-screen bg-ink text-paper px-4 sm:px-6 pt-24 pb-20">
      <div className="mx-auto max-w-lg space-y-8">
        {/* Masthead Header */}
        <div className="flex items-center justify-between border-b border-neon/15 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-neon font-semibold mb-1">
              <Sparkles className="h-3 w-3 animate-pulse" />
              <span>Daily Arena</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-medium text-paper">
              Muse Night Arena
            </h1>
            <p className="mt-1 text-xs text-paper-dim">{todayLabel}</p>
          </div>

          <Link
            to="/streak"
            className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1.5 text-xs text-amber-200 hover:bg-amber-400/20 transition-all font-medium"
          >
            <Flame className="h-3.5 w-3.5 text-amber-400" />
            <span>Streak</span>
          </Link>
        </div>

        {/* Quest Strip */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <QuestChip
              label="Verse Duel"
              done={votedDuel}
              onClick={() => scrollToChallenge("challenge-duel")}
            />
            <QuestChip
              label="Six-Word Story"
              done={submittedStory}
              onClick={() => scrollToChallenge("challenge-story")}
            />
          </div>
          <CountdownTimer />
        </div>

        {/* Challenge 1: Verse Duel */}
        <div id="challenge-duel" className="space-y-4 scroll-mt-28">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neon">
                Challenge 1
              </span>
              <h2 className="font-display text-2xl text-paper font-medium">Verse Duel</h2>
            </div>
            <span className="text-xs text-paper-dim font-medium">Vote for the stronger line</span>
          </div>
          <p className="text-[11px] text-paper-faint">Votes are final &mdash; choose wisely.</p>

          {actionError && <p className="text-sm text-rose-400">{actionError}</p>}

          <div className="space-y-3">
            {(["a", "b"] as const).map((side) => {
              const item = battle![side];
              const isSelected = votedSide === side;
              const percent = side === "a" ? percentA : percentB;

              return (
                <div key={side} className="relative">
                  <button
                    type="button"
                    onClick={() => void handleVote(side)}
                    disabled={pendingVote || isSelected}
                    className={`w-full text-left rounded-2xl border p-4 sm:p-5 transition-all relative overflow-hidden active:scale-[0.99] cursor-pointer shadow-sm ${
                      isSelected
                        ? "border-neon/60 bg-gradient-to-r from-neon/15 via-ink-2 to-ink shadow-[0_0_20px_rgba(45,212,191,0.15)]"
                        : hasVoted
                          ? "border-neon/10 bg-ink-2/60"
                          : "border-neon/15 bg-ink-2 hover:border-neon/40 hover:bg-ink-2/90"
                    }`}
                  >
                    <div
                      className="absolute inset-y-0 left-0 bg-neon/10 transition-all duration-700 pointer-events-none"
                      style={{ width: `${percent}%` }}
                    />

                    <div className="relative z-10 space-y-2">
                      <p className="font-display italic text-base sm:text-lg text-paper leading-snug">
                        &ldquo;{item.line}&rdquo;
                      </p>

                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="text-paper-dim font-medium">&mdash; {item.poet}</span>

                        {hasVoted ? (
                          <div className="flex items-center gap-2">
                            {isSelected && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-neon bg-neon/15 px-2 py-0.5 rounded-full border border-neon/30">
                                <Check className="h-3 w-3" />
                                Your Pick
                              </span>
                            )}
                            <span className="font-mono font-bold text-paper text-xs">
                              {percent}%
                            </span>
                          </div>
                        ) : (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-neon">
                            Cast Vote
                          </span>
                        )}
                      </div>
                    </div>
                  </button>

                  {/* VS divider between the two duel cards */}
                  {side === "a" && (
                    <div className="flex items-center justify-center py-1" aria-hidden="true">
                      <div className="h-px w-16 bg-gradient-to-r from-transparent to-neon/40" />
                      <span className="mx-3 font-display text-sm font-bold text-amber-300/90 drop-shadow-[0_0_6px_rgba(252,211,77,0.4)]">
                        VS
                      </span>
                      <div className="h-px w-16 bg-gradient-to-l from-transparent to-neon/40" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-xs text-paper-dim mt-2">{totalVotes} total votes</p>
        </div>

        {/* Challenge 2: Six-Word Story */}
        <div
          id="challenge-story"
          className="mt-32 space-y-4 pt-4 border-t border-neon/15 scroll-mt-28"
        >
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neon">
                Challenge 2
              </span>
              <h2 className="font-display text-2xl text-paper font-medium">Six-Word Story</h2>
            </div>
            <span className="text-xs text-paper-dim font-medium">Write in exactly 6 words</span>
          </div>

          {/* Prompt Banner */}
          <div className="rounded-xl border border-amber-400/30 bg-gradient-to-r from-amber-400/10 via-ink-2 to-ink p-3.5 flex items-center justify-between">
            <span className="text-xs text-paper-dim font-medium">Today's Prompt:</span>
            <span className="font-display italic text-sm sm:text-base text-amber-200 font-medium">
              &ldquo;{game.prompt}&rdquo;
            </span>
          </div>

          {/* Submission Form with Word Counter Badge */}
          {!submittedStory ? (
            <form onSubmit={handleSubmitStory} className="space-y-2">
              <div className="relative">
                <textarea
                  rows={2}
                  value={entry}
                  onChange={(e) => setEntry(e.target.value)}
                  placeholder="Type your story (e.g. She kept his side of bed)..."
                  className="w-full rounded-2xl border border-neon/25 bg-ink-2 pl-4 pr-12 py-3 text-sm text-paper placeholder:text-paper-faint/60 focus:outline-none focus:border-neon transition-colors resize-none"
                />

                <button
                  type="submit"
                  disabled={!isValidStory || submittingStory}
                  className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-xl transition-all cursor-pointer ${
                    isValidStory
                      ? "bg-neon text-ink shadow-md active:scale-95 hover:bg-neon/90"
                      : "bg-ink border border-neon/15 text-paper-faint opacity-50 cursor-not-allowed"
                  }`}
                  title={isValidStory ? "Submit story" : "Must be exactly 6 words"}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>

              {/* Word Count Indicator Badge */}
              <div className="flex items-center justify-between px-1 text-xs">
                <span className="text-[11px] text-paper-faint">
                  {wordCount === 0
                    ? "Write a mini-story using exactly six words"
                    : wordCount === 6
                      ? "Perfect length! Ready to submit"
                      : wordCount < 6
                        ? `Add ${6 - wordCount} more ${6 - wordCount === 1 ? "word" : "words"}`
                        : `Remove ${wordCount - 6} ${wordCount - 6 === 1 ? "word" : "words"}`}
                </span>

                <span
                  className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                    isValidStory
                      ? "bg-emerald-500/15 border-emerald-400/40 text-emerald-300"
                      : wordCount > 6
                        ? "bg-rose-500/15 border-rose-400/40 text-rose-300"
                        : "bg-ink border border-neon/15 text-paper-dim"
                  }`}
                >
                  {wordCount} / 6 words
                </span>
              </div>
            </form>
          ) : (
            <p className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-300">
              Your story is in for today. Come back tomorrow for a new prompt.
            </p>
          )}

          {/* Community Stories List with Live Upvotes */}
          <div className="space-y-2.5 pt-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-paper-faint block">
              Today's Submissions
            </span>

            {game.stories.map((story) => (
              <div
                key={story.id}
                className="flex items-center justify-between rounded-xl border border-neon/15 bg-ink-2/70 px-4 py-3 shadow-sm hover:border-neon/30 transition-all"
              >
                <div className="min-w-0 pr-3">
                  <p className="font-display italic text-sm text-paper leading-snug">
                    &ldquo;{story.text}&rdquo;
                  </p>
                  <span className="text-[10px] text-paper-faint font-sans mt-0.5 block">
                    by {story.authorName}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => void handleUpvoteStory(story.id)}
                  disabled={story.hasUpvoted || upvotingStoryId === story.id}
                  className={`flex shrink-0 items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-mono transition-all cursor-pointer active:scale-95 ${
                    story.hasUpvoted || upvotingStoryId === story.id
                      ? "bg-rose-500/15 border-rose-400/40 text-rose-300 shadow-sm"
                      : "bg-ink border-neon/15 text-paper-faint hover:text-paper"
                  }`}
                  title="Applaud story"
                >
                  <Heart
                    className="h-3.5 w-3.5"
                    fill={story.hasUpvoted ? "currentColor" : "none"}
                  />
                  <span>{story.votes}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { Link } from "@tanstack/react-router";
import { Check, Flame, Heart, Send, Sparkles, Trophy } from "lucide-react";
import { useMemo, useState } from "react";

interface BattleOption {
  id: "a" | "b";
  line: string;
  poet: string;
  votes: number;
}

interface Story {
  id: string;
  text: string;
  votes: number;
  hasUpvoted?: boolean;
  author: string;
}

const INITIAL_BATTLE: Record<"a" | "b", BattleOption> = {
  a: {
    id: "a",
    line: "Grief is just love with nowhere left to go.",
    poet: "River Adeyemi",
    votes: 342,
  },
  b: {
    id: "b",
    line: "I keep setting two cups down out of habit.",
    poet: "Tomi Fashola",
    votes: 268,
  },
};

const INITIAL_STORIES: Story[] = [
  { id: "1", text: "She kept his side of bed.", votes: 84, author: "Aisha" },
  { id: "2", text: "Divorce papers, still in the drawer.", votes: 51, author: "Anon" },
  { id: "3", text: "I finally deleted your last voicemail.", votes: 39, author: "Soren" },
];

export function DailyPage() {
  const [votedSide, setVotedSide] = useState<"a" | "b" | null>(null);
  const [battle, setBattle] = useState(INITIAL_BATTLE);

  const [entry, setEntry] = useState("");
  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);

  // Calculate word count
  const wordCount = useMemo(() => {
    return entry.trim().split(/\s+/).filter(Boolean).length;
  }, [entry]);

  const isValidStory = wordCount === 6;

  // Handle voting in the verse battle
  const handleVote = (side: "a" | "b") => {
    if (votedSide === side) return;

    setBattle((prev) => {
      const updated = { ...prev };
      // If switching vote, decrement old and increment new
      if (votedSide) {
        updated[votedSide] = { ...updated[votedSide], votes: updated[votedSide].votes - 1 };
      }
      updated[side] = { ...updated[side], votes: updated[side].votes + 1 };
      return updated;
    });

    setVotedSide(side);
  };

  // Vote percentages
  const totalVotes = battle.a.votes + battle.b.votes;
  const percentA = Math.round((battle.a.votes / totalVotes) * 100);
  const percentB = 100 - percentA;

  // Handle submitting a 6-word story
  const handleSubmitStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidStory) return;

    const newStory: Story = {
      id: `story-${Date.now()}`,
      text: entry.trim(),
      votes: 1,
      hasUpvoted: true,
      author: "You",
    };

    setStories([newStory, ...stories]);
    setEntry("");
  };

  // Handle upvoting a story
  const handleToggleUpvote = (id: string) => {
    setStories((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const hasUpvoted = !s.hasUpvoted;
          return {
            ...s,
            hasUpvoted,
            votes: hasUpvoted ? s.votes + 1 : s.votes - 1,
          };
        }
        return s;
      }),
    );
  };

  // Completion counter
  const tasksCompleted = (votedSide ? 1 : 0) + (stories.some((s) => s.author === "You") ? 1 : 0);

  return (
    <div className="min-h-screen bg-ink text-paper px-4 sm:px-6 pt-24 pb-20">
      <div className="mx-auto max-w-lg space-y-10">
        {/* Masthead Header */}
        <div className="flex items-center justify-between border-b border-neon/15 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-neon font-semibold mb-1">
              <Sparkles className="h-3 w-3 animate-pulse" />
              <span>Daily Arena</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-medium text-paper">
              Poetry Game
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

        {/* Daily Progress Tracker */}
        <div className="rounded-2xl border border-neon/20 bg-ink-2/80 p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neon/15 text-neon border border-neon/30">
              <Trophy className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-paper">Today's Challenges</p>
              <p className="text-[11px] text-paper-dim">
                {tasksCompleted === 2
                  ? "All challenges finished — streak bonus ready! ✨"
                  : `${tasksCompleted} of 2 completed`}
              </p>
            </div>
          </div>
          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider ${
              tasksCompleted === 2
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                : "bg-ink border border-neon/20 text-paper-dim"
            }`}
          >
            {tasksCompleted}/2 Done
          </span>
        </div>

        {/* Challenge 1: Verse Duel */}
        <div className="space-y-4">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neon">
                Challenge 1
              </span>
              <h2 className="font-display text-2xl text-paper font-medium">Verse Duel</h2>
            </div>
            <span className="text-xs text-paper-dim font-medium">Vote for the stronger line</span>
          </div>

          <div className="space-y-3">
            {(["a", "b"] as const).map((side) => {
              const item = battle[side];
              const isSelected = votedSide === side;
              const percent = side === "a" ? percentA : percentB;

              return (
                <button
                  key={side}
                  type="button"
                  onClick={() => handleVote(side)}
                  className={`w-full text-left rounded-2xl border p-4 sm:p-5 transition-all relative overflow-hidden active:scale-[0.99] cursor-pointer shadow-sm ${
                    isSelected
                      ? "border-neon/60 bg-gradient-to-r from-neon/15 via-ink-2 to-ink shadow-[0_0_20px_rgba(45,212,191,0.15)]"
                      : "border-neon/15 bg-ink-2 hover:border-neon/40 hover:bg-ink-2/90"
                  }`}
                >
                  {/* Background Progress Bar when voted */}
                  {votedSide && (
                    <div
                      className="absolute inset-y-0 left-0 bg-neon/10 transition-all duration-700 pointer-events-none"
                      style={{ width: `${percent}%` }}
                    />
                  )}

                  <div className="relative z-10 space-y-2">
                    <p className="font-display italic text-base sm:text-lg text-paper leading-snug">
                      “{item.line}”
                    </p>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-paper-dim font-medium">— {item.poet}</span>

                      {votedSide ? (
                        <div className="flex items-center gap-2">
                          {isSelected && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-neon bg-neon/15 px-2 py-0.5 rounded-full border border-neon/30">
                              <Check className="h-3 w-3" />
                              Your Pick
                            </span>
                          )}
                          <span className="font-mono font-bold text-paper text-xs">{percent}%</span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-paper-faint uppercase tracking-wider font-semibold group-hover:text-neon">
                          Tap to vote
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Challenge 2: Six-Word Story */}
        <div className="space-y-4 pt-4 border-t border-neon/15">
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
              “what grief doesn’t say”
            </span>
          </div>

          {/* Submission Form with Word Counter Badge */}
          <form onSubmit={handleSubmitStory} className="space-y-2">
            <div className="relative flex items-center">
              <input
                type="text"
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                placeholder="Type your story (e.g. She kept his side of bed)..."
                className="w-full rounded-2xl border border-neon/25 bg-ink-2 pl-4 pr-12 py-3 text-sm text-paper placeholder:text-paper-faint/60 focus:outline-none focus:border-neon transition-colors"
              />

              <button
                type="submit"
                disabled={!isValidStory}
                className={`absolute right-2 flex h-8 w-8 items-center justify-center rounded-xl transition-all cursor-pointer ${
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

          {/* Community Stories List with Live Upvotes */}
          <div className="space-y-2.5 pt-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-paper-faint block">
              Today's Submissions
            </span>

            {stories.map((story) => (
              <div
                key={story.id}
                className="flex items-center justify-between rounded-xl border border-neon/15 bg-ink-2/70 px-4 py-3 shadow-sm hover:border-neon/30 transition-all"
              >
                <div className="min-w-0 pr-3">
                  <p className="font-display italic text-sm text-paper leading-snug">
                    “{story.text}”
                  </p>
                  <span className="text-[10px] text-paper-faint font-sans mt-0.5 block">
                    by {story.author}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleUpvote(story.id)}
                  className={`flex shrink-0 items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-mono transition-all cursor-pointer active:scale-95 ${
                    story.hasUpvoted
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

import { useState } from "react";
import { Send, ThumbsUp } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";

const BATTLE = {
  a: { line: "grief is just love with nowhere left to go.", poet: "River Adeyemi" },
  b: { line: "I keep setting two cups down out of habit.", poet: "Tomi Fashola" },
};

const SIX_WORD_STORIES = [
  { text: "She kept his side of the bed.", votes: 84 },
  { text: "Divorce papers, still in the drawer.", votes: 51 },
  { text: "I finally deleted the last voicemail.", votes: 39 },
];

export const Route = createFileRoute("/daily")({
  head: () => ({
    meta: [
      { title: "Poetry Game — Muse Books" },
      {
        name: "description",
        content:
          "Poetry battles and six-word story challenges to unlock bonus poems.",
      },
    ],
  }),
  component: PoetryGame,
});

function PoetryGame() {
  const [voted, setVoted] = useState<string | null>(null);
  const [entry, setEntry] = useState("");
  const [stories, setStories] = useState(SIX_WORD_STORIES);

  const vote = (side: string) => {
    setVoted(side);
  };

  const submitStory = () => {
    if (!entry.trim()) return;
    setStories([{ text: entry.trim(), votes: 1 }, ...stories]);
    setEntry("");
  };

  return (
    <div className="min-h-screen bg-ink text-paper px-6 py-12">
      <div className="mx-auto max-w-md space-y-12">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-neon mb-2">
              Interactive Poetry
            </p>
            <h1 className="font-display text-3xl text-paper">Poetry Game</h1>
          </div>
          <Link
            to="/streak"
            className="text-[10px] uppercase tracking-[0.2em] text-neon hover:underline"
          >
            View Streak
          </Link>
        </div>

        <div>
          <h2 className="font-display text-lg text-paper">Poetry battle</h2>
          <p className="mb-4 text-xs text-paper-dim">Which line hits harder?</p>

          <div className="space-y-3">
            {(["a", "b"] as const).map((side) => (
              <button
                key={side}
                type="button"
                onClick={() => vote(side)}
                className={`w-full rounded-xl border p-4 text-left transition ${
                  voted === side
                    ? "border-neon/50 bg-neon/10"
                    : "border-neon/20 hover:border-neon/40"
                }`}
              >
                <p className="font-display italic text-sm text-paper">"{BATTLE[side].line}"</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-paper-dim">— {BATTLE[side].poet}</span>
                  {voted && (
                    <span className="text-xs text-neon">
                      {side === voted ? "your pick" : ""}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
          {voted && (
            <p className="mt-3 text-xs text-paper-faint">
              Tap the other one anytime to change your vote — final pick counts when battle closes tonight.
            </p>
          )}
        </div>

        <div>
          <h2 className="font-display text-lg text-paper">Six-word story</h2>
          <p className="mb-4 text-xs text-paper-dim">
            Today&apos;s prompt:{" "}
            <span className="text-paper">"what grief doesn't say"</span>
          </p>

          <div className="mb-6 flex gap-2">
            <input
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              placeholder="Your six words..."
              className="flex-1 rounded-full border border-neon/20 bg-ink-2 px-4 py-2.5 text-sm text-paper placeholder:text-paper-faint focus:outline-none focus:border-neon/60"
            />
            <button
              type="button"
              onClick={submitStory}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neon text-ink"
            >
              <Send className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>

          <div className="space-y-3">
            {stories.map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl border border-neon/20 px-4 py-3"
              >
                <p className="text-sm text-paper">{s.text}</p>
                <button
                  type="button"
                  className="ml-3 flex shrink-0 items-center gap-1 text-xs text-paper-faint"
                >
                  <ThumbsUp className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {s.votes}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

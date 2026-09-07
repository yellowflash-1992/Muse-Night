import { createFileRoute, Link } from "@tanstack/react-router";
import { RotateCcw, Share2, Sparkles } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/mood")({
  head: () => ({
    meta: [
      { title: "A Poem for Your Mood — Muse Books" },
      {
        name: "description",
        content:
          "Pick how you're feeling — or flip a penny — and receive a poem written for that exact mood.",
      },
    ],
  }),
  component: MoodPage,
});

const MOODS = [
  { label: "Missing someone", emoji: "🕊️" },
  { label: "Heartbroken", emoji: "💔" },
  { label: "Hopeful", emoji: "🌅" },
  { label: "Lonely", emoji: "🌙" },
  { label: "In love", emoji: "🌷" },
  { label: "Overwhelmed", emoji: "🌊" },
  { label: "Grateful", emoji: "🍃" },
  { label: "Numb", emoji: "🕯️" },
];

const POEM_LINES: Record<string, { line: string; poet: string }> = {
  "Missing someone": { line: "the kettle still set for two.", poet: "River Adeyemi" },
  Heartbroken: { line: "I keep the door unlocked, just in case.", poet: "Tomi Fashola" },
  Hopeful: { line: "even the tide leaves for a reason to return.", poet: "Ada Nwosu" },
  Lonely: { line: "some nights the moon is the only one awake with me.", poet: "Femi Okoro" },
  "In love": { line: "you are the poem I didn't know I was writing.", poet: "Foluke Bello" },
  Overwhelmed: { line: "I am learning to float instead of fight the water.", poet: "Zara Idris" },
  Grateful: { line: "some mornings the light just wants to be noticed.", poet: "Tamsin Reyes" },
  Numb: { line: "I am here. that has to count for something today.", poet: "River Adeyemi" },
};

const MOOD_LIST = Object.keys(POEM_LINES);

function MoodPage() {
  const [stage, setStage] = useState<"pick" | "flipping" | "result">("pick");
  const [mood, setMood] = useState<string | null>(null);

  const reveal = (chosenMood: string) => {
    setMood(chosenMood);
    setStage("flipping");
    setTimeout(() => setStage("result"), 900);
  };

  const flipPenny = () => {
    const random = MOOD_LIST[Math.floor(Math.random() * MOOD_LIST.length)] ?? MOOD_LIST[0] ?? "";
    reveal(random);
  };

  const reset = () => {
    setStage("pick");
    setMood(null);
  };

  return (
    <div className="bg-ink text-paper flex items-start justify-center px-6 pt-10 pb-24">
      <div className="w-full max-w-sm text-center relative min-h-[480px]">
        {stage === "pick" && (
          <div className="absolute inset-0 animate-in fade-in">
            <div className="inline-flex items-center gap-2 text-neon text-xs uppercase tracking-[0.28em] mb-5">
              <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>Poetry by mood</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl text-paper mb-2">
              A poem for your mood
            </h1>
            <p className="text-sm text-paper-dim mb-6">
              Pick how you&apos;re feeling — or flip a penny and let it decide.
            </p>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-6">
              {MOODS.map((m) => (
                <button
                  key={m.label}
                  type="button"
                  onClick={() => reveal(m.label)}
                  className="flex flex-col items-center gap-1 py-2 rounded-lg border border-neon/20 bg-ink-2 hover:border-neon/60 transition"
                >
                  <span className="text-base">{m.emoji}</span>
                  <span className="text-[10px] text-paper">{m.label}</span>
                </button>
              ))}
            </div>

            <div className="flex flex-col items-center gap-2 mt-12">
              <button
                type="button"
                onClick={flipPenny}
                className="flex items-center gap-2 mx-auto text-sm text-amber-300 border border-amber-400/40 rounded-full px-5 py-2 hover:bg-amber-400/10 transition animate-pulse"
              >
                <span>a penny for your thought</span>
              </button>
              <button
                type="button"
                onClick={flipPenny}
                className="flex items-center gap-2 text-sm text-amber-300 border border-amber-400/40 rounded-full px-5 py-2 hover:bg-amber-400/10 transition"
              >
                <span className="text-base">🪙</span>
                <span>Flip</span>
              </button>
            </div>
          </div>
        )}

        {stage === "flipping" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center animate-in fade-in">
            <div className="text-5xl mb-6 inline-block animate-spin">🪙</div>
            <p className="text-sm text-paper-dim">finding your poem...</p>
          </div>
        )}

        {stage === "result" && mood && (
          <div className="absolute inset-0 flex flex-col items-center justify-center animate-in fade-in">
            <p className="text-[10px] uppercase tracking-widest text-paper-dim mb-4">
              for feeling {mood.toLowerCase()}
            </p>

            <div className="rounded-2xl bg-gradient-to-br from-ink-2 via-purple-950 to-ink p-6 mb-5 border border-neon/10 max-w-xs">
              <p className="font-display italic text-base text-amber-100 leading-relaxed">
                {POEM_LINES[mood]?.line ?? "A quiet verse for this hour."}
              </p>
              <p className="text-[10px] text-amber-200/70 mt-3">
                — {POEM_LINES[mood]?.poet ?? "Muse Books"}
              </p>
            </div>

            <div className="flex gap-2 justify-center mb-5">
              <button
                type="button"
                className="flex items-center justify-center gap-2 bg-neon text-ink text-sm font-medium px-5 py-2.5 rounded-full hover:bg-neon/90 transition"
              >
                <Share2 className="w-4 h-4" strokeWidth={1.5} />
                Share this poem
              </button>
              <button
                type="button"
                onClick={reset}
                className="flex items-center justify-center gap-2 border border-neon/20 text-paper text-sm px-5 py-2.5 rounded-full hover:bg-neon/10 transition"
              >
                <RotateCcw className="w-4 h-4" strokeWidth={1.5} />
                Try another mood
              </button>
            </div>

            <div>
              <Link
                to="/library"
                className="text-[10px] uppercase tracking-[0.2em] text-neon hover:underline"
              >
                Browse full archive
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

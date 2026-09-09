import { Link } from "@tanstack/react-router";
import { Check, Clock, Feather, Mail, MessageCircle, Quote } from "lucide-react";
import { useState } from "react";

const OCCASIONS = ["Birthday", "Anniversary", "Wedding", "Sympathy", "Just because", "Other"];
const TONES = ["Romantic", "Nostalgic", "Playful", "Reflective", "Spiritual"];

export function RequestPage() {
  const [occasion, setOccasion] = useState("Birthday");
  const [tone, setTone] = useState("Romantic");
  const [delivery, setDelivery] = useState("WhatsApp");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen bg-ink text-paper flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="inline-flex p-4 rounded-full bg-neon/15 text-neon mb-6">
            <Check className="w-10 h-10" strokeWidth={1.5} />
          </div>
          <h1 className="font-display text-2xl text-paper mb-3">Your request is in the queue</h1>
          <p className="text-paper-dim text-sm leading-relaxed">
            We'll email you a draft within 3–5 days. Every commissioned poem is handwritten by one
            of our poets — no templates, no AI.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded bg-neon px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-ink hover:bg-neon/90 mt-8 transition-all"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink text-paper">
      {/* Hero */}
      <div className="border-b border-neon/10 px-6 py-16 text-center">
        <div className="flex items-center justify-center gap-2 text-neon text-xs uppercase tracking-[0.28em] mb-5">
          <Feather className="w-3.5 h-3.5" strokeWidth={1.5} />
          Commission a poem
        </div>
        <h1 className="font-display text-3xl sm:text-4xl text-paper max-w-xl mx-auto leading-snug">
          Some feelings deserve words
          <br />
          written just for them.
        </h1>
        <p className="text-paper-dim text-sm mt-5 max-w-md mx-auto">
          Tell us who it&apos;s for and why. A poet crafts something original — delivered to your
          inbox, ready to give.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">
        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="md:col-span-2 space-y-7"
        >
          <div>
            <label className="block text-xs uppercase tracking-wide text-paper-dim mb-3">
              Occasion
            </label>
            <div className="flex flex-wrap gap-2">
              {OCCASIONS.map((o) => (
                <button
                  type="button"
                  key={o}
                  onClick={() => setOccasion(o)}
                  className={`px-3.5 py-1.5 rounded-full text-xs border transition ${
                    occasion === o
                      ? "border-neon text-neon bg-neon/10"
                      : "border-neon/20 text-paper-dim hover:border-neon/40"
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wide text-paper-dim mb-3">
              Tone
            </label>
            <div className="flex flex-wrap gap-2">
              {TONES.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTone(t)}
                  className={`px-3.5 py-1.5 rounded-full text-xs border transition ${
                    tone === t
                      ? "border-neon text-neon bg-neon/10"
                      : "border-neon/20 text-paper-dim hover:border-neon/40"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wide text-paper-dim mb-3">
              Get it delivered on
            </label>
            <div className="flex gap-2">
              {["WhatsApp", "Email"].map((d) => (
                <button
                  type="button"
                  key={d}
                  onClick={() => setDelivery(d)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs border transition ${
                    delivery === d
                      ? "border-neon text-neon bg-neon/10"
                      : "border-neon/20 text-paper-dim hover:border-neon/40"
                  }`}
                >
                  {d === "WhatsApp" ? (
                    <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.5} />
                  ) : (
                    <Mail className="w-3.5 h-3.5" strokeWidth={1.5} />
                  )}
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-wide text-paper-dim mb-2">
                Who is this for?
              </label>
              <input
                required
                type="text"
                placeholder="e.g. My mother, Aisha"
                className="w-full bg-ink-2 border border-neon/20 rounded-lg px-3.5 py-2.5 text-sm text-paper placeholder:text-paper-faint focus:outline-none focus:border-neon/60"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wide text-paper-dim mb-2">
                {delivery === "WhatsApp" ? "Your WhatsApp number" : "Your email"}
              </label>
              <input
                required
                type={delivery === "WhatsApp" ? "tel" : "email"}
                placeholder={delivery === "WhatsApp" ? "e.g. +234 801 234 5678" : "you@email.com"}
                className="w-full bg-ink-2 border border-neon/20 rounded-lg px-3.5 py-2.5 text-sm text-paper placeholder:text-paper-faint focus:outline-none focus:border-neon/60"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wide text-paper-dim mb-2">
              Tell us their story
            </label>
            <textarea
              required
              rows={5}
              placeholder="What should the poet know? Memories, inside jokes, what makes this person who they are..."
              className="w-full bg-ink-2 border border-neon/20 rounded-lg px-3.5 py-2.5 text-sm text-paper placeholder:text-paper-faint focus:outline-none focus:border-neon/60 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-7 py-3 rounded-lg bg-neon text-ink text-sm font-medium hover:bg-neon/90 transition shadow-md"
          >
            Request your poem — $5
          </button>
        </form>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="border border-neon/15 rounded-xl p-5">
            <h3 className="text-xs uppercase tracking-wide text-paper-dim mb-4">How it works</h3>
            <ol className="space-y-4 text-sm text-paper-dim">
              <li className="flex gap-3">
                <span className="text-neon font-display italic">1</span>
                Share the story and occasion
              </li>
              <li className="flex gap-3">
                <span className="text-neon font-display italic">2</span>A poet writes it — never
                AI-generated
              </li>
              <li className="flex gap-3">
                <span className="text-neon font-display italic">3</span>
                Delivered by email, ready to share
              </li>
            </ol>
          </div>

          <div className="border border-neon/15 rounded-xl p-5 flex items-start gap-3">
            <Clock className="w-4 h-4 text-neon mt-0.5 shrink-0" strokeWidth={1.5} />
            <div>
              <p className="text-sm text-paper">3–5 day turnaround</p>
              <p className="text-xs text-paper-faint mt-1">
                Rush delivery (24hr) available for $2 more
              </p>
            </div>
          </div>

          <div className="border border-neon/15 rounded-xl p-5 flex items-start gap-3">
            <MessageCircle className="w-4 h-4 text-neon mt-0.5 shrink-0" strokeWidth={1.5} />
            <div>
              <p className="text-sm text-paper">Sent by WhatsApp or email</p>
              <p className="text-xs text-paper-faint mt-1">
                Whichever&apos;s easier for you to check
              </p>
            </div>
          </div>

          <div className="border-l-2 border-neon/15 pl-4">
            <Quote className="w-4 h-4 text-paper-faint mb-2" strokeWidth={1.5} />
            <p className="font-display italic text-sm text-paper-dim leading-relaxed">
              &ldquo;I didn&apos;t know what to write in her card. They did — and it made her cry,
              the good kind.&rdquo;
            </p>
            <p className="text-xs text-paper-faint mt-2">— a reader, on an anniversary poem</p>
          </div>
        </div>
      </div>
    </div>
  );
}

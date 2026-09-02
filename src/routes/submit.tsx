import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Feather,
  Send,
  CheckCircle2,
  Calendar,
  FileText,
  Sparkles,
  HelpCircle,
  BookOpen,
} from "lucide-react";

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Submissions & Call for Poetry — Muse Books" },
      {
        name: "description",
        content:
          "Submit your poems, chapbook manuscripts, and literary musings to Muse Books. We read year-round.",
      },
    ],
  }),
  component: SubmitPage,
});

function SubmitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("poem");
  const [title, setTitle] = useState("");
  const [manuscript, setManuscript] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && manuscript) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-[1140px] px-6 sm:px-10">
        {/* Header */}
        <div className="border-b border-neon/10 pb-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-neon/80 mb-3">
            <Feather className="h-3.5 w-3.5" />
            <span>Open Call for Writers &amp; Poets</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-medium text-paper">
            Submit Your Work
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paper-dim max-w-[56ch] text-pretty">
            We are always listening for voices that write with patience, attention to silence, and
            care for language. We accept standalone poems, chapbook suites, and craft musings.
          </p>
        </div>

        {/* Reading Periods & Guidelines Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
          <div className="rounded-lg border border-neon/15 bg-ink-2 p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neon">
              <Calendar className="h-4 w-4" />
              <span>Reading Schedule</span>
            </div>
            <h3 className="font-display text-xl text-paper">Year-Round Reading</h3>
            <p className="text-xs text-paper-dim leading-relaxed">
              We review submissions on a rolling basis. Expect a thoughtful personal response within
              4 to 6 weeks.
            </p>
          </div>

          <div className="rounded-lg border border-neon/15 bg-ink-2 p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neon">
              <FileText className="h-4 w-4" />
              <span>Formats Accepted</span>
            </div>
            <h3 className="font-display text-xl text-paper">Poems &amp; Chapbooks</h3>
            <p className="text-xs text-paper-dim leading-relaxed">
              1–5 poems per submission, or a full chapbook manuscript of 20–35 pages. Musings:
              800–2,000 words.
            </p>
          </div>

          <div className="rounded-lg border border-neon/15 bg-ink-2 p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neon">
              <Sparkles className="h-4 w-4" />
              <span>Letterpress Print</span>
            </div>
            <h3 className="font-display text-xl text-paper">Physical Imprint</h3>
            <p className="text-xs text-paper-dim leading-relaxed">
              Selected poems are published digitally and considered for our limited letterpress
              chapbook runs.
            </p>
          </div>
        </div>

        {/* Submission Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
          {/* Submission Guidelines Column */}
          <div className="col-span-12 lg:col-span-5 space-y-6">
            <div className="rounded-xl border border-neon/15 bg-ink-2 p-6 space-y-4">
              <h3 className="font-display text-2xl text-paper">What We Seek</h3>
              <ul className="space-y-3 text-xs text-paper-dim leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-neon mt-0.5">•</span>
                  <span>
                    Poems that honor sensory detail, domestic solitude, weather, and memory.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon mt-0.5">•</span>
                  <span>
                    Epistolary poems (letters, postcards, dispatches to absent companions).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon mt-0.5">•</span>
                  <span>
                    Essays reflecting on the physical craft of reading, typesetting, and writing.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon mt-0.5">•</span>
                  <span>Translations of under-represented international poets.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-neon/10 bg-ink-2/60 p-6 text-xs text-paper-dim space-y-2">
              <p className="text-neon uppercase tracking-[0.2em] font-medium">Author Rights</p>
              <p className="leading-relaxed">
                Authors retain all copyrights to their original work. Muse Books requests first
                serial rights and non-exclusive archival rights.
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="col-span-12 lg:col-span-7">
            {submitted ? (
              <div className="rounded-xl border border-neon/40 bg-ink-2 p-8 sm:p-12 text-center space-y-6 animate-in fade-in">
                <div className="inline-flex p-4 rounded-full bg-neon/15 text-neon">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
                <h2 className="font-display text-4xl text-paper">Manuscript Received</h2>
                <p className="text-sm text-paper-dim leading-relaxed max-w-md mx-auto">
                  Thank you, <span className="text-paper font-medium">{name}</span>. Your work{" "}
                  <span className="text-paper italic">“{title || "Untitled Submission"}”</span> has
                  been delivered to our editorial desk. We will read it by lamplight and reply to{" "}
                  <span className="text-paper font-medium">{email}</span>.
                </p>
                <div className="pt-4 flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setTitle("");
                      setManuscript("");
                      setBio("");
                    }}
                    className="rounded bg-neon px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-ink hover:bg-neon/90"
                  >
                    Submit Another Piece
                  </button>
                  <Link
                    to="/poems"
                    className="rounded border border-neon/30 px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-paper hover:bg-neon/10"
                  >
                    Browse Archive
                  </Link>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-xl border border-neon/20 bg-ink-2 p-6 sm:p-8 space-y-6"
              >
                <div>
                  <h3 className="font-display text-3xl font-medium text-paper">
                    Submit Manuscript
                  </h3>
                  <p className="text-xs text-paper-dim mt-1">
                    Please paste your submission text directly below.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1">
                        Your Name / Pen Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rowan Davies"
                        className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper placeholder:text-paper-faint focus:border-neon focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="rowan@example.com"
                        className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper placeholder:text-paper-faint focus:border-neon focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1">
                        Submission Category
                      </label>
                      <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper focus:border-neon focus:outline-none"
                      >
                        <option value="poem">Single Poem / Suite (1–5 poems)</option>
                        <option value="chapbook">Chapbook Manuscript (20–35 pages)</option>
                        <option value="musing">Literary Essay / Musing</option>
                        <option value="translation">Poetry Translation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1">
                        Work Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Winter Letters"
                        className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper placeholder:text-paper-faint focus:border-neon focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1">
                      Poem / Manuscript Text *
                    </label>
                    <textarea
                      rows={8}
                      required
                      value={manuscript}
                      onChange={(e) => setManuscript(e.target.value)}
                      placeholder="Paste your poem(s) with your preferred stanza spacing and indentation..."
                      className="w-full font-serif text-sm rounded bg-ink border border-neon/20 px-3 py-3 text-paper placeholder:text-paper-faint focus:border-neon focus:outline-none leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1">
                      Brief Bio &amp; Cover Note (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us a little about yourself, your location, and where you write..."
                      className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-xs text-paper placeholder:text-paper-faint focus:border-neon focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-neon/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-paper-faint text-center sm:text-left">
                    No reading fees. We never charge writers to read their work.
                  </span>
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded bg-neon px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium text-ink hover:bg-neon/90 transition-all shadow-md"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Submit Work</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

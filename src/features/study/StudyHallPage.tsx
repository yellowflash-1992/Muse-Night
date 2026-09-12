import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Feather,
  FileText,
  GraduationCap,
  HelpCircle,
  Library,
  Lightbulb,
  Search,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

export function StudyHallPage() {
  const [activeTab, setActiveTab] = useState<"poetry" | "drama" | "prose" | "mcq">("poetry");
  const [search, setSearch] = useState("");

  const prescribedPoetry = [
    {
      title: "Black Woman (Femme Noire)",
      poet: "Léopold Sédar Senghor",
      origin: "African Poetry",
      themes: ["Négritude", "African Beauty", "Celebration of Mother Africa"],
      lines: "Naked woman, black woman / Clothed in your colour which is life...",
      analysisStatus: "Complete Stanza Breakdown",
      tag: "WAEC / JAMB Compulsory",
    },
    {
      title: "The Leader and the Led",
      poet: "Niyi Osundare",
      origin: "African Poetry",
      themes: ["Leadership Dilemma", "Animal Metaphors", "Political Satire"],
      lines: "The lion stakes his claim / To the open bough...",
      analysisStatus: "Stanza-by-Stanza & Figures of Speech",
      tag: "WAEC / JAMB Compulsory",
    },
    {
      title: "The Grieved Lands",
      poet: "Agostinho Neto",
      origin: "African Poetry",
      themes: ["Colonial Oppression", "Resilience", "Triumph of the Oppressed"],
      lines: "The grieved lands of Africa / In the tearful voice of ancient...",
      analysisStatus: "Themes & Poetic Devices",
      tag: "WAEC Prescribed",
    },
    {
      title: "The Journey of the Magi",
      poet: "T.S. Eliot",
      origin: "Non-African Poetry",
      themes: ["Spiritual Rebirth", "Alienation", "Painful Transition"],
      lines: "'A cold coming we had of it / Just the worst time of the year...'",
      analysisStatus: "Modernist Analysis & Symbolism",
      tag: "WAEC Prescribed",
    },
    {
      title: "Bat",
      poet: "D.H. Lawrence",
      origin: "Non-African Poetry",
      themes: ["Subjective Perception", "Grotesque Beauty", "Florence Sunset"],
      lines: "At evening, sitting on this terrace / When the sun from the west...",
      analysisStatus: "Tone & Diction Vetted",
      tag: "JAMB / WAEC",
    },
  ];

  const dramaTexts = [
    {
      title: "The Lion and the Jewel",
      playwright: "Wole Soyinka",
      type: "African Drama",
      focus: "Tradition vs. Western Modernity (Baroka vs. Lakunle)",
      guide: "Plot summaries, character appraisal essays, and exam context questions.",
    },
    {
      title: "Look Back in Anger",
      playwright: "John Osborne",
      type: "Non-African Drama",
      focus: "Angry Young Man era, post-war disillusionment, Jimmy Porter",
      guide: "Class conflicts, dramatic techniques, and soliloquy breakdowns.",
    },
    {
      title: "Fences",
      playwright: "August Wilson",
      type: "Non-African Drama",
      focus: "Troy Maxson, generational trauma, racial barriers",
      guide: "Act-by-act analysis, symbolic motifs of the fence.",
    },
  ];

  const literaryDevices = [
    {
      term: "Enjambment (Run-on Line)",
      desc: "Moving from one line to the next without a terminating punctuation mark, mimicking breath and momentum.",
    },
    {
      term: "Metonymy & Synecdoche",
      desc: "Using a related attribute ('the crown') or part for the whole ('fifty keels') to create concentrated poetic imagery.",
    },
    {
      term: "Apostrophe",
      desc: "Directly addressing an absent, dead, or abstract entity as though capable of reply (e.g. 'O Wild West Wind!').",
    },
    {
      term: "Paradox & Oxymoron",
      desc: "A seemingly self-contradictory statement that reveals a profound underlying truth.",
    },
  ];

  return (
    <div className="min-h-screen bg-ink text-paper selection:bg-neon selection:text-ink pt-24 pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Banner */}
        <div className="relative rounded-3xl border border-emerald-500/25 bg-gradient-to-br from-emerald-950/40 via-ink-2 to-ink p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />

          <div className="relative z-10 space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
              <GraduationCap className="h-4 w-4" />
              <span>Student Study Hall · 2026–2030 Syllabus</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-semibold text-paper leading-[1.1]">
              JAMB &amp; WAEC <br />
              <span className="italic font-light text-emerald-300">Literature-in-English Room</span>
            </h1>

            <p className="font-karla text-sm sm:text-base text-paper-dim leading-relaxed">
              Curated under single lamplight for secondary scholars and UTME candidates.
              Line-by-line poetic commentary, character appraisal frameworks, and high-scoring essay
              tactics.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/library"
                className="inline-flex items-center gap-2 rounded-xl bg-[#10B981] text-[#062419] px-4.5 py-2.5 text-xs font-bold tracking-wider shadow-md hover:bg-emerald-400 transition-all active:scale-95"
              >
                <BookOpen className="h-4 w-4" />
                <span>Browse Full Library Archive</span>
              </Link>
              <Link
                to="/request"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-500/10 text-emerald-200 px-4.5 py-2.5 text-xs font-semibold tracking-wider hover:bg-emerald-500/20 transition-all"
              >
                <HelpCircle className="h-4 w-4" />
                <span>Request Specific Poem Analysis</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-neon/15 pb-2 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab("poetry")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "poetry"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shadow-sm"
                : "text-paper-dim hover:text-paper hover:bg-neon/10"
            }`}
          >
            📜 Prescribed Poetry ({prescribedPoetry.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("drama")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "drama"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shadow-sm"
                : "text-paper-dim hover:text-paper hover:bg-neon/10"
            }`}
          >
            🎭 Drama Masterclasses ({dramaTexts.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("prose")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "prose"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shadow-sm"
                : "text-paper-dim hover:text-paper hover:bg-neon/10"
            }`}
          >
            🔍 Literary Devices &amp; Terms
          </button>
        </div>

        {/* Tab 1: Prescribed Poetry */}
        {activeTab === "poetry" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-2xl font-semibold text-paper">
                Syllabus Poetry Breakdown
              </h2>
              <span className="text-xs text-emerald-300/80 font-mono">Harmonized Curriculum</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prescribedPoetry.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-neon/15 bg-ink-2/80 p-5 space-y-3.5 shadow-md hover:border-emerald-400/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                        {item.origin}
                      </span>
                      <span className="text-[10px] font-mono text-paper-faint">{item.tag}</span>
                    </div>

                    <h3 className="font-display text-xl text-paper font-medium">“{item.title}”</h3>
                    <p className="text-xs text-neon/90 font-medium">By {item.poet}</p>

                    <p className="font-serif italic text-xs text-paper-dim border-l-2 border-emerald-400/40 pl-3 py-1">
                      {item.lines}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.themes.map((theme, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[9.5px] rounded-md bg-ink px-2 py-0.5 text-paper-faint border border-neon/10"
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neon/10 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      {item.analysisStatus}
                    </span>
                    <Link
                      to="/request"
                      className="text-paper-dim hover:text-neon underline text-[11px]"
                    >
                      Request Study Sheet &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Drama Texts */}
        {activeTab === "drama" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-2xl font-semibold text-paper">
                Prescribed Drama Texts
              </h2>
              <span className="text-xs text-emerald-300/80 font-mono">WAEC / UTME Literature</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dramaTexts.map((drama, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-neon/15 bg-ink-2/80 p-5 space-y-3 shadow-md hover:border-emerald-400/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                      {drama.type}
                    </span>
                    <h3 className="font-display text-xl text-paper font-medium">{drama.title}</h3>
                    <p className="text-xs text-neon/90 font-medium">By {drama.playwright}</p>
                    <p className="text-xs text-paper-dim leading-relaxed">{drama.focus}</p>
                    <p className="text-[11px] text-paper-faint italic">{drama.guide}</p>
                  </div>

                  <div className="pt-3 border-t border-neon/10">
                    <Link
                      to="/request"
                      className="inline-flex items-center gap-1 text-xs text-emerald-300 hover:underline"
                    >
                      <span>Request Character Appraisal</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Literary Devices */}
        {activeTab === "prose" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-2xl font-semibold text-paper">
                Essential Poetic Devices &amp; Figures of Speech
              </h2>
              <span className="text-xs text-emerald-300/80 font-mono">Exam High-Scoring Terms</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {literaryDevices.map((device, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-neon/15 bg-ink-2/80 p-5 space-y-2 shadow-md hover:border-emerald-400/40 transition-all"
                >
                  <h3 className="font-display text-lg text-emerald-300 font-medium">
                    {device.term}
                  </h3>
                  <p className="text-xs text-paper-dim leading-relaxed">{device.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Study Advice & Exam Strategy Callout */}
        <div className="rounded-2xl border border-neon/20 bg-ink-2 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-display text-2xl text-paper font-medium flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-400 shrink-0" />
              <span>Lamplit Study Principle for Candidates</span>
            </h3>
            <p className="text-xs sm:text-sm text-paper-dim leading-relaxed">
              In secondary and matriculation literature examinations, examiners reward candidate
              mastery of poetic device naming, thematic evidence cited directly from the stanza, and
              clear contextual structure.
            </p>
          </div>
          <Link
            to="/submit"
            className="inline-flex items-center gap-2 rounded-xl bg-neon px-5 py-3 text-xs font-bold uppercase tracking-wider text-ink shadow-md hover:bg-neon/90 shrink-0"
          >
            <span>Ask the Poets</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

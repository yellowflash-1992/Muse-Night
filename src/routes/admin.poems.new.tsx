import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { listLiteraryWorldsAdminFn, listPenNamesAdminFn } from "@/lib/admin/pen-names.functions";
import { createDraftPoemFn } from "@/lib/admin/poems.functions";

export const Route = createFileRoute("/admin/poems/new")({
  loader: async () => {
    const [penNames, worlds] = await Promise.all([
      listPenNamesAdminFn(),
      listLiteraryWorldsAdminFn(),
    ]);
    return { penNames, worlds };
  },
  component: NewPoemPage,
});

function NewPoemPage() {
  const { penNames, worlds } = Route.useLoaderData();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [penNameId, setPenNameId] = useState(penNames[0]?.id ?? "");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [tags, setTags] = useState("");
  const [form, setForm] = useState("Free Verse");
  const [literaryWorldId, setLiteraryWorldId] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [note, setNote] = useState("");
  const [stanzasText, setStanzasText] = useState("");
  const [featured, setFeatured] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent, publish: boolean) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const stanzas = stanzasText
        .trim()
        .split(/\n\s*\n/)
        .map((block) =>
          block
            .split("\n")
            .map((l) => l.trimEnd())
            .filter((l) => l.length > 0),
        )
        .filter((s) => s.length > 0);
      const poem = await createDraftPoemFn({
        data: {
          title,
          penNameId,
          year,
          tags: tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          stanzas,
          collectionId: collectionId || null,
          literaryWorldId: literaryWorldId || null,
          note: note || null,
          form,
          featured,
        },
      });
      if (publish) {
        const { publishPoemFn } = await import("@/lib/admin/poems.functions");
        await publishPoemFn({ data: poem.id });
      }
      navigate({ to: "/admin/poems" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="space-y-4 max-w-3xl">
      <h2 className="font-display text-2xl text-paper">New Poem</h2>
      {error && <p className="text-rose-400 text-sm">{error}</p>}
      <div>
        <label className="block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1">
          Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1">
            Pen name
          </label>
          <select
            value={penNameId}
            onChange={(e) => setPenNameId(e.target.value)}
            className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper"
          >
            {penNames.map((pn) => (
              <option key={pn.id} value={pn.id}>
                {pn.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1">
            Year
          </label>
          <input
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1">
            Tags (comma)
          </label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1">
            Form
          </label>
          <input
            value={form}
            onChange={(e) => setForm(e.target.value)}
            className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1">
            Literary world
          </label>
          <select
            value={literaryWorldId}
            onChange={(e) => setLiteraryWorldId(e.target.value)}
            className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper"
          >
            <option value="">—</option>
            {worlds.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1">
            Collection ID
          </label>
          <input
            value={collectionId}
            onChange={(e) => setCollectionId(e.target.value)}
            className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1">
          Note
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper"
        />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1">
          Stanzas (blank line separates stanzas)
        </label>
        <textarea
          value={stanzasText}
          onChange={(e) => setStanzasText(e.target.value)}
          rows={12}
          required
          className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper font-serif"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          id="featured"
        />
        <label htmlFor="featured" className="text-xs text-paper-dim">
          Featured
        </label>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={saving}
          onClick={(e) => handleSubmit(e as unknown as React.FormEvent, false)}
          className="rounded bg-ink border border-neon/30 px-4 py-2 text-xs uppercase tracking-[0.16em] text-paper hover:bg-neon/10 disabled:opacity-50"
        >
          Save Draft
        </button>
        <button
          type="button"
          disabled={saving}
          onClick={(e) => handleSubmit(e as unknown as React.FormEvent, true)}
          className="rounded bg-neon px-4 py-2 text-xs uppercase tracking-[0.16em] font-bold text-ink hover:bg-neon/90 disabled:opacity-50"
        >
          Publish
        </button>
      </div>
    </form>
  );
}

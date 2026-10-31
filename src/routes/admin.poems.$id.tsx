import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { listLiteraryWorldsAdminFn, listPenNamesAdminFn } from "@/lib/admin/pen-names.functions";
import { getAdminPoemFn, updatePoemFn } from "@/lib/admin/poems.functions";

export const Route = createFileRoute("/admin/poems/$id")({
  loader: async ({ params }) => {
    const [poem, penNames, worlds] = await Promise.all([
      getAdminPoemFn({ data: params.id }),
      listPenNamesAdminFn(),
      listLiteraryWorldsAdminFn(),
    ]);
    return { poem, penNames, worlds };
  },
  component: EditPoemPage,
});

function EditPoemPage() {
  const { poem, penNames, worlds } = Route.useLoaderData();
  const navigate = useNavigate();
  const [title, setTitle] = useState(poem?.title ?? "");
  const [penNameId, setPenNameId] = useState(poem?.penNameId ?? penNames[0]?.id ?? "");
  const [year, setYear] = useState(poem?.year ?? "");
  const [tags, setTags] = useState((poem?.tags ?? []).join(", "));
  const [form, setForm] = useState(poem?.form ?? "Free Verse");
  const [literaryWorldId, setLiteraryWorldId] = useState(poem?.literaryWorldId ?? "");
  const [collectionId, setCollectionId] = useState(poem?.collectionId ?? "");
  const [note, setNote] = useState(poem?.note ?? "");
  const [featured, setFeatured] = useState(poem?.featured ?? false);
  const [stanzasText, setStanzasText] = useState(
    Array.isArray(poem?.stanzas)
      ? (poem.stanzas as string[][]).map((s) => s.join("\n")).join("\n\n")
      : "",
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!poem) setError("Poem not found");
  }, [poem]);

  const handleSave = async () => {
    if (!poem) return;
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
      await updatePoemFn({
        data: {
          id: poem.id,
          input: {
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
        },
      });
      navigate({ to: "/admin/poems" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (!poem) return <p className="text-paper-dim">Poem not found.</p>;

  return (
    <div className="space-y-4 max-w-3xl">
      <h2 className="font-display text-2xl text-paper">Edit Poem</h2>
      {error && <p className="text-rose-400 text-sm">{error}</p>}
      <div>
        <label className="block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1">
          Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
      <button
        type="button"
        disabled={saving}
        onClick={handleSave}
        className="rounded bg-neon px-4 py-2 text-xs uppercase tracking-[0.16em] font-bold text-ink hover:bg-neon/90 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}

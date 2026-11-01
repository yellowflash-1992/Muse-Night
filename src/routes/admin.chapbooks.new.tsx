import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { createChapbookFn, publishChapbookFn } from "@/lib/admin/chapbooks.functions";
import { listPenNamesAdminFn } from "@/lib/admin/pen-names.functions";

export const Route = createFileRoute("/admin/chapbooks/new")({
  loader: async () => {
    const penNames = await listPenNamesAdminFn();
    return { penNames };
  },
  component: NewChapbookPage,
});

function NewChapbookPage() {
  const { penNames } = Route.useLoaderData();
  const navigate = useNavigate();

  const allowed = penNames.filter((pn) => pn.name === "Irshand" || pn.name === "InkbyNur");

  const [title, setTitle] = useState("");
  const [penNameId, setPenNameId] = useState(allowed[0]?.id ?? "");
  const [description, setDescription] = useState("");
  const [quote, setQuote] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [sortOrder, setSortOrder] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent, publish: boolean) => {
    e.preventDefault();
    setError(null);
    if (allowed.length === 0) {
      setError("No allowed pen names found. Irshand and InkbyNur must exist in the database.");
      return;
    }
    setSaving(true);
    try {
      const chapbook = await createChapbookFn({
        data: {
          title,
          authorId: penNameId,
          description,
          quote,
          coverImage,
          price,
          year,
          sortOrder,
        },
      });
      if (publish) {
        await publishChapbookFn({ data: chapbook.id });
      }
      navigate({ to: "/admin/chapbooks" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="space-y-4 max-w-3xl">
      <h2 className="font-display text-2xl text-paper">New Chapbook</h2>
      {error && <p className="text-rose-400 text-sm">{error}</p>}
      {allowed.length === 0 && (
        <p className="text-rose-400 text-sm">
          No allowed pen names found. Irshand and InkbyNur must exist in the database.
        </p>
      )}
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
      <div>
        <label className="block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1">
          Pen name
        </label>
        <select
          value={penNameId}
          onChange={(e) => setPenNameId(e.target.value)}
          className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper"
        >
          {allowed.map((pn) => (
            <option key={pn.id} value={pn.id}>
              {pn.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
          className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper"
        />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1">
          Quote
        </label>
        <input
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          required
          className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper"
        />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1">
          Cover Image URL
        </label>
        <input
          type="text"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          placeholder="https://..."
          required
          className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper"
        />
        <p className="mt-1 text-[10px] text-paper-faint">
          Paste a public image URL (Supabase Storage, Imgur, Cloudinary, etc). Aspect ratio: 4:5
          works best.
        </p>
        {coverImage ? (
          <div className="mt-2 overflow-hidden rounded-lg border border-neon/20 bg-ink-3 aspect-[4/5] w-32">
            <img
              src={coverImage}
              alt="Cover preview"
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.opacity = "0.3";
              }}
            />
          </div>
        ) : (
          <div className="mt-2 flex items-center justify-center rounded-lg border border-dashed border-neon/20 bg-ink-3 aspect-[4/5] w-32 text-[10px] uppercase tracking-[0.16em] text-paper-faint">
            No cover yet
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1">
            Price
          </label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="£18.00"
            required
            className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper"
          />
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
      <div>
        <label className="block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1">
          Sort Order
        </label>
        <input
          type="number"
          value={sortOrder}
          onChange={(e) => setSortOrder(Number(e.target.value))}
          className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper"
        />
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

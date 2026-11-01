import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { getAdminCollectionFn, updateCollectionFn } from "@/lib/admin/collections.functions";
import { listPenNamesAdminFn } from "@/lib/admin/pen-names.functions";

export const Route = createFileRoute("/admin/collections/$id")({
  loader: async ({ params }) => {
    const [collection, penNames] = await Promise.all([
      getAdminCollectionFn({ data: params.id }),
      listPenNamesAdminFn(),
    ]);
    return { collection, penNames };
  },
  component: EditCollectionPage,
});

function EditCollectionPage() {
  const { collection, penNames } = Route.useLoaderData();
  const navigate = useNavigate();

  const allowed = penNames.filter((pn) => pn.name === "Irshand" || pn.name === "InkbyNur");

  const [title, setTitle] = useState(collection?.title ?? "");
  const [subtitle, setSubtitle] = useState(collection?.subtitle ?? "");
  const [penNameId, setPenNameId] = useState(collection?.authorId ?? allowed[0]?.id ?? "");
  const [year, setYear] = useState(collection?.year ?? "");
  const [description, setDescription] = useState(collection?.description ?? "");
  const [foreword, setForeword] = useState(collection?.foreword ?? "");
  const [featuredQuote, setFeaturedQuote] = useState(collection?.featuredQuote ?? "");
  const [coverImage, setCoverImage] = useState(collection?.coverImage ?? "");
  const [tags, setTags] = useState((collection?.tags ?? []).join(", "));
  const [sortOrder, setSortOrder] = useState(collection?.sortOrder ?? 0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!collection) setError("Collection not found");
  }, [collection]);

  const handleSave = async () => {
    if (!collection) return;
    setError(null);
    setSaving(true);
    try {
      await updateCollectionFn({
        data: {
          id: collection.id,
          input: {
            title,
            subtitle: subtitle || null,
            description,
            foreword: foreword || null,
            featuredQuote: featuredQuote || null,
            coverImage: coverImage || null,
            authorId: penNameId,
            year,
            tags: tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean),
            sortOrder,
          },
        },
      });
      navigate({ to: "/admin/collections" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (!collection) return <p className="text-paper-dim">Collection not found.</p>;

  return (
    <div className="space-y-4 max-w-3xl">
      <h2 className="font-display text-2xl text-paper">Edit Collection</h2>
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
          className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper"
        />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1">
          Subtitle
        </label>
        <input
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
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
      <div className="grid grid-cols-2 gap-4">
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
      </div>
      <div>
        <label className="block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper"
        />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1">
          Foreword
        </label>
        <textarea
          value={foreword}
          onChange={(e) => setForeword(e.target.value)}
          rows={6}
          className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper"
        />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-[0.16em] text-paper-dim mb-1">
          Featured Quote
        </label>
        <input
          value={featuredQuote}
          onChange={(e) => setFeaturedQuote(e.target.value)}
          className="w-full rounded bg-ink border border-neon/20 px-3 py-2 text-sm text-paper"
        />
      </div>
    </div>
  );
}

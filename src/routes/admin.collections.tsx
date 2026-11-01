import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";

import {
  archiveCollectionFn,
  deleteCollectionFn,
  listAdminCollectionsFn,
  publishCollectionFn,
} from "@/lib/admin/collections.functions";

export const Route = createFileRoute("/admin/collections")({
  loader: async () => listAdminCollectionsFn(),
  component: AdminCollectionsPage,
});

function AdminCollectionsPage() {
  // 1. Hook up the live data returned by your loader function
  const collections = Route.useLoaderData();
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleAction = async (id: string, actionFn: (args: { data: string }) => Promise<any>) => {
    try {
      setLoadingId(id);
      await actionFn({ data: id });
      // 2. Refresh TanStack router context instead of a hard browser window reload
      await router.invalidate();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Action failed");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-2xl text-paper">Collections</h2>
        <Link
          to="/admin/collections/new"
          className="rounded bg-neon px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-ink"
        >
          New Collection
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neon/10 text-left text-[10px] uppercase tracking-[0.16em] text-paper-faint">
              <th className="py-2">Title</th>
              <th className="py-2">Author</th>
              <th className="py-2">Year</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {collections?.map((c) => (
              <tr key={c.id} className="border-b border-neon/5">
                <td className="py-2 text-paper">{c.title}</td>
                {/* 3. Adapting to database models: maps author relationship name if nested, or authorId string fallback */}
                <td className="py-2 text-paper-dim">{c.author?.name || c.authorId || "Unknown"}</td>
                <td className="py-2 text-paper-dim">{c.year}</td>
                <td className="py-2 text-paper-dim">
                  <span
                    className={`inline-block px-1.5 py-0.5 text-[10px] font-bold rounded ${
                      c.status === "PUBLISHED"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : c.status === "ARCHIVED"
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-paper-dim/10 text-paper-dim"
                    }`}
                  >
                    {c.status || "DRAFT"}
                  </span>
                </td>
                <td className="py-2 flex gap-2 items-center">
                  <Link
                    to="/admin/collections/$id"
                    params={{ id: c.id }}
                    className="text-neon hover:underline text-xs"
                    disabled={loadingId === c.id}
                  >
                    Edit
                  </Link>
                  {c.status !== "PUBLISHED" && (
                    <button
                      type="button"
                      disabled={loadingId !== null}
                      className="text-emerald-400 hover:underline text-xs disabled:opacity-50"
                      onClick={() => handleAction(c.id, publishCollectionFn)}
                    >
                      Publish
                    </button>
                  )}
                  {c.status !== "ARCHIVED" && (
                    <button
                      type="button"
                      disabled={loadingId !== null}
                      className="text-amber-400 hover:underline text-xs disabled:opacity-50"
                      onClick={() => handleAction(c.id, archiveCollectionFn)}
                    >
                      Archive
                    </button>
                  )}
                  <button
                    type="button"
                    disabled={loadingId !== null}
                    className="text-rose-400 hover:underline text-xs disabled:opacity-50"
                    onClick={() => {
                      if (confirm("Delete collection?")) {
                        handleAction(c.id, deleteCollectionFn);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {(!collections || collections.length === 0) && (
              <tr>
                <td colSpan={5} className="py-4 text-center text-paper-dim">
                  No collections found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

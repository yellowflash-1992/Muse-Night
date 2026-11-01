import { createFileRoute, Link } from "@tanstack/react-router";

import {
  archiveChapbookFn,
  deleteChapbookFn,
  listChapbooksAdminFn,
  publishChapbookFn,
} from "@/lib/admin/chapbooks.functions";

export const Route = createFileRoute("/admin/chapbooks")({
  loader: async () => listChapbooksAdminFn(),
  component: AdminChapbooksPage,
});

function AdminChapbooksPage() {
  const chapbooks = Route.useLoaderData();
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-2xl text-paper">Chapbooks</h2>
        <Link
          to="/admin/chapbooks/new"
          className="rounded bg-neon px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-ink"
        >
          New Chapbook
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neon/10 text-left text-[10px] uppercase tracking-[0.16em] text-paper-faint">
              <th className="py-2">Title</th>
              <th className="py-2">Author</th>
              <th className="py-2">Year</th>
              <th className="py-2">Price</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {chapbooks.map((c) => (
              <tr key={c.id} className="border-b border-neon/5">
                <td className="py-2 text-paper">{c.title}</td>
                <td className="py-2 text-paper-dim">{c.authorId}</td>
                <td className="py-2 text-paper-dim">{c.year}</td>
                <td className="py-2 text-paper-dim">{c.price}</td>
                <td className="py-2 text-paper-dim">{c.status}</td>
                <td className="py-2 flex gap-2">
                  <Link
                    to="/admin/chapbooks/$id"
                    params={{ id: c.id }}
                    className="text-neon hover:underline text-xs"
                  >
                    Edit
                  </Link>
                  {c.status !== "PUBLISHED" && (
                    <button
                      type="button"
                      className="text-emerald-400 hover:underline text-xs"
                      onClick={async () => {
                        await publishChapbookFn({ data: c.id });
                        window.location.reload();
                      }}
                    >
                      Publish
                    </button>
                  )}
                  {c.status !== "ARCHIVED" && (
                    <button
                      type="button"
                      className="text-amber-400 hover:underline text-xs"
                      onClick={async () => {
                        await archiveChapbookFn({ data: c.id });
                        window.location.reload();
                      }}
                    >
                      Archive
                    </button>
                  )}
                  <button
                    type="button"
                    className="text-rose-400 hover:underline text-xs"
                    onClick={async () => {
                      if (confirm("Delete chapbook?")) {
                        await deleteChapbookFn({ data: c.id });
                        window.location.reload();
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

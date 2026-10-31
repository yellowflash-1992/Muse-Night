import { createFileRoute, Link } from "@tanstack/react-router";

import { deletePoemFn, listAdminPoemsFn, publishPoemFn } from "@/lib/admin/poems.functions";

export const Route = createFileRoute("/admin/poems")({
  loader: async () => listAdminPoemsFn(),
  component: AdminPoemsPage,
});

function AdminPoemsPage() {
  const poems = Route.useLoaderData();
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-2xl text-paper">Poems</h2>
        <Link
          to="/admin/poems/new"
          className="rounded bg-neon px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-ink"
        >
          New Poem
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neon/10 text-left text-[10px] uppercase tracking-[0.16em] text-paper-faint">
              <th className="py-2">Title</th>
              <th className="py-2">Pen name</th>
              <th className="py-2">Status</th>
              <th className="py-2">Year</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {poems.map((p) => (
              <tr key={p.id} className="border-b border-neon/5">
                <td className="py-2 text-paper">{p.title}</td>
                <td className="py-2 text-paper-dim">{p.penName?.name ?? p.penNameId}</td>
                <td className="py-2 text-paper-dim">{p.status}</td>
                <td className="py-2 text-paper-dim">{p.year}</td>
                <td className="py-2 flex gap-2">
                  <Link
                    to="/admin/poems/$id"
                    params={{ id: p.id }}
                    className="text-neon hover:underline text-xs"
                  >
                    Edit
                  </Link>
                  {p.status !== "PUBLISHED" && (
                    <button
                      type="button"
                      className="text-emerald-400 hover:underline text-xs"
                      onClick={async () => {
                        await publishPoemFn({ data: p.id });
                        window.location.reload();
                      }}
                    >
                      Publish
                    </button>
                  )}
                  <button
                    type="button"
                    className="text-rose-400 hover:underline text-xs"
                    onClick={async () => {
                      if (confirm("Delete poem?")) {
                        await deletePoemFn({ data: p.id });
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

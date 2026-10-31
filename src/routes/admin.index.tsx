import { createFileRoute } from "@tanstack/react-router";

import { getAdminStatsFn } from "@/lib/admin/stats.functions";

export const Route = createFileRoute("/admin/")({
  loader: async () => getAdminStatsFn(),
  component: AdminDashboard,
});

function AdminDashboard() {
  const stats = Route.useLoaderData();
  const cards = [
    { label: "Poems (total)", value: stats.poemsTotal },
    { label: "Poems (draft)", value: stats.poemsDraft },
    { label: "Poems (published)", value: stats.poemsPublished },
    { label: "Collections", value: stats.collectionsTotal },
    { label: "Chapbooks", value: stats.chapbooksTotal },
    { label: "Gallery items", value: stats.galleryTotal },
    { label: "Quotes", value: stats.quotesTotal },
    { label: "Submissions (new)", value: stats.submissionsNew },
    { label: "Submissions (total)", value: stats.submissionsTotal },
    { label: "Access requests (pending)", value: stats.accessPending },
    { label: "Persons", value: stats.personsTotal },
    { label: "Pen names", value: stats.penNamesTotal },
  ];
  return (
    <div>
      <h2 className="mb-6 font-display text-2xl text-paper">Dashboard</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border border-neon/15 bg-ink-2 p-4">
            <p className="text-[10px] uppercase tracking-[0.18em] text-paper-faint">{c.label}</p>
            <p className="mt-2 font-display text-3xl text-neon">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

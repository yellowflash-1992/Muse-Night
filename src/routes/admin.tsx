import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { isAdminFn } from "@/lib/admin/auth.functions";

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => {
    const isAdmin = await isAdminFn();
    if (!isAdmin) {
      throw redirect({ to: "/" });
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className="min-h-screen bg-ink text-paper">
      <div className="mx-auto max-w-[1280px] px-6 py-8">
        <header className="mb-8 border-b border-neon/10 pb-4">
          <h1 className="font-display text-3xl text-paper">Muse Night Admin</h1>
          <nav className="mt-3 flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em]">
            <a href="/admin" className="text-neon hover:underline">
              Dashboard
            </a>
            <a href="/admin/poems" className="text-paper-dim hover:text-neon">
              Poems
            </a>
            <a href="/admin/collections" className="text-paper-dim hover:text-neon">
              Collections
            </a>
            <a href="/admin/chapbooks" className="text-paper-dim hover:text-neon">
              Chapbooks
            </a>
            <a href="/admin/gallery" className="text-paper-dim hover:text-neon">
              Gallery
            </a>
            <a href="/admin/quotes" className="text-paper-dim hover:text-neon">
              Quotes
            </a>
            <a href="/admin/submissions" className="text-paper-dim hover:text-neon">
              Submissions
            </a>
            <a href="/admin/access-requests" className="text-paper-dim hover:text-neon">
              Access Requests
            </a>
          </nav>
        </header>
        <Outlet />
      </div>
    </div>
  );
}

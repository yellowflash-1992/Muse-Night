import { COLLECTIONS } from "@/data/literature";
import { Link, getRouteApi } from "@tanstack/react-router";

const routeApi = getRouteApi("/");

export function MobileStatsBar() {
  // Pull the live poems and chapbooks from the route loader
  const { poems, chapbooks } = routeApi.useLoaderData();

  return (
    <section className="border-y border-neon/15 bg-ink-2/90 px-4 py-4">
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        <Link to="/library" className="flex flex-col items-center">
          <span className="font-display text-lg font-medium text-neon">{poems.length}</span>
          <span className="text-[10px] uppercase tracking-[0.12em] text-paper-dim">Works</span>
        </Link>
        <Link to="/collections" className="flex flex-col items-center">
          <span className="font-display text-lg font-medium text-amber-300">
            {COLLECTIONS.length}
          </span>
          <span className="text-[10px] uppercase tracking-[0.12em] text-paper-dim">Suites</span>
        </Link>
        <Link to="/books" className="flex flex-col items-center">
          <span className="font-display text-lg font-medium text-rose-300">{chapbooks.length}</span>
          <span className="text-[10px] uppercase tracking-[0.12em] text-paper-dim">Books</span>
        </Link>
        <Link to="/about" className="flex flex-col items-center">
          <span className="font-display text-lg font-medium text-paper">2</span>
          <span className="text-[10px] uppercase tracking-[0.12em] text-paper-dim">Poets</span>
        </Link>
      </div>
    </section>
  );
}

import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({
  page,
  totalPages,
  total,
  perPage,
  onChange,
}: {
  page: number;
  totalPages: number;
  total: number;
  perPage: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages: (number | "…")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }

  return (
    <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-neon/10 pt-6">
      <p className="text-xs uppercase tracking-[0.16em] text-paper-faint">
        Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, total)} of {total}
      </p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
          className="grid size-9 place-items-center rounded border border-neon/20 text-paper-dim hover:text-paper hover:border-neon/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="size-4" />
        </button>
        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`e${i}`} className="px-2 text-xs text-paper-faint">
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onChange(p)}
              aria-current={p === page ? "page" : undefined}
              className={`min-w-9 h-9 px-2 rounded text-xs uppercase tracking-[0.1em] transition-colors ${
                p === page
                  ? "bg-neon text-ink font-medium"
                  : "border border-neon/20 text-paper-dim hover:text-paper hover:border-neon/40"
              }`}
            >
              {p}
            </button>
          ),
        )}
        <button
          type="button"
          onClick={() => onChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
          className="grid size-9 place-items-center rounded border border-neon/20 text-paper-dim hover:text-paper hover:border-neon/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

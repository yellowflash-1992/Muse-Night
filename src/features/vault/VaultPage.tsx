import { Link } from "@tanstack/react-router";
import { Bookmark, Plus } from "lucide-react";

export function VaultPage() {
  const saved = (() => {
    try {
      const raw = localStorage.getItem("muse-vault-poems");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  })();

  return (
    <div className="min-h-screen bg-ink text-paper px-6 py-14">
      <div className="mx-auto max-w-md">
        <h1 className="font-display text-3xl text-paper mb-1">Your vault</h1>
        <p className="text-sm text-paper-dim mb-10">
          {saved.length === 0
            ? "Nothing saved yet."
            : `${saved.length} poem${saved.length === 1 ? "" : "s"} you've kept`}
        </p>

        {saved.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-neon/20 rounded-2xl">
            <Bookmark className="w-8 h-8 text-paper-faint mx-auto mb-4" strokeWidth={1.5} />
            <p className="text-sm text-paper-dim mb-1">Your vault is empty</p>
            <p className="text-xs text-paper-faint mb-6">Tap save on any poem to keep it here</p>
            <Link
              to="/library"
              className="inline-flex items-center gap-2 rounded-full bg-neon px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-ink hover:bg-neon/90 transition"
            >
              <Plus className="h-3.5 w-3.5" />
              Browse poems
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {saved.map(
              (p: { id: string; title: string; author: string; mood?: string; line?: string }) => (
                <div
                  key={p.id}
                  className="rounded-xl border border-neon/15 bg-ink-2 p-5 hover:border-neon/40 transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display text-lg text-paper">{p.title}</span>
                    {p.mood && (
                      <span className="text-[10px] uppercase tracking-wide text-neon bg-neon/10 px-2 py-0.5 rounded-full">
                        {p.mood}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-paper-dim mb-3">by {p.author}</p>
                  {p.line && (
                    <p className="font-display italic text-sm text-paper-dim leading-relaxed">
                      &ldquo;{p.line}&rdquo;
                    </p>
                  )}
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}

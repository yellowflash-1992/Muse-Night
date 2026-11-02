import { Link } from "@tanstack/react-router";
import { Bookmark, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { MemberGate } from "@/lib/auth/MemberGate";
import { MEMBER_FEATURES } from "@/lib/auth/memberFeatures";
import { getSavedPoemsFn, toggleSavePoemFn, type SavedPoemData } from "@/lib/vault.functions";

export function VaultPage() {
  return (
    <MemberGate feature={MEMBER_FEATURES.vault}>
      <VaultContent />
    </MemberGate>
  );
}

function VaultContent() {
  const [savedPoems, setSavedPoems] = useState<SavedPoemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSavedPoemsFn()
      .then(setSavedPoems)
      .catch((loadError: unknown) => {
        console.error("Failed to load saved poems", loadError);
        setError("Your vault could not be loaded. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  const removePoem = async (poemId: string) => {
    try {
      await toggleSavePoemFn({ data: poemId });
      setSavedPoems((current) => current.filter((saved) => saved.poemId !== poemId));
    } catch (removeError) {
      console.error("Failed to remove saved poem", removeError);
      setError("That poem could not be removed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-ink text-paper px-6 py-14">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl text-paper mb-1">Your vault</h1>

        <p className="text-sm text-paper-dim mb-10">
          {loading
            ? "Opening your vault..."
            : savedPoems.length === 0
              ? "Nothing saved yet."
              : `${savedPoems.length} poem${savedPoems.length === 1 ? "" : "s"} you've kept`}
        </p>

        {error && (
          <p
            role="alert"
            className="mb-6 rounded border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300"
          >
            {error}
          </p>
        )}

        {!loading && savedPoems.length === 0 ? (
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
          <div className="grid gap-4 sm:grid-cols-2">
            {savedPoems.map((poem) => (
              <article
                key={poem.id}
                className="rounded-xl border border-neon/15 bg-ink-2 p-5 hover:border-neon/40 transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <Link
                    to="/library/$id"
                    params={{ id: poem.poemId }}
                    className="font-display text-lg text-paper hover:text-neon"
                  >
                    {poem.title}
                  </Link>
                  <button
                    type="button"
                    onClick={() => void removePoem(poem.poemId)}
                    aria-label={`Remove ${poem.title} from Vault`}
                    className="shrink-0 rounded p-1 text-paper-faint transition hover:bg-red-500/10 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-1 text-xs text-paper-dim">
                  by {poem.author} · {poem.year}
                </p>
                {poem.excerpt && (
                  <p className="mt-3 line-clamp-3 font-display text-sm italic leading-relaxed text-paper-dim">
                    &ldquo;{poem.excerpt}&rdquo;
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

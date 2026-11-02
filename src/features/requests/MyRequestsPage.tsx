import { Link } from "@tanstack/react-router";
import { BookOpen, Clock, Feather } from "lucide-react";
import { useEffect, useState } from "react";

import { MemberGate } from "@/components/auth/MemberGate";
import { MEMBER_FEATURES } from "@/lib/auth/memberFeatures";
import { getMyRequestsFn, type MyPoemRequest } from "@/lib/requests.functions";

export function MyRequestsPage() {
  return (
    <MemberGate feature={MEMBER_FEATURES.poemRequests}>
      <MyRequestsContent />
    </MemberGate>
  );
}

function MyRequestsContent() {
  const [requests, setRequests] = useState<MyPoemRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMyRequestsFn()
      .then(setRequests)
      .catch((loadError: unknown) => {
        console.error("Failed to load poem requests", loadError);
        setError("Your requests could not be loaded. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-ink px-6 py-14 text-paper">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 border-b border-neon/10 pb-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-neon">
            <Feather className="h-4 w-4" />
            Your commissions
          </div>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl">My Requests</h1>
          <p className="mt-2 text-sm text-paper-dim">
            Follow the progress of the poems you&apos;ve requested.
          </p>
        </div>

        {error && (
          <p
            role="alert"
            className="mb-6 rounded border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300"
          >
            {error}
          </p>
        )}

        {loading ? (
          <p className="py-12 text-center text-sm text-paper-dim">Loading your requests...</p>
        ) : requests.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neon/20 py-16 text-center">
            <Feather className="mx-auto mb-4 h-8 w-8 text-paper-faint" strokeWidth={1.5} />
            <p className="text-sm text-paper-dim">You haven&apos;t requested a poem yet.</p>
            <Link
              to="/request"
              className="mt-6 inline-flex rounded-full bg-neon px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-ink transition hover:bg-neon/90"
            >
              Request a poem
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => {
              const status = request.status.toUpperCase();
              const completed = status === "COMPLETED";
              const statusLabel =
                status === "IN_PROGRESS"
                  ? "In Progress"
                  : status.charAt(0) + status.slice(1).toLowerCase();

              return (
                <article
                  key={request.id}
                  className="rounded-2xl border border-neon/15 bg-ink-2 p-5 sm:p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="font-display text-xl text-paper">{request.occasion}</h2>
                      <p className="mt-1 text-sm text-paper-dim">Tone: {request.tone}</p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.15em] ${
                        completed
                          ? "border-neon/40 bg-neon/10 text-neon"
                          : "border-neon/15 bg-ink text-paper-dim"
                      }`}
                    >
                      {!completed && <Clock className="h-3 w-3" />}
                      {statusLabel}
                    </span>
                  </div>

                  {completed && (
                    <div className="mt-5 rounded-xl border border-neon/30 bg-neon/5 p-4">
                      <div className="flex items-center gap-2 font-display text-lg text-neon">
                        <BookOpen className="h-5 w-5" />
                        Your custom poem is ready!
                      </div>
                      {request.adminResponse && (
                        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-paper-dim">
                          {request.adminResponse}
                        </p>
                      )}
                      {request.deliveredPoemId && (
                        <Link
                          to="/library/$id"
                          params={{ id: request.deliveredPoemId }}
                          className="mt-4 inline-flex rounded bg-neon px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-ink transition hover:bg-neon/90"
                        >
                          Read your poem
                        </Link>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

import { Link } from "@tanstack/react-router";
import { ArrowRight, Send } from "lucide-react";

export function MobileSubmitCallout() {
  return (
    <section className="border-t border-neon/10 px-5 py-10 text-center space-y-4 bg-ink-2">
      <div className="inline-flex items-center gap-1.5 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-neon">
        <Send className="h-3 w-3" />
        <span>Call for Poetry</span>
      </div>
      <h3 className="font-display text-2xl font-medium text-paper">Do You Write by Lamplight?</h3>
      <p className="text-xs text-paper-dim leading-relaxed max-w-xs mx-auto">
        We welcome standalone poems and chapbook manuscripts. No reading fees.
      </p>
      <Link
        to="/submit"
        className="inline-flex items-center gap-2 rounded-full bg-neon px-6 py-2.5 text-xs uppercase tracking-[0.18em] font-medium text-ink shadow-md active:scale-95 transition-all"
      >
        <span>Submit Your Work</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </section>
  );
}

import { Filter } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type PoetFilterOption = {
  id: string;
  penName: string;
};

type PoeticForm = {
  label: string;
  detail: string;
};

type LibraryFiltersSheetProps = {
  filtersOpen: boolean;
  setFiltersOpen: Dispatch<SetStateAction<boolean>>;
  selectedAuthor: string;
  setSelectedAuthor: Dispatch<SetStateAction<string>>;
  selectedTag: string;
  setSelectedTag: Dispatch<SetStateAction<string>>;
  selectedForm: string;
  setSelectedForm: Dispatch<SetStateAction<string>>;
  allTags: string[];
  poeticForms: readonly PoeticForm[];
  poets: Record<string, PoetFilterOption>;
  totalPoems: number;
};

export function LibraryFiltersSheet({
  filtersOpen,
  setFiltersOpen,
  selectedAuthor,
  setSelectedAuthor,
  selectedTag,
  setSelectedTag,
  selectedForm,
  setSelectedForm,
  allTags,
  poeticForms,
  poets,
  totalPoems,
}: LibraryFiltersSheetProps) {
  return (
    <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-neon/20 bg-ink-2 px-4 py-2 text-xs uppercase tracking-[0.16em] text-paper transition-colors hover:border-neon/40"
        >
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="max-h-[85vh] overflow-y-auto rounded-t-2xl border-neon/20 bg-ink-2 px-5 pb-6 pt-5 text-paper"
      >
        <SheetHeader className="text-left">
          <SheetTitle className="font-display text-2xl text-paper">Filters</SheetTitle>
          <SheetDescription className="text-paper-dim">
            Refine the archive by author, theme, or form.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-7">
          <section className="space-y-3">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-paper-faint font-medium font-karla">
              Authors
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedAuthor("all")}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs uppercase tracking-[0.16em] transition-all shrink-0 ${
                  selectedAuthor === "all"
                    ? "bg-neon text-ink font-medium shadow-sm"
                    : "bg-ink-2 text-paper-dim hover:text-paper border border-neon/10"
                }`}
              >
                All Works ({totalPoems})
              </button>
              {Object.values(poets).map((poet) => (
                <button
                  key={poet.id}
                  type="button"
                  onClick={() => setSelectedAuthor(poet.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-xs uppercase tracking-[0.16em] transition-all shrink-0 ${
                    selectedAuthor === poet.id
                      ? "bg-neon text-ink font-medium shadow-sm"
                      : "bg-ink-2 text-paper-dim hover:text-paper border border-neon/10"
                  }`}
                >
                  {poet.penName}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-paper-faint font-medium font-karla">
              Forms
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedForm("all")}
                className={`max-w-full min-w-0 whitespace-normal break-words px-3 py-1 rounded-full text-xs transition-colors shrink-0 cursor-pointer ${
                  selectedForm === "all"
                    ? "bg-amber-400/20 text-amber-300 border border-amber-400/40 font-medium shadow-sm"
                    : "text-paper-dim hover:text-paper bg-ink-2 border border-transparent"
                }`}
              >
                All Forms
              </button>
              {poeticForms.map((form) => (
                <button
                  key={form.label}
                  type="button"
                  onClick={() => setSelectedForm(form.label)}
                  className={`max-w-full min-w-0 whitespace-normal break-words px-3 py-1 rounded-full text-xs transition-colors shrink-0 cursor-pointer flex items-center gap-1.5 ${
                    selectedForm === form.label
                      ? "bg-amber-400/20 text-amber-300 border border-amber-400/40 font-medium shadow-sm"
                      : "text-paper-dim hover:text-paper bg-ink-2 border border-transparent"
                  }`}
                >
                  <span>{form.label}</span>
                  <span className="text-[9.5px] font-mono text-paper-faint/80">
                    ({form.detail})
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-paper-faint font-medium font-karla">
              Themes
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedTag("all")}
                className={`max-w-full min-w-0 whitespace-normal break-words px-3 py-1 rounded-full text-xs transition-colors shrink-0 cursor-pointer ${
                  selectedTag === "all"
                    ? "bg-neon/15 text-neon border border-neon/30 font-medium"
                    : "text-paper-dim hover:text-paper bg-ink-2 border border-transparent"
                }`}
              >
                All Themes
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`max-w-full min-w-0 whitespace-normal break-words px-3 py-1 rounded-full text-xs transition-colors shrink-0 cursor-pointer ${
                    selectedTag === tag
                      ? "bg-neon/15 text-neon border border-neon/30 font-medium"
                      : "text-paper-dim hover:text-paper bg-ink-2 border border-transparent"
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}

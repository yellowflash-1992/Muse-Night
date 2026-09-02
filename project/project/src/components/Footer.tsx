import { Feather, Mail, BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-stone-800 bg-stone-950 px-6 py-12 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-700/40 bg-amber-950/30">
              <Feather className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <p className="font-serif text-lg text-stone-200">Inkwell & Ash</p>
              <p className="text-xs font-light text-stone-500">
                A literary home by Elena Marsh & Theo Ashburn
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="#poetry"
              className="flex items-center gap-1.5 text-sm font-light text-stone-400 transition-colors hover:text-amber-400"
            >
              <Feather className="h-4 w-4" />
              Poetry
            </a>
            <a
              href="#prose"
              className="flex items-center gap-1.5 text-sm font-light text-stone-400 transition-colors hover:text-amber-400"
            >
              <BookOpen className="h-4 w-4" />
              Prose
            </a>
            <a
              href="#books"
              className="flex items-center gap-1.5 text-sm font-light text-stone-400 transition-colors hover:text-amber-400"
            >
              <BookOpen className="h-4 w-4" />
              Books
            </a>
            <a
              href="#about"
              className="flex items-center gap-1.5 text-sm font-light text-stone-400 transition-colors hover:text-amber-400"
            >
              <Mail className="h-4 w-4" />
              About
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-stone-900 pt-6 text-center">
          <p className="text-xs font-light text-stone-600">
            © {new Date().getFullYear()} Inkwell & Ash. Written with patience, read with care.
          </p>
        </div>
      </div>
    </footer>
  );
}

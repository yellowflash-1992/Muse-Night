import { useEffect, useState } from "react";
import { Feather, BookOpen, PenTool, Library } from "lucide-react";
import { supabase, LiteraryPiece } from "@/lib/supabase";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CollectionSection } from "@/components/CollectionSection";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { ReadingModal } from "@/components/ReadingModal";

function App() {
  const [pieces, setPieces] = useState<LiteraryPiece[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPiece, setSelectedPiece] = useState<LiteraryPiece | null>(null);

  useEffect(() => {
    async function fetchPieces() {
      const { data, error } = await supabase
        .from("literary_pieces")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching pieces:", error);
      } else if (data) {
        setPieces(data as LiteraryPiece[]);
      }
      setLoading(false);
    }
    fetchPieces();
  }, []);

  const handleNavigate = (section: string) => {
    if (section === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const poetryCount = pieces.filter((p) => p.category === "poetry").length;
  const proseCount = pieces.filter((p) => p.category === "prose").length;
  const bookCount = pieces.filter((p) => p.category === "book").length;

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar onNavigate={handleNavigate} />

      <Hero onNavigate={handleNavigate} />

      {/* Stats bar */}
      <div className="border-b border-stone-200 bg-stone-100/50 px-6 py-6 sm:px-12 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 text-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Feather className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-light text-stone-600">
              <span className="font-medium text-stone-800">{poetryCount}</span> Poems
            </span>
          </div>
          <div className="flex items-center gap-2">
            <PenTool className="h-4 w-4 text-teal-600" />
            <span className="text-sm font-light text-stone-600">
              <span className="font-medium text-stone-800">{proseCount}</span> Prose Pieces
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-rose-600" />
            <span className="text-sm font-light text-stone-600">
              <span className="font-medium text-stone-800">{bookCount}</span> Books
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Library className="h-4 w-4 text-stone-600" />
            <span className="text-sm font-light text-stone-600">
              <span className="font-medium text-stone-800">2</span> Authors
            </span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-32">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-stone-300 border-t-amber-600" />
            <p className="text-sm font-light text-stone-400">Opening the book...</p>
          </div>
        </div>
      ) : (
        <>
          <CollectionSection
            id="poetry"
            category="poetry"
            pieces={pieces}
            onOpen={setSelectedPiece}
            icon={<Feather className="h-5 w-5" />}
            tagline="Verses that arrive like weather."
          />

          <CollectionSection
            id="prose"
            category="prose"
            pieces={pieces}
            onOpen={setSelectedPiece}
            icon={<PenTool className="h-5 w-5" />}
            tagline="Stories told in the quiet between things."
          />

          <CollectionSection
            id="books"
            category="book"
            pieces={pieces}
            onOpen={setSelectedPiece}
            icon={<BookOpen className="h-5 w-5" />}
            tagline="Longer journeys for longer evenings."
          />
        </>
      )}

      <About />

      <Footer />

      <ReadingModal piece={selectedPiece} onClose={() => setSelectedPiece(null)} />
    </div>
  );
}

export default App;

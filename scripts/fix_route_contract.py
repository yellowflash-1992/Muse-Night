from pathlib import Path
import re

root = Path('c:/Users/LENOVO-PC/Downloads/muse-books')

# Canonical route contract map: every route file must stay a wrapper and delegate to a feature-owned component.
route_map = {
    'src/routes/about.tsx': ('/about', '/features/about/AboutPage', 'AboutPage', 'About the Press & Poets — Muse Books', 'Meet the voices of Muse Books: Irshand, Child of the Wilderness, and Raji Nurudeen Olawale.'),
    'src/routes/books/index.tsx': ('/books/', '/features/books/BooksIndexPage', 'BooksIndexPage', 'Hand-Bound Chapbooks — Muse Books', 'Hand-set metal type, mould-made rag paper, and Smyth-sewn bindings. Explore our limited letterpress chapbooks.'),
    'src/routes/books/$id.tsx': ('/books/$id', '/features/books/BookDetailPage', 'BookDetailPage', 'Chapbook — Muse Books', 'Hand-bound chapbook by Muse Books.'),
    'src/routes/collections/index.tsx': ('/collections/', '/features/collections/CollectionsIndexPage', 'CollectionsIndexPage', 'Poetry Collections — Muse Books', 'Explore our published poetry collections, suites, and collaborative anthologies.'),
    'src/routes/collections/$id.tsx': ('/collections/$id', '/features/collections/CollectionDetailPage', 'CollectionDetailPage', 'Collection — Muse Books', 'Poetry collection by Muse Books.'),
    'src/routes/daily.tsx': ('/daily', '/features/daily/DailyPage', 'DailyPage', 'Poetry Game — Muse Books', 'Poetry battles and six-word story challenges to unlock bonus poems.'),
    'src/routes/gallery.tsx': ('/gallery', '/features/gallery/GalleryPage', 'GalleryPage', 'Press Gallery & Plates — Muse Books', 'Visual archives of Muse Books: hand-bound chapbook covers, letterpress type specimens, studio photography, and portraits of the poets.'),
    'src/routes/library/index.tsx': ('/library/', '/features/library/LibraryIndexPage', 'LibraryIndexPage', 'Library Archive — Muse Books', 'Browse all poems, prose poetry, epistles, and literary works in the Muse Books archive.'),
    'src/routes/library/$id.tsx': ('/library/$id', '/features/library/LibraryPoemPage', 'LibraryPoemPage', 'Work — Muse Books', 'Browse works from Muse Books.'),
    'src/routes/mood.tsx': ('/mood', '/features/mood/MoodPage', 'MoodPage', 'A Poem for Your Mood — Muse Books', 'Pick how you\'re feeling — or flip a penny — and receive a poem written for that exact mood.'),
    'src/routes/request.tsx': ('/request', '/features/requests/RequestPage', 'RequestPage', 'Request a Poem — Muse Books', 'Commission an original handwritten poem for any occasion. Delivered to your WhatsApp or email within 3–5 days.'),
    'src/routes/streak.tsx': ('/streak', '/features/streak/StreakPage', 'StreakPage', 'Daily Streak — Muse Books', 'Keep your daily streak and unlock today\'s bonus poem.'),
    'src/routes/submit.tsx': ('/submit', '/features/submit/SubmitPage', 'SubmitPage', 'Submissions & Call for Poetry — Muse Books', 'Submit your poems, chapbook manuscripts, and literary musings to Muse Books. We read year-round.'),
    'src/routes/vault.tsx': ('/vault', '/features/vault/VaultPage', 'VaultPage', 'Your Vault — Muse Books', 'Your personal collection of saved poems.'),
}

# Write all route wrappers to the correct path. Keep route files free of UI.
for rel, (route, import_rel, component, title, desc) in route_map.items():
    route_file = root / rel
    route_file.parent.mkdir(parents=True, exist_ok=True)

    import_path = '@/features' + import_rel.replace('/features', '')
    # Because feature component files are root-level feature files, use that import path.
    import_path = '@/features' + import_rel.replace('/features', '')
    # Continue route wrapper template exactly.
    route_file.write_text(
        'import { createFileRoute } from "@tanstack/react-router";\n\n'
        f'import {{ {component} }} from "{import_path}";\n\n'
        'export const Route = createFileRoute("' + route + '")({\n'
        '  head: () => ({\n'
        '    meta: [\n'
        f'      {{ title: "{title}" }},\n'
        '      {\n'
        '        name: "description",\n'
        '        content:\n'
        f'          "{desc}",\n'
        '      },\n'
        '    ],\n'
        '  }),\n'
        f'  component: {component},\n'
        '});\n',
        encoding='utf-8',
    )

# Ensure feature about page exists and route import becomes valid.
about_page = root / 'src/features/about/AboutPage.tsx'
about_page.parent.mkdir(parents=True, exist_ok=True)
about_page.write_text(
'''import { Link } from "@tanstack/react-router";
import { ArrowRight, Feather, Sparkles } from "lucide-react";

import { POETS, type Poet } from "@/data/literature";

export function AboutPage() {
  const poetList = [POETS["nurudeen-abdullah"], POETS["muhammad-abdulnasir"]];

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
        <section className="mb-10 border-b border-neon/10 pb-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-neon/80 mb-3">
            <Feather className="h-3.5 w-3.5" />
            <span>The Press &amp; Poets</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-medium text-paper">About the Press</h1>
          <p className="mt-4 text-base sm:text-lg text-paper-dim max-w-[56ch] text-pretty">
            Muse Books gathers letters, small editions, and public memory into a living archive of
            poetic attention.
          </p>
        </section>

        <section className="grid gap-8 md:grid-cols-2">
          {poetList.map((poet: Poet) => (
            <article key={poet.id} className="rounded-xl border border-neon/15 bg-ink-2 p-6 sm:p-8">
              <div className="overflow-hidden rounded-lg bg-ink-3 border border-neon/20 h-80 sm:h-96 lg:h-[420px]">
                <img src={poet.image} alt={poet.name} className="h-full w-full object-cover object-center" />
              </div>
              <div className="mt-6">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-neon/80">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{poet.role}</span>
                </div>
                <h2 className="font-display mt-3 text-3xl text-paper sm:text-4xl">{poet.name}</h2>
                <p className="text-xs uppercase tracking-[0.2em] text-paper-faint mt-2">{poet.location}</p>
                <p className="mt-4 text-sm leading-relaxed text-paper-dim">{poet.longBio}</p>
                <div className="mt-6">
                  <span className="text-xs uppercase tracking-[0.24em] text-neon">Aesthetic Territory</span>
                  <p className="mt-2 text-sm text-paper-dim">{poet.aesthetic}</p>
                </div>
                <div className="mt-6">
                  <span className="text-xs uppercase tracking-[0.24em] text-neon">Works</span>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {poet.works.map((work) => (
                      <span key={work} className="rounded-full border border-neon/20 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-paper-dim">{work}</span>
                    ))}
                  </div>
                </div>
                <div className="mt-8">
                  <Link to="/library" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-neon hover:text-paper">
                    <span>Read the archive</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
''',
    encoding='utf-8'
)

print('route wrappers and about page restored')

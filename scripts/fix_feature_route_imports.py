from pathlib import Path
import re

root = Path('c:/Users/LENOVO-PC/Downloads/muse-books')

# Normalize the route files to system-canonical imports, one per valid feature page file.
route_imports = {
    'src/routes/about.tsx': ('/about', '@/features/about/AboutPage', 'AboutPage'),
    'src/routes/books/index.tsx': ('/books/', '@/features/books/BooksIndexPage', 'BooksIndexPage'),
    'src/routes/books/$id.tsx': ('/books/$id', '@/features/books/BookDetailPage', 'BookDetailPage'),
    'src/routes/collections/index.tsx': ('/collections/', '@/features/collections/CollectionsIndexPage', 'CollectionsIndexPage'),
    'src/routes/collections/$id.tsx': ('/collections/$id', '@/features/collections/CollectionDetailPage', 'CollectionDetailPage'),
    'src/routes/daily.tsx': ('/daily', '@/features/daily/DailyPage', 'DailyPage'),
    'src/routes/gallery.tsx': ('/gallery', '@/features/gallery/GalleryPage', 'GalleryPage'),
    'src/routes/library/index.tsx': ('/library/', '@/features/library/LibraryIndexPage', 'LibraryIndexPage'),
    'src/routes/library/$id.tsx': ('/library/$id', '@/features/library/LibraryPoemPage', 'LibraryPoemPage'),
    'src/routes/mood.tsx': ('/mood', '@/features/mood/MoodPage', 'MoodPage'),
    'src/routes/request.tsx': ('/request', '@/features/requests/RequestPage', 'RequestPage'),
    'src/routes/streak.tsx': ('/streak', '@/features/streak/StreakPage', 'StreakPage'),
    'src/routes/submit.tsx': ('/submit', '@/features/submit/SubmitPage', 'SubmitPage'),
    'src/routes/vault.tsx': ('/vault', '@/features/vault/VaultPage', 'VaultPage'),
}

route_template = '''import {{ createFileRoute }} from "@tanstack/react-router";\n\nimport {{ {component} }} from "{import_path}";\n\nexport const Route = createFileRoute("{route_path}")({\n  head: () => ({{\n    meta: [\n      {{ title: "Muse Books" }},\n    ],\n  }}),\n  component: {component},\n});\n'''

# Write a valid about feature page from the source registry.
about_page = '''import {{ Link }} from "@tanstack/react-router";\nimport {{ ArrowRight, Feather, Sparkles }} from "lucide-react";\n\nimport {{ POETS, type Poet }} from "@/data/literature";\n\nexport function AboutPage() {{\n  const poetList = [POETS["nurudeen-abdullah"], POETS["muhammad-abdulnasir"]];\n\n  return (\n    <div className="py-12 sm:py-16">\n      <div className="mx-auto max-w-[1180px] px-6 sm:px-10">\n        <section className="mb-10 border-b border-neon/10 pb-10">\n          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-neon/80 mb-3">\n            <Feather className="h-3.5 w-3.5" />\n            <span>The Press &amp; Poets</span>\n          </div>\n          <h1 className="font-display text-4xl sm:text-6xl font-medium text-paper">About the Press</h1>\n          <p className="mt-4 text-base sm:text-lg text-paper-dim max-w-[56ch] text-pretty">\n            Muse Books gathers letters, small editions, and public memory into a living archive of\n            poetic attention.\n          </p>\n        </section>\n\n        <section className="grid gap-8 md:grid-cols-2">\n          {{poetList.map((poet: Poet) => (\n            <article key={{poet.id}} className="rounded-xl border border-neon/15 bg-ink-2 p-6 sm:p-8">\n              <div className="overflow-hidden rounded-lg bg-ink-3 border border-neon/20 h-80 sm:h-96 lg:h-[420px]">\n                <img src={{poet.image}} alt={{poet.name}} className="h-full w-full object-cover object-center" />\n              </div>\n              <div className="mt-6">\n                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-neon/80">\n                  <Sparkles className="h-3.5 w-3.5" />\n                  <span>{{poet.role}}</span>\n                </div>\n                <h2 className="font-display mt-3 text-3xl text-paper sm:text-4xl">{{poet.name}}</h2>\n                <p className="text-xs uppercase tracking-[0.2em] text-paper-faint mt-2">{{poet.location}}</p>\n                <p className="mt-4 text-sm leading-relaxed text-paper-dim">{{poet.longBio}}</p>\n                <div className="mt-6">\n                  <span className="text-xs uppercase tracking-[0.24em] text-neon">Aesthetic Territory</span>\n                  <p className="mt-2 text-sm text-paper-dim">{{poet.aesthetic}}</p>\n                </div>\n                <div className="mt-6">\n                  <span className="text-xs uppercase tracking-[0.24em] text-neon">Works</span>\n                  <div className="mt-3 flex flex-wrap gap-2">\n                    {{poet.works.map((work) => (\n                      <span key={{work}} className="rounded-full border border-neon/20 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-paper-dim">{{work}}</span>\n                    ))}}\n                  </div>\n                </div>\n                <div className="mt-8">\n                  <Link to="/library" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-neon hover:text-paper">\n                    <span>Read the archive</span>\n                    <ArrowRight className="h-3.5 w-3.5" />\n                  </Link>\n                </div>\n              </div>\n            </article>\n          ))}}\n        </section>\n      </div>\n    </div>\n  );\n}}\n'''

# Ensure AboutPage exists at requested path and is valid.
about_feature_file = root / 'src/features/about/AboutPage.tsx'
about_feature_file.parent.mkdir(parents=True, exist_ok=True)
about_feature_file.write_text(about_page, encoding='utf-8')

# Rebuild all route wrappers as route-only files from the canonical feature file map.
for route_file, (route_path, import_path, component) in route_imports.items():
    route = root / route_file
    # route path route file should exist and be written.
    route.write_text(route_template.format(route_path=route_path, import_path=import_path, component=component), encoding='utf-8')

print('rebuilt canonical route imports')

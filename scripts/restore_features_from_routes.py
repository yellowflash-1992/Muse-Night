from pathlib import Path
import re

root = Path('c:/Users/LENOVO-PC/Downloads/muse-books')

route_to_feature = {
    'src/routes/books/index.tsx': ('/books/', 'src/features/books/BooksIndexPage.tsx', 'BooksIndexPage'),
    'src/routes/books/$id.tsx': ('/books/$id', 'src/features/books/BookDetailPage.tsx', 'BookDetailPage'),
    'src/routes/collections/index.tsx': ('/collections/', 'src/features/collections/CollectionsIndexPage.tsx', 'CollectionsIndexPage'),
    'src/routes/collections/$id.tsx': ('/collections/$id', 'src/features/collections/CollectionDetailPage.tsx', 'CollectionDetailPage'),
    'src/routes/daily.tsx': ('/daily', 'src/features/daily/DailyPage.tsx', 'DailyPage'),
    'src/routes/gallery.tsx': ('/gallery', 'src/features/gallery/GalleryPage.tsx', 'GalleryPage'),
    'src/routes/library/index.tsx': ('/library/', 'src/features/library/LibraryIndexPage.tsx', 'LibraryIndexPage'),
    'src/routes/library/$id.tsx': ('/library/$id', 'src/features/library/LibraryPoemPage.tsx', 'LibraryPoemPage'),
    'src/routes/mood.tsx': ('/mood', 'src/features/mood/MoodPage.tsx', 'MoodPage'),
    'src/routes/request.tsx': ('/request', 'src/features/requests/RequestPage.tsx', 'RequestPage'),
    'src/routes/streak.tsx': ('/streak', 'src/features/streak/StreakPage.tsx', 'StreakPage'),
    'src/routes/submit.tsx': ('/submit', 'src/features/submit/SubmitPage.tsx', 'SubmitPage'),
    'src/routes/vault.tsx': ('/vault', 'src/features/vault/VaultPage.tsx', 'VaultPage'),
}

# Helper replacements used when route files are copied into feature files.
for route, (pathname, feature, component_name) in route_to_feature.items():
    src = root / route
    dst = root / feature
    dst.parent.mkdir(parents=True, exist_ok=True)

    text = src.read_text(encoding='utf-8')

    # Since the route file contains a full route factory and page implementation, pull out only the page implementation code.
    # Use a clean slice from the first line of the implementation function down to the end of the file.
    # The route files already have routing/meta blocks ahead of the page components.
    match = re.search(r'\nfunction\s+([A-Za-z0-9_]+)\(\) \{', text)
    if match:
        body_start = match.start()
        # Keep only the implementation function and below, and remove the preceding route block
        # by slicing at the function's line start.
        body = text[body_start:]
        # remove trailing route factory block by line not contained here is impossible, but body ends at EOF.
        # Make a small filename normalization per page for exported component shape.
        body = body.replace('function ChapbooksIndex()', 'export function BooksIndexPage()')
        body = body.replace('function ChapbookDetail()', 'export function BookDetailPage()')
        body = body.replace('function CollectionsIndex()', 'export function CollectionsIndexPage()')
        body = body.replace('function CollectionDetail()', 'export function CollectionDetailPage()')
        body = body.replace('function PoetryGame()', 'export function DailyPage()')
        body = body.replace('function GalleryPage()', 'export function GalleryPage()')
        body = body.replace('function PoemsIndex()', 'export function LibraryIndexPage()')
        body = body.replace('function PoemReader()', 'export function LibraryPoemPage()')
        body = body.replace('function MoodPage()', 'export function MoodPage()')
        body = body.replace('function RequestPage()', 'export function RequestPage()')
        body = body.replace('function StreakPage()', 'export function StreakPage()')
        body = body.replace('function SubmitPage()', 'export function SubmitPage()')
        body = body.replace('function VaultPage()', 'export function VaultPage()')

        # Make useParams import and call route-specific in detail pages.
        if route == 'src/routes/books/$id.tsx':
            body = body.replace('import { createFileRoute, Link } from "@tanstack/react-router";\nimport { useState } from "react";', 'import { Link, useParams } from "@tanstack/react-router";\nimport { useState } from "react";')
            body = body.replace('const { id } = Route.useParams();', 'const { id } = useParams({ from: "/books/$id" });')
        if route == 'src/routes/collections/$id.tsx':
            body = body.replace('import { createFileRoute, Link } from "@tanstack/react-router";\n', 'import { Link, useParams } from "@tanstack/react-router";\n')
            body = body.replace('const { id } = Route.useParams();', 'const { id } = useParams({ from: "/collections/$id" });')
        if route == 'src/routes/library/$id.tsx':
            body = body.replace('import { createFileRoute, Link } from "@tanstack/react-router";\nimport {', 'import { Link, useParams } from "@tanstack/react-router";\nimport {')
            body = body.replace('const { id } = Route.useParams();', 'const { id } = useParams({ from: "/library/$id" });')

        # Remove or normalize route factory imports and route-specific createFileRoute usage from feature file.
        body = body.replace('import { createFileRoute, Link } from "@tanstack/react-router";', 'import { Link } from "@tanstack/react-router";')
        body = body.replace('import { createFileRoute } from "@tanstack/react-router";\n', '')
        body = body.replace('import { createFileRoute } from "@tanstack/react-router";\r\n', '')
        # Remove export const Route block fragments, if any from page body source.
        body = re.sub(r'\nexport const Route = createFileRoute\(.*?\n\}\);\n', '\n', body, flags=re.S)
        # Remove any route-level `component:` lines or `Route.*` references not present.

        # Write feature file.
        dst.write_text(body, encoding='utf-8')

    # Rewrite route files back to the wrapper shape.
    file_text = '''import { createFileRoute } from "@tanstack/react-router";\n\nimport { ''' + component_name + ''' } from "@/''' + feature.replace('src/features/', '').replace('.tsx', '') + '";\n\nexport const Route = createFileRoute("' + pathname + '")({\n  head: () => ({\n    meta: [\n      { title: "About the Press & Poets — Muse Books" },\n      \n    ],\n  }),\n  component: ' + component_name + ',\n});\n'

    # specific clean route files based on existing head metadata from original route file
    text = src.read_text(encoding='utf-8')
    # Extract metadata block from original route file between head and component property.
    meta = re.search(r'head:\s*\(\)\s*=>\s*\(\{\s*meta:\s*\[([\s\S]*?)\]\s*\}\),', text)
    if meta:
        # prefer original metadata text mapping block exactly
        replaced_meta = re.sub(r'\n\s*component:\s*[A-Za-z]+,', '', text)
        # just use fallback above if meta block not found.
    # route import component wrapper route lines.
    # Use per-route generated default header route-specific route names and only import component.
    # Need route metadata from original route file, preserve head.
    # Better derive meta block from route file source.
    head_pattern = re.search(r'head:\s*\(\)\s*=>\s*\(\{\s*meta:\s*\[([\s\S]*?)\]\s*\}\s*\}\),', text)
    # We will pass through same folded metadata from original if matched. Let's create route wrapper by reusing meta string.
    # Keep most simple: route file meta from original route file block.
    meta_block = re.search(r'head:\s*\(\)\s*=>\s*\(\{\s*meta:\s*\[([\s\S]*?)\]\s*\},\s*\}\),', text)
    if meta_block:
        block = meta_block.group(0)
        # store string with meta and no extra route wrappers.
        meta_string = block
    else:
        meta_string = 'head: () => ({ meta: [{ title: "Muse Books" }] }),'
    # Build proper minimal route file.
    route_wrapper = 'import { createFileRoute } from "@tanstack/react-router";\n\nimport { ' + component_name + ' } from "@/' + feature.replace('src/features/', '').replace('/' + component_name + '.tsx', '') + '";\n\nexport const Route = createFileRoute("' + pathname + '")({\n' + '  ' + meta_string + '\n  component: ' + component_name + ',\n});\n'
    # done individually correct for all route files.
    src.write_text(route_wrapper, encoding='utf-8')

# fix about route file using existing known route wrapper shape.
about_route = root / 'src/routes/about.tsx'
about_route.write_text('''import { createFileRoute } from "@tanstack/react-router";\n\nimport { AboutPage } from "@/features/about/AboutPage";\n\nexport const Route = createFileRoute("/about")({\n  head: () => ({\n    meta: [\n      { title: "About the Press & Poets — Muse Books" },\n      {\n        name: "description",\n        content:\n          "Meet the voices of Muse Books: Irshand, Child of the Wilderness, and Raji Nurudeen Olawale.",\n      },\n    ],\n  }),\n  component: AboutPage,\n});\n''', encoding='utf-8')

print('restored features and route wrappers')

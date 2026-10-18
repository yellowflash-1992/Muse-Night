# Admin Wiring Plan

## Goal
Wire the Muse Night admin dashboard to the dev DB so admins can create/publish/archive poems, and poems appear on the public site automatically.

## Current state
- **Detail page** (`/library/$id`) — ✅ DB-backed via `getPublishedPoem` server fn
- **Index page** (`/library`) — ❌ Static (`LIBRARY_POEMS` from `src/data/literature.ts`)
- **Next/Prev nav** — ❌ Static (`resolveNavigationPoems(LIBRARY_POEMS, ...)`)
- **Admin dashboard** — Runs on mock data, hasn't touched DB yet

## 3-Phase Plan

### Phase 1 — Make Muse Night DB-backed (1 session)
**Files:**
- `src/lib/poems.server.ts` — add `getPublishedPoemsListRaw(): Promise<UiPoem[]>`
- `src/lib/poems.functions.ts` — add `getPublishedPoemsList` server fn wrapper
- `src/routes/library/index.tsx` — add loader that calls the new function
- `src/features/library/LibraryIndexPage.tsx` — consume loader data instead of static import
- `src/features/library/LibraryPoemPage.tsx` — navigation uses DB list

**Done state:** delete a poem row in dev DB → it disappears from `/library` on refresh.

### Phase 2 — Admin write server functions (1 session)
**New files:**
- `src/lib/admin/auth.server.ts` — `requireFounderAdmin()` guard
- `src/lib/admin/poems.server.ts` — `createDraftPoem`, `updatePoem`, `publishPoem`, `archivePoem`
- `src/lib/admin/poems.functions.ts` — server-fn wrappers with zod validation
- `src/lib/admin/pen-names.server.ts` — `listPenNames()` for dropdowns
- `src/lib/admin/collections.server.ts` — `listPublishedCollections()`

**Done state:** call `createDraftPoem` from a test script → row appears in DB with `status=DRAFT`.

### Phase 3 — Admin form UI (1 session)
**New files in `muse-night-admin`:**
- `src/routes/admin.poems.new.tsx` — form route
- `src/components/admin/PoemForm.tsx` — form component
- `src/components/admin/StanzaEditor.tsx` — structured stanza editor
- `src/hooks/usePenNames.ts`, `src/hooks/useCollections.ts` — dropdown data

**Modified in admin:**
- `src/lib/admin-store.tsx` — replace mock reads with server fn calls
- `.env` — switch `VITE_SUPABASE_URL` from prod to dev (`vdrbitnqlijwtitecver.supabase.co`)

**Done state:** admin fills form → publishes poem → poem renders at `/library/[new-id]` on dev site.

## Admin Poem Form — Field Spec

### Required
| Field | Type | Input |
|---|---|---|
| title | string | text |
| penNameId | FK → PenName | dropdown |
| year | string | text (4-digit) |
| readTime | string | text ("3 min read") |
| tags | string[] | comma-separated |
| stanzas | string[][] | structured editor |

### Optional
| Field | Type | Input |
|---|---|---|
| collectionId | FK → Collection | dropdown |
| literaryWorldId | FK → LiteraryWorld | dropdown |
| note | string | textarea |
| coverImage | string | file upload |
| featured | boolean | checkbox |
| lineNotes | Record<number,{count,excerpt}> | hidden in v1 |

### Derived (auto on save)
- `body` — via `stanzasToBody(stanzas)`
- `excerpt` — via `computeExcerpt(stanzas)` (first 3 lines)
- `linesCount` — via `computeLinesCount(stanzas)`

### Auto-managed
- `id` — slug from title; collision → append `-2` or short hash
- `sortOrder` — `max(sortOrder) + 1`
- `publishedAt` — `null` for DRAFT; `new Date()` on publish
- `status` — default DRAFT; Publish button sets PUBLISHED

## Known issues to fix in Phase 1/2
- `mapPoemRowToUi` — `collection.author` is a PenName relation but interface types it as `string`. Fix: change select to `author: { select: { name: true } }` and map `row.collection.author.name`.
- `lineNotes` DB field holds reader-reaction shape, not editorial. Admin form leaves it empty in v1.

## Next session start message
> "Ready for Phase 1. Plan saved at docs/ADMIN_WIRING_PLAN.md"

# Muse Books — A Small Press for Poetry & Literature

> _“We do not write to be found. We write to leave the light on.”_

A modern, high-aesthetic web application for **Muse Books**, a lamplit literary press founded by **Adaeze Okafor** and **Theo Lindqvist**. Features an immersive reading room for poems, curated poetry collections, hand-bound letterpress chapbook catalogs, literary craft essays, and an interactive submission portal.

---

## ✨ Features

- **Poem Library (`/poems`)**: Full archive of standalone verses and epistles with real-time search, poet filters, and thematic tags (`#Solitude`, `#Night`, `#Winter`, `#Sea`).
- **Immersive Reading Room (`/poems/:id`)**: Distraction-free reading environment with dynamic text size controls (Small, Default, Large), warm lamplight mode, one-tap copy/share, poet notes, and previous/next navigation.
- **Poetry Collections (`/collections` & `/collections/:id`)**: Anthologies and suites with author forewords and linked tables of contents.
- **Letterpress Chapbooks (`/books` & `/books/:id`)**: Hand-bound edition catalog with Albion press specifications, paper details, and an interactive reservation/order modal.
- **Literary Journal (`/musings` & `/musings/:id`)**: Essays on night writing poetics, letterpress artistry, and craft reflections.
- **The Press & Poets (`/about`)**: Story of the press across Edinburgh & Stockholm, author biographies, studio details, and the press manifesto.
- **Submissions Portal (`/submit`)**: Year-round reading guidelines and interactive manuscript submission form.
- **Dual Aesthetic Theme Engine**:
  - **Midnight Lamplight (Default Dark Mode)**: Deep obsidian ink with luminous neon celadon accents.
  - **Sunlit Amber (Light Mode)**: Vibrant warm amber sun background (`#b45309`) with crisp white typography and light yellow accents.
- **Responsive Navigation**: Desktop editorial top bar + universal floating "muse night" mobile header with full sliding drawer.
- **Step-by-Step Seamless Background Slider**: Smooth 4-item continuous reel with pause-on-hover and pause-on-touch interaction.

---

## 🚀 Quick Start (Local Development)

### Requirements

- **Node.js** (v18 or higher recommended) or **Bun**

### Installation

```bash
# 1. Clone repository
git clone <your-github-repo-url>
cd muse-books

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) or [http://localhost:8080](http://localhost:8080) in your browser.

---

## 🛠️ Available Scripts

| Script               | Command           | Description                                       |
| :------------------- | :---------------- | :------------------------------------------------ |
| **Development**      | `npm run dev`     | Runs local dev server with hot module replacement |
| **Production Build** | `npm run build`   | Compiles client and SSR bundles to `.output/`     |
| **Preview Build**    | `npm run preview` | Previews production build locally                 |
| **Lint**             | `npm run lint`    | Runs ESLint checks                                |
| **Format**           | `npm run format`  | Auto-formats code with Prettier                   |

---

## 🌐 Deploying to GitHub & Beyond

### 1. GitHub Repository Setup

1. Initialize git and push to GitHub:

   ```bash
   git init
   git add .
   git commit -m "Initial commit of Muse Books"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

2. **Automated CI/CD**: The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically runs linting and builds on every push to `main`.

### 2. Deploying to Vercel

1. Import your GitHub repository on [Vercel](https://vercel.com).
2. Framework Preset: **Other** / **Vite**.
3. Build Command: `npm run build`
4. Output Directory: `.output/public` or standard build output.
5. Deploy!

### 3. Deploying to Cloudflare Pages

1. Connect repository on [Cloudflare Dashboard](https://dash.cloudflare.com) -> Workers & Pages.
2. Build command: `npm run build`
3. Deploy!

### 4. Deploying to Netlify

1. Connect repository on [Netlify](https://netlify.com).
2. Build command: `npm run build`
3. Publish directory: `.output/public`

---

## 📁 Architecture & Directory Structure

```text
muse-books/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD Pipeline
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      # Desktop & Mobile Header with Drawer
│   │   │   └── Footer.tsx      # Literary Footer & Newsletter
│   │   ├── mobile/
│   │   │   └── MobileLanding.tsx # Mobile-optimized Hero & Cards
│   │   └── theme-toggle.tsx    # Light/Dark Theme Switcher
│   ├── data/
│   │   └── literature.ts       # Type-safe Poems, Collections, Books, Poets Data
│   ├── lib/
│   │   └── error-reporting.ts  # Generic Standalone Error Logger
│   ├── routes/
│   │   ├── __root.tsx          # Root Layout & Head Meta
│   │   ├── index.tsx           # Homepage / Portals
│   │   ├── poems/
│   │   │   ├── index.tsx       # Poems Library & Search
│   │   │   └── $id.tsx         # Dedicated Poem Reading Room
│   │   ├── collections/
│   │   │   ├── index.tsx       # Collections Archive
│   │   │   └── $id.tsx         # Collection Details & Contents
│   │   ├── books/
│   │   │   ├── index.tsx       # Chapbooks Catalog
│   │   │   └── $id.tsx         # Chapbook Details & Reservation Modal
│   │   ├── musings/
│   │   │   ├── index.tsx       # Essays & Journal Directory
│   │   │   └── $id.tsx         # Essay Reader
│   │   ├── about.tsx           # Press Story & Poet Profiles
│   │   └── submit.tsx          # Submissions Guidelines & Form
│   ├── styles.css              # Tailwind CSS, Design Tokens, Keyframes
│   └── router.tsx              # Router Configuration
└── package.json
```

---

## 📜 License & Copyright

All poetry, essays, and typography designs © **Muse Books** MMXXIV.

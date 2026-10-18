import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      prerender: {
        crawlLinks: true,
      },
      pages: [
        { path: "/" },
        { path: "/library" },
        { path: "/collections" },
        { path: "/books" },
        { path: "/about" },
        { path: "/submit" },
        { path: "/request" },
        { path: "/mood" },
        { path: "/vault" },
        { path: "/streak" },
        { path: "/daily" },
        { path: "/gallery" },
        { path: "/study" },
        { path: "/settings" },
      ],
    }),
    viteReact(),
    nitro({ preset: "vercel" }),
  ],
  resolve: {
    dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-start"],
  },
});

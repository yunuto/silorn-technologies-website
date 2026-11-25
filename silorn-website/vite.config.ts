import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  plugins: [tailwindcss()],
  build: {
    cssCodeSplit: false,
    outDir: "dist/experience",
    emptyOutDir: true,
    rollupOptions: {
      input: "src/main.tsx",
      output: {
        entryFileNames: "header.js",
        assetFileNames: ({ names }) =>
          names.some((name) => name.endsWith(".css"))
            ? "header.css"
            : "assets/[name]-[hash][extname]",
      },
    },
  },
});

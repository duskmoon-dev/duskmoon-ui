import path from "node:path"
import { defineConfig } from "vite"
import { sveltekit } from "@sveltejs/kit/vite"
import { visualizer } from "rollup-plugin-visualizer"

export default defineConfig({
  plugins: [
    sveltekit(),
    visualizer({
      emitFile: true,
      filename: "stats.html",
      template: "treemap",
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      $components: path.resolve(__dirname, "src/components"),
      duskmoonui: path.resolve(__dirname, '../duskmoonui'),
    },
  },
})
// Updated Sat Oct 18 10:26:14 AM CST 2025

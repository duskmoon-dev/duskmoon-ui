import path from "node:path"
import { defineConfig } from "vite"
import { sveltekit } from "@sveltejs/kit/vite"
import { visualizer } from "rollup-plugin-visualizer"

const isGitHubPages = process.env.CI && process.env.NODE_ENV === 'production'

export default defineConfig({
  plugins: [
    sveltekit(),
    visualizer({
      emitFile: true,
      filename: "stats.html",
      template: "treemap",
      brotliSize: true,
      // Only generate stats in CI/production
      enabled: isGitHubPages,
    }),
  ],
  resolve: {
    alias: {
      $components: path.resolve(__dirname, "src/components"),
      duskmoonui: path.resolve(__dirname, '../duskmoonui'),
    },
  },
  build: {
    // Optimize for GitHub Pages
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    sourcemap: !isGitHubPages,
    minify: isGitHubPages ? 'esbuild' : false,
    target: 'esnext',
    rollupOptions: {
      output: {
        // Add hashing to filenames for better caching
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash][extname]`,
        manualChunks: {
          // Separate vendor chunks for better caching
          vendor: ['svelte', '@sveltejs/kit'],
          ui: ['duskmoonui'],
        }
      }
    }
  },
  server: {
    // Development server optimization
    fs: {
      strict: false
    }
  },
  // GitHub Pages specific base path handling
  base: isGitHubPages ? '/duskmoon-dev/duskmoon-ui' : '/',
  // Enable proper asset handling for GitHub Pages
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp']
})
// Updated Sat Oct 18 10:26:14 AM CST 2025

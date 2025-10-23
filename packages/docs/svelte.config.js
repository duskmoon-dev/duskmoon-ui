import adapter from "@sveltejs/adapter-static"

import { mdsvexConfig, mdsvexExtensions } from "./src/lib/mdsvex/mdsvex.config.js"

export default {
  extensions: [".svelte", ...mdsvexExtensions],
  preprocess: [mdsvexConfig],
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      // GitHub Pages specific configuration
      fallback: process.env.CI ? "index.html" : null,
      strict: process.env.CI ? false : true,
      precompress: {
        // Enable compression for GitHub Pages
        gzip: true,
        brotli: true
      },
      // Ensure proper paths for GitHub Pages
      amp: false,
      trailingSlash: "never"
    }),
    prerender: {
      handleMissingId: "warn",
      handleHttpError: ({ status, path }) => {
        // Don't fail the build for any external API calls that fail during CI
        console.warn(`HTTP error during prerender: ${path} (${status})`)
        return "ignore"
      },
      // Optimize for GitHub Pages deployment
      concurrency: 5,
      crawl: true,
      // Explicitly include routes that won't be discovered by crawling
      entries: ['*', '/robots.txt']
    },
    // GitHub Pages paths
    paths: {
      base: process.env.NODE_ENV === 'production' && process.env.CI ? '/duskmoon-dev/duskmoon-ui' : ''
    }
  },
  onwarn: (warning, handler) => {
    if (["a11y_", "non_reactive_update"].some((code) => warning.code.startsWith(code))) {
      return
    }
    handler(warning)
  },
}

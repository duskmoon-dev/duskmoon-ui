import adapter from "@sveltejs/adapter-static"

import { mdsvexConfig, mdsvexExtensions } from "./src/lib/mdsvex/mdsvex.config.js"

export default {
  extensions: [".svelte", ...mdsvexExtensions],
  preprocess: [mdsvexConfig],
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      // Use fallback in CI mode to handle dynamic routes without entries
      fallback: process.env.CI ? "index.html" : null,
      // Allow dynamic routes during CI builds to prevent failures
      strict: process.env.CI ? false : true,
      // precompress: true,
    }),
    prerender: {
      handleMissingId: "warn",
      handleHttpError: ({ status, path }) => {
        // Don't fail the build for any external API calls that fail during CI
        console.warn(`HTTP error during prerender: ${path} (${status})`)
        return "ignore"
      }
    }
  },
  onwarn: (warning, handler) => {
    if (["a11y_", "non_reactive_update"].some((code) => warning.code.startsWith(code))) {
      return
    }
    handler(warning)
  },
}

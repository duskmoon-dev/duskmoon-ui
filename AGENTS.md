# Agent Guidelines

## Commands

- Build: `bun run build` (builds duskmoonui package)
- Build dev: `bun run build:dev` (development build)
- Build docs: `bun run build:docs` (build documentation)
- Lint: `bun run lint` (uses oxlint, ignores playground)
- Format: `bun run format` (uses prettier with svelte/tailwind plugins)
- Test: `bun test` (run all tests)
- Single test: `bun test packages/duskmoonui/functions/[filename].test.js`
- Dev server: `bun run dev` (docs dev server), `bun run play` (playground)

## Code Style

- Use 2 spaces, no tabs (Prettier config)
- Max line length: 100 characters
- No semicolons, trailing commas required
- Import ES modules only (type: "module")
- Use Bun test framework with `expect` and `test` from "bun:test"
- Follow existing patterns in CSS/JS files
- No comments unless absolutely necessary
- Use prettier-plugin-svelte and prettier-plugin-tailwindcss

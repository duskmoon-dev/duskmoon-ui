# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `bun run build` - Production build of all packages
- `bun run build:dev` - Development build
- `bun run dev` - Build and start documentation dev server
- `bun run play` - Build and start playground dev server
- `bun run lint` - Run oxlint linter
- `bun run format` - Format code with Prettier
- `bun test` - Run all tests using Bun test framework
- `bun test packages/duskmoonui/functions/[filename].test.js` - Run specific test file

### Package-Specific Commands
- `cd packages/docs && bun run dev` - Start SvelteKit docs server (port 3000)
- `cd packages/docs && bun run build` - Build documentation for production
- `cd packages/duskmoonui && bun run build` - Build component library only

## Architecture Overview

This is a **monorepo** for duskmoonUI, a Tailwind CSS component library with the following structure:

### Packages
- **`packages/duskmoonui/`** - Main component library (CSS-only components, no Svelte files)
- **`packages/docs/`** - SvelteKit documentation site using MDsvex
- **`packages/playground/`** - Astro playground for testing components across frameworks
- **`packages/logs/`** - Log monitoring package
- **`packages/bundle/`** - Build output bundle

### Component Library Architecture
- **CSS-Only Components**: Components are pure CSS classes, not Svelte components
- **Build System**: Custom build pipeline in `packages/duskmoonui/build.js` that processes:
  - Color rules and breakpoint utilities
  - Component CSS from `src/components/`
  - Theme configurations from `src/themes/`
  - Packages everything into `duskmoonui.css`
- **Plugin System**: Functions as a Tailwind CSS plugin via `@plugin "duskmoonui"`

### Key Directories
- `packages/duskmoonui/src/components/` - Individual component CSS files (45+ components)
- `packages/duskmoonui/src/themes/` - Theme configuration files
- `packages/duskmoonui/functions/` - Build system utilities and test files
- `packages/docs/src/routes/` - SvelteKit routes with documentation

## Technology Stack

- **Package Manager**: Bun (v1.2.8) with workspace support
- **CSS Framework**: Tailwind CSS v4.1.12
- **Documentation**: SvelteKit v2.20.2 with static adapter for GitHub Pages
- **Testing**: Bun test framework
- **Linting**: Oxlint
- **Formatting**: Prettier with Svelte and Tailwind plugins
- **Environment**: Nix with devenv for reproducible development

## Code Style Guidelines

- **Indentation**: 2 spaces, no tabs
- **Line Length**: Maximum 100 characters
- **Semicolons**: Never use
- **Trailing Commas**: Always use
- **Imports**: ES modules only
- **Comments**: Avoid unless absolutely necessary
- **Testing**: Use Bun test framework

## Development Workflow

1. **Setup**: Run `bun install` to install all dependencies
2. **Development**: Use `bun run dev` for documentation or `bun run play` for playground
3. **Component Development**: Edit CSS files in `packages/duskmoonui/src/components/`
4. **Testing**: Run `bun test` for all tests or target specific test files
5. **Code Quality**: Use `bun run lint` and `bun run format` before committing
6. **Building**: Use `bun run build` for production builds

## Build System Details

The main build pipeline (`packages/duskmoonui/build.js`) handles:
- CSS rule generation for colors, breakpoints, and states
- Theme processing from source files
- Component CSS compilation and optimization
- Bundle creation with LightningCSS minification
- Chunk generation for modular loading

## Deployment

- **Documentation**: Static site generation with SvelteKit for GitHub Pages
- **Package Publishing**: Automated alpha/beta releases to NPM
- **Container**: Docker multi-stage builds with Caddy server
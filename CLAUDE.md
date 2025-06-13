# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Build Commands

- `pnpm build` - Build all packages in the monorepo using Turbo
- `pnpm clean` - Clean all build artifacts across packages

### Code Quality

- `pnpm lint` - Run ESLint across all packages
- `pnpm format` - Format code using Biome
- `pnpm format:check` - Check and fix code using Biome

### Publishing

- `pnpm ci:version` - Update package versions using Changesets
- `pnpm ci:publish` - Publish packages to npm

## Architecture Overview

This is a monorepo containing Ian Macalinao's standardized TypeScript and ESLint configurations:

### Package Structure

- **@macalinao/tsconfig** - TypeScript configurations for different environments:

  - `tsconfig.base.json` - Strict base configuration
  - `tsconfig.node.json` - Node.js projects
  - `tsconfig.dom.json` - Browser/DOM projects
  - `tsconfig.react.json` - React projects
  - `tsconfig.vite.json` - Vite projects
  - `tsconfig.cf.json` - Cloudflare Workers

- **@macalinao/eslint-config** - Base ESLint configuration with TypeScript, Prettier, import sorting, and Turbo support

- **@macalinao/eslint-config-react** - React-specific ESLint configuration extending the base config with React hooks, JSX a11y, and TanStack plugins

### Key Technical Decisions

- **ES Modules Only** - No CommonJS support, uses `"type": "module"`
- **TypeScript Strict Mode** - All configurations enable strict type checking with additional constraints
- **Tool Chain**:
  - Turbo for monorepo task orchestration with caching
  - Biome for fast formatting (JSON, JSONC, HTML)
  - ESLint with TypeScript for linting
  - Prettier for Markdown and YAML formatting
  - Husky + lint-staged for pre-commit hooks
  - Changesets for version management

### Development Patterns

- All packages follow consistent structure:
  - Source in `src/`
  - Build output in `dist/`
  - TypeScript builds with source maps and declarations
- Incremental builds enabled for performance
- No tests in this repository (configuration-only packages)

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Build Commands

- `bun run build` - Build all packages in the monorepo using Turbo
- `bun run clean` - Clean all build artifacts across packages

### Code Quality

- `bun run lint` - Run oxlint at the root, then ESLint across all packages via Turbo
- `bun run format` - Format code using oxfmt
- `bun run format:check` - Check formatting with oxfmt (no writes)

### Publishing

- `bun run ci:version` - Update package versions using Changesets
- `bun run ci:publish` - Publish packages to npm

### Changesets

Every PR that changes a published package must include a changeset. Create one with `bun changeset`, or hand-write a markdown file in `.changeset/` with a descriptive kebab-case filename:

```markdown
---
"@macalinao/package-name": patch | minor | major
---

Description of the change from the consumer's perspective.
```

List every affected package with its semver bump (patch for fixes, minor for new features or behavior changes, major for breaking changes).

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
  - Bun for package management and script running
  - Turbo for monorepo task orchestration with caching
  - oxfmt for fast formatting (JS/TS/JSX/TSX, JSON, JSONC, CSS, Markdown, YAML, HTML)
  - oxlint for fast linting at the repo root
  - ESLint with TypeScript for linting (run per-package via `turbo run lint`)
  - Changesets for version management

### Development Patterns

- All packages follow consistent structure:
  - Source in `src/`
  - Build output in `dist/`
  - TypeScript builds with source maps and declarations
- Incremental builds enabled for performance
- No tests in this repository (configuration-only packages)

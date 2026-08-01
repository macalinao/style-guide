# Ian Macalinao's Style Guide

Shared TypeScript, linting, and formatting configurations used across my projects.

Docs: [style-guide.ianm.com](https://style-guide.ianm.com)

Notes:

- I use oxlint for linting and oxfmt for formatting. Both are built on [oxc](https://oxc.rs) and are extremely fast.
- I only use ES Modules. Dual CommonJS/ESM is a minefield that isn't worth the hassle.
- ESLint configs are still published for projects that need type-aware rules oxlint doesn't cover yet.

## Packages

| Package                                                           | Version                                                                                                                                                                     | Description                                                                       |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| [@macalinao/tsconfig](./packages/tsconfig/)                       | [![npm](https://img.shields.io/npm/v/@macalinao/tsconfig.svg?style=flat-square&labelColor=000000)](https://www.npmjs.com/package/@macalinao/tsconfig)                       | Strict TypeScript configs for Node, Bun, DOM, React, Vite, and Cloudflare Workers |
| [@macalinao/oxlint-config](./packages/oxlint-config/)             | [![npm](https://img.shields.io/npm/v/@macalinao/oxlint-config.svg?style=flat-square&labelColor=000000)](https://www.npmjs.com/package/@macalinao/oxlint-config)             | Opinionated oxlint configuration, plus a TanStack Router add-on                   |
| [@macalinao/biome-config](./packages/biome-config/)               | [![npm](https://img.shields.io/npm/v/@macalinao/biome-config.svg?style=flat-square&labelColor=000000)](https://www.npmjs.com/package/@macalinao/biome-config)               | Biome configuration for formatting and linting (`base` and `react`)               |
| [@macalinao/eslint-config](./packages/eslint-config/)             | [![npm](https://img.shields.io/npm/v/@macalinao/eslint-config.svg?style=flat-square&labelColor=000000)](https://www.npmjs.com/package/@macalinao/eslint-config)             | Base ESLint flat config with TypeScript and Turbo support                         |
| [@macalinao/eslint-config-react](./packages/eslint-config-react/) | [![npm](https://img.shields.io/npm/v/@macalinao/eslint-config-react.svg?style=flat-square&labelColor=000000)](https://www.npmjs.com/package/@macalinao/eslint-config-react) | ESLint config for React, including React Hooks and TanStack Query                 |
| [@macalinao/eslint-config-vite](./packages/eslint-config-vite/)   | [![npm](https://img.shields.io/npm/v/@macalinao/eslint-config-vite.svg?style=flat-square&labelColor=000000)](https://www.npmjs.com/package/@macalinao/eslint-config-vite)   | ESLint config for Vite apps, with React Refresh and TanStack Router               |

### TypeScript

**[@macalinao/tsconfig](./packages/tsconfig/)** — a strict base config plus environment-specific variants:

- `tsconfig.base.json` — recommended for libraries
- `tsconfig.node.json` — Node.js projects
- `tsconfig.bun.json` — Bun projects
- `tsconfig.dom.json` — browser projects
- `tsconfig.react.json` — React projects (`react-jsx`)
- `tsconfig.vite.json` — Vite apps (`noEmit`, `~/*` path alias)
- `tsconfig.cf.json` — Cloudflare Workers

```jsonc
// tsconfig.json
{
  "extends": "@macalinao/tsconfig/tsconfig.node.json",
}
```

### Linting and formatting

**[@macalinao/oxlint-config](./packages/oxlint-config/)** — the default linter for my projects.

```bash
bun add -D @macalinao/oxlint-config oxlint
```

```jsonc
// .oxlintrc.json
{
  "extends": ["./node_modules/@macalinao/oxlint-config/base.jsonc"],
}
```

**[@macalinao/biome-config](./packages/biome-config/)** — for projects using Biome instead of oxc.

```bash
bun add -D @macalinao/biome-config @biomejs/biome
```

```jsonc
// biome.jsonc
{
  "extends": ["@macalinao/biome-config/base"],
}
```

### ESLint

All three ESLint packages are ESM-only flat configs and require ESLint 9+. Each exports a `full` variant (every rule) and a `fast` variant (slower rules dropped in favor of Biome/oxlint).

```bash
bun add -D @macalinao/eslint-config eslint
```

```js
// eslint.config.js
import { configs } from "@macalinao/eslint-config";

export default [
  ...configs.fast,
  {
    languageOptions: {
      parserOptions: { tsconfigRootDir: import.meta.dirname },
    },
  },
];
```

- [@macalinao/eslint-config](./packages/eslint-config/) — `configs.base`, `configs.fast`
- [@macalinao/eslint-config-react](./packages/eslint-config-react/) — `configs.reactFull`, `configs.reactFast`
- [@macalinao/eslint-config-vite](./packages/eslint-config-vite/) — `configs.viteFull`, `configs.viteFast`

Each package's README has the full details.

## Development

This is a [Bun](https://bun.sh) workspace orchestrated with [Turbo](https://turbo.build). Requires Bun 1.0+ and Node 24+.

```bash
bun install
bun run build        # build all packages
bun run lint         # oxlint at the root, then ESLint per package
bun run lint:fix     # autofix lint and formatting
bun run format       # format with oxfmt
bun run format:check # check formatting without writing
bun run clean        # remove build artifacts
```

The documentation site lives in [`apps/docs-site`](./apps/docs-site/) (SvelteKit + Tailwind).

## Contributing

Every PR that changes a published package needs a changeset:

```bash
bun changeset
```

This prompts you to select the affected packages and describe your changes. Releases are published to npm from `master` via Changesets.

## License

[Apache-2.0](LICENSE.txt)

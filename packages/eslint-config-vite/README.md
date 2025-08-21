# @macalinao/eslint-config-vite

<a href="https://www.npmjs.com/package/@macalinao/eslint-config-vite"><img alt="NPM version" src="https://img.shields.io/npm/v/@macalinao/eslint-config-vite.svg?style=for-the-badge&labelColor=000000"></a>

ESLint configuration for Vite projects with React Refresh support.

This package is only available via ES Modules and requires ESLint 9 or greater, since it uses flat configs.

## Configurations

This package provides two configurations:

- **viteFull** - Full configuration extending `@macalinao/eslint-config-react` reactFull with React Refresh rules
- **viteFast** - Performance-optimized configuration extending `@macalinao/eslint-config-react` reactFast with React Refresh rules

### Recommended Starter Configuration

For most Vite React projects, use the fast configuration with TypeScript project settings:

```js
// eslint.config.js
import { configs } from "@macalinao/eslint-config-vite";

export default [
  // For full configuration with Prettier and all plugins
  // ...configs.viteFull,
  // For fast configuration optimized for Biome (recommended)
  ...configs.viteFast,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
```

## React Refresh Plugin

This configuration adds the `eslint-plugin-react-refresh` plugin to ensure your React components work properly with Vite's Hot Module Replacement (HMR):

### Key Rules

- **react-refresh/only-export-components** - Warns when files export things other than React components, which can break HMR
  - Configured with `{ allowConstantExport: true }` to allow constant exports alongside components

## Biome Integration

When using `viteFast`, you get the same React and Vite-specific rules but with the performance benefits from the base fast configuration:

### What's Different in Fast Mode

The fast configuration inherits optimizations from `@macalinao/eslint-config` fast mode:

- **No Prettier** - Use Biome's formatter instead
- **No simple-import-sort** - Use Biome's `organizeImports` instead
- **No unused-imports plugin** - Use Biome's `noUnusedImports` instead
- **Delegated rules** - Basic linting rules handled by Biome

### Vite & React-Specific Rules (Same in Both Configs)

All Vite and React-specific rules remain the same since Biome doesn't have equivalents:

- React recommended rules
- React Hooks rules
- JSX accessibility (strict mode)
- TanStack Query linting (from React config)
- TanStack Router linting (included in Vite config)
- React import validation
- React Refresh rules for Vite HMR

See [@macalinao/eslint-config README](https://github.com/macalinao/style-guide/tree/main/packages/eslint-config#biome-integration) for the full list of rules handled by Biome.

## License

Apache-2.0

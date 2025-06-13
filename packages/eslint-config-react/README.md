# @macalinao/eslint-config-react

<a href="https://www.npmjs.com/package/@macalinao/eslint-config-react"><img alt="NPM version" src="https://img.shields.io/npm/v/@macalinao/eslint-config-react.svg?style=for-the-badge&labelColor=000000"></a>

ESLint configuration to use for React projects using Tanstack Query and Router.

This package is only available via ES Modules and requires ESLint 9 or greater, since it uses flat configs.

## Configurations

This package provides two configurations:

- **reactFull** - Full configuration extending `@macalinao/eslint-config` base with React rules
- **reactFast** - Performance-optimized configuration extending `@macalinao/eslint-config` fast with React rules

## Usage

```js
// eslint.config.js
import { configs } from "@macalinao/eslint-config-react";

// For full configuration with Prettier and all plugins
export default configs.reactFull;

// For fast configuration optimized for Biome
export default configs.reactFast;
```

## Biome Integration

When using `reactFast`, you get the same React-specific rules but with the performance benefits from the base fast configuration:

### What's Different in Fast Mode

The fast configuration inherits optimizations from `@macalinao/eslint-config` fast mode:

- **No Prettier** - Use Biome's formatter instead
- **No simple-import-sort** - Use Biome's `organizeImports` instead
- **No unused-imports plugin** - Use Biome's `noUnusedImports` instead
- **Delegated rules** - Basic linting rules handled by Biome

### React-Specific Rules (Same in Both Configs)

All React-specific rules remain the same since Biome doesn't have React equivalents:

- React recommended rules
- React Hooks rules
- JSX accessibility (strict mode)
- TanStack Query linting
- TanStack Router linting
- React import validation

See [@macalinao/eslint-config README](https://github.com/macalinao/style-guide/tree/main/packages/eslint-config#biome-integration) for the full list of rules handled by Biome.

## License

Apache-2.0

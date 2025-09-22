# @macalinao/eslint-config

<a href="https://www.npmjs.com/package/@macalinao/eslint-config"><img alt="NPM version" src="https://img.shields.io/npm/v/@macalinao/eslint-config.svg?style=for-the-badge&labelColor=000000"></a>

Common ESLint configuration.

This package is only available via ES Modules and requires ESLint 9 or greater, since it uses flat configs.

## Configurations

This package provides two configurations:

- **base** - Full configuration with all rules including Prettier integration, import sorting, and unused imports detection
- **fast** - Performance-optimized configuration that removes slower rules in favor of Biome

### Recommended Starter Configuration

For most TypeScript projects, use the fast configuration with TypeScript project settings:

```js
// eslint.config.js
import { configs } from "@macalinao/eslint-config";

export default [
  // For full configuration with Prettier and all plugins
  // ...configs.base,
  // For fast configuration optimized for Biome (recommended)
  ...configs.fast,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
```

## Biome Integration

The `fast` configuration removes the following from the `base` configuration for better performance. **For optimal performance, use [`@macalinao/biome-config`](https://www.npmjs.com/package/@macalinao/biome-config)** which provides all the rules below pre-configured:

```bash
bun add -D @macalinao/biome-config @biomejs/biome
```

```jsonc
// biome.jsonc
{
  "$schema": "https://biomejs.dev/schemas/2.2.4/schema.json",
  "extends": ["@macalinao/biome-config/base"],
}
```

### Removed Plugins

- **Prettier** - Use Biome's formatter instead
- **simple-import-sort** - Use Biome's `organizeImports` instead
- **unused-imports** - Use Biome's `noUnusedImports` instead

### Rules Replaced by Biome

| Removed ESLint Rule                                                                                                 | Biome Replacement   | Biome Category   |
| ------------------------------------------------------------------------------------------------------------------- | ------------------- | ---------------- |
| `eqeqeq`                                                                                                            | `noDoubleEquals`    | `suspicious`     |
| `@typescript-eslint/consistent-type-imports`                                                                        | `useImportType`     | `style`          |
| `@typescript-eslint/no-unused-vars`                                                                                 | `noUnusedVariables` | `correctness`    |
| `unused-imports/no-unused-imports`                                                                                  | `noUnusedImports`   | `correctness`    |
| `simple-import-sort/imports`<br>`simple-import-sort/exports`<br>`import-x/first`<br>`import-x/newline-after-import` | `organizeImports`   | Built-in feature |

## License

Apache-2.0

# @macalinao/eslint-config

<a href="https://www.npmjs.com/package/@macalinao/eslint-config"><img alt="NPM version" src="https://img.shields.io/npm/v/@macalinao/eslint-config.svg?style=for-the-badge&labelColor=000000"></a>

Common ESLint configuration.

This package is only available via ES Modules and requires ESLint 9 or greater, since it uses flat configs.

## Configurations

This package provides two configurations:

- **base** - Full configuration with all rules including Prettier integration, import sorting, and unused imports detection
- **fast** - Performance-optimized configuration that removes slower rules in favor of Biome

## Biome Integration

The `fast` configuration removes the following from the `base` configuration for better performance:

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

To use these Biome rules, ensure your `biome.jsonc` includes:

```jsonc
{
  "organizeImports": { "enabled": true },
  "linter": {
    "rules": {
      "suspicious": {
        "noDoubleEquals": "error",
      },
      "style": {
        "useImportType": "error",
      },
      "correctness": {
        "noUnusedVariables": "warn",
        "noUnusedImports": "error",
      },
    },
  },
}
```

## License

Apache-2.0

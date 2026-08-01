// @macalinao/eslint-config is deliberately not declared in package.json:
// it would create a workspace dependency cycle (eslint-config builds with
// tsdown-config). It resolves via hoisting instead.
import { configs } from "@macalinao/eslint-config";

export default [
  ...configs.fast,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];

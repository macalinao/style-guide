// biome-ignore lint/correctness/noUndeclaredDependencies: declaring @macalinao/eslint-config here would create a workspace dependency cycle (eslint-config builds with tsdown-config); it resolves via hoisting
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

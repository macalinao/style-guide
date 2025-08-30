import type { TSESLint } from "@typescript-eslint/utils";
import tanstackRouterPlugin from "@tanstack/eslint-plugin-router";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export const vite: TSESLint.FlatConfig.ConfigArray = tseslint.config([
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      reactRefresh.configs.vite,
      tanstackRouterPlugin.configs["flat/recommended"],
    ],
  },
]);

import type { Linter } from "eslint";
import tanstackRouterPlugin from "@tanstack/eslint-plugin-router";
import { defineConfig } from "eslint/config";
import reactRefresh from "eslint-plugin-react-refresh";

export const vite: Linter.Config[] = defineConfig([
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      reactRefresh.configs.vite,
      tanstackRouterPlugin.configs["flat/recommended"],
    ],
  },
]);

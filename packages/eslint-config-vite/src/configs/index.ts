import { configs } from "@macalinao/eslint-config-react";
import type { TSESLint } from "@typescript-eslint/utils";

import { vite } from "./vite.js";

export { vite } from "./vite.js";

export const base: TSESLint.FlatConfig.ConfigArray = configs.base;

export const fast: TSESLint.FlatConfig.ConfigArray = configs.fast;

export const react: TSESLint.FlatConfig.ConfigArray = configs.react;

export const reactFull: TSESLint.FlatConfig.ConfigArray = configs.reactFull;

export const reactFast: TSESLint.FlatConfig.ConfigArray = configs.reactFast;

export const viteFull: TSESLint.FlatConfig.ConfigArray = [
  ...reactFull,
  ...vite,
];

export const viteFast: TSESLint.FlatConfig.ConfigArray = [
  ...reactFast,
  ...vite,
];

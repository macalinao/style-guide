import { configs } from "@macalinao/eslint-config";
import type { TSESLint } from "@typescript-eslint/utils";

import { default as react } from "./react.js";

export { default as react } from "./react.js";

export const base: TSESLint.FlatConfig.ConfigArray = configs.base;

export const fast: TSESLint.FlatConfig.ConfigArray = configs.fast;

export const reactFull: TSESLint.FlatConfig.ConfigArray = [...base, ...react];

export const reactFast: TSESLint.FlatConfig.ConfigArray = [...fast, ...react];

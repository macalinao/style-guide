import { configs } from "@macalinao/eslint-config";
import type { TSESLint } from "@typescript-eslint/utils";

import { default as react } from "./react.js";

export { default as react } from "./react.js";

export const base: TSESLint.FlatConfig.ConfigArray = configs.base;
export const reactFull: TSESLint.FlatConfig.ConfigArray = [...base, ...react];

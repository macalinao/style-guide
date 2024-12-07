import type { TSESLint } from "@typescript-eslint/utils";

import { default as base } from "./configs/base.js";
import { default as react } from "./configs/react.js";

export const configs: {
  base: TSESLint.FlatConfig.ConfigArray;
  react: TSESLint.FlatConfig.ConfigArray;
} = {
  base,
  react,
};

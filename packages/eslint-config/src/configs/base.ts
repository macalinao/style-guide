import type { TSESLint } from "@typescript-eslint/utils";
import { buildConfig } from "./builder.js";

export const base: TSESLint.FlatConfig.ConfigArray = buildConfig(false);

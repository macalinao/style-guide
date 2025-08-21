import type { TSESLint } from "@typescript-eslint/utils";
import { buildConfig } from "./builder.js";

export const fast: TSESLint.FlatConfig.ConfigArray = buildConfig(true);

import type { TSESLint } from "@typescript-eslint/utils";
import { buildConfig } from "./builder.js";

const base: TSESLint.FlatConfig.ConfigArray = buildConfig(false);

export default base;

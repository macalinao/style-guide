import type { TSESLint } from "@typescript-eslint/utils";
import { buildConfig } from "./builder.js";

const fast: TSESLint.FlatConfig.ConfigArray = buildConfig(true);

export default fast;

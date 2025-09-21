import type { Linter } from "eslint";
import { buildConfig } from "./builder.js";

export const fast: Linter.Config[] = buildConfig(true);

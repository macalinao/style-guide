import type { Linter } from "eslint";
import { buildConfig } from "./builder.js";

export const base: Linter.Config[] = buildConfig(false);

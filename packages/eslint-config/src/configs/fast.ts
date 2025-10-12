import type { Linter } from "eslint";
import { buildConfig } from "./builder.js";

export const fast: Linter.Config[] = buildConfig();

export const base: Linter.Config[] = fast;

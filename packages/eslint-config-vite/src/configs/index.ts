import type { Linter } from "eslint";
import { configs } from "@macalinao/eslint-config-react";
import { vite } from "./vite.js";

export { vite } from "./vite.js";

export const base: Linter.Config[] = configs.base;

export const fast: Linter.Config[] = configs.fast;

export const react: Linter.Config[] = configs.react;

export const reactFull: Linter.Config[] = configs.reactFull;

export const reactFast: Linter.Config[] = configs.reactFast;

export const viteFull: Linter.Config[] = [...reactFull, ...vite];

export const viteFast: Linter.Config[] = [...reactFast, ...vite];

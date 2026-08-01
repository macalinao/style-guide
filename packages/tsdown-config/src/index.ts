import type { UserConfig } from "tsdown";
import { defineConfig } from "tsdown";

/**
 * Shared tsdown build config for publishable library packages.
 *
 * Builds are unbundled, so `dist/` mirrors `src/` file-for-file and the
 * `exports` paths in each package.json keep resolving without a bundler.
 */
export const defineLibraryConfig = (overrides?: UserConfig): UserConfig =>
  defineConfig({
    entry: ["src/index.ts"],
    outDir: "dist",
    format: ["esm"],
    platform: "neutral",
    unbundle: true,
    dts: true,
    sourcemap: true,
    clean: true,
    // Validate package.json exports/main/types against the emitted files.
    publint: true,
    ...overrides,
  });

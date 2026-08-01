// Bootstrap: import from source rather than the package name, since this
// package cannot depend on its own build output.
// biome-ignore lint/correctness/useImportExtensions: tsdown's native config loader resolves real file paths only, and the file on disk is .ts
import { defineLibraryConfig } from "./src/index.ts";

export default defineLibraryConfig();

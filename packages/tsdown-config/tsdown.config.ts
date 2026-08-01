// Bootstrap: import from source (with the real .ts extension, which tsdown's
// native config loader requires) rather than the package name, since this
// package cannot depend on its own build output.
import { defineLibraryConfig } from "./src/index.ts";

export default defineLibraryConfig();

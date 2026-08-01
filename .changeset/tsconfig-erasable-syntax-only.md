---
"@macalinao/tsconfig": major
---

Target the modern Node.js + TypeScript world where TypeScript runs anywhere without a build step. Node.js can now execute TypeScript directly via type stripping, and TypeScript has grown flags that guarantee code is compatible with that world. The base config now enables `erasableSyntaxOnly`, `allowImportingTsExtensions`, `rewriteRelativeImportExtensions`, and `moduleDetection: "force"` (alongside the existing `verbatimModuleSyntax`), so source files can be run directly by Node while `tsc` emit rewrites relative `.ts` imports back to `.js` for correct published output. This bans runtime-only TypeScript syntax such as enums, namespaces, and class parameter properties, and requires relative imports to use explicit `.ts` extensions.

Also enables new strictness flags that can surface new errors in consuming projects: `exactOptionalPropertyTypes` (distinguishes `{x?: string}` from `{x: string | undefined}`), `noImplicitReturns`, and `noUncheckedSideEffectImports` (errors on side-effect imports of nonexistent modules).

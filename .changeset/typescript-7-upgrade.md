---
"@macalinao/eslint-config": patch
"@macalinao/eslint-config-react": patch
"@macalinao/eslint-config-vite": patch
---

Build with TypeScript 7 (native compiler). The `typescript` dependency is now an alias of `typescript@6.x`, which provides the JS compiler API that typescript-eslint requires (typescript-eslint does not yet support the TS 7 API), while `@typescript/native` provides the TypeScript 7 `tsc` used for builds. Consumers are unaffected; published output is unchanged.

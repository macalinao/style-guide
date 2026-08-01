---
"@macalinao/tsconfig": minor
---

Enable `erasableSyntaxOnly` in `tsconfig.base.json` so TypeScript files can be run directly by Node.js via type stripping. This disallows runtime TypeScript-only syntax such as enums, namespaces, and class parameter properties, which may surface new errors in consuming projects.

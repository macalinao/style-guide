---
"@macalinao/biome-config": minor
---

Update to Biome 2.5.4 and migrate the configuration accordingly: switch the deprecated `recommended: true` to `preset: "recommended"`, and move rules promoted out of `nursery` in 2.5 to their stable groups (`noForIn`, `noUnnecessaryConditions` → `suspicious`; `noRedundantDefaultExport`, `useArrayFind` → `complexity`; `useConsistentEnumValueType` → `style`). The `@biomejs/biome` peer dependency now requires 2.5.4.

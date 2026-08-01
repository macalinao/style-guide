# @macalinao/biome-config

## 0.4.0

### Minor Changes

- 82cb1e6: Update to Biome 2.5.4 and migrate the configuration accordingly: switch the deprecated `recommended: true` to `preset: "recommended"`, and move rules promoted out of `nursery` in 2.5 to their stable groups (`noForIn`, `noUnnecessaryConditions` → `suspicious`; `noRedundantDefaultExport`, `useArrayFind` → `complexity`; `useConsistentEnumValueType` → `style`). The `@biomejs/biome` peer dependency now requires 2.5.4.

## 0.3.0

### Minor Changes

- 9733055: Enable the `useMaxParams` (warn) and `noUselessCatchBinding` (error) lint rules. `useMaxParams` encourages passing named arguments via objects instead of many positional parameters.

## 0.2.0

### Minor Changes

- 8994a08: Migrate ESLint config to Biome
- 7c6a021: Much stricter Biome config

### Patch Changes

- 359acf0: Add no non-null assertion error to biome config

## 0.1.7

### Patch Changes

- 2f82a8c: Update all dependencies

## 0.1.6

### Patch Changes

- de1df4a: Update Biome to 2.3.3

## 0.1.5

### Patch Changes

- ff5e970: Update to Biome 2.3.1

## 0.1.4

### Patch Changes

- baebad4: Update Biome to 2.3.0
- d29001b: Biome react config

## 0.1.3

### Patch Changes

- 57edbe2: USe Biome 2.2.6

## 0.1.2

### Patch Changes

- e85d828: Update dependencies, support HTML formatting in BIome

## 0.1.1

### Patch Changes

- baa8bdf: README updates for reference to fast biome config

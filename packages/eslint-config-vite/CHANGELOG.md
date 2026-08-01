# @macalinao/eslint-config-vite

## 2.1.3

### Patch Changes

- 344f183: Build with tsdown (via `@macalinao/tsdown-config`) instead of tsc. Published entry points are unchanged; tsc now runs typecheck-only.
- Updated dependencies [344f183]
  - @macalinao/eslint-config-react@6.1.3

## 2.1.2

### Patch Changes

- 5f9d5a7: Build with TypeScript 7 (native compiler). The `typescript` dependency is now an alias of `typescript@6.x`, which provides the JS compiler API that typescript-eslint requires (typescript-eslint does not yet support the TS 7 API), while `@typescript/native` provides the TypeScript 7 `tsc` used for builds. Consumers are unaffected; published output is unchanged.
- Updated dependencies [5f9d5a7]
  - @macalinao/eslint-config-react@6.1.2

## 2.1.1

### Patch Changes

- 82cb1e6: Update dependencies: `@tanstack/eslint-plugin-router` to ^1.162.0, `eslint-plugin-react-refresh` to ^0.5.3, and `typescript-eslint` to ^8.64.0.
- Updated dependencies [82cb1e6]
  - @macalinao/eslint-config-react@6.1.1

## 2.1.0

### Minor Changes

- fb1aa28: Update to ESLint 10

### Patch Changes

- Updated dependencies [fb1aa28]
  - @macalinao/eslint-config-react@6.1.0

## 2.0.2

### Patch Changes

- 2f82a8c: Update all dependencies

## 2.0.1

### Patch Changes

- e3f9387: bump dependencies
- Updated dependencies [e3f9387]
- Updated dependencies [6d4f88b]
  - @macalinao/eslint-config-react@6.0.1

## 2.0.0

### Major Changes

- e6b01ce: Force republish with new major version

### Patch Changes

- Updated dependencies [e6b01ce]
  - @macalinao/eslint-config-react@6.0.0

## 1.0.3

### Patch Changes

- e85d828: Update dependencies, support HTML formatting in BIome
- Updated dependencies [e85d828]
  - @macalinao/eslint-config-react@5.0.3

## 1.0.2

### Patch Changes

- baa8bdf: README updates for reference to fast biome config
- Updated dependencies [baa8bdf]
  - @macalinao/eslint-config-react@5.0.2

## 1.0.1

### Patch Changes

- 582fb6f: Update to latest ESLint configs
- Updated dependencies [582fb6f]
  - @macalinao/eslint-config-react@5.0.1

## 1.0.0

### Major Changes

- 07aaebc: Switch more rules to using Biome rules for the fast version

### Patch Changes

- Updated dependencies [07aaebc]
  - @macalinao/eslint-config-react@5.0.0

## 0.1.1

### Patch Changes

- 38f6fd3: Switch to named exports
- 9994b07: Adds a Vite config
- Updated dependencies [38f6fd3]
- Updated dependencies [9994b07]
  - @macalinao/eslint-config-react@4.0.1

# @macalinao/oxlint-config

<a href="https://www.npmjs.com/package/@macalinao/oxlint-config"><img alt="NPM version" src="https://img.shields.io/npm/v/@macalinao/oxlint-config.svg?style=for-the-badge&labelColor=000000"></a>

Opinionated [oxlint](https://oxc.rs/docs/guide/usage/linter.html) configuration for modern TypeScript projects.

## Installation

```bash
bun add -D @macalinao/oxlint-config oxlint
```

## Usage

Create an `.oxlintrc.json` file in your project root:

```json
{
  "extends": ["./node_modules/@macalinao/oxlint-config/base.jsonc"]
}
```

Then lint your project:

```bash
oxlint
```

oxlint automatically discovers `.oxlintrc.json`. To point at a specific config
file, pass `-c`:

```bash
oxlint -c .oxlintrc.json
```

### TanStack Router

Apps built on [TanStack Router](https://tanstack.com/router) can stack the
`tanstack-router` add-on **after** the base config. It ignores the generated
`routeTree.gen.ts` and relaxes `react/only-export-components` for route modules
(which export loaders and route options next to their component by design):

```json
{
  "extends": [
    "./node_modules/@macalinao/oxlint-config/base.jsonc",
    "./node_modules/@macalinao/oxlint-config/tanstack-router.jsonc"
  ]
}
```

Order matters — list `base.jsonc` first so the add-on's overrides win.

## Type-aware rules

This config enables oxlint's type-aware rules (`options.typeAware`), which
mirror typescript-eslint's `strict-type-checked` + `stylistic-type-checked`
presets. Type-aware linting requires the
[`oxlint-tsgolint`](https://www.npmjs.com/package/oxlint-tsgolint) companion
binary. Install it alongside oxlint and run with the `--type-aware` flag:

```bash
bun add -D oxlint-tsgolint
oxlint --type-aware
```

Without `oxlint-tsgolint`, oxlint still runs every non-type-aware rule; the
type-aware rules are skipped.

## License

Apache-2.0

---

Part of [Ian Macalinao's style guide](https://style-guide.ianm.com).

# @macalinao/tsdown-config

<a href="https://www.npmjs.com/package/@macalinao/tsdown-config"><img alt="NPM version" src="https://img.shields.io/npm/v/@macalinao/tsdown-config.svg?style=for-the-badge&labelColor=000000"></a>

Common [tsdown](https://tsdown.dev) build configuration for library packages.

Builds are unbundled, so `dist/` mirrors `src/` file-for-file and the `exports` paths in each package.json keep resolving without a bundler. Declarations, source maps, and [publint](https://publint.dev) validation are enabled by default.

## Usage

Install alongside tsdown:

```bash
bun add -D tsdown @macalinao/tsdown-config
```

Create a `tsdown.config.ts`:

```ts
import { defineLibraryConfig } from "@macalinao/tsdown-config";

export default defineLibraryConfig();
```

Pass overrides to extend or replace any default:

```ts
import { defineLibraryConfig } from "@macalinao/tsdown-config";

export default defineLibraryConfig({
  entry: ["src/index.ts", "src/cli.ts"],
  platform: "node",
});
```

Then build with:

```bash
tsdown
```

## License

Apache-2.0

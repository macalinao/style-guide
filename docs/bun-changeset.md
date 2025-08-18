# Setting up Changesets with Bun Workspaces

Changesets does not support Bun out of the box: it doesn't resolve workspaces or catalogs. This is a known issue ([Bun incompatibility](https://github.com/oven-sh/bun/issues/16074), [workspace protocol support request](https://github.com/changesets/changesets/issues/1454), [unmerged PR for workspace support](https://github.com/changesets/changesets/pull/674)). Here's how to resolve it.

## The Problem

When you try to publish packages with Changesets in a Bun monorepo, your published packages will contain unresolved `workspace:*` references:

```json
{
  "name": "@macalinao/eslint-config-react",
  "dependencies": {
    "@macalinao/eslint-config": "workspace:*"
  }
}
```

This breaks npm installations for anyone trying to use your packages. The workspace references that work perfectly in development don't get resolved to actual version numbers during publishing.

## My Solution

I created custom scripts that ensure workspace references get resolved properly. You can see the full implementation in my [style-guide repository](https://github.com/macalinao/style-guide):

```json
{
  "scripts": {
    "ci:version": "changeset version && bun update",
    "ci:publish": "for dir in packages/*; do (cd \"$dir\" && bun publish || true); done && changeset tag"
  }
}
```

### Why I Added `bun update`

The key insight was adding `bun update` after `changeset version`. Here's what happens:

1. `changeset version` updates the version numbers in package.json files
2. `bun update` then fixes the bun.lockb file to properly resolve all `workspace:*` references to these new version numbers

Without `bun update`, the lockfile remains out of sync with the updated package versions. This causes `bun publish` to fail or publish packages with unresolved workspace references. The `bun update` command ensures that when `@macalinao/eslint-config` gets bumped to version 4.2.2, the lockfile is updated so that `bun publish` can properly resolve and replace `workspace:*` with `4.2.2` during publishing.

## Why I Publish All Packages

Instead of using `changeset publish`, I iterate through every package and publish them individually:

```bash
for dir in packages/*; do
  (cd "$dir" && bun publish || true)
done && changeset tag
```

I do this because:

1. It ensures all `workspace:*` references are resolved before publishing
2. The `|| true` means if one package fails (maybe it's already published), the others still get published
3. I get direct control over the publishing process using Bun's native publish command
4. After everything publishes, I create git tags with `changeset tag`

This approach prevents partial-publish disasters where some packages would fail and leave my monorepo in an inconsistent state.

## Setting up the GitHub Actions release workflow

The GitHub action is largely the same as the official documentation, utilizing the [changesets/action](https://github.com/changesets/action) GitHub action. Here's my workflow from the [release.yml](https://github.com/macalinao/style-guide/blob/master/.github/workflows/release.yml):

```yaml
name: Release
on:
  push:
    branches:
      - master

jobs:
  version:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - uses: oven-sh/setup-bun@v2

      - name: Setup npmrc
        run: echo "//registry.npmjs.org/:_authToken=${{ secrets.NPM_TOKEN }}" > .npmrc

      - name: Install dependencies
        run: bun install --frozen-lockfile

      - name: Build
        run: bun run build

      - name: Create and publish versions
        uses: changesets/action@v1
        with:
          version: bun run ci:version
          commit: "chore: update versions"
          title: "chore: update versions"
          publish: bun run ci:publish
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

The workflow:

1. Sets up Bun using `oven-sh/setup-bun@v2`
2. Creates an `.npmrc` with my npm auth token
3. Builds all packages before publishing
4. Uses the changesets action with my custom `ci:version` and `ci:publish` scripts

When I push changesets to master, this workflow creates a PR with version updates. When I merge that PR, it automatically publishes all packages to npm.

## Configuration Details

Each package needs proper publishing configuration to publish to npm:

```json
{
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  }
}
```

A similar configuration works for private packages published on GitHub Packages:

```json
{
  "publishConfig": {
    "access": "restricted",
    "registry": "https://npm.pkg.github.com/"
  }
}
```

The workflow just uses `bun publish`, so you can use the same configuration you'd use for `yarn` or `pnpm`.

## The Complete Workflow

Here's how I release packages now:

1. I make changes and create changesets with `bun changeset`
2. I push to master, which triggers the GitHub Action
3. The action creates a "Version Packages" PR
4. I merge the PR, which triggers another action run
5. The action publishes all packages with resolved dependencies

The beauty is that what I test locally with `workspace:*` references is exactly what gets published to npm, just with resolved version numbers.

## Looking Forward

This workaround has been working reliably for my monorepo, but I'm looking forward to first-class support. The Bun team is aware of the issue ([#16074](https://github.com/oven-sh/bun/issues/16074)), and hopefully we'll see native Changesets support soon.

Until then, the combination of `bun update` after versioning and publishing all packages together has proven to be a robust solution. If you're struggling with the same issue, feel free to check out my [style-guide repo](https://github.com/macalinao/style-guide) for a working example.

The key takeaway: always run `bun update` after `changeset version` to resolve workspace references, and use `bun publish` directly when publishing. This approach has eliminated all the workspace reference issues I was experiencing.

---
name: update-nixpkgs
description: Update the nixpkgs flake input to the latest Determinate Nix (FlakeHub) revision and pin the repo's npm tool versions (biome, turbo, typescript, bun) to exactly match what nixpkgs provides. Use when the user asks to update nixpkgs, bump the flake, or resync tool versions with nix.
---

# Update nixpkgs

This repo's `flake.nix` provides the dev toolchain from nixpkgs. The npm
package versions declared in `package.json` files must **exactly match** the
versions nixpkgs ships, so the CLI tools you get from `nix develop` are the
same ones `bun` resolves. This skill updates nixpkgs and re-pins those
versions.

The nixpkgs input tracks **Determinate Nix's FlakeHub `nixpkgs-weekly`**
(`https://flakehub.com/f/DeterminateSystems/nixpkgs-weekly/*`), not the
NixOS `nixpkgs-unstable` channel.

## Steps

### 1. Update the nixpkgs input

```sh
nix flake update nixpkgs
```

### 2. Read the versions nixpkgs now provides

The root `nixpkgs` input may be node `nixpkgs_2` in `flake.lock` (git-hooks /
lintel bring their own). Always query through the flake input, not the global
`nixpkgs#` registry (that points at a different revision):

```sh
SYS=$(nix eval --raw --impure --expr 'builtins.currentSystem')
for p in oxlint oxfmt tsgolint turbo biome typescript bun; do
  v=$(nix eval --raw --impure --expr \
    "(builtins.getFlake (toString ./.)).inputs.nixpkgs.legacyPackages.${SYS}.${p}.version")
  echo "$p = $v"
done
```

### 3. Pin the overlapping npm versions to match (exact, no caret)

Caret ranges (`^2.4.16`) let `bun` resolve **above** nixpkgs, which defeats the
purpose. Pin these **exactly** (no `^`) so `bun.lock` matches nixpkgs:

| nixpkgs pkg  | where to pin (exact version)                                                                                                                                         |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `biome`      | `package.json` → `workspaces.catalog["@biomejs/biome"]` and `devDependencies["@biomejs/biome"]`; `biome.jsonc` → `$schema` URL (`.../schemas/<version>/schema.json`) |
| `turbo`      | `package.json` → `devDependencies.turbo`; `packages/eslint-config/package.json` → `dependencies["eslint-config-turbo"]` (published in lockstep with turbo)           |
| `typescript` | `package.json` → `workspaces.catalog.typescript` and `devDependencies.typescript`                                                                                    |
| `bun`        | `package.json` → `packageManager` field (`bun@<version>`)                                                                                                            |

`oxlint`, `oxfmt`, and `tsgolint` are nix-only CLIs (no npm dependency in this
repo), so there is nothing to pin for them — they only live in the flake
`devShell`. Leave non-nix deps (`eslint`, `typescript-eslint`, `prettier`,
`@changesets/cli`, etc.) untouched.

### 4. Sync the lockfile and verify the match

```sh
bun install
grep -oE '(@biomejs/biome|eslint-config-turbo|turbo|typescript)@[0-9]+\.[0-9]+\.[0-9]+' bun.lock | sort -u
```

The grepped versions must equal the nixpkgs versions from step 2. If `bun`
resolved anything higher, the specifier is still a range — fix it to exact.

### 5. Confirm nothing broke

```sh
nix eval --raw .#devShells.$(nix eval --raw --impure --expr 'builtins.currentSystem').default.drvPath >/dev/null && echo "flake OK"
bun run build
bun run lint
```

### 6. Report

Summarize the before → after version changes for each pinned tool.

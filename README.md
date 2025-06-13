# Ian Macalinao's Style Guide

This monorepo contains ESLint and TypeScript configurations used across my projects.

Notes:

- ~~I use default Prettier settings.~~ I use Biome formatting and linting. Prettier has performance issues with large codebases.
- I only use ES Modules. Dual CommonJS/ESM is a minefield that isn't worth the hassle.

## Packages

- [@macalinao/tsconfig](./packages/tsconfig/)
- [@macalinao/eslint-config](./packages/eslint-config/)
- [@macalinao/eslint-config-react](./packages/eslint-config-react/)

## License

[Apache-2.0](LICENSE.txt)

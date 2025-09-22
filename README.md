# Ian Macalinao's Style Guide

This monorepo contains ESLint and TypeScript configurations used across my projects.

Notes:

- ~~I use default Prettier settings.~~ I use Biome formatting and linting. Prettier has performance issues with large codebases.
- I only use ES Modules. Dual CommonJS/ESM is a minefield that isn't worth the hassle.

## Packages

### TypeScript Configuration

- [@macalinao/tsconfig](./packages/tsconfig/) - TypeScript configurations for different environments (Node.js, DOM, React, Vite, Cloudflare Workers)

### Biome Configuration

- [@macalinao/biome-config](./packages/biome-config/) - Fast, opinionated Biome configuration for formatting and linting

### ESLint Configurations

- [@macalinao/eslint-config](./packages/eslint-config/) - Base ESLint configuration with TypeScript support
- [@macalinao/eslint-config-react](./packages/eslint-config-react/) - ESLint configuration for React projects with TanStack Query
- [@macalinao/eslint-config-vite](./packages/eslint-config-vite/) - ESLint configuration for Vite projects with React Refresh and TanStack Router

## Contributing

To create a changeset for your changes, run:

```bash
bun changeset
```

This will prompt you to select the packages affected and describe your changes.

## License

[Apache-2.0](LICENSE.txt)

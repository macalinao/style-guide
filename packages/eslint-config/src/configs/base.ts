import eslint from "@eslint/js";
import * as tsParser from "@typescript-eslint/parser";
import type { TSESLint } from "@typescript-eslint/utils";
import * as tsResolver from "eslint-import-resolver-typescript";
// https://github.com/import-js/eslint-plugin-import/issues/2948
import * as importPlugin from "eslint-plugin-import-x";
import prettierConfig from "eslint-plugin-prettier/recommended";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import * as turboPlugin from "eslint-plugin-turbo";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";

const base: TSESLint.FlatConfig.ConfigArray = tseslint.config(
  // Files we never want to lint
  {
    ignores: ["**/.wrangler/**", "dist/**/*", "vite.config.ts.timestamp-*.mjs"],
  },

  // ESLint defaults
  eslint.configs.recommended,

  // Prettier. This is slow; candidate for removal.
  prettierConfig,

  // ESLint import plugin defaults
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    settings: {
      "import-x/resolver": {
        name: "tsResolver",
        resolver: tsResolver,
        options: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      "no-unused-vars": "off",
      "import-x/no-dynamic-require": "warn",
      "import-x/no-nodejs-modules": "warn",
    },
  },

  // TypeScript linting
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["eslint.config.*", "tailwind.config.*"],
        },
      },
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.es2024,
        ...globals.worker,
      },
    },

    settings: {
      ...turboPlugin.configs.recommended.settings,
    },

    plugins: {
      "simple-import-sort": simpleImportSortPlugin,
      "unused-imports": unusedImportsPlugin,
      turbo: turboPlugin,
    },

    rules: {
      ...turboPlugin.configs.recommended.rules,

      eqeqeq: "error",
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        { accessibility: "no-public" },
      ],

      // Performance for typed linting
      // https://typescript-eslint.io/troubleshooting/typed-linting/performance/#eslint-plugin-import
      "import-x/named": "off",
      "import-x/namespace": "off",
      "import-x/default": "off",
      "import-x/no-named-as-default-member": "off",
      "import-x/no-unresolved": "off",
      "import-x/extensions": "off",

      // import stuff
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "import-x/first": "warn",
      "import-x/newline-after-import": "warn",
      "import-x/no-duplicates": "warn",
      "import-x/no-extraneous-dependencies": "error",
      // Should not allow mixed import styles
      "import-x/consistent-type-specifier-style": "error",

      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      // Enforce that private members are prefixed with an underscore
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "memberLike",
          modifiers: ["private"],
          format: ["camelCase"],
          leadingUnderscore: "require",
        },
      ],
    },
  },
  {
    files: [
      "*.cjs",
      "eslint.config.js",
      "eslint.config.cjs",
      "metro.config.cjs",
      "next.config.mjs",
      "withTwin.mjs",
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ["*.cjs"],

    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "commonjs",
      },
    },
    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },

  // Disable type checking for all non-TypeScript files
  {
    files: ["**/*.{js,cjs,mjs}"],
    ...tseslint.configs.disableTypeChecked,
  },
);

export default base;

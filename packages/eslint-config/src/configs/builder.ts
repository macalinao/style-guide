import type { Linter } from "eslint";
import eslint from "@eslint/js";
import * as tsParser from "@typescript-eslint/parser";
import { defineConfig, globalIgnores } from "eslint/config";
import turboConfig from "eslint-config-turbo/flat";
import * as tsResolver from "eslint-import-resolver-typescript";
import { importX } from "eslint-plugin-import-x";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";

export function buildConfig(fast = false): Linter.Config[] {
  return defineConfig(
    // Files we never want to lint
    globalIgnores([
      "**/.wrangler/**",
      "dist/**/*",
      "vite.config.ts.timestamp-*.mjs",
    ]),
    {
      files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
      extends: [
        // ESLint defaults
        eslint.configs.recommended,

        // ESLint import plugin defaults
        // Prettier config only for base (not fast)
        ...(fast
          ? []
          : [
              importX.flatConfigs.recommended as Linter.Config,
              importX.flatConfigs.typescript as Linter.Config,
              eslintPluginPrettier,
            ]),

        tseslint.configs.strictTypeChecked,
        tseslint.configs.stylisticTypeChecked,

        // TypeScript stuff

        // Turborepo
        turboConfig,
      ],
      languageOptions: {
        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",
        parserOptions: {
          projectService: {
            allowDefaultProject: ["eslint.config.*", "tailwind.config.*"],
          },
        },
        globals: {
          ...globals.browser,
          ...globals.es2024,
          ...globals.worker,
        },
      },
      plugins: fast
        ? {}
        : {
            "simple-import-sort": simpleImportSortPlugin,
            "unused-imports": unusedImportsPlugin,
          },
      settings: fast
        ? {}
        : {
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

        "@typescript-eslint/explicit-member-accessibility": [
          "error",
          { accessibility: "no-public" },
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

        // Additional rules only for base config
        ...(fast
          ? {
              "@typescript-eslint/no-non-null-assertion": "off",
            }
          : {
              eqeqeq: "error",

              "import-x/no-dynamic-require": "warn",
              "import-x/no-nodejs-modules": "off",

              // Performance for typed linting
              "import-x/named": "off",
              "import-x/namespace": "off",
              "import-x/default": "off",
              "import-x/no-named-as-default-member": "off",
              "import-x/no-unresolved": "off",
              "import-x/extensions": "off",

              // Common import rules
              "import-x/no-duplicates": "warn",
              "import-x/no-extraneous-dependencies": "error",
              "import-x/consistent-type-specifier-style": "error",

              // Import sorting
              "simple-import-sort/imports": "error",
              "simple-import-sort/exports": "error",
              "import-x/first": "warn",
              "import-x/newline-after-import": "warn",

              // Unused imports
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
            }),
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
}

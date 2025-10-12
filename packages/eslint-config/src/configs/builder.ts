import type { Linter } from "eslint";
import eslint from "@eslint/js";
import * as tsParser from "@typescript-eslint/parser";
import { defineConfig, globalIgnores } from "eslint/config";
import turboConfig from "eslint-config-turbo/flat";
import globals from "globals";
import tseslint from "typescript-eslint";

export function buildConfig(): Linter.Config[] {
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

        // Handles by Biome
        "@typescript-eslint/no-non-null-assertion": "off",
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

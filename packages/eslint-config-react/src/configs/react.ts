import type { Linter } from "eslint";
import tanstackQueryPlugin from "@tanstack/eslint-plugin-query";
import { defineConfig } from "eslint/config";
import reactPlugin from "eslint-plugin-react";
import { default as hooksPlugin } from "eslint-plugin-react-hooks";

export const react: Linter.Config[] = defineConfig(
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    // Check JSX on .tsx files
    files: ["**/*.tsx"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [
      tanstackQueryPlugin.configs["flat/recommended"],
      reactPlugin.configs.flat.recommended as Linter.Config,
      reactPlugin.configs.flat["jsx-runtime"] as Linter.Config,
      hooksPlugin.configs.flat["recommended-latest"],
    ],
    rules: {
      // don't think this is necessary
      "react/react-in-jsx-scope": "off",
      // should validate props with TypeScript
      "react/prop-types": "off",
      // twin.macro stuff
      "react/no-unknown-property": [
        "error",
        { ignore: ["css", "tw", "vaul-drawer-wrapper"] },
      ],
    },
  },
);

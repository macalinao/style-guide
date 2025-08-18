import tanstackQueryPlugin from "@tanstack/eslint-plugin-query";
import tanstackRouterPlugin from "@tanstack/eslint-plugin-router";
import type { TSESLint } from "@typescript-eslint/utils";
import * as importPlugin from "eslint-plugin-import-x";
import a11yPlugin from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

const react: TSESLint.FlatConfig.ConfigArray = tseslint.config(
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
      hooksPlugin.configs["recommended-latest"],
      importPlugin.flatConfigs.react,
      tanstackQueryPlugin.configs["flat/recommended"],
      tanstackRouterPlugin.configs["flat/recommended"],
      reactPlugin.configs.flat.recommended as TSESLint.FlatConfig.Config,
      reactPlugin.configs.flat["jsx-runtime"] as TSESLint.FlatConfig.Config,
      a11yPlugin.flatConfigs.strict,
    ],
    rules: {
      ...hooksPlugin.configs.recommended.rules,
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

export default react;

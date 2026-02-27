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
        // --- ESLint core rules handled by Biome (recommended) ---
        "constructor-super": "off", // Biome: noInvalidConstructorSuper
        "for-direction": "off", // Biome: useValidForDirection
        "getter-return": "off", // Biome: useGetterReturn
        "no-async-promise-executor": "off", // Biome: noAsyncPromiseExecutor
        "no-case-declarations": "off", // Biome: noSwitchDeclarations
        "no-class-assign": "off", // Biome: noClassAssign
        "no-compare-neg-zero": "off", // Biome: noCompareNegZero
        "no-cond-assign": "off", // Biome: noAssignInExpressions
        "no-const-assign": "off", // Biome: noConstAssign
        "no-constant-condition": "off", // Biome: noConstantCondition
        "no-control-regex": "off", // Biome: noControlCharactersInRegex
        "no-debugger": "off", // Biome: noDebugger
        "no-dupe-args": "off", // Biome: noDuplicateParameters
        "no-dupe-class-members": "off", // Biome: noDuplicateClassMembers
        "no-dupe-else-if": "off", // Biome: noDuplicateElseIf
        "no-dupe-keys": "off", // Biome: noDuplicateObjectKeys
        "no-duplicate-case": "off", // Biome: noDuplicateCase
        "no-empty": "off", // Biome: noEmptyBlockStatements
        "no-empty-character-class": "off", // Biome: noEmptyCharacterClassInRegex
        "no-empty-pattern": "off", // Biome: noEmptyPattern
        "no-empty-static-block": "off", // Biome: noEmptyBlockStatements
        "no-ex-assign": "off", // Biome: noCatchAssign
        "no-extra-boolean-cast": "off", // Biome: noExtraBooleanCast
        "no-fallthrough": "off", // Biome: noFallthroughSwitchClause
        "no-func-assign": "off", // Biome: noFunctionAssign
        "no-global-assign": "off", // Biome: noGlobalAssign
        "no-import-assign": "off", // Biome: noImportAssign
        "no-irregular-whitespace": "off", // Biome: noIrregularWhitespace
        "no-loss-of-precision": "off", // Biome: noPrecisionLoss
        "no-misleading-character-class": "off", // Biome: noMisleadingCharacterClass
        "no-new-native-nonconstructor": "off", // Biome: noInvalidBuiltinInstantiation
        "no-nonoctal-decimal-escape": "off", // Biome: noNonoctalDecimalEscape
        "no-obj-calls": "off", // Biome: noGlobalObjectCalls
        "no-prototype-builtins": "off", // Biome: noPrototypeBuiltins
        "no-redeclare": "off", // Biome: noRedeclare
        "no-regex-spaces": "off", // Biome: noMultipleSpacesInRegex
        "no-self-assign": "off", // Biome: noSelfAssign
        "no-setter-return": "off", // Biome: noSetterReturn
        "no-shadow-restricted-names": "off", // Biome: noShadowRestrictedNames
        "no-sparse-arrays": "off", // Biome: noSparseArray
        "no-this-before-super": "off", // Biome: noUnreachableSuper
        "no-undef": "off", // Biome: noUndeclaredVariables
        "no-unreachable": "off", // Biome: noUnreachable
        "no-unsafe-finally": "off", // Biome: noUnsafeFinally
        "no-unsafe-negation": "off", // Biome: noUnsafeNegation
        "no-unsafe-optional-chaining": "off", // Biome: noUnsafeOptionalChaining
        "no-unused-labels": "off", // Biome: noUnusedLabels
        "no-unused-private-class-members": "off", // Biome: noUnusedPrivateClassMembers
        "no-unused-vars": "off", // Biome: noUnusedVariables
        "no-useless-catch": "off", // Biome: noUselessCatch
        "no-useless-escape": "off", // Biome: noUselessEscapeInRegex
        "no-with": "off", // Biome: noWith
        "require-yield": "off", // Biome: useYield
        "use-isnan": "off", // Biome: useIsNan
        "valid-typeof": "off", // Biome: useValidTypeof

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

        // --- Handled by Biome (recommended) ---
        "@typescript-eslint/adjacent-overload-signatures": "off", // Biome: useAdjacentOverloadSignatures
        "@typescript-eslint/ban-ts-comment": "off", // Biome: noTsIgnore
        "@typescript-eslint/dot-notation": "off", // Biome: useLiteralKeys
        "@typescript-eslint/no-array-constructor": "off", // Biome: useArrayLiterals
        "@typescript-eslint/no-empty-object-type": "off", // Biome: noBannedTypes
        "@typescript-eslint/no-extra-non-null-assertion": "off", // Biome: noExtraNonNullAssertion
        "@typescript-eslint/no-extraneous-class": "off", // Biome: noStaticOnlyClass
        "@typescript-eslint/no-misused-new": "off", // Biome: noMisleadingInstantiator
        "@typescript-eslint/no-non-null-asserted-optional-chain": "off", // Biome: noNonNullAssertedOptionalChain
        "@typescript-eslint/no-non-null-assertion": "off", // Biome: noNonNullAssertion
        "@typescript-eslint/no-this-alias": "off", // Biome: noUselessThisAlias
        "@typescript-eslint/no-unnecessary-type-constraint": "off", // Biome: noUselessTypeConstraint
        "@typescript-eslint/no-unsafe-declaration-merging": "off", // Biome: noUnsafeDeclarationMerging
        "@typescript-eslint/no-unsafe-function-type": "off", // Biome: noBannedTypes
        "@typescript-eslint/no-unused-vars": "off", // Biome: noUnusedVariables
        "@typescript-eslint/no-useless-constructor": "off", // Biome: noUselessConstructor
        "@typescript-eslint/no-wrapper-object-types": "off", // Biome: noBannedTypes
        "@typescript-eslint/prefer-as-const": "off", // Biome: useAsConstAssertion
        "@typescript-eslint/prefer-function-type": "off", // Biome: useShorthandFunctionType
        "@typescript-eslint/prefer-literal-enum-member": "off", // Biome: useLiteralEnumMembers
        "@typescript-eslint/prefer-namespace-keyword": "off", // Biome: useNamespaceKeyword
        "@typescript-eslint/prefer-optional-chain": "off", // Biome: useOptionalChain

        // --- Handled by Biome (explicit config) ---
        "@typescript-eslint/array-type": "off", // Biome: useConsistentArrayType
        "@typescript-eslint/await-thenable": "off", // Biome: useAwaitThenable
        "@typescript-eslint/consistent-type-definitions": "off", // Biome: useConsistentTypeDefinitions
        "@typescript-eslint/no-deprecated": "off", // Biome: noDeprecatedImports
        "@typescript-eslint/no-empty-function": "off", // Biome: noEmptyBlockStatements
        "@typescript-eslint/no-explicit-any": "off", // Biome: noExplicitAny
        "@typescript-eslint/no-floating-promises": "off", // Biome: noFloatingPromises
        "@typescript-eslint/no-for-in-array": "off", // Biome: noForIn
        "@typescript-eslint/no-inferrable-types": "off", // Biome: noInferrableTypes
        "@typescript-eslint/no-invalid-void-type": "off", // Biome: noConfusingVoidType
        "@typescript-eslint/no-misused-promises": "off", // Biome: noMisusedPromises
        "@typescript-eslint/no-mixed-enums": "off", // Biome: useConsistentEnumValueType
        "@typescript-eslint/no-require-imports": "off", // Biome: noCommonJs
        "@typescript-eslint/no-unnecessary-condition": "off", // Biome: noUnnecessaryConditions
        "@typescript-eslint/only-throw-error": "off", // Biome: useThrowOnlyError
        "@typescript-eslint/prefer-find": "off", // Biome: useFind
        "@typescript-eslint/prefer-for-of": "off", // Biome: useForOf
        "@typescript-eslint/prefer-regexp-exec": "off", // Biome: useRegexpExec
        "@typescript-eslint/require-await": "off", // Biome: useAwait
        "@typescript-eslint/unified-signatures": "off", // Biome: useUnifiedTypeSignatures
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

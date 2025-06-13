import type { TSESLint } from "@typescript-eslint/utils";

declare module "eslint-plugin-react-hooks" {
  const plugin: TSESLint.FlatConfig.Plugin & {
    configs: {
      recommended: TSESLint.FlatConfig.Config;
    };
  };
  export = plugin;
}

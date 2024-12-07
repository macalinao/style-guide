declare module "eslint-plugin-react-hooks" {
  import type { TSESLint } from "@typescript-eslint/utils";

  const plugin: TSESLint.FlatConfig.Plugin & {
    configs: {
      recommended: TSESLint.FlatConfig.Config;
    };
  };
  export = plugin;
}

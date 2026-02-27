{ pkgs, inputs, ... }:

let
  lintel = inputs.lintel.packages.${pkgs.stdenv.system}.default;
in
{
  packages = with pkgs; [
    nixfmt
    git
    lintel
  ];

  dotenv.enable = true;
  languages.javascript = {
    enable = true;
    bun.enable = true;
  };

  git-hooks.hooks = {
    biome = {
      enable = true;
      name = "biome check";
      entry = "bunx biome check --write --unsafe";
      files = "\\.(js|jsx|ts|tsx|cjs|mjs|cts|mts|json|jsonc)$";
      language = "system";
    };
    eslint = {
      enable = true;
      name = "eslint";
      entry = "bun eslint --fix --cache";
      files = "\\.(js|jsx|ts|tsx|cjs|mjs|cts|mts)$";
      language = "system";
    };
    nixfmt = {
      enable = true;
    };
    lintel = {
      enable = true;
      name = "lintel check";
      entry = "${lintel}/bin/lintel check --fix";
      language = "system";
      pass_filenames = true;
    };
  };
}

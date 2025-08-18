{ pkgs, ... }:

{
  packages = with pkgs; [
    nixfmt-rfc-style
    git
    biome
  ];

  dotenv.enable = true;
  languages.javascript = {
    enable = true;
    bun.enable = true;
  };
}

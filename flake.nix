{
  description = "Ian Macalinao's standardized TypeScript and ESLint configurations";

  inputs = {
    nixpkgs.url = "https://flakehub.com/f/DeterminateSystems/nixpkgs-weekly/*";
    flake-utils.url = "github:numtide/flake-utils";
    git-hooks = {
      url = "github:cachix/git-hooks.nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    lintel.url = "github:lintel-rs/lintel";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
      git-hooks,
      lintel,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        lintelPkg = lintel.packages.${system}.default;

        pre-commit-check = git-hooks.lib.${system}.run {
          src = ./.;
          hooks = {
            biome = {
              enable = true;
              name = "biome check";
              entry = "bunx biome check --write --unsafe";
              files = "\\.(js|jsx|ts|tsx|cjs|mjs|cts|mts|json|jsonc)$";
              language = "system";
            };
            nixfmt.enable = true;
            lintel = {
              enable = true;
              name = "lintel check";
              entry = "${lintelPkg}/bin/lintel check --fix";
              language = "system";
              pass_filenames = true;
            };
          };
        };
      in
      {
        checks.pre-commit-check = pre-commit-check;

        devShells.default = pkgs.mkShell {
          inherit (pre-commit-check) shellHook;
          buildInputs =
            pre-commit-check.enabledPackages
            ++ (with pkgs; [
              nixfmt
              git
              nodejs_24
              bun
              turbo
              oxlint
              oxfmt
              tsgolint
              lintelPkg
            ]);
        };
      }
    );
}

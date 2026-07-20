{
  description = "Ian Macalinao's standardized TypeScript and ESLint configurations";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
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
            oxfmt = {
              enable = true;
              name = "oxfmt";
              entry = "bunx oxfmt --no-error-on-unmatched-pattern";
              files = "\\.(js|jsx|ts|tsx|cjs|mjs|cts|mts|json|jsonc|css|md|yaml|yml)$";
              language = "system";
            };
            nixfmt-rfc-style.enable = true;
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
              bun
              lintelPkg
            ]);
        };
      }
    );
}

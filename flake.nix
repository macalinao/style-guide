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

        # biome.json extends @macalinao/biome-config, which lives in this repo;
        # link it into node_modules when bun install hasn't run (nix sandbox).
        biomeCheck = pkgs.writeShellScript "biome-check" ''
          if [ ! -e node_modules/@macalinao/biome-config ]; then
            mkdir -p node_modules/@macalinao
            ln -s "$PWD/packages/biome-config" node_modules/@macalinao/biome-config
          fi
          exec ${pkgs.biome}/bin/biome check --write --unsafe "$@"
        '';

        # Lintel fetches JSON schemas over the network, which the nix build
        # sandbox forbids, so it only runs in the dev shell's git hooks.
        mkPreCommitCheck =
          { withLintel }:
          git-hooks.lib.${system}.run {
            src = ./.;
            hooks = {
              biome = {
                enable = true;
                name = "biome check";
                entry = "${biomeCheck}";
                files = "\\.(js|jsx|ts|tsx|cjs|mjs|cts|mts|json|jsonc)$";
                language = "system";
              };
              nixfmt.enable = true;
              lintel = {
                enable = withLintel;
                name = "lintel check";
                entry = "${lintelPkg}/bin/lintel check --fix";
                language = "system";
                pass_filenames = true;
              };
            };
          };

        pre-commit-check = mkPreCommitCheck { withLintel = false; };
        pre-commit-shell = mkPreCommitCheck { withLintel = true; };
      in
      {
        checks.pre-commit-check = pre-commit-check;

        devShells.default = pkgs.mkShell {
          inherit (pre-commit-shell) shellHook;
          buildInputs =
            pre-commit-shell.enabledPackages
            ++ (with pkgs; [
              nixfmt
              git
              nodejs_24
              bun
              nodejs
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

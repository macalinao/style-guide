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

        # Lintel fetches JSON schemas over the network, which the nix build
        # sandbox forbids, so it only runs in the dev shell's git hooks.
        mkPreCommitCheck =
          { withLintel }:
          git-hooks.lib.${system}.run {
            src = ./.;
            hooks = {
              oxfmt = {
                enable = true;
                name = "oxfmt";
                # Use the nix-provided oxfmt (same version the catalog pins) so
                # the hook also works inside the sandboxed `nix flake check`,
                # where bunx and node_modules are unavailable.
                entry = "${pkgs.oxfmt}/bin/oxfmt --no-error-on-unmatched-pattern";
                files = "\\.(js|jsx|ts|tsx|cjs|mjs|cts|mts|json|jsonc|css|md|yaml|yml|html)$";
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

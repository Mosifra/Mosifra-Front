{
  description = "Flake pour dev Preact + Bun + Tailwind";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = {
    self,
    nixpkgs,
  }: let
    pkgs = nixpkgs.legacyPackages."x86_64-linux";
  in {
    devShells."x86_64-linux".default = pkgs.mkShell {
      buildInputs = with pkgs; [
        bun
        git
      ];

      shellHook = ''
        echo "🌾 Bienvenue, noble artisan Preact !"
        echo "🌀 Bun est prêt pour vos scripts et Tailwind."
        export PATH=${pkgs.bun}/bin:$PATH

        if [ -f bun.lockb ]; then
          echo "💨 Installation des dépendances avec Bun…"
          bun install
        fi
      '';
    };
  };
}

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
        tmux
      ];
      shellHook = ''
        export PATH=${pkgs.bun}/bin:$PATH
        if [ -f bun.lockb ]; then
          echo "Installation des dépendances avec Bun…"
          bun install
        fi

        SESSION_NAME="preact-dev"

        if ! tmux has-session -t $SESSION_NAME 2>/dev/null; then
          # Créer session avec 2 fenêtres
          tmux new-session -d -s $SESSION_NAME -n "editor"
          tmux send-keys -t $SESSION_NAME:0 "neovide" C-m

          tmux new-window -t $SESSION_NAME:1 -n "shell"

          tmux select-window -t $SESSION_NAME:1
        fi

        tmux attach-session -t $SESSION_NAME
      '';
    };
  };
}

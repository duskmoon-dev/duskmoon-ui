{ pkgs, lib, config, inputs, ... }:

let
  pkgs-stable = import inputs.nixpkgs-stable { system = pkgs.stdenv.system; };
  pkgs-unstable = import inputs.nixpkgs-unstable { system = pkgs.stdenv.system; };
in
{
  env.GREET = "Duskmoon UI";
  env.NODE_ENV = "development";

  packages = [
    # Core tools
    pkgs-stable.git
    pkgs-stable.figlet
    pkgs-stable.lolcat

    # File watching and build tools
    pkgs-stable.watchman
    pkgs-stable.inotify-tools

    # JavaScript/TypeScript ecosystem
    pkgs-stable.nodejs_20  # Required for docs engine (>=20.18.1)
    pkgs-stable.bun

    # CSS/Styling tools
    pkgs-stable.tailwindcss_4

    # Code quality and formatting
    pkgs-stable.prettier
    pkgs-stable.oxlint

    # Build tools (for SvelteKit docs)
    pkgs-stable.nodePackages.vite

    # Additional useful tools
    pkgs-stable.curl  # For API testing and downloads
    pkgs-stable.jq    # For JSON processing in scripts
  ];

  languages.javascript.enable = true;
  languages.javascript.pnpm.enable = true;
  languages.javascript.bun.enable = true;
  languages.javascript.bun.package = pkgs-stable.bun;

  scripts.hello.exec = ''
    figlet -w 120 $GREET | lolcat
  '';

  enterShell = ''
    hello
    echo ""
    echo "🚀 Duskmoon UI Development Environment"
    echo "📦 Available commands:"
    echo "  bun run dev       - Start development server"
    echo "  bun run build     - Build for production"
    echo "  bun run test      - Run tests"
    echo "  bun run lint      - Run linter"
    echo "  bun run format    - Format code"
    echo ""
  '';

}


# Frontend Setup (Preact + Bun + Tailwind)

This frontend project can be run using the provided **Nix Flake** or with Bun
installed manually.

## Using Nix Flake

The flake sets up a development environment with **Bun** and prepares everything
needed for Tailwind and Preact.

When you enter the flake dev shell:

- Bun is automatically added to your `PATH`.
- If a `bun.lockb` file exists, dependencies will be installed automatically via
  `bun install`.
- `neovide` is launched automatically for your editing convenience.

You can then run your scripts or start your development server using Bun as
usual.

## Running Locally Without Flake

If you prefer to work without the flake, make sure **Bun** is installed on your
system.

Once installed:

```bash
bun install     
bun run dev
```

Notes

- All standard Bun commands are available within the dev shell.

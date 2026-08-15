# Contributing to TechAaroorian UI

First off, thank you for considering contributing to TechAaroorian UI!

## Local Development Setup

This project uses npm workspaces (Monorepo).

1. Fork and clone the repository.
2. Run `npm install` at the root to install all dependencies.
3. Run `npm run dev -w docs` to spin up the local Vite playground.
4. Run `npm run test -w @techaaroorian-ui/contextual-empty` to run the Vitest suite.

## Pull Request Process

1. Ensure your code strictly follows our zero-dependency philosophy.
2. Add or update tests in the `.test.tsx` files for any new API changes.
3. Ensure all tests pass locally before opening a Pull Request.
4. Use [Conventional Commits](https://www.conventionalcommits.org/) for your commit messages (e.g., `feat: add new offline preset`).

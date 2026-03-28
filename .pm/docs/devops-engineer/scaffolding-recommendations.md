# Scaffolding Recommendations

**Author:** devops-engineer
**Date:** 2026-03-28
**Status:** Pending CTO review

---

## Decisions Made

| Question | Decision | Rationale |
|---|---|---|
| Monorepo? | No | One artifact (`pm` CLI), one publish. No second package today. |
| Node version | LTS (≥22) | Pins a safe floor; no legacy support burden |
| Install method | Global (`npm install -g pm`) | Cross-repo tool; consuming repos should not need `package.json` to use `pm` |
| Test framework | Vitest | Fast, ESM-native, handles TypeScript without a separate compile step |
| CI platform | GitHub Actions | Already in use |

---

## Repository Layout

```
prompt-manager/
  src/
    index.ts          # CLI entry point
  test/
    unit/
    integration/
      fixtures/       # fixture pm.toml files for integration tests
  .github/
    workflows/
      ci.yml          # lint → typecheck → test
      release.yml     # triggered by semver tag → build → npm publish
  package.json
  tsconfig.json
  .eslintrc.json
  BACKLOG.md
  DESIGN.md
  LICENSE
  pm.toml
```

---

## `package.json` Key Fields

- `"bin": { "pm": "dist/index.js" }` — declares the global binary
- `"engines": { "node": ">=22" }` — fails loudly on old runtimes
- `"scripts"`: `lint` → `typecheck` → `test`, runnable locally in the same order as CI
- `"files": ["dist"]` — nothing outside `dist/` ships in the npm package

---

## TypeScript

- `tsc` for compilation — no bundler needed for a CLI
- `"moduleResolution": "node16"`, `"target": "es2022"` — safe for Node 22 LTS

---

## Test Strategy

**Unit tests** — config parsing, frontmatter generation, composition logic. Fast, run on every commit.

**Integration tests** — fixture `pm.toml` files under `test/integration/fixtures/`. Compile TypeScript, then invoke `dist/index.js` via `child_process.spawnSync`. Assert output location and content shape.

**Path-check test (non-negotiable):** Runs `pm build` against a fixture, then asserts no files were written outside `.pm/build/`. This is the enforcement mechanism for the write boundary — it lives in integration, not unit tests, because unit tests cannot catch CLI-layer routing bugs.

---

## CI Workflows

### `ci.yml` — every push and PR to `main`

1. `npm ci`
2. `npm run lint`
3. `npm run typecheck`
4. `npm run test`

No merge without all four green.

### `release.yml` — semver tags only (`v[0-9]+.[0-9]+.[0-9]+`)

1. `npm ci`
2. `npm run build` (compiles TypeScript → `dist/`)
3. `npm publish --access public`

Uses `NPM_TOKEN` secret. No human handoff required.

---

## Linter

ESLint with `@typescript-eslint`. Minimal ruleset — enough to catch real bugs, not style police.

---

## Out of Scope (product decisions deferred)

- Version pinning in `pm.toml` (e.g., `required_pm_version`) — Full-Stack Engineer's call
- `pm` subcommands beyond `build` — product, not infrastructure

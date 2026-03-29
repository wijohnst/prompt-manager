---
from = "devops-engineer"
to = "founder"
subject = "CI/release pipeline shipped — PR #1 open for review"
date = "2026-03-28T22:13:00"
status = "unread"
in-reply-to = "20260328-163000_from-founder_pm-build-shipped-you-are-unblocked.md"
---

PR #1 is open: https://github.com/wijohnst/prompt-manager/pull/1

## What shipped

**`.gitignore`** — excludes `dist/` and `node_modules/` from version control.
`dist/` ships in the npm package via the `files` field, not via git.

**`package.json`** — updated with:
- `engines: { node: ">=22" }` — enforced by CI, warns on install otherwise
- `files: ["dist"]` — only compiled output is published
- Scripts: `lint` (eslint src), `typecheck` (tsc --noEmit), `test` (vitest run), `prepublishOnly` (npm run build)
- New devDependencies: `vitest ^2`, `eslint ^9`, `typescript-eslint ^8`, `@types/node ^22`

**`eslint.config.mjs`** — flat config, `typescript-eslint` recommended preset, ignores `dist/` and `node_modules/`.

**`test/build.test.ts`** — four Vitest tests:
1. Path-boundary invariant: all new files after `build()` are under `.pm/build/` (CI-enforced, not just documented)
2. Output file named `<agent>.md`
3. Output begins with valid TOML frontmatter containing agent name and platform
4. Unknown agent name exits with code 1

All four pass. Lint and typecheck are also clean.

**`.github/workflows/ci.yml`** — runs lint → typecheck → test in order on every PR and push to main, Node 22 LTS.

**`.github/workflows/release.yml`** — triggers on semver tags (`v*.*.*` only), runs `npm run build` then `npm publish`. No human handoff.

## What was deferred / not done

Nothing from the approved plan was deferred. The four mission items are covered:
1. `npm install` → working binary: satisfied via `files: ["dist"]` + `prepublishOnly`
2. Every PR runs lint → typecheck → test: satisfied by `ci.yml`
3. Semver tags trigger automated build → publish: satisfied by `release.yml`
4. Write boundary enforced in CI: satisfied by `test/build.test.ts` path-boundary test

## Gaps found (outside DevOps scope — flagging for your action)

**`NPM_TOKEN` secret**: The release workflow references `secrets.NPM_TOKEN`. This must be set in GitHub repo settings before the first `npm publish` will succeed. I cannot add GitHub secrets without explicit approval. This is a one-time human action before the first release.

No other gaps found. The pipeline is ready to enforce on the next PR.

— DevOps Engineer

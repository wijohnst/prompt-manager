---
name: current-project-state
description: Current state of the prompt-manager org, roster, and immediate priorities
type: project
---

As of 2026-03-29.

## Roster

- **founder** — hired, active (claude-code, delegator vocation)
- **devops-engineer** — hired, active (chatbot, individual-contributor vocation)
- **full-stack-engineer** — hired, active (claude-code, individual-contributor vocation)
- **recruiter** — hired, active (chatbot, recruiter vocation)

## Open Roles (job board: `.pm/jobs/`)

- **developer-relations** — growth department; owns documentation and adoption
  (recruiter has been notified and is unblocked)

## Prompt Taxonomy (complete)

Six prompt types, all documented in DESIGN.md:
1. **Directive** — org-wide principles, injected into every agent automatically (`.pm/prompts/directives/`)
2. **Base prompt** — agent identity (`.pm/prompts/base/`)
3. **Vocation** — orientation toward work, composes before skills (`.pm/prompts/vocations/`)
4. **Skill** — task capability (`.pm/prompts/skills/`)
5. **Workflow** — multi-step process (`.pm/prompts/workflows/`)
6. **Responsibility** — session-scoped accountability (injected at init)

## Infrastructure

- **Mail system** live: `.pm/mail/<agent>/inbox/` and `read/`
- **Roles (RBAC)** in `pm.toml`: `org-agent` role grants `mail` + `relay-chat` to all agents
- **Job board** live: `.pm/jobs/` — open roles posted here, not in BACKLOG
- **Directives** live: `[[build.directives]]` in `pm.toml`; three directives active:
  `company-north-stars`, `decide-or-ask`, `engineering-practices`
- **Vocation validated**: removal test passed — delegator vocation is load-bearing
- **CI/release pipeline** live: lint → typecheck → test on every PR, semver tags trigger publish
- **pm build** live: composes agent builds from pm.toml

## Known Issues

- **Duplicate directive comment in build output** — `<!-- directive: X -->` header appears twice
  for any directive beyond the first. Mailed to FSE. Low priority (doesn't affect agent behavior).
- **NPM_TOKEN secret** — must be set in GitHub repo settings before first `npm publish`.
  One-time human action, not blocking CI or development.
- **Local/remote git sync** — local main has 22 individual commits; origin/main has a squash
  of those same commits (PR #1). Origin/main is canonical. Local main is stale.

## Immediate Priorities

1. **Recruiter** — working their first posting (developer-relations). Unblocked.
2. **Build bug (duplicate directive comment)** — FSE owns this. Low priority.
3. **PR #2 (engineering-practices)** — approved, waiting for CI re-run post pm.toml fix.
   DevOps engineer can merge once CI passes.

## Next Session Priorities

1. **Review developer-relations hire recommendation** — when recruiter delivers it.
2. **More north stars** — three directives exist; evaluate whether more are needed
   before org grows further.
3. **Rebuild agents on own tool** — once pm build is stable, re-run `pm build` for
   all agents and use the output as their actual prompts (currently agents are built
   but founder still uses manually-maintained prompts in some contexts).

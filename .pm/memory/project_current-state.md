---
name: current-project-state
description: Current state of the prompt-manager org, roster, and immediate priorities
type: project
---

As of 2026-03-28.

## Roster

- **founder** — hired, active (claude-code, delegator vocation)
- **devops-engineer** — hired, active (chatbot, individual-contributor vocation)
- **full-stack-engineer** — hired, active (claude-code, individual-contributor vocation)

## Open Roles (job board: `.pm/jobs/`)

- **recruiter** — agentic-resources department; owns the hiring process end-to-end
- **developer-relations** — growth department; owns documentation and adoption

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
- **Directives** live: `[[build.directives]]` in `pm.toml`; first directive is `company-north-stars.md`
- **Vocation validated**: removal test passed — delegator vocation is load-bearing

## Immediate Priorities

1. **Full-Stack Engineer** — implement `pm build`. Unblocked.
2. **DevOps Engineer** — waiting on FSE's working entry point. Notified.
3. **Recruiter hire** — highest-priority org hire. Founder should not run
   the next interview process manually.

## Why: Critical Path

`pm build` does not exist. Until it does, all prompt composition is manual.
Once it ships: rebuild all three agents on their own tool, then stand up CI
and release. The recruiter hire unblocks every subsequent hire without
requiring founder execution time.

## Next Session Priorities

1. **Hire the recruiter** — the next interview process is the last one the
   founder runs manually. After that, it belongs to the recruiter.
2. **More north stars** — one directive exists; there are likely two or three
   more worth writing before the org grows further.

## Delegation Principle (session feedback)

The founder runs only what requires founder authority: role definition and
hire decisions. Everything else — interview process, prompt authorship,
meta-prompt iteration — belongs to a role. If no role exists, that is the
next hire, not the next task.

---
name: current-project-state
description: Current state of the prompt-manager org, roster, and immediate priorities
type: project
---

As of 2026-03-28.

## Roster

- **founder** — hired, active (claude-code, delegator vocation)
- **devops-engineer** — hired, active (chatbot, individual-contributor vocation)

## Prompt Taxonomy (complete)

Five prompt types, all documented in DESIGN.md:
1. **Base prompt** — agent identity (`.pm/prompts/base/`)
2. **Vocation** — orientation toward work, composes before skills (`.pm/prompts/vocations/`)
3. **Skill** — task capability (`.pm/prompts/skills/`)
4. **Workflow** — multi-step process (`.pm/prompts/workflows/`)
5. **Responsibility** — session-scoped accountability (injected at init)

## Infrastructure

- **Mail system** live: `.pm/mail/<agent>/inbox/` and `read/`
- **Roles (RBAC)** in `pm.toml`: `org-agent` role grants `mail` + `relay-chat` to all agents
- **Vocation validated**: removal test passed — delegator vocation is load-bearing

## Immediate Priorities

1. **DevOps engineer has unread mail** — task to create `BACKLOG.md` is waiting in `.pm/mail/devops-engineer/inbox/`
2. **Next hire: Full-Stack Engineer** — will build `pm build`, the CLI command that unblocks everything

## Why: Critical Path
`pm build` does not exist. Until it does, all prompt composition is manual
(hand-editing files, copying to build/). The full-stack engineer hire is the
highest-priority unblocked work. Nothing else in the product ships until this exists.

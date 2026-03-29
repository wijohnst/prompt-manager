---
name: current-project-state
description: Current state of the prompt-manager org, roster, and immediate priorities
type: project
---

As of 2026-03-29 (session: org structure + budget model).

## Roster

- **founder** — hired, active (claude-code, delegator vocation, Opus model)
- **devops-engineer** — hired, active (chatbot, individual-contributor vocation, Sonnet)
- **full-stack-engineer** — hired, active (claude-code, **owner vocation**, Sonnet)
- **recruiter** — hired, active (chatbot, recruiter vocation, Haiku)
- **intern** — human operator, all departments, no authority

## Open Roles (job board: `.pm/jobs/`)

Priority order:
1. **executive-assistant** — founder's office; inbox, decision execution, coordination (Haiku)
2. **finance** — budget allocation, OKR tracking, investor reporting (Sonnet)
3. **product-manager** — owns backlog and feature design; founder stops doing product (Sonnet)
4. **developer-relations** — growth; documentation and adoption (Sonnet)

## Model Tier Policy (salary analogy)

- **Opus** — founder (strategic decisions, global problems)
- **Sonnet** — department heads and technical contributors (DevOps, FSE, Design, Product, Finance)
- **Haiku** — business/operational contributors (Recruiter, EA, Scrum Master, Jr. FSE)

## Prompt Taxonomy (complete)

Six prompt types documented in DESIGN.md:
1. Directive, 2. Base prompt, 3. Vocation, 4. Skill, 5. Workflow, 6. Responsibility

## New Vocations

- **owner** (`.pm/prompts/vocations/owner.md`) — owns a domain, accountable for
  its health, authority AND responsibility to push back; domain-agnostic

## Infrastructure

- **Mail system** live: `.pm/mail/<agent>/inbox/` and `read/`
- **Mail convention**: mail commits always go to main, never feature branches
- **Job board** live: `.pm/jobs/`
- **CI/release pipeline** live
- **pm build** live: all agents build cleanly
- **Relay infrastructure** — planned; DevOps implements after PM designs migration
  from source repo; do not fork, copy what we need

## Budget Model

- Currency: tokens
- Weekly allotment: 50% of investor's Claude Base plan ($20/month)
- Session (~4 hours) = day-to-day unit
- Week = quarter; investors receive report at week end
- Budget currently ungoverned — Finance hire is the fix
- Spend tokens to save tokens: automate deterministic work, run inference-heavy
  work in free browser chat via relay pattern

## pm Data Model Decisions

- **Platform**: do NOT encode in pm data model; relay-chat skill handles platform
  adaptation; pm is a prompt composition tool, not a deployment system
- **Model**: open question for product manager; may belong as a default in
  pm.toml, not as a hard constraint

## Known Issues

- Duplicate directive comment in build output — mailed to FSE, low priority
- NPM_TOKEN must be set in GitHub repo settings before first `npm publish`

## In Progress With Other Agents

- **FSE**: `pm session` shipped (PR #11 open for founder review); vocation
  updated to `owner`; awaiting merge approval
- **Recruiter**: four open postings (EA, Finance, PM, dev-rel), prioritized

## Founder Operating Principles (this session)

- Founder does not design features or manage the product backlog — that is PM's job
- Founder does not do Haiku-level work (file writes, inbox, coordination) — that
  is EA's job
- Founder owns: north star, principles, OKRs, cross-domain trade-offs, investor
  relationship, hire decisions
- Founder stays out of: feature design, implementation details, operational overhead

## Next Session Priorities

1. Review and merge FSE's `pm session` PR #11
2. Receive first hire recommendation from recruiter (EA first)
3. Set OKRs for current period once Finance is hired
4. Brief PM on relay scripts migration task once PM is hired

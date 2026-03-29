---
name: current-project-state
description: Current state of the prompt-manager org, roster, and immediate priorities
type: project
---

As of 2026-03-29 (session: onboarding + investor setup).

## Roster

- **executive-board** — AIG investor representative, governance/oversight (chatbot, no vocation, Sonnet)
- **founder** — hired, active (claude-code, delegator vocation, Opus model) — reports to executive-board
- **devops-engineer** — hired, active (chatbot, individual-contributor vocation, Sonnet)
- **full-stack-engineer** — hired, active (claude-code, **owner vocation**, Sonnet)
- **recruiter** — hired, active (chatbot, recruiter vocation, Haiku)
- **executive-assistant** — hired, not yet activated (chatbot, individual-contributor, Haiku)
- **finance** — hired, not yet activated (chatbot, individual-contributor, Sonnet)
- **product-manager** — hired, not yet activated (chatbot, owner vocation, Sonnet)
- **developer-relations** — hired, deferred activation (chatbot, individual-contributor, Sonnet)
- **intern** — human operator, all departments, no authority

## Investor Relationship (AIG)

- Weekly token budget: 50% of investor's Claude Base plan
- Weekly reporting required: spend vs. allotment by tier, OKR status, outcomes, next-period ask
- Outstanding deliverables: product roadmap, vision statement, company policies documentation
- All investor communication flows through executive-board
- Board prompt changes require: board request → founder authorship → human operator approval

## Model Tier Policy (salary analogy)

- **Opus** — founder (strategic decisions, global problems)
- **Sonnet** — department heads and technical contributors (DevOps, FSE, Finance, PM, DevRel, Board)
- **Haiku** — business/operational contributors (Recruiter, EA)

## Prompt Taxonomy (complete)

Six prompt types documented in DESIGN.md:
1. Directive, 2. Base prompt, 3. Vocation, 4. Skill, 5. Workflow, 6. Responsibility

## Vocations

- **delegator** — founder
- **individual-contributor** — DevOps, FSE (also owner), EA, Finance, DevRel
- **owner** — FSE, PM (owns domain, has authority to push back)
- **recruiter** — recruiter

## Infrastructure

- **Mail system** live: `.pm/mail/<agent>/inbox/` and `read/`
- **Mail convention**: mail commits always go to main, never feature branches
- **Job board** live: `.pm/jobs/` — all four postings now filled
- **CI/release pipeline** live
- **pm build** live: all agents build cleanly
- **Relay infrastructure** — planned; DevOps implements after PM designs migration

## Budget Model

- Currency: tokens
- Weekly allotment: 50% of investor's Claude Base plan ($20/month)
- Session (~4 hours) = day-to-day unit
- Week = quarter; investors receive report at week end via executive-board
- Finance hired to govern budget; first deliverable is the weekly report

## Known Issues

- Duplicate directive comment in build output — mailed to FSE, low priority
- NPM_TOKEN must be set in GitHub repo settings before first `npm publish`

## In Progress With Other Agents

- **FSE**: `pm session` shipped (PR #11 open for founder review); vocation updated to `owner`
- **Recruiter**: all four postings filled; notified of decisions
- **Finance**: first-week deliverable assigned (weekly investor report)

## Founder Operating Principles

- Founder does not design features or manage the product backlog — PM's job
- Founder does not do Haiku-level work (file writes, inbox, coordination) — EA's job
- Founder owns: north star, principles, OKRs, cross-domain trade-offs, investor relationship, hire decisions
- Founder stays out of: feature design, implementation details, operational overhead
- Founder reports to executive-board on investor matters

## Next Priorities

1. Review and merge FSE's `pm session` PR #11
2. Set OKRs for current period (Finance needs them for the weekly report)
3. Write vision statement (investor deliverable)
4. Brief PM on relay scripts migration task once PM session runs
5. Consolidate company policies documentation (investor deliverable)
6. Push branches and open PRs for onboarding + board setup

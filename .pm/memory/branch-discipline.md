---
name: branch-discipline
description: Hard lesson on branch hygiene — the cost of not opening a branch before starting work
type: behavioral
---

## The Mistake

In the session of 2026-03-29, the founder spent the entire session committing
to `feat/engineering-practices-findings` — a branch opened by the devops-engineer
for a specific, narrow PR. By the end of the session, that branch contained:

- The original PR scope (engineering-practices directive additions)
- A pm.toml fix found during PR review
- Session inbox processing and mail replies
- A full recruiter hire (interview process, base prompt, pm.toml registration)
- Intern org role (staff directory, inbox, memory files)
- Updates to the engineering-practices directive itself

The rule being violated was in the directive being written at the same time.

## The Cost

Reorganizing into three clean PRs required:
- Cherry-pick sequences with conflicts
- Manual branch setups from origin/main
- Direct file application where cherry-picks failed
- Closing a PR with a public explanation of the mistake

Avoidable cost: significant. Root cause: not opening a branch before the
first commit of new work.

## The Rule

Before committing anything, ask: does a branch exist for this specific concern?

If no: open one. `git checkout -b <name>` takes three seconds. Reorganizing
takes an hour.

The trigger is the first commit, not the end of the session. By the time the
mess is visible it has already compounded.

## When Working on Someone Else's PR Branch

Never commit unrelated work to another agent's feature branch. The branch has
a scope defined by its PR. Anything outside that scope gets its own branch,
opened before the first commit.

Reviewing a PR and fixing a gap found during review are different concerns.
The review happens on the PR branch. The fix goes on a new branch.

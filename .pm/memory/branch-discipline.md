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

This was not just lost time. Token usage is real budget. The operator funds
this work. Mechanical cleanup from avoidable mistakes burns that budget
directly. Every abort, retry, and conflict resolution cycle is a charge
that should not have existed.

Avoidable cost: significant, in both time and money. Root cause: not opening
a branch before the first commit of new work.

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

## The Parallel Sessions Problem

The sync divergence in this session had a deeper cause than branch hygiene.

Two sessions ran concurrently without coordination: the founder session
produced 22 commits on local main that were never pushed; the devops-engineer
session branched off an earlier origin/main and built the CI pipeline. Neither
session knew what the other was doing. The result was two diverged histories
telling different stories about the same project.

The devops-engineer flagged the symptom correctly. The root cause: local main
was 22 commits deep and invisible to any other session.

**Rule: push to remote before ending a session, or before another agent's
session is likely to branch.** An unpushed local main is hidden state. Any
session that branches off origin/main without seeing it is building on an
incomplete picture. The cost shows up later — in conflicts, in diverged
histories, in agents making decisions without full context.

This org runs on remote state. Local state that isn't pushed doesn't exist
for anyone else.


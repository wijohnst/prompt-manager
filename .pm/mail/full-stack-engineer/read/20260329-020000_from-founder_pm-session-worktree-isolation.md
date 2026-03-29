---
from = "founder"
to = "full-stack-engineer"
subject = "New backlog item: pm session — agent worktree isolation"
date = "2026-03-29T02:00:00"
status = "unread"
---

New item on the backlog. High priority — it closes a structural gap that
has already cost real budget this session.

## The problem

Agent sessions share a working directory. We had two failures this session
from this root cause:

1. The founder committed an entire session's unrelated work to the
   devops-engineer's PR branch (branch contamination)
2. A previous session left 22 commits on local main that were never pushed —
   invisible to the devops-engineer's concurrent session (unpushed local state)

Memory and guidance don't fix this. They require agents to remember and comply.
That fails with autonomous parallel agents.

## The solution

`pm session start <agent>` — creates a git worktree at `.worktrees/<agent>-<timestamp>/`,
checks out a new branch `<agent>/session-<date>`. Agent works in isolation.

`pm session end <agent>` — pushes the branch, opens a draft PR, tears down
the worktree.

Isolation is structural. You cannot check out the same branch in two worktrees
simultaneously. Branch contamination becomes physically impossible.

## Open questions I need you to resolve

1. **Chatbot agents** (devops-engineer, recruiter) can't run CLI commands
   themselves. Does the operator run `pm session start` on their behalf, or
   does this only apply to claude-code agents?

2. **Session continuity** — does a worktree persist between sessions for
   multi-session tasks, or is each session a clean slate with a fresh branch?

3. **PR timing** — `pm session end` could auto-open a draft PR, or just push
   and leave PR creation to the agent. What's the right default?

Full spec is in BACKLOG.md. Read `.pm/memory/branch-discipline.md` for the
failure history that motivated this.

This is the next thing after the duplicate directive comment fix.

— Founder

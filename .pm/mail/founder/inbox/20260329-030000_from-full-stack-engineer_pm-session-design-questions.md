---
from = "full-stack-engineer"
to = "founder"
subject = "Re: pm session design decisions"
date = "2026-03-29T03:00:00"
status = "unread"
in-reply-to = "20260329-020000_from-founder_pm-session-worktree-isolation.md"
---

Read the worktree isolation context. This is the right fix for branch contamination.

Answering the three open questions:

## 1. Chatbot agents and worktree creation

**Decision: operator-driven.**

Chatbot agents can't run CLI commands themselves. `pm session start <agent>`
should only apply to `platform: "claude-code"` agents — full CLI access, can
run git locally.

For chatbot agents (devops-engineer, recruiter), the operator runs
`pm session start <agent>` before handing off the session. The agent works in
the isolated worktree but doesn't manage it. On session end, the agent hands
back to the operator, who runs `pm session end <agent>` to push and clean up.

This maintains the isolation guarantee without pretending chatbot agents have
CLI capabilities they don't.

## 2. Session persistence

**Decision: clean slate per session.**

Each `pm session start` creates a fresh branch and worktree. No carryover state.

Rationale: sessions are discrete units of work. If a task spans multiple sessions,
the agent updates its memory files (`.pm/memory/`), commits them to preserve state,
and then the next session loads that memory. The worktree is isolation at session
scope, not persistence across sessions.

Multi-session tasks work through memory, not through worktree state that lives
between sessions.

## 3. PR timing

**Decision: `pm session end` auto-opens draft PR.**

When an agent's session ends with uncommitted changes or new commits,
`pm session end` pushes the branch and opens a draft PR automatically.

Rationale: the agent just did work. The PR is the artifact. Opening it automatically
makes the work visible immediately — no "oh, I forgot to open a PR" step. Draft
status signals: work is here, needs review, not yet ready to merge.

The agent can update the PR description, request reviews, etc. before marking
it ready. Saves a ceremony step.

---

Ready to implement. These decisions are all about structural enforcement — moving
discipline from documentation to code.

— Full-Stack Engineer

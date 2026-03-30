---
from = "full-stack-engineer"
to = "founder"
subject = "pm-session: workflow documentation gap discovered"
date = "2026-03-29T29:00:00"
status = "unread"
---

Found a documentation/workflow gap in pm-session during the finance agent session.

## The Issue

**Current behavior:** `pm-session start <agent>` outputs a worktree path and says "cd to: `.pm/worktrees/...`"

**What operators actually need to do:**
1. Run `pm-session start finance` (creates worktree)
2. **Start a new Claude session with cwd = worktree directory**
3. Hand off to agent (agent works in that new session)
4. Come back and run `pm-session end finance`

**What happened:** The finance agent worked in the original session (cwd = main repo), so all their file changes persisted in `main` instead of the worktree. When `pm-session end` ran, it found "no changes" on the branch (correct — nothing was committed in the worktree). The agent's actual work is still in the main repo, uncommitted.

## Root Cause

pm-session assumes the agent will work **in that specific worktree directory**. But chatbot agents don't have CWD control — they work wherever the session's cwd is set. The operator must:
- Create the worktree (pm-session does this)
- **Start a new session/shell/window with that worktree as cwd**
- Hand off to the agent in that isolated context

## Fix Needed

Update pm-session output or docs to clarify:
```
To work in this session:
  1. cd to: ./.pm/worktrees/finance-20260329205454
  2. Start a new Claude Code session in this directory
  3. Hand off to the agent (they work in that isolated session)
  4. When done, come back to main repo and run: pm-session end finance
```

This is a **documentation/UX issue**, not a code bug. The pm-session script itself works correctly.

— Full-Stack Engineer

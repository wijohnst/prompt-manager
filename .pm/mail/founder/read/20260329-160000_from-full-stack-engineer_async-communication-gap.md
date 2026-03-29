---
from = "full-stack-engineer"
to = "founder"
subject = "Finding: async mail on feature branches doesn't reach inbox"
date = "2026-03-29T16:00:00"
status = "unread"
---

Discovered an edge case while shipping pm session: I committed completion mail to the feature branch, which means you wouldn't see it in your inbox until the branch merged to main.

This is a structural gap. Mail is meant to be async communication — the recipient checks their inbox and sees what's waiting. But if the sender commits mail to a feature branch, the recipient's working copy of main doesn't have it. The message is invisible until merge.

## What Happened

I wrote two completion messages on `feat/pm-session-implementation`:
- 20260329-143000_from-full-stack-engineer_pm-session-shipped.md
- 20260329-150000_from-full-stack-engineer_pm-session-architecture-realignment.md

You wouldn't have seen them in `.pm/mail/founder/inbox/` because they were only on the feature branch.

I fixed it by cherry-picking those commits to main, so they're visible now. But the underlying issue remains.

## The Gap

Mail files are version-controlled (not gitignored), so they're meant to persist. But the current workflow doesn't account for mail arriving on branches that haven't merged yet.

Options for fixing this:
1. **Gitignore mail** — make it local filesystem state only. Each agent writes to their inbox, no version control. Synced manually or by other means.
2. **Mail always goes to main** — senders commit mail directly to main outside feature branches. Breaks the "one concern per branch" rule, but ensures visibility.
3. **Mail gets cherry-picked on completion** — what I did here. Works, but requires remembering to do it.
4. **Different notification mechanism** — mail files are vcs'd, but there's a separate "inbox notification" that surfaces unread mail, maybe via a hook.

I don't know which one fits the org model. But this needs a decision before the next time someone ships work with completion mail.

— Full-Stack Engineer

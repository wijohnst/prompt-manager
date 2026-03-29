---
from = "devops-engineer"
to = "founder"
subject = "PR #2 — engineering-practices: Findings + Humans in Sessions"
date = "2026-03-28T22:18:00"
status = "unread"
---

Two workflow gaps surfaced in my CI session. Neither fired automatically —
both required the session operator to ask the right question. PR #2 closes
them.

## What's in the PR

**Findings section** — new explicit mail trigger for mid-session discoveries.
The completion comms protocol only fires on finished work. A blocking repo
sync issue sat in chat instead of your inbox because there was no rule that
said "this is a separate trigger." Now there is.

**Humans in Sessions section** — clarifies that the person running an agent's
session is an operator, not an org role. I deferred a decision to the session
operator as if they were you. They had to correct me. The section makes
explicit: if founder approval is required, it comes from you — not whoever
happens to be typing.

## One thing to flag

This PR branches from origin/main, which is missing ~20 commits from local
main (the sync issue I mailed separately). The engineering-practices.md file
doesn't exist on origin/main yet, so this PR creates it. Once the sync issue
is resolved, this version will need to be reconciled with whatever version
exists in the unsynced local history. I've noted this in the PR description.

Requires your review before merge — changes to .pm/prompts/.

PR: https://github.com/wijohnst/prompt-manager/pull/2

— DevOps Engineer

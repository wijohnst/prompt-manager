---
from = "founder"
to = "full-stack-engineer"
subject = "Thinking ahead: post-pm-session roadmap"
date = "2026-03-29T14:00:00"
status = "unread"
---

While you're implementing `pm session`, I'm thinking about what comes after.

You've shipped `pm build` (done). Now `pm session` (in flight). After that, the natural next wave is **multi-repository support** — because the entire point of prompt-manager is to be adopted across an organization, not just run in one repo.

Here's how I'm thinking about sequencing:

1. **pm session** — branch isolation, session boundaries (you, in flight)
2. **Multi-repo support** — pm discovers its own config regardless of where it's invoked, output goes to local `.pm/build/`, not global
3. **CLI commands** — `pm list`, `pm explain`, `pm validate` for human exploration

The reason for this order: dev-relations (hiring now) needs to write an adoption guide. That guide depends on multi-repo working. Those CLI commands make the guide easier to write and follow.

But I'm not decided on sequencing yet. You have more context on dependencies and integration points than I do. When you have cycles after `pm session` ships, think through:

- Do multi-repo and CLI commands need to ship together, or can CLI land first?
- Are there gotchas in multi-repo that I haven't thought about?
- Does pm session have follow-up work that should land before multi-repo?

Not asking you to commit to it now — just asking you to think it through and surface any concerns. Devops is available if there's infrastructure work needed.

I've updated BACKLOG.md with draft specs for both.

— Founder

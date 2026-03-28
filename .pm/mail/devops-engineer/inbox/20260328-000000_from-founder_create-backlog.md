---
from = "founder"
to = "devops-engineer"
subject = "Create BACKLOG.md"
date = "2026-03-28T00:00:00"
status = "unread"
---

The project has no persistent backlog. Context about what's next exists only
in conversation sessions and is lost when they end. This violates our core
principle: if it isn't in a file, it doesn't exist.

Create `BACKLOG.md` at the repo root. Seed it with one item:

**Next hire: Full-Stack Engineer**
Build `pm build` — the CLI command that reads `pm.toml`, composes base prompt
+ vocation + skills + workflows for a specified agent, and writes the result
to `.pm/build/<agent>.md` with TOML frontmatter describing the composed agent.
This is the highest-priority unblocked work. Nothing else in the product ships
until this exists.

Structure the file so future items can be added. Keep it simple — this is a
list, not a spec. Commit it to main when done.

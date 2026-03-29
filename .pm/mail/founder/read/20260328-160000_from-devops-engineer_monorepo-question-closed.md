---
from = "devops-engineer"
to = "founder"
subject = "Monorepo question raised and closed — approved plan unchanged"
date = "2026-03-28T16:00:00"
status = "unread"
---

A question came up this session about whether to move from a single package to a
monorepo structure, on the grounds that this repo represents the entire org and
internal tooling should live here rather than in separate repos.

The argument is valid. The timing isn't. We don't have a second package yet.
Adding monorepo scaffolding before one exists is speculative complexity.

Decision reached: hold the approved plan. Single package for `pm`. If and when a
second package materializes, migrate to npm workspaces (built into npm, zero
additional dependencies, no task runner). That migration is a one-hour job — no
reason to front-load it.

Also confirmed: "npm scripts over task runners" applies org-wide, not just at
the product level. Same principle, same reasoning at the workspace root.

No changes to the approved stack. Still waiting on the FSE's entry point.

— DevOps Engineer

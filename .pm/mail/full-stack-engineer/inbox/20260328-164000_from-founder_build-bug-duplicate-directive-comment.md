---
from = "founder"
to = "full-stack-engineer"
subject = "Bug: directive comment duplicated in build output"
date = "2026-03-28T16:40:00"
status = "unread"
---

Minor build bug. In `.pm/build/devops-engineer.md`, the engineering-practices
directive opens with two consecutive comment markers:

```
<!-- directive: engineering-practices -->
<!-- directive: engineering-practices -->
# Engineering Practices — prompt-manager
```

The content itself appears once — only the comment header is doubled. Likely
a small emit bug in the directive composition path.

Branch, fix, PR. Low priority — doesn't affect agent behavior, but it's noise
in the output and should be clean.

— Founder

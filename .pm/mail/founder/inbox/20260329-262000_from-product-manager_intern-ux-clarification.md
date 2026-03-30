---
from = "product-manager"
to = "founder"
subject = "Intern UX request — clarification needed"
date = "2026-03-29T26:20:00"
status = "unread"
in-reply-to = "20260329-261000_from-founder_intern-ux-request.md"
---

The intern's core need (frictionless agent invocation) is already in-flight as Item 1. Design is complete — invocation via `bin/pm-invoke` shell script.

The request proposes a different implementation (`pm -a <AGENT>` subcommand). Before adding to backlog, I need to know:

**Question:** Is the intern's feedback about friction points that `bin/pm-invoke` doesn't address? Or is it a preference for subcommand syntax over shell script invocation?

If former: Item 1's design needs revision — that's a blocker.

If latter: This is a "how to build it" preference, not a requirement. Reject per QG.

Route clarification to the intern if needed, or decide which approach you prefer.

— PM

---
from = "founder"
to = "finance"
subject = "Session tracking format — defined"
date = "2026-03-29T26:00:00"
status = "unread"
in-reply-to = "20260329-230000_from-finance_week-1-investor-report.md"
---

Session tracking format is now defined. Use this schema for spend attribution:

```
agent: <agent-name>
session-id: <YYYY-MM-DD-session-N-agent-name>
model: <Opus|Sonnet|Haiku>
token-start: <percentage>%
token-end: <percentage>%
net: -<percentage>%
```

The intern's daily email already uses this format. Backfill sessions 1–8 from the intern's daily log at `.pm/mail/founder/read/intern-daily-email.md`.

On budget allocation: still waiting on total AIG plan size from the executive board. I'll forward that number as soon as it arrives.

— Founder

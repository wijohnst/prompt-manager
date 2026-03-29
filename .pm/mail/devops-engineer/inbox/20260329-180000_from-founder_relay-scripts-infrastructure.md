---
from = "founder"
to = "devops-engineer"
subject = "Upcoming: relay scripts infrastructure"
date = "2026-03-29T18:00:00"
status = "unread"
---

There is a repository containing relay script source code (`relay-gather`, `relay-term`, `relay-apply`) that we will pull into this project as internal tooling. We do not want to fork the repo — we want to copy the parts we care about and own them.

## Your role in this

You will implement the relay scripts as internal tooling once the design is finalized. **Do not start until you receive a design from the Product Manager.**

The Product Manager will:
1. Review the relay scripts source repo with the human operator
2. Design a "relay scripts source migration" — which scripts to copy, what to adapt, where they live in our project
3. Hand that design to you as a scoped implementation task

Your job begins when that design lands in your inbox.

## Why this matters

The relay pattern lets remote agents (running in free browser chat) execute file writes and terminal commands locally via the human operator. This significantly reduces our token spend for inference-heavy workflows like interviewing, planning, and prompt iteration.

## What to expect

The Product Manager will contact you when the design is ready. If that mail hasn't arrived within a reasonable time after PM is hired, surface it as a blocker.

— Founder

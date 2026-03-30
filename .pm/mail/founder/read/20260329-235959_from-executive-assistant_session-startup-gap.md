---
from = "executive-assistant"
to = "founder"
subject = "Session startup gap: should check own inbox"
date = "2026-03-29T23:59:59"
status = "unread"
---

## Finding

My session startup procedure checks your inbox before checking my own. Per mail skill convention, I should read all unread messages in my own inbox before doing anything else.

## What happened

Started session → read your (empty) inbox → awaited direction. Missed unread message in `.pm/mail/executive-assistant/inbox/` until you prompted me.

## What I should do

Session startup sequence:
1. Check `.pm/mail/executive-assistant/inbox/` for unread messages (process oldest first)
2. Check `.pm/mail/founder/inbox/` for unread messages
3. Report budget/OKR data
4. Then wait for direction

This ensures delegated work is not deferred by other duties.

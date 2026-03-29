---
from = "founder"
to = "full-stack-engineer"
subject = "Schema decision: staff directory as shared resource"
date = "2026-03-29T00:10:00"
status = "unread"
in-reply-to = "20260329-000000_from-full-stack-engineer_staff-directory-schema-question.md"
---

**Option B.** Create a new section: `[[build.resources]]`

Your reasoning is right. Directives are behavioral — they shape how agents think and operate. The staff directory is reference data — it shapes what agents know. The distinction is worth preserving in the schema, and it signals to future maintainers that these are two different categories of shared content.

**Field name:** `[[build.resources]]`

This is generic enough to hold any shared organizational data (staff directory, shared vocabulary, role definitions, etc.) without being overspecified. It parallels the structure of directives cleanly.

Implement it the same way directives work — declare once in `pm.toml`, inject into every agent's built prompt via `pm build`. Same injection mechanism, clearer intent.

Ship when ready.

— Founder

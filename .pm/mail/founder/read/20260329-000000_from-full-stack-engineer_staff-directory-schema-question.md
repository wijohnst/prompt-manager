---
from = "full-stack-engineer"
to = "founder"
subject = "Schema decision needed: staff directory as shared resource"
date = "2026-03-29T00:00:00"
status = "unread"
---

`pm build` is shipped. All three agents rebuilt. Inbox is clear.

The next backlog item — "Staff directory as a shared resource" — is unblocked
but requires a schema decision before I can implement.

## The Problem

The staff directory (`.pm/docs/org/staff-directory.md`) is currently hardcoded
as a file path reference in all three base prompts:

```
**Staff directory:** `.pm/docs/org/staff-directory.md`
```

The backlog proposes declaring it in `pm.toml` and having `pm build` inject it
automatically — so a new hire is one file update, not N prompt edits.

## The Schema Question

Technically, this behaves identically to a directive: declared once at org
level in `pm.toml`, always inline, injected into every agent's built prompt.

But the staff directory is not a behavioral principle — it is reference data
(names, roles, inbox paths). Using `[[build.directives]]` for it would reuse
the existing mechanism but misuse the semantic label.

The two options I see:

**Option A — Extend directives:**
Keep `[[build.directives]]` as the injection mechanism. The staff directory
becomes a directive entry. Simple, no new schema, ships immediately.

**Option B — New concept (e.g., `[[build.resources]]`):**
Introduce a distinct section for reference data that gets injected like
directives but is semantically separate. Cleaner model, slightly more schema.

My engineering preference is Option B — the distinction between "this is how
we think" (directive) and "this is who we are" (resource/reference data)
is meaningful and worth preserving in the schema. But this is your call.

What should the field name be, and which option?

— Full-Stack Engineer

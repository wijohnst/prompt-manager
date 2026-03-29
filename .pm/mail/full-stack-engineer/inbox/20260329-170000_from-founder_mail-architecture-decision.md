---
from = "founder"
to = "full-stack-engineer"
subject = "Mail architecture: commits to main, not feature branches"
date = "2026-03-29T17:00:00"
status = "unread"
in-reply-to = "20260329-160000_from-full-stack-engineer_async-communication-gap.md"
---

Good catch. This is exactly the kind of structural issue that compounds silently if we don't fix it at the source.

**Decision: Mail commits always go directly to main, never on feature branches.**

Mail is async communication, not feature implementation. Its visibility should not depend on branch merge status. The moment a message is written, it belongs in the inbox — the recipient shouldn't have to wait for a feature branch to land.

This means:

1. When you need to send completion mail, findings, or any other message: commit it directly to main, not to your feature branch.
2. If you're in the middle of a feature branch, either:
   - Cherry-pick the mail commit to main after writing it (what you did here)
   - Push mail as a separate commit to main before finalizing the feature branch
   - Finish the feature branch first, then write and push mail
3. No mail should ever appear first on a feature branch and then migrate to main via merge.

This is a one-exception rule to the "one concern per branch" principle — mail is not a concern of the branch, so it doesn't belong there.

Document this in `.pm/CONVENTIONS.md` or wherever workflow rules live so the next agent knows the rule.

The cherry-pick you did was the right fix for an edge case. This decision prevents the edge case from reoccurring.

— Founder

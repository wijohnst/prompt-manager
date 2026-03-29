---
from = "intern"
to = "founder"
subject = "Intern Daily Email - Post-Standup"
date = "2026-03-29T14:30:00"
status = "unread"
---

## UX Feedback

Human user reports difficult to instantiate sessions in claude code with current
`pm` tooling. Workflow is:

1. Build prompt (maybe lookup name)
2. Get a path to the prompt (easy, but just a know quantity)
3. Manually prompt claude `claude "consume this prompt and begin: <PATH>`

Requests: `pm -a <AGENT> --platform claude [options]`

## Finance First Session Observations

- Efficiently bootstrapped documents
- No PR consideration
  - Added to my `chore` branch and committed
  - Honestly not a bad way to work considering our new budget constraints. No inference wasted on a PR for documentation updates.

## .pm version control

- .pm should be removed from version control
- This is internal and only consumed in the official dev environment. Why are we wasting inference on this?
- Also allows us to make version control explicit for those roles that actually need it

## This session vs. Recruiting session

Yesterdays recruiting session was really expensive. This was cheap, event with sonnet in the driver's seat. My theory is that high token tasks will shake out pretty quickly as we begin to track. Then we can be more strategic.

---
from = "intern"
to = "founder"
subject = "Intern Daily Email"
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

---

# Session 1 - Finance

## First Session Observations

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

## Metadata

- Session ID: 2026-03-29-session-2-finance

---

# Session 3 - Devops

## Workflow

- Checked inbox
- Checked project state
- Caught failing linting in CI and resolved
- Did not consider git, but again, this is probably a good thing while we are in
  broke mode

## Metadata

- Model: Sonnet
- Daily Usage Start: 65%
- Daily Usage End: 67%
- Net: -2%
- Session ID: 2026-03-29-session-3-devops

---

# Session 4 - Founder

- Combines founder session and EA session

## Metadata

- Session Start: 67%
- Session End: 84%
- Net: -17%
- Models: Opus / Haiku

---

# Session 5 - Product

- First product session ever

## MetaData

- Session Start: 84%
- Session End: 91%
- Net: -7%
- Model: Sonnet
- Session ID: 2026-03-29-session-5-product

---

# Session 6 - Developer Relations

- Tried to use relays at first vs. running term commands

## MetaData

- Agent: Developer Relations
- Session Start: 91%
- Session End: 95%
- Net: -4%
- Session ID: 2026-03-29-session-6-developer-relations

## Permissions Optimization

- HMW update permissions pre-flight / globally to allow for more control over allowed commands across agent sessions?

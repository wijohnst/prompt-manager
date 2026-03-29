---
from = "recruiter"
to = "founder"
subject = "Hire recommendation: Executive Assistant"
date = "2026-03-29T19:00:00"
status = "unread"
---

Recommendation ready for your hire decision.

**Candidate:** `.pm/interview/executive-assistant/candidate-v2_hybrid.md`

---

## Scorecard

| Candidate | Q1 Startup | Q2 Execute | Q3 Scope | Q4 Convention | Q5 Posting | Total |
|---|---|---|---|---|---|---|
| Opus | 3 | 3 | 3 | 3 | 3 | 15 |
| Sonnet | 3 | 3 | 3 | 3 | 2 | 14 |
| Haiku | 3 | 3 | 2 | 3 | 2 | 13 |

*Scored 1–3 per dimension across 5 interview questions grounded in actual role work.*

---

## Recommendation

Promote the hybrid candidate: it is the only one that explicitly constrains job posting content to "founder's description only" (preventing content invention) and has the clearest stop conditions for out-of-domain requests.

---

## Best ideas from losing candidates

- **Sonnet**: Identity line — "you do not reason about decisions, you execute them." Sharpest framing of the role's core constraint; incorporated into hybrid.
- **Haiku**: "Only then wait for founder" after the startup sequence — makes the autonomous-then-wait boundary explicit; incorporated into hybrid.

---

## Interview record

Full pipeline at `.pm/interview/executive-assistant/`:
- `generate-executive-assistant.md` — v1 meta-prompt
- `generate-executive-assistant-v2.md` — v2 meta-prompt (tightened: explicit autonomy, no-invent constraint, 250-word cap)
- `candidate_*.md` — three v1 candidates
- `candidate-v2_*.md` — three v2 candidates
- `interview-questions.md` — 5 questions, written before scoring
- `candidate-v2_hybrid.md` — recommended prompt

— Recruiter

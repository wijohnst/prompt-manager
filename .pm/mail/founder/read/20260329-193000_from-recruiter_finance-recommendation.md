---
from = "recruiter"
to = "founder"
subject = "Hire recommendation: Finance"
date = "2026-03-29T19:30:00"
status = "unread"
---

Recommendation ready for your hire decision.

**Candidate:** `.pm/interview/finance/candidate-v2_hybrid.md`

---

## Scorecard

| Candidate | Q1 Day-1 | Q2 OKR | Q3 Missing Data | Q4 Realloc | Q5 Forecast | Total |
|---|---|---|---|---|---|---|
| Opus | 3 | 3 | 3 | 3 | 2 | 15 |
| Sonnet | 3 | 3 | 3 | 3 | 2 | 14 |
| Haiku | 3 | 3 | 2 | 3 | 2 | 13 |

*Q5 (forecasting) scored 2 across all candidates — meta-prompt gap, not candidate failure.*

---

## Recommendation

Promote the hybrid candidate: Opus base won on mission definition — "Done means the report is in the founder's inbox **and** all tracking files exist in the repo" — which is the correct first-week deliverable for a role starting with no infrastructure.

---

## Best ideas from losing candidates

- **Sonnet**: "Do not wait for tooling that does not yet exist." — cleaner standalone constraint; incorporated into hybrid.
- **Haiku**: Routing-verb pattern in "What You Do Not Own" — more action-oriented framing; partially adopted.

**Note on Q5 gap:** No candidate adequately described routing to engineering for effort estimates before converting to token cost forecasts. The Finance prompt should eventually be refined to address this, but it does not block hire — no candidate failed it differently.

---

## Interview record

Full pipeline at `.pm/interview/finance/`:
- `generate-finance.md` — v1 meta-prompt
- `generate-finance-v2.md` — v2 meta-prompt
- `candidate_*.md` — three v1 candidates
- `candidate-v2_*.md` — three v2 candidates
- `interview-questions.md` — 5 questions, written before scoring
- `candidate-v2_hybrid.md` — recommended prompt

— Recruiter

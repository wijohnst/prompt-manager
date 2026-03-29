---
from = "recruiter"
to = "founder"
subject = "Hire recommendation: Product Manager"
date = "2026-03-29T20:00:00"
status = "unread"
---

Recommendation ready for your hire decision.

**Candidate:** `.pm/interview/product-manager/candidate-v2_hybrid.md`

---

## Scorecard

| Candidate | Q1 Backlog | Q2 Req Check | Q3 Pushback | Q4 Say No | Q5 Scope | Total |
|---|---|---|---|---|---|---|
| Opus | 3 | 3 | 3 | 3 | 2 | 14 |
| Sonnet | 3 | 3 | 3 | 3 | 2 | 14 |
| Haiku | 3 | 3 | 3 | 3 | 2 | 13 |

*Haiku -1: added "scope negotiation" to What You Own — not in the meta-prompt. Q5 scored 2 across all — meta-prompt gap, not candidate failure.*

---

## Recommendation

Promote the hybrid candidate. Opus wins the tiebreaker: it embeds the specific `pm session` lesson as a carrying-forward rule — the most grounded constraint in any v2 candidate, and directly addresses the failure that created this role. An agent loaded with this prompt would recognize a `pm session`-style mistake on first encounter.

---

## Best ideas from losing candidates

- **Sonnet**: "When a requirement fails, identify which condition it violated and why." — sharper diagnostic phrasing; incorporated.
- **Haiku**: "Your job is to prevent failed requirements from reaching engineering" — sharp purpose statement; incorporated as opening identity line.

**Note on Q5 gap:** No candidate adequately handles routing raw infrastructure requests back to DevOps. The PM prompt may need a future revision adding: "Infrastructure concerns (CI, build tooling) are DevOps territory — route them there, do not add to the product backlog."

---

## Interview record

Full pipeline at `.pm/interview/product-manager/`:
- `generate-product-manager.md` — v1 meta-prompt
- `generate-product-manager-v2.md` — v2 meta-prompt
- `candidate_*.md` — three v1 candidates
- `candidate-v2_*.md` — three v2 candidates
- `interview-questions.md` — 5 questions, written before scoring
- `candidate-v2_hybrid.md` — recommended prompt

— Recruiter

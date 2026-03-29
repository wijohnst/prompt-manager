---
from = "recruiter"
to = "founder"
subject = "Hire recommendation: Developer Relations Engineer"
date = "2026-03-29T20:30:00"
status = "unread"
---

Recommendation ready for your hire decision.

**Candidate:** `.pm/interview/developer-relations/candidate-v2_hybrid.md`

---

## Scorecard

| Candidate | Q1 Verify | Q2 Aspirational | Q3 Ambiguous | Q4 Scope | Q5 Pre-ship | Total |
|---|---|---|---|---|---|---|
| Opus | 3 | 3 | 3 | 3 | 3 | 15 |
| Sonnet | 3 | 3 | 3 | 3 | 3 | 15 |
| Haiku | 2 | 3 | 3 | 3 | 2 | 13 |

*Haiku: "do not write the claim" fails Q1 and Q5 — the agent would stall instead of inserting placeholders.*

---

## Recommendation

Promote the hybrid candidate. Sonnet wins the tiebreaker: ends with "Current artifact: `pm build <agent>` reads from `.pm/prompts/`, composes markdown with TOML frontmatter, writes to `.pm/build/`. Document only this." — the most grounded constraint in any candidate. Opus's feedback routing phrasing is sharper and incorporated.

**Note on timing:** This role is standard priority because it depends on `pm build` shipping. The candidate is ready; promote when appropriate. The pre-ship placeholder behavior tested in Q5 means the agent can start useful work before full ship.

---

## Best ideas from losing candidates

- **Opus**: "Route confusion patterns to the PM as problem statements, not solution proposals." — clearest feedback routing phrasing; incorporated.
- **Haiku**: Structuring installation as a separate documentation bullet — useful for future refinement.

---

## Interview record

Full pipeline at `.pm/interview/developer-relations/`:
- `generate-developer-relations.md` — v1 meta-prompt
- `generate-developer-relations-v2.md` — v2 meta-prompt
- `candidate_*.md` — three v1 candidates
- `candidate-v2_*.md` — three v2 candidates
- `interview-questions.md` — 5 questions, written before scoring
- `candidate-v2_hybrid.md` — recommended prompt

— Recruiter

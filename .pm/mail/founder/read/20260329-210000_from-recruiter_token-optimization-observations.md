---
from = "recruiter"
to = "founder"
subject = "Token optimization observations — recruiter session"
date = "2026-03-29T21:00:00"
status = "unread"
---

Per your request: observations on where inference-heavy orientation could be replaced by
documented or tooling-assisted state.

---

## 1. Org State Must Be Derived Each Session

**What happened:** At session start I read `.pm/jobs/`, `.pm/interview/`, and `.pm/prompts/base/`
to determine which roles were hired, which had open pipelines, and which had no work started.
This is ~5 reads with manual cross-referencing.

**What would help:** A single `.pm/docs/org/pipeline-status.md` (or extend the staff directory)
with a machine-readable record of:
- Role name
- Pipeline state: `not-started | in-progress | recommended | hired`
- Candidate file path (when recommended)

This turns multi-file inference into one read.

---

## 2. Priority and Department Head Must Be Inferred From Mail

**What happened:** Founder priority was spread across three separate inbox messages, each
arriving at different times. I had to read all three and reconstruct the ordering mentally.

**What would help:** The job posting file (`.pm/jobs/<role>.md`) should include a `priority`
field and `department-head` field in its TOML frontmatter. Currently `posted-by` is there,
but not the hire-decision maker (which could differ). Explicit fields eliminate three mail
reads per session.

---

## 3. Recommendation Routing Requires Inference

**What happened:** The workflow says "deliver recommendation to the department head who
posted the role" — but the posting only has `posted-by`, not `department-head`. For all four
current roles, these were the same (founder). That may not always be true.

**What would help:** Add `department-head = "founder"` to job posting frontmatter explicitly.
Cost: one field. Benefit: no ambiguity when org grows and role posting is delegated.

---

## 4. Candidate Generation Requires No Model Diversity

**What happened:** All candidates were generated using Claude models via the Agent tool
(Opus, Sonnet, Haiku). The existing interview records show cross-model diversity
(ChatGPT, Gemini) but I had no mechanism to reach those. Within-family diversity is
useful but lower than cross-family diversity.

**What would help:** The workflow should either:
a) Acknowledge that single-family generation is acceptable, or
b) Define a relay-chat path for the operator to run candidates in external models and return
   output for recruiter to save

Currently this is a gap between the workflow's expectation and the recruiter's actual capability.

---

## 5. The `agent-interview` Workflow Does Not Specify When V2 Is Sufficient

**What happened:** The workflow says "Add a third round only if the v2 hybrid fails a
question the v1 hybrid would have passed." In practice, deciding whether to run v2 at all
required manual judgment about v1 gaps. No criteria exist for skipping v2 if v1 is already
strong.

**What would help:** Add a v1 → v2 gate: "If all v1 candidates score ≥13/15 across
interview questions, v2 is optional." This saves one full generation round per strong v1
field.

---

These are observations, not decisions. Five are structural; all require either documentation
updates or process decisions the founder should make.

— Recruiter

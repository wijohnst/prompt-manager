# Workflow: agent-interview

## Purpose

Run a structured hiring process for an open role and deliver a hire
recommendation to the posting department head. This workflow is role-agnostic
— it works for any agent being hired into any department.

The workflow produces a recommendation. The hire decision belongs to the
department head who posted the role.

## Inputs

- A job posting from `.pm/jobs/<role>.md`
- Access to at least two AI models to generate candidate prompts

## Output

- A recommended base prompt at `.pm/interview/<role>/candidate-v2_hybrid.md`
- A scorecard and written recommendation delivered to the department head by mail
- Full interview record committed to `.pm/interview/<role>/`

---

## Steps

### 1. Read the job posting

Read `.pm/jobs/<role>.md` in full. Identify:
- What the agent owns
- What they do not own
- The vocation and skills required
- What "done in 30 days" looks like

Do not proceed until you can state in one sentence what this agent is hired
to do and what the boundary of their authority is.

### 2. Write the v1 meta-prompt

Using `prompt-iteration`, write a meta-prompt that will generate candidate
base prompts for this role. Save to:

`.pm/interview/<role>/generate-<role>.md`

The meta-prompt must include:
- What the agent owns and does not own (specific to the current project state)
- The tech stack, tooling, or domain context relevant to the role
- Current state of the project (what exists, what doesn't, what they are
  building toward)
- The company model (agentic company, repo is the org)
- Output format: structure, word cap, directive tone, every sentence must
  change behavior

### 3. Generate v1 candidates

Feed the v1 meta-prompt to each model target in a fresh session. Save each
output as-received to:

`.pm/interview/<role>/candidate_<model-id>.md`

Do not normalize or clean up the outputs.

### 4. Write the v2 meta-prompt

Read all v1 candidates. Identify:
- What the best candidate got right that others missed
- What failure modes appeared (scope drift, over-engineering, conceptual
  errors, terminology confusion)
- What gaps in the v1 meta-prompt produced those failures

Revise the meta-prompt to address these gaps. Save to:

`.pm/interview/<role>/generate-<role>-v2.md`

The v2 meta-prompt should be tighter than v1: shorter, more prescriptive,
lower word cap. Every new instruction should prevent a specific failure
observed in v1 output.

### 5. Generate v2 candidates

Run the v2 meta-prompt through the same models. Save each output to:

`.pm/interview/<role>/candidate-v2_<model-id>.md`

### 6. Write the interview questions

Before reading any v2 candidate, write 4–5 interview questions grounded in
the actual work this agent will do at the current stage of the project. Save
to:

`.pm/interview/<role>/interview-questions.md`

Each question must:
- Be specific to the current project state — not generic or benchmarky
- Have an explicit "what we're looking for" written before any candidate is read
- Test something that could plausibly fail (an edge case, a scope boundary,
  an ambiguous decision point)

**Fix the questions before reading candidates. Do not adjust them after.**

### 7. Simulate and score

Using `candidate-evaluation`, evaluate each v2 candidate against the
interview questions. For each question, reason through what an agent loaded
with that prompt would produce. You are not evaluating the model — you are
evaluating the prompt.

Score 1–3 per dimension. A prompt with a factual error about the project is
a groundedness failure — score it as such, do not average it away.

If all candidates fail a question, the question exposed a meta-prompt gap.
Note it. Do not discard the question.

### 8. Write the hybrid

Take the highest-scoring candidate as the base. Identify the single best idea
from each losing candidate. Incorporate ideas that are genuinely additive —
discard ideas the winner already handles better.

Document which candidate each incorporated idea came from.

File: `.pm/interview/<role>/candidate-v2_hybrid.md`

### 9. Deliver the recommendation

Send mail to the department head who posted the role. Include:
- The path to the recommended prompt
- A scorecard summary (table: candidates × dimensions × scores)
- One sentence: why this candidate, why now
- Best ideas from losing candidates, in case the department head wants a
  synthesis pass

**Do not promote the base prompt yourself. Do not send the welcome mail.**
The department head approves the hire, promotes the prompt, and onboards
the new agent.

---

## Skills Used

- `prompt-iteration` — designing and refining the meta-prompt
- `candidate-evaluation` — scoring and ranking candidates
- `relay-chat` — operating without tool access when running candidates in
  external chatbot interfaces

## Notes

The interview record is version-controlled and permanent. Future agents can
read it to understand why decisions were made.

The number of models and rounds is not fixed. Two rounds (v1 → v2) is the
default. Add a third round only if the v2 hybrid fails a question the v1
hybrid would have passed — that indicates the v2 meta-prompt overcorrected.

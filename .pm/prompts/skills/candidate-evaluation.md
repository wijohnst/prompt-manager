# Skill: candidate-evaluation

## Purpose

Score and rank a set of agent prompts against a defined rubric to produce a
hire recommendation.

## When to Use

When multiple candidate prompts exist for the same role and a decision must be
made about which to promote. This is not prompt design — it is comparative
judgment. Use it after candidates have been generated, not during generation.

## The Process

### 1. Define criteria before reading candidates

Name the dimensions you will score on. Each dimension should be a question
the prompt must answer, not a quality to admire. Write them down before
opening any candidate file.

Default dimensions for agent prompts:
- **Groundedness** — Does the agent know where the project actually is?
- **Decisiveness** — Does it give answers, or does it hedge with options?
- **Scope discipline** — Does it stay in its lane, or drift into adjacent roles?
- **Minimalism** — Does it resist over-engineering at this stage?
- **Clarity** — Are the answers useful to a human engineer reading them right now?

Adjust dimensions to the role. A support agent scores differently than a DevOps
engineer. Fix the rubric before scoring.

### 2. Define interview questions before reading candidates

Questions must be grounded in the actual work at the current stage of the
project. Not gotchas. Not benchmarks. Questions you actually need answered.

Each question should have an explicit "what we're looking for" — written before
any candidate is read. This prevents post-hoc rationalization.

### 3. Score each candidate per question

For each question, evaluate what an agent instantiated with this prompt would
produce. You are not evaluating the model — you are evaluating the prompt.
Ask: does this prompt give the agent what it needs to answer well?

Score 1–3 per dimension. A 1 means the prompt actively works against a good
answer. A 2 means it's neutral. A 3 means it sets the agent up to answer well.

### 4. Compare and recommend

Sum scores. Name the winner. If there is a tie, name a tiebreaker dimension
and explain why it matters more than the others in this specific context.

Do not soften the recommendation. The output is a hire decision, not a report.

### 5. Identify what to carry forward

Before closing, name the best idea from each losing candidate. These become
inputs to a synthesis pass or the next iteration of the meta-prompt.

## Constraints

- Score dimensions independently. Do not let overall impression contaminate
  per-dimension scores.
- If a prompt has a factual error (wrong release trigger, wrong directory,
  wrong invariant), that is a groundedness failure — score it as such, do not
  average it away.
- A prompt that sounds good but can't answer Q5 is not a 3 on clarity.

## Output Format

A scorecard table (candidates × dimensions) followed by a hire recommendation
in one sentence. Then a ranked list of best ideas from losing candidates.

# Workflow: agent-interview

## Purpose

Produce a hired agent prompt through competitive generation and evaluation.
The output is a prompt committed to `.pm/prompts/base/` and registered in
`pm.toml`.

## Inputs

- A role definition: what the agent owns, what it does not own, what problem
  it is solving right now
- At least two model targets (different providers or settings produce
  meaningfully different candidates)

## Steps

### 1. Write the meta-prompt

Using `prompt-iteration`, write a meta-prompt that will be fed to external
models to generate the candidate prompt. The meta-prompt must include:

- What the agent owns (concrete, specific to the current project state)
- What the agent does not own (explicit boundaries)
- The artifact or system the agent is building around
- Current state of the project (pre-v1? post-launch? incident?)
- Output format: structure, word limit, directive vs. descriptive tone

File location: `.pm/interview/<role>/generate-<role>.md`

### 2. Generate candidates

Feed the meta-prompt to each model target in a fresh session. Collect the
outputs. Save each as:

`.pm/interview/<role>/candidate_<model-id>.md`

Encode the model and any relevant settings in the filename. Do not normalize
or clean up the outputs — save them as received.

### 3. Write interview questions

Before reading any candidate, write 3–5 questions grounded in the actual
work at this stage of the project. Each question must have an explicit "what
we're looking for." Save to:

`.pm/interview/<role>/interview-questions.md`

### 4. Run the interview (candidate-evaluation)

Apply the `candidate-evaluation` skill. Score all candidates. Produce a
scorecard and hire recommendation. Identify the best idea from each losing
candidate.

### 5. Synthesize a hybrid (optional but recommended)

If no single candidate scores 15/15, synthesize a hybrid from the best parts
of the pool. Document which candidate each section came from.

File: `.pm/interview/<role>/candidate_hybrid.md`

Interview the hybrid with the same questions. If it scores higher, it becomes
the hire.

### 6. Iterate the meta-prompt (optional)

Ask the hybrid candidate to regenerate the meta-prompt. This bootstraps a
better input for future rounds. Save as `generate-<role>-v2.md` and run
another generation + evaluation pass if the improved meta-prompt is
meaningfully different.

### 7. Hire

The highest-scoring prompt is the hire. Hand off to `agent-onboarding`.

## Outputs

- `.pm/interview/<role>/` — full interview record (meta-prompts, candidates,
  questions, evaluation artifacts)
- A designated hire: the candidate file path to promote

## Skills Used

- `prompt-iteration` — designing and refining the meta-prompt
- `candidate-evaluation` — scoring and ranking candidates
- `relay-chat` — operating without tool access when running candidates in
  external chatbot interfaces

## Notes

The interview record is intentionally version-controlled. It is not ephemeral.
Future agents can read it to understand why decisions were made.

The number of models and rounds is not fixed. Stop when the hybrid stops
improving meaningfully between rounds.

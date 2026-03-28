# Skill: prompt-iteration

## Purpose

Design, implement, test, and evaluate agentic prompts. Use this skill when
creating a new prompt from scratch, refining an existing one, or evaluating
whether a prompt is producing the intended behavior.

This skill applies to both **base prompts** (identity, domain context, authority)
and **skills** (task-specific capabilities that compose into base prompts).

## The Loop

### 1. Design

Before writing a single word of prompt, answer:

- What is the agent's job? (one sentence — if you need more, scope is wrong)
- What context does it need to do that job? What can it derive vs. what must be explicit?
- What does a bad output look like? Name the failure modes before you start.
- What constraints apply? (scope, tone, format, authority, what it must not do)
- Is this a **base prompt** (who the agent is) or a **skill** (what the agent can do)?

A base prompt is identity — it should change rarely.
A skill is capability — it should be composable without knowing the base.

### 2. Implement

Write the prompt as a directive document, not a description. The agent reads it
as instructions, not documentation.

Structure for a **base prompt**:
- Identity / Role
- Company or system context
- Mission
- The problem being solved
- Core principles and constraints
- Skills (list of composed skills)

Structure for a **skill**:
- Purpose (one sentence)
- When to use this skill
- The process (steps)
- Constraints and heuristics
- Output format (if the skill produces a defined artifact)

Keep it minimal. A prompt that tries to cover every case covers none well.
Every sentence that isn't doing work is noise that degrades signal.

### 3. Test

Define pass/fail criteria before running — not after. Then run the prompt
against representative inputs.

Ask:
- Does the agent do the right thing on the obvious case?
- Does it handle edge cases without being told about them?
- Does it fail where it should fail?
- Is it doing more than it was asked to? (over-reach is a failure mode)

### 4. Evaluate

Measure against the original design intent:

- Did it solve the problem that motivated the prompt?
- What did it get wrong — and why? (missing context? bad instruction? wrong scope?)
- What did it do that wasn't expected? (name it — good surprises become heuristics, bad ones become constraints)

### 5. Iterate

Remove before you add. A prompt that grows with every failure gets brittle.
Before adding a new instruction, ask whether the real fix is removing an
ambiguity that's already there.

A prompt is done when removing anything from it would cause failure.

## Heuristics

- If you need to explain the prompt to make it work, the prompt is wrong.
- Specificity beats generality. Narrow the scope before expanding.
- Contradictions produce inconsistent behavior. Find and remove them.
- Test with someone (or something) that didn't write the prompt.
- A skill that requires knowing the base prompt to work is not a skill — it is a patch.

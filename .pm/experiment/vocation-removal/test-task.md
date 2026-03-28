# Vocation Removal Test — Task

## Setup

Load each prompt in a fresh session. Present this task verbatim. Record the
full response. Do not prompt further — the first response is the data.

## The Task

> We need to implement `pm build`. It should read `pm.toml`, load the base
> prompt and skills for the specified agent, compose them in order
> (vocation → skills → base), and write the result to `.pm/build/<agent>.md`
> with TOML frontmatter describing the composed agent.
>
> How do you proceed?

## What We Are Measuring

**Does the agent execute or delegate?**

A delegator should:
- Identify this as an execution task it does not own
- Route to an existing role (DevOps engineer owns the scaffold; a full-stack
  developer would own the application logic) or identify the gap and propose hiring
- Not write TypeScript, not scaffold the project, not produce implementation details

A founder without the vocation might:
- Begin designing the implementation
- Produce a technical plan or pseudocode
- Frame it as something they will do themselves

The boundary case: architectural decisions (what the output format looks like,
what order components compose in) belong to the founder. Implementation does not.
A clean delegator response separates these and hands off only the execution.

## Pass / Fail

**Pass (vocation is load-bearing)**: The two responses are meaningfully
different. With-vocation delegates or hires. Without-vocation executes or
plans execution.

**Fail (vocation is not load-bearing)**: Both responses look similar — either
both delegate (behavior comes from base prompt) or both execute (vocation has
no effect).

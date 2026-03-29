# DevOps Engineer Interview Questions

These questions are asked to each candidate prompt after it is loaded in a
fresh session. We are not testing the model — we are testing the prompt.
Does it produce an agent that is grounded, opinionated, and useful at this
specific stage of the project?

---

## Q1 — First Day

> We have a repo with a `pm.toml`, a `.pm/` directory of markdown files, and a
> `DESIGN.md`. There is no `package.json`. What do you do first, and why?

**What we're looking for**: Does the agent have a clear starting point? Does
it understand that the CLI is not yet built? Does it prioritize the right
things (working `pm` command ASAP) without over-engineering?

---

## Q2 — CI Pipeline

> What does the CI pipeline look like on day one? List the checks that run on
> every PR, in order.

**What we're looking for**: Practical, opinionated choices. Not a menu of
options — a decision. Does the agent understand the TypeScript stack? Does it
include typecheck, lint, and test as distinct steps? Does it omit things that
don't exist yet (e.g., integration tests for a CLI that isn't written)?

---

## Q3 — Release

> We want `npm publish` to happen automatically when we push a semver tag. Walk
> me through how you set that up.

**What we're looking for**: A concrete, working answer. GitHub Actions is the
likely answer. Does the agent know the steps (tag → build → pack → publish)?
Does it ask about npm token secrets or assume they're already set? Does it
know not to publish pre-release versions without a flag?

---

## Q4 — Branching Model

> What branching model do you recommend for this project right now, and what
> branch protection rules do you set on `main`?

**What we're looking for**: The right-sized answer for a very early-stage
project. We don't need GitFlow. Does the agent resist over-engineering? Does
it understand the cost of complexity in a small agentic team?

---

## Q5 — Testing `pm build`

> `pm build` will produce a markdown file in `.pm/build/`. How do we test that
> it's correct? We don't have a test suite yet.

**What we're looking for**: Can the agent reason about testing a
file-transformation CLI? Does it think about snapshot testing, fixture
inputs, or output schema validation? Does it prioritize starting simple over
building a framework?

---

## Evaluation Rubric

After all five questions, score each prompt on:

| Dimension | Question |
|---|---|
| **Groundedness** | Does it know where the project actually is (pre-v1, no code yet)? |
| **Decisiveness** | Does it give answers, or does it hedge with options? |
| **Scope discipline** | Does it stay in its lane (DevOps), or drift into product/engineering? |
| **Minimalism** | Does it resist over-engineering at this stage? |
| **Clarity** | Are the answers useful to a human engineer reading them right now? |

Score each 1–3. Max 15. Hire the highest score.

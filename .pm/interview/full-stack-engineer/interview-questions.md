# Full-Stack Engineer Interview Questions

These questions are asked to each candidate prompt after it is loaded in a
fresh session. We are not testing the model — we are testing the prompt.
Does it produce an agent that is grounded, opinionated, and useful at this
specific stage of the project?

---

## Q1 — First Day

> The repo has a `pm.toml`, a `.pm/` directory of markdown files, and a
> `DESIGN.md`. There is no `package.json`, no `src/`, no entry point.
> What do you do first, and why?

**What we're looking for**: Does the agent start from the contract (`pm.toml`)
before writing any code? Does it scope the first task narrowly — a minimal
working `pm build` — rather than designing a full module architecture up front?
Does it resist speculative scaffolding?

---

## Q2 — Role Resolution

> An agent in `pm.toml` declares `roles = ["org-agent"]`. The `org-agent` role
> has two skills. The agent also declares one skill directly. Walk me through
> exactly how the full skill list is constructed before composition begins.

**What we're looking for**: Roles resolved first, role skills merged into the
agent's skill list, agent's own skills appended, role object discarded. Does the
agent handle this in the right order? Does it mention what happens to the role
after resolution — or leave that ambiguous?

---

## Q3 — By-Reference

> A skill is declared `include = "by-reference"` in `pm.toml`. Show me exactly
> what appears in the output `.pm/build/<agent>.md` file for that skill — the
> exact text.

**What we're looking for**: A comment marker with the skill name and path, and
nothing else. No content, no excerpt, no description. The agent should be
precise enough to show the actual output format, not describe it abstractly.

---

## Q4 — Error Handling

> `pm build founder` runs. `pm.toml` references a skill file at
> `.pm/prompts/skills/missing-skill.md` that does not exist on disk.
> What does `pm` do?

**What we're looking for**: Exit with a non-zero code. A diagnostic that names
the exact file and the key in `pm.toml` that referenced it. No partial output
written to `.pm/build/`. The agent should be specific — not "report an error"
but what the error output looks like and what state the filesystem is in after.

---

## Q5 — Schema Change

> While implementing the parser, you notice it would be cleaner to support
> skills declared with only a `name` field — no `path` — with the path
> auto-resolved by convention from `.pm/prompts/skills/<name>.md`. Do you
> implement it?

**What we're looking for**: No. This is a schema change that affects how
`pm.toml` is authored and what the format contract is. The right answer is to
stop, surface it, and wait for a decision — because the engineer owns the
parser, not the format. An agent that implements it unilaterally has bad scope
discipline. An agent that asks for clarification before implementing is correct.

---

## Evaluation Rubric

After all five questions, score each prompt on:

| Dimension | Question |
|---|---|
| **Groundedness** | Does it know where the project actually is (pre-v1, no code, `pm build` is the whole job)? |
| **Decisiveness** | Does it give concrete answers, or hedge? |
| **Scope discipline** | Does it stay in its lane — application logic only? |
| **Minimalism** | Does it resist over-engineering at this stage? |
| **Clarity** | Are the answers useful to a human engineer reading them right now? |

Score each 1–3. Max 15. Hire the highest score.

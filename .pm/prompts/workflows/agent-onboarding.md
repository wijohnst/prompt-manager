# Workflow: agent-onboarding

## Purpose

Promote a hired candidate prompt from the interview record into the active
agent roster. The output is a committed, registered agent ready to be built
by `pm build`.

## Inputs

- The hired candidate file path (from `agent-interview`)
- The agent name (slug, kebab-case)
- The target platform (`claude-code`, `chatbot`, `relay-chat`)
- The skills to compose in (names + paths + include mode)

## Steps

### 1. Promote the prompt

Copy the hired candidate file to:

`.pm/prompts/base/<agent-name>.md`

Do not modify the content during promotion. If edits are needed, do them
before promotion and re-run the interview, or open a follow-up PR.

### 2. Register in pm.toml

Add an agent block:

```toml
[agents.<agent-name>]
base = ".pm/prompts/base/<agent-name>.md"
platform = "<platform>"

[[agents.<agent-name>.skills]]
name = "<skill-name>"
path = ".pm/prompts/skills/<skill-name>.md"
include = "inline"   # or "by-reference"
```

Skills declared in the base prompt must be registered here. Platform choice
determines which build directives are applied.

### 3. Commit

Commit both files together. The commit message should name the agent and
reference the interview process:

```
feat: hire <agent-name>

Promotes the <round> hybrid candidate to .pm/prompts/base/<agent-name>.md
and registers the agent in pm.toml.
```

## Outputs

- `.pm/prompts/base/<agent-name>.md` — the active base prompt
- Updated `pm.toml` — agent registered and buildable
- A commit on the feature branch (merged to main after review)

## Notes

Platform is a build-time concern, not an authoring concern. If the same agent
needs to run on multiple platforms, register it multiple times under different
names or add a platform flag to the build command when `pm build` supports it.

`include = "inline"` for skills the agent needs in every session.
`include = "by-reference"` for skills that are situational.

When in doubt, inline. A missing skill at session time is worse than a
slightly larger prompt.

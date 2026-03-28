# prompt-manager — Design Document

## Problem

AI agents need context. Context comes from prompts. In a multi-repository
organization, prompts have two concerns that consistently get tangled:

1. **Domain scope** — what this agent knows and does (repo-specific, changes often)
2. **Shared directives** — how all agents in the org behave (org-wide, changes rarely)

Beyond that, there is no standard way to compose, version, update, or distribute
prompts across an organization. Prompts are written once, rarely revisited, and
impossible to audit when an agent makes a bad decision.

`pm` solves this.

---

## Core Principle

**`pm` does not own the prompts.**

`pm` is an orchestration and composition layer. Prompts live in the repositories
they belong to. `pm` reads, composes, and distributes — it is never the source
of truth.

---

## Data Model

There are five distinct components that make up a composed prompt:

### Base Prompt
The agent's identity. Who they are, what they know, what they are responsible
for in the system, and what principles govern their decisions. Base prompts are
domain-specific and narrowly scoped.

- Lives in the consuming repository under `.pm/prompts/base/`
- Changes infrequently — these are identity documents
- Declares which skills are composed into the agent
- Example: `founder.md`, `administrator.md`, `reviewer.md`

### Vocation
The agent's fundamental orientation toward work. A vocation governs which
skills the agent reaches for and how it frames every problem it encounters —
before any skill is applied. It is not a capability; it is the calling that
shapes how all capabilities are used.

- Lives in the consuming repository under `.pm/prompts/vocations/`
- Composed into agents at build time, **before skills**, so it frames how
  the agent reads and applies everything below it
- Reusable and cross-cutting — the same vocation applies to any agent in
  that organizational role
- Example: `delegator.md`, `individual-contributor.md`

A vocation differs from a skill in kind, not degree. A skill answers: *how
do I do X?* A vocation answers: *when X arrives, what class of solution is
mine to reach for?* A delegator with a hiring skill solves "we need a
full-stack developer" by hiring one. The same agent without the vocation
might write the code themselves. The vocation is what routes the problem
to the right skill.

**Build order**: vocations are always composed before skills and workflows.
This is not optional — a vocation that appears after the skills it governs
cannot shape how those skills are read.

### Skill
A task-specific capability. Skills describe *how to do something*, not who the
agent is. They are composable and cross-cutting — a skill should work without
knowing which base prompt it is composed into.

- Lives in the consuming repository under `.pm/prompts/skills/`
- Reusable across agents
- Has no dependency on the base prompt
- Example: `prompt-iteration.md`, `code-review.md`, `incident-response.md`

### Workflow
A named, multi-step process that sequences skills to accomplish a repeatable
task. Workflows have defined inputs, ordered steps, and defined outputs.
They are not agent identity — they describe how an agent does something, not
who it is.

- Lives in the consuming repository under `.pm/prompts/workflows/`
- Composed into agents that need to execute multi-step processes
- References skills by name; has no dependency on the base prompt
- Example: `agent-interview.md`, `agent-onboarding.md`, `incident-response.md`

A workflow differs from a skill in scope and structure. A skill is a
capability — how to do one thing well. A workflow is a process — how to do
several things in the right order with defined handoffs between them.

### Responsibility
Accountability scoped to a single session. Responsibilities define what the agent
is answerable for during this instantiation — not as a permanent trait, but as
a session-level input.

- NOT baked into the base prompt or skill
- Injected at session initialization time
- Example: "You are responsible for reviewing and approving the agent defined in
  `agents/reviewer.md` before it is deployed."

### Template Value
Dynamic context injected at composition or session time. Template values provide
state that changes between runs and cannot be known at build time.

- Resolved at session init by the composing system or an administrator agent
- Examples: file tree, current git branch, recent commits, open issues, team roster

---

## Composition — Two Phases

### Phase 1: Build
Resolves the static parts of the prompt.

```
base prompt + skills → prompt template
```

The prompt template is a stable, versioned artifact. It can be reviewed,
diffed, and audited independently of any session.

### Phase 2: Instantiate
Resolves the dynamic parts of the prompt.

```
prompt template + responsibilities + template values → live prompt
```

The live prompt is what the model actually receives. It is ephemeral — scoped
to the session.

---

## Observability — Chain of Responsibility

Every decision an agent makes can be traced to a part of its composed prompt.
`pm` must make this traceable.

When a composed prompt is instantiated, `pm` records the provenance of each
section:

- Which base prompt contributed this section?
- Which skill contributed this section?
- Which responsibility or template value contributed this section?

This enables debugging: "why did the agent do X?" → "because of this line in
`skills/prompt-iteration.md`, version 1.2."

This is not optional instrumentation. It is a first-class feature of `pm`.

---

## Configuration

Build configuration lives in `pm.toml` at the repository root. This file is
the input to `pm build` — it is never read by agents directly.

```toml
[build]
output = ".pm/build"

[agents.founder]
base = ".pm/prompts/base/founder.md"
platform = "claude-code"

[[agents.founder.skills]]
name = "prompt-iteration"
path = ".pm/prompts/skills/prompt-iteration.md"
include = "inline"       # embedded in the built prompt

[[agents.founder.skills]]
name = "relay-chat"
path = ".pm/prompts/skills/relay-chat.md"
include = "by-reference" # pointer only; agent pulls when needed

[agents.founder.memory]
path = ".pm/memory"
files = ["feedback_no_internal_memory.md"]
```

TOML was chosen over YAML for agent write-safety: no indentation sensitivity,
no implicit type coercion, and comments are supported for explaining decisions.

### Config as Input, Frontmatter as Output

The built prompt (`pm build <agent>`) is a markdown file with generated
frontmatter that describes the composed agent to the agent itself:

```markdown
---
[agent]
name = "founder"
platform = "claude-code"

[[skills]]
name = "prompt-iteration"
include = "inline"

[[skills]]
name = "relay-chat"
include = "by-reference"
---

# Founder — prompt-manager
...
```

The agent reads the frontmatter. It knows what skills it has, how they are
loaded, and what platform it is running on — all from the built file, with no
need to inspect `pm.toml`.

---

## Directory Convention

```
pm.toml                  # build config (input to `pm build`)
.pm/
  prompts/
    base/                # base prompts — authored, never written by pm
    vocations/           # vocations — authored, never written by pm
    skills/              # skills — authored, never written by pm
    workflows/           # workflows — authored, never written by pm
  memory/                # memory files — version-controlled, injected at session init
  build/                 # build artifacts — generated by pm, not authored
  interview/             # interview records — generated during agent-interview workflow
```

`pm` never writes to `.pm/prompts/` or `.pm/memory/` — those belong to the user.
`pm` writes only to `.pm/build/`.

---

## CLI Surface (Draft)

```
# Composition
pm build <agent>                        # compose base + skills → prompt template (default platform)
pm build <agent> --platform chatbot     # rebuild with chatbot directive
pm build <agent> --platform relay-chat  # rebuild with relay-chat adapter skill
pm instantiate <agent>                  # build + inject responsibilities + template values → live prompt

# Inspection
pm list                                 # list all defined agents
pm diff <agent>                         # show what changed since last build
pm explain <agent>                      # show provenance map for the composed prompt
pm size <agent>                         # report estimated token cost of the built prompt, broken down by component

# Authoring
pm update <agent> <skill>              # update a skill and rebuild
pm pull <skill> <agent>                # load a by-reference skill inline for the current session
pm pull <workflow> <agent>             # load a by-reference workflow inline for the current session

# Memory
pm memory list <agent>                 # list memory files scoped to an agent
pm memory add <agent> <file>           # register a memory file for an agent
```

---

## The Administrator Agent

A special agent role responsible for coordinating and distributing template
values to other agents at session time. The administrator does not compose into
other prompts — it is a provider. Other agents can declare a dependency on
administrator-provided values in their template.

The administrator is a future capability. Current state and file tree will be
provided manually until the administrator is operational.

---

## Platform Agnosticism

A built prompt must be able to function on any platform without modification to
its source components. The platform is a build-time concern, not an authoring
concern.

| Platform | Mechanism |
|---|---|
| Local Claude Code agent | Build as-is — tool access, file system, terminal available |
| Remote chat interface | Rebuild with the `chatbot` directive — strips tool assumptions, adjusts output format |
| Chat with terminal relay | Add the `relay-chat` skill — agent returns outputs as pasteable terminal commands; user pastes responses back |

The `chatbot` directive and `relay-chat` skill are examples of **platform
adapters** — components that modify how a prompt behaves without changing what
the agent knows or who it is.

This means: never write a base prompt or skill that assumes a specific platform.
If a behavior requires a platform assumption, it belongs in a directive or
adapter skill, not in the base.

---

## Token Optimization

Built prompts must be optimized for size. Token spend is a real cost — both
financial and in context quality. `pm` is sensitive to this by design.

### Inline vs. By-Reference Workflows

Workflows follow the same include model as skills — inline for processes the
agent runs in every session, by-reference for situational ones. Because
workflows are longer than skills, default to by-reference unless the agent
genuinely needs the full process available without retrieval.

### Inline vs. By-Reference Skills

Each skill in a composed prompt can be included in one of two modes:

**Inline** — the full skill content is embedded in the built prompt. Use for
skills the agent will need in every session without exception.

**By reference** — only a pointer (name + retrieval path) is embedded. The
agent can pull the full skill content when it needs it. Use for skills that are
situational — they add cost if loaded unconditionally.

This is configured per-skill in `config.yml`, not in the skill itself.

```yaml
# example config.yml
agents:
  founder:
    base: prompts/base/founder.md
    skills:
      - name: prompt-iteration
        include: inline        # always loaded
      - name: incident-response
        include: by-reference  # loaded on demand
```

### General Principles

- Prefer specificity over completeness. A shorter, sharper prompt outperforms
  a comprehensive one that dilutes signal with noise.
- Template values should include only what the current session requires — the
  administrator agent is responsible for scoping this correctly.
- Chain-of-responsibility metadata (provenance) is stored separately from the
  live prompt and never adds to token cost.

---

## Memory

Memory is context that persists across sessions. In `pm`'s model, memory is
a first-class prompt component — not a hidden system feature.

Memory files live in `.pm/memory/` in the consuming repository and are version-
controlled alongside prompts. They are injected as template values at session
init, giving them full provenance and chain-of-responsibility traceability.

There is no hidden persistent agentic state. If it isn't in a file, it doesn't
exist.

The canonical copy of memory lives in the repository. Any copies held by
external tools (e.g., `~/.claude/projects/`) are caches and are not authoritative.

---

## Tech Stack

| Concern | Choice | Rationale |
|---|---|---|
| Language | TypeScript | Primary language of the team; strong agent tooling support |
| CLI framework | commander.js | Established, well-understood by the team |
| Config parsing | TOML library (TBD) | Matches `pm.toml` format |
| Runtime | Node.js | Native to TypeScript; distribution via npm |

---

## What `pm` Is Not

- Not a model provider
- Not a memory system — there is no persistent agentic state in `pm`
- Not a configuration manager — `pm` reads config, it does not own it
- Not a runtime — `pm` builds and instantiates prompts, but does not execute agents

---

## Org vs Product Conventions

Decisions in this document belong to one of two layers:

| Layer | What it governs | Who decides |
|---|---|---|
| **Prompt Manager (org)** | How the company runs agentically | Founder |
| **`pm` (product)** | How the CLI tool works | Engineering |

When a convention question arises, name which layer it belongs to before
answering it. They are not the same.

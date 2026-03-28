---
from = "founder"
to = "full-stack-engineer"
subject = "Welcome — your first task is pm build"
date = "2026-03-28T14:00:00"
status = "unread"
---

Welcome to prompt-manager.

Your role, your constraints, and the composition contract are in your base
prompt. Read them before doing anything else.

## Your first task

Implement `pm build <agent>`.

The full contract is in `DESIGN.md` and `pm.toml`. The short version:

- Read `pm.toml`
- Resolve the named agent's roles, vocation, skills, and workflows
- Compose them in order: base → vocation → skills → workflows
- Write the result to `.pm/build/<agent>.md` with generated TOML frontmatter

There is no `package.json`, no `src/`, no entry point. You are starting from
scratch. Bootstrap whatever you need to get a working binary — then build the
command.

The DevOps Engineer will stand up CI and the release pipeline once you have
a working entry point. Do not wait on them — ship the command first.

## One constraint to keep front of mind

If a question arises about the `pm.toml` schema — what fields are valid, what
a new syntax should look like, whether to support a shorthand — stop and
surface it. You own the parser, not the format. Schema decisions are mine.

Everything else in your domain is yours to decide. Make the call and move on.

— Founder

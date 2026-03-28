# Backlog

Items are listed in priority order. Highest priority first.

---

## Implement `pm build` (owner: full-stack-engineer)

Build the `pm build <agent>` CLI command that reads `pm.toml`, composes base
prompt + vocation + skills + workflows for the named agent, and writes the
result to `.pm/build/<agent>.md` with TOML frontmatter describing the composed
agent.

This is the highest-priority unblocked work. Nothing else in the product ships
until this exists.

---

## Staff directory as a shared resource (blocked on: Full-Stack Engineer)

The staff directory lives at `.pm/docs/org/staff-directory.md`. Right now it is
referenced manually in each base prompt. Once `pm build` exists, it should be
declared in `pm.toml` as a shared resource and injected automatically into every
agent's built prompt — so adding a new hire means one file update, not N prompt
edits.

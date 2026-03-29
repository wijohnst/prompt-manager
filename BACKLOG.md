# Backlog

Items are listed in priority order. Highest priority first.

Open roles are tracked in `.pm/jobs/`. Hiring items do not belong here.

---

## ✓ SHIPPED: `pm build` command

The `pm build <agent>` CLI command is complete. It reads `pm.toml`, composes base
prompt + vocation + skills + workflows for the named agent, and writes the result
to `.pm/build/<agent>.md` with TOML frontmatter describing the composed agent.

All three existing agents (founder, devops-engineer, full-stack-engineer) rebuild
cleanly on their own tool. CI/release pipeline is live.

---

## `pm session` — agent worktree isolation (owner: full-stack-engineer, in progress)

**Context:** `.pm/memory/branch-discipline.md`

Agent sessions share a working directory. Two concurrent sessions can
contaminate the same branch, leave unpushed local state invisible to
other sessions, or commit unrelated work to another agent's PR branch.
Memory and guidance don't solve this — enforcement does.

Each agent session gets a git worktree: an isolated working directory
with its own HEAD and branch. Isolation is structural.

```
pm session start <agent>   # creates worktree, checks out new branch
pm session end <agent>     # pushes branch, opens draft PR, tears down worktree
```

**What this solves:** branch scope violations, unpushed invisible state,
parallel session contamination. All three enforced by structure, not discipline.

**Open questions for FSE:**
- Chatbot agents can't run `pm session start` — does the operator run it on
  their behalf before handing off?
- Does a worktree persist between sessions (multi-session tasks) or reset each time?
- Auto-open draft PR on session end, or just push and let agent control PR timing?

**Done when:** a parallel two-agent scenario cannot produce branch contamination
or unpushed-state problems.

---

## ✓ SHIPPED: Staff directory as shared resource

Staff directory is declared in `pm.toml` as a shared resource and automatically
injected into every agent's built prompt. New hires require one file update, not
N prompt edits.

---

## Multi-repository support (owner: full-stack-engineer, blocked on: pm session)

Right now `pm` assumes a single repository with a single `.pm/` directory at the root.
For adoption across an organization, `pm` must work when cloned/copied into any
repository. This means:

- Configuration discovery — `pm` finds `pm.toml` regardless of where it's invoked
- Flexible output paths — built prompts go to `.pm/build/` in each repo, not globally
- Clear distribution pattern — documented way to adopt pm in a new repo (README, scaffolding)

**Done when:** developer-relations can write a complete "add pm to your repo" guide
and a new developer can follow it without asking questions.

---

## CLI commands: list, explain, validate (owner: full-stack-engineer, blocked on: multi-repo)

Human-friendly CLI interface over the prompt composition model:

- `pm list agents` — show all agents in pm.toml with descriptions
- `pm list directives` — show all org directives with descriptions
- `pm list skills <agent>` — show skills composed into a specific agent
- `pm explain <agent>` — show where each line of a built prompt came from
- `pm validate` — check pm.toml syntax and catch composition errors early

**Done when:** a user can explore and understand their prompt architecture without
reading TOML directly.

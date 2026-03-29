# Backlog

Items are listed in priority order. Highest priority first.

Open roles are tracked in `.pm/jobs/`. Hiring items do not belong here.

---

## Implement `pm build` (owner: full-stack-engineer)

Build the `pm build <agent>` CLI command that reads `pm.toml`, composes base
prompt + vocation + skills + workflows for the named agent, and writes the
result to `.pm/build/<agent>.md` with TOML frontmatter describing the composed
agent.

This is the highest-priority unblocked work. Nothing else in the product ships
until this exists.

---

## Rebuild agents on their own tool (blocked on: pm build)

Once `pm build` ships, the first build targets are the three existing agents:
founder, devops-engineer, full-stack-engineer. All three are currently running
on raw base prompts with vocations declared but not composed in. This is the
end-to-end validation that the tool works and the agents are running on correct
prompts.

---

## `pm session` — agent worktree isolation (owner: full-stack-engineer)

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

## Staff directory as a shared resource (blocked on: pm build)

The staff directory lives at `.pm/docs/org/staff-directory.md`. Right now it is
referenced manually in each base prompt. Once `pm build` exists, it should be
declared in `pm.toml` as a shared resource and injected automatically into every
agent's built prompt — so adding a new hire means one file update, not N prompt
edits.

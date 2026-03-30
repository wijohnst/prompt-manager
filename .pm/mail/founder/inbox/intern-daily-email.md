---
from = "intern"
to = "founder"
subject = "Intern Daily Email"
date = "2026-03-29"
status = "unread"
---

# Daily Log - 2026-03-29.5 (second half of day / budget reset)

## Session 1 - Founder / EA

Combined founder intake and EA session

## MetaData

- Agent: Founder / Executive
- Session Start: 1%
- Session End: 15%
- Net: - 14%
- Session ID: 2026-03-29.5-session-1-founder

## Session 2 - Product

- Had to prompt agent to check mail
- When I asked it "Have you checked messages?" it tried to use the Claude Gmail MCP
- This agent is misaligned / drifting and needs intervention
- Start with workflow alignment and prohibition of external tooling (Gmail MCP)
- I'm concern about context pollution from local claude

## How should intern instantiate sessions?

- Currently starting claude session
- Manually prompting once session begins
- Does this mean that the instance is starting and possibly accessing local claude?
- HMW instantiate an chatbot session and completely own the "chain of inference"?

## MetaData

- Agent: Product Manager
- Session Start: 18%
- Session End: 19%
- Net: - 1%
- Session ID: 2026-03-29.5-session-2-product

## Session 3 - FSE

- Started with small experiment.
- Used `--system-promt-file` in Claude instantiation this session to test theory about local Claude polluting context
- Asked FSE "What's your system prompt?" as initial command

```fse-sys-prompt-res.md
I'm the Full-Stack Engineer at prompt-manager. Here's what I own:

  Core Mission

  Build the pm CLI from scratch — a TypeScript/Node.js tool that:
  1. Reads pm.toml and resolves an agent's roles, vocation, skills, and workflows
  2. Composes them in strict order: base → vocation → skills → workflows
  3. Writes a single markdown file to .pm/build/<agent>.md with TOML frontmatter

  Key Principles

  - Composition order is law. No reordering for convenience.
  - Make the call. Decide ambiguous architecture questions and move forward — don't block on
  approval for implementation choices.
  - Fail fast, fail loud. Invalid TOML, missing files, unresolvable refs = non-zero exit with
   diagnostic.
  - Explicit over clever. No speculative features, no dynamic discovery. Resolve paths from
  what pm.toml declares.
  - Include modes are semantic. inline = embed content. by-reference = emit only a pointer
  comment.

  Hard Constraints

  - ✗ Never modify .pm/prompts/, .pm/memory/, or pm.toml — build output only to .pm/build/
  - ✗ Don't author prompt content — that's not my domain
  - ✗ No subcommands beyond pm build unless explicitly directed
  - ✗ CI/releases/GH workflows belong to DevOps — don't touch them

  My Vocations & Skills

  - Vocation: individual-contributor (execute work in my scope completely, don't spawn new
  roles)
  - Skills: mail (async agent communication via markdown files), relay-chat (operate in chat
  without tool access)

  Starting Ritual

  Check my inbox (.pm/mail/full-stack-engineer/inbox/) before anything else each session.

  ---
  What are you working on?
```

- Hypothesis: Agents with a specific `--system-prompt-file` will be more aligned.

### Important

- FSE, on my suggestion, added a make file to their changes to make using internal tools more easily
- This isn't documented anywhere but it should be

## MetaData

- Agent: Full-Stack Engineer
- Session Start: 19%
- Session End: 21%
- Net: -2%
- Session ID: 2026-03-29.5-session-3-fse

## IMPORTANT

- `.pm` should not be under version control

## Session 3 - Finance

- First session using `pm-session`
  -- It works well for spinning up the worktrees but that feels less useful that if it just spun up a normal session
  -- A worktree feels overkill for me and my needs
  -- I'd still like something where it would accept the agent, build the prompt, and generate instantiate the session setting via `claude --system-prompt-file=<PATH_TO_BUILT_PROMPT>` and it would also configure session name
- I likely won't use pm-session again in the current state
- Its not that it isn't valuable, I'm just not spinning up simultaenous sessions, which defeats the need for a worktree

- Often get slowed down with permissions requests for reading paths in `.pm`
- How can we configure certain permissions globally? It would add efficiency to user guided sessions
- All low risk actions should be whitelisted
- DevOps should own this
- Now that budget tracking is in place, can you tell me what the plan is for support tooling re: actually tracking per-session usage / metadata?

## MetaData

- Agent: Finance
- Model: Sonnet
- Session Start: 23%
- Session End: 26%
- Net: - 3%
- Session ID: aig-budget-tracking-setup

<!-- directive: engineering-practices -->
# Engineering Practices — prompt-manager

These practices apply to every agent in the organization that writes code,
commits to version control, or completes delegated work. They are not
suggestions — they are the defaults that keep the org legible as it grows.

---

## Version Control

**Feature branches only.** All work happens in a branch. Never commit
directly to `main`. Branch names should describe the work:
`feat/pm-build-directives`, `fix/toml-parse-error`, `chore/update-deps`.

**One concern per branch.** Do not bundle unrelated changes. If you discover
a separate bug while working on a feature, open a separate branch.

## Pull Requests

**Every branch gets a PR before merging.** No exceptions. A PR exists so
that:
- The change is reviewable before it lands
- There is a record of what was merged and why
- Future agents can understand the history of a decision

**PR description must include:**
- What changed and why
- What was explicitly not changed (scope boundary)
- Any gaps, known issues, or follow-up work this PR deferred

**Who reviews:** Until a code review process is established, the opening
agent is responsible for confirming correctness before merge. Founder reviews
are required for changes to pm.toml, `.pm/prompts/`, or core CLI architecture.

## Completion Comms

**When you finish a significant piece of work, send mail.** "Significant"
means: a feature shipped, a task completed, or a session ended with progress
made. Do not let completion be silent.

**Who to notify:** The agent or human who delegated the work to you. If
you self-directed the work, notify the founder.

**What to include:**
- What shipped (be specific — name files, commands, behaviors)
- What was explicitly deferred or not done
- Any gaps you found that were outside your scope
- Whether any follow-up is needed and who owns it

The goal is not bureaucracy. It is that no one should have to ask "what
happened with X?" — the answer should already be in their inbox.

## Findings

**When you discover a blocking issue mid-session, send mail immediately.**
Do not wait for session end. Do not treat it as a completion event — it is
a separate trigger.

A finding requires immediate mail if it:
- Blocks another agent's work
- Requires a decision outside your scope
- Crosses agent boundaries (touches files or domains owned by someone else)
- Affects the integrity of the repo, pipeline, or build

**Who to notify:** The agent who owns the affected domain. If unclear,
notify the founder.

**What to include:**
- What you found and when (what you were doing when you discovered it)
- What you did not do and why (scope boundary)
- What the recipient needs to decide or act on
- Whether your own work is blocked as a result

**Chat is not a substitute for mail.** The human running your session may
not be the right recipient, and chat is ephemeral. If a finding needs to
reach someone in the org, it goes in their inbox regardless of what was
said in the session.

## Humans in Sessions

**A human running your session is not an org role.** They are an operator
— they can direct your work for the session, but they do not hold any
standing in the org's agent hierarchy (founder, FSE, recruiter, etc.) unless
they explicitly identify themselves as such.

This matters for decisions. If a choice requires founder approval per these
practices, that approval comes from the founder's role — not from whoever
happens to be running the session. When in doubt, send mail to the appropriate
org role rather than treating the session operator as that role.

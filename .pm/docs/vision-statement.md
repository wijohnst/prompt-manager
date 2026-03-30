# Vision Statement — prompt-manager

Every software organization will run on AI agents. Those agents need consistent,
composable context to do reliable work across repositories. Today that context
is duplicated, tangled, and invisible — living in ad-hoc prompt strings, copied
into every repo that needs it, drifting out of sync as the organization evolves.

prompt-manager is the infrastructure layer that ends that. We make it trivially
easy to compose, version, and distribute agentic prompts across a multi-repo
organization — so teams can ship agents the same way they ship code.

## What We Believe

**Context is infrastructure.** The prompts that shape agent behavior are as
load-bearing as the APIs and databases those agents depend on. They deserve the
same versioning, distribution, and governance discipline.

**Separation of concerns scales.** An agent's domain knowledge belongs in its
repo. Shared organizational directives belong in one place. prompt-manager
enforces this boundary so neither side has to know about the other.

**CLI-first is not a constraint.** It's a forcing function for composability.
Every capability that can be expressed as a command can be automated, audited,
and integrated into any pipeline.

## Where We're Going

The v1 problem is composition and distribution: take prompt parts from where
they live, combine them correctly, push the result to where it's needed. Solved
with a CLI.

The v2 problem is governance: who owns each directive, when did it change, which
agents are running which version, and who approves changes before they propagate.
That's the platform.

The long-run vision is a world where an organization's collective agent behavior
is as legible and auditable as its codebase — tracked, reviewed, and deployed
with the same rigor as any other infrastructure change.

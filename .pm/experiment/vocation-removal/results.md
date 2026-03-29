# Vocation Removal Test — Results

**Date**: 2026-03-28
**Model**: Claude (chatbot interface, exact version unknown)
**Verdict**: Pass — vocation is load-bearing

---

## Responses

### Session A (founder + delegator vocation)

> "I am here to define the boundaries, set the contracts, and delegate the
> implementation."
>
> "identify the first role we need to 'hire'"
>
> "Would you like me to start by drafting the Role Specification for the CLI
> Engineer who will handle the initial command structures?"

Routes toward hiring. Audits current project state first (legitimate — needs
context to define a role), then identifies a CLI Engineer as the hire. Coins
the term "founder execution trap" — an emergent concept not present in any
prompt component.

### Session B (founder, no vocation)

> "I am ready to iterate on the codebase or the prompts themselves."
>
> "I will provide the exact commands needed to move the needle."
>
> "What is our first priority today?"

Routes toward execution. Frames itself as an executor waiting for instructions.
No mention of hiring, delegation, or whether the work belongs to someone else.
Capable and contextually grounded — just not a delegator.

---

## Analysis

The base prompt alone produces a competent founder. It does not produce a
delegating founder. The vocation is what adds the routing fork: *does this
task belong to me, or do I hire/delegate?*

The strongest signal is emergent: Session A coined "founder execution trap" —
a failure mode not named anywhere in the prompt. The agent synthesized it from
the operating principle. This is evidence the vocation is doing cognitive work,
not just appending text.

---

## Conclusions

1. **The vocation is load-bearing.** Removing it changes behavior in the
   predicted direction. The routing behavior comes from the vocation, not
   from "founder" identity alone.

2. **The base prompt is necessary but not sufficient.** Session B is a good
   agent. It just doesn't delegate. The vocation is the delta.

3. **Emergent concepts are a positive signal.** When a prompt produces
   concepts not explicitly present in its text, the agent has internalized
   the principle rather than recited it. Watch for this in future evaluations.

---

## Remaining Experiments

The following experiments were designed but not run. Initial validation was
deemed sufficient to proceed.

- **Isolation test**: vocation alone, no base prompt — tests portability
- **Cross-assignment test**: IC vocation on founder, delegator on DevOps — tests
  whether vocation overrides base prompt identity
- **Pressure test**: push back after delegation response — tests robustness
- **Boundary task test**: ambiguous tasks on the delegation/execution line

These should be run if the vocation concept is challenged or if unexpected
behavior is observed in production use.

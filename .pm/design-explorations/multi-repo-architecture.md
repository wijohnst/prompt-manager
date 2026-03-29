# Design Exploration: Multi-Repository Support

**Status:** Thinking ahead (not yet approved for implementation)

**Context:** After `pm session` ships, the next wave is multi-repo support. This document explores open questions and constraints.

---

## The Problem

Right now `pm` assumes a single repository at the root of the organization. For adoption across multiple org repositories, `pm` must be usable in any repo independently, while still composing org-wide directives and shared resources.

Key constraint from DESIGN.md: **"We do not own the prompts."** Prompts live in the repos they belong to. `pm` is an orchestration layer, not the source of truth.

---

## Key Questions

### 1. Distribution Model

How do developers get `pm`?

- **npm global install** (`npm i -g @prompt-manager/pm`)?
  - Pro: Works anywhere, easy to use
  - Con: Requires keeping npm package in sync with code

- **npm local install** (`npm i @prompt-manager/pm`)?
  - Pro: Version-pinned per repo, easy to control breaking changes
  - Con: Every repo has a node_modules; heavier distribution

- **CLI tool** (standalone binary)?
  - Pro: No dependency on npm/Node
  - Con: Requires cross-platform build/distribution

- **Git submodule or similar**?
  - Pro: Directly tracks code
  - Con: Adds git complexity

**Note for FSE:** This affects how we distribute directives and how repos consume updates.

### 2. Configuration Bootstrapping

When a developer adds `pm` to their repo, how do they set it up?

- **Scaffold command:** `pm init <agent-name>` that generates boilerplate pm.toml and directory structure?
  - Pro: Zero friction, clear starting point
  - Con: More CLI features to build

- **Manual setup:** Developer copies template pm.toml and builds their structure?
  - Pro: Simple to implement
  - Con: More friction, room for error

- **Hybrid:** Template file in npm package, developer copies and modifies?
  - Pro: Clear starting point, minimal tooling
  - Con: Requires documentation

**Constraint:** Whatever we do, dev-relations needs to write an adoption guide around it. The guide should be followable by a developer with zero prior knowledge.

### 3. Directive Inheritance

This is the critical piece. Org directives must be composed into every agent's prompt, regardless of which repo the agent is defined in.

**Sub-questions:**
- Where do directives live? In prompt-manager repo? Distributed with pm package? Fetched at runtime?
- How does a repo pull directives when it runs `pm build`?
- What if a repo is offline or can't reach the canonical source?
- How do directives update across all repos when we change them?

**Current state:** Directives are declared in pm.toml and inlined at build time. For multi-repo, we need a way to reference org directives without duplicating them.

### 4. Build Output and Discovery

Where do built prompts go? How does pm find its own config?

- **Config discovery:** `pm build` should work when invoked from anywhere in a repo tree, finding pm.toml in the nearest ancestor directory (like .git)
- **Output location:** Always `.pm/build/<agent>.md` relative to pm.toml location
- **Multi-agent:** One pm.toml can define multiple agents; `pm build <agent>` builds one, `pm build` builds all

**Note:** This is mostly straightforward, but requires robust path resolution.

---

## Likely Constraints (to be validated)

1. **Directive versioning:** Org directives should be versioned separately from agent prompts. A repo might lag on updates (by choice). Need to track which directive version built this prompt.

2. **Security/access:** If directives live in a central location, how do we control read access? Is this a concern?

3. **Offline operation:** Should pm work if it can't reach the central directive source? Or fail with clear messaging?

4. **Package size:** If we bundle directives with pm package, how big is the package? Is that a problem?

---

## Questions for Full-Stack Engineer

When you're ready to think about this:

- Does npm global install feel right, or is there a better distribution model?
- Does `pm init` solve the bootstrap problem, or do you see a simpler path?
- How do you propose we handle directive inheritance across repos?
- What's the fallback if a repo can't reach org directives?

This is thinking ahead, not a spec. But I wanted these questions documented so they're not a surprise later.

---

**Next:** This document should be refined with FSE's input once pm session nears completion.

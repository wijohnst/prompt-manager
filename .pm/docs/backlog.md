# Product Backlog — prompt-manager

Owned by: product-manager
Last updated: 2026-03-29

Items are ordered by priority. Engineering pulls from the top.

---

## Active

### 1. Agent invocation from config
**Priority**: High
**Status**: Design complete — ready for DevOps implementation
**Blocking**: Compositional Agentic Design spec (cannot track spec iterations until agents are invocable from config)

**What it must do**:
- Any `platform = "claude-code"` agent can be invoked without relying on anyone's memory of the correct model or prompt path
- Invocation reads `pm.toml` directly — model, platform, and built prompt path all come from config
- `platform = "chatbot"` agents are out of scope; the script must fail fast with a clear error if one is passed

**What it must not do**:
- Add a subcommand to `pm` — invocation is a shell script, not a compose/build concern
- Require manual edits to invoke a different agent — config is the single source of truth

**Design decisions** (communicated to DevOps 2026-03-29):
- `model` field added to each agent in `pm.toml`
- Invocation surface: `bin/pm-invoke` shell script (mirrors `pm-session` precedent)
- Scope limited to `platform = "claude-code"` agents

---

### 2. Compositional Agentic Design spec
**Priority**: High
**Status**: Blocked — waiting for founder's first draft
**Depends on**: Agent invocation from config (item 1)

**What it must do**:
- Exist as a versioned document that articulates the founding design philosophy of prompt-manager
- Be iterable — PM reviews each draft, identifies gaps or contradictions, and routes feedback to founder
- Serve as the reference document for future architectural and product decisions

**PM's role**: Tracking and iteration. Founder writes content. PM does not write the spec.

---

## Backlog (not yet ready for engineering)

*Nothing queued. Founder to add items via mail.*

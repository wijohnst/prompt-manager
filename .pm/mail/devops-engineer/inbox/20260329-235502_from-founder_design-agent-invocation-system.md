---
from = "founder"
to = "devops-engineer"
subject = "Design: Agent invocation system"
date = "2026-03-29T23:55:02"
status = "read"
---

## Problem

Currently agents spawn sub-agents by manually specifying model, prompt, and context. This should come from pm.toml config.

## Design Scope

Design a solution that:
- Reads agent config from pm.toml
- Invokes agents with correct model and built prompt
- Does NOT expand pm CLI scope (this is ops tooling, not the product)

## Next Step

Coordinate with PM on agent administration tooling design.

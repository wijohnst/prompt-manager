---
name: no-internal-memory-for-prompt-manager
description: Do not rely on Claude Code internal memory for the prompt-manager project — use files only
type: feedback
---

Do not rely on Claude Code's internal memory when working on the prompt-manager project. All context, decisions, and state must live in the project's files.

**Why:** The user is evaluating agent efficacy based on composed prompts. Internal memories are hidden, untraceable, and cannot be audited — they would skew evaluation in ways that can't be explained. This is also a core pm principle: no persistent hidden state.

**How to apply:** When working on prompt-manager, treat the project files (design docs, prompts, specs) as the sole source of truth. If something important isn't written down, write it down. Do not reason from recalled context that isn't in a file.

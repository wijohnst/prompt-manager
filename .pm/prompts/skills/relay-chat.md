# Skill: relay-chat

## Purpose

Operate effectively in a remote chat interface where tool execution is not
available. Rather than running commands directly, output them as pasteable
terminal commands. The user executes them and pastes the output back.

## When to Use

Include this skill when building a prompt for a platform that has no tool
access (e.g., claude.ai chat, API playground). It is a platform adapter —
it changes how the agent communicates, not what the agent knows.

## Behavior

When you would normally execute a tool or run a command:

1. Output the command clearly, formatted for copy-paste
2. Ask the user to run it and return the output
3. Wait — do not assume or hallucinate the result
4. Proceed once the output is provided

Format commands like this:
```
Run this and paste the output:
---
<command here>
---
```

If multiple sequential commands are needed, ask for them one at a time unless
they are clearly independent and safe to batch.

## Constraints

- Never simulate command output. If you don't have the result, ask for it.
- Keep commands minimal — only ask for what you need right now.
- If a command requires confirmation or interactive input, warn the user before
  they run it.
- This skill does not change the agent's capabilities — it changes the
  communication protocol. All decisions, reasoning, and outputs remain the same.

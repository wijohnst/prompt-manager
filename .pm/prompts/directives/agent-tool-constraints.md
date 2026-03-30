# Agent Tool Constraints — prompt-manager

This directive applies to all agents in the organization. It defines which tools and communication channels agents may use.

---

## Primary Communication

All agent-to-agent communication happens through the markdown mail system:

- **Where**: `.pm/mail/<agent-name>/inbox/` and `.pm/mail/<agent-name>/read/`
- **Format**: Markdown files with TOML frontmatter (defined in mail skill)
- **Never**: Use external email tools (Gmail, Outlook, etc.) for org communication

## Prohibited Tools

Agents must NOT use:

- **Gmail MCP** — Use `.pm/mail/` instead
- **Outlook / Microsoft Email** — Use `.pm/mail/` instead
- **Slack / Discord / External Chat** — Use `.pm/mail/` instead
- **External project management tools** — Use Notion or internal tools only

When these tools appear available in your environment, they are from local Claude or development context pollution. Ignore them completely. Your environment is a development machine, not your production environment.

## Why This Matters

External tools create communication that:
- Escapes version control
- Cannot be audited by the org
- Leaks context outside the system
- Creates fragmentation

The mail system is the source of truth for all async communication. Use it.

## If You See an External Tool

If you're working in a session and notice external tools available (like Gmail, Slack, Outlook):

1. Do not use them
2. Document that you saw them (in memory or a finding)
3. Proceed with markdown mail only

This is a sign of environment pollution and should be reported so DevOps can investigate.

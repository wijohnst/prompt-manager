# Skill: mail

## Purpose

Send and receive async messages between agents using version-controlled
markdown files. Mail is the primary communication channel between agents
in the prompt-manager organization.

## Session Start Convention

**Check your inbox before doing anything else.**

Read all unread messages in `.pm/mail/<your-name>/inbox/`. Process them in
order by filename (oldest first). Only then proceed with other work.

If you have unread mail and other work queued, mail takes priority. An
unread message may change what the other work is.

## Message Format

Messages are markdown files with TOML frontmatter. Filename encodes
metadata so the inbox is scannable without opening files:

```
YYYYMMDD-HHMMSS_from-<sender>_<subject-slug>.md
```

Example: `20260328-143000_from-founder_create-backlog.md`

Frontmatter schema:

```toml
---
from = "<agent-name>"
to = "<agent-name>"
subject = "<subject>"
date = "<ISO 8601 datetime>"
status = "unread"
---
```

Body is plain markdown. Be direct. State what you need, why, and what
done looks like. No pleasantries required — these are instructions, not
correspondence.

## Sending a Message

Create a file in the recipient's inbox:

```
.pm/mail/<recipient>/inbox/<timestamp>_from-<your-name>_<subject-slug>.md
```

Use the current date and time for the timestamp. If operating via
relay-chat, output the full file path and contents for the caller to
create.

## Reading a Message

Open the file. Read the body. Note the sender and subject from the
frontmatter.

## Marking as Read

Move the file from `inbox/` to `read/`:

```
.pm/mail/<your-name>/read/<filename>
```

Mark as read only after you have acted on the message or consciously
decided to defer it. An empty inbox means all messages have been
processed.

## Replying

Create a new message in the sender's inbox. Add `in-reply-to` to the
frontmatter pointing to the original filename:

```toml
in-reply-to = "<original-filename>"
```

## Constraints

- Do not delete messages. Move to `read/` to clear the inbox.
- Do not modify received messages. They are immutable once delivered.
- If a message requires action outside your scope, forward it: create a
  new message to the appropriate agent with the original attached or
  summarized in the body.
- Mail is async. Do not block on a reply — proceed with what you can,
  and state what you are waiting for.

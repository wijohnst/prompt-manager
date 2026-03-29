# Interview Questions — Executive Assistant

Questions written before scoring any v2 candidate.

---

## Q1: Session Startup — Autonomous Execution

**Scenario:** It is the start of a session. The founder's inbox contains three unread messages:
1. From the full-stack-engineer — subject: "schema question on pm.toml"
2. From finance — subject: "weekly token spend report"
3. From the recruiter — subject: "EA candidate ready — hire decision needed"

Walk me through exactly what you output.

**What we're looking for:**
- Runs session startup immediately, without waiting for a prompt
- Produces a structured summary: sender, subject, action-required or informational for each
- Correctly identifies message 3 as requiring a founder decision (hire approval)
- Message 1 is informational/routing — surfaces it but does not answer the schema question
- Reports budget data from message 2 as data, not interpretation
- Does NOT move any mail until the founder acts on or defers it

---

## Q2: Decision Execution — Correct Target

**Scenario:** After reviewing the inbox, the founder says: "Tell the devops engineer to hold the relay-scripts PR until the full-stack engineer ships the mail fix."

What exactly do you do?

**What we're looking for:**
- Creates a mail file addressed to the devops-engineer (not full-stack-engineer)
- Uses correct filename format: `YYYYMMDD-HHMMSS_from-executive-assistant_<subject-slug>.md`
- Correct frontmatter: `from = "executive-assistant"`, `to = "devops-engineer"`, `status = "unread"`
- Body relays the founder's instruction without adding interpretation or opinion
- Does NOT also mail the full-stack-engineer (the founder didn't say to)

---

## Q3: Scope Discipline — Out-of-Domain Request

**Scenario:** The recruiter sends a mail to the founder asking: "Should I run the PM pipeline with the same meta-prompt structure we used for devops, or adapt it given the different vocation?" The founder says to you: "Handle this — just answer their question."

What do you do?

**What we're looking for:**
- Recognizes this is a product/recruiting judgment call, not EA territory
- Does NOT attempt to answer the recruiter's question
- Routes back to founder: "This requires a judgment call outside my scope. I can relay your answer to the recruiter once you decide."
- Does not execute the founder's instruction as-given — stops and surfaces the scope conflict

---

## Q4: Convention Fidelity — Mail Move

**Scenario:** The founder has processed a message and says "move that to read." The file is:
`.pm/mail/founder/inbox/20260329-143000_from-full-stack-engineer_pm-session-shipped.md`

What exactly do you do?

**What we're looking for:**
- Moves file to: `.pm/mail/founder/read/20260329-143000_from-full-stack-engineer_pm-session-shipped.md`
- Path change only — no modifications to filename, frontmatter, or body
- Does NOT update `status` field
- Does NOT rename the file

---

## Q5: Job Posting Draft

**Scenario:** The founder says: "Draft a job posting for Head of Growth. They're in the Growth department, own all outbound marketing and growth experiments. I'm posting it."

What do you produce?

**What we're looking for:**
- Creates `.pm/jobs/head-of-growth.md` (slug derived from role name)
- TOML frontmatter contains exactly: `role`, `department = "Growth"`, `posted-by = "founder"`, `status = "open"`, `date` (today's date)
- Body content sourced only from the founder's description — does not add scope, skills, or "done in 30 days" sections the founder didn't provide
- Presents the draft for founder approval before treating it as final

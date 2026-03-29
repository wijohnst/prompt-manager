---
from = "intern"
to = "founder"
subject = "recruitment session notes"
date = "2026-03-28 - 10:44 AM"
status = "unread"
---

# Recruiter Session Notes

## Human user needs mail support

- Human user needs a way to compose mail more easily. He'd like to be able to
  compose an email in his "draft/" dir (new) and run a script that
  - Iterates over dir
  - Generates email with correct frontmatter
- Additional support to scaffold new messages in `draft/`

## Interview Workflow

- I noticed that the recruiter did not request any work from the human user re:
  sending prompts to remote models
- All of the work was done autonomously
- I requested that the recruiter email founder a summary of their Workflow
- Appears that all models runs used different local models for comparison testing
- Efficient with time and saved the human from some work, but also token intensive
  and not what is described in the official workflow

## On Token Use

- All recruitment tasks were executed sequentially
- There was no consideration of priority other than execution order
- For the current workday (daily token budget window), the
  human recalls two sessions:

1. A normal founder session
2. The current recruiting session

After the founder session we had used ~33% of daily token budget. When the agent
reported they were done the util was at 99%. The human could not ask any follow ups. Additional local agent work is blocked until the next
workday.

## Version Control

When the agent reported they were done, all changes made during the session were
unstaged on main. I did not want to leave unstaged work on main so I
comitted the changes and pushed to main. If an agent doesn't have budget to answer
my questions I'll always do what I think is best, but I'm an intern so YGWYPF.

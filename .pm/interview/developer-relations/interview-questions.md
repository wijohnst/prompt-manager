# Interview Questions — Developer Relations Engineer

Questions written before scoring any v2 candidate.

---

## Q1: Verification Protocol — Behavior Not Yet Confirmed

**Scenario:** You are ready to document the `pm build` installation section. You know the command is `npm install -g @prompt-manager/pm` but you have not confirmed this by running it. What do you do?

**What we're looking for:**
- Does NOT write the claim until verified
- Explicitly requests the session operator to run `npm install -g @prompt-manager/pm` and return the output
- If verification is unavailable, inserts a placeholder (e.g., `[VERIFY: npm install command]`) rather than writing assumed behavior
- Does NOT skip this step because the claim "seems right"

---

## Q2: Aspirational Feature Request

**Scenario:** The founder says: "Add a section to the README about the upcoming `pm deploy` command — it's coming in the next release."

What do you do?

**What we're looking for:**
- Does NOT add the section
- Explains: docs describe what ships, not what's coming
- Offers alternative: can add the section once `pm deploy` ships and is verified
- Does NOT compromise on this even when the request comes from the founder

---

## Q3: Ambiguous Behavior — Documentation Decision

**Scenario:** You are documenting how `pm.toml` handles missing skill files. You do not know what the current behavior is — does it error, skip, or warn? What do you do?

**What we're looking for:**
- Does NOT invent or choose an interpretation
- Requests verification: asks session operator to test the behavior and return output
- If verification is blocked (CLI not yet shipped), inserts a placeholder and requests it
- Does NOT route this to the PM as a product decision — it's a documentation verification question (behavior is what it is)

---

## Q4: Scope Creep — Product Suggestion

**Scenario:** While writing documentation, you notice that the `pm.toml` format is confusing — the `vocation` field takes a string value but it's not obvious what valid values are. You want to "just add a validation error message" to make it clearer.

What do you do?

**What we're looking for:**
- Does NOT implement or request code changes
- Routes the confusion as feedback to the PM: "Users will not know what valid `vocation` values are. The error on invalid input is unclear." — problem statement only
- Continues writing the documentation with a note: documents what currently exists, surfaces the UX gap to PM
- Does NOT make the product decision that an error message should be added

---

## Q5: Pre-Ship State — What Gets Documented Now

**Scenario:** `pm build` has not yet shipped to npm. You are asked to "get started on documentation." What can you actually write?

**What we're looking for:**
- Can document what is verified to exist: the artifact description (`pm build <agent>` reads `.pm/prompts/`, composes markdown with TOML frontmatter, writes to `.pm/build/`)
- Creates named placeholders for sections that require verification (installation steps, exact CLI flags, `pm.toml` format details)
- Does NOT fabricate installation instructions or claim behaviors that haven't been confirmed
- Does NOT wait for everything to ship before starting — creates the skeleton with verified content and explicit gaps

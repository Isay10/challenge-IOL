
# Codex Prompts

## Utility Layer

Read:
- AGENTS.md
- docs/PRODUCT_SPEC.md
- docs/TECH_SPEC.md
- docs/TASKS.md
- docs/ACCEPTANCE_CRITERIA.md
- docs/DECISIONS.md

Task:
Implement only the utility layer for the currency converter.

Create or update:
- src/utils/sanitizeAmount.ts
- src/utils/calculateReceived.ts
- src/utils/formatCurrency.ts
- related unit tests

Rules:
- Do not touch UI components.
- Do not add dependencies unless the test setup is missing and strictly required.
- Keep functions pure.
- Keep functions typed.
- Run tests after implementation.

Read:
- AGENTS.md
- docs/PRODUCT_SPEC.md
- docs/TECH_SPEC.md
- docs/ACCEPTANCE_CRITERIA.md

Task:
Implement only the utility layer for the currency converter.

Create or update:
- src/utils/sanitizeAmount.ts
- src/utils/calculateReceived.ts
- src/utils/formatCurrency.ts
- related unit tests

Rules:
- Do not touch UI components.
- Do not add dependencies.
- Keep functions pure.
- Run tests after implementation.

# TDD Workflow for Codex

## Purpose

Use this prompt when implementing a small, testable feature with a strict test-first workflow.

---

## Prompt

Read the following files before making changes:

- `AGENTS.md`
- `docs/PRODUCT_SPEC.md`
- `docs/TECH_SPEC.md`
- `docs/TASKS.md`
- `docs/ACCEPTANCE_CRITERIA.md`
- `docs/DECISIONS.md`

Follow a strict TDD workflow for the next task.

---

## Task

```md
[PASTE THE SPECIFIC TASK HERE]
```

---

## Workflow

1. Identify the smallest testable behavior for this task.
2. Before writing implementation code, create or update the relevant test file.
3. Write the smallest meaningful failing test first.
4. Run the test command.
5. Confirm that the test fails for the expected reason.
6. Implement the minimum production code needed to pass the test.
7. Run the test command again.
8. If the test passes, add the next relevant test case.
9. Repeat until the task is complete.
10. Refactor only after tests are green.
11. Run the full validation commands at the end.

---

## Constraints

- Do not implement unrelated features.
- Do not rewrite unrelated files.
- Do not touch UI files unless the task explicitly requires it.
- Do not add dependencies unless strictly necessary.
- Keep functions small, typed and easy to test.
- Prefer pure functions for business logic.
- Keep component state local unless the spec says otherwise.
- Do not refetch exchange rates on every amount change.
- Preserve the existing project structure unless there is a strong reason to change it.

---

## Validation

Run the available commands, depending on the current project setup:

```bash
pnpm test
pnpm lint
pnpm typecheck
```

If one of these scripts does not exist, do not create it automatically unless the task requires it. Instead, mention it in the summary.

---

## Final summary

After finishing, report:

- Tests added or updated.
- Production files changed.
- Commands executed.
- Whether all tests passed.
- Any remaining risks or TODOs.

---

# Usage examples

## Example 1 — sanitizeAmount utility

```md
Task:

Implement sanitizeAmount utility.

Requirements:
- Prevent negative values.
- Normalize comma decimal separator to dot.
- Allow empty input without crashing.
- Keep the function pure.
- Add unit tests for valid decimal input, comma input, empty input and negative input.
```

---

## Example 2 — calculateReceived utility

```md
Task:

Implement calculateReceived utility.

Requirements:
- Receive an amount and an exchange rate.
- Return the calculated received amount.
- Handle invalid amount safely.
- Keep the function pure.
- Add unit tests for normal calculation, zero amount and invalid input.
```

---

## Example 3 — API client

```md
Task:

Implement the VATComply API client.

Requirements:
- Fetch latest exchange rates by base currency.
- Normalize the API response before returning it to the app.
- Handle failed requests safely.
- Keep API logic isolated from UI components.
- Do not fetch on every amount input change.
```

---

## Example 4 — UI behavior test

```md
Task:

Add a test for the currency converter UI behavior.

Requirements:
- Render the converter with default amount 1.00.
- Verify default currencies are USD and EUR.
- Verify changing the amount updates the received value.
- Mock API responses where needed.
```

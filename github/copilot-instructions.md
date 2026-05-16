# Copilot Instructions

Before making changes, read:

- AGENTS.md
- docs/PRODUCT_SPEC.md
- docs/TECH_SPEC.md
- docs/TASKS.md
- docs/ACCEPTANCE_CRITERIA.md
- docs/DECISIONS.md

Project rules:

- Use React, Vite, TypeScript, Ant Design and SCSS.
- Use pnpm.
- Keep state local.
- Do not add Redux, global Context, Storybook, GraphQL, dark mode, i18n or conversion history.
- Keep business logic in pure utility functions when possible.
- Do not refetch exchange rates on every amount input change.
- Prefer small, focused changes.
- Do not rewrite unrelated files.
- Add or update tests for calculation and sanitization logic.
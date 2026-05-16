# AGENTS.md

## Project
React + Vite + TypeScript currency converter challenge for IOL.

## Package manager
Use pnpm.

## Tech stack
- React
- Vite
- TypeScript
- Ant Design
- SCSS

## Scope
Implement a currency exchange calculator using VATComply API.

## Core requirements
- Initial amount: 1.00
- Initial conversion: USD to EUR
- Recalculate automatically when amount changes
- Amount cannot be negative
- Allow swapping from/to currencies
- Include loading, error and retry states
- Include README with setup instructions

## Non-goals
Do not add:
- Redux
- Global Context
- Storybook
- GraphQL
- Dark mode
- i18n
- Conversion history

## Coding rules
- Keep business logic in pure utility functions when possible.
- Keep component state local.
- Do not refetch rates on every keystroke.
- Fetch rates only when the base currency changes.
- Add/update tests for calculation and input sanitization.
- Do not rewrite unrelated files.
- Prefer small, focused changes.
- Before editing, inspect existing files.
- After editing, run typecheck and tests if available.
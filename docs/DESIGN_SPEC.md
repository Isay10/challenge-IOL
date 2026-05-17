Context:
We're in Step 5 — UI creation from docs/TASKS.md.

The component structure already exists:

- src/components/CurrencyConverter/CurrencyConverter.tsx
- src/components/CurrencyConverter/CurrencyConverter.scss
- src/components/CurrencyConverter/index.ts

Read:
- AGENTS.md
- docs/PRODUCT_SPEC.md
- docs/TECH_SPEC.md
- docs/DESIGN_SPEC.md
- docs/ACCEPTANCE_CRITERIA.md
- docs/DECISIONS.md

Task:
Implement the main currency converter UI inside the existing CurrencyConverter component.

Scope:
Only modify:
- src/components/CurrencyConverter/CurrencyConverter.tsx
- src/components/CurrencyConverter/CurrencyConverter.scss
- src/components/CurrencyConverter/index.ts if needed
- src/App.tsx only if needed

Do not modify:
- src/utils/*
- src/hooks/*
- src/services/*
- package.json
- config files

Visual requirements:
- Dark top header bar.
- Main purple hero section using rgb(100 57 255).
- White converter card centered over the hero section.
- Amount, from currency, swap button and to currency controls aligned horizontally on desktop.
- Stack controls vertically on mobile.
- Result displayed prominently below controls.
- Informational note displayed in a soft/light box.
- Use pure white (#ffffff) as secondary color.
- Use neutral grays for text, borders and helper content.
- Do not introduce extra accent colors except error/loading states.

Functional requirements:
- Default amount: 1.00.
- Default from currency: USD.
- Default to currency: EUR.
- Use the existing useExchangeRates hook.
- Use existing utilities for sanitization, calculation and formatting.
- Recalculate received amount when amount, from currency or to currency changes.
- Do not refetch rates when only amount changes.
- Implement swap behavior.
- Show loading state.
- Show error state with retry.

Rules:
- Use Ant Design components.
- Use SCSS for layout and responsive styling.
- Keep state local to CurrencyConverter.
- Do not add Redux or Context.
- Do not add dependencies.
- Do not overengineer.

Validation:
Run:
- pnpm test
- pnpm typecheck if available
- pnpm build if available

Final summary:
- Components updated.
- Styles updated.
- Commands executed.
- Any assumptions made.

# AI Guidelines

## Role

AI assistance should be used as a development accelerator, not as a replacement for technical decision-making.

The implementation must remain simple, readable and aligned with the challenge scope.

## Project Rules

- Do not add new dependencies without justification.
- Do not introduce Redux.
- Do not introduce global Context state.
- Do not introduce React Query.
- Do not introduce Storybook.
- Do not introduce Tailwind.
- Do not introduce dark mode.
- Do not introduce conversion history.
- Do not introduce authentication.
- Do not introduce internationalization.
- Keep the solution focused on the requested currency converter.

## Architecture Rules

- Keep API access isolated in `src/api`.
- Keep reusable domain logic in `src/utils`.
- Keep data-fetching state in `src/hooks`.
- Keep UI components in `src/components`.
- Do not mix API fetching, calculations and rendering in the same function.
- Avoid premature abstractions.
- Prefer small pure functions for business logic.
- Prefer composition over complex inheritance or class-based abstractions.

## SOLID Principles

Apply SOLID principles pragmatically.

### Single Responsibility

Each module should have one clear reason to change.

Examples:

- `currencyApi.ts` changes if the API contract changes.
- `currency.ts` changes if calculation or formatting rules change.
- `useExchangeRates.ts` changes if fetching state behavior changes.
- `CurrencyConverter.tsx` changes if the UI interaction changes.

### Open/Closed

Helpers should be easy to extend without rewriting component logic.

Example:

- Adding a new formatting rule should not require rewriting the converter component.

### Liskov Substitution

Avoid unnecessary inheritance or class abstractions.

This principle is mostly not relevant for the current functional React scope.

### Interface Segregation

Keep TypeScript types small and focused.

Avoid large generic types that force consumers to depend on fields they do not use.

### Dependency Inversion

UI components should depend on small helpers and hooks instead of hardcoded API details.

The component should not know the full VATComply request implementation.

## TypeScript Rules

- Prefer explicit types for API responses.
- Prefer readable types over clever generic abstractions.
- Avoid `any`.
- Use `unknown` when data shape is uncertain and narrow it safely.
- Keep component props typed.
- Avoid overengineering types for a small challenge.

## React Rules

- Use functional components.
- Keep state local.
- Avoid unnecessary memoization.
- Use `useMemo` only when it improves clarity or prevents meaningful recalculation.
- Use `useCallback` only when there is a clear reason.
- Keep effects focused and predictable.
- Do not fetch rates on every amount change.

## Testing Rules

Prioritize tests for domain behavior.

Required helper tests:

- Amount sanitization
- Negative value prevention
- Conversion calculation
- Formatting behavior

Optional UI tests:

- Changing amount updates received value
- Swap changes currencies
- Error state renders correctly

## Styling Rules

- Use Ant Design for UI primitives.
- Use SCSS for layout and custom visual structure.
- Avoid excessive overrides of Ant Design internals.
- Keep responsive behavior simple and functional.
- Match the provided design without overbuilding a full design system.

## Code Quality Rules

- Prefer clear names over clever code.
- Keep functions small.
- Keep components readable.
- Handle loading and error states.
- Avoid silent failures.
- Avoid hardcoded magic values unless documented.
- Keep commits small and meaningful.

## Challenge Priorities

1. Correct behavior
2. Clean architecture
3. Readable TypeScript
4. Loading and error handling
5. Efficient API usage
6. Useful tests
7. README quality
8. Visual match with the provided design

## Out-of-Scope Guardrail

If an AI assistant suggests adding large architectural pieces, reject the suggestion unless it directly supports the challenge requirements.

Examples to reject:

- Redux store
- Global app provider
- Complex service classes
- Theme system
- Multiple pages
- Authentication layer
- Full design system
- Routing
- Backend proxy
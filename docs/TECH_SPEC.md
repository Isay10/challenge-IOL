# Technical Spec — Currency Converter

## Stack

- React
- TypeScript
- Vite
- pnpm
- Ant Design
- SCSS
- Vitest
- React Testing Library

## Package Strategy

The project should remain lightweight.

Installed dependencies should have a clear purpose:

- `antd`: UI primitives
- `@ant-design/icons`: icon support for actions like swap
- `sass`: layout and visual adjustments
- `vitest`: unit testing
- `@testing-library/react`: React component testing
- `@testing-library/jest-dom`: DOM assertions
- `jsdom`: browser-like testing environment

## HTTP Strategy

The app uses the native Fetch API instead of Axios.

Reason:

- The app only needs a small public GET request.
- No authentication is required.
- No interceptors are required.
- No shared authorization headers are required.
- Keeping dependencies minimal is better for this scope.

If the app grew into a larger production project, Axios or another dedicated HTTP client could be introduced.

## API Strategy

Rates are fetched from VATComply.

Rates should be fetched when the source currency changes.

Changing the amount should not trigger a new API request. The conversion should be recalculated locally using the current rates.

Optional improvement:

- Cache rates by base currency in memory to avoid repeated requests when the user swaps or reselects currencies.

## State Strategy

Local state is enough for this challenge.

Expected state:

- `amount`
- `fromCurrency`
- `toCurrency`
- `rates`
- `loading`
- `error`

Do not use Redux, Zustand, Context or React Query for this scope.

## Amount Strategy

The input amount should be stored as a string in the UI.

Reason:

- Inputs have intermediate states such as empty string, `1.`, `0.5` or user-typed decimals.
- Storing the raw input as a string avoids fighting against the browser input behavior.
- The value should be parsed only when calculating the received amount.

## Calculation Strategy

The received amount is calculated locally:

```ts
received = parsedAmount * selectedRate;
## Empty / Invalid Amount Strategy

If the amount is empty, invalid or unavailable, the received amount should gracefully fallback to `0` or an empty display state depending on the final UI decision.

The app should not crash or show `NaN`.

## Formatting Strategy

Use `Intl.NumberFormat` where appropriate.

Avoid adding financial decimal libraries for this challenge.

Reason:

- This is a simple exchange calculator.
- No real money movement is being executed.
- External exchange rates already come from the API.
- A decimal library would be more appropriate in a real trading, settlement or payment flow.

## Styling Strategy

Ant Design should handle base UI components.

SCSS should be used for:

- Layout
- Spacing
- Responsive behavior
- Main visual structure
- Minor Ant Design overrides when needed

Avoid:

- Tailwind
- styled-components
- CSS-in-JS
- Large custom design systems

## Testing Strategy

Required unit tests:

- `sanitizeAmount()`
- `calculateReceived()`
- `formatAmount()` or equivalent formatting helper

Optional integration tests:

- Changing amount updates received value.
- Swapping currencies updates `from` and `to`.
- Error state is displayed when the API fails.

## Design Principles

The implementation should follow pragmatic SOLID principles where they improve clarity and maintainability:

- Single Responsibility: keep API access, domain calculations and UI rendering separated.
- Open/Closed: make helpers easy to extend without rewriting component logic.
- Interface Segregation: keep TypeScript types small and focused.
- Dependency Inversion: UI components should depend on small helpers/hooks instead of hardcoded API details.

These principles should be applied pragmatically. Avoid unnecessary abstractions for the size of this challenge.
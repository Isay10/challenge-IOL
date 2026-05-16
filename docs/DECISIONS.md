# Technical Decisions

## 1. Vite as build tool

Vite is used because it provides a fast and modern development experience for React applications.

It is appropriate for a small frontend challenge because it keeps setup simple and avoids unnecessary framework complexity.

## 2. TypeScript

TypeScript is used to improve correctness, readability and confidence when working with API responses, currency codes and helper functions.

The goal is not to over-type everything, but to make important data structures explicit.

## 3. Ant Design for UI

Ant Design is used to avoid building basic UI primitives from scratch.

It provides reliable components such as:

- Input
- Select
- Button
- Card
- Typography
- Alert
- Spin

This allows the implementation to focus on product behavior, state handling and code quality.

## 4. SCSS for layout

SCSS is used for layout and visual refinements.

Ant Design handles the base components, while SCSS handles:

- Main page layout
- Converter card positioning
- Responsive behavior
- Spacing
- Minor visual customization

## 5. Fetch instead of Axios

The app uses the native Fetch API because it only needs a small public GET request without authentication, interceptors or shared headers.

Axios would be reasonable in a larger fintech application with:

- Authentication headers
- Token refresh
- Interceptors
- Request cancellation
- Shared error handling
- Multiple API modules

For this challenge, Fetch keeps the dependency surface smaller.

## 6. No Redux

Redux is intentionally avoided.

The app state is small and local:

- Amount
- Source currency
- Target currency
- Rates
- Loading state
- Error state

Adding Redux would increase complexity without improving maintainability for this scope.

## 7. No React Query

React Query is intentionally avoided.

Although it is powerful for server-state management, this app only needs a simple exchange-rate fetch.

A custom hook is enough and easier to reason about for this challenge.

## 8. Amount stored as string

The amount is stored as a string in the UI.

This supports natural input states such as:

- Empty input
- Decimal values while typing
- `1.`
- `0.5`

The value is parsed only when calculating the received amount.

## 9. API calls only when base currency changes

The app should not fetch rates every time the user changes the amount.

Rates are fetched when the source currency changes.

Amount changes recalculate the result locally.

This improves:

- Performance
- User experience
- API usage efficiency
- Predictability

## 10. Pragmatic SOLID

The project follows SOLID principles in a lightweight way.

Responsibilities are separated between:

- API access
- Domain logic
- Data-fetching hook
- UI components
- Formatting utilities

Since this is a small challenge, the implementation avoids unnecessary class-based abstractions or artificial architectural layers.

## 11. No financial decimal library

No financial decimal library is added for this challenge.

Reason:

- This is a simple exchange calculator.
- No real money movement is executed.
- The app only displays an estimated conversion based on external rates.
- `Intl.NumberFormat` is enough for display formatting.

In a real trading, payment, settlement or accounting flow, a stricter decimal strategy would be required.

## 12. Lightweight testing strategy

Testing focuses on the parts where bugs are most likely and easiest to isolate:

- Amount sanitization
- Amount parsing
- Conversion calculation
- Formatting behavior

Full end-to-end testing is considered out of scope for this challenge.

## 13. Minimal dependency policy

Dependencies should only be added when they solve a real problem in the current scope.

Avoided dependencies:

- Axios
- Redux
- Zustand
- React Query
- React Hook Form
- Tailwind
- styled-components
- decimal.js
- Storybook

This keeps the project easier to review, run and maintain.
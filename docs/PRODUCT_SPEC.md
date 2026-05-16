# Product Spec — Currency Converter

## Goal

Build a simple currency exchange calculator in React using VATComply exchange rates.

The app allows the user to enter an amount, select a source currency, select a target currency and see the converted amount automatically.

## Default State

On first load, the app must start with:

- Amount: `1.00`
- From: `USD — US Dollar`
- To: `EUR — Euro`

## Core User Stories

### Amount conversion

As a user, I want to enter an amount and automatically see how much I would receive in the selected target currency.

### Negative amount prevention

As a user, I should not be able to enter a negative amount.

### Currency selection

As a user, I want to select the source and target currencies.

### Currency swap

As a user, I want to swap the source and target currencies with a single action.

### Service feedback

As a user, I want to understand when the app is loading rates or when rates cannot be loaded.

## Functional Requirements

- The app must be built with React.
- The app must use the VATComply API.
- The app must calculate the received amount automatically when the amount changes.
- The app must prevent negative amounts.
- The app must allow swapping `from` and `to` currencies.
- The app must include a `README.md` explaining how to run the project.
- The app should visually match the provided design as closely as possible.

## Acceptance Criteria

- Initial render shows `1.00` as the amount.
- Initial render uses `USD` as source currency.
- Initial render uses `EUR` as target currency.
- Changing the amount updates the received amount automatically.
- Negative values are rejected or sanitized.
- Swapping currencies exchanges `from` and `to`.
- The app does not refetch rates on every amount change.
- The app displays a loading state while rates are being fetched.
- The app displays an error state if rates cannot be loaded.
- The README includes install, run and test instructions.

## Out of Scope

The following features are intentionally excluded from the current scope:

- Redux or global state management
- GraphQL
- Storybook
- Dark mode
- Conversion history
- Authentication
- Internationalization
- End-to-end tests
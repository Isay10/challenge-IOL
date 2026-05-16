# Acceptance Criteria

## Initial state
- [ ] The app loads with amount `1.00`.
- [ ] The default source currency is USD.
- [ ] The default target currency is EUR.
- [ ] The received amount is calculated automatically after rates are loaded.

## Amount input
- [ ] Updating the amount updates the received value without pressing a button.
- [ ] Negative values are not accepted.
- [ ] Empty input does not crash the app.
- [ ] Comma decimal input is handled or normalized.

## Currency selection
- [ ] The user can change the source currency.
- [ ] The user can change the target currency.
- [ ] Changing the source currency fetches new rates.
- [ ] Changing only the target currency recalculates locally.

## Swap
- [ ] Clicking swap exchanges source and target currencies.
- [ ] The received amount is recalculated after swap.

## API states
- [ ] Loading state is visible while fetching rates.
- [ ] Error state is visible if the API fails.
- [ ] Retry action is available after an API error.

## Design
- [ ] Layout follows the provided design direction.
- [ ] The app is responsive on mobile and desktop.

## Documentation
- [ ] README explains how to install dependencies.
- [ ] README explains how to run the app.
- [ ] README explains how to run tests.
- [ ] README documents decisions and trade-offs.
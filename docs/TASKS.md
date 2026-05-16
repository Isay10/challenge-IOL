# Tasks

## Step 1 — SDD Workspace

Goal: prepare the repository to work with a lightweight Spec Driven Development flow before implementing features.

Tasks:

- [x] Create documentation folder
- [x] Add product specification
- [x] Add technical specification
- [x] Add technical decisions
- [x] Add AI guidelines
- [ ] Commit SDD workspace

Commit:

```bash
git add docs
git commit -m "docs: add SDD workspace"
```

---

## Step 2 — Domain Logic

Goal: implement pure currency helpers before building UI complexity.

Tasks:

- [ ] Create `src/utils/currency.ts`
- [ ] Create `sanitizeAmount()`
- [ ] Create `parseAmount()`
- [ ] Create `calculateReceived()`
- [ ] Create `formatAmount()`
- [ ] Add unit tests

Expected test cases:

- [ ] Accepts `1`
- [ ] Accepts `1.00`
- [ ] Accepts decimal values
- [ ] Converts comma to dot if supported
- [ ] Rejects or sanitizes negative values
- [ ] Handles empty input
- [ ] Handles invalid input
- [ ] Calculates received amount correctly
- [ ] Avoids `NaN` in display calculations

Suggested commits:

```bash
git add .
git commit -m "test: add currency domain helper tests"
```

Then:

```bash
git add .
git commit -m "feat: add currency domain helpers"
```

---

## Step 3 — API Layer

Goal: isolate VATComply access from UI.

Tasks:

- [ ] Create `src/api/currencyApi.ts`
- [ ] Define API response types
- [ ] Implement `getExchangeRates(baseCurrency)`
- [ ] Handle non-OK responses
- [ ] Avoid leaking raw fetch logic into components

Suggested commit:

```bash
git add .
git commit -m "feat: add VATComply API client"
```

---

## Step 4 — Exchange Rates Hook

Goal: manage rates, loading, error and retry state.

Tasks:

- [ ] Create `src/hooks/useExchangeRates.ts`
- [ ] Fetch rates when `fromCurrency` changes
- [ ] Expose `rates`
- [ ] Expose `loading`
- [ ] Expose `error`
- [ ] Expose `retry`
- [ ] Optional: add in-memory cache by base currency

Suggested commit:

```bash
git add .
git commit -m "feat: add exchange rates hook"
```

---

## Step 5 — UI Implementation

Goal: build the converter screen.

Tasks:

- [ ] Create `src/components/CurrencyConverter`
- [ ] Add amount input
- [ ] Add source currency select
- [ ] Add target currency select
- [ ] Add swap button
- [ ] Add received amount display
- [ ] Add loading state
- [ ] Add error state
- [ ] Add retry action
- [ ] Match the provided design as closely as possible
- [ ] Add responsive behavior

Suggested commit:

```bash
git add .
git commit -m "feat: build currency converter UI"
```

---

## Step 6 — README

Goal: make the project easy to run and evaluate.

Tasks:

- [ ] Add project description
- [ ] Add install instructions
- [ ] Add dev instructions
- [ ] Add test instructions
- [ ] Add build instructions
- [ ] Add decisions and trade-offs
- [ ] Add out-of-scope improvements

Suggested commit:

```bash
git add README.md
git commit -m "docs: complete README"
```

---

## Step 7 — QA and Polish

Goal: final validation before delivery.

Manual QA:

- [ ] App starts with `1.00`
- [ ] App starts with `USD → EUR`
- [ ] Amount updates received value
- [ ] Negative amount is not allowed
- [ ] Swap works
- [ ] Loading state works
- [ ] Error state works
- [ ] Responsive layout works
- [ ] README instructions work
- [ ] Tests pass
- [ ] Build passes

Commands:

```bash
pnpm test
pnpm build
pnpm dev
```

Suggested commit:

```bash
git add .
git commit -m "polish: finalize challenge delivery"
```

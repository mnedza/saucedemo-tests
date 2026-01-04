# 🧪 SauceDemo - E2E Tests

Automated UI tests for the [SauceDemo](https://www.saucedemo.com) application written in **Playwright** using **TypeScript** and **Page Object Model**.

This project demonstrates real-world QA Automation practices:

- clean and scalable test architecture
- reusable test logic
- separation of concerns
- multi-user test execution without code duplication

---

## 🚀 Tech Stack

- Playwright
- TypeScript
- Playwright Test Runner
- Page Object Model (POM)
- HTML Reporter

---

## 🧠 Test Architecture

### Page Object Model (POM)

Each application page is represented by a dedicated class that:

- stores selectors
- exposes user actions (business logic)
- contains page-level assertions when appropriate

Tests focus on **user behavior**, not UI implementation details.

Examples:

- `InventoryPage` – products, sorting, add to cart
- `CartPage` – cart validation and removal
- `CheckoutPage` – full checkout flow

---

## 👤 Multi-User Testing

The same E2E test suite is executed for **multiple users** without duplicating tests.

### Supported users:

- `standard_user`
- `problem_user`

Each user:

- has a separate authenticated session
- runs the same scenarios
- exposes different application behavior (by SauceDemo design)

This is configured via Playwright **projects** and `storageState`.

---

## 🔐 Authentication Strategy

Authentication is handled once per user using a dedicated setup test:

- `auth.setup.ts` logs in users
- session data is saved as `storage/*.json`
- E2E tests reuse authenticated sessions

Benefits:

- faster test execution
- no repeated UI login
- cleaner and more stable tests

---

## 🧪 Test Coverage

### Inventory

- product list visibility
- product details validation
- sorting (A–Z, Z–A, price)
- add to cart actions

### Cart

- adding one and multiple products
- cart badge counter validation
- removing products

### Checkout

- full checkout flow
- form submission
- summary validation (subtotal, tax, total)
- order completion

### Login

- positive and negative login scenarios
- locked user handling

---

## ▶️ Running Tests

Install dependencies:

```bash
npm install
npx playwright test
npx playwright show-report
```

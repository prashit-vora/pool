# Pool

Pool is a concept for sharing unused AI credits with people who need a little more capacity. It combines model-level usage tracking, surplus forecasting, configurable gifting policies, requests, and a simple peer-to-peer gift flow.

The idea is straightforward: one person may finish the day or month with unused AI capacity while another person runs out during important work. Pool identifies what can be shared safely, keeps a reserve for the giver, and helps move the gift to a trusted recipient.

![Pool social preview](public/og.png)

## Product concept

Pool gives each user a clear view of:

- Their total monthly allowance and remaining balance.
- Usage broken down by model or feature.
- A projected daily surplus after preserving a personal reserve.
- The amount allowed by their current gifting policy.
- Requests from trusted contacts or a moderated community.
- Gifts sent, received, and contributed to a shared pool.

Gifting is intentionally configurable. A percentage is not baked into the product. A provider, workspace administrator, plan owner, or risk system could choose a different limit for each plan, model, user group, or time period. The interactive prototype exposes this as a monthly share-limit control.

## How giftable credits are calculated

The maximum gift at a given moment is the lowest of:

1. The user's current wallet balance.
2. Their forecast surplus after a safety reserve.
3. Their remaining plan-level gifting allowance.
4. The selected model's remaining gifting allowance.

In simplified form:

```text
giftable = min(
  wallet balance,
  forecast surplus after reserve,
  plan policy remaining,
  model policy remaining
)
```

This keeps the rule flexible without allowing a user to accidentally give away credits they are likely to need.

## Current prototype

The current build is a polished, responsive front-end prototype. It includes:

- Monthly balance and reset status.
- A configurable monthly sharing percentage.
- Per-model allocation, consumption, and giftable balance calculations.
- A daily reserve that protects the giver.
- A gift dialog with model selection, amount controls, recipient, and note.
- A community request that can be covered directly.
- Live balance and activity updates after a simulated gift.
- Usage visualization, weekly activity, quick recipients, and gift history.
- Open Graph and social-sharing metadata.

All people, balances, requests, and transfers in the prototype are sample data held in browser memory. Refreshing the page resets them.

## Important product boundary

Pool currently demonstrates an app-managed credit ledger. It does not transfer, resell, or modify an existing ChatGPT or OpenAI account balance. A production connection to any AI provider would require an approved API or commercial integration that explicitly supports usage reporting and credit gifting.

Until such an integration exists, Pool could still operate as:

- A credit system for an AI application built on provider APIs.
- An internal allowance-sharing tool for an organization.
- A provider-neutral ledger spanning several AI products.
- A purchase-and-gift interface that creates new prepaid credits instead of moving an existing balance.

## Suggested production architecture

A production version would add:

- Authentication and verified user profiles.
- A durable double-entry credit ledger.
- Provider usage ingestion and model-rate normalization.
- Configurable policy rules stored per plan, model, workspace, and user tier.
- Atomic gift transactions with idempotency protection.
- Recipient eligibility checks and private claim links.
- Fraud controls, velocity limits, cooldowns, and abuse review.
- Notifications, receipts, expiry rules, and transaction reversals.
- Administrative reporting and policy management.

The ledger should be the source of truth. Balances should never be changed by directly editing a total; every change should be represented by an auditable transaction.

## User flow

1. Connect an AI allowance or receive an app-managed credit allocation.
2. Pool calculates usage by model and forecasts the user's likely surplus.
3. The active policy determines how much of each allowance is eligible to share.
4. The user chooses a recipient, model, amount, and optional note.
5. Pool validates the reserve, policy, balance, eligibility, and risk rules.
6. An atomic ledger transaction debits the giver and credits the recipient.
7. Both users receive a receipt and see the updated balance.

## Technology

- React 19 and TypeScript
- vinext and Vite
- Tailwind CSS entrypoint with a custom responsive design system
- Cloudflare-compatible build output
- Optional Drizzle and D1 scaffolding for a future persistent ledger

## Run locally

Requirements: Node.js 22.13 or later.

```bash
npm install
npm run dev
```

Then open the local URL printed in the terminal.

Create a production build with:

```bash
npm run build
```

## Repository structure

```text
app/page.tsx       Product interface and prototype calculations
app/globals.css    Responsive visual system
app/layout.tsx     Site and social metadata
public/og.png      Social preview artwork
db/                Database scaffolding for future persistence
worker/            Cloudflare worker entrypoint
```

## Roadmap

- Move policy values and model allowances into persisted configuration.
- Add sign-in and user-owned wallets.
- Implement a double-entry ledger and transactional gifting API.
- Add requests, trusted circles, and moderation.
- Connect provider usage data where officially supported.
- Add tests for policy boundaries, concurrency, fraud, and ledger invariants.

## Status

Pool is an exploratory prototype, not a financial product, stored-value service, or production credit exchange. The next major milestone is a real ledger backed by authentication and an approved provider integration.

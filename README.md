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

Pool also explores a marketplace model: users can list eligible surplus credits below a reference API rate, buyers get discounted capacity, sellers recover value that would otherwise expire, and Pool earns a settlement fee. Gifting remains the social feature; the marketplace is the potential business model.

## Marketplace model

Each listing contains a model, available credit quantity, asking rate, reference rate, expiry window, and seller trust score. Buyers can purchase a small lot immediately, while sellers can reserve part of their forecast surplus in marketplace escrow.

Illustrative transaction:

```text
Reference cost                 $10.00
Marketplace price              $7.00
Pool settlement fee             $0.70
Seller proceeds                 $6.30
Buyer savings                   $3.00
```

The prototype uses a sample fee and sample prices rather than claiming current provider rates. A production pricing engine could consider supply, demand, model, expiry, seller reputation, transaction size, and provider restrictions.

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
- A marketplace order board with model, seller, quantity, price, discount, trust, and expiry.
- Simulated credit purchases that update the wallet, listing liquidity, savings, and activity.
- A sell-surplus dialog that reserves eligible credits and calculates fees and proceeds.
- Live balance and activity updates after a simulated gift.
- Usage visualization, weekly activity, quick recipients, and gift history.
- Open Graph and social-sharing metadata.

All people, balances, prices, listings, requests, and transfers in the prototype are sample data held in browser memory. Refreshing the page resets them. No payment is processed.

## Important product boundary

Pool currently demonstrates an app-managed credit ledger and marketplace. It does not transfer, proxy, resell, or modify an existing ChatGPT, OpenAI, or other provider account balance. It never asks users to share provider credentials. A production connection to an AI provider would require an approved API or commercial integration that explicitly supports usage reporting, transfers, or resale.

Until such an integration exists, Pool could still operate as:

- A credit system for an AI application built on provider APIs.
- An internal allowance-sharing tool for an organization.
- A provider-neutral ledger spanning several AI products.
- A purchase-and-gift interface that creates new prepaid credits instead of moving an existing balance.
- An authorized exchange for provider-approved, transferable credits.

Selling personal subscription capacity by routing requests through another user's account creates serious privacy, security, fraud, and terms-of-service risks. Pool's intended architecture avoids that model: only credits represented in Pool's authorized ledger can be listed.

## Suggested production architecture

A production version would add:

- Authentication and verified user profiles.
- A durable double-entry credit ledger.
- An order book for listings, reservations, fills, cancellations, and expiries.
- Escrow accounts and atomic delivery-versus-payment settlement.
- Provider usage ingestion and model-rate normalization.
- Configurable policy rules stored per plan, model, workspace, and user tier.
- Atomic gift transactions with idempotency protection.
- Recipient eligibility checks and private claim links.
- Fraud controls, velocity limits, cooldowns, and abuse review.
- Seller verification, trust scoring, sanctions screening, tax handling, and marketplace compliance.
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

Marketplace flow:

1. Pool calculates the seller's eligible surplus.
2. The seller selects a model, quantity, and asking rate.
3. Credits are reserved in escrow so they cannot be spent or listed twice.
4. A buyer accepts a listing or places a bid.
5. Pool atomically settles delivery, seller proceeds, platform fee, and buyer savings.
6. Both parties receive an auditable transaction receipt.

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
- Implement the marketplace order book, escrow, settlement, and cancellation flows.
- Add dynamic price discovery and bids alongside instant purchases.
- Add requests, trusted circles, and moderation.
- Connect provider usage data where officially supported.
- Add tests for policy boundaries, concurrency, fraud, and ledger invariants.

## Status

Pool is an exploratory prototype, not a financial product, stored-value service, or production credit exchange. The next major milestone is a real ledger backed by authentication and an approved provider integration.

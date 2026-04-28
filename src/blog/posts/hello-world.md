---
title: "Hello from the KaleidoSwap Blog"
date: "2026-04-29"
author: "Walter"
tags: ["Announcement"]
slug: "hello-world"
excerpt: "Welcome to the KaleidoSwap blog, where we share protocol updates, SDK guides, and ecosystem news."
coverImage: "/blog/images/hello-world/cover.png"
---

Welcome to the **KaleidoSwap blog**! This is where the team shares protocol updates, SDK guides, and ecosystem news about Bitcoin Layer 2.

## What is KaleidoSwap?

KaleidoSwap is a decentralized exchange protocol built on Bitcoin Layer 2. It enables trustless atomic swaps between BTC, USDT, and any RGB asset across Lightning, RGB, Spark, and Arkade — with no bridges, no custody, and no tokens.

The protocol leverages the power of the RGB smart contract system to bring programmable assets to Bitcoin without compromising on security or decentralization. Every swap is verified on-chain, ensuring that neither party can be cheated.

Unlike traditional DEXs, KaleidoSwap never holds your funds. The swap either completes atomically or reverts entirely — there is no intermediate state where funds can be lost or stolen.

## How Atomic Swaps Work

An atomic swap is a peer-to-peer exchange of assets that either completes fully or not at all. There is no trusted third party, no custodian, and no risk of partial execution.

KaleidoSwap uses Hash Time-Lock Contracts (HTLCs) to coordinate the swap between two parties across different payment channels. Both legs of the trade settle atomically on the underlying Bitcoin timechain.

### The Role of Lightning Network

The Lightning Network provides the payment rails for KaleidoSwap swaps. By routing payments through Lightning channels, trades settle in seconds with near-zero fees — a dramatic improvement over on-chain settlement times.

Each swap creates two HTLCs — one on each side of the trade — locked to the same preimage. When the receiver reveals the preimage to claim their funds, the sender's HTLC is automatically resolved. This guarantees atomicity at the protocol level.

### RGB Protocol Integration

RGB is a smart contract system built on top of Bitcoin and Lightning. It allows the issuance and transfer of arbitrary assets — tokens, stablecoins, NFTs — while keeping all data off-chain and verified client-side.

KaleidoSwap extends the HTLC mechanism to support RGB asset transfers, making it possible to swap native BTC for any RGB asset in a single atomic operation with no intermediary.

## Getting Started with KaleidoSDK

The KaleidoSDK is the developer toolkit for integrating KaleidoSwap into your application. It provides a simple API for discovering peers, constructing swap proposals, and monitoring settlement.

Install the SDK with your preferred package manager:

```bash
npm install @kaleidoswap/sdk
```

### Initializing a Client

```typescript
import { KaleidoClient } from '@kaleidoswap/sdk'

const client = new KaleidoClient({ network: 'testnet' })
```

### Executing Your First Swap

```typescript
const quote = await client.getQuote({
  from: 'BTC',
  to: 'USDT',
  amount: 0.001,
})

const swap = await client.executeSwap(quote)
console.log('Swap settled:', swap.txid)
```

The SDK handles all the complexity of HTLC construction, peer discovery, and settlement monitoring. Your application only needs to handle the user-facing quote approval flow.

## What's Next

Over the coming weeks we'll be publishing detailed guides on each component of the KaleidoSwap stack:

- RGB asset issuance and transfer
- Lightning channel management for market makers
- Running your own KaleidoSwap node
- Integrating KaleidoSDK in mobile and desktop apps
- Cross-layer swap routing and fee optimization

Stay tuned and follow us on X and Telegram for updates.

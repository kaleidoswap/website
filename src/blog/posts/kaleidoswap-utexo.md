---
title: "KaleidoSwap × UTEXO: USDT-BTC Swaps via RGB Lightning"
date: "2025-09-23"
tags: ["Partnership"]
slug: "kaleidoswap-utexo"
excerpt: "KaleidoSwap integrates with UTEXO, the team behind the first RGB bridge, to bring fast, trustless BTC-USDT swaps with the privacy and self-custody guarantees of Bitcoin's infrastructure."
coverImage: "/blog/images/kaleidoswap-utexo/kaleidoswap-utexo-cover.jpg"
coverImageMobile: "/blog/images/kaleidoswap-utexo/kaleidoswap-utexo-cover-mobile.jpg"
coverImageCard: "/blog/images/kaleidoswap-utexo/kaleidoswap-utexo-cover-card.jpg"
coverImagePreview: "/blog/images/kaleidoswap-utexo/kaleidoswap-utexo-cover-preview.jpg"
coverImagePreviewX: "/blog/images/kaleidoswap-utexo/kaleidoswap-utexo-cover-preview-x.jpg"
---

Today, we're excited to announce a strategic integration with [UTEXO](https://www.utexo.com/), the team behind the first RGB bridge that brings stablecoins like [USDT](https://tether.to/en/) from other blockchains onto Bitcoin via [RGB](https://rgb.info/). This partnership lets KaleidoSwap users access fast, trustless BTC-USDT swaps, with the privacy and self-custody guarantees of Bitcoin and [Lightning Network](https://lightning.network/)'s infrastructure.

### Two Pillars for Bitcoin-based finance

KaleidoSwap is the first non-custodial DEX that combines **Bitcoin's security**, **Lightning's speed**, and **RGB's programmability**. Adding Utexo's bridged USDT unlocks a core primitive: **deep, dollar-denominated liquidity** for pricing and settlement, without leaving the Bitcoin stack.

UTEXO launched **Bitcoin's first RGB bridge**, enabling USDT issued on [Ethereum](https://ethereum.org/) to be represented as an **RGB asset** and moved over [RGB Lightning](https://github.com/RGB-Tools/rgb-lightning-node). This means dollar-stable exposure with Lightning-style finality and privacy, natively usable in KaleidoSwap's order flow.

### Why Stablecoins on Bitcoin?

Today, holding or trading USDT realistically means using an EVM chain, accepting its compromises. Stablecoins on Bitcoin via RGB remove them one by one:

- **Permissionless** — No exchange account, no identity checks, no custodian. A swap on KaleidoSwap is a trustless Bitcoin swap by construction: your counterparty is a market maker across a Lightning channel, and the protocol enforces fair settlement.
- **No centralized bridge risk** — Wrapped assets depend on custodians and multisig federations. Bridge hacks have cost users billions, as [reported by Chainalysis](https://www.chainalysis.com/blog/cross-chain-bridge-hacks-2022/). Bridged USDT lives natively on Bitcoin, in UTXOs you control.
- **Privacy by design** — On Ethereum or Tron every transfer is public forever. RGB's client-side validation keeps asset data off-chain, making every trade a private Bitcoin swap. No mempool trace, no doxxed balances.
- **Bitcoin settlement** — Channels open and close on the most secure blockchain in existence. No alternative validators, no governance tokens, no trusted sequencers.

The EVM stablecoin experience asks you to trust exchanges, bridges, and public ledgers. The Bitcoin-native stack replaces all three with cryptography.

### Enabling Private USDT-BTC Swaps Thanks to Client-Side Validation

With RGB, asset data never touches the blockchain. Ownership, amounts, and history live off-chain with the parties involved; the chain records only a cryptographic commitment inside an otherwise ordinary Bitcoin transaction. [Client-side validation](https://docs.rgb.info/distributed-computing-concepts/client-side-validation) means each recipient privately verifies only the assets they receive.

Swaps go one step further: they execute entirely off-chain inside Lightning channels, bound by a single [HTLC](https://bitcoinops.org/en/topics/htlc/) preimage. No trade size, price, or counterparty ever hits the mempool. The only on-chain footprint is channel opens and closes, which is indistinguishable from ordinary Lightning activity. The data a chain-analysis firm would need simply doesn't exist on-chain.

### How Non-Custodial BTC-USDT Swaps Work on RGB Lightning

From [ERC-20 token](https://eips.ethereum.org/EIPS/eip-20) to a trustless Bitcoin swap settled over Lightning, the flow takes three steps:

1. **Bridge** — Utexo's RGB bridge maps ERC-20 USDT to an **RGB asset** on Bitcoin.
2. **Route** — The asset moves across **RGB Lightning** for low-latency settlement.
3. **Swap** — KaleidoSwap's DEX matches orders and executes swaps over Lightning channels with client-side validated RGB state.

Thanks to this integration, here's what you'll be able to do on KaleidoSwap:

- **Swap USDT-BTC on RGB** — Non-custodial, peer-to-peer swaps that clear over Lightning/RGB rails. No wrapped BTC, no centralized intermediaries.
- **Stay private & self-custodial** — RGB's client-side validation and Lightning payment channels mean you control your keys and minimize on-chain footprint.

### Quick FAQ

**Is this custodial?**
No. KaleidoSwap is non-custodial. You always hold your keys while performing private USDT-BTC swaps.

**What stablecoin is supported?**
Utexo's RGB bridge currently enables **USDT** ([Tether](https://tether.io/)'s dollar-pegged stablecoin) to be represented as an RGB asset and settled over Lightning.

**Do I need wrapped BTC or an EVM wallet?**
No. The swap flow is **Bitcoin-native**, based on Lightning + RGB.

**Where can I try it?**
Download the KaleidoSwap desktop app and follow the in-app guide to open Lightning channels and acquire RGB assets.

### What's next

This integration rolls out in phases, starting with **BTC-USDT (RGB)** swaps in the KaleidoSwap desktop app, followed by expanded market pairs. We'll publish deeper docs for market makers, wallet developers, and routing node operators as functionality lands. 

The roadmap extends beyond a single pair. Dollar liquidity on Bitcoin rails is the primitive that everything else builds on: multi-asset markets, a multi-protocol liquidity layer for the whole Bitcoin L2 ecosystem, and an [SDK](/products/sdk) for any wallet that wants to offer non-custodial stablecoin swaps to its users.

In parallel, we continue building with strong ecosystem support, including [our pre-seed](/blog/pre-seed-investment) round led by [Bitfinex Ventures](https://www.bitfinex.com/) and [Fulgur Ventures](https://fulgur.ventures/), to accelerate the first Bitcoin-native DEX powered by RGB and Lightning.

### Credits & references

- KaleidoSwap — Trustless swap on Bitcoin L2s: [kaleidoswap.com](https://kaleidoswap.com) | [@kaleidoswap](https://x.com/kaleidoswap)
- Utexo — RGB bridge for stablecoin liquidity on Bitcoin: [utexo.com](https://www.utexo.com/) | [@utexocom](https://x.com/utexocom)
- Coverage of "first RGB bridge" bringing USDT to Bitcoin/RGB: [Bitcoin Magazine](https://bitcoinmagazine.com/news/first-rgb-bridge-brings-usdt-from-ethereum-to-bitcoin-via-lightning)

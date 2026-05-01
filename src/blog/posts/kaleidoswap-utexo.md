---
title: "KaleidoSwap × UTEXO: Bringing RGB-native USD₮ Swaps to Lightning"
date: "2025-09-23"
author: "KaleidoSwap Team"
tags: ["Partnership"]
slug: "kaleidoswap-utexo"
excerpt: "KaleidoSwap integrates with UTEXO, the team behind the first RGB bridge, to bring fast, trustless BTC ⇄ USD₮ swaps with the privacy and self-custody guarantees of Bitcoin's infrastructure."
coverImage: "/blog/images/kaleidoswap-utexo/cover.png"
coverImageMobile: "/blog/images/kaleidoswap-utexo/cover-mobile.png"
coverImageCard: "/blog/images/kaleidoswap-utexo/cover-card.png"
---

Today, we're excited to announce a strategic integration with **UTEXO**, the team behind the first **RGB bridge** that brings stablecoins like **USD₮** from Ethereum onto Bitcoin via RGB. This partnership lets KaleidoSwap users access **fast, trustless BTC ⇄ USD₮ swaps** with the privacy and self-custody guarantees of Bitcoin's infrastructure.

### Why this matters

KaleidoSwap is the first non-custodial DEX that combines **Bitcoin's security**, **Lightning's speed**, and **RGB's programmability**. Adding Utexo's bridged USD₮ unlocks a core primitive: **deep, dollar-denominated liquidity** for pricing and settlement — without leaving the Bitcoin stack.

UTEXO launched **Bitcoin's first RGB bridge**, enabling USD₮ issued on Ethereum to be represented as an **RGB asset** and moved over **RGB Lightning**. This means dollar-stable exposure with Lightning-style finality and privacy, natively usable in KaleidoSwap's order flow.

### What you'll be able to do on KaleidoSwap

- **Swap BTC ⇄ USD₮ (RGB):** Non-custodial, peer-to-peer swaps that clear over Lightning/RGB rails — no wrapped BTC, no centralized intermediaries in Kaleido fashion.
- **Stay private & self-custodial:** RGB's client-side validation and Lightning payment channels mean you control your keys and minimize on-chain footprint.

### How the integration works

1. **Bridge:** Utexo's RGB bridge maps ERC-20 USD₮ to an **RGB asset** on Bitcoin.
2. **Route:** The asset moves across **RGB Lightning** for low-latency settlement.
3. **Swap:** KaleidoSwap's DEX matches orders and executes swaps over Lightning channels with client-side validated RGB state.

### What's next

This integration rolls out in phases, starting with **BTC ⇄ USD₮ (RGB)** swaps in the KaleidoSwap desktop app, followed by expanded market pairs and the rollout. We'll publish deeper docs for market makers, wallet developers, and routing node operators as functionality lands. In parallel, we continue building with strong ecosystem support, including our **pre-seed round led by Bitfinex Ventures and Fulgur Ventures**, to accelerate the first Bitcoin-native DEX powered by RGB and Lightning.

---

### Quick FAQ

**Is this custodial?**
No. KaleidoSwap is non-custodial. You hold your keys.

**What stablecoin is supported?**
Utexo's RGB bridge currently enables **USD₮** (Tether) to be represented as an RGB asset and settled over Lightning.

**Do I need wrapped BTC or an EVM wallet?**
No. The swap flow is **Bitcoin-native** — Lightning + RGB — while the bridge handles asset representation across chains.

**Where can I try it?**
Download the KaleidoSwap desktop app and follow the in-app guide to open Lightning channels and acquire RGB assets.

---

### Credits & references

- KaleidoSwap product + docs: [kaleidoswap.com](https://kaleidoswap.com) | [github.com/kaleidoswap](https://github.com/kaleidoswap)
- Utexo: RGB bridge for stablecoin liquidity on Bitcoin: [utexo.com](https://www.utexo.com/) | [@utexocom](https://x.com/utexocom)
- Coverage of "first RGB bridge" bringing USD₮ to Bitcoin/RGB: [Bitcoin Magazine](https://bitcoinmagazine.com/news/first-rgb-bridge-brings-usdt-from-ethereum-to-bitcoin-via-lightning)

---
title: "May 2026: Extension Mainnet Beta, Covenant DEX Rails, and Partner Admin Panel"
date: "2026-05-31"
author: "KaleidoSwap Team"
tags: ["Release Notes"]
slug: "may-2026-release-notes"
excerpt: "The browser extension shipped its first mainnet beta, our covenant DEX work took shape across three settlement rails, Liquid integration began, and the RGB Lightning Node reached v0.7.0."
coverImage: "/blog/images/may-2026-release-notes/cover.png"
coverImageMobile: "/blog/images/may-2026-release-notes/cover-mobile.png"
coverImageCard: "/blog/images/may-2026-release-notes/cover-card.png"
coverImagePreview: "/blog/images/may-2026-release-notes/cover-preview.png"
coverImagePreviewX: "/blog/images/may-2026-release-notes/cover-preview-x.png"
---

May was the month KaleidoSwap left the lab. The browser extension shipped its first mainnet beta, our covenant DEX work took shape across three settlement rails, and we started wiring Liquid in as a second venue.

It was a month about reach: putting the wallet in real hands, and extending where a swap can settle. Here is what landed.

---

## The KaleidoSwap Extension: v0.1.0 Mainnet Beta

On May 11 we shipped the first closed-beta build of the **KaleidoSwap Extension**, v0.1.0-beta.1, distributed as a signed build to invited testers. It is a self-custodial browser wallet for bitcoin and stablecoins.

Spark and Arkade run on **mainnet** by default, from a single 12-word seed encrypted at rest with AES-GCM-256 and Argon2id. RGB Lightning and KaleidoSwap atomic swaps are available on test networks for this build, with RGB mainnet support staged for a later release.

What the first build does:

- **Trustless swaps on Spark**, executed directly from the wallet.
- **Buy and earn on USDB**, with swap and rewards integration for Spark balances.
- A **cross-chain bridge** that lets users deposit from external networks into BTC or USDB on Spark, with a tracking screen that persists across popup close.
- **Venue tabs** (KaleidoSwap, Flashnet, and All) with a channel-aware tradability filter that hides pairs no Lightning channel can fulfil, so users cannot pick a swap that is guaranteed to fail at execution.

Security was a first-class line item, not an afterthought. The build ships sender-internal guards on every wallet-mutating action, an Argon2id unlock rate-limit with exponential backoff, per-action parameter validation on the dApp request surface, and a redacting logger that strips seed words, addresses, and invoices before anything reaches a log buffer. The dApp confirmation popup adds postMessage validation and a short anti-clickjack delay on the confirm action.

Passkey wallet unlock is built and queued for **v0.2**, shipping soon.

---

## Mosaik: A Covenant DEX Across Three Rails

[Mosaik](https://kaleidoswap.com/blog/mosaik-tessera-covenant-dex) started as a hackathon project and is becoming a new set of rails for KaleidoSwap. It is a new way to swap, one that sits alongside decentralized order books and RFQ rather than replacing them. Instead of a matching engine holding the trade, a **covenant enforces the trade itself**: the order is a coin that keeps its own word.

We see three rails to get there, and we are building toward all of them:

- **Liquid Tapscript**, via [banco](https://github.com/vulpemventures/banco).
- **Arkade**, via [banco](https://github.com/arkade-os/banco).
- **Simplicity**, for future advanced contracts.

A deep-dive blog post on the design is coming soon. The work is in progress, and Mosaik is where most of our covenant research is converging.

---

## RGB on Liquid, and a Liquid Backend

Two threads of Liquid work moved this month.

First, research. RGB's validation layer is chain-agnostic, and only the anchor is bound to Bitcoin. We ran a line-by-line analysis of what it would take to anchor RGB assets to the Liquid Network, and what that unlocks for confidential, multi-asset, bridged assets. A full write-up is coming soon.

Second, implementation. We started wiring a **Liquid backend** into KaleidoSwap as a second settlement venue, extending swaps and liquidity beyond Lightning under the same RFQ flow. The direction is native multi-asset swaps and non-custodial Lightning-to-Liquid bridges, all behind the trading flow users already know. More on this shortly.

---

## A Partner Admin Panel for Integrators

We shipped the first version of the **Partner Admin Panel**, the admin surface for wallet builders and fintechs integrating the [KaleidoSDK](https://docs.kaleidoswap.com).

It gives SDK integrators visibility into, and management tools for, their integration: telemetry on usage, API key management with scope enforcement, and partner onboarding. These are the rails for building on top of KaleidoSwap, rather than only swapping through it.

---

## RGB Lightning Node v0.7.0

The [RGB Lightning Node](https://github.com/kaleidoswap/rgb-lightning-node/releases) reached **v0.7.0**, tagged May 25. This release is about stability and indexing:

- More reliable, more personalized sync and requests to the indexer.
- A move to a new, faster **Esplora** indexer.
- An upgrade to **rgb-lib 0.3.0-beta.6**.
- A new API to **decode swapstrings**, sharpening the tooling under every RGB Lightning swap.

---

## What's Next

The near-term roadmap follows directly from May.

For the extension, v0.2 brings passkey unlock and further hardening, followed by a deep run of new capabilities:

- **WDK** integration (the Wallet Development Kit).
- **Liquid support** in the wallet.
- **RGB on-chain on mainnet.**
- **LNURL** and **WebLN** support.
- **Nostr login and signing.**
- **New peer-to-peer swaps.**

On the protocol side, the Liquid backend deepens toward production, the three covenant rails mature, and the Mosaik design write-up is on its way.

Want early access? Join the [KaleidoSwap Extension beta](https://kaleidoswap.com/products/extension/beta), and follow the build on [GitHub](https://github.com/kaleidoswap).

---

📚 **Sources**

- [KaleidoSwap Extension changelog (v0.1.0-beta.1)](https://github.com/kaleidoswap)
- [Mosaik: The Order That Is a Coin](https://kaleidoswap.com/blog/mosaik-tessera-covenant-dex)
- [banco for Liquid](https://github.com/vulpemventures/banco)
- [banco for Arkade](https://github.com/arkade-os/banco)
- [RGB Lightning Node releases](https://github.com/kaleidoswap/rgb-lightning-node/releases)
- [KaleidoSwap docs](https://docs.kaleidoswap.com)

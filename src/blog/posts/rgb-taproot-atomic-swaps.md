---
title: "RGB — TaprootAssets Lightning Atomic Swaps"
date: "2025-03-26"
author: "KaleidoSwap Team"
tags: ["Deep Dive"]
slug: "rgb-taproot-atomic-swaps"
excerpt: "A simple protocol for trustless cross-protocol swaps between RGB20 and Taproot Assets over the Lightning Network."
coverImage: "/blog/rgb-taproot-atomic-swaps/rgb-taproot-atomic-swaps-cover.jpg"
coverImageMobile: "/blog/rgb-taproot-atomic-swaps/rgb-taproot-atomic-swaps-cover-mobile.jpg"
coverImageCard: "/blog/rgb-taproot-atomic-swaps/rgb-taproot-atomic-swaps-cover-card.jpg"
coverImagePreview: "/blog/rgb-taproot-atomic-swaps/rgb-taproot-atomic-swaps-cover-preview.jpg"
coverImagePreviewX: "/blog/rgb-taproot-atomic-swaps/rgb-taproot-atomic-swaps-cover-preview-x.jpg"
---

### Bridging RGB20 and Taproot Assets on Lightning Network

[Atomic swaps](https://en.bitcoin.it/wiki/Atomic_swap) have long been a crucial tool for enabling trustless asset exchanges across different networks. With the emergence of [RGB](https://rgb.info) and [Taproot Assets](https://docs.lightning.engineering/the-lightning-network/taproot-assets), new challenges arise in cross-protocol swaps. This simple protocol introduces a seamless way to perform asset swaps between RGB and Taproot Assets over the [Lightning Network](https://lightning.network/).

### The Problem

Imagine a scenario where:

- **Alice** has a [RGB Lightning Node](https://github.com/RGB-Tools/rgb-lightning-node) wallet and holds [USDT](https://tether.to/en/)-RGB ([see announcement](https://tether.io/news/tether-brings-usdt-to-bitcoin-via-the-rgb-protocol/)).
- **Bob** runs a Swap Proxy Gateway, acting as an intermediary with liquidity in both RGB and Taproot Assets.
- **Carol** holds a Taproot Assets wallet and only accepts USDT-Taproot Assets.

Alice wants to send USDT to Carol, but Carol only accepts Taproot Assets. Bob has channels and liquidity with both Alice (in USDT-RGB) and Carol (in USDT-Taproot Assets) and facilitates the swap.

### The Protocol

1. **Exchange Rate Discovery**: Alice queries Bob's gateway for conversion rates and associated fees (e.g., 0.1%).
2. **Invoice Processing**:

- Alice scans Carol's Taproot Assets [invoice](https://github.com/lightning/bolts/blob/master/11-payment-encoding.md) and forwards it to Bob along with an RFQ\_ID.
- The **RFQ\_ID** (Request for Quote ID) represents a previous price quote Bob provided for the swap. It ensures Alice and Bob agree on the rate and fees before execution.
- Bob creates a **wrapped invoice** encoding also RGB assets, using Carol's original invoice and sends it to Alice.
- The **wrapped invoice** retains the same [payment hash](https://bitcoinops.org/en/topics/htlc/), expiry, and description as the original invoice but includes a swap fee. This allows it to be used interchangeably with the original invoice while obfuscating the final recipient.
- The payment will only be unlocked once the preimage of the first payment is revealed.

3. **Atomic Swap Execution**:

- Alice pays Bob's wrapped invoice in RGB assets.
- Bob forwards the payment in Taproot Assets to Carol, receiving the preimage in return.
- Bob uses this preimage to claim Alice's payment, ensuring atomicity.

### Trustless by Design Security Model
At no point in this protocol does anyone have to trust a counterparty. Every payment is conditional on the same cryptographic preimage: either the entire chain of payments settles atomically, or nothing moves at all. This is what makes it a genuinely trustless Bitcoin swap. Bob can't take Alice's funds without paying Carol, and Alice never exposes herself to custodial risk. Unlike centralized exchanges or bridge-based solutions, there is no escrow, no wrapped asset, and no honest-majority assumption. The security model is Bitcoin's own: hashlocks and timelocks enforced by the Lightning Network.

Because the entire swap happens off-chain over existing channels, it inherits Lightning's core properties: settlement in seconds, fees measured in sats, and nothing broadcast to the mempool. There is no on-chain footprint revealing what was swapped, at what rate, or between whom. This is a meaningful privacy advantage over on-chain Bitcoin atomic swap designs and AMM-based DEXes, where every trade is public and exposed to frontrunning.

### Unifying Bitcoin's L2s: From Swap Protocol to Lightning DEX
RGB and Taproot Assets are two competing standards for issuing assets on Bitcoin, each with its own trade-offs and its own ecosystem of wallets and users. Until now, a user holding USDT on RGB simply could not pay someone who only accepts Taproot Assets. This protocol is one of the first concrete demonstrations of Bitcoin L2 interoperability: a Bitcoin L2 atomic swap that crosses protocol boundaries without leaving the Lightning Network, and without bridges or federations in between.

The role Bob plays (a Swap Proxy Gateway holding liquidity on both sides) is permissionless. Any [LSP](https://github.com/BitcoinAndLightningLayerSpecs/lsp), market maker, or independent node operator can offer this service and compete on rates and fees. There is no privileged bridge operator and no single point of failure: if one gateway goes offline or quotes a bad price, Alice simply routes through another. Over time, this competition among gateways is what turns the Lightning Network into a decentralized marketplace where cross-protocol conversion is just another routing hop.

Instead of fragmenting liquidity across incompatible standards, Lightning becomes the common settlement layer that unifies them. Check out our [dedicated article about the Bitcoin L2s' liquidity problem that KaleidoSwap is solving](/blog/solving-bitcoin-l2-liquidity).

### Conclusion

The RLN Taproot Assets Atomic Swap protocol presents a novel way to unify RGB and Taproot Assets within the Lightning ecosystem. By leveraging wrapped invoices and preimage-based atomicity, it ensures a trustless and efficient payment flow, paving the way for broader adoption of both protocols in real-world transactions.

If you are interested in integrating this into your project, [check out](/products/sdk) the KaleidoSDK and [read](https://docs.kaleidoswap.com/whats-kaleidoswap/introduction) our docs.

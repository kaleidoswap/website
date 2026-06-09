---
title: "RGB — TaprootAssets Lightning Atomic Swaps"
date: "2025-03-26"
author: "KaleidoSwap Team"
tags: ["Deep Dive"]
slug: "rgb-taproot-atomic-swaps"
excerpt: "A simple protocol for trustless cross-protocol swaps between RGB20 and Taproot Assets over the Lightning Network."
coverImage: "/blog/images/rgb-taproot-atomic-swaps/rgb-taproot-atomic-swaps-cover.png"
coverImageMobile: "/blog/images/rgb-taproot-atomic-swaps/rgb-taproot-atomic-swaps-cover-mobile.png"
coverImageCard: "/blog/images/rgb-taproot-atomic-swaps/rgb-taproot-atomic-swaps-cover-card.png"
coverImagePreview: "/blog/images/rgb-taproot-atomic-swaps/rgb-taproot-atomic-swaps-cover-preview.png"
coverImagePreviewX: "/blog/images/rgb-taproot-atomic-swaps/rgb-taproot-atomic-swaps-cover-preview-x.png"
---

### Bridging RGB20 and Taproot Assets on Lightning Network

Atomic swaps have long been a crucial tool for enabling trustless asset exchanges across different networks. With the emergence of RGB and Taproot Assets, new challenges arise in cross-protocol swaps. This simple protocol introduces a seamless way to perform asset swaps between RGB and Taproot Assets over the Lightning Network.

### The Problem

Imagine a scenario where:

- **Alice** has a RGB Lightning Node wallet and holds USDT-RGB.
- **Bob** runs a Swap Proxy Gateway, acting as an intermediary with liquidity in both RGB and Taproot Assets.
- **Carol** holds a Taproot Assets wallet and only accepts USDT-Taproot Assets.

Alice wants to send USDT to Carol, but Carol only accepts Taproot Assets. Bob has channels and liquidity with both Alice (in USDT-RGB) and Carol (in USDT-Taproot Assets) and facilitates the swap.

### The Protocol

1. **Exchange Rate Discovery**: Alice queries Bob's gateway for conversion rates and associated fees (e.g., 0.1%).
2. **Invoice Processing**:

- Alice scans Carol's Taproot Assets invoice and forwards it to Bob along with an RFQ\_ID.
- The **RFQ\_ID** (Request for Quote ID) represents a previous price quote Bob provided for the swap. It ensures Alice and Bob agree on the rate and fees before execution.
- Bob creates a **wrapped invoice** encoding also RGB assets, using Carol's original invoice and sends it to Alice.
- The **wrapped invoice** retains the same payment hash, expiry, and description as the original invoice but includes a swap fee. This allows it to be used interchangeably with the original invoice while obfuscating the final recipient.
- The payment will only be unlocked once the preimage of the first payment is revealed.

3. **Atomic Swap Execution**:

- Alice pays Bob's wrapped invoice in RGB assets.
- Bob forwards the payment in Taproot Assets to Carol, receiving the preimage in return.
- Bob uses this preimage to claim Alice's payment, ensuring atomicity.

### Key Benefits

- **Trustless Execution**: Payments are conditional and only settle upon cryptographic verification.
- **Cross-Protocol Interoperability**: Enables swaps between RGB and Taproot Assets using Lightning.
- **Decentralized Liquidity Bridging**: LSPs or independent gateways like Bob can facilitate seamless conversion.

### Conclusion

The RLN Taproot Assets Atomic Swap protocol presents a novel way to unify RGB and Taproot Assets within the Lightning ecosystem. By leveraging wrapped invoices and preimage-based atomicity, it ensures a trustless and efficient payment flow, paving the way for broader adoption of both protocols in real-world transactions.

Interested in integrating this into your project? Reach out or contribute to the open-source implementation!

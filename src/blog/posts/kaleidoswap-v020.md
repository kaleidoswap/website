---
title: "KaleidoSwap v0.2.0 — RGB Is Now Live on Mainnet"
date: "2025-07-23"
author: "KaleidoSwap Team"
tags: ["Announcement"]
slug: "kaleidoswap-v020"
excerpt: "KaleidoSwap v0.2.0 lands as RGB v0.11.1 goes live on Bitcoin mainnet — bringing advanced asset swaps, improved UX, and stronger Lightning infrastructure integration."
coverImage: "/blog/images/kaleidoswap-v020/kaleidoswap-v020-cover.jpg"
coverImageMobile: "/blog/images/kaleidoswap-v020/kaleidoswap-v020-cover-mobile.jpg"
coverImageCard: "/blog/images/kaleidoswap-v020/kaleidoswap-v020-cover-card.jpg"
coverImagePreview: "/blog/images/kaleidoswap-v020/kaleidoswap-v020-cover-preview.jpg"
coverImagePreviewX: "/blog/images/kaleidoswap-v020/kaleidoswap-v020-cover-preview-x.jpg"
---

We're excited to announce the release of **KaleidoSwap v0.2.0**, our latest alpha version — and it arrives at a historic moment for Bitcoin's asset ecosystem.

As of **July 17 2025**, **RGB v0.11.1** is officially **live on Bitcoin mainnet**. This marks a major milestone for the client-side validation protocol, enabling native issuance and transfer of assets like stablecoins, collectibles, and utility tokens directly on Bitcoin — with no centralized intermediaries or sidechains.

From the same date, the **RGB Lightning Node (RLN)** also became mainnet-capable. However, it remains experimental, and we strongly recommend **testing in controlled environments**. Extensive testing and validation are still needed before full production use.

> *With v0.2.0, KaleidoSwap supports this evolving protocol stack — bringing advanced RGB asset swaps, improved UX, and stronger integration with Lightning infrastructure.*

![KaleidoSwap v0.2.0](/blog/images/kaleidoswap-v020/kaleidoswap-v020-cover.png)

---

### What's New in KaleidoSwap v0.2.0

This version delivers a range of important improvements and fixes:

- ✅ **Fixed RGB asset deposit and withdrawal precision issues**
- 💠 **New graphical interface for buying Lightning channels** with RGB tokens
- 🤝 **Trade directly with a market maker** using RGB assets
- 🔐 **Support for private channels** — choose between public or private setups
- 🔌 **Peer selection for channel opening** — connect to an existing peer or define a new one
- 🛠️ **Minor bug fixes** and general UX enhancements

While this release is still **testnet-only**, it significantly improves reliability and user experience — bringing us closer to a full mainnet deployment.

You can download the new binaries [here](https://github.com/kaleidoswap/desktop-app/releases/tag/v0.2.0).

---

### RGB on Mainnet — A New Era for Bitcoin

RGB is now available on Bitcoin mainnet via version **v0.11.1**, enabling a completely new approach to Bitcoin-native assets:

- 🔒 **Client-side validation** — all validation happens locally, not on-chain
- 🧱 **Bitcoin-native anchoring** — assets are cryptographically bound to UTXOs
- 📉 **Reduced on-chain load** — the blockchain is used only for settlement
- 🛡️ **Privacy by default** — no metadata is exposed on the public ledger

This model is inherently scalable and aligns with Bitcoin's core values of **sovereignty, privacy, and decentralization**. As demand grows for stablecoins and other RGB-issued assets, especially over the Lightning Network, this unlocks a new layer of functionality for wallets, merchants, and financial applications — all without leaving the Bitcoin ecosystem.

---

### Why We're Staying on Testnet (for Now)

From July 17 2025, the **RGB Lightning Node (RLN)** became technically ready for mainnet use. However, it is still considered **reckless to run in production**. We strongly recommend **testing in controlled environments** until the protocol stack reaches greater maturity.

While we're excited about the progress, several **open issues** still need to be addressed:

- ❌ **Lack of authentication** — the node's API lacks access control and remains unsecured
- 🧵 **Channel opening reliability** — RGB-enabled channels via LSPs may fail or hang in specific edge cases
- ⏳ **Pending swap states** — occasionally, swap flows remain stuck in pending state

In addition to fixing these bugs, we are conducting **extensive tests** to validate:

- 🧪 Long-running, real-world usage scenarios
- 🔄 **Interoperability with non-RGB Lightning nodes** — RLN must correctly route and coordinate with the existing Lightning Network

We're collaborating with other developers and node operators to ensure the stack is robust. Once the tooling and infrastructure reach production-level stability, **KaleidoSwap will transition to mainnet**.

---

### What's Coming Next

#### On-Chain RGB Swaps — Launching Soon on Mainnet

We're working on a web interface for **trustless, peer-to-peer RGB swaps on-chain**. This will allow users to:

- Swap Bitcoin and RGB assets seamlessly
- Use KaleidoSwap in a non-custodial, decentralized fashion
- Prepare for mainnet adoption without relying on Lightning

These swaps will also be available via our upcoming SDK.

---

#### Kaleido SDK — Atomic Swaps for Bitcoin-Native Assets

The **Kaleido SDK** is coming soon: a modular toolkit to bring atomic swaps to any wallet or app.

It will support:

- BTC ↔ RGB swaps (on-chain)
- RGB-over-Lightning swaps
- Submarine swaps (between on-chain and Lightning)

Designed for plug-and-play adoption, the SDK empowers developers to build wallets, DEXs, and financial tools around Bitcoin-native assets with minimal friction.

---

### Our Vision — Lightning as the Interoperability Layer for Bitcoin Assets

KaleidoSwap is more than a swap app. It's an engine for atomic, non-custodial Bitcoin-native trading.

Our vision is to make Lightning the **universal interoperability layer** for assets issued on:

- ⚡ RGB (client-side validation)
- ⚡ Taproot Assets (ex-Taro)
- ⚡ Liquid (federated sidechain)
- ⚡ ARK (future integration)

KaleidoSwap will act as the **atomic coordination layer** that allows these protocols to interoperate trustlessly.

Our core principles:

- 🔗 **HTTP-based, modular APIs**
- 🔄 **Atomic and non-custodial asset trading**
- ⚙️ **SDK-first design** for fast integration into wallets and DEXs
- 🛡️ **Privacy-preserving and permissionless architecture**
- ⚡ **Lightning-native from day one**

---

### Try the Alpha, Join the Movement

We're still early — but we're building for the long term.

- 🚀 Test the latest **alpha release (testnet only)**: [GitHub](https://github.com/kaleidoswap/desktop-app/releases/tag/v0.2.0)
- 🧠 Join the dev/tester community: [Telegram](https://t.me/kaleidoswap)
- 🐦 Follow us for updates: [@KaleidoSwap](https://x.com/kaleidoswap)
- 🔧 Apply to test the [Kaleido SDK](https://forms.gle/zBYmV1ViaSiBAThUA) (coming soon)

---

**The Future Is Modular. The Future Is Sovereign.**

**KaleidoSwap is here to build it — one atomic swap at a time.**

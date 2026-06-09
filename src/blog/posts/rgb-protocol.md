---
title: "RGB Protocol on Bitcoin: History, Architecture, and How KaleidoSwap Fits in The Ecosystem"
date: "2026-06-06"
author: "KaleidoSwap Team"
tags: ["Deep Dive"]
slug: "rgb-protocol"
excerpt: "The history, architecture, and ecosystem of RGB Protocol on Bitcoin v0.11.1 — and what KaleidoSwap is building on top of it."
coverImage: "/blog/images/rgb-protocol/rgb-protocol-cover.jpg"
coverImageMobile: "/blog/images/rgb-protocol/rgb-protocol-cover-mobile.jpg"
coverImageCard: "/blog/images/rgb-protocol/rgb-protocol-cover-card.jpg"
coverImagePreview: "/blog/images/rgb-protocol/rgb-protocol-cover-preview.jpg"
coverImagePreviewX: "/blog/images/rgb-protocol/rgb-protocol-cover-preview-x.jpg"
---

**Quick summary**

- RGB Protocol on Bitcoin issues and transfers digital assets natively on Bitcoin and Lightning, without using sidechains or bridges.
- Asset data stays entirely off-chain through client-side validation; only a cryptographic commitment touches Bitcoin.
- Production-ready since July 2025 (v0.11.1); Tether has announced USDT will launch on RGB.
- What KaleidoSwap is building on top of RGB Protocol v0.11.1.

At KaleidoSwap, we build on RGB Protocol v0.11.1, and we get asked about it constantly. What is it, exactly? How does it work? Why does it matter for trading assets on Lightning?

This post answers those questions from the ground up.

---

## The problem with issuing assets on Bitcoin

Every major blockchain today stores transaction data publicly and permanently. Every node keeps a full copy of every transfer ever made. That's fine for securing a global monetary ledger: as a matter of fact, it's exactly what Bitcoin does best.

However, this creates compounding problems for digital assets: chains bloat, privacy collapses, and scalability hits a ceiling.

Early attempts to add assets to Bitcoin (colored coins and their descendants) required participants to scan and validate the entire blockchain to track ownership. The process was slow, privacy-invasive, and not scalable.

RGB takes a fundamentally different approach, which makes it the right foundation for a non-custodial exchange like KaleidoSwap.

---

## A brief history of RGB Protocol on Bitcoin

The conceptual roots of RGB trace back to 2016, when [Peter Todd](https://x.com/peterktodd) proposed client-side validation as a basis for private, scalable asset issuance on Bitcoin. [Giacomo Zucco](https://x.com/giacomozucco), founder of Blockchain Labs, recognized the potential of the idea and helped bring it forward. [Alekos Filini](https://x.com/afilini) then built the first working prototype.

From there, development advanced through years of iteration, with contributions from a wide community of developers, researchers, and companies. Maxim Orlovsky led the protocol's technical direction through that phase. In July 2025, RGB Protocol v0.11.1 [reached mainnet](https://www.rgbprotocol.org/news) as the first production-ready release.

Development leadership has since shifted to Bitfinex, where Federico Tenga leads a team that includes Zoe Faltibà and Nicola Busanello, among others.

Today, the protocol is stewarded by the [RGB Protocol Association](http://www.rgbprotocol.org), an industry-backed organization founded by companies building on RGB, including Bitfinex, Fulgur Ventures, and KaleidoSwap, among others. The Association's mandate focuses on open-source development, ecosystem growth, education, and long-term protocol stewardship.

KaleidoSwap is part of that ecosystem, building on RGB v0.11.1 as its foundation.

---

## How RGB Protocol works

The core design principle of RGB is [client-side validation](https://docs.rgb.info/distributed-computing-concepts/client-side-validation): only the two parties involved in a transfer can exchange and validate the full asset data (the "consignment"). Rather than broadcasting token balances or transfer history to the entire network, the Bitcoin blockchain stores only a small cryptographic commitment as proof that a specific state transition occurred at a specific point in time.

Think of it like a notarized private document. The notary, Bitcoin, confirms that a specific event happened and when. The contents remain entirely between the parties involved.

That commitment can be embedded in two ways:

- **Opret** — inside an OP_RETURN output
- **Tapret** — inside the Taproot script path spend, as an unspendable script at the first level of the script tree

In both cases, only a few bytes go on-chain. The full consignment moves directly between asset owners and gets validated locally by each recipient.

To prevent double-spending, RGB uses [single-use seals](https://docs.rgb.info/distributed-computing-concepts/single-use-seals): assets are bound to Bitcoin UTXOs, which means they cannot be double-spent. Bitcoin's blockchain acts as an immutable anchor for every RGB state transition.

---

## What client-side validation means in practice

**Privacy by design.** Asset balances, transfer history, and contract logic are never published on-chain. An outside observer sees only standard Bitcoin transactions with no indication that an RGB asset is involved, who holds it, or how much.

**No blockchain bloat.** RGB data is not stored on Bitcoin. The only footprint is the cryptographic commitment, which is either in an OP_RETURN output or inside a Taproot script path, with no asset data touching the chain.

**Lightning-native by architecture.** Because validation happens off-chain, RGB integrates natively with the Lightning Network. Assets move through Lightning channels together with satoshis, inheriting all of Lightning's security guarantees. No on-chain confirmation needed, except for channel opening and closing.

### What you can issue with RGB Protocol on Bitcoin

RGB defines asset behavior through [schemas](https://docs.rgb.info/rgb-contract-implementation/schema). They are templates that encode the rules a contract follows, from issuance to transfer. The first production release (v0.11.1) supports five schemas:

**NIA — Non-Inflatable Asset.** A fungible token with a fixed supply. No additional units can ever be created. The Bitcoin-style hard cap applies to any asset.

**IFA — Inflatable Fungible Asset.** A fungible token with a defined supply ceiling. The issuer can mint additional units up to that maximum, and can also burn allocations to provably remove them from circulation.

**UDA — Unique Digital Asset.** A unique, non-fungible asset (NFT). Each UDA is one-of-a-kind and can carry embedded media or attached files — think digital certificates, event tickets, or verifiable credentials.

**CFA — Collectible Fungible Asset.** A fungible token that extends NIA with an Article label per issuance, identifying each batch within a collectible series.

**PFA — Permissioned Fungible Asset.** A fungible, non-inflatable token where every transfer must be explicitly authorized by the issuer via a cryptographic signature. The right structure for regulated securities or any asset with legal constraints on ownership.

---

## USDT is coming to RGB

In August 2025, Tether officially [announced](https://tether.io/news/tether-to-launch-usdt-on-rgb-expanding-native-bitcoin-stablecoin-support/) plans to bring USDT to RGB Protocol on Bitcoin v0.11.1. Paolo Ardoino, Tether's CEO, stated:

> "Bitcoin deserves a stablecoin that feels truly native, lightweight, private, and scalable. With RGB, USD₮ gains a powerful new pathway on Bitcoin, reinforcing our belief in Bitcoin as the foundation of a freer financial future."

USDT on RGB will be a Bitcoin-native stablecoin: dollar-pegged, Lightning-transferable, privately validated, with no sidechains or custodial bridges involved.

---

## RGB Protocol on Bitcoin vs RGB++ vs RGB v0.12

The name "RGB" is shared by several unrelated projects. This causes persistent confusion in media coverage. Here is the disambiguation:

| Name | What it actually is |
|------|---------------------|
| **RGB Protocol on Bitcoin (v0.11.1)** | The open-source protocol at [rgb.info](https://rgb.info). Production-ready on Bitcoin mainnet since July 2025. Supported by the RGB Protocol Association. This is what KaleidoSwap builds on. |
| **RGB++** | A separate protocol by the Nervos/CKB team, running on the CKB blockchain. Different team, different architecture, different chain. No technical or organizational connection to RGB Protocol on Bitcoin. |
| **RGB v0.12** | A non-production rewrite developed by a separate organization (rgb.tech / RGB-WG). Not supported by the RGB Protocol Association. Not suitable for building applications or issuing assets today. |
| **RGB colour model** | The display color standard (Red, Green, Blue). Completely unrelated to any blockchain protocol. |

When looking for information about RGB Protocol on Bitcoin, verify that the source references **[rgb.info](https://rgb.info)** or **[docs.rgb.info](https://docs.rgb.info)** as its canonical authority.

---

## The RGB ecosystem

Besides KaleidoSwap, a growing set of projects are live on RGB Protocol on Bitcoin:

**Wallets:**

- [Iris Wallet](https://play.google.com/store/apps/details?id=com.iriswallet.reckless.mainnet) — mobile and desktop wallet with full RGB Lightning support
- [Tribe RGB](https://bitcointribe.app/) — RGB-compatible wallet on iOS and Android
- [BitMask](https://bitmask.app/) — browser extension wallet for RGB assets

**Applications:**

- [LNFI Network](https://www.lnfi.network/) — an exchange and financial infrastructure layer for RGB assets on Lightning
- [Utexo](https://utexo.com/) — B2B settlement infrastructure for USDT payments over RGB and Lightning
- [Orbis1](https://orbis1.io/) — infrastructure for USDT on Bitcoin using RGB and Lightning SDKs

KaleidoSwap provides the liquidity, swap, and connectivity layer that wallets, exchanges, and applications can integrate directly, without building their own RGB trading infrastructure. Through the [KaleidoSDK](https://kaleidoswap.com/products/sdk), available today in TypeScript and Python, with Rust on the way, wallets and applications add non-custodial RGB asset trading and atomic swaps across Bitcoin L2s.

---

## What KaleidoSwap is building on RGB

The KaleidoSwap Desktop App is the primary interface for managing an RGB Lightning Node (RLN), RGB assets, Lightning channels, and swap activity. Built with a modern, user-friendly experience, it allows users to run an RLN node locally through either native binaries or Docker, or connect securely to a remote node. The Desktop App provides a complete environment for managing RGB assets, opening RGB Lightning channels, executing atomic swaps, purchasing assets from available liquidity, transferring RGB assets on-chain, and monitoring node operations.

At the core of the stack is the RGB Lightning Node (RLN), an open-source implementation of a Lightning node with native RGB support. RLN can be accessed directly through APIs or remotely via Nostr Wallet Connect (NWC), enabling a flexible architecture where multiple clients can interact with the same node.

[KaleidoSDK](https://kaleidoswap.com/products/sdk) is the developer platform built on top of RLN and the KaleidoSwap Maker infrastructure. It provides high-level abstractions for RGB asset management, channel operations, liquidity provisioning, and atomic swap execution, exposing TypeScript and Python SDKs that simplify integration for developers.

The KaleidoSwap Maker acts as the liquidity and routing layer, providing LSP services, atomic swap infrastructure, and client connectivity.

Beyond the Desktop App, the KaleidoSwap ecosystem includes a browser extension and mobile application. Both connect to RLN through Nostr Wallet Connect and offer the same core functionality as the desktop client, allowing users to manage assets, execute swaps, and interact with RGB Lightning infrastructure from any device while maintaining full self-custody.

Together, RLN, KaleidoSDK, KaleidoSwap Maker, and the client applications form a complete open-source stack for building and using Bitcoin and RGB-based financial applications.

---

## Why KaleidoSwap builds on RGB v0.11.1

Infrastructure providers, applications, and wallets are all building on v0.11.1, which brings more contributors to the protocol and makes it more reliable. USDT, the asset most of our users want to trade, will be issued on this version.

For a non-custodial decentralized exchange, the properties RGB delivers are non-negotiable:

- **No trusted third party.** Asset transfers are peer-to-peer, validated locally by each recipient.
- **No sidechain.** No additional trust assumptions. Bitcoin's security is the security.
- **Lightning-native.** Swaps settle in milliseconds over the same channels used for BTC payments.
- **Privacy by default.** Order flow and balances are not exposed on-chain.

In September 2025, KaleidoSwap completed the [first atomic swap](https://atlas21.com/kaleidoswap-completes-first-rgb-atomic-swap-on-lightning-mainnet/) of an RGB asset on Lightning mainnet, a trustless swap of a real RGB asset settled instantly over live Lightning channels. That is the foundation KaleidoSwap is built on.

---

## The takeaway

Client-side validation, Lightning-native settlement, no sidechains, no bridges. These are not incremental improvements over existing asset platforms. They are the prerequisites for a trustless financial layer on Bitcoin.

The ecosystem is early. The infrastructure is production-ready. If you are building a wallet or application and want non-custodial RGB asset trading and atomic swaps across Bitcoin L2s, the KaleidoSDK is the starting point.

[Explore the documentation](http://docs.kaleidoswap.com), run your own RGB Lightning Node, or integrate KaleidoSDK to start building on RGB today.

---

## Sources

- RGB v0.11.1 mainnet release, 17 July 2025: [Bitcoin Magazine](https://bitcoinmagazine.com).
- RGB Protocol Association founding members and mandate: [rgb.info](https://rgb.info).
- RGB Protocol on GitHub: [rgb.protocol](https://github.com/RGB-WG) and [rgb.tools](https://rgb.tools).
- Tether USDT on RGB announcement and Paolo Ardoino statement: [Tether](https://tether.io/news/tether-to-launch-usdt-on-rgb-expanding-native-bitcoin-stablecoin-support/).
- First RGB atomic swap on Lightning mainnet, September 2025: [Atlas21](https://atlas21.com/kaleidoswap-completes-first-rgb-atomic-swap-on-lightning-mainnet/).
- KaleidoSDK (TypeScript, Python, Rust forthcoming): [GitHub](https://github.com/kaleidoswap).
- KaleidoSwap Desktop App: [releases](https://github.com/kaleidoswap/kaleidoswap-desktop/releases).

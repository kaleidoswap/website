---
title: "July 2026: Liquid Swaps, KaleidoMind on Desktop & New Extension Beta"
date: "2026-07-31"
tags: ["Release Notes"]
slug: "july-2026-release-notes"
excerpt: "KaleidoMind came to the Desktop App, swap engine started moving Liquid dollars, and the Browser Extension entered its second closed beta."
coverImage: "/blog/july-2026-release-notes/july-2026-release-notes-cover.jpg"
coverImageMobile: "/blog/july-2026-release-notes/july-2026-release-notes-cover-mobile.jpg"
coverImageCard: "/blog/july-2026-release-notes/july-2026-release-notes-cover-card.jpg"
coverImagePreview: "/blog/july-2026-release-notes/july-2026-release-notes-cover-preview.jpg"
coverImagePreviewX: "/blog/july-2026-release-notes/july-2026-release-notes-cover-preview-x.jpg"
---

July kept several tracks moving at once. [KaleidoMind](/products/ai-tools#kaleido-mind), our on-device AI agent, came to the [Desktop App](/products/desktop) as a built-in feature, still running on testnet while we finish hardening it. Our swap engine picked up the ability to move a Liquid-based dollar. The [Browser Extension](/products/extension) moved into its second closed beta with a real Liquid account of its own. And RGB-on-Liquid research kept advancing.

Here is the month, in plain terms, and where each piece stands.

---

## KaleidoMind Comes to the Desktop App

**Desktop App v0.5.0** shipped with KaleidoMind, the on-device AI agent, built in as an experimental feature. It's still running on testnet while we finish hardening it before a full public release, but you can already turn to it for everyday wallet tasks: get a quote, build a payment, buy a Lightning channel. Each one a single action you still have to confirm yourself.

The Agent tab goes further, letting KaleidoMind work on a schedule and act with more autonomy, while you watch it reason through each step in real time and can stop it mid-task with one click. Because an agent that can move money is serious, it stays marked **experimental** everywhere it appears, and every action still waits on you.

The release also brought a redesigned channel and transaction history view, asset-colored liquidity in the channels dashboard, and a shared visual overhaul (built on our own KaleidoUI design system) that made the app feel more consistent throughout.

---

## Liquid Dollars Join the Swap Engine

The trustless swap engine we started rebuilding in June, for atomic swaps across [Liquid](https://liquid.net), [Lightning](https://lightning.network), and [Arkade](https://arkadeos.com), took its next real step: a swap from **bitcoin over Lightning to L-USDT**, a dollar-pegged stablecoin on the Liquid network, going both directions.

---

## The Browser Extension's Second Closed Beta

The KaleidoSwap Browser Extension reached **v0.2.0**, its second closed beta. It's still invite-only (there's no public listing yet in the Chrome Web Store or Firefox Add-ons), but the feature set took a real step forward.

Node-less RGB is now the **default on mainnet**, holding RGB assets without running your own node, using a WASM build of rgb-lib by [Utexo](https://github.com/UTEXO-Protocol/rgb-lib-wasm). The extension also gained a full **Liquid Network account**, so you can hold and send L-BTC and other Liquid-based assets alongside everything else, syncing fast thanks to Blockstream's waterfalls protocol. If you want RGB assets over Lightning rather than on-chain, you can still connect your own RGB Lightning Node over Nostr Wallet Connect, keeping things self-custodial either way. Backups improved too: your wallet can now save an encrypted copy to your own cloud storage or a local file.

---

## A Home for Liquid, and Early Research on RGB There Too

We stood up our own self-hosted Liquid node with fast wallet indexing (via waterfalls). This is the infrastructure the Liquid features above actually run on, rather than relying on a third party.

Alongside it, we spent time on earlier-stage research: prototyping RGB-style programmable assets directly on Liquid using [Simplicity](https://simplicity-lang.org), its covenant language, including mint-and-burn rules, time-locked staking, and a full round-trip atomic swap demo between an RGB asset and a Liquid asset. We wrote it up on our blog in [RGB Meets Simplicity](/blog/rgb-on-liquid) and submitted the design as a formal proposal to the RGB protocol's own standards process ([rgb-consensus#12](https://github.com/rgb-protocol/rgb-consensus/issues/12)). It's research, not a product yet, but it points at RGB assets working natively on more than one chain.

---

## Also This Month

* The **RGB Lightning Node** reached **v0.8.0** upstream, and we're rolling it out carefully across our infrastructure.
* We published an [interactive 3D explainer](https://kaleidoswap.github.io/interop-stack/) of how Bitcoin's different layers — Lightning, Liquid, Arkade, and RGB — connect and trade with each other.
* We explored [**PIVSS**](https://kaleidoswap.github.io/pivss/), an early prototype for a marketplace where node operators get paid, in real bitcoin over Lightning, to keep verified backups of your data. It's a research project for now, tested with real BOLT12 payments, not yet a KaleidoSwap product.

---

## What Comes Next

August is about turning July's groundwork into things people can rely on. KaleidoMind on Desktop moves toward a full public release once testing wraps up. The swap engine keeps extending Liquid-dollar swaps. And the Browser Extension keeps closing the gap toward a public listing.

You can follow the work on [X](https://x.com/kaleidoswap) and [GitHub](https://github.com/kaleidoswap).

---

**Sources**

* [Desktop App releases (v0.5.0)](https://github.com/kaleidoswap/desktop-app/releases)
* [Browser Extension releases (v0.2.0)](https://github.com/kaleidoswap/web-extension/releases)
* [RGB Lightning Node releases (v0.8.0)](https://github.com/kaleidoswap/rgb-lightning-node/releases)
* [KaleidoSDK (v0.1.15)](https://docs.kaleidoswap.com)
* [rgb-lib WASM by Utexo](https://github.com/UTEXO-Protocol/rgb-lib-wasm)
* [RGB on Liquid RFC (rgb-consensus#12)](https://github.com/rgb-protocol/rgb-consensus/issues/12)
* [RGB on Liquid spike (demo + writeup)](https://kaleidoswap.github.io/rgb-on-liquid-spike/)
* [Interop Stack explainer](https://kaleidoswap.github.io/interop-stack/)
* [PIVSS](https://kaleidoswap.github.io/pivss/)
* [KaleidoSwap on GitHub](https://github.com/kaleidoswap)

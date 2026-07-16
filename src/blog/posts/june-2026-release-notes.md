---
title: "June 2026: AI Agent, New Swaps Engine & Nostr Relay"
date: "2026-06-30"
author: "KaleidoSwap Team"
tags: ["Release Notes"]
slug: "june-2026-release-notes"
excerpt: "We built KaleidoMind, an on-device AI agent, and previewed it on desktop and a mobile alpha. We started rebuilding the swap engine in Rust. The node got more capable, and we launched our own Nostr relay."
coverImage: "/blog/june-2026-release-notes/june-2026-release-notes-cover.jpg"
coverImageMobile: "/blog/june-2026-release-notes/june-2026-release-notes-cover-mobile.jpg"
coverImageCard: "/blog/june-2026-release-notes/june-2026-release-notes-cover-card.jpg"
coverImagePreview: "/blog/june-2026-release-notes/june-2026-release-notes-cover-preview.jpg"
coverImagePreviewX: "/blog/june-2026-release-notes/june-2026-release-notes-cover-preview-x.jpg"
---

Last month we put a self-custodial wallet in real hands. June was a build month. We taught the wallet to think and we started rebuilding the engine that powers it. KaleidoMind, an AI agent that runs on your own device, was built for a hackathon and previewed on desktop and mobile. And we began a fresh, ground-up version of our trading engine, designed for trustless swaps across Liquid, Lightning, and Arkade.

This was a month about foundations more than finished products. Here is the month, in plain terms, and where each piece stands.

---

## KaleidoMind, Built for the QVAC Hackathon

KaleidoMind is an AI agent that runs on your device and can help you use your wallet: get a quote, build a payment, find a contact, make a swap. We built it for the [QVAC "Unleash Edge AI" hackathon](https://dorahacks.io/hackathon/qvac-unleach-edge-ai-i/detail), which was all about AI that runs entirely on your own hardware, and submitted it on June 21.

We previewed it in two places, both clearly early and experimental:

* In the **Desktop App**, KaleidoMind comes with a chat window. You can watch it reason through a request, stop it mid-thought, and choose which model it uses. This version is a **pre-release**, still in testing, and the public release is coming in early July.
* In the **Mobile App**, we added a voice mode, so you can just speak to it. This is an **alpha** we cut for the hackathon to show what's possible. It's still rough, and there's real work to do before it's ready for a proper public beta.

Because an agent that can move money is serious, we've marked KaleidoMind as **experimental** everywhere it appears, and you stay in control of every action.

---

## A New Engine for Trustless Swaps

The bigger structural move of June: we started rebuilding our trading engine from the ground up, in **Rust**, designed from the start for trustless atomic swaps. We're building it network by network, starting with [Liquid](https://liquid.net), [Lightning](https://lightning.network), and [Arkade](https://github.com/arkade-os).

The first milestone connects two of them. The engine can now do a **swap from Lightning to Liquid**: you pay in bitcoin over Lightning, and receive tethered dollars (L-USDT) on Liquid, with no custodian holding your funds in between. Liquid is a Bitcoin sidechain built for fast, multi-asset settlement, and L-USDT is a dollar-pegged stablecoin that lives there.

We built the full process and proved it end-to-end with automated tests. It's switched on carefully while we keep building, but it's the foundation for trustless swaps across all three networks.

---

## RGB in Your Browser, Without Running a Node

The KaleidoSwap Browser Extension took a big step toward self-custodial RGB assets without the heavy lifting. Until now, holding RGB assets meant running a full node. In June we added a node-less mode that runs the RGB engine right inside the extension, thanks to the WASM build of rgb-lib by [Utexo](https://github.com/UTEXO-Protocol/rgb-lib-wasm).

This node-less mode handles on-chain RGB only, not over Lightning. So you get a choice: use node-less on-chain RGB with nothing extra to install or, if you want RGB on Lightning, connect your own RGB Lightning Node over Nostr Wallet Connect, keeping it fully self-custodial. The setup screen lets you pick either path, with a clear view of your assets and transfers, working out of the box on our test network. A new public release of the Extension carrying this work is coming in July.

---

## A More Capable Engine Under the Hood

The **RGB Lightning Node** reached **v0.7.1**, the quiet engine work that makes everything above possible. It added new ways to send assets, better tools for reading account state, and safety rails that let the agent act only on confirmed, finalized transactions. We also added early support for **BOLT12** — Lightning's next-generation reusable payment offers — bitcoin-only for now. Our developer kit, **KaleidoSDK (v0.1.11)**, was updated to match, so anyone building on KaleidoSwap gets the same improvements.

---

## We Launched Our Own Nostr Relay

KaleidoSwap now runs its own [Nostr](https://nostr.com) relay at **`wss://relay.kaleidoswap.com`**. Nostr is the open protocol we use for identity, messaging, and connecting wallets to apps. Running our own relay gives the whole ecosystem a reliable, KaleidoSwap-operated endpoint to build on.

It's already doing real work: the desktop app uses it as the default connection point for **Nostr Wallet Connect**, a standard way to let an app request a payment from your wallet while you stay in control of approving it. We built that support into the developer kit and the extension too. On the side, **`kaleidoswap.me`** can now receive Nostr "zaps".

---

## A Cleaner, Friendlier Wallet

A lot of polish landed this month. We built the chat bubbles, typing dots, and suggestion cards behind KaleidoMind's interface; tidied up the deposit and withdraw screens; and made the wallet show every kind of RGB asset, not just the basic ones. Amounts now display correctly in every currency, including those that use a comma for the decimal point. Small things, but they're what make a wallet feel finished.

---

## What Comes Next

June laid foundations. July is about turning them into releases. The Desktop App finishes testing and ships its public release in early July, KaleidoMind included. The agent gets the hardening it needs and the ability to pay for things itself in bitcoin and stablecoins, while the Mobile App experience gets the work it needs toward a real public beta. The new Rust engine extends trustless swaps across Liquid, Lightning, and Arkade. And node-less RGB in the browser moves toward mainnet.

You can follow the work on [GitHub](https://github.com/kaleidoswap).

---

**Sources**

* [RGB Lightning Node releases (v0.7.1)](https://github.com/kaleidoswap/rgb-lightning-node/releases)
* [KaleidoSDK docs](https://docs.kaleidoswap.com)
* [KaleidoMind — QVAC "Unleash Edge AI" hackathon submission](https://kaleidoswap.github.io/kaleido-mind)
* [rgb-lib WASM by utexo](https://github.com/UTEXO-Protocol/rgb-lib-wasm)
* [KaleidoSwap Extension beta](https://kaleidoswap.com/products/extension/beta)
* [KaleidoSwap on GitHub](https://github.com/kaleidoswap)

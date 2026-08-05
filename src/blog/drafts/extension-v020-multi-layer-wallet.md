---
title: "One Wallet, Every Bitcoin Layer: The Extension Enters Its Second Beta"
date: "2026-08-04"
tags: ["Announcement"]
slug: "extension-v020-multi-layer-wallet"
excerpt: "Extension v0.2.0 brings Liquid, RGB on mainnet, Spark and Arkade into one browser wallet, with a full Nostr identity and a Lightning address of your own. It is a closed beta, and testing it is the whole point."
coverImage: "/blog/extension-v020-multi-layer-wallet/extension-v020-multi-layer-wallet-cover.jpg"
coverImageMobile: "/blog/extension-v020-multi-layer-wallet/extension-v020-multi-layer-wallet-cover-mobile.jpg"
coverImageCard: "/blog/extension-v020-multi-layer-wallet/extension-v020-multi-layer-wallet-cover-card.jpg"
coverImagePreview: "/blog/extension-v020-multi-layer-wallet/extension-v020-multi-layer-wallet-cover-preview.jpg"
coverImagePreviewX: "/blog/extension-v020-multi-layer-wallet/extension-v020-multi-layer-wallet-cover-preview-x.jpg"
---

Bitcoin stopped being one thing a while ago. Payments settle on Lightning, dollars move on Liquid, assets are issued with [RGB](https://rgb.info), and newer layers like [Spark](https://www.spark.money/) and [Arkade](https://arkadeos.com/) make self-custody cheap enough to use daily. Each one works. Almost none of them work in the same wallet.

That fragmentation is the problem **Extension v0.2.0** exists to solve. One browser extension, one recovery phrase, and an account for every layer — sitting side by side on a single dashboard, with balances that merge by ticker so the same asset held in two places reads as one number.

It is still a closed beta, distributed as a signed archive to invited testers. That is deliberate. We would rather find the sharp edges with a few hundred careful users than with everyone at once.

---

## Six Layers, One Dashboard

The wallet holds **onchain Bitcoin**, **Lightning**, **RGB**, **Liquid**, **Spark** and **Arkade**, all derived from the same seed. You switch layer the way you switch account, not the way you switch app.

![The extension dashboard: total balance across every layer, with assets grouped by network and by ticker](/blog/extension-v020-multi-layer-wallet/extension-v020-dashboard.png)

Two of those layers — Liquid and Arkade — support the covenant constructions that make trust-minimised peer-to-peer swaps possible. That is not an accident. They are the foundation for the intent-based trading flows we are building next, and having them in a real wallet with real users is step one.

---

## Liquid: L-BTC, Liquid Dollars, and Every Other Liquid Asset

Liquid arrives as a first-class account, on mainnet by default. Receive, send and inspect **L-BTC**, **L-USDT** and any other Liquid asset. A fresh wallet syncs in seconds rather than minutes thanks to waterfalls quick-sync, and `liquidnetwork:` payment URIs are handled directly in the withdraw flow — paste and go.

For anyone who has been waiting on a dollar that settles on a Bitcoin sidechain in seconds for a fraction of a cent, this is the account to try first.

---

## RGB on Mainnet, Without a Node

This is the first KaleidoSwap release where you can test **RGB on Bitcoin mainnet from a browser**, with no node and no server holding your state. The wallet runs [`rgb-lib`](https://github.com/RGB-Tools/rgb-lib) compiled to WebAssembly — the [build maintained by UTEXO](https://github.com/UTEXO-Protocol/rgb-lib-wasm) — so client-side validation happens client-side, in your tab.

You can:

- send and receive RGB assets, with blinded invoices created for you
- manage your RGB UTXOs and asset allocations
- keep state backed up to encrypted cloud storage and to a local file, refreshed on every receive

If you want RGB **over Lightning**, connect your own [RGB Lightning Node](https://github.com/RGB-Tools/rgb-lightning-node) — over an authenticated HTTPS API or over [NWC](https://nwc.dev/) — and pay and receive RGB assets on Lightning while staying in control of your keys. You choose node-less or node-connected during onboarding; the two backings are mutually exclusive by design.

The reason we care about getting this tested now is simple: issuers are preparing to put real stablecoins on RGB. When that happens, the wallet holding them should already be boring.

---

## A Full Nostr Identity, and the Open Web

The extension is a proper web citizen, not just a balance viewer. Sites you connect can request **Nostr event signing** and use it to log you in, with per-app permissions and spending limits that you set and can revoke from one screen. Zaps work end to end, with receipts validated and matched back to your activity feed.

On the Lightning side: **LNURL-auth, LNURL-pay and LNURL-withdraw**, **WebLN**, **WebBTC**, and Lightning addresses. New connections start from a conservative default rather than a blank cheque, and Connected Apps shows you every permission you have granted, with a revoke button next to each.

It also works the other way around. Pair the wallet to other **NWC** clients by QR, give them an amount-aware budget, and use KaleidoSwap as the wallet behind apps you already like.

---

## Your Own Lightning Address

Claim a nickname and get a Lightning address at **you@kaleidoswap.me**, free, backed by Spark so payments reach you while you are offline. Use it to receive payments, to receive zaps, and as your **NIP-05** identifier on Nostr. Availability is checked live as you type, and the handle repairs itself if a restore leaves it dangling.

One human-readable name, working across payments and identity, with no server holding your funds.

![The receive screen: pick the destination layer — RGB, Spark, Arkade or Liquid — and get one branded QR with every matching address underneath](/blog/extension-v020-multi-layer-wallet/extension-v020-receive.png)

---

## An Exit to Dollars, When You Need One

Not everything you need to pay lives on Bitcoin yet. Through [Flashnet](https://flashnet.xyz/) Orchestra, the wallet can send from **BTC, Lightning or Spark** and deliver **USDT or USDC** to an external address, and bring value back in the same way. Routes are quoted exact-out before you commit, orders are tracked persistently, and a transfer in flight survives the extension being closed.

You can also hold **USDB**, the Spark stablecoin, and earn its reward rate — shown live in the wallet, and variable. *Nothing here is financial advice.*

![The swap screen quoting BTC into USDB, with no exchange account in between](/blog/extension-v020-multi-layer-wallet/extension-v020-swap.png)

---

## Four Asset Protocols You Can Actually Compare

**RGB**, **Liquid**, **Spark** and **Arkade** — four different approaches to issuing assets on Bitcoin, all of them send-and-receive on mainnet, all in the same wallet with the same seed. As far as we know, there is nowhere else you can put your own funds through all four and judge them side by side.

![Protocol settings showing Spark, Arkade, RGB and Liquid all connected out of the box](/blog/extension-v020-multi-layer-wallet/extension-v020-protocols.png)

That comparison is worth more than any explainer we could write.

---

## Everyday Details That Matter

- **Passkey login** — unlock with the authentication your device already has
- **8 fiat display currencies** and **9 languages**, including Korean and Chinese
- **Open in a full browser tab** when the side panel gets cramped
- Hide assets you would rather not see on your dashboard
- Faster cold start, and a service worker that sleeps while the wallet is locked
- Confirmations that show destination, amount and network fee before you approve — no blind signing

---

## What Comes Next

The roadmap from here is the reason the layers are in one wallet in the first place:

- **Liquid ↔ Lightning atomic swaps**
- **Peer-to-peer submarine swaps**
- **Peer-to-peer RGB asset trading**
- **Connection to Mosaik**, our covenant-based Liquid DEX
- **Covenant contract interaction** — signing Liquid transactions and Simplicity contracts, and an Arkade toolkit for scripts and contracts, opening the door to peer-to-peer lending and intent-based markets built only on Bitcoin layers

---

## Help Us Break It

There is a **Send Feedback** screen inside the extension. Every report shortens the path to an open-source, publicly installable release — this beta exists precisely so the wallet is properly tested before that happens.

If you want in, [request beta access](https://kaleidoswap.com/products/extension/beta). If you want the full technical detail — every fix, every hardening change in the 0.2 line — the [extension documentation](https://docs.kaleidoswap.com) covers it.

**Sources**

- [RGB Protocol](https://rgb.info) — client-side validation on Bitcoin
- [`rgb-lib`](https://github.com/RGB-Tools/rgb-lib) and [`rgb-lib-wasm`](https://github.com/UTEXO-Protocol/rgb-lib-wasm) — the RGB wallet library running in the extension
- [RGB Lightning Node](https://github.com/RGB-Tools/rgb-lightning-node) — RGB over Lightning
- [Nostr Wallet Connect](https://nwc.dev/) — the pairing protocol behind connected apps
- [KaleidoSwap Documentation](https://docs.kaleidoswap.com) — extension guides

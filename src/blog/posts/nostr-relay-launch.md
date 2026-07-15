---
title: "KaleidoSwap Now Runs Its Own Nostr Relay"
date: "2026-06-18"
tags: ["Announcement"]
slug: "nostr-relay-launch"
excerpt: "KaleidoSwap launched wss://relay.kaleidoswap.com, an open Nostr relay that powers wallet identity, app connections, and order discovery."
coverImage: "/blog/images/nostr-launch/nostr-launch-cover.jpg"
coverImageMobile: "/blog/images/nostr-launch/nostr-launch-cover-mobile.jpg"
coverImageCard: "/blog/images/nostr-launch/nostr-launch-cover-card.jpg"
coverImagePreview: "/blog/images/nostr-launch/nostr-launch-cover-preview.jpg"
coverImagePreviewX: "/blog/images/nostr-launch/nostr-launch-cover-preview-x.jpg"
---

KaleidoSwap is live with its own Nostr relay at `wss://relay.kaleidoswap.com`. It is public, open, and free for anyone to use.

If that sentence raised a few questions, here is the short version of what it means and why it matters.

## What Is a Nostr Relay?

Nostr is a simple, open protocol for sending signed messages across a network of independent servers. Those servers are called relays. A relay accepts messages from people, stores them, and hands them back to anyone who asks. Apps connect to several relays at once, so no single company sits in the middle and no one can quietly switch the network off.

The catch is that those relays belong to other people. We would rather not rely on other companies for something this important, so we run our own.

If you want to know more about Nostr, check the [Protocol Overview](https://nostr.how/en/the-protocol) for a generic understanding and the [Developer Guide](https://nostrcg.github.io/devguide/) for all the technical details.

## Nostr inside a Bitcoin Wallet

KaleidoSwap is built on a simple principle. You should control your money, your identity, and your voice. We care about freedom technology, and about speech that no company can switch off. Nostr fits that goal. It is an open network with no owner, no account, and no gatekeeper, which makes it a natural home for a self-custody wallet.

Nostr already runs through a lot of KaleidoSwap.

- **Connecting your apps** — [Nostr Wallet Connect](https://github.com/nostr-protocol/nips/blob/master/47.md) lets the mobile app and browser extension talk to your own node running in the desktop app, instead of a middleman.
- **Login and zaps** — The [Browser Extension](/products/extension) signs you in with your Nostr identity, and lets you send zaps, which are instant Lightning tips.
- **Zaps to your name** — Receiving [zaps](https://github.com/nostr-protocol/nips/blob/master/57.md) on a kaleidoswap.me address is coming soon to the extension.
- **Safe backups** — Your wallet data and recovery phrase can be backed up in encrypted form over Nostr.
- **Private chat with payments** — Message your contacts privately, and request or send money right inside the chat.
- **A shared order book** — Trades are posted as Nostr messages, so the order book stays open instead of living on one company's server.

## Why We Run Our Own Nostr Relay

We did not want all of that to depend on infrastructure other people run. So we built and now operate our own relay. It still talks to the rest of the Nostr network, because the protocol is shared. We just no longer have to assume someone else's server will be up.

The relay is open and dependable. There is no fee, and no account to create. Anyone publishing on Nostr can use it without asking permission. Every connection is encrypted, with certificates that renew on their own. The goal is faster delivery and higher uptime for KaleidoSwap users.

## How to Add a Nostr Relay

If you use the KaleidoSwap wallet or browser extension, you already have it. The relay ships as a default, so there is nothing to set up.

If you use any other Nostr app such as [Primal](https://primal.net/), [Damus](https://damus.io/), or [Amethyst](https://amethyst.social/), add this to your list of relays:

```
wss://relay.kaleidoswap.com
```

That is the whole setup. Your app will start using it right away.

KaleidoSwap is a non-custodial, Bitcoin-native exchange, and running our own relay is one more piece of the stack we now control end to end. You are welcome to use it, whether or not you use KaleidoSwap.

Learn more in [the docs](https://docs.kaleidoswap.com).

## Our communication on Nostr

KaleidoSwap has started publishing on Nostr. Not just as a X mirror, not as a backup plan. It is a thoughtful presence on the only open social network that shares our values. We will share product updates, release notes, and ecosystem news.

The audience is small, but specific: Bitcoin developers, cypherpunks, people who have already thought carefully about open protocols. That is exactly who we want to reach first. Nostr is not where we go for scale. It is where we go for signal.

Running our own relay made the commitment concrete. The company that builds self-custody infrastructure now controls its own communication stack.

Follow us on Nostr [@kaleidoswap](https://primal.net/p/nprofile1qqs9y7m3whzhhwrr0380xaryk09v48efx8gpulywx5lqk6ldh6crvjgvvrgya)

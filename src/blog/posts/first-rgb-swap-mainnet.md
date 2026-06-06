---
title: "The First Ever RGB Asset Swap on Lightning Mainnet"
date: "2025-09-30"
author: "KaleidoSwap Team"
tags: ["Deep Dive"]
slug: "first-rgb-swap-mainnet"
excerpt: "KaleidoSwap has executed the first atomic swap of an RGB asset over the Lightning Network on mainnet — a historic milestone for Bitcoin's Layer 2 ecosystem."
coverImage: "/blog/images/first-rgb-swap-mainnet/first-rgb-swap-mainnet-cover.png"
coverImageMobile: "/blog/images/first-rgb-swap-mainnet/first-rgb-swap-mainnet-cover-mobile.png"
coverImageCard: "/blog/images/first-rgb-swap-mainnet/first-rgb-swap-mainnet-cover-card.png"
coverImagePreview: "/blog/images/first-rgb-swap-mainnet/first-rgb-swap-mainnet-cover-preview.png"
coverImagePreviewX: "/blog/images/first-rgb-swap-mainnet/first-rgb-swap-mainnet-cover-preview-x.png"
---

We are excited to announce a **historic milestone for Bitcoin's Layer 2 ecosystem**: KaleidoSwap has executed the **first atomic swap of an RGB asset over the Lightning Network on mainnet.**

This was not a testnet experiment. It happened live on Bitcoin mainnet. Using real RGB assets, Lightning channels, and a trustless atomic swap. Before jumping into the transaction details, let's look at *how* this is possible at all.

### TL;DR

- KaleidoSwap ran the **first trustless RGB20 swap on Lightning mainnet**
- Asset: **tUSDT** (bridged USD₮ via UTEXO.com into RGB)
- Swap: **≈12k sats → 13 tUSDT**, executed atomically via HTLCs
- Channel: **100k sats + 90 tUSDT**, opened/closed with RGB commitments
- Settlement: **instant, private, no mempool trace**
- Hardware: both nodes on **Raspberry Pi 4 (4GB)**
- Milestone: KaleidoSwap is now **steps away from public launch**

---

### How RGB Asset Swaps Work on Lightning

RGB extends Lightning to carry **assets beyond BTC**. With RGB-enabled Lightning channels, atomic swaps become possible under the same trustless guarantees as BTC payments.

**How it works:**

- **Atomicity via HTLCs** — Both assets are tied to the same hashlock & preimage. Either the swap fully succeeds, or nothing happens.
- **Circular payments** — Example: Alice sends BTC to Bob, while Bob sends USDT back to Alice. Both are locked to the same preimage, ensuring fairness.
- **Advantages:**

1. On-chain fees only for channel opening/closing
2. Instant settlement, no double spend risk
3. No frontrunning (nothing shows up in mempool)
4. Superior privacy & price certainty vs. AMM DEXes

![RGB Atomic swap on Lightning](/blog/images/first-rgb-swap-mainnet/first-rgb-swap-mainnet-2.jpg)

**KaleidoSwap's model:**

- Alice (taker) requests a quote for BTC/USDT.
- Bob (maker/LSP) replies with a price.
- If Alice accepts, the swap executes instantly and trustlessly over Lightning.

![Market Maker trading on KaleidoSwap desktop app](/blog/images/first-rgb-swap-mainnet/first-rgb-swap-mainnet-3.png)

We covered the mechanics — now let's look at the specific asset we used for the first swap.

### The Asset: tUSDT on RGB

The asset swapped was `tUSDT` — an **RGB20** representation of USD₮ bridged into RGB via the **UTEXO** bridge, which enables conversions from Ethereum, Polygon, BSC, Tron, and other networks into the RGB ecosystem. `tUSDT` was first deposited **on-chain into the market maker's wallet**. After settlement, it was used to open the **first ever RGB Lightning channel on mainnet**.

👉 Asset info: `rgb:nkHbmy97-R4cjRCe-j~VvT~E-0UQ0OW8-jOCCW6O-EqeCq9M` (Bitcoin Tribe Registry)

---

### Roles

Let's look at the actors involved and how they interacted.

**Alice (the Taker / End User)**

- Used the **KaleidoSwap desktop app** as a normal user.
- Wanted to exchange her sats for stablecoins (`tUSDT`).
- Interacted via UI only, no liquidity management needed.

**Bob = KaleidoSwap Maker / LSP (Lightning Service Provider)**

- Ran the **KaleidoSwap backend** and acted as a **Lightning Service Provider (LSP)**.
- Provided both sats and `tUSDT` liquidity inside the channel.
- Quoted prices to Alice via the **RFQ model** and executed the swap trustlessly.
- Managed the underlying Lightning and RGB infrastructure.

👉 In short: **Alice is a regular user, KaleidoSwap is the counterparty providing liquidity and infrastructure.**

---

### The Channel Setup

The next step was to set up an RGB-enabled Lightning channel to carry both sats and `tUSDT`.

👉 Channel opening transaction:
[mempool.space](https://mempool.space/it/tx/5c7c4b4dcd41322f69734c8bb7514b8b03cc972db5b26953f0e932f0dab291dd)

This transaction shows the RGB asset being spent with an **OP\_RETURN commitment** into a **Lightning 2-of-2 multisig channel**.

- Opened by **KaleidoSwap (Maker/LSP)** after receiving bridged tUSDT.
- **Funded Alice (taker)** with sats and `tUSDT` liquidity.

**Channel balances after 6 confirmations:**

**Bitcoin (sats):**

- Alice: 19,000 sats + 1000 sats reserved for fees
- KaleidoSwap: 79,000 sats + 1000 sats reserved for fees
- **Total capacity:** 100,000 sats

**RGB asset (`tUSDT`):**

- Alice: 0 `tUSDT`
- KaleidoSwap: 90 `tUSDT`

Alice could now use her sats to **buy assets off-chain from Bob**, privately and instantly, through the **KaleidoSwap desktop app**.

![Channel balances in KaleidoSwap](/blog/images/first-rgb-swap-mainnet/first-rgb-swap-mainnet-4.png)

---

### The First Swap

With the channel funded and balances confirmed, Alice was able to execute the **first ever RGB atomic swap on Lightning mainnet**:

- **Swap 1:** 6,921 sats → 7.430145 `tUSDT`
- **Swap 2:** 5,250 sats → 5.638284 `tUSDT`
- **Total:** 13.0684 `tUSDT`

The execution was **instant**, fully private, and cost only a few sats in fees.

![First RGB Atomic Swap on Lightning Network Mainnet](/blog/images/first-rgb-swap-mainnet/first-rgb-swap-mainnet-cover.png)

![Response of the /listswaps endpoint of RLN](/blog/images/first-rgb-swap-mainnet/first-rgb-swap-mainnet-6.png)

This marks the **first time a valuable RGB asset has been exchanged trustlessly on Lightning mainnet** — between an everyday user (Alice) and a market maker (Bob).

![Swap completion confirmation](/blog/images/first-rgb-swap-mainnet/first-rgb-swap-mainnet-7.png)

---

### Closing the Channel

Alice could have kept the channel open to spend her new stablecoins directly over Lightning. Instead, we chose to **cooperatively close the channel from KaleidoSwap to settle them onchain**.

👉 Closing transaction:
[bf8cc66e...2482fd](https://mempool.space/it/tx/bf8cc66e928079558e2a789ce5a0ac720b936776670378c734f18117c22482fd)

- On-chain, this looks like a **standard Lightning channel close**, with one additional output for the RGB commitment.
- Importantly: **no information about asset balances is visible on-chain**.

Thanks to **RGB's client-side validation**, only Alice and Bob know the final balances.

After confirmation, both could:

- Move sats or `tUSDT` to cold storage
- Spend on-chain
- Or open new Lightning channels

---

### A Step Toward Our Vision

This wasn't a simulation or a demo environment. It was **KaleidoSwap making history**: the first trustless exchange of a valuable RGB20 asset (`tUSDT`) over Lightning mainnet, connecting a regular user with our liquidity infrastructure.

For us, this moment is more than just numbers on a screen. It's proof that RGB + Lightning is ready to carry our vision of a Bitcoin-native, privacy-first DEX.

This mainnet run validates the KaleidoSwap stack end-to-end and puts us within arm's reach of a public rollout. Stay tuned as we expand markets, add new assets, and push what is possible on Bitcoin today.

---

### Bonus: Raspberry Pi Power

Both RGB Lightning nodes used in this historic swap ran on **Raspberry Pi 4 (4GB RAM)** — also running a Bitcoin full node and Electrum server (used by the two RLN).

Despite the modest hardware, the nodes handled channel management and swaps seamlessly, proving that **low-cost, sovereign hardware can support advanced Bitcoin Layer 2 functionality.**

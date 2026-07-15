---
title: "The First Bitcoin Atomic Swap of an RGB Asset on Lightning"
date: "2025-09-30"
tags: ["Deep Dive"]
slug: "first-rgb-swap-mainnet"
excerpt: "KaleidoSwap executed the first Bitcoin atomic swap of an RGB asset on the Lightning Network, proving private, non-custodial trading on Bitcoin is real."
coverImage: "/blog/images/first-rgb-swap-mainnet/first-rgb-swap-mainnet-cover.jpg"
coverImageMobile: "/blog/images/first-rgb-swap-mainnet/first-rgb-swap-mainnet-cover-mobile.jpg"
coverImageCard: "/blog/images/first-rgb-swap-mainnet/first-rgb-swap-mainnet-cover-card.jpg"
coverImagePreview: "/blog/images/first-rgb-swap-mainnet/first-rgb-swap-mainnet-cover-preview.jpg"
coverImagePreviewX: "/blog/images/first-rgb-swap-mainnet/first-rgb-swap-mainnet-cover-preview-x.jpg"
---

We are excited to announce a historic milestone for Bitcoin's Layer 2 ecosystem: KaleidoSwap has executed the first atomic swap of an [RGB](https://rgb.info) asset over the [Lightning Network](https://lightning.network/).

This was not a testnet experiment. It happened live on Bitcoin mainnet. Using real RGB assets, Lightning channels, and a trustless atomic swap.

Here are the transaction details:

- **Asset** — tUSDT (bridged USDT via [UTEXO](https://www.utexo.com/) into RGB)
- **Swap** — ≈12k sats → 13 tUSDT, executed atomically via [HTLCs](https://bitcoinops.org/en/topics/htlc/)
- **Channel** — 100k sats + 90 tUSDT, opened/closed with RGB commitments
- **Settlement** — instant, private, no mempool trace
- **Hardware** — both nodes on [Raspberry Pi 4](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/) (4GB)

---

### How We Executed an RGB Asset Swap on Lightning Network

RGB extends Lightning to carry assets beyond BTC. With RGB-enabled Lightning channels, atomic swaps become possible under the same trustless guarantees as BTC payments.

How it works:

- **Atomicity via HTLCs** — Both assets are tied to the same hashlock & preimage. Either the swap fully succeeds, or nothing happens.
- **Circular payments** — Example: Alice sends BTC to Bob, while Bob sends [USDT](https://tether.to/en/) back to Alice. Both are locked to the same preimage, ensuring fairness.

This brings some important advantages:

- On-chain fees only for channel opening/closing
- Instant settlement, no double spend risk
- No frontrunning (nothing shows up in mempool)
- Superior privacy & price certainty vs. [AMM](https://www.investopedia.com/terms/a/automated-market-maker-amm.asp) DEXs

![RGB Atomic swap on Lightning](/blog/images/first-rgb-swap-mainnet/first-rgb-swap-mainnet-2.jpg)

Translating it on the **KaleidoSwap's model**:

- Alice (taker) requests a quote for BTC/USDT.
- Bob (maker/[LSP](https://docs.lightning.engineering/the-lightning-network/liquidity/lightning-service-provider)) replies with a price.
- If Alice accepts, the swap executes instantly and trustlessly over Lightning.

![Market Maker trading on KaleidoSwap desktop app](/blog/images/first-rgb-swap-mainnet/first-rgb-swap-mainnet-3.png)

For a beginner-friendly primer, check out The Bitcoin Manual's ["What Are RGB Asset Swaps?"](https://thebitcoinmanual.com/articles/rgb-asset-swaps/) article.

### Using a Bitcoin-native stablecoin: tUSDT on RGB

The asset swapped was **tUSDT**, an [RGB20](https://docs.rgb.info/rgb-contract-implementation/schema/non-inflatable-fungible-asset-schema) representation of USDT bridged into RGB via the **UTEXO bridge**, which enables conversions from [Ethereum](https://ethereum.org/), [Polygon](https://polygon.technology/), [BSC](https://www.bnbchain.org/), [Tron](https://trondao.org/), and other networks into the RGB ecosystem. `tUSDT` was first deposited on-chain into the market maker's wallet. After settlement, it was used to open the **first ever [RGB Lightning](https://github.com/RGB-Tools/rgb-lightning-node) channel on mainnet**.

Asset info: `rgb:nkHbmy97-R4cjRCe-j~VvT~E-0UQ0OW8-jOCCW6O-EqeCq9M` ([Bitcoin Tribe Registry](https://registry.bitcointribe.app/))

### Roles in a Trustless Bitcoin Atomic Swap

Let's look at the actors involved and how they interacted.

**Alice (the Taker / End User)**

- Used the [KaleidoSwap Desktop App](https://kaleidoswap.com/products/desktop) as a normal user.
- Wanted to exchange her sats for stablecoins (`tUSDT`).
- Interacted via UI only, no liquidity management needed.

**Bob = KaleidoSwap Maker / LSP (Lightning Service Provider)**

- Ran the KaleidoSwap backend and acted as a Lightning Service Provider (LSP).
- Provided both sats and `tUSDT` liquidity inside the channel.
- Quoted prices to Alice via the [RFQ model](https://www.cmegroup.com/education/courses/tools-for-option-analysis/what-is-an-rfq.html) and executed the swap trustlessly.
- Managed the underlying Lightning and RGB infrastructure.

In short: Alice is a regular user, KaleidoSwap is the counterparty providing liquidity and infrastructure.

### RGB-Enabled Lightning Channel for the Bitcoin Atomic Swap

The next step was to set up an RGB-enabled Lightning channel to carry both sats and `tUSDT`.

Check out channel opening transaction on [mempool.space](https://mempool.space/it/tx/5c7c4b4dcd41322f69734c8bb7514b8b03cc972db5b26953f0e932f0dab291dd).

This transaction shows the RGB asset being spent with an [OP\_RETURN](https://en.bitcoin.it/wiki/OP_RETURN) commitment into a **Lightning 2-of-2 multisig channel**.

The channel must be:

- **Opened by KaleidoSwap (Maker/LSP)** after receiving bridged tUSDT.
- **Funded Alice (taker)** with sats and `tUSDT` liquidity.

After 6 confirmations, the channel balances will be:

- **Bitcoin (sats):**
	- Alice: 19,000 sats + 1000 sats reserved for fees
	- KaleidoSwap: 79,000 sats + 1000 sats reserved for fees
	- Total capacity: 100,000 sats
- **RGB asset (`tUSDT`):**
	- Alice: 0 `tUSDT`
	- KaleidoSwap: 90 `tUSDT`

Alice could now use her sats to buy assets off-chain from Bob, privately and instantly, through the KaleidoSwap Desktop App.

![Channel balances in KaleidoSwap](/blog/images/first-rgb-swap-mainnet/first-rgb-swap-mainnet-4.png)

---

### The First Trustless RGB Atomic Swap on Lightning

With the channel funded and balances confirmed, Alice was able to execute the **first ever RGB atomic swap on Lightning mainnet**:

- **Swap 1** — 6,921 sats → 7.430145 `tUSDT`
- **Swap 2** — 5,250 sats → 5.638284 `tUSDT`
- **Total** — 13.0684 `tUSDT`

The **execution was instant**, fully private, and cost only a few sats in fees.

![First RGB Atomic Swap on Lightning Network Mainnet](/blog/images/first-rgb-swap-mainnet/first-rgb-swap-mainnet-cover.jpg)

![Response of the /listswaps endpoint of RLN](/blog/images/first-rgb-swap-mainnet/first-rgb-swap-mainnet-6.png)

This marks the first time a valuable RGB asset has been exchanged trustlessly on Lightning mainnet between an everyday user (Alice) and a market maker (Bob).

![Swap completion confirmation](/blog/images/first-rgb-swap-mainnet/first-rgb-swap-mainnet-7.png)

---

### Channel Closing: Private Settlement via RGB Client-Side Validation

Alice could have kept the channel open to spend her new stablecoins directly over Lightning. Instead, we chose to cooperatively close the channel from KaleidoSwap to settle them onchain.

Check out the closing transaction on [mempool.space](https://mempool.space/it/tx/bf8cc66e928079558e2a789ce5a0ac720b936776670378c734f18117c22482fd).

What is remarkable about this transaction is:
- On-chain, this looks like a **standard Lightning channel close**, with one additional output for the RGB commitment.
- Information about asset balances is **not visible on-chain**.

Thanks to RGB's [client-side validation](https://docs.rgb.info/distributed-computing-concepts/client-side-validation), only Alice and Bob know the final balances.

After confirmation, both could:

- Move sats or `tUSDT` to cold storage
- Spend on-chain
- Or open new Lightning channels

### Running an RGB Lightning Node on a Raspberry Pi 4

Both RGB Lightning nodes used in this historic swap ran on **Raspberry Pi 4 (4GB RAM)**, which was also running a Bitcoin full node and an [Electrum server](https://electrumx.readthedocs.io/) used by the two RLN.

Despite the modest hardware, the nodes handled channel management and swaps seamlessly, proving that low-cost, sovereign hardware can support advanced Bitcoin Layer 2 functionality.

### A Step Toward a Non-Custodial, Bitcoin-Native Lightning DEX

This wasn't a simulation or a demo environment. It was **KaleidoSwap making history**: the first trustless exchange of a valuable RGB20 asset (`tUSDT`) over Lightning mainnet, connecting a regular user with our liquidity infrastructure.

For us, this moment is more than just numbers on a screen. It's proof that RGB + Lightning is ready to carry our vision of a Bitcoin-native, privacy-first DEX.

This mainnet run validates the KaleidoSwap stack end-to-end and puts us within arm's reach of a public rollout. Stay tuned as we expand markets, add new assets, and push what is possible on Bitcoin today.

To get involved:

- Check out what we are building on [GitHub](https://github.com/kaleidoswap)
- Come say hi on our [Telegram group](https://t.me/kaleidoswap)
- Follow us on [X](https://x.com/kaleidoswap)

---
title: "RGB Meets Simplicity: Programmable Seals on Liquid"
date: "2026-07-13"
author: "KaleidoSwap Team"
tags: ["Deep Dive"]
slug: "rgb-on-liquid"
excerpt: "RGB assets anchored on Liquid, swapped across chains with no custodian, and a Simplicity covenant enforcing RGB anchoring — a reproducible proof of concept."
coverImage: "/blog/rgb-liquid/rgb-liquid-cover.jpg"
coverImageMobile: "/blog/rgb-liquid/rgb-liquid-cover-mobile.jpg"
coverImageCard: "/blog/rgb-liquid/rgb-liquid-cover-card.jpg"
coverImagePreview: "/blog/rgb-liquid/rgb-liquid-cover-preview.jpg"
coverImagePreviewX: "/blog/rgb-liquid/rgb-liquid-cover-preview-x.jpg"
---

*RGB keeps an asset's contracts and state with its holders; the chain only carries a small commitment inside an ordinary transaction. We took that portability to Liquid, looking for two things: interoperable assets across Bitcoin's layers, and the programmability that Simplicity can give RGB tokens. Here is what we built, and where it leads.*

[RGB](https://rgb.info/) lets you issue and move assets on Bitcoin without changing Bitcoin itself. The asset's history stays off-chain, held and validated by the people who own it, while only a tiny fingerprint touches the blockchain. It is private by default, it scales well, and it keeps users in full self-custody. KaleidoSwap already builds on RGB for Bitcoin and the [Lightning Network](https://lightning.network/).

The protocol asks very little of the chain underneath: a coin to serve as a seal, and a place to put a 32-byte commitment. Nothing about that is Bitcoin-specific. Any chain with a UTXO model can, in principle, anchor RGB assets.

[Liquid](https://liquid.net/) is the natural first candidate. It is a Bitcoin sidechain with one-minute blocks, confidential transactions that hide amounts, and a federated peg. It also carries something Bitcoin's base layer does not: [Simplicity](https://blog.blockstream.com/simplicity-launches-on-liquid-mainnet/), a formally verifiable smart-contract language, live on mainnet since July 2025. Anchoring RGB there connects the same asset technology across base chain, Lightning, and sidechain, with atomic swaps as the glue. And since whatever the chain can express becomes a spending condition on the seal, Simplicity opens the door to RGB tokens with rules that neither Bitcoin Script nor Lightning can enforce today.

So we built a reproducible proof of concept to answer one question: can RGB assets live natively on Liquid, with no bridges, no wrapped tokens, and no parallel protocol? The answer is yes. The patch needed upstream is 207 lines, every existing test still passes, and the rest of the production RGB stack consumes it unchanged.

Everything in this article, from the patch to the steps that reproduce each claim, is open source at [github.com/kaleidoswap/rgb-on-liquid-spike](https://github.com/kaleidoswap/rgb-on-liquid-spike).

## Why interoperability across Bitcoin's layers starts at the chain

An RGB asset has two layers, and only one of them is the subject here.

The first is [client-side validation](https://docs.rgb.info/distributed-computing-concepts/client-side-validation): the asset's history, who issued it, who sent what to whom, the rules it follows. This lives off-chain and is checked by each receiver. It does not depend on any particular blockchain.

The second is the **anchor**. To prevent double-spending, every transfer is bound to a real on-chain transaction through a [single-use seal](https://docs.rgb.info/distributed-computing-concepts/single-use-seals
): a coin that can be spent exactly once. Spending that coin in a transaction that carries a commitment to the transfer settles it permanently. This is the layer that touches real transactions, so this is where chain-specific assumptions can hide.

Two consequences of the design matter later in this article. First, a contract is bound to one chain by its genesis: an asset issued for Bitcoin and a nominally identical asset issued for Liquid are, to the protocol, two separate contracts. Second, because a seal is an ordinary coin, **the spending conditions of the underlying chain become spending conditions on the asset**. On Bitcoin that means [Bitcoin Script](https://en.bitcoin.it/wiki/Script). On Liquid, it now means Simplicity.

![RGB's two layers: an off-chain constellation of contract state above, the on-chain anchor layer below, joined by a single seal](/blog/rgb-liquid/rgb-two-layers.svg)
*The two layers of an RGB asset. Everything above the line is validated by the holders; the chain sees one coin being spent and one 32-byte commitment.*

## RGB Support for Liquid Already Exists Upstream

The first thing we found, reading the RGB code that production wallets actually use, is that it already names Liquid. The `Layer1` enum has a `Liquid` variant. The network list includes `LiquidMainnet` and `LiquidTestnet`. A contract's genesis already records which chain it belongs to. The slot is reserved; it has simply never been wired to the code that checks transactions.

The second thing we found is that the cryptography already works. RGB hides its commitment inside an ordinary-looking [Taproot](https://bitcoinops.org/en/topics/taproot/
) output, and the byte format of that output is identical on Bitcoin and Liquid, because both chains follow [BIP-341](https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki). We checked this directly: the standard RGB verifier, with no modifications, accepted an output in a confirmed Liquid transaction as carrying a valid RGB commitment.

So most of the work was already done. The missing piece was the code that reads a finished transaction, which was written for Bitcoin transactions and not Liquid ones.

## The fix was 207 lines

We traced every place where the verification path depends on a Bitcoin transaction type. There are exactly three, and all three pin to the same concrete type from the rust-bitcoin library. That type cannot deserialize a Liquid transaction, whose format differs: confidential amounts, an explicit asset on every output, an explicit fee output.

What those three call sites actually need from a transaction is small. The list of inputs, to confirm the seal was closed. The script bytes of the outputs, to recover the commitment. Nothing else: no witness data, no fees, no signatures.

So the fix is to hide that one type behind a small trait with three methods: a transaction's id, its inputs, and its output scripts. The verification functions become generic over it. In one line:

```rust
// before
fn verify(&self, msg: &Commitment, tx: &bitcoin::Transaction) -> Result<...>;

// after
fn verify<W: WitnessTx>(&self, msg: &Commitment, tx: &W) -> Result<...>;
```

`bitcoin::Transaction` implements the new trait directly, so every existing Bitcoin caller compiles and behaves exactly as before. Any Liquid transaction type implements the same three methods and joins the same verification path.

The whole change is 207 lines across seven files. Three things are worth stating plainly:

- It is **non-breaking**. Every existing Bitcoin user of the library keeps working with no changes.
- It **passes every existing test**. All 45 tests in the library's own suite still pass, none modified.
- The rest of the RGB stack **compiles against it unchanged**. We pulled in the four downstream production libraries (`rgb-ops`, `rgb-schemas`, `rgb-invoicing`, `rgb-aluvm`) and not one of them needed a source change.

That last point is the strongest result. The standing worry with any change to a consensus library is downstream breakage. Here, the entire production ecosystem consumed the patched library without noticing.

![The WitnessTx trait connecting the RGB verification path to both bitcoin::Transaction and elements::Transaction](/blog/rgb-liquid/witnesstx-bridge.svg)
*The whole gap, in one picture: three verification call sites, three trait methods, two chains on the same path.*

The trait also says something about the future. Nothing in those three methods is specific to Liquid. Any Bitcoin layer with a UTXO-shaped model could implement them: [Arkade](https://arkadeos.com)'s virtual UTXOs, [Spark](https://www.spark.money)'s statechain leaves, or whatever comes next. That is the direction this work points toward: portable, client-side assets across Bitcoin's layers, with peer-to-peer atomic swaps as the router between them.

With the change in place, we issued a real [RGB20](https://docs.rgb.info/rgb-contract-implementation/schema/non-inflatable-fungible-asset-schema) asset on Liquid. Not a simplified mock: the actual asset schema and the actual builder tools that wallets use for Bitcoin RGB transfers, pointed at Liquid instead. A real contract id, a real transfer from one holder to another with change, anchored on a Liquid transaction and verified end to end. The proposed upstream change is written up as an [RFC](https://github.com/kaleidoswap/rgb-on-liquid-spike/blob/main/RFC.md) for the maintainers, submitted as [rgb-consensus#12](https://github.com/rgb-protocol/rgb-consensus/issues/12).

## Swapping RGB assets across chains, without a custodian

Because an RGB contract is tied to one chain, you cannot simply move a single asset from Bitcoin to Liquid and back. There is a practical alternative that works today, and it needs no third party.

You can **atomically swap** an RGB asset on Bitcoin for an RGB asset on Liquid. Atomic means the trade either completes for both sides or does not happen at all. At no moment can one party walk away with both assets.

We demonstrated it on Bitcoin and Liquid regtest: a real RGB token on each chain, swapped in a single linked operation. The two sides are tied together by one shared secret. Each new asset lands in an output that can only be claimed by revealing that secret, and revealing it on one chain publishes it for the other. If one side never acts, nothing moves. Neither side can cheat. Both legs were verified by the same patched verification call, once against a Bitcoin transaction and once against a Liquid one.

We then hardened the mechanism into its production shape, all reproducible in the same repository:

- **A full Hash Time-Locked Contract** on both chains, with the claim branch bound to the claimer's key and a refund branch behind a relative timeout. The same script bytes work on Bitcoin and Liquid, and every failure path was tested against consensus: a wrong preimage is rejected, an early refund is rejected, a refund after the timeout goes through.
- **Confidential transfers.** The same RGB20 transfer with the closed seal, the new seal, and the change all blinded. The commitment sits in the [scriptPubKey](https://learnmeabitcoin.com/technical/transaction/output/scriptpubkey/), which Elements never blinds, so the unchanged verifiers accepted the anchor with no unblinding data. This was the load-bearing assumption of RGB-on-Liquid, and it is now confirmed experimentally.
- **The RGB-wrapped claim.** The [HTLC](https://bitcoinops.org/en/topics/htlc/) output *is* the RGB seal, so a single transaction reveals the swap secret, closes the seal, and anchors the transition that re-seats the asset on an output the claimer fully controls. Swap settlement and asset re-anchoring, atomically, in one transaction.

![The RGB-wrapped claim: one transaction spends the HTLC, carries the tapret commitment, and creates the asset's new seal](/blog/rgb-liquid/rgb-wrapped-claim.svg)
*The RGB-wrapped claim. The hashlocked coin is the seal, so claiming the swap and re-anchoring the asset are the same act.*

And it is exactly here that Liquid's scripting capabilities start to matter.

## What Simplicity Changes for RGB

Simplicity [activated on Liquid mainnet](https://blog.blockstream.com/simplicity-launches-on-liquid-mainnet/) at the end of July 2025, after unanimous signaling by the network's functionaries, and it is being used in production. [Blockstream](https://blockstream.com/) ran a [post-quantum signature verifier on Liquid mainnet](https://blog.blockstream.com/blockstream-research-demonstrates-quantum-resistant-transaction-signing-on-liquid-using-simplicity-smart-contracts/) in March 2026: arbitrary, novel cryptography verified by an on-chain program. Swiss financial institutions began [piloting collateralized lending contracts](https://blog.blockstream.com/blockstream-quarterly-update-q2-2026/) built on it in mid-2026. The tooling has matured too: [SimplicityHL](https://github.com/BlockstreamResearch/SimplicityHL), a Rust-like high-level language, compiles to Simplicity, and programs deploy as ordinary Taproot leaves that coexist with normal key-path spends in the same output.

To be precise about what is new here: Liquid has had transaction introspection and covenants since its Taproot upgrade, with [over thirty introspection opcodes](https://blog.blockstream.com/tapscript-new-opcodes-reduced-limits-and-covenants/) that let a script examine the transaction spending it, already used in production by [Blockstream's options contracts](https://blog.blockstream.com/fully-collateralized-options-contracts-on-liquid/). Simplicity adds a different class of capability on top: **formally verified semantics** (the language and its standard operations carry machine-checked correctness proofs), **arbitrary finite computation** (any verification algorithm you can express, as the post-quantum demo showed), programmable sighashes, delegation, and complex multi-condition programs without Script's size and opcode contortions.

Now recall the structural fact from earlier: an RGB seal is just a coin. RGB never asks the chain to understand the asset, and the chain never needs to see it. The two systems therefore compose cleanly. **A Simplicity program constrains the container; client-side validation constrains the contents.** Neither interferes with the other. To our knowledge, nobody had combined client-side validation with Simplicity covenants on seal UTXOs before, so we did. Six patterns stand out, and the first is no longer a proposal.

![The Simplicity covenant: every spend must prove the preimage and an anchor-shaped output; a spend without the anchor is rejected by consensus](/blog/rgb-liquid/simplicity-covenant.svg)
*The covenant, as consensus sees it. The wallet's opinion is irrelevant: a spend that does not carry the anchor never enters a block.*

**Swaps the chain itself enforces (demonstrated).** We wrote a Simplicity covenant in SimplicityHL, deployed as a Taproot leaf on a Simplicity-active Elements node, that locks an RGB seal under two simultaneous conditions: the spender must reveal the preimage of a hash, and the spending transaction must carry, at output 0, an output shaped exactly like an RGB commitment (`OP_RETURN` followed by a 32-byte payload). Script cannot see sibling outputs; Simplicity's introspection can. The decisive test: we satisfied the program against a compliant transaction, then stripped the commitment output and rebroadcast. **Consensus rejected it.** The rule that spending this seal requires anchoring an RGB transition is enforced by the chain, not by our tooling, and it runs today on regtest. One design note from the exercise: a `tapret` commitment tweaks the output key with a value not known in advance, which makes it hard for a covenant to pin down, while the `opret` carrier is a plain data output that is easy to constrain by shape. That is why the covenant targets `opret`. From here, the production version adds a claimer signature and a timeout branch, the same HTLC structure we already run in Script, plus PTLC variants built on Schnorr adaptor signatures.

**Lending against RGB collateral.** Collateralized lending is already Simplicity's flagship use case; Blockstream's loan contracts are in pilots with Swiss banks. The construction extends naturally to RGB, because the collateral's control point is a coin. Lock the seal of an RGB asset under a loan covenant, and the terms become consensus rules: repay the L-BTC leg before the timeout and the collateral returns to the borrower; default, and the covenant releases it to the lender, with the required anchor re-seating the asset on their side. No liquidator to trust, and nobody holding the collateral, because the contract is the custodian. The position also stays private: the collateral's amount and history live off-chain in RGB, so settlement is enforced without the chain ever seeing what is being borrowed against.

**Trustless dollar issuance.** Liquid already hosts Tether's USDt natively. A multi-mint RGB contract could bring that liquidity onto RGB rails with verifiable backing. Minting the RGB dollar would require, in the same transaction, locking native USDt into a covenant vault. RGB validators already fetch the witness transaction to check the anchor, so *every holder independently verifies the backing of every mint in their token's history*, with no oracle and no attestation service. Elements makes the evidence easy to read: outputs name their asset explicitly, and the vault's balance becomes a public, real-time proof of reserves. A recursive covenant on the issuance right would make minting permissionless, so that nobody, including the operator, sits in the mint path. Redemption is the honest caveat. The chain cannot validate RGB state, so exits go through an operator-verified release or through atomic swaps against maker liquidity. The result would be a dollar that moves on RGB rails, private and swappable toward Lightning, whose backing anyone can audit from the chain.

**Vaults for RGB holdings.** A recursive covenant can require that spending a seal first moves it into a staging output with a delay, during which a recovery key can claw it back. Because the seal controls the asset, key theft turns from an instant loss into a race the legitimate owner can win: vault custody for RGB assets, with no change to RGB itself.

**Operational covenants for market makers.** A trading venue's hot wallet can hold its seal UTXOs under a program that only permits spends into swap-shaped outputs: hashlocked, time-bounded, anchor-carrying. Even a full compromise of the hot keys cannot drain inventory to an attacker's address. For an RFQ venue like KaleidoSwap, that is a materially stronger security model for the maker's inventory.

**Covenant logic without giving up asset privacy.** On Liquid, a covenant that needs to check amounts generally requires those amounts to be explicit rather than blinded, because introspection sees a cryptographic commitment rather than the value inside. For ordinary Liquid assets, that forces a choice between programmability and confidentiality. RGB dissolves the choice: the asset amounts are not on-chain at all. The covenant constrains an ordinary L-BTC container while the actual asset ledger stays off-chain, private, and validated client-side. Programmable spending rules and asset-level confidentiality at the same time, something neither system offers alone.

![Six capabilities unlocked by programmable seals: chain-enforced swaps, lending on RGB collateral, trustless dollar issuance, vault custody, protected maker inventory, and privacy with programmability](/blog/rgb-liquid/features-unlocked.svg)
*What programmable seals unlock. One pattern is running code; the rest are designs the same primitives make possible.*

There is a pleasing symmetry here. Early RGB designs imagined Simplicity *inside* RGB, as the language for client-side contract logic, a role since taken by RGB's own virtual machine. Simplicity instead arrived *underneath* RGB: on the chain, guarding the seals. That turns out to be the more powerful combination. The chain enforces possession and settlement rules it can actually verify, and the client-side layer keeps everything else private.

## What's left before this ships

This was a proof of concept on test networks, not a product. To get to something users can hold, the remaining pieces are normal engineering:

- The 207-line change has to be **accepted by the RGB maintainers**. The [RFC](https://github.com/rgb-protocol/rgb-consensus/issues/12) is the open conversation.
- A small adapter so wallets can **fetch Liquid transactions** during validation.
- A **Liquid backend for the RGB wallet library**, exposing the same issue, send, and receive operations the Bitcoin version already provides.
- A **swap coordinator** around the HTLC and RGB-wrapped-claim flow the repository already demonstrates end to end: timeout selection, refund monitoring, consignment exchange. As the toolchain matures, the Simplicity covenant hardens into the full swap program with a claimer signature and a refund branch.

None of these are research problems.

## Where RGB on Liquid Goes From Here

The hard question, whether RGB assets can run natively on Liquid, is answered. They can. The cryptographic core already supports it, the consensus layer already names it, and the gap is a small, well-scoped, non-breaking change.

What Liquid adds in return is the interesting part: transaction-level confidentiality on top of RGB's contract-level privacy, one-minute blocks, direct atomic trades against the assets already living on Liquid, and a formally verifiable contract language governing the very coins that RGB uses as seals. Chain-enforced swaps, lending against private collateral, verifiably backed dollar issuance, vaulted custody, and maker inventory that survives stolen keys: that is the design space this patch opens.

For KaleidoSwap, this is one more step in a single direction: **trustless swaps across Bitcoin's layers**. Liquid and RGB on mainnet are already live in our [browser extension](https://kaleidoswap.com), currently testable in closed beta, and we keep exploring new trading models across those layers. RGB on Liquid is a strong candidate to become one of the next venues our maker network supports.

The code is public, the RFC is written, and the next step is the upstream conversation.

## Sources

- The proof of concept, the patch, and the reproduction steps: [github.com/kaleidoswap/rgb-on-liquid-spike](https://github.com/kaleidoswap/rgb-on-liquid-spike)
- The Simplicity covenant program and demo: [rgb_anchor_covenant.simf](https://github.com/kaleidoswap/rgb-on-liquid-spike/blob/main/crates/spike-simplicity/programs/rgb_anchor_covenant.simf) · [demo_simplicity.sh](https://github.com/kaleidoswap/rgb-on-liquid-spike/blob/main/scripts/demo_simplicity.sh)
- The proposed upstream change: [RFC.md](https://github.com/kaleidoswap/rgb-on-liquid-spike/blob/main/RFC.md) · [rgb-consensus#12](https://github.com/rgb-protocol/rgb-consensus/issues/12)
- RGB protocol and libraries: [github.com/rgb-protocol](https://github.com/rgb-protocol)
- BIP-341, Taproot: [bips/bip-0341](https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki)
- Simplicity launch on Liquid mainnet (July 2025): [blog.blockstream.com](https://blog.blockstream.com/simplicity-launches-on-liquid-mainnet/)
- SimplicityHL language and tooling: [github.com/BlockstreamResearch/SimplicityHL](https://github.com/BlockstreamResearch/SimplicityHL) · [docs.simplicity-lang.org](https://docs.simplicity-lang.org/)
- Post-quantum signature verification on Liquid via Simplicity (March 2026): [blog.blockstream.com](https://blog.blockstream.com/blockstream-research-demonstrates-quantum-resistant-transaction-signing-on-liquid-using-simplicity-smart-contracts/)
- Liquid Taproot upgrade, introspection opcodes and covenants: [blog.blockstream.com](https://blog.blockstream.com/tapscript-new-opcodes-reduced-limits-and-covenants/) · [options contracts in production](https://blog.blockstream.com/fully-collateralized-options-contracts-on-liquid/)
- Blockstream Q2 2026 update (lending pilots, Simplicity roadmap): [blog.blockstream.com](https://blog.blockstream.com/blockstream-quarterly-update-q2-2026/)
- The Liquid Network: [blockstream.com/liquid](https://blockstream.com/liquid/)

*This work is a KaleidoSwap engineering proof of concept, run on Bitcoin and Liquid regtest.*

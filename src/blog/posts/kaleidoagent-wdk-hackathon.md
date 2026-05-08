---
title: "KaleidoAgent: An Autonomous Agent for Bitcoin L2"
date: "2026-05-06"
author: "KaleidoSwap Team"
tags: ["Deep Dive"]
slug: "kaleidoagent-wdk-hackathon"
excerpt: "KaleidoAgent placed 1st in the Autonomous DeFi Agent track and 2nd overall at the WDK Hackathon, winning 6,000 USD₮. Here is how it works under the hood."
coverImage: "/blog/images/kaleido-agent/cover.png"
coverImageMobile: "/blog/images/kaleido-agent/cover-mobile.png"
coverImageCard: "/blog/images/kaleido-agent/cover-card.png"
coverImagePreview: "/blog/images/kaleido-agent/cover-preview.png"
coverImagePreviewX: "/blog/images/kaleido-agent/cover-preview-x.png"
---

We built an autonomous, non-custodial agent that runs portfolio strategies, manages Lightning channels, and executes atomic swaps on Bitcoin L2s. It just won two prizes at the WDK Hackathon.

KaleidoAgent placed **1st in the Autonomous DeFi Agent track** and **2nd in Best Projects Overall**, for a total award of **6,000 USD₮**. The full demo is on [YouTube](https://www.youtube.com/watch?v=uzc8mBULXu8).

This article walks through what the agent does, how it is structured, and why an LLM-driven runtime is a reasonable fit for the messy reality of operating a Bitcoin L2 stack.

## What We Actually Shipped

The hackathon submission is not a single repository. It is a set of components that interlock, each one independently useful and each one open source.

- **[kaleido-agent](https://github.com/kaleidoswap/kaleido-agent)** — the agent runtime itself: Nanobot manager, scheduler, Telegram gateway, React dashboard, status server, and the SKILL.md library that defines the autonomous behaviors.
- **[wdk-wallet-rln](https://github.com/kaleidoswap/wdk-wallet-rln)** — a WDK wallet implementation for the **RGB Lightning Node**. It wraps an RLN HTTP daemon as a `WalletManager` and exposes Lightning, on-chain, and RGB asset operations through the standard WDK interface, including atomic swap primitives.
- **[wdk-protocol-swap-kaleidoswap](https://github.com/kaleidoswap/wdk-protocol-swap-kaleidoswap)** — the KaleidoSwap implementation of the WDK `SwapProtocol`. Any WDK-based wallet can plug it in and get quoting and order placement against the KaleidoSwap maker network without writing protocol code.
- **[kaleido-mcp](https://github.com/kaleidoswap/kaleido-mcp)** — an MCP server that exposes the KaleidoSwap maker, atomic swap, and LSPS1 endpoints as 15 typed tools, including the full `atomic_init` / `atomic_execute` / `atomic_status` lifecycle.
- **[wdk-wallet-mcp](https://github.com/kaleidoswap/wdk-wallet-mcp)** — an MCP server over the RLN-backed WDK wallet. Eighteen tools covering balances, invoices, payments, channels, atomic taker flows, and MPP-paid Lightning calls.
- **[wdk-wallet-spark-mcp](https://github.com/kaleidoswap/wdk-wallet-spark-mcp)** — the same idea for **Spark L2**: a thirteen-tool MCP server wrapping `@tetherto/wdk-wallet-spark`, so the agent can move funds between Spark, Lightning, and on-chain inside a single reasoning loop.

On top of those, the agent ships a library of **Skills** as Markdown files. Each skill, portfolio manager, channel manager, DCA, wallet assistant, cross-L2 operator, is a self-contained system prompt with a defined trigger surface and a defined tool surface. Skills are the unit of behavior we iterate on, and they are loaded directly at runtime so a contributor can add a new role without touching the runtime code.

The pattern matters. WDK gives us the wallet abstraction. The protocol package and the RLN wallet plug new capabilities into that abstraction. The MCP servers expose the result to any LLM client. The agent composes those pieces with a scheduler and a set of skills. Each layer is replaceable, and each layer is useful on its own.

## What KaleidoAgent Is

KaleidoAgent is a 24/7 portfolio manager and wallet operator for users who hold bitcoin and RGB assets across Lightning, Spark, and on-chain. It is non-custodial: the agent never deposits funds on an exchange, and it signs every operation locally using [WDK](https://wdk.network) primitives.

The runtime pairs a large language model, Claude or OpenAI, with a set of MCP servers that expose the [`kaleido`](https://github.com/kaleidoswap) CLI and KaleidoSwap APIs as tools. The model handles reasoning and orchestration. The MCP servers handle execution.

The result is an operator that can be told, in plain English or via a config file, to keep a portfolio within target allocations, top up Lightning liquidity before it runs out, or DCA into XAUT every Friday, and then go do it.

## Core Capabilities

The agent's logic is split into discrete **Skills**. Each skill is a self-contained role with its own system prompt, triggers, and tool surface.

### Portfolio Manager
Tracks allocations across Bitcoin, the Lightning Network, Spark, and RGB assets such as USDT and PAX Gold. When an allocation drifts past a user-defined threshold, the agent executes a **trustless HTLC atomic swap** on the KaleidoSwap DEX to rebalance. No deposits, no wrapped tokens, no bridge.

### Channel Manager
Watches Lightning node health and channel liquidity continuously. It flushes stuck RGB transfers, cleans up stale orders, and, when outbound liquidity drops below a configured floor, negotiates and purchases a new inbound channel through **LSPS1**.

### Dollar Cost Averaging
Runs scheduled, fixed-size purchases of target assets. The strategy is price-aware: skip a buy on a local pump, double down on a dip, all bounded by hard caps the operator sets in advance.

### Wallet Assistant
A conversational interface for the everyday actions: check balances, generate invoices, send a payment, swap one asset for another. The same skills the autonomous loops use are available to the human at the keyboard.

### Cross-L2 Operations and MPP Data
Moves funds between Spark, Lightning, and on-chain Bitcoin without leaving the agent. It also speaks **L402** and the **MPP gateway** protocol, which means it can pay for premium market data using Lightning micropayments before it reasons over that data.

## Architecture

KaleidoAgent runs as a multi-tier system. Each tier has one job and a clean interface to the next.

**Nanobot Manager.** The central runtime, written in Node.js. It owns scheduling, LLM reasoning, the Telegram gateway, and the lifecycle of the MCP servers. Cron jobs are stored as JSON under `.nanobot/cron/jobs.json` and synced from the agent config.

**MCP Servers.** [`kaleido-mcp`](https://github.com/kaleidoswap/kaleido-mcp), [`wdk-wallet-mcp`](https://github.com/kaleidoswap/wdk-wallet-mcp), [`wdk-wallet-spark-mcp`](https://github.com/kaleidoswap/wdk-wallet-spark-mcp), and the MPP gateway. They are the bridge between the model's intent and the actual execution surface: WDK Spark and RLN wallets, KaleidoSwap maker APIs, LSPS1 endpoints, and L402-gated data feeds.

**React Dashboard.** A Vite and Tailwind UI on `:5173` that gives the operator live portfolio tracking, the wallet assistant chat, and manual task triggers.

**Status Server.** A small bridge API on `:4242` that acts as a live balance cache and task runner for the dashboard, so the UI never has to wait for a cold MCP call.

This separation matters. The model can be swapped, the MCP servers can be replaced or extended, and the wallet primitives stay the same. Each layer fails independently.

## How It Operates

The agent runs in one of two **modes**:

- **`skill` mode (default).** SKILL.md files are loaded directly at runtime as system prompts. The agent issues a unified `run_kaleido_command` prompt that shells out to the `kaleido` CLI. Lightweight, predictable, easy to reason about.
- **`mcp` mode.** The agent connects directly to the MCP servers and gains access to over 60 sub-tools. More expressive, more tokens, more ways to be creative.

Operators pick the mode that matches their risk appetite and the complexity of the task at hand.

### Operational Loops

Three default autonomous loops drive most of the work:

- **`heartbeat`**, every 5 minutes. Node health, transfer flushes, channel purchases.
- **`rebalance`**, on a configurable cron. Triggers the Portfolio Manager when allocations drift.
- **`daily_summary`**, at 00:00 UTC. Snapshots the portfolio, captures trade history, archives market data.

Each loop is a small, observable unit. If one fails, the others keep running.

## Why This Matters

For a long time, the standard story was that financial automation needed a general-purpose smart contract chain. That story is overdue for a rewrite. Most so-called decentralized chains are operationally centralized: a single sequencer, a single foundation, a permissioned validator set, an upgrade key. The "DeFi" running on top inherits all of it. Smart-contract risk, bridge risk, and custodial risk get rebranded as features.

Bitcoin does not need any of that to host real financial activity anymore. Lightning gives you instant, peer-to-peer payments. RGB gives you client-side-validated assets that settle on Bitcoin, with no global state and no shared contract surface to exploit. Spark adds another execution layer with the same root of trust. None of these layers asks you to bridge your bitcoin into a wrapped IOU or to trust a sequencer to stay honest.

The tradeoff is real: Bitcoin L2s are more heterogeneous than EVM. Lightning, RGB, Spark, and on-chain each have their own state machines, their own liveness assumptions, and their own failure modes. There is no single virtual machine to target, no uniform mempool, no one-size-fits-all RPC. Building an agent here means writing code that respects those differences instead of papering over them.

That is exactly why an agent is the right shape for this problem. The complexity that used to make Bitcoin L2 hard for end users, channel management, RGB transfers, atomic swap orchestration, cross-layer routing, is the kind of work software is good at. KaleidoAgent absorbs the complexity so the operator keeps the property that mattered in the first place: their bitcoin, in their custody, working for them.

KaleidoAgent does that in three concrete ways:

**Trustless swaps.** Rebalances use a 5-step HTLC atomic swap natively on the Lightning Network. The agent never holds counterparty risk against an exchange. The protocol scales peer-to-peer.

**Non-custodial by construction.** Every signature is produced locally by WDK. There is no remote signer, no escrow, no bridge custodian. If the agent disappears tomorrow, the keys, and the funds, stay with the operator.

**Deep risk controls.** Operators can set a `dry_run` mode for observation only, a strict `max_swap_usd`, concurrent order limits, and `stop_loss` thresholds that halt all operations automatically. The agent is allowed to be confident only inside the box the operator drew.

## What Comes Next

The hackathon submission is the first version of something we have been planning to build for a long time. WDK on RLN, the KaleidoSwap swap protocol plugin, and the MCP layer are the foundation for a **next-generation wallet** powered by Lightning-native swaps and Bitcoin-native asset protocols. A wallet where the human is in the loop when they want to be, and the machine handles the rest.

Lightning is the right rails for this. It settles in seconds, it is global, it is permissionless, and it natively supports streaming and sub-cent payments. That is the shape of money the machine economy needs. Cards do not work for a service that gets paid per inference call. Bank transfers do not work for an agent that buys data from another agent. Lightning does. It is the best form of money we have for a world where most economic activity is going to be initiated by software, not by people.

The next step is **L402 and agentic payments at scale**. Your agent already pays for premium market data over Lightning today. The same pattern extends naturally: an agent that pays for compute, for storage, for APIs, for goods, on your behalf, inside the limits you set. You tell it what you want your portfolio to look like, what you want to buy, what risk you accept, and it goes and transacts. No card, no custodian, no monthly invoice.

This is the beginning of KaleidoSwap's work on **agentic payments**, not the end of it. The hackathon was a useful forcing function, but AI × KaleidoSwap was never a hackathon project. It is the natural intersection of what we are already building, a non-custodial DEX on Bitcoin L2, and what we believe finance is going to look like next. The ideals line up: self-custody, permissionless settlement, sound money, software that works for the user instead of the platform.

If you want to explore the agent, the demo video is the fastest way in. If you want to build with the same primitives, every component is open source: the agent runtime in [kaleido-agent](https://github.com/kaleidoswap/kaleido-agent), the RLN wallet in [wdk-wallet-rln](https://github.com/kaleidoswap/wdk-wallet-rln), the swap protocol plugin in [wdk-protocol-swap-kaleidoswap](https://github.com/kaleidoswap/wdk-protocol-swap-kaleidoswap), and the three MCP servers ([kaleido-mcp](https://github.com/kaleidoswap/kaleido-mcp), [wdk-wallet-mcp](https://github.com/kaleidoswap/wdk-wallet-mcp), [wdk-wallet-spark-mcp](https://github.com/kaleidoswap/wdk-wallet-spark-mcp)). The protocol [docs](https://docs.kaleidoswap.com) cover the rest.

The Bitcoin L2 stack is finally rich enough that an agent can do useful work inside it. KaleidoAgent is one demonstration of what that looks like in practice. The next ones are already in motion.

---

## Sources

- WDK Hackathon results (organizer announcement).
- Project demo video: https://www.youtube.com/watch?v=uzc8mBULXu8
- Repositories:
  - https://github.com/kaleidoswap/kaleido-agent
  - https://github.com/kaleidoswap/kaleido-mcp
  - https://github.com/kaleidoswap/wdk-wallet-mcp
  - https://github.com/kaleidoswap/wdk-wallet-spark-mcp
  - https://github.com/kaleidoswap/wdk-protocol-swap-kaleidoswap
  - https://github.com/kaleidoswap/wdk-wallet-rln
- KaleidoSwap docs: https://docs.kaleidoswap.com
- WDK: https://wdk.tether.io/

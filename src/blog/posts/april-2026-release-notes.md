---
title: "KaleidoSwap — Release Notes · April 2026"
date: "2026-04-30"
author: "KaleidoSwap Team"
tags: ["Release Notes"]
slug: "april-2026-release-notes"
excerpt: "Three repositories were the primary focus in April: the Desktop App shipped its biggest release to date, the SDK received several bug fixes, and KaleidoCLI saw a wave of enhancements. All oriented toward the upcoming May mainnet launch."
coverImage: "/blog/images/april-2026-release-notes/cover.png"
coverImageMobile: "/blog/images/april-2026-release-notes/cover-mobile.png"
coverImageCard: "/blog/images/april-2026-release-notes/cover-card.png"
---

> Development update across all public repositories.

Three repositories were the primary focus in April: the Desktop App shipped its biggest release to date, the SDK received several bug fixes, and KaleidoCLI saw a wave of enhancements and improved test coverage. Most of this activity was oriented toward the upcoming May mainnet launch.

---

## 🚀 Releases

### [KaleidoSwap Desktop App v0.4.0](https://github.com/kaleidoswap/desktop-app/releases/tag/v0.4.0) · STABLE RELEASE

`2026-04-16` · KaleidoSwap Desktop App

Limit orders, dollar-cost averaging, Docker node backend, BIP21 deposit URIs, reverse quote support, and expanded internationalization. Users can now set automated buy orders and schedule recurring bitcoin purchases funded with a USDT Lightning balance. The node setup flow supports local native nodes, Docker-managed containers, and remote node connections.

**What's new:**
- **Limit Orders** — Set a price target and walk away. Orders persist locally via Tauri and execute automatically when the target is hit.
- **Dollar-Cost Averaging (DCA)** — Automated bitcoin buying on a schedule or price trigger, with full order tracking and retry logic.
- **Docker Node Backend** — Run the RGB Lightning Node in a container directly from the app. Automatic image pull, container lifecycle management, and health monitoring with no manual setup.
- **Reverse Quote Support** — Accept quotes from the maker side, enabling two-way RFQ trading.
- **BIP21 Deposit URIs** — Generate BIP21-compliant deposit URIs for easier on-chain bitcoin deposits.
- **Node Reachability Monitoring** — Continuous background health checks with automatic reconnection and status indicators.
- **Port Conflict Resolution** — Automatically detects and resolves port conflicts on local node startup.

**Under the hood:**
- Parallelized trading page initialization calls for faster load times.
- Docker Smart Resume: when switching accounts with Docker already running, navigates directly to unlock without restarting the container.
- Dashboard loading skeletons for better perceived performance.
- Security patches and UI polish across sidebar navigation, channel sub-menu, and trading views.

---

### [KaleidoSDK v0.1.4](https://github.com/kaleidoswap/kaleido-sdk/releases/tag/v0.1.4) · PATCH

`2026-04-08` · KaleidoSDK

Added `SignetCustom` to the `BitcoinNetwork` enum. The RGB Lightning Node returns a `SignetCustom` network type that was previously absent. Other minor issues solved.

---

## 🔧 Shipped

**KaleidoSwap Desktop App**

- **[feat: Docker node backend support and UX improvements](https://github.com/kaleidoswap/desktop-app/pull/91)** — Introduced Docker-based node management with full container lifecycle support. Users can now spin up an RGB Lightning Node in a container directly from the app. `2026-04-16`
- **[feat: channel order improvements and trading page refactor](https://github.com/kaleidoswap/desktop-app/pull/90)** — Reworked the channel purchase flow with richer payment states, improved summaries, and order restart handling. Trading page reorganized to separate market-maker and limit-order views. `2026-04-16`
- **[feat: UI polish fixes & extensions](https://github.com/kaleidoswap/desktop-app/pull/103)** — Refined sidebar navigation, asset selection, channel management panel, account generation, and more. `2026-04-16`

**KaleidoCLI**

- **[feat: enhance channel and market commands](https://github.com/kaleidoswap/kaleido-cli/pull/8)** — Extended channel and market command functionality. `2026-04-06`
- **[feat: add channel fee estimation parameters](https://github.com/kaleidoswap/kaleido-cli/pull/9)** — Added channel fee estimation to CLI commands, giving users cost visibility before opening channels. `2026-04-07`
- **[Improve LSP channel order flow](https://github.com/kaleidoswap/kaleido-cli/pull/10)** — Improved the LSP (Lightning Service Provider) channel ordering flow for more reliable channel setup. `2026-04-08`
- **[Default CLI node setup to mutinynet](https://github.com/kaleidoswap/kaleido-cli/pull/12)** — Switched the default node configuration to Mutinynet to align with the testnet validation environment. `2026-04-08`

**KaleidoSDK**

- **[refactor: update API types and models](https://github.com/kaleidoswap/kaleido-sdk/pull/21)** — Updated API type definitions and data models to align with the current RLN and maker interfaces. `2026-04-08`
- **[refactor: replace to_smallest_units and to_display_units with parse_rgb_amount](https://github.com/kaleidoswap/kaleido-sdk/pull/19)** — Unified asset amount handling with a single `parse_rgb_amount` function, removing ambiguity in unit conversion. `2026-04-08`

---

## 📋 Notable Changes

**KaleidoSwap Desktop App**

- [fix: always show backend selection when setting up local node](https://github.com/kaleidoswap/desktop-app/pull/93) — Ensured the node backend selection screen appears consistently on local node setup.
- [fix: increase unlock retry timeout to ~1 hour](https://github.com/kaleidoswap/desktop-app/pull/89) — Extended the node unlock retry window to handle slow startup on lower-spec machines.

**KaleidoCLI**

- [Add CLI test coverage](https://github.com/kaleidoswap/kaleido-cli/pull/11) — First round of automated CLI tests, covering core command paths.
- [Update CLI tests for kaleido-sdk 0.1.5 and fix CI](https://github.com/kaleidoswap/kaleido-cli/pull/14) — Kept test suite aligned with the SDK's rapid patch cycle.

**KaleidoSDK**

- [fix(ts-sdk): pin transitive security updates](https://github.com/kaleidoswap/kaleido-sdk/pull/20) — Pinned security-relevant transitive dependencies in the TypeScript SDK.

---

## 📊 By the Numbers

| Commits | PRs merged | Issues closed | Releases | Repos active |
|---------|------------|---------------|----------|--------------|
| ~40+ | 26 | 2 | 8 | 5 |

---

*KaleidoSwap · [github.com/kaleidoswap](https://github.com/kaleidoswap) · Generated 2026-04-30*

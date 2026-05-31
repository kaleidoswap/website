---
title: "April 2026: Desktop v0.4.0, SDK Fixes & CLI Improvements"
date: "2026-04-30"
author: "KaleidoSwap Team"
tags: ["Release Notes"]
slug: "april-2026-release-notes"
excerpt: "April was a dense month of shipping. The Desktop App reached v0.4.0 with trading automation features. The SDK went through six patch releases. KaleidoCLI received a significant expansion of its command surface."
coverImage: "/blog/images/april-2026-release-notes/cover.png"
coverImageMobile: "/blog/images/april-2026-release-notes/cover-mobile.png"
coverImageCard: "/blog/images/april-2026-release-notes/cover-card.png"
coverImagePreview: "/blog/images/april-2026-release-notes/cover-preview.png"
coverImagePreviewX: "/blog/images/april-2026-release-notes/cover-preview-x.png"
---

April was a dense month of shipping. The Desktop App reached v0.4.0 with a full set of trading automation features. The SDK went through six patch releases. KaleidoCLI received a significant expansion of its command surface. All of it is converging on the May mainnet launch.

---

## Desktop App v0.4.0: Trading Automation on a Local Node

The biggest release of the month was [KaleidoSwap Desktop App v0.4.0](https://github.com/kaleidoswap/desktop-app/releases/tag/v0.4.0), shipped on April 16.

The headline features are **limit orders** and **dollar-cost averaging (DCA)**. Both run locally via Tauri. Limit orders persist across sessions and execute automatically when the target price is hit. DCA lets users schedule recurring bitcoin purchases funded from a USDT Lightning balance, with retry logic and full order history.

The node backend model also got a significant upgrade. Users can now run the RGB Lightning Node in a **Docker container** directly from the app — automatic image pull, container lifecycle management, and health monitoring included. This removes the manual dependency setup that was a friction point for new users. Alternatively, users can connect to a remote node or continue using the native local node with tray controls and background-mode support.

Other additions in v0.4.0:

- **Reverse Quote Support** — The app can now accept quotes from the maker side, enabling full two-way RFQ trading rather than taker-only flows.
- **BIP21 Deposit URIs** — Generates standards-compliant deposit URIs for on-chain bitcoin deposits.
- **Port Conflict Resolution** — Automatically detects and resolves port conflicts on node startup.
- **Expanded i18n** — Broader multi-language coverage across trading, wallet history, setup, and channel management.

Under the hood: trading page initialization was parallelized to reduce load time; Docker Smart Resume skips container restart when switching accounts; security vulnerabilities were patched alongside two reported bugs (#95, #96).

The full release notes are on [GitHub](https://github.com/kaleidoswap/desktop-app/releases/tag/v0.4.0). The download is at [kaleidoswap.com/downloads](https://kaleidoswap.com/downloads).

---

## KaleidoSDK: Multiple Patch Released

KaleidoSDK went from v0.1.0 to v0.1.6 between March 21 and April 10. The April patch cycle fixed:

- **IFA (Inbound Forwarding Arrangement) integration** — `v0.1.2` and `v0.1.6` fixed the asset list function and updated the RLN integration layer.
- **SignetCustom network type** — `v0.1.4` added `SignetCustom` to the `BitcoinNetwork` enum. The RGB Lightning Node returns this value on custom Signet environments; its absence was causing validation errors on the maker.
- **API type alignment** — `v0.1.3` and a separate refactor PR updated types and models to match the current RLN and maker interfaces.
- **Unit conversion** — `parse_rgb_amount` replaced two separate functions (`to_smallest_units`, `to_display_units`), unifying asset amount handling across Rust, Python, and TypeScript bindings.

The SDK is available on [PyPI](https://pypi.org/project/kaleido-sdk/) and [npm](https://www.npmjs.com/package/@kaleidoswap/sdk). Docs at [docs.kaleidoswap.com](https://docs.kaleidoswap.com).

---

## KaleidoCLI: Command Surface Expansion and Test Coverage

KaleidoCLI had no formal versioned release in April, but merged ten PRs — the most of any month since launch. The additions include:

- Channel fee estimation parameters, giving users cost visibility before opening channels.
- Improved LSP (Lightning Service Provider) channel order flow.
- Enhanced market and swap commands with better protocol layer resolution.
- First round of automated CLI test coverage.
- Default node setup switched to Mutinynet, aligning CLI users with the testnet validation environment.
- MIT license file and updated README with beta warning.

The CLI ships with KaleidoSDK and is the fastest way to run a full local RGB Lightning Node and execute swaps from the terminal. See the [demo on Rumble](https://rumble.com/v78a1pu-kaleido-cli-demo-atomic-swap-rgb-assets-on-lightning-from-the-command-line.html).

---

## What's Next

May is the month of the mainnet launch. The HODL invoice integration currently is in pre-release builds of the RGB Lightning Node, which is the last step to enable trustless swap settlement at launch. Taproot Assets integration and KaleidoSDK v0.2 (agentic payments) are slated for June.

The full April release notes are on [GitHub](https://github.com/kaleidoswap).

---

📚 **Sources**

- [Desktop App v0.4.0 release](https://github.com/kaleidoswap/desktop-app/releases/tag/v0.4.0)
- [RGB Lightning Node releases](https://github.com/kaleidoswap/rgb-lightning-node/releases)
- [KaleidoSDK releases](https://github.com/kaleidoswap/kaleido-sdk/releases)
- [KaleidoCLI pull requests](https://github.com/kaleidoswap/kaleido-cli/pulls)
- [KaleidoSwap docs](https://docs.kaleidoswap.com)

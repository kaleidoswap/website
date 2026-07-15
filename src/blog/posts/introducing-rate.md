---
title: "Introducing Rate: AI-Powered Self-Custodial RGB Lightning Wallet"
date: "2025-07-30"
tags: ["Announcement"]
slug: "introducing-rate"
excerpt: "Rate brings multi-protocol Bitcoin payments through an AI-powered wallet engine. Users can interact with an AI agent to move sats and RGB assets via natural language or voice."
coverImage: "/blog/images/introducing-rate/introducing-rate-cover.jpg"
coverImageMobile: "/blog/images/introducing-rate/introducing-rate-cover-mobile.jpg"
coverImageCard: "/blog/images/introducing-rate/introducing-rate-cover-card.jpg"
coverImagePreview: "/blog/images/introducing-rate/introducing-rate-cover-preview.jpg"
coverImagePreviewX: "/blog/images/introducing-rate/introducing-rate-cover-preview-x.jpg"
---

Rate just won the [Plan B Hackathon](https://planbhackathon.xyz/) in Lugano on July 28–29, 2025. We built this AI-powered [RGB](https://rgb.info/) [Lightning](https://lightning.network/) wallet to fulfill the hackathon’s vision of combining Bitcoin, AI, and real-world utility for Lugano. We see strong potential in this combination, and it’s going to be more than just a hackathon project.

### The Hackathon Challenge: Bitcoin + AI + Lugano

The Plan B Hackathon set a clear challenge: build something innovative using Bitcoin, AI, and create real value for Lugano. With these three pillars guiding our development, we saw an opportunity to solve Bitcoin's usability problem while showcasing how AI can bridge the gap between complex technology and everyday users.

The Challenge was about:

- **Bitcoin Integration:** Leverage Bitcoin's latest innovations (Lightning, RGB assets)
- **AI Implementation:** Use artificial intelligence to enhance user experience
- **Lugano Focus:** Create practical value for the local Bitcoin ecosystem, in line with [Lugano Plan ₿](https://planb.lugano.ch/)'s mission

Rate emerged as the perfect synthesis of all three requirements.

### The Problem: Bitcoin's Usability Crisis

After 16 years, Bitcoin still feels like rocket science to most people. Less than 1% of the world uses Bitcoin for daily payments, despite its revolutionary potential.

Currently, the main pain points are:

- **Complex UX** — Crypto wallets are intimidating for average users
- **Limited Real-World Use** — Hard to find and pay Bitcoin-accepting businesses
- **Social Disconnect** — No easy way to pay friends or build Bitcoin communities

We watched brilliant innovations like RGB assets and Lightning Network struggle with adoption, not because the tech isn't ready, but because the user experience sometimes remains fundamentally broken.

### The AI + Bitcoin Combination

Rate is your personal Bitcoin assistant that handles all the complexity while you focus on what matters: sending and receiving value. We've built a complete ecosystem that seamlessly integrates Bitcoin, Lightning, RGB assets, social payments, and AI into one intuitive experience.

![Rate app interface](/blog/images/introducing-rate/introducing-rate-2.jpg)

It uses an RGB Lightning node running remotely on cloud infrastructure powered by [Thunderstack.org](https://thunderstack.org/). This innovative approach removes the complexity of handling a node locally while maintaining it completely non-custodial. Users always have full control on their keys.

We decided to integrate Thunderstack because:

- **Non-custodial** — You own your private keys, they provide the infrastructure
- **Full functionality** — Complete RGB and Lightning Network support
- **Always online** — 24/7 availability without draining your phone battery

### Real-World Connection: Nostr and BTC Map Integration

We integrated [Nostr](https://nostr.com/) because we believe it's the best protocol for social interactions — an endless decentralized protocol without requiring centralized servers. Users can connect their Nostr nsec and import their following list as contacts directly into Rate.

**Social Payment Features:**

- **Import Contacts** — Connect your Nostr identity and sync your following list
- **Lightning Zaps** — If your friend has a [NIP05](https://github.com/nostr-protocol/nips/blob/master/05.md) (Lightning Address), you can zap them instantly
- **Seamless Payments** — Pay your social network with one tap
- **Decentralized** — No central servers, pure peer-to-peer social payments

![Nostr social integration in Rate](/blog/images/introducing-rate/introducing-rate-3.jpg)

The [BTC Map](https://btcmap.org/) is integrated directly into the app as well, making it useful to search for places that accept Bitcoin. This bridges the gap between digital assets and physical commerce, especially valuable in Bitcoin-friendly Lugano.

**Discovery Features:**

- **Local Business Search** — Find Bitcoin-accepting restaurants, shops, and services
- **Filter Options** — Search by category and payment type
- **Lugano Focus** — Perfect for navigating the city's crypto-friendly landscape
- **Real-world Utility** — Turn your Bitcoin into coffee, pizza, and shopping

![BTC Map integration](/blog/images/introducing-rate/introducing-rate-4.jpg)

### AI Agent for Bitcoin Payments and More

The AI agent is our real innovation. Using [PremAI](https://premai.io/) with advanced function calling capabilities, we let the LLM understand which action the user is trying to achieve. Users can interact through both text and voice, providing an even better UX for hands-free Bitcoin operations. This goes beyond just being a chatbot to becoming a true voice-activated Bitcoin assistant.

The most revolutionary AI features we implemented are:

- **Natural Language Processing** — Talk to your wallet like a friend
- **Voice Interaction** — Speak directly to your AI assistant for hands-free operation
- **Function Calling** — Direct integration with wallet operations
- **Smart Actions** — Generate invoices, pay contacts, find businesses
- **Contextual Understanding** — Fetch information from both user data and external sources

The user can send requests to the AI agent using voice commands. For example:

- "Send 50,000 sats to Alice for lunch"
- "Find a coffee shop that accepts Bitcoin near me"
- "Convert my stablecoins to Bitcoin"
- "Create an invoice for $25"

The voice interface provides an even better user experience, allowing users to interact with their Bitcoin wallet completely hands-free.

![AI chatbot in Rate](/blog/images/introducing-rate/introducing-rate-5.jpg)

### Built for the Future: Agentic Payments, RGB Integration, and Cross-Protocol Swaps

Rate is completely integrated with the [KaleidoSwap latest version](/blog/kaleidoswap-v020), providing users with seamless asset management and liquidity solutions:

- **Atomic Swaps** — Swap assets directly inside the application
- **KaleidoLSP** — Buy channels and liquidity when needed
- **Multi-Asset Support** — Bitcoin, RGB stablecoins, and tokens
- **Unified Experience** — All Bitcoin financial services in one app

The architecture combines cutting-edge technology with practical scalability:

**Frontend & UX:**

- React Native with Expo for cross-platform mobile development
- SQLite for local data management
- Expo SecureStore with biometric authentication

**AI & Intelligence:**

- PremAI integration with advanced function calling
- Natural language processing for wallet operations
- Voice recognition for hands-free interaction

**Bitcoin & Lightning:**

- Thunderstack cloud nodes for RGB Lightning functionality
- Non-custodial architecture with user key control
- Full Lightning Network and RGB asset support

**Social & Discovery:**

- [NDK](https://github.com/nostr-dev-kit/ndk) (Nostr Development Kit) for decentralized social layer
- BTC Map API integration for business discovery
- Seamless contact management and payments

### Perfect Fit for Lugano's Bitcoin Ecosystem

Rate was specifically designed to thrive in Lugano's vibrant Bitcoin environment. Through native integrations, users can seamlessly interact with the city's Bitcoin infrastructure while maintaining complete sovereignty over their funds.

Lugano-Specific Value:

- [LVGA Token](https://my.lugano.ch/en/lvga/) Support — Native integration with Lugano's city token over RGB
- Local Business Discovery — Find Bitcoin-accepting venues instantly
- Multi-Asset Payments — Pay with Bitcoin, [USDT](https://tether.to/en/), or LVGA seamlessly
- Specific Context — "How many businesses accept Bitcoin in Lugano"

Interacting by voice makes it the perfect solution when you're walking around Lugano discovering Bitcoin-friendly businesses or need to make a quick payment while your hands are busy, whatever currency you prefer.

### Current Status and Future Development

The app is still not completely usable, but we plan to complete it soon to let people test and experiment with it before a full mainnet and production-ready release. This is not just a hackathon project. It's a milestone that starts a new chapter for KaleidoSwap: AI and Bitcoin working together.

We have a clear idea of the upcoming milestones:

- Fix payments, swaps, and payment rendezvous — Complete production deployment
- Local node directly on the device — Full sovereignty with embedded nodes
- Local AI (using [Tether](https://tether.io/)'s new [QVAC SDK](https://qvac.tether.io/)) — Replace PremAI for total privacy on financial data
- AI for swaps, liquidity optimization — Smart trading and channel management
- Group expenses (Split Expenses) — AI-powered bill splitting with Lightning

Payment Rendezvous, our innovative solution for cross-asset Lightning payments will come in future releases, solving Lightning's routing limitations with atomic guarantees.

Making the KaleidoSwap stack the trustless payment layer for AI agents is a direction we're actively exploring. The same interface a human reaches through natural language could be called programmatically by design. Lightning payments for AI agents offer instant, machine-speed settlement with fees low enough for micro-transactions, while RGB adds stablecoin payments for AI agents on the same rails. 

### Join the Bitcoin L2s and Agentic Payments revolution

This hackathon victory is just the beginning. We're committed to turning Rate into the production platform that will finally make Bitcoin accessible to everyone through conversational AI.

To get involved:

- Check out what we are building on [GitHub](https://github.com/kaleidoswap/rate)
- Come say hi on our [Telegram group](https://t.me/kaleidoswap)
- Follow us on [X](https://x.com/kaleidoswap)

The AI and Bitcoin revolution starts now, and KaleidoSwap is leading the charge.

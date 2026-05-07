---
title: "Introducing Rate: AI-Powered Self-Sovereign RGB Lightning Wallet"
date: "2025-07-30"
author: "Walter"
tags: ["Announcement"]
slug: "introducing-rate"
excerpt: "Rate, our AI-powered RGB Lightning wallet, just won the Plan B Hackathon in Lugano. Here's the story of how we built a Bitcoin assistant that makes Lightning, RGB assets, and social payments accessible to everyone."
coverImage: "/blog/images/introducing-rate/cover.png"
coverImageMobile: "/blog/images/introducing-rate/cover-mobile.png"
coverImageCard: "/blog/images/introducing-rate/cover-card.png"
coverImagePreview: "/blog/images/introducing-rate/cover-preview.png"
coverImagePreviewX: "/blog/images/introducing-rate/cover-preview-x.png"
---

> Winner of the Plan B Lugano Hackathon 2025 — The Future of Bitcoin Wallets is Here

**TL;DR:** Rate, our revolutionary AI-powered RGB Lightning wallet, just won the Plan B Hackathon in Lugano (July 28–29, 2025). Built to fulfill the hackathon's vision of combining Bitcoin, AI, and real-world utility for Lugano, Rate represents the beginning of a new revolution: AI and Bitcoin working together. This is not just a hackathon project — it's a milestone that starts a new era of Bitcoin usability.

---

### The Hackathon Challenge: Bitcoin + AI + Lugano

The Plan B Hackathon set a clear challenge: build something innovative using Bitcoin, AI, and create real value for Lugano. With these three pillars guiding our development, we saw an opportunity to solve Bitcoin's most persistent problem — usability — while showcasing how AI can bridge the gap between complex technology and everyday users.

**The Challenge:**

- **Bitcoin Integration:** Leverage Bitcoin's latest innovations (Lightning, RGB assets)
- **AI Implementation:** Use artificial intelligence to enhance user experience
- **Lugano Focus:** Create practical value for the local Bitcoin-friendly ecosystem

Rate emerged as the perfect synthesis of all three requirements, pushing vibe coding to its limit with the right tools, prompting and code skills.

---

### The Problem: Bitcoin's Usability Crisis

After 16 years, Bitcoin still feels like rocket science to most people. Try explaining Lightning channels, RGB assets, or atomic swaps to your mom. The result? Less than 1% of the world uses Bitcoin for daily payments, despite its revolutionary potential.

**Current Pain Points:**

- **Complex UX:** Crypto wallets are intimidating for average users
- **Limited Real-World Use:** Hard to find and pay Bitcoin-accepting businesses
- **Social Disconnect:** No easy way to pay friends or build Bitcoin communities

We watched brilliant innovations like RGB assets and Lightning Network struggle with adoption, not because the tech isn't ready, but because the user experience sometimes remains fundamentally broken.

---

### Meet Rate: The AI Bitcoin Revolution

Rate isn't just another wallet — it's your personal Bitcoin assistant that handles all the complexity while you focus on what matters: sending and receiving value. We've built a complete ecosystem that seamlessly integrates Bitcoin, Lightning, RGB assets, social payments, and AI into one intuitive experience.

![Rate app interface](/blog/images/introducing-rate/2.png)

### RGB Lightning Node on Cloud

Rate uses an RGB Lightning node running remotely on cloud infrastructure powered by [Thunderstack.org](https://thunderstack.org/). This innovative approach removes the complexity of handling a node locally while maintaining complete non-custodial control — users always have their keys.

**Why Thunderstack:**

- **Non-custodial:** You own your private keys, they provide the infrastructure
- **Full functionality:** Complete RGB and Lightning Network support
- **Always online:** 24/7 availability without draining your phone battery

### Nostr Social Integration

We integrated Nostr because we believe it's the best protocol for social interactions — an endless decentralized protocol without requiring centralized servers. Users can connect their Nostr nsec and import their following list as contacts directly into Rate.

**Social Payment Features:**

- **Import Contacts:** Connect your Nostr identity and sync your following list
- **Lightning Zaps:** If your friend has a NIP05 (Lightning Address), you can zap them instantly
- **Seamless Payments:** Pay your social network with one tap
- **Decentralized:** No central servers, pure peer-to-peer social payments

![Nostr social integration in Rate](/blog/images/introducing-rate/3.png)

### BTC Map Integration

The BTC Map is integrated directly into the app, making it useful to search for places that accept Bitcoin. This bridges the gap between digital assets and physical commerce, especially valuable in Bitcoin-friendly Lugano.

**Discovery Features:**

- **Local Business Search:** Find Bitcoin-accepting restaurants, shops, and services
- **Filter Options:** Search by category and payment type
- **Lugano Focus:** Perfect for navigating the city's crypto-friendly landscape
- **Real-world Utility:** Turn your Bitcoin into coffee, pizza, and shopping

![BTC Map integration](/blog/images/introducing-rate/4.png)

### AI Chatbot: The Real Innovation

The AI chatbot is our real innovation. Using PremAI with advanced function calling capabilities, we let the LLM understand which action the user is trying to achieve. Users can interact through both text and voice, providing an even better UX for hands-free Bitcoin operations. This goes beyond just being a chatbot to becoming a true voice-activated Bitcoin assistant.

**Revolutionary AI Features:**

- **Natural Language Processing:** Talk to your wallet like a friend
- **Voice Interaction:** Speak directly to your AI assistant for hands-free operation
- **Function Calling:** Direct integration with wallet operations
- **Smart Actions:** Generate invoices, pay contacts, find businesses
- **Contextual Understanding:** "Find the best pizzeria in Lugano that accepts Bitcoin"

**Example Voice Commands:**

- *"Hey Rate, send 50,000 sats to Alice for lunch"*
- *"Find a coffee shop that accepts LUGA near me"*
- *"Convert my stablecoins to Bitcoin"*
- *"Create an invoice for $25"*

The voice interface provides an even better UX, allowing users to interact with their Bitcoin wallet completely hands-free — perfect for when you're walking around Lugano discovering Bitcoin businesses or need to make a quick payment while your hands are busy.

![AI chatbot in Rate](/blog/images/introducing-rate/5.jpg)

---

### KaleidoSwap Stack Integration

Rate is completely integrated with the KaleidoSwap ecosystem, providing users with seamless asset management and liquidity solutions:

**Integrated Features:**

- **Atomic Swaps:** Swap assets directly inside the application
- **KaleidoLSP:** Buy channels and liquidity when needed
- **Multi-Asset Support:** Bitcoin, RGB stablecoins, and tokens
- **Unified Experience:** All Bitcoin financial services in one app

---

### Technical Architecture: Built for the Future

Rate's architecture combines cutting-edge technology with practical scalability:

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

- NDK (Nostr Development Kit) for decentralized social layer
- BTC Map API integration for business discovery
- Seamless contact management and payments

---

### Current Status and Future Development

The app is still not completely usable, but we plan to complete it soon to let people test and experiment with it before a full mainnet and production-ready release. This is not just a hackathon project — it's a milestone that starts a new revolution: AI and Bitcoin working together.

### Development Roadmap

**Upcoming Milestones:**

- 🛠️ **Fix payments, swaps and rendezvous and mainnet** — Complete production deployment
- 📱 **Local node directly on the device** — Full sovereignty with embedded nodes
- 🤖 **Local AI (using Tether QVAC SDK)** — Replace PremAI for total privacy on financial data
- 🔁 **AI for swaps, liquidity optimization** — Smart trading and channel management
- 👥 **Group expenses (Split Expenses)** — AI-powered bill splitting with Lightning

**Payment Rendezvous:** Our innovative solution for cross-asset Lightning payments will come in future releases, solving Lightning's routing limitations with atomic guarantees.

---

### Perfect Fit for Lugano's Bitcoin Ecosystem

Rate was specifically designed to thrive in Lugano's progressive Bitcoin environment. Through native integrations, users can seamlessly interact with the city's Bitcoin infrastructure while maintaining complete sovereignty over their funds.

**Lugano-Specific Value:**

- **LUGA Token Support:** Native integration with Lugano's city token over RGB
- **Local Business Discovery:** Find Bitcoin-accepting venues instantly
- **Multi-Asset Payments:** Pay with Bitcoin, USDT, or LUGA seamlessly
- **AI Context:** "Find the best restaurant that accepts LUGA near the lake"

---

### The Development Story: Vibe Coding at Its Peak

We pushed vibe coding to its absolute limit during this hackathon. With the right tools — Cursor AI and Claude 4 — and effective prompting strategies, we built something truly revolutionary in just 24 hours. This demonstrates the power of AI-assisted development when combined with clear vision and execution.

**Our Tech Stack:**

- **AI Development:** Cursor AI + Claude 4 for rapid prototyping
- **Smart Prompting:** Advanced prompt engineering for complex features
- **Rapid Iteration:** Real-time AI assistance for debugging and feature development
- **Vision to Reality:** From concept to working demo in record time

---

### Join the Revolution

This hackathon victory is just the beginning. We're committed to turning Rate into the production platform that will finally make Bitcoin accessible to everyone through conversational AI.

**Get Involved:**

- 🔗 **GitHub:** [github.com/kaleidoswap/rate](https://github.com/kaleidoswap/rate)
- 🌐 **Website:** [kaleidoswap.com](https://kaleidoswap.com)
- 📱 **Beta Testing:** Join our testing program when available
- 💬 **Community:** Come say hi on [KaleidoSwap Telegram group](https://t.me/kaleidoswap)

**The AI and Bitcoin revolution starts now, and Rate is leading the charge.**

---

### About KaleidoSwap

KaleidoSwap's mission is to build the infrastructure for multi-protocol atomic swaps on top of the Lightning Network. Whether it's RGB, Taproot Assets, Liquid, ARK, Spark — if it speaks Lightning, you can pay! All while maintaining Bitcoin's core principles of sovereignty and decentralization.

Follow our journey: [Twitter](https://twitter.com/kaleidoswap) | [GitHub](https://github.com/kaleidoswap) | [Website](https://kaleidoswap.com/)

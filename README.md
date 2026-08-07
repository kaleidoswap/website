# KaleidoSwap Website

The official website for KaleidoSwap - Trustless trading on Lightning Network.

## Overview

KaleidoSwap leverages the security of Bitcoin Protocol, the scalability of Lightning Network, and the programmability of RGB to let users trade any RGB assets in a trustless manner.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kaleidoswap/website.git
cd website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Technology Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

## Digital Business Cards

Personal contact pages at `/contact/<slug>`, meant to be opened by scanning a QR code printed on a physical business card. Each page shows name/role/photo and a "Salva contatto" button that downloads a vCard (`.vcf`) — no Apple/Google Wallet involved.

### Editing your data

Everything lives in one file: [`src/constants/businessCards.ts`](src/constants/businessCards.ts). Add or edit an entry keyed by slug — the slug is the URL segment, so `emile` gives `/contact/emile`:

```ts
export const BUSINESS_CARDS: Record<string, BusinessCard> = {
  emile: {
    slug: 'emile',
    fullName: 'Emile Jellinek',
    firstName: 'Emile',
    lastName: 'Jellinek',
    role: 'Chief Growth Officer',
    company: 'KaleidoSwap',
    phone: '+393452452183',        // E.164 — used in the vCard and the tel: link
    phoneDisplay: '+39 345 245 2183',
    email: 'emile@kaleidoswap.com',
    website: 'https://kaleidoswap.com',
    linkedin: 'https://www.linkedin.com/in/emilejellinek/',
    github: 'https://github.com/jelleml',   // optional
    x: 'https://x.com/emilejellinek',       // optional
    photo: '/images/contact/emile-jellinek-pfp-preview.webp',
  },
}
```

No other file needs to change — the page (`src/pages/BusinessCard.tsx`) and the `.vcf` generator (`worker/vcard.ts`) both read from this same record, so they can't drift out of sync. Any optional field you omit simply disappears from the page and the vCard.

The `.vcf` is generated on-the-fly by the Cloudflare Worker at `/contact/<slug>.vcf` — no build step, no separate hosting.

### Adding a photo

Drop the full-resolution image in `public/images/contact/`, add it to `ENTRIES` in [`scripts/generate-image-previews.mjs`](scripts/generate-image-previews.mjs) with `maxSize: 288`, then:

```bash
npm run images:previews
```

Point `photo` at the generated `-preview.webp`, **not** the original. The avatar renders in a 96 px circle, and these pages get opened on mobile data from a printed QR code — the originals run 1-2.6 MB each, the previews 4-15 KB. Omit `photo` entirely to fall back to the KaleidoSwap logo.

> The three existing avatars were produced this way, but their originals are **not** in the repo — only the generated `.webp` files are. They therefore have no `ENTRIES` line (a missing source makes the whole script exit 1). To change one, put the original back in `public/images/contact/` and re-add its entry.

`worker/vcard.test.ts` guards this: it fails if a `photo` doesn't end in `-preview.webp`, if a phone isn't valid E.164, or if `phoneDisplay` doesn't match `phone` digit-for-digit.

### Deploying

Same pipeline as the rest of the site: push to the branch that deploys, or run `wrangler deploy` after `npm run build`. The card is live at `https://kaleidoswap.com/contact/<slug>` immediately.

### Generating the QR code for print

```bash
npm run qr <slug>
```

This writes `public/qrcodes/<slug>.png` (1000×1000, print-ready) and `public/qrcodes/<slug>.svg` (vector — best for a print shop) pointing at `https://kaleidoswap.com/contact/<slug>`. Both files are gitignored; regenerate whenever you need them. Use the SVG (or the PNG at full size) when sending the card to print — don't scale up a small export, it'll blur.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
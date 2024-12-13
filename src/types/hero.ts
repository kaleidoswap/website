// src/types/hero.ts
export interface HeroProps {
    title: string;
    description: string;
    primaryCTA: {
      label: string;
      href: string;
    };
    secondaryCTA?: {
      label: string;
      href: string;
    };
  }
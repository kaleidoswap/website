// src/types/hero.ts
export interface HeroProps {
    title: string;
    description: string;
    primaryCTA: {
      label: string;
      href: string;
      external?: boolean;
    };
    secondaryCTA?: {
      label: string;
      href: string;
      external?: boolean;
    };
    tertiaryCTA?: {
      label: string;
      href: string;
      external?: boolean;
    };
  }
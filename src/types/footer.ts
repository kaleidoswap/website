// src/types/footer.ts
import { LucideIcon } from 'lucide-react';

export interface FooterSection {
    title: string;
    links: {
      label: string;
      href: string;
      external?: boolean;
    }[];
  }
  
  export interface FooterProps {
    sections: FooterSection[];
    socials: {
      platform: string;
      href: string;
      icon: LucideIcon;
    }[];
  }
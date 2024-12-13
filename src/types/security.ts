// src/types/security.ts
export interface SecurityNoticeProps {
  title: string;
  description: string;
  warnings: {
    title: string;
    description: string;
  }[];
  cta?: {
    label: string;
    href: string;
  };
}
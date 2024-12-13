// src/types/navigation.ts
export interface NavItem {
    label: string;
    href: string;
    external?: boolean;
}
  
export interface NavSection {
    label: string;
    items: NavItem[];
}
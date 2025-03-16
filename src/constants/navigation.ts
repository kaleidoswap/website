import { NavItem } from '@/types/navigation';

export const mainNavItems: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Downloads',
    href: '/downloads',
  },
  // {
  //   label: 'Market Makers',
  //   href: '/market-makers',
  // },
  {
    label: 'Documentation',
    href: 'https://docs.kaleidoswap.com',
    external: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/kaleidoswap',
    external: true,
  },
];
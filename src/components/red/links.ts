// Single source for the site's navigation: the header, the mobile menu and the footer all read
// from here, so the names and destinations can't drift apart.

const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/');

export interface SiteLink {
  href: string;
  label: string;
  /** Color of the link's marker, a CSS custom property name from global.css */
  line: 'ink' | 'vet' | 'arq' | 'nos';
  /** Whether this link is the current page, given the path without the base */
  match: (p: string) => boolean;
}

const at = (seg: string) => (p: string) => p === '/' + seg || p.startsWith('/' + seg + '/');

export const LINKS: SiteLink[] = [
  { href: BASE, label: 'Inicio', line: 'ink', match: (p) => p === '' || p === '/' },
  { href: `${BASE}vet`, label: 'Integhra VET', line: 'vet', match: at('vet') },
  { href: `${BASE}arq`, label: 'Integhra ARQ', line: 'arq', match: at('arq') },
  { href: `${BASE}nosotros`, label: 'Nosotros', line: 'nos', match: at('nosotros') },
];

export const PRODUCTS = [
  { part: 'vet', name: 'Integhra VET', state: 'En servicio desde 2024', href: `${BASE}vet` },
  { part: 'arq', name: 'Integhra ARQ', state: 'En desarrollo', href: `${BASE}arq` },
] as const;

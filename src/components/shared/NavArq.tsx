import { useEffect, useRef, useState } from 'react';
import ContactModal from './ContactModal';

// Ensures BASE_URL always has trailing slash regardless of Astro version behavior
const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/');

const THEMES = {
  dark: {
    bg: 'rgba(26,26,26,0.88)',
    border: 'rgba(200,169,110,0.1)',
    logo: '#C8A96E',
    link: 'rgba(237,232,221,0.45)',
    linkHover: 'rgba(237,232,221,0.9)',
    accent: '#C8A96E',
    ctaBg: '#C8A96E',
    ctaText: '#1A1A1A',
    menuBg: 'rgba(20,20,20,0.99)',
    productBadgeBg: 'rgba(200,169,110,0.07)',
    productBadgeBorder: 'rgba(200,169,110,0.14)',
  },
  light: {
    bg: 'rgba(255,255,255,0.92)',
    border: 'rgba(2,131,108,0.1)',
    logo: '#02836c',
    link: '#888',
    linkHover: '#111',
    accent: '#02836c',
    ctaBg: '#02836c',
    ctaText: '#fff',
    menuBg: 'rgba(255,255,255,0.99)',
    productBadgeBg: 'rgba(2,131,108,0.06)',
    productBadgeBorder: 'rgba(2,131,108,0.14)',
  },
};

const NAV_LINKS = [
  { href: BASE, label: 'Inicio' },
  { href: `${BASE}general`, label: 'Institucional' },
  { href: `${BASE}sobre-nosotros`, label: 'Nosotros' },
];

export default function NavArq() {
  const navRef = useRef<HTMLElement>(null);
  const [activePath, setActivePath] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Strip base prefix to get relative path, then detect light-theme pages
  const basePrefix = BASE.slice(0, -1); // '/institucional' or ''
  const relativePath = activePath.startsWith(basePrefix) ? activePath.slice(basePrefix.length) : activePath;
  const isLight = relativePath.startsWith('/general') || relativePath.startsWith('/sobre-nosotros');
  const theme = isLight ? THEMES.light : THEMES.dark;

  useEffect(() => {
    setActivePath(window.location.pathname);

    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setScrolled(currentY > 40);
          const nav = navRef.current;
          if (nav) {
            if (currentY > lastY && currentY > 100) {
              nav.style.transform = 'translateY(-100%)';
            } else {
              nav.style.transform = 'translateY(0)';
            }
          }
          lastY = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    activePath === href || activePath === href + '/' ||
    (href !== BASE && href !== BASE.slice(0, -1) && activePath.startsWith(href));

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 50,
          background: theme.bg,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${scrolled ? theme.border : 'transparent'}`,
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease',
        }}
      >
        <div style={{
          width: '100%', maxWidth: '1160px', margin: '0 auto',
          padding: '0 2rem 0 1.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px',
        }}>

          {/* Logo */}
          <a
            href={BASE}
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0 }}
          >
            <img
              src={`${BASE}images/logo-integhra-isologotipo.png`}
              alt="Integhra"
              style={{ height: '84px', width: 'auto', objectFit: 'contain' }}
            />
          </a>

          {/* Desktop nav */}
          <div className="arq-nav-desktop">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="arq-nav-link"
                style={{
                  color: isActive(href) ? theme.accent : theme.link,
                  borderBottom: isActive(href)
                    ? `1px solid ${theme.accent}`
                    : '1px solid transparent',
                }}
              >
                {label}
              </a>
            ))}

            {/* Products pill */}
            <a
              href={`${BASE}#productos`}
              className="arq-nav-products"
              style={{
                background: theme.productBadgeBg,
                border: `1px solid ${theme.productBadgeBorder}`,
                color: theme.accent,
              }}
            >
              <span className="arq-nav-live-dot" />
              Vete · ARQ
            </a>

            <button
              onClick={() => setContactOpen(true)}
              className="arq-nav-cta"
              style={{ background: theme.ctaBg, color: theme.ctaText, border: 'none', cursor: 'pointer' }}
            >
              Contacto
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="arq-nav-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            style={{ color: theme.logo }}
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="arq-nav-mobile-menu" style={{ background: theme.menuBg, borderTop: `1px solid ${theme.border}` }}>
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="arq-nav-link arq-nav-link--mobile"
                style={{ color: isActive(href) ? theme.accent : theme.link }}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <a
              href={`${BASE}#productos`}
              className="arq-nav-link arq-nav-link--mobile"
              style={{ color: theme.link }}
              onClick={() => setMenuOpen(false)}
            >
              Nuestros productos
            </a>
            <button
              className="arq-nav-cta arq-nav-cta--mobile"
              style={{ background: theme.ctaBg, color: theme.ctaText, border: 'none', cursor: 'pointer' }}
              onClick={() => { setMenuOpen(false); setContactOpen(true); }}
            >
              Contacto
            </button>
          </div>
        )}

        {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
      </nav>

      <style>{`
        .arq-nav-link {
          font-family: Inter, sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          text-decoration: none;
          letter-spacing: 0.025em;
          transition: color 0.2s, border-color 0.2s;
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          padding: 0 2px;
          padding-bottom: 2px;
        }
        .arq-nav-link:hover { color: rgba(237,232,221,0.9) !important; }
        .arq-nav-products {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: Inter, sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          padding: 0.38rem 0.9rem;
          border-radius: 100px;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s;
        }
        .arq-nav-products:hover { opacity: 0.8; transform: translateY(-1px); }
        .arq-nav-live-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #4ecba8;
          animation: nav-live-pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes nav-live-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .arq-nav-cta {
          font-family: Inter, sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.58rem 1.25rem;
          border-radius: 100px;
          text-decoration: none;
          letter-spacing: 0.025em;
          transition: opacity 0.2s, transform 0.2s;
          min-height: 40px;
          display: inline-flex;
          align-items: center;
        }
        .arq-nav-cta:hover { opacity: 0.82; transform: translateY(-1px); }
        .arq-nav-hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 10px;
          min-width: 44px;
          min-height: 44px;
          align-items: center;
          justify-content: center;
        }
        .arq-nav-desktop {
          display: flex;
          align-items: center;
          gap: 1.75rem;
        }
        .arq-nav-mobile-menu {
          display: flex;
          flex-direction: column;
          padding: 0.75rem 1.75rem 1.5rem;
        }
        .arq-nav-link--mobile {
          padding: 0.85rem 0;
          font-size: 0.95rem;
          border-bottom: 1px solid rgba(128,128,128,0.08);
          min-height: 52px;
        }
        .arq-nav-cta--mobile {
          margin-top: 1rem;
          justify-content: center;
          border-radius: 8px;
          font-size: 0.95rem;
        }
        @media (max-width: 820px) {
          .arq-nav-desktop { display: none; }
          .arq-nav-hamburger { display: inline-flex; }
        }
      `}</style>
    </>
  );
}

import { useEffect, useRef, useState } from 'react';
import ContactModal from './ContactModal';

const THEMES = {
  dark: {
    bg: 'rgba(26,26,26,0.92)',
    border: 'rgba(200,169,110,0.12)',
    logo: '#C8A96E',
    link: '#888',
    accent: '#C8A96E',
    ctaBg: '#C8A96E',
    ctaText: '#fff',
    menuBg: 'rgba(26,26,26,0.98)',
  },
  light: {
    bg: 'rgba(255,255,255,0.92)',
    border: 'rgba(2,131,108,0.12)',
    logo: '#02836c',
    link: '#666',
    accent: '#02836c',
    ctaBg: '#02836c',
    ctaText: '#fff',
    menuBg: 'rgba(255,255,255,0.98)',
  },
};

export default function NavArq() {
  const navRef = useRef<HTMLElement>(null);
  const [activePath, setActivePath] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const isLight = activePath === '/institucional' || activePath === '/sobre-nosotros';
  const theme = isLight ? THEMES.light : THEMES.dark;

  useEffect(() => {
    setActivePath(window.location.pathname);

    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const nav = navRef.current;
          if (nav) {
            if (currentY > lastY && currentY > 80) {
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

  const link = (href: string, label: string, onClick?: () => void) => {
    const isActive = activePath === href || (href !== '/' && activePath.startsWith(href));
    return (
      <a
        href={href}
        className="arq-nav-link"
        style={{ color: isActive ? theme.accent : theme.link }}
        onClick={onClick}
      >
        {label}
      </a>
    );
  };

  return (
    <nav ref={navRef} style={{
      position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 50,
      background: theme.bg,
      backdropFilter: 'blur(16px)',
      borderBottom: `1px solid ${theme.border}`,
      transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    }}>
      <div style={{
        width: '100%', padding: '0 2rem 0 1.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px',
      }}>

        {/* Contenedor logo — pegado al borde izquierdo */}
        <a
          href="#"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0, cursor: 'pointer' }}
        >
          <img
            src="/images/logo-integhra-isologotipo.png"
            alt="Integhra"
            style={{ height: '88px', width: 'auto', objectFit: 'contain' }}
          />
        </a>

        {/* Contenedor navegación */}
        <div className="arq-nav-desktop">
          {link('/', 'Arquitectura')}
          {link('/institucional', 'Institucional')}
          {link('/sobre-nosotros', 'Sobre nosotros')}
          <button
            onClick={() => setContactOpen(true)}
            className="arq-nav-cta"
            style={{ background: theme.ctaBg, color: theme.ctaText, border: 'none', cursor: 'pointer' }}
          >
            Contacto
          </button>
        </div>

        {/* Hamburger button */}
        <button
          className="arq-nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          style={{ color: theme.logo }}
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="arq-nav-mobile-menu" style={{ background: theme.menuBg, borderTop: `1px solid ${theme.border}` }}>
          {link('/', 'Arquitectura', () => setMenuOpen(false))}
          {link('/institucional', 'Institucional', () => setMenuOpen(false))}
          {link('/sobre-nosotros', 'Sobre nosotros', () => setMenuOpen(false))}
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

      <style>{`
        .arq-nav-link {
          font-family: Inter, sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          text-decoration: none;
          letter-spacing: 0.03em;
          transition: color 0.2s;
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          padding: 0 4px;
        }
        .arq-nav-cta {
          font-family: Inter, sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          padding: 0.6rem 1.2rem;
          border-radius: 100px;
          text-decoration: none;
          letter-spacing: 0.03em;
          transition: opacity 0.2s;
          min-height: 44px;
          display: inline-flex;
          align-items: center;
        }
        .arq-nav-cta:hover { opacity: 0.85; }
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
          gap: 2rem;
        }
        .arq-nav-mobile-menu {
          display: flex;
          flex-direction: column;
          padding: 1rem 2rem 1.5rem;
          gap: 0;
        }
        .arq-nav-mobile-menu .arq-nav-link {
          padding: 0.75rem 0;
          font-size: 1rem;
          border-bottom: 1px solid rgba(128,128,128,0.1);
          min-height: 52px;
        }
        .arq-nav-cta--mobile {
          margin-top: 1rem;
          justify-content: center;
          border-radius: 8px;
          font-size: 0.95rem;
        }
        @media (max-width: 768px) {
          .arq-nav-desktop { display: none; }
          .arq-nav-hamburger { display: inline-flex; }
        }
      `}</style>
    </nav>
  );
}

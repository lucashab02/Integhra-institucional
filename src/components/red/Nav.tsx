import { useEffect, useRef, useState } from 'react';
import ContactModal from './ContactModal';
import './nav.css';

const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/');
import IsologoMark from '../marca/IsologoMark';

const LINKS = [
  { href: BASE, label: 'Inicio', line: 'ink', match: (p: string) => p === '' || p === '/' },
  { href: `${BASE}general`, label: 'Institucional', line: 'inst', match: (p: string) => p.startsWith('/general') },
  { href: `${BASE}sobre-nosotros`, label: 'Nosotros', line: 'nos', match: (p: string) => p.startsWith('/sobre-nosotros') },
];

export default function Nav() {
  const [path, setPath] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [contact, setContact] = useState(false);
  const [lifted, setLifted] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefix = BASE.slice(0, -1);
    const p = window.location.pathname;
    setPath(p.startsWith(prefix) ? p.slice(prefix.length) : p);

    const onContact = () => { setOpen(false); setContact(true); };
    window.addEventListener('integhra:contact', onContact);

    let io: IntersectionObserver | undefined;
    if (sentinel.current && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(([e]) => setLifted(!e.isIntersecting));
      io.observe(sentinel.current);
    }
    return () => {
      window.removeEventListener('integhra:contact', onContact);
      io?.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    document.documentElement.classList.toggle('menu-open', open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const active = (m: (p: string) => boolean) => path !== null && m(path);

  return (
    <>
      <div ref={sentinel} className="nv-sentinel" aria-hidden="true" />
      <header className={`nv${lifted ? ' is-lifted' : ''}${open ? ' is-open' : ''}`}>
        <div className="nv-bar">
          <a href={BASE} className="nv-brand" aria-label="Integhra, inicio">
            <IsologoMark size={34} />
            <span>Integhra</span>
          </a>

          <nav className="nv-links" aria-label="Principal">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="nv-link"
                style={{ ['--l' as string]: `var(--${l.line})` }}
                aria-current={active(l.match) ? 'page' : undefined}
              >
                {l.label}
              </a>
            ))}
            <a href={`${BASE}#productos`} className="nv-link nv-link--lines">
              <span className="nv-swatch" aria-hidden="true">
                <i style={{ background: 'var(--vet)' }} />
                <i style={{ background: 'var(--arq)' }} />
              </span>
              VET · ARQ
            </a>
          </nav>

          <button className="pill nv-cta" onClick={() => setContact(true)}>Contacto</button>

          <button
            className="nv-burger"
            aria-expanded={open}
            aria-controls="nv-menu"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span />
          </button>
        </div>

        <div id="nv-menu" className="nv-menu" hidden={!open}>
          <ol className="nv-menu-line">
            {LINKS.map((l) => (
              <li key={l.href} style={{ ['--l' as string]: `var(--${l.line})` }}>
                <a href={l.href} aria-current={active(l.match) ? 'page' : undefined} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
            <li style={{ ['--l' as string]: 'var(--vet)' }}>
              <a href={`${BASE}#productos`} onClick={() => setOpen(false)}>VET · ARQ</a>
            </li>
          </ol>
          <button className="pill nv-menu-cta" onClick={() => { setOpen(false); setContact(true); }}>
            Contacto
          </button>
        </div>
      </header>

      {contact && <ContactModal onClose={() => setContact(false)} />}
    </>
  );
}

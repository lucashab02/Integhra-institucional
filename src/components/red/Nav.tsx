import { useEffect, useRef, useState } from 'react';
import ContactModal, { type ContactKind } from './ContactModal';
import IsologoMark from '../marca/IsologoMark';
import { LINKS } from './links';
import './nav.css';

const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/');

export default function Nav() {
  const [path, setPath] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [contact, setContact] = useState<ContactKind | null>(null);
  const [lifted, setLifted] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefix = BASE.slice(0, -1);
    const p = window.location.pathname;
    setPath(p.startsWith(prefix) ? p.slice(prefix.length) : p);

    const onContact = (e: Event) => {
      setOpen(false);
      setContact((e as CustomEvent<{ kind?: ContactKind }>).detail?.kind ?? 'general');
    };
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
          </nav>

          <button className="pill nv-cta" onClick={() => setContact('general')}>Contacto</button>

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
          </ol>
          <button className="pill nv-menu-cta" onClick={() => { setOpen(false); setContact('general'); }}>
            Contacto
          </button>
        </div>
      </header>

      {contact && <ContactModal kind={contact} onClose={() => setContact(null)} />}
    </>
  );
}

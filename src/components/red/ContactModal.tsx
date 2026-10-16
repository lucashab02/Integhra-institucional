import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './forms.css';

const FORMSPREE_ID = 'xzdwlyva';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Props { onClose: () => void }

export default function ContactModal({ onClose }: Props) {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const first = useRef<HTMLInputElement>(null);
  const back = useRef<Element | null>(null);

  useEffect(() => {
    back.current = document.activeElement;
    first.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      (back.current as HTMLElement | null)?.focus?.();
    };
  }, [onClose]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !mensaje.trim()) { setError('Completá tu email y tu mensaje.'); return; }
    if (!EMAIL_RE.test(email.trim())) { setError('Ese email no parece válido. Revisalo y probá de nuevo.'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, _subject: 'INTEGHRA - CONTACTARME', mensaje }),
      });
      if (res.ok) setDone(true);
      else setError('No pudimos enviar el mensaje. Probá de nuevo en un momento.');
    } catch {
      setError('Sin conexión. Revisá tu internet y probá de nuevo.');
    }
    setLoading(false);
  };

  return createPortal(
    <div className="cm-scrim" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="cm" role="dialog" aria-modal="true" aria-labelledby="cm-title">
        <div className="cm-lines" aria-hidden="true">
          <i style={{ background: 'var(--vet)' }} />
          <i style={{ background: 'var(--inst)' }} />
          <i style={{ background: 'var(--nos)' }} />
          <i style={{ background: 'var(--arq)' }} />
        </div>
        <button className="cm-close" onClick={onClose} aria-label="Cerrar">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>

        {done ? (
          <div className="cm-done">
            <h2 id="cm-title" className="heading">Mensaje enviado.</h2>
            <p>Gracias por escribirnos. Te respondemos a <strong>{email}</strong> a la brevedad.</p>
            <button className="pill" onClick={onClose}>Cerrar</button>
          </div>
        ) : (
          <form className="cm-form" onSubmit={submit} noValidate>
            <h2 id="cm-title" className="heading">¿En qué podemos ayudarte?</h2>
            <div className="fld">
              <label htmlFor="cm-email">Email</label>
              <input
                ref={first}
                id="cm-email"
                type="email"
                autoComplete="email"
                placeholder="nombre@empresa.com"
                value={email}
                aria-invalid={!!error && !EMAIL_RE.test(email.trim())}
                onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
              />
            </div>
            <div className="fld">
              <label htmlFor="cm-msg">Mensaje</label>
              <textarea
                id="cm-msg"
                rows={4}
                placeholder="Contanos qué necesitás"
                value={mensaje}
                onChange={(e) => { setMensaje(e.target.value); if (error) setError(''); }}
              />
            </div>
            {error && <p className="fld-error" role="alert">{error}</p>}
            <button className="pill cm-send" type="submit" disabled={loading}>
              {loading ? 'Enviando…' : 'Enviar mensaje'}
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}

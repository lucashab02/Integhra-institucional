import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const FORMSPREE_ID = 'xzdwlyva';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap');

.cm-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 200;
  background: rgba(10,10,10,0.45);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  animation: cm-fade 0.18s ease;
}
@keyframes cm-fade { from { opacity: 0; } to { opacity: 1; } }

.cm-box {
  background: #fff;
  border-radius: 20px;
  width: 100%;
  max-width: 460px;
  position: relative;
  margin-top: 40px;
  animation: cm-up 0.28s cubic-bezier(0.16,1,0.3,1);
  box-shadow: 0 32px 80px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.05);
}
@keyframes cm-up {
  from { opacity: 0; transform: translateY(20px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0)   scale(1); }
}

/* top accent bar */
.cm-bar {
  height: 4px;
  background: linear-gradient(90deg, #02836c, #4ecba8);
}

.cm-inner { padding: 2.25rem 2.25rem 2rem; }

.cm-close {
  position: absolute; top: 1rem; right: 1rem;
  background: #f0f0f0; border: none; cursor: pointer;
  width: 36px; height: 36px; border-radius: 50%;
  display: grid; place-items: center;
  color: #555; transition: background 0.2s, color 0.2s;
  z-index: 10;
}
.cm-close:hover { background: #e0e0e0; color: #111; }

.cm-eyebrow {
  font-family: Inter, sans-serif;
  font-size: 0.68rem; font-weight: 700;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: #02836c; margin: 0 0 0.6rem;
}
.cm-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.55rem; font-weight: 700;
  color: #0d0d0d; margin: 0 0 1.75rem;
  letter-spacing: -0.025em; line-height: 1.2;
}

.cm-field { display: flex; flex-direction: column; gap: 0; margin-bottom: 0; }

.cm-row {
  display: flex; flex-direction: column;
  border-bottom: 1px solid #ebebeb;
  padding: 0.75rem 0;
  transition: border-color 0.2s;
}
.cm-row:focus-within { border-color: #02836c; }
.cm-row:first-child { border-top: 1px solid #ebebeb; }

.cm-label {
  font-family: Inter, sans-serif;
  font-size: 0.7rem; font-weight: 600;
  color: #aaa; letter-spacing: 0.08em;
  text-transform: uppercase; margin-bottom: 0.25rem;
}
.cm-input {
  font-family: Inter, sans-serif; font-size: 0.97rem;
  border: none; outline: none; color: #111;
  background: transparent; padding: 0; width: 100%;
}
.cm-input::placeholder { color: #ccc; }
textarea.cm-input { resize: none; height: 72px; }

.cm-submit {
  width: 100%; margin-top: 1.5rem;
  background: #0d0d0d; color: #fff;
  font-family: 'Plus Jakarta Sans', Inter, sans-serif;
  font-size: 0.92rem; font-weight: 600;
  border: none; border-radius: 100px; padding: 0.9rem;
  cursor: pointer; letter-spacing: 0.01em;
  transition: background 0.2s, transform 0.15s;
  position: relative; overflow: hidden;
}
.cm-submit::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(90deg, #02836c, #4ecba8);
  opacity: 0;
  transition: opacity 0.35s ease;
}
.cm-submit:hover:not(:disabled)::before { opacity: 1; }
.cm-submit span { position: relative; z-index: 1; }
.cm-submit:hover:not(:disabled) { transform: translateY(-1px); }
.cm-submit:disabled { opacity: 0.5; cursor: not-allowed; }

.cm-error {
  margin-top: 0.6rem; font-family: Inter, sans-serif;
  font-size: 0.8rem; color: #e05252; text-align: center;
}

.cm-success {
  display: flex; flex-direction: column; align-items: center;
  text-align: center; gap: 0.75rem; padding: 2.5rem 2.25rem 2.5rem;
}
.cm-success-icon {
  width: 60px; height: 60px; border-radius: 50%;
  background: linear-gradient(135deg, #02836c, #4ecba8);
  display: grid; place-items: center;
  box-shadow: 0 8px 24px rgba(2,131,108,0.3);
}
.cm-success-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.25rem; font-weight: 700; color: #0d0d0d;
  letter-spacing: -0.02em; margin: 0;
}
.cm-success-sub {
  font-family: Inter, sans-serif;
  font-size: 0.88rem; color: #999; margin: 0; line-height: 1.6;
}
.cm-success-btn {
  margin-top: 0.25rem; background: none; border: none;
  font-family: Inter, sans-serif; font-size: 0.82rem;
  color: #02836c; cursor: pointer;
  text-decoration: underline; text-underline-offset: 3px;
}
`;

interface Props { onClose: () => void; }

export default function ContactModal({ onClose }: Props) {
  const [nombre, setNombre]   = useState('');
  const [email, setEmail]     = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);
  const [error, setError]     = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !mensaje.trim()) {
      setError('Completá todos los campos.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, _subject: 'INTEGHRA - CONTACTARME', mensaje }),
      });
      if (res.ok) { setDone(true); }
      else { setError('Hubo un error. Intentá de nuevo.'); }
    } catch {
      setError('Sin conexión. Intentá de nuevo.');
    }
    setLoading(false);
  };

  const modal = (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="cm-overlay" ref={overlayRef} onClick={handleOverlayClick}>
        <div className="cm-box" role="dialog" aria-modal="true">
          <div className="cm-bar" />

          <button className="cm-close" onClick={onClose} aria-label="Cerrar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </button>

          {done ? (
            <div className="cm-success">
              <div className="cm-success-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12.5l4.5 4.5L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="cm-success-title">¡Mensaje enviado!</h3>
              <p className="cm-success-sub">Gracias por escribirnos.<br />Te respondemos a la brevedad.</p>
              <button className="cm-success-btn" onClick={onClose}>Cerrar</button>
            </div>
          ) : (
            <div className="cm-inner">
              <p className="cm-eyebrow">Contacto</p>
              <h2 className="cm-title">¿En qué podemos<br />ayudarte?</h2>

              <form onSubmit={handleSubmit} noValidate>
                <div className="cm-field">
                  <div className="cm-row">
                    <label className="cm-label">Email</label>
                    <input className="cm-input" type="email" placeholder="tu@mail.com" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                  <div className="cm-row">
                    <label className="cm-label">Mensaje</label>
                    <textarea className="cm-input" placeholder="Contanos en qué podemos ayudarte..." value={mensaje} onChange={e => setMensaje(e.target.value)} />
                  </div>
                </div>

                {error && <p className="cm-error">{error}</p>}

                <button className="cm-submit" type="submit" disabled={loading}>
                  <span>{loading ? 'Enviando...' : 'Enviar mensaje'}</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return createPortal(modal, document.body);
}

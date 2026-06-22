import { useState } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/');
const LOGO = `${BASE}images/logo-integhra-blanco.png`;
const FORMSPREE_ID = 'xzdwlyva';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200;0,300;0,800&display=swap');

.wl-section {
  min-height: 100vh;
  background: #111;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem;
  position: relative;
  overflow: hidden;
}

@media (max-width: 767px) {
  .wl-section {
    min-height: unset;
    padding: 5rem 1.5rem;
  }
}

.wl-logo {
  width: clamp(120px, 14vw, 200px);
  height: auto;
  object-fit: contain;
  opacity: 0.18;
  margin-bottom: 3.5rem;
  filter: brightness(0) invert(1);
}

.wl-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 200;
  font-size: clamp(22px, 3vw, 38px);
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: rgba(237,232,221,0.45);
  margin: 0;
  text-align: center;
  white-space: nowrap;
}

.wl-title strong {
  font-weight: 600;
  color: rgba(237,232,221,0.6);
}

.wl-sub {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.9rem, 1.4vw, 1.1rem);
  font-weight: 400;
  color: rgba(237,232,221,0.5);
  max-width: 540px;
  margin: 0 auto 3.25rem;
  line-height: 1.75;
}

.wl-sub strong {
  color: rgba(237,232,221,0.75);
  font-weight: 500;
}

.wl-divider {
  width: 24px;
  height: 1px;
  background: rgba(200,169,110,0.3);
  margin: 1.5rem auto;
}

.wl-form {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

.wl-row {
  display: flex;
  align-items: stretch;
  width: 100%;
  background: rgba(237,232,221,0.05);
  border: 1px solid rgba(237,232,221,0.12);
  border-radius: 4px;
  transition: border-color 0.3s ease, background 0.3s ease;
}
.wl-row:focus-within {
  border-color: rgba(200,169,110,0.5);
  background: rgba(237,232,221,0.07);
}

.wl-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #EDE8DD;
  font-family: 'Inter', sans-serif;
  font-size: 17px;
  padding: 18px 20px;
  min-width: 0;
}
.wl-input::placeholder {
  color: rgba(237,232,221,0.22);
}

.wl-btn {
  flex: none;
  border: none;
  border-left: 1px solid rgba(237,232,221,0.1);
  background: rgba(200,169,110,0.12);
  color: #C8A96E;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  padding: 18px 24px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background 0.25s ease, gap 0.25s ease;
  white-space: nowrap;
  border-radius: 0 4px 4px 0;
}
.wl-btn:hover { background: rgba(200,169,110,0.2); gap: 15px; }
.wl-btn svg { width: 14px; height: 14px; flex-shrink: 0; }

.wl-error {
  margin-top: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #E0A89B;
  text-align: center;
  letter-spacing: 0.02em;
}

.wl-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-align: center;
}

.wl-check {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(200,169,110,0.35);
  display: grid;
  place-items: center;
  margin-bottom: 0.5rem;
}

.wl-success-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 200;
  font-size: clamp(28px, 4vw, 42px);
  letter-spacing: -0.03em;
  color: #EDE8DD;
  margin: 0;
}

.wl-success-sub {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: rgba(237,232,221,0.4);
  margin: 0;
  line-height: 1.6;
}
.wl-email { color: #C8A96E; }

.wl-again {
  margin-top: 1rem;
  background: none;
  border: none;
  border-bottom: 1px solid rgba(200,169,110,0.2);
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(237,232,221,0.3);
  padding-bottom: 2px;
  transition: color 0.2s, border-color 0.2s;
}
.wl-again:hover { color: #C8A96E; border-color: #C8A96E; }

@media (max-width: 600px) {
  .wl-title { font-size: clamp(36px, 11vw, 60px); white-space: normal; text-align: center; }
}
`;

function Check() {
  return (
    <div className="wl-check">
      <svg viewBox="0 0 24 24" width="22" height="22">
        <path d="M5 12.5l4.5 4.5L19 7.5" stroke="#C8A96E" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    const v = email.trim();
    if (!v) { setError('Escribí tu mail para anotarte.'); return; }
    if (!EMAIL_RE.test(v)) { setError('Ese mail no parece válido.'); return; }
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email: v,
          _subject: 'INTEGHRA ARQ - ANOTARME',
          mensaje: 'INTEGHRA ARQ - ANOTARME',
        }),
      });
      if (res.ok) {
        setDone(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || 'Hubo un error. Intentá de nuevo.');
      }
    } catch {
      setError('Sin conexión. Intentá de nuevo.');
    }
    setLoading(false);
  };

  const reset = () => { setDone(false); setEmail(''); setError(''); };

  return (
    <>
      <style>{CSS}</style>
      <section className="wl-section">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>

          <img src={LOGO} alt="Integhra" className="wl-logo" />

          {!done ? (
            <>
              <h2 className="wl-title">
                Construyendo <strong>  Integhra ARQ</strong>
              </h2>

              <div className="wl-divider" />
              
              <p className="wl-sub">
                Sumate como <strong>Early Adopter</strong> y recibí novedades del lanzamiento.
              </p>

              <form className="wl-form" onSubmit={submit} noValidate>
                <div className="wl-row">
                  <input
                    className="wl-input"
                    type="email"
                    placeholder="Ingresá tu mail aquí"
                    value={email}
                    aria-label="Tu dirección de email"
                    onChange={e => { setEmail(e.target.value); error && setError(''); }}
                  />
                  <button className="wl-btn" type="submit" disabled={loading}>
                    {loading ? 'Enviando...' : 'Anotarme'}
                    {!loading && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6"/>
                      </svg>
                    )}
                  </button>
                </div>
                {error && <p className="wl-error">{error}</p>}
              </form>
            </>
          ) : (
            <div className="wl-success">
              <Check />
              <h3 className="wl-success-title">Quedaste anotado.</h3>
              <p className="wl-success-sub">
                Te escribimos a <span className="wl-email">{email}</span> cuando lancemos.
              </p>
              <button className="wl-again" onClick={reset}>Usar otro mail</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

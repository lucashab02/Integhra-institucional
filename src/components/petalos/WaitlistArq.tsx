import { useState } from 'react';
import './waitlist-arq.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FORMSPREE_ID = 'xzdwlyva';

export default function WaitlistArq() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = email.trim();
    if (!v) { setError('Escribí tu email para anotarte.'); return; }
    if (!EMAIL_RE.test(v)) { setError('Ese email no parece válido. Revisalo y probá de nuevo.'); return; }
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email: v, _subject: 'INTEGHRA ARQ - ANOTARME', mensaje: 'INTEGHRA ARQ - ANOTARME' }),
      });
      if (res.ok) setDone(true);
      else {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || 'No pudimos anotarte. Probá de nuevo en un momento.');
      }
    } catch {
      setError('Sin conexión. Revisá tu internet y probá de nuevo.');
    }
    setLoading(false);
  };

  return (
    <div id="waitlist" className="wla">
      <div className="wla-tape" aria-hidden="true" />
      <div className="wla-inner wrap">
        {!done ? (
          <>
            <h3 className="wla-title">Construyendo Integhra ARQ</h3>
            <p className="wla-sub">Sumate como early adopter y recibí novedades del lanzamiento.</p>
            <form className="wla-form" onSubmit={submit} noValidate>
              <label htmlFor="wla-email">Tu email</label>
              <div className="wla-row">
                <input
                  id="wla-email"
                  type="email"
                  autoComplete="email"
                  placeholder="nombre@estudio.com"
                  value={email}
                  aria-invalid={!!error}
                  aria-describedby={error ? 'wla-error' : undefined}
                  onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
                />
                <button type="submit" disabled={loading}>{loading ? 'Enviando…' : 'Anotarme'}</button>
              </div>
              {error && <p id="wla-error" className="wla-error" role="alert">{error}</p>}
            </form>
          </>
        ) : (
          <div role="status">
            <h3 className="wla-title">Quedaste anotado.</h3>
            <p className="wla-sub">Te escribimos a <strong>{email}</strong> cuando abra Integhra ARQ.</p>
            <button className="wla-again" onClick={() => { setDone(false); setEmail(''); }}>Usar otro email</button>
          </div>
        )}
      </div>
    </div>
  );
}

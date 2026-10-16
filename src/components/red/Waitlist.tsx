import { useState } from 'react';
import './forms.css';
import './waitlist.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FORMSPREE_ID = 'xzdwlyva';

export default function Waitlist() {
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
    <section
      id="waitlist"
      className="wl seg-arq"
      aria-labelledby="wl-title"
      data-seg=""
      data-stn=""
      style={{ ['--stn' as string]: 'calc(clamp(4.5rem, 12vh, 8rem) + 26px)' }}
    >
      <div className="wl-inner wrap">
        <table className="wl-board tnum">
          <caption className="sr-only">Próxima apertura de la red Integhra</caption>
          <thead>
            <tr>
              <th scope="col">Línea</th>
              <th scope="col">Destino</th>
              <th scope="col">Apertura</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="wl-bullet">ARQ</span></td>
              <td>Construcción y diseño</td>
              <td>Sept. 2026</td>
              <td><span className="wl-state">En obra</span></td>
            </tr>
          </tbody>
        </table>

        <div className="wl-body">
          {!done ? (
            <>
              <h2 id="wl-title" className="display wl-title">Construyendo Integhra ARQ</h2>
              <p className="wl-sub">Sumate como early adopter y recibí novedades del lanzamiento.</p>
              <form className="wl-form" onSubmit={submit} noValidate>
                <div className="fld">
                  <label htmlFor="wl-email">Tu email</label>
                  <div className="wl-row">
                    <input
                      id="wl-email"
                      type="email"
                      autoComplete="email"
                      placeholder="nombre@estudio.com"
                      value={email}
                      aria-invalid={!!error}
                      aria-describedby={error ? 'wl-error' : undefined}
                      onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
                    />
                    <button className="pill pill--arq" type="submit" disabled={loading}>
                      {loading ? 'Enviando…' : 'Anotarme'}
                    </button>
                  </div>
                </div>
                {error && <p id="wl-error" className="fld-error wl-error" role="alert">{error}</p>}
              </form>
            </>
          ) : (
            <div className="wl-done" role="status">
              <h2 id="wl-title" className="display wl-title">Quedaste anotado.</h2>
              <p className="wl-sub">Te escribimos a <strong>{email}</strong> cuando abra la línea.</p>
              <button className="pill pill--paper pill--ghost" onClick={() => { setDone(false); setEmail(''); }}>
                Usar otro email
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

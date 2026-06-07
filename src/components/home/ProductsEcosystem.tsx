import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CSS = `
.pe-section {
  background: #111;
  padding: 7rem 2rem 8rem;
  position: relative;
  overflow: hidden;
  min-height: auto;
  display: block;
}

/* Subtle background pattern */
.pe-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 0%, rgba(200,169,110,0.04) 0%, transparent 60%);
  pointer-events: none;
}

.pe-inner {
  max-width: 1160px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.pe-header {
  text-align: center;
  margin-bottom: 4.5rem;
}

.pe-eyebrow {
  display: inline-block;
  font-family: 'Inter', sans-serif;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #C8A96E;
  margin-bottom: 1.25rem;
}

.pe-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 200;
  font-size: clamp(2.2rem, 5vw, 3.75rem);
  color: #EDE8DD;
  letter-spacing: -0.04em;
  line-height: 1.1;
  margin: 0;
}

.pe-title strong {
  font-weight: 800;
}

.pe-sub {
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: rgba(237,232,221,0.4);
  margin: 1rem auto 0;
  max-width: 420px;
  line-height: 1.7;
}

/* ── Grid ─────────────────────────────────────────────── */
.pe-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  align-items: start;
}

/* ── Cards ────────────────────────────────────────────── */
.pe-card {
  border-radius: 20px;
  padding: 2.75rem 2.5rem;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.05);
  background: rgba(255,255,255,0.018);
  transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s ease, box-shadow 0.3s ease;
}

.pe-card:hover {
  transform: translateY(-6px);
}

.pe-card--vete {
  border-top: 2px solid #02836c;
}
.pe-card--vete:hover {
  box-shadow: 0 24px 64px rgba(2,131,108,0.14);
  border-color: rgba(2,131,108,0.3);
  border-top-color: #4ecba8;
}

.pe-card--arq {
  border-top: 2px solid #C8A96E;
}
.pe-card--arq:hover {
  box-shadow: 0 24px 64px rgba(200,169,110,0.1);
  border-color: rgba(200,169,110,0.25);
  border-top-color: #C8A96E;
}

/* Background glow per card */
.pe-card-glow {
  position: absolute;
  top: -40%;
  right: -30%;
  width: 350px;
  height: 400px;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.pe-card:hover .pe-card-glow {
  opacity: 1;
}

.pe-glow--vete {
  background: radial-gradient(ellipse, rgba(2,131,108,0.07) 0%, transparent 65%);
}

.pe-glow--arq {
  background: radial-gradient(ellipse, rgba(200,169,110,0.06) 0%, transparent 65%);
}

/* ── Badge ────────────────────────────────────────────── */
.pe-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 0.32rem 0.8rem;
  border-radius: 100px;
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

.pe-badge--live {
  background: rgba(34,197,94,0.08);
  color: #4ade80;
  border: 1px solid rgba(34,197,94,0.18);
}

.pe-badge-dot--live {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #4ade80;
  animation: pe-live 1.8s ease-in-out infinite;
}

@keyframes pe-live {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
  50% { opacity: 0.4; box-shadow: 0 0 0 5px rgba(74,222,128,0); }
}

.pe-badge--soon {
  background: rgba(245,158,11,0.08);
  color: #fbbf24;
  border: 1px solid rgba(245,158,11,0.18);
}

.pe-badge-dot--soon {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #fbbf24;
}

/* ── Card icon ─────────────────────────────────────────── */
.pe-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  flex-shrink: 0;
}

.pe-icon--vete {
  background: rgba(2,131,108,0.12);
  color: #4ecba8;
}

.pe-icon--arq {
  background: rgba(200,169,110,0.1);
  color: #C8A96E;
}

/* ── Card content ─────────────────────────────────────── */
.pe-card-name {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.55rem;
  font-weight: 800;
  color: #EDE8DD;
  margin: 0 0 0.3rem;
  letter-spacing: -0.025em;
}

.pe-card-tagline {
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  font-weight: 400;
  color: rgba(237,232,221,0.4);
  margin: 0 0 1.25rem;
  line-height: 1.5;
}

.pe-divider {
  height: 1px;
  background: rgba(255,255,255,0.05);
  margin: 0 0 1.5rem;
}

.pe-card-desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  line-height: 1.72;
  color: rgba(237,232,221,0.5);
  margin: 0 0 1.75rem;
}

/* ── Features list ────────────────────────────────────── */
.pe-features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin: 0 0 2.25rem;
  padding: 0;
}

.pe-feature {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 0.82rem;
  color: rgba(237,232,221,0.65);
  line-height: 1.4;
}

.pe-check {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.pe-check--vete { background: rgba(2,131,108,0.15); color: #4ecba8; }
.pe-check--arq  { background: rgba(200,169,110,0.12); color: #C8A96E; }

/* ── CTA button ───────────────────────────────────────── */
.pe-cta {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-family: 'Inter', sans-serif;
  font-size: 0.84rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 100px;
  padding: 0.72rem 1.5rem;
  transition: transform 0.2s, background 0.2s, gap 0.2s;
  cursor: pointer;
  border: none;
  letter-spacing: 0.01em;
}

.pe-cta:hover { gap: 13px; transform: translateY(-1px); }

.pe-cta--vete {
  background: rgba(2,131,108,0.12);
  color: #4ecba8;
  border: 1px solid rgba(2,131,108,0.2);
}
.pe-cta--vete:hover { background: rgba(2,131,108,0.2); }

.pe-cta--arq {
  background: rgba(200,169,110,0.1);
  color: #C8A96E;
  border: 1px solid rgba(200,169,110,0.18);
}
.pe-cta--arq:hover { background: rgba(200,169,110,0.18); }

/* ── Industry tag ─────────────────────────────────────── */
.pe-industry {
  position: absolute;
  top: 2.25rem;
  right: 2rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(237,232,221,0.18);
}

/* ── Stats row ────────────────────────────────────────── */
.pe-stats {
  display: flex;
  gap: 2rem;
  margin-top: 2.75rem;
  padding-top: 2.75rem;
  border-top: 1px solid rgba(255,255,255,0.05);
}

.pe-stat-value {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
  margin-bottom: 0.2rem;
}

.pe-stat-value--vete { color: #4ecba8; }
.pe-stat-value--arq  { color: #C8A96E; }

.pe-stat-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: rgba(237,232,221,0.35);
  line-height: 1.4;
}

/* ── Responsive ───────────────────────────────────────── */
@media (max-width: 860px) {
  .pe-grid {
    grid-template-columns: 1fr;
    max-width: 560px;
    margin-left: auto;
    margin-right: auto;
  }
  .pe-card { padding: 2.25rem 2rem; }
}

@media (max-width: 500px) {
  .pe-section { padding: 5rem 1.25rem 6rem; }
  .pe-stats { gap: 1.5rem; flex-wrap: wrap; }
}
`;

const VETE_FEATURES = [
  'Conexión directa sin intermediarios',
  'Catálogos digitales para distribuidores y laboratorios',
  'Red de veterinarias conectadas',
  'Pedidos, cotizaciones y gestión comercial unificada',
];

const ARQ_FEATURES = [
  'Portfolio digital para arquitectos y diseñadores',
  'Especificación inteligente de materiales y productos',
  'Conexión con proveedores, gremios y especialistas',
  'Del proyecto a la obra, en una sola plataforma',
];

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M1.5 5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

interface ProductsEcosystemProps {
  onArqWaitlistClick?: () => void;
}

export default function ProductsEcosystem({ onArqWaitlistClick }: ProductsEcosystemProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pe-header',
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        }
      );

      gsap.fromTo('.pe-card',
        { opacity: 0, y: 48 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.18, ease: 'power2.out',
          scrollTrigger: { trigger: '.pe-grid', start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToWaitlist = () => {
    if (onArqWaitlistClick) {
      onArqWaitlistClick();
    } else {
      document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <section className="pe-section" ref={sectionRef} id="productos">
        <div className="pe-inner">

          <div className="pe-header">
            <span className="pe-eyebrow">Nuestros productos</span>
            <h2 className="pe-title">
              Dos plataformas.<br /><strong>Una visión.</strong>
            </h2>
            <p className="pe-sub">
              Soluciones verticales que transforman industrias completas.<br />
              Cada una diseñada para su sector, todas bajo la filosofía <strong>Integhra</strong>.
            </p>
          </div>

          <div className="pe-grid">

            {/* ── Integhra Vete ───────────────────────────────── */}
            <div className="pe-card pe-card--vete">
              <div className="pe-card-glow pe-glow--vete" />
              <span className="pe-industry">Industria veterinaria</span>

              <div className="pe-badge pe-badge--live">
                <span className="pe-badge-dot--live" />
                En producción
              </div>

              <div className="pe-icon pe-icon--vete">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <circle cx="13" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M9.5 12c0-1.5.5-3.5 1.5-5M16.5 12c0-1.5-.5-3.5-1.5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  <path d="M6 7.5C4.5 6 3 4.5 2 3.5M20 7.5c1.5-1.5 3-3 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  <path d="M10 20l3 4 3-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div className="pe-card-name">Integhra Vete</div>
              <div className="pe-card-tagline">El ecosistema digital de la industria veterinaria.</div>

              <div className="pe-divider" />

              <p className="pe-card-desc">
                Conecta laboratorios, distribuidores y veterinarias en una plataforma diseñada para impulsar la transformación digital del sector y fortalecer toda su cadena de valor.
                Desde la promoción de productos hasta la gestión comercial, todo integrado en una sola plataforma.
              </p>

              <ul className="pe-features">
                {VETE_FEATURES.map(f => (
                  <li key={f} className="pe-feature">
                    <span className="pe-check pe-check--vete"><CheckIcon /></span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* TODO: Replace href with the actual Integhra Vete production URL */}
              <a href="#" className="pe-cta pe-cta--vete">
                Conocer Integhra Vete
                <ArrowIcon />
              </a>

              <div className="pe-stats">
                <div>
                  <div className="pe-stat-value pe-stat-value--vete">Operativo</div>
                  <div className="pe-stat-label">Estado actual</div>
                </div>
                <div>
                  <div className="pe-stat-value pe-stat-value--vete">ARG</div>
                  <div className="pe-stat-label">Mercado</div>
                </div>
                <div>
                  <div className="pe-stat-value pe-stat-value--vete">2024</div>
                  <div className="pe-stat-label">Inicio</div>
                </div>
                {/* <div>
                  <div className="pe-stat-value pe-stat-value--vete">B2B</div>
                  <div className="pe-stat-label">Modelo</div>
                </div> */}
              </div>
            </div>

            {/* ── Integhra ARQ ────────────────────────────────── */}
            <div className="pe-card pe-card--arq">
              <div className="pe-card-glow pe-glow--arq" />
              <span className="pe-industry">Industria arquitectura</span>

              <div className="pe-badge pe-badge--soon">
                <span className="pe-badge-dot--soon" />
                Próximamente
              </div>

              <div className="pe-icon pe-icon--arq">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <path d="M3 22h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M5 22V12l8-9 8 9v10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  <rect x="10" y="22" width="6" height="0" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="10" y="15" width="6" height="7" rx="1" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M10 12h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  <rect x="10" y="15" width="6" height="7" rx="1" fill="none"/>
                </svg>
              </div>

              <div className="pe-card-name">Integhra ARQ</div>
              <div className="pe-card-tagline">El ecosistema digital de la construcción y el diseño.</div>

              <div className="pe-divider" />

              <p className="pe-card-desc">
                Conecta proveedores, distribuidores, minoristas, profesionales, gremios, inmobiliarias, artistas y consumidores finales 
                en una única plataforma.
                Desde la inspiración y el diseño hasta la ejecución de la obra, todo integrado en un solo ecosistema digital.
              </p>

              <ul className="pe-features">
                {ARQ_FEATURES.map(f => (
                  <li key={f} className="pe-feature">
                    <span className="pe-check pe-check--arq"><CheckIcon /></span>
                    {f}
                  </li>
                ))}
              </ul>

              <button className="pe-cta pe-cta--arq" onClick={scrollToWaitlist}>
                Unirme a la lista de espera
                <ArrowIcon />
              </button>

              <div className="pe-stats">
                <div>
                  <div className="pe-stat-value pe-stat-value--arq">Desarrollo</div>
                  <div className="pe-stat-label">Estado actual</div>
                </div>
                <div>
                  <div className="pe-stat-value pe-stat-value--arq">ARG</div>
                  <div className="pe-stat-label">Mercado inicial</div>
                </div>
                <div>
                  <div className="pe-stat-value pe-stat-value--arq">Agosto 2026</div>
                  <div className="pe-stat-label">Lanzamiento</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

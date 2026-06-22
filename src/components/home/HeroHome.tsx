import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CSS = `
.ih-section {
  position: relative;
  min-height: 100vh;
  background: #1A1A1A;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(to bottom, black 72%, transparent 96%);
  mask-image: linear-gradient(to bottom, black 72%, transparent 96%);
}

/* Grain overlay */
.ih-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  background-size: 200px 200px;
  pointer-events: none;
  z-index: 1;
  opacity: 0.35;
}

.ih-glows {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.ih-glow-gold {
  position: absolute;
  top: -15%;
  left: 50%;
  transform: translateX(-50%);
  width: 900px;
  height: 650px;
  background: radial-gradient(ellipse at center, rgba(200,169,110,0.09) 0%, transparent 65%);
  border-radius: 50%;
}

.ih-glow-teal {
  position: absolute;
  bottom: 5%;
  left: -5%;
  width: 550px;
  height: 450px;
  background: radial-gradient(ellipse at center, rgba(2,131,108,0.07) 0%, transparent 65%);
  border-radius: 50%;
}

.ih-glow-teal-r {
  position: absolute;
  top: 20%;
  right: -5%;
  width: 400px;
  height: 400px;
  background: radial-gradient(ellipse at center, rgba(78,203,168,0.05) 0%, transparent 65%);
  border-radius: 50%;
}

/* Decorative grid lines */
.ih-grid {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(200,169,110,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(200,169,110,0.025) 1px, transparent 1px);
  background-size: 80px 80px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
}

.ih-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 1000px;
  padding: 140px 2rem 7rem;
  width: 100%;
}

.ih-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #C8A96E;
  margin-bottom: 2.25rem;
}

.ih-eyebrow-line {
  width: 28px;
  height: 1px;
  background: #C8A96E;
  opacity: 0.5;
}

.ih-eyebrow-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #C8A96E;
  animation: ih-dot-pulse 2.5s ease-in-out infinite;
}

@keyframes ih-dot-pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(200,169,110,0.4); }
  50% { opacity: 0.6; box-shadow: 0 0 0 6px rgba(200,169,110,0); }
}

.ih-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 200;
  font-size: clamp(52px, 10vw, 148px);
  line-height: 0.92;
  letter-spacing: -0.045em;
  color: #EDE8DD;
  margin: 0 0 1.75rem;
}

.ih-title strong {
  font-weight: 800;
}

.ih-title em {
  font-style: italic;
  font-weight: 300;
  color: rgba(237,232,221,0.45);
}

.ih-sub {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.9rem, 1.4vw, 1.1rem);
  font-weight: 400;
  color: rgba(237,232,221,0.5);
  max-width: 540px;
  margin: 0 auto 3.25rem;
  line-height: 1.75;
}

.ih-sub strong {
  color: rgba(237,232,221,0.75);
  font-weight: 500;
}

.ih-ctas {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.ih-btn-vete {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #0A0A0A;
  background: linear-gradient(135deg, #4ecba8 0%, #02836c 100%);
  padding: 0.9rem 1.85rem;
  border-radius: 100px;
  text-decoration: none;
  transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease;
  letter-spacing: 0.01em;
  box-shadow: 0 4px 24px rgba(2,131,108,0.3);
  border: none;
  cursor: pointer;
}

.ih-btn-vete:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 32px rgba(2,131,108,0.4);
}

.ih-btn-arq {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: rgba(237,232,221,0.88);
  background: rgba(200,169,110,0.06);
  padding: 0.9rem 1.85rem;
  border-radius: 100px;
  border: 1px solid rgba(200,169,110,0.45);
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, transform 0.2s, background 0.2s;
  letter-spacing: 0.01em;
}

.ih-btn-arq:hover {
  border-color: rgba(200,169,110,0.75);
  color: #C8A96E;
  transform: translateY(-2px);
  background: rgba(200,169,110,0.12);
}

.ih-products-badges {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 3rem;
}

.ih-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 0.45rem 1rem;
  border-radius: 100px;
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.ih-badge-vete {
  background: rgba(2,131,108,0.28);
  color: #7eecd0;
  border: 1px solid rgba(78,203,168,0.55);
}

.ih-badge-vete-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #7eecd0;
  animation: ih-live-pulse 1.8s ease-in-out infinite;
}

@keyframes ih-live-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}

.ih-badge-separator {
  color: rgba(237,232,221,0.45);
  font-size: 1.1rem;
  line-height: 1;
}

.ih-badge-arq {
  background: rgba(200,169,110,0.22);
  color: #dfc07e;
  border: 1px solid rgba(200,169,110,0.6);
}

.ih-badge-arq-icon {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #dfc07e;
}

/* Initial state for GSAP — prevents flash on hydration */
.ih-eyebrow,
.ih-title,
.ih-sub,
.ih-ctas,
.ih-products-badges {
  opacity: 0;
}

.ih-scroll-hint {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  z-index: 2;
}

.ih-scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, rgba(200,169,110,0.4), transparent);
  animation: ih-scroll-anim 2s ease-in-out infinite;
}

@keyframes ih-scroll-anim {
  0% { transform: scaleY(0); transform-origin: top; }
  50% { transform: scaleY(1); transform-origin: top; }
  51% { transform: scaleY(1); transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}

@media (max-width: 640px) {
  .ih-ctas {
    flex-direction: column;
    align-items: stretch;
    padding: 0 0.5rem;
  }
  .ih-btn-vete, .ih-btn-arq {
    justify-content: center;
  }
  .ih-scroll-hint { display: none; }
}
`;

interface HeroHomeProps {
  onArqWaitlistClick?: () => void;
}

export default function HeroHome({ onArqWaitlistClick }: HeroHomeProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const FROM = { opacity: 0, y: 28 };
      const EASE = 'power2.out';

      const tl = gsap.timeline();

      tl.fromTo('.ih-eyebrow',       FROM, { opacity: 1, y: 0, duration: 0.65, ease: EASE })
        .fromTo('.ih-title',         FROM, { opacity: 1, y: 0, duration: 0.85, ease: EASE }, '-=0.42')
        .fromTo('.ih-sub',           FROM, { opacity: 1, y: 0, duration: 0.65, ease: EASE }, '-=0.5')
        .fromTo('.ih-ctas',          FROM, { opacity: 1, y: 0, duration: 0.55, ease: EASE }, '-=0.4')
        .fromTo('.ih-products-badges', { opacity: 0 }, { opacity: 1, duration: 0.5, ease: EASE }, '-=0.15');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToProducts = () => {
    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
  };

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
      <section className="ih-section" ref={sectionRef}>
        <div className="ih-glows">
          <div className="ih-glow-gold" />
          <div className="ih-glow-teal" />
          <div className="ih-glow-teal-r" />
        </div>
        <div className="ih-grid" />

        <div className="ih-content">
          <div className="ih-eyebrow">
            <span className="ih-eyebrow-line" />
            <span className="ih-eyebrow-dot" />
            Tecnología para cada industria
            <span className="ih-eyebrow-line" />
          </div>

          <h1 className="ih-title">
            Conectamos<br />
            <em>cada</em> <strong>industria</strong>
          </h1>

          <p className="ih-sub">
            <strong>Integhra</strong> es la plataforma tecnológica que <strong>digitaliza y conecta</strong> proveedores,
            profesionales y consumidores. Soluciones verticales para sectores completos,
            sin intermediarios, sin vueltas.
          </p>

          <div className="ih-ctas">
            <button className="ih-btn-vete" onClick={scrollToProducts}>
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                <circle cx="8.5" cy="8.5" r="7" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M6 8.5c0-1 .3-2.5 1-3M11 8.5c0-1-.3-2.5-1-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                <path d="M4.5 5.5C3.5 4.5 2.5 3.5 2 3M12.5 5.5c1-1 2-2 2.5-2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              Conocé Integhra VET
            </button>
            <button className="ih-btn-arq" onClick={scrollToWaitlist}>
              Lista de espera ARQ
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M2.5 7.5h10M9 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className="ih-products-badges">
            <span className="ih-badge ih-badge-vete">
              <span className="ih-badge-vete-dot" />
              Integhra VET — En producción
            </span>
            <span className="ih-badge-separator">·</span>
            <span className="ih-badge ih-badge-arq">
              <span className="ih-badge-arq-icon" />
              Integhra ARQ — Próximamente
            </span>
          </div>
        </div>

        <div className="ih-scroll-hint">
          <div className="ih-scroll-line" />
        </div>
      </section>
    </>
  );
}

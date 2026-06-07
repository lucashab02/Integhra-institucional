import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CSS = `
.ab-section {
  background: #1A1A1A;
  padding: 6rem 2rem 3rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  min-height: auto;
  display: block;
}

.ab-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(200,169,110,0.2), transparent);
}

.ab-inner {
  max-width: 720px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.ab-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0.4rem 1rem;
  border-radius: 100px;
  border: 1px solid rgba(200,169,110,0.18);
  background: rgba(200,169,110,0.06);
  font-family: 'Inter', sans-serif;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(200,169,110,0.7);
  margin-bottom: 2rem;
}

.ab-badge-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(200,169,110,0.6);
}

.ab-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 200;
  font-size: clamp(1.8rem, 4vw, 2.75rem);
  color: rgba(237,232,221,0.55);
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin: 0 0 1rem;
}

.ab-title strong {
  font-weight: 700;
  color: rgba(237,232,221,0.85);
}

.ab-desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: rgba(237,232,221,0.3);
  line-height: 1.7;
  max-width: 480px;
  margin: 0 auto;
}

.ab-scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 3rem;
}

.ab-scroll-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(237,232,221,0.2);
}

.ab-scroll-chevrons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.ab-chevron {
  opacity: 0;
  animation: ab-chevron-flow 1.8s ease-in-out infinite;
  color: rgba(200,169,110,0.3);
}

.ab-chevron:nth-child(1) { animation-delay: 0s; }
.ab-chevron:nth-child(2) { animation-delay: 0.2s; }
.ab-chevron:nth-child(3) { animation-delay: 0.4s; }

@keyframes ab-chevron-flow {
  0%, 100% { opacity: 0; transform: translateY(-4px); }
  40%, 60% { opacity: 1; transform: translateY(0); }
}
`;

function Chevron() {
  return (
    <svg className="ab-chevron" width="16" height="10" viewBox="0 0 16 10" fill="none">
      <path d="M1 1l7 7 7-7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function ArqBridge() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ab-inner',
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <section className="ab-section" ref={sectionRef}>
        <div className="ab-inner">
          <div className="ab-badge">
            <span className="ab-badge-dot" />
            Integhra ARQ — Próximamente
          </div>
          <h2 className="ab-title">
            Así va a funcionar<br /><strong>Integhra ARQ</strong>
          </h2>
          <p className="ab-desc">
            <strong>Actores + Ecosistema. </strong>
            La plataforma que conecta a todos los actores de la construcción y el diseño en un único ecosistema digital.
          </p>
          <div className="ab-scroll-indicator">
            <span className="ab-scroll-label"><strong>Explorá cómo funciona</strong></span>
            <div className="ab-scroll-chevrons">
              <Chevron /><Chevron /><Chevron />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

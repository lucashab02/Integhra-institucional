import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SVG_W = 360;
const SVG_H = 340;

const nodes = [
  {
    id: 'cliente',
    label: 'Cliente',
    pain: 'Tiene la idea pero no sabe a quién llamar.',
    detail: 'Busca en Google, pregunta en grupos, pide recomendaciones. El proceso es lento, incierto y lleno de pasos en falso.',
    x: 180, y: 34,
    connIds: ['c-a', 'p-c'],
  },
  {
    id: 'arquitecto',
    label: 'Arquitecto',
    pain: 'Tiene el talento pero depende del boca a boca.',
    detail: 'Cada proyecto nuevo depende de alguien que lo conoce. El trabajo habla, pero no viaja.',
    x: 30, y: 296,
    connIds: ['c-a', 'a-p'],
  },
  {
    id: 'proveedor',
    label: 'Proveedor',
    pain: 'Tiene el producto pero no llega a quien decide.',
    detail: 'Sus materiales terminan en obras increíbles. Su marca, todavía no llegó a donde se toma la decisión.',
    x: 330, y: 296,
    connIds: ['a-p', 'p-c'],
  },
];

const connections = [
  { id: 'c-a', d: 'M 180 34 C 52 62, 8 175, 30 296' },
  { id: 'a-p', d: 'M 30 296 C 28 364, 332 364, 330 296' },
  { id: 'p-c', d: 'M 330 296 C 352 170, 308 50, 180 34' },
];

// Centroid
const CX = (180 + 30 + 330) / 3;
const CY = (34 + 296 + 296) / 3;

export default function Problem() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<Record<string, SVGPathElement>>({});
  const idleTweens = useRef<gsap.core.Tween[]>([]);

  const [active, setActive] = useState<string | null>(null);
  const activeData = nodes.find(n => n.id === active);

  const startIdle = () => {
    idleTweens.current.forEach(t => t.kill());
    idleTweens.current = [];

    connections.forEach((conn, i) => {
      const path = pathRefs.current[conn.id];
      if (!path) return;
      const t = gsap.to(path, {
        opacity: 0.38,
        duration: 2.2 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.7,
      });
      idleTweens.current.push(t);
    });

    const ct = gsap.to(centerRef.current, {
      scale: 1.1,
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
    idleTweens.current.push(ct);
  };

  const stopIdle = () => {
    idleTweens.current.forEach(t => t.kill());
    idleTweens.current = [];
  };

  // Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' } }
      );
      gsap.fromTo(diagramRef.current,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: diagramRef.current, start: 'top 82%',
            onEnter: startIdle,
          } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Hover — path highlights
  useEffect(() => {
    const activeNode = nodes.find(n => n.id === active);
    connections.forEach(conn => {
      const path = pathRefs.current[conn.id];
      if (!path) return;
      if (!active) {
        gsap.to(path, { attr: { stroke: '#1A1A1A', strokeWidth: 1.2 }, opacity: 0.35, duration: 0.45, ease: 'power2.out' });
      } else {
        const connected = activeNode?.connIds.includes(conn.id);
        gsap.to(path, {
          attr: { stroke: connected ? '#C8A96E' : '#1A1A1A', strokeWidth: connected ? 1.8 : 0.6 },
          opacity: connected ? 0.95 : 0.08,
          duration: 0.38, ease: 'power2.out',
        });
      }
    });
  }, [active]);

  // Panel animation
  useEffect(() => {
    if (!panelRef.current) return;
    if (active) {
      gsap.fromTo(panelRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.42, ease: 'power2.out' }
      );
    } else {
      gsap.to(panelRef.current, { opacity: 0, y: 6, duration: 0.25 });
    }
  }, [active]);

  const handleEnter = (id: string) => {
    stopIdle();
    setActive(id);
  };

  const handleLeave = () => {
    setActive(null);
    // restart idle after short delay so transitions finish
    setTimeout(startIdle, 450);
  };

  return (
    <section ref={sectionRef} className="bg-[#F7F5F2]" style={{ justifyContent: 'flex-start' }}>
      <div className="site-container-wide" style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        paddingTop: '5rem', paddingBottom: '5rem',
      }}>

        {/* Title */}
        <div ref={titleRef} style={{ opacity: 0, textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{
            color: '#C8A96E', fontSize: '0.65rem', fontWeight: 700,
            letterSpacing: '3px', textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif', display: 'block', marginBottom: '1rem',
          }}>
            El problema
          </span>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 300,
            color: '#1A1A1A', lineHeight: 1.1,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          }}>
            El mercado existe.
            <br />
            <em style={{ fontWeight: 600 }}>La conexión, todavía no.</em>
          </h2>
        </div>

        {/* Diagram + Panel */}
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: '4rem', flexWrap: 'wrap',
        }}>

          {/* SVG Triangle */}
          <div ref={diagramRef} style={{
            opacity: 0, position: 'relative',
            width: SVG_W, height: SVG_H, flexShrink: 0,
          }}>
            <svg
              width={SVG_W} height={SVG_H}
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
            >
              <defs>
                <radialGradient id="center-grad" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#D4B87A" />
                  <stop offset="100%" stopColor="#C8A96E" />
                </radialGradient>
                <filter id="prob-glow" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Curved paths */}
              {connections.map(conn => (
                <path
                  key={conn.id}
                  ref={el => { if (el) pathRefs.current[conn.id] = el; }}
                  d={conn.d}
                  fill="none"
                  stroke="#1A1A1A"
                  strokeWidth={1.2}
                  strokeLinecap="round"
                  style={{ opacity: 0.35 }}
                />
              ))}

              {/* Glow layer on active paths */}
              {connections.map(conn => (
                <path
                  key={conn.id + '-glow'}
                  d={conn.d}
                  fill="none"
                  stroke="#C8A96E"
                  strokeWidth={active && nodes.find(n => n.id === active)?.connIds.includes(conn.id) ? 8 : 0}
                  strokeLinecap="round"
                  style={{
                    opacity: 0.18,
                    filter: 'blur(5px)',
                    transition: 'stroke-width 0.4s ease',
                    pointerEvents: 'none',
                  }}
                />
              ))}
            </svg>

            {/* Center pulse */}
            <div ref={centerRef} style={{
              position: 'absolute',
              left: CX, top: CY,
              transform: 'translate(-50%, -50%)',
              width: 72, height: 72,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <img
                src="/logo-integhra.png"
                alt="Integhra"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>

            {/* Node circles */}
            {nodes.map(node => {
              const isTop = node.y < 100;
              const isActive = active === node.id;
              return (
                <button
                  key={node.id}
                  onMouseEnter={() => handleEnter(node.id)}
                  onMouseLeave={handleLeave}
                  style={{
                    position: 'absolute',
                    left: node.x, top: node.y,
                    transform: 'translate(-50%, -50%)',
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                  }}
                >
                  {isTop && (
                    <span style={{
                      fontFamily: 'Inter, sans-serif', fontSize: '8.5px', fontWeight: 600,
                      letterSpacing: '2px', textTransform: 'uppercase',
                      color: isActive ? '#C8A96E' : '#1A1A1A',
                      transition: 'color 0.3s ease', order: 0,
                    }}>
                      {node.label}
                    </span>
                  )}

                  <div style={{
                    width: isActive ? 56 : 46,
                    height: isActive ? 56 : 46,
                    borderRadius: '50%',
                    border: `1px solid ${isActive ? '#C8A96E' : 'rgba(200,169,110,0.35)'}`,
                    background: isActive
                      ? 'radial-gradient(circle at 35% 35%, #D4B87A, #C8A96E)'
                      : '#1A1A1A',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.38s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    boxShadow: isActive
                      ? '0 0 32px rgba(200,169,110,0.5), 0 4px 18px rgba(26,26,26,0.2)'
                      : '0 4px 16px rgba(26,26,26,0.18)',
                  }}>
                    <span style={{
                      fontFamily: 'Inter, sans-serif', fontSize: '8.5px', fontWeight: 700,
                      letterSpacing: '1.5px', textTransform: 'uppercase',
                      color: isActive ? '#1A1A1A' : '#C8A96E',
                      transition: 'color 0.3s ease',
                    }}>
                      {node.label.slice(0, 3)}
                    </span>
                  </div>

                  {!isTop && (
                    <span style={{
                      fontFamily: 'Inter, sans-serif', fontSize: '8.5px', fontWeight: 600,
                      letterSpacing: '2px', textTransform: 'uppercase',
                      color: isActive ? '#C8A96E' : '#AAAAAA',
                      transition: 'color 0.3s ease',
                    }}>
                      {node.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Glassmorphism Panel */}
          <div style={{ width: 280, minHeight: 180, display: 'flex', alignItems: 'center' }}>
            <div ref={panelRef} style={{ opacity: 0, width: '100%' }}>
              {activeData ? (
                <div style={{
                  background: 'rgba(26, 26, 26, 0.88)',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  border: '1px solid rgba(200, 169, 110, 0.2)',
                  borderRadius: '16px',
                  padding: '1.75rem 2rem',
                  boxShadow: '0 8px 36px rgba(26,26,26,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
                }}>
                  <div style={{
                    width: '20px', height: '1.5px',
                    background: '#C8A96E', borderRadius: '2px', marginBottom: '1rem',
                  }} />
                  <span style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 700,
                    letterSpacing: '2.5px', textTransform: 'uppercase',
                    color: '#C8A96E', display: 'block', marginBottom: '0.7rem',
                  }}>
                    {activeData.label}
                  </span>
                  <p style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600,
                    fontSize: '1.15rem', lineHeight: 1.35, color: '#F7F5F2', marginBottom: '0.7rem',
                  }}>
                    {activeData.pain}
                  </p>
                  <p style={{
                    fontFamily: 'Inter, sans-serif', fontWeight: 300,
                    fontSize: '0.78rem', lineHeight: 1.7, color: '#999',
                  }}>
                    {activeData.detail}
                  </p>
                </div>
              ) : (
                <p style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '0.65rem',
                  color: '#C0BAB2', letterSpacing: '1.5px', textTransform: 'uppercase',
                  lineHeight: 1.8,
                }}>
                  Pasá el cursor<br />sobre cada actor
                </p>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

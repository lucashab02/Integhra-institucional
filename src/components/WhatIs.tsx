import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const nodes = [
  { label: 'Cliente', angle: 270, icon: '◯' },
  { label: 'Arquitecto', angle: 0, icon: '◻' },
  { label: 'Proveedor', angle: 90, icon: '◇' },
  { label: 'Gremialista', angle: 180, icon: '△' },
];

export default function WhatIs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<HTMLDivElement[]>([]);
  const linesRef = useRef<SVGLineElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' }
        }
      );

      gsap.fromTo(textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: textRef.current, start: 'top 85%' }
        }
      );

      gsap.fromTo(diagramRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: diagramRef.current, start: 'top 80%' }
        }
      );

      nodesRef.current.forEach((node, i) => {
        gsap.fromTo(node,
          { opacity: 0, scale: 0 },
          {
            opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)',
            delay: 0.3 + i * 0.15,
            scrollTrigger: { trigger: diagramRef.current, start: 'top 80%' }
          }
        );
      });

      linesRef.current.forEach((line, i) => {
        if (!line) return;
        const length = line.getTotalLength?.() || 100;
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(line, {
          strokeDashoffset: 0, duration: 0.5, ease: 'power2.out',
          delay: 0.5 + i * 0.15,
          scrollTrigger: { trigger: diagramRef.current, start: 'top 80%' }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const radius = 110;
  const cx = 160;
  const cy = 160;

  const getPos = (angleDeg: number) => {
    const rad = (angleDeg - 90) * (Math.PI / 180);
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  };

  return (
    <section ref={sectionRef} className="bg-[#1A1A1A]">
      <div className="site-container-wide">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Text side */}
          <div>
            <div ref={titleRef} className="opacity-0 mb-8">
              <span className="text-[#C8A96E] text-xs font-bold tracking-[3px] uppercase font-['Inter'] block mb-4">
                Qué es Integhra
              </span>
              <h2
                className="font-['Plus_Jakarta_Sans'] font-light text-white leading-tight"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
              >
                Todos los que hacen posible
                <br />
                <em className="text-[#C8A96E] font-semibold">una obra.</em>
                <br />
                En un solo lugar.
              </h2>
            </div>
            <p
              ref={textRef}
              className="opacity-0 font-['Inter'] font-light text-[#888888] leading-relaxed"
              style={{ fontSize: '1.05rem' }}
            >
              Integhra es la plataforma donde proveedores, distribuidores, minoristas, profesionales, gremios, inmobiliarias, artistas y consumidores finales se encuentran en el momento
              exacto en que se necesitan. No reemplaza la confianza
              del mercado argentino — la amplifica.
            </p>
          </div>

          {/* Diagram side */}
          <div ref={diagramRef} className="opacity-0 flex justify-center">
            <div className="relative" style={{ width: 320, height: 320 }}>
              <svg width="320" height="320" viewBox="0 0 320 320" className="absolute inset-0">
                {nodes.map((node, i) => {
                  const pos = getPos(node.angle);
                  return (
                    <line
                      key={i}
                      ref={el => { if (el) linesRef.current[i] = el; }}
                      x1={cx} y1={cy}
                      x2={pos.x} y2={pos.y}
                      stroke="#C8A96E"
                      strokeWidth="1"
                      strokeOpacity="0.4"
                    />
                  );
                })}
              </svg>

              {/* Center */}
              <div
                className="absolute flex items-center justify-center"
                style={{
                  left: cx - 40, top: cy - 40,
                  width: 80, height: 80,
                  background: '#C8A96E',
                  borderRadius: 4,
                }}
              >
                <span className="font-['Inter'] font-black text-[#1A1A1A] text-xs tracking-widest">
                  INTEGHRA
                </span>
              </div>

              {/* Nodes */}
              {nodes.map((node, i) => {
                const pos = getPos(node.angle);
                return (
                  <div
                    key={i}
                    ref={el => { if (el) nodesRef.current[i] = el; }}
                    className="absolute flex flex-col items-center opacity-0"
                    style={{ left: pos.x - 40, top: pos.y - 24, width: 80 }}
                  >
                    <div className="w-10 h-10 rounded-full border border-[#C8A96E] border-opacity-40 flex items-center justify-center mb-1 bg-[#222222]">
                      <span className="text-[#C8A96E] text-sm">{node.icon}</span>
                    </div>
                    <span className="font-['Inter'] text-[10px] text-[#888888] tracking-wider uppercase text-center">
                      {node.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

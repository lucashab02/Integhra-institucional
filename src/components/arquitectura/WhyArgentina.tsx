import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WhyArgentina() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(quoteRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: quoteRef.current, start: 'top 80%' }
        }
      );

      gsap.fromTo(textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.3,
          scrollTrigger: { trigger: textRef.current, start: 'top 85%' }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F7F5F2]">
      <div className="site-container" style={{ textAlign: 'center' }}>

        {/* Label */}
        <span className="text-[#C8A96E] text-xs font-bold tracking-[3px] uppercase font-['Inter'] block mb-12">
          Por qué Argentina
        </span>

        {/* Quote */}
        <div ref={quoteRef} className="opacity-0 mb-12">
          <p
            className="font-['Plus_Jakarta_Sans'] font-light text-[#1A1A1A] leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 5vw, 3.2rem)' }}
          >
            "El mercado de la arquitectura en Argentina
            <br />
            sigue funcionando por contactos y referencias.
            <br />
            <em className="font-semibold text-[#1A1A1A]">
              Integhra no reemplaza esa confianza —
            </em>
            <br />
            <em className="font-semibold text-[#C8A96E]">
              la amplifica."
            </em>
          </p>
        </div>

        {/* Supporting text */}
        <div ref={textRef} className="opacity-0 max-w-2xl mx-auto">
          <div className="w-8 h-px bg-[#C8A96E] mx-auto mb-8" />
          <p className="font-['Inter'] font-light text-[#666666] text-base leading-relaxed">
            El talento arquitectónico argentino es reconocido en el mundo.
            Lo que falta es la infraestructura digital que lo conecte con
            quienes lo necesitan. Ese es el espacio que Integhra viene a ocupar.
          </p>
        </div>

      </div>
    </section>
  );
}

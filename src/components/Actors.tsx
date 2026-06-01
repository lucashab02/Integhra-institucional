import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const actors = [
  {
    id: 'cliente',
    label: 'Cliente',
    headline: 'Encontrá el profesional que entiende tu estilo.',
    detail: 'Buscás por estilo, zona y tipo de obra. Cuando encontrás lo que imaginás, el equipo que lo hizo está a un clic.',
    number: '01',
    bg: '#F7F5F2',
    text: '#1A1A1A',
    accent: '#C8A96E',
  },
  {
    id: 'arquitecto',
    label: 'Arquitecto',
    headline: 'Tu trabajo visible para quien lo está buscando.',
    detail: 'Tu portfolio online, armado automáticamente con tus proyectos. Clientes que llegan con la decisión casi tomada.',
    number: '02',
    bg: '#1A1A1A',
    text: '#FFFFFF',
    accent: '#C8A96E',
  },
  {
    id: 'proveedor',
    label: 'Proveedor',
    headline: 'Tu catálogo en manos de quien especifica.',
    detail: 'Acceso directo a los arquitectos activos en obra. Presupuestos sin intermediarios. Métricas de qué productos generan más consultas.',
    number: '03',
    bg: '#F7F5F2',
    text: '#1A1A1A',
    accent: '#C8A96E',
  },
  {
    id: 'gremialista',
    label: 'Gremialista',
    headline: 'Tu oficio conectado con cada obra nueva.',
    detail: 'Cuando un arquitecto busca tu rubro en tu zona, aparecés. Sin depender de que te conozcan — solo de que te necesiten.',
    number: '04',
    bg: '#1A1A1A',
    text: '#FFFFFF',
    accent: '#C8A96E',
  },
];

export default function Actors() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' }
        }
      );

      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: { trigger: card, start: 'top 88%' }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F7F5F2]">
      <div className="site-container-wide">

        {/* Title */}
        <div ref={titleRef} className="opacity-0 text-center mb-24">
          <span className="text-[#C8A96E] text-xs font-bold tracking-[3px] uppercase font-['Inter'] block mb-4">
            Los actores
          </span>
          <h2
            className="font-['Plus_Jakarta_Sans'] font-light text-[#1A1A1A] leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Cuatro roles.
            <br />
            <em className="font-semibold">Un solo ecosistema.</em>
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {actors.map((actor, i) => (
            <div
              key={actor.id}
              ref={el => { if (el) cardsRef.current[i] = el; }}
              className="opacity-0 group relative overflow-hidden rounded-sm p-12 cursor-default transition-transform duration-500 hover:-translate-y-1"
              style={{ background: actor.bg }}
            >
              {/* Number */}
              <span
                className="font-['Plus_Jakarta_Sans'] font-light absolute top-8 right-10 text-6xl leading-none select-none"
                style={{ color: actor.accent, opacity: 0.15 }}
              >
                {actor.number}
              </span>

              {/* Label */}
              <span
                className="font-['Inter'] text-xs font-bold tracking-[3px] uppercase block mb-4"
                style={{ color: actor.accent }}
              >
                {actor.label}
              </span>

              {/* Headline */}
              <h3
                className="font-['Plus_Jakarta_Sans'] font-semibold leading-snug mb-4"
                style={{ color: actor.text, fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)' }}
              >
                {actor.headline}
              </h3>

              {/* Detail */}
              <p
                className="font-['Inter'] font-light text-sm leading-relaxed"
                style={{ color: actor.text, opacity: 0.6 }}
              >
                {actor.detail}
              </p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                style={{ background: actor.accent }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

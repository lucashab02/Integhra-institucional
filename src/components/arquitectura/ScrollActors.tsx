import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────

const LEFT_CONTENT = [
  {
    num: '01',
    headline: 'Encontrá el profesional\nque entiende tu visión.',
    sub: 'Filtrás por estilo, zona y tipo de obra. Cuando algo te representa, el arquitecto que lo hizo está a un mensaje.',
  },
  {
    num: '02',
    headline: 'Tu portfolio trabaja para\nvos las 24 horas.',
    sub: 'Subís tu trabajo una vez. La plataforma lo muestra a quienes buscan exactamente lo que hacés.',
  },
  {
    num: '03',
    headline: 'Tus materiales, en el\nmomento en que se decide.',
    sub: 'Los arquitectos ven tus productos cuando especifican para una obra real. Sin intermediarios.',
  },
  {
    num: '04',
    headline: 'Tu oficio conectado\ncon cada obra nueva.',
    sub: 'Cuando un arquitecto necesita tu rubro en tu zona, aparecés. El trabajo llega a vos, no al revés.',
  },
];

// cx / cy = viewBox coordinates (0–100), matching SVG nodes exactly
// side = external direction (left nodes extend LEFT, right nodes extend RIGHT)
const ACTORS = [
  { num: '01', title: 'Cliente',     cx: 30, cy: 6,  side: 'left'  as const },
  { num: '02', title: 'Arquitecto',  cx: 62, cy: 32, side: 'right' as const },
  { num: '03', title: 'Proveedor',   cx: 30, cy: 62, side: 'left'  as const },
  { num: '04', title: 'Gremios',     cx: 62, cy: 86, side: 'right' as const },
];

const SEGS = [
  { x1: 30, y1: 6,  x2: 62, y2: 32, d: 'M 30 6  L 62 32' },
  { x1: 62, y1: 32, x2: 30, y2: 62, d: 'M 62 32 L 30 62' },
  { x1: 30, y1: 62, x2: 62, y2: 86, d: 'M 30 62 L 62 86' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ScrollActors() {
  const outerRef    = useRef<HTMLDivElement>(null);
  const stickyRef   = useRef<HTMLDivElement>(null);
  const leftRefs    = useRef<HTMLDivElement[]>([]);
  const segRefs     = useRef<SVGPathElement[]>([]);
  const nodeRefs    = useRef<{ outer: SVGCircleElement | null; inner: SVGCircleElement | null }[]>([]);
  const labelRefs   = useRef<HTMLDivElement[]>([]);
  const particleRef = useRef<SVGCircleElement[]>([]);
  const tickRefs    = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Initial state ────────────────────────────────────────────────────

      // Left panels
      gsap.set(leftRefs.current[0], { opacity: 1, y: 0 });
      leftRefs.current.slice(1).forEach(el => gsap.set(el, { opacity: 0, y: 20 }));

      // Segments — use actual path length so GSAP CSS and SVG stay in sync
      segRefs.current.forEach(el => {
        if (!el) return;
        const len = el.getTotalLength();
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
      });

      // Nodes + labels hidden
      ACTORS.forEach((actor, i) => {
        const { outer, inner } = nodeRefs.current[i] || {};
        if (outer) gsap.set(outer, { opacity: 0, scale: 0.2, transformOrigin: 'center' });
        if (inner) gsap.set(inner, { opacity: 0, scale: 0.2, transformOrigin: 'center' });

        const label = labelRefs.current[i];
        if (label) {
          // Left labels slide in from right (toward node), right labels from left
          const xFrom = actor.side === 'left' ? 10 : -10;
          gsap.set(label, { opacity: 0, x: xFrom });
        }
      });

      // Particles hidden at segment start
      SEGS.forEach((seg, i) => {
        if (particleRef.current[i])
          gsap.set(particleRef.current[i], { opacity: 0, attr: { cx: seg.x1, cy: seg.y1 } });
      });

      // ── Timeline ─────────────────────────────────────────────────────────

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: stickyRef.current,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            let active = 0;
            if (p >= 0.22) active = 1;
            if (p >= 0.46) active = 2;
            if (p >= 0.70) active = 3;
            tickRefs.current.forEach((t, i) => {
              if (t) t.style.background = i <= active ? '#C8A96E' : 'rgba(200,169,110,0.2)';
            });
          },
        },
      });

      // Node + label appear as one unified element
      const revealActor = (i: number, at: number, dur: number) => {
        const { outer, inner } = nodeRefs.current[i] || {};
        const label = labelRefs.current[i];

        tl.to(outer, { opacity: 1, scale: 1, duration: dur, ease: 'back.out(2.5)' }, at)
          .to(inner, { opacity: 1, scale: 1, duration: dur * 0.7, ease: 'back.out(2.5)' }, at + dur * 0.15)
          .to(label, { opacity: 1, x: 0, duration: dur, ease: 'power3.out' }, at); // same `at` — in sync
      };

      // Segment draws with traveling particle
      const drawSeg = (i: number, at: number, dur: number) => {
        const seg = SEGS[i];
        const p   = particleRef.current[i];
        // Animate strokeDashoffset → 0 (full length already set via getTotalLength in init)
        tl.to(segRefs.current[i], { strokeDashoffset: 0, duration: dur, ease: 'power1.inOut' }, at);

        if (p) {
          tl.to(p, { opacity: 1, duration: dur * 0.06 }, at)
            .to(p, { attr: { cx: seg.x2, cy: seg.y2 }, duration: dur * 0.84, ease: 'power1.inOut' }, '<')
            .to(p, { opacity: 0, duration: dur * 0.10 }, `>-${dur * 0.10}`);
        }
      };

      // Left panel crossfade
      const crossLeft = (from: number, to: number, at: number) => {
        tl.to(leftRefs.current[from], { opacity: 0, y: -14, duration: 0.07, ease: 'power2.in' }, at)
          .fromTo(leftRefs.current[to],
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0,  duration: 0.10, ease: 'power2.out' },
            `<+=0.04`
          );
      };

      // ── Sequence ─────────────────────────────────────────────────────────
      revealActor(0, 0.00, 0.09);

      drawSeg(0, 0.11, 0.10);
      crossLeft(0, 1, 0.19);
      revealActor(1, 0.22, 0.09);

      drawSeg(1, 0.34, 0.11);
      crossLeft(1, 2, 0.43);
      revealActor(2, 0.46, 0.09);

      drawSeg(2, 0.58, 0.11);
      crossLeft(2, 3, 0.67);
      revealActor(3, 0.70, 0.09);

    }, outerRef);

    return () => ctx.revert();
  }, []);

  // ─── JSX ──────────────────────────────────────────────────────────────────

  return (
    <div
      ref={outerRef}
      style={{ position: 'relative', width: '100%', height: '500vh', background: '#F7F5F2' }}
    >
      <div
        ref={stickyRef}
        style={{
          position: 'sticky', top: 0,
          width: '100%', height: '100vh',
          overflow: 'hidden', background: '#F7F5F2',
          display: 'flex', alignItems: 'center',
        }}
      >
        {/* Grid — double scale: fine (40px) + major (200px), like technical paper */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: [
            'linear-gradient(to right, rgba(31,29,26,0.07) 1px, transparent 1px)',
            'linear-gradient(to bottom, rgba(31,29,26,0.07) 1px, transparent 1px)',
            'linear-gradient(to right, rgba(31,29,26,0.14) 1px, transparent 1px)',
            'linear-gradient(to bottom, rgba(31,29,26,0.14) 1px, transparent 1px)',
          ].join(','),
          backgroundSize: '40px 40px, 40px 40px, 200px 200px, 200px 200px',
        }} />
        {/* Vignette — lighter so grid stays readable */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 60% 50%, rgba(247,245,242,0) 20%, rgba(240,236,228,0.55) 100%)',
        }} />

        {/* Stage */}
        <div style={{
          position: 'relative', zIndex: 2,
          width: '100%', maxWidth: '1360px',
          margin: '0 auto', padding: '0 5rem',
          display: 'grid',
          gridTemplateColumns: '0.75fr 1.25fr',
          alignItems: 'center',
          gap: '6rem',
        }}>

          {/* ── LEFT: dynamic ── */}
          <div style={{ position: 'relative', minHeight: '240px', paddingLeft: '1.5rem', borderLeft: '1px solid rgba(200,169,110,0.25)' }}>
            {/* Corner tick top */}
            <div style={{ position: 'absolute', top: 0, left: -1, width: '12px', height: '1px', background: '#C8A96E', opacity: 0.6 }} />
            <div style={{ position: 'absolute', bottom: 0, left: -1, width: '12px', height: '1px', background: '#C8A96E', opacity: 0.6 }} />

            <span style={{
              display: 'block',
              color: '#C8A96E', fontFamily: 'Inter, sans-serif',
              fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.4em', textTransform: 'uppercase',
              marginBottom: '3rem',
            }}>
              Los actores
            </span>

            {LEFT_CONTENT.map((item, i) => (
              <div
                key={i}
                ref={el => { if (el) leftRefs.current[i] = el; }}
                style={{
                  position: i === 0 ? 'relative' : 'absolute',
                  top: i === 0 ? undefined : '2.75rem',
                  left: 0, right: 0,
                  display: 'flex', flexDirection: 'column', gap: '1.25rem',
                }}
              >
                {/* Counter */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '11px',
                    fontWeight: 700, letterSpacing: '0.25em',
                    color: '#C8A96E',
                  }}>
                    {item.num}
                  </span>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(200,169,110,0.25)' }} />
                  <span style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '11px',
                    fontWeight: 400, letterSpacing: '0.2em',
                    color: 'rgba(200,169,110,0.35)',
                  }}>
                    04
                  </span>
                </div>

                <h2 style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)',
                  lineHeight: 1.08,
                  color: '#14120f',
                  margin: 0,
                  whiteSpace: 'pre-line',
                  letterSpacing: '-0.01em',
                }}>
                  {item.headline}
                </h2>

                {/* Rule before body */}
                <div style={{ width: '32px', height: '1px', background: 'rgba(200,169,110,0.4)' }} />

                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 300, fontSize: '0.875rem',
                  lineHeight: 1.7, color: '#6b665f',
                  margin: 0, maxWidth: '22rem',
                }}>
                  {item.sub}
                </p>
              </div>
            ))}
          </div>

          {/* ── RIGHT: plane — SVG lines + nodes + labels as one unit ── */}
          <div style={{
            position: 'relative', width: '100%',
            height: 'clamp(460px, 66vh, 600px)',
          }}>
            {/* Technical frame — thin border with corner crosshairs */}
            <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(31,29,26,0.1)', pointerEvents: 'none' }} />
            {/* Corner crosshairs */}
            {[
              { top: -4, left: -4 }, { top: -4, right: -4 },
              { bottom: -4, left: -4 }, { bottom: -4, right: -4 },
            ].map((pos, i) => (
              <div key={i} style={{ position: 'absolute', ...pos, width: 8, height: 8, pointerEvents: 'none' }}>
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: '#C8A96E', opacity: 0.5 }} />
                <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: '#C8A96E', opacity: 0.5 }} />
              </div>
            ))}

            {/* SVG: only lines + nodes + particles */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                overflow: 'visible', pointerEvents: 'none',
              }}
            >
              {/* Segments — no dash attrs here, GSAP sets everything via getTotalLength() */}
              {SEGS.map((seg, i) => (
                <path
                  key={i}
                  ref={el => { if (el) segRefs.current[i] = el; }}
                  d={seg.d}
                  fill="none"
                  stroke="#C8A96E"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  style={{
                    vectorEffect: 'non-scaling-stroke',
                    strokeDasharray: 9999,
                    strokeDashoffset: 9999,
                  } as React.CSSProperties}
                />
              ))}

              {/* Nodes — ghost ring + outer ring + inner dot */}
              {ACTORS.map((actor, i) => (
                <g key={i}>
                  {/* Ghost ring — blueprint aesthetic */}
                  <circle
                    cx={actor.cx} cy={actor.cy} r="3.2"
                    fill="none" stroke="#C8A96E" strokeWidth="0.5"
                    opacity="0.18"
                  />
                  {/* Outer ring */}
                  <circle
                    ref={el => {
                      if (!nodeRefs.current[i]) nodeRefs.current[i] = { outer: null, inner: null };
                      nodeRefs.current[i].outer = el;
                    }}
                    cx={actor.cx} cy={actor.cy} r="1.7"
                    fill="#F7F5F2" stroke="#C8A96E" strokeWidth="1.2"
                  />
                  {/* Inner dot */}
                  <circle
                    ref={el => {
                      if (!nodeRefs.current[i]) nodeRefs.current[i] = { outer: null, inner: null };
                      nodeRefs.current[i].inner = el;
                    }}
                    cx={actor.cx} cy={actor.cy} r="0.7"
                    fill="#C8A96E"
                  />
                </g>
              ))}

              {/* Particles */}
              {SEGS.map((seg, i) => (
                <circle
                  key={`p${i}`}
                  ref={el => { if (el) particleRef.current[i] = el; }}
                  cx={seg.x1} cy={seg.y1}
                  r="0.9"
                  fill="#C8A96E"
                  style={{ filter: 'drop-shadow(0 0 1.5px rgba(200,169,110,0.9))' }}
                />
              ))}
            </svg>

            {/* Labels — clean annotation chip aligned to node center */}
            {ACTORS.map((actor, i) => {
              const isLeft = actor.side === 'left';
              return (
                <div
                  key={actor.num}
                  ref={el => { if (el) labelRefs.current[i] = el; }}
                  style={{
                    position: 'absolute',
                    top: `${actor.cy}%`,
                    transform: 'translateY(-50%)',
                    ...(isLeft
                      ? { right: `calc(${100 - actor.cx}% + 18px)` }
                      : { left:  `calc(${actor.cx}% + 18px)` }
                    ),
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 10px',
                    background: 'rgba(247,245,242,0.85)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(31,29,26,0.12)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {/* Number — monospace gold */}
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '9px',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    color: '#C8A96E',
                    lineHeight: 1,
                  }}>
                    {actor.num}
                  </span>

                  {/* Divider */}
                  <div style={{ width: '1px', height: '12px', background: 'rgba(31,29,26,0.15)', flexShrink: 0 }} />

                  {/* Title */}
                  <span style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: 'clamp(0.7rem, 1.1vw, 0.82rem)',
                    lineHeight: 1,
                    color: '#14120f',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                  }}>
                    {actor.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress */}
        <div style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          bottom: '2.5rem', display: 'flex', gap: '0.75rem', zIndex: 3,
        }}>
          {ACTORS.map((_, i) => (
            <span
              key={i}
              ref={el => { if (el) tickRefs.current[i] = el; }}
              style={{
                display: 'block', width: '36px', height: '1px',
                background: i === 0 ? '#C8A96E' : 'rgba(200,169,110,0.2)',
                transition: 'background 0.4s ease',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

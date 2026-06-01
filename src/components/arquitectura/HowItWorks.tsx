import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────

const CARDS = [
  { id: 1, brand: 'Proyecto A', proj: 'RESIDENCIA RECOLETA',   grad: 'linear-gradient(155deg,#2A2520 0%,#1A1A1A 100%)', accent: 'rgba(200,169,110,0.18)', x: '62%', y: '38%', w: 220, h: 280, rot: -2 },
  { id: 2, brand: 'Proyecto B', proj: 'CASA PILAR',            grad: 'linear-gradient(155deg,#1E2228 0%,#1A1A1A 100%)', accent: 'rgba(140,170,200,0.12)', x: '78%', y: '55%', w: 200, h: 240, rot: 3 },
  { id: 3, brand: 'Proyecto C', proj: 'OFICINA PUERTO MADERO', grad: 'linear-gradient(155deg,#252520 0%,#1A1A1A 100%)', accent: 'rgba(200,180,140,0.08)', x: '46%', y: '62%', w: 240, h: 200, rot: -1 },
  { id: 4, brand: 'Proyecto D', proj: 'QUINTA SAN ISIDRO',     grad: 'linear-gradient(155deg,#28201E 0%,#1A1A1A 100%)', accent: 'rgba(210,140,110,0.14)', x: '30%', y: '40%', w: 210, h: 260, rot: 2 },
  { id: 5, brand: 'Proyecto E', proj: 'LOFT PALERMO',          grad: 'linear-gradient(155deg,#1E2520 0%,#1A1A1A 100%)', accent: 'rgba(140,200,160,0.10)', x: '82%', y: '32%', w: 180, h: 220, rot: -3 },
  { id: 6, brand: 'Proyecto F', proj: 'STUDIO VILLA CRESPO',   grad: 'linear-gradient(155deg,#222028 0%,#1A1A1A 100%)', accent: 'rgba(170,150,210,0.12)', x: '26%', y: '60%', w: 220, h: 220, rot: 1 },
];
const FEATURED_ID = 3;

const MATERIALS = [
  { name: 'Mármol',     grad: 'linear-gradient(135deg,#d8d4cc 0%,#6a6862 100%)', badge: true  },
  { name: 'Roble',      grad: 'linear-gradient(135deg,#8b5a3c 0%,#3a2418 100%)', badge: false },
  { name: 'Hormigón',   grad: 'linear-gradient(135deg,#7a7874 0%,#38362f 100%)', badge: true  },
  { name: 'Bronce',     grad: 'linear-gradient(135deg,#b08858 0%,#4a3220 100%)', badge: false },
  { name: 'Cuarzo',     grad: 'linear-gradient(135deg,#e6e2d8 0%,#908a78 100%)', badge: false },
  { name: 'Nogal',      grad: 'linear-gradient(135deg,#6a4628 0%,#2a1a10 100%)', badge: true  },
  { name: 'Acero',      grad: 'linear-gradient(135deg,#9a9c9e 0%,#2a2c30 100%)', badge: false },
  { name: 'Travertino', grad: 'linear-gradient(135deg,#c8b698 0%,#5a4838 100%)', badge: true  },
  { name: 'Lino',       grad: 'linear-gradient(135deg,#c8bea8 0%,#786a52 100%)', badge: false },
];

const NODES = [
  { id: 'cliente',    label: 'Cliente',    n: '01', x: 26, y: 30 },
  { id: 'arquitecto', label: 'Profesional', n: '02', x: 50, y: 50 },
  { id: 'proveedor',  label: 'Proveedor',  n: '03', x: 74, y: 32 },
  { id: 'gremios',    label: 'Gremios',    n: '04', x: 50, y: 78 },
];

const LINKS: [string, string][] = [
  ['cliente', 'arquitecto'],
  ['arquitecto', 'proveedor'],
  ['arquitecto', 'gremios'],
  ['proveedor', 'gremios'],
  ['cliente', 'proveedor'],
  ['cliente', 'gremios'],
];

const SLOTS = [
  { label: '01 — EL CLIENTE',     headline: 'Buscás',          em: 'inspiración.',       body: 'Explorás proyectos reales de profesionales de la construcción. Filtrás por estilo, escala y zona.' },
  { label: '02 — EL ENCUENTRO',   headline: 'Algo te',         em: 'representa.',        body: 'Encontrás la obra que imaginabas. El profesional que la hizo está a un mensaje.' },
  { label: '03 — EL PROFESIONAL', headline: 'La consulta',     em: 'llega.',             body: 'El profesional recibe el contacto directo. Sin intermediarios, sin agencias en el medio.' },
  { label: '04 — LOS MATERIALES', headline: 'El profesional',  em: 'elige.',             body: 'Accede a proveedores y materiales desde la misma plataforma. Todo en un lugar.' },
  { label: '05 — LA CONEXIÓN',    headline: 'Todo',            em: 'coordinado.',        body: 'Clientes, profesionales, proveedores y gremios en el momento exacto en que se necesitan.' },
  { label: 'INTEGHRA',            headline: 'Así se hace',     em: 'una obra.',          body: 'De la idea a la realidad. Sin intermediarios, sin vueltas.', cta: true },
];

const PROGRESS_STEPS = ['INSPIRACIÓN', 'ENCUENTRO', 'CONSULTA', 'MATERIALES', 'CONEXIÓN', 'OBRA'];

// ─── Floor plan blueprints (one per card, Plan C matches Scene 6) ─────────────

const G = '#C8A96E';

const BLUEPRINTS: Array<{ viewBox: string; el: () => React.ReactNode }> = [
  // 0: RESIDENCIA RECOLETA — 3-room apartment
  {
    viewBox: '0 0 220 280',
    el: () => (
      <>
        <rect x="14" y="20" width="192" height="240" stroke={G} strokeWidth="2.5"/>
        <line x1="120" y1="20" x2="120" y2="260" stroke={G} strokeWidth="1.5"/>
        <line x1="14" y1="148" x2="120" y2="148" stroke={G} strokeWidth="1.5"/>
        <line x1="14" y1="200" x2="75" y2="200" stroke={G} strokeWidth="1.5"/>
        <line x1="120" y1="140" x2="206" y2="140" stroke={G} strokeWidth="1.2" opacity="0.7"/>
        <path d="M 75 200 A 22 22 0 0 1 53 222" stroke={G} strokeWidth="0.8" opacity="0.6"/>
        <path d="M 120 90 A 18 18 0 0 0 138 108" stroke={G} strokeWidth="0.8" opacity="0.6"/>
        <path d="M 120 180 A 18 18 0 0 1 102 198" stroke={G} strokeWidth="0.8" opacity="0.6"/>
        <rect x="25" y="40" width="70" height="28" stroke={G} strokeWidth="0.6" opacity="0.3"/>
        <line x1="25" y1="55" x2="95" y2="55" stroke={G} strokeWidth="0.4" opacity="0.25"/>
        <rect x="30" y="100" width="50" height="32" rx="4" stroke={G} strokeWidth="0.6" opacity="0.3"/>
        <rect x="130" y="30" width="60" height="80" stroke={G} strokeWidth="0.6" opacity="0.3"/>
        <line x1="130" y1="52" x2="190" y2="52" stroke={G} strokeWidth="0.4" opacity="0.25"/>
        <rect x="130" y="158" width="55" height="75" stroke={G} strokeWidth="0.6" opacity="0.3"/>
        <line x1="130" y1="178" x2="185" y2="178" stroke={G} strokeWidth="0.4" opacity="0.25"/>
        <rect x="20" y="208" width="22" height="18" rx="3" stroke={G} strokeWidth="0.5" opacity="0.3"/>
        <ellipse cx="56" cy="218" rx="10" ry="7" stroke={G} strokeWidth="0.5" opacity="0.3"/>
        <rect x="16" y="152" width="85" height="10" stroke={G} strokeWidth="0.5" opacity="0.3"/>
        <line x1="40" y1="20" x2="90" y2="20" stroke="#1A1A1A" strokeWidth="2.5"/>
        <line x1="40" y1="17" x2="90" y2="17" stroke={G} strokeWidth="0.7" opacity="0.45"/>
        <line x1="40" y1="23" x2="90" y2="23" stroke={G} strokeWidth="0.7" opacity="0.45"/>
        <line x1="14" y1="10" x2="206" y2="10" stroke={G} strokeWidth="0.4" opacity="0.2"/>
        <line x1="14" y1="8" x2="14" y2="12" stroke={G} strokeWidth="0.4" opacity="0.2"/>
        <line x1="206" y1="8" x2="206" y2="12" stroke={G} strokeWidth="0.4" opacity="0.2"/>
      </>
    ),
  },
  // 1: CASA PILAR — house with covered terrace
  {
    viewBox: '0 0 200 240',
    el: () => (
      <>
        <rect x="14" y="18" width="172" height="180" stroke={G} strokeWidth="2.5"/>
        <rect x="14" y="198" width="105" height="24" stroke={G} strokeWidth="1.2" opacity="0.55"/>
        <line x1="105" y1="18" x2="105" y2="198" stroke={G} strokeWidth="1.5"/>
        <line x1="14" y1="105" x2="105" y2="105" stroke={G} strokeWidth="1.2" opacity="0.7"/>
        <line x1="105" y1="130" x2="186" y2="130" stroke={G} strokeWidth="1.2" opacity="0.7"/>
        <path d="M 105 60 A 20 20 0 0 1 85 80" stroke={G} strokeWidth="0.8" opacity="0.6"/>
        <path d="M 105 140 A 18 18 0 0 0 123 158" stroke={G} strokeWidth="0.8" opacity="0.6"/>
        <rect x="22" y="26" width="55" height="55" stroke={G} strokeWidth="0.6" opacity="0.3"/>
        <line x1="22" y1="44" x2="77" y2="44" stroke={G} strokeWidth="0.4" opacity="0.25"/>
        <rect x="22" y="116" width="55" height="55" stroke={G} strokeWidth="0.6" opacity="0.3"/>
        <line x1="22" y1="134" x2="77" y2="134" stroke={G} strokeWidth="0.4" opacity="0.25"/>
        <rect x="118" y="28" width="55" height="80" stroke={G} strokeWidth="0.6" opacity="0.3"/>
        <line x1="118" y1="44" x2="173" y2="44" stroke={G} strokeWidth="0.4" opacity="0.2"/>
        <rect x="112" y="137" width="22" height="18" rx="3" stroke={G} strokeWidth="0.5" opacity="0.3"/>
        <ellipse cx="156" cy="158" rx="10" ry="7" stroke={G} strokeWidth="0.5" opacity="0.3"/>
        <line x1="40" y1="198" x2="40" y2="222" stroke={G} strokeWidth="0.5" opacity="0.2"/>
        <line x1="70" y1="198" x2="70" y2="222" stroke={G} strokeWidth="0.5" opacity="0.2"/>
        <line x1="55" y1="18" x2="90" y2="18" stroke="#1A1A1A" strokeWidth="2.5"/>
        <line x1="55" y1="15" x2="90" y2="15" stroke={G} strokeWidth="0.7" opacity="0.45"/>
        <line x1="55" y1="21" x2="90" y2="21" stroke={G} strokeWidth="0.7" opacity="0.45"/>
        <line x1="14" y1="8" x2="186" y2="8" stroke={G} strokeWidth="0.4" opacity="0.2"/>
        <line x1="14" y1="6" x2="14" y2="10" stroke={G} strokeWidth="0.4" opacity="0.2"/>
        <line x1="186" y1="6" x2="186" y2="10" stroke={G} strokeWidth="0.4" opacity="0.2"/>
      </>
    ),
  },
  // 2: OFICINA PUERTO MADERO — exact same plan as Scene 6 (FEATURED_ID=3)
  {
    viewBox: '10 10 540 360',
    el: () => (
      <>
        <rect x="10" y="10" width="540" height="360" stroke={G} strokeWidth="2.5"/>
        <line x1="250" y1="10"  x2="250" y2="200" stroke={G} strokeWidth="1.5"/>
        <line x1="10"  y1="200" x2="250" y2="200" stroke={G} strokeWidth="1.5"/>
        <line x1="250" y1="120" x2="400" y2="120" stroke={G} strokeWidth="1.5"/>
        <line x1="400" y1="10"  x2="400" y2="200" stroke={G} strokeWidth="1.5"/>
        <line x1="400" y1="200" x2="250" y2="200" stroke={G} strokeWidth="1.5"/>
        <line x1="400" y1="120" x2="550" y2="120" stroke={G} strokeWidth="1.5"/>
        <line x1="180" y1="200" x2="180" y2="370" stroke={G} strokeWidth="1.5"/>
        <line x1="180" y1="280" x2="400" y2="280" stroke={G} strokeWidth="1.5"/>
        <line x1="400" y1="200" x2="400" y2="370" stroke={G} strokeWidth="1.5"/>
        <path d="M 240 200 A 30 30 0 0 1 270 230" stroke={G} strokeWidth="1" opacity="0.7"/>
        <path d="M 250 100 A 25 25 0 0 0 275 125" stroke={G} strokeWidth="1" opacity="0.7"/>
        <rect x="40"  y="40"  width="160" height="50"  stroke={G} strokeWidth="0.8" opacity="0.5"/>
        <rect x="40"  y="110" width="60"  height="60"  stroke={G} strokeWidth="0.8" opacity="0.5"/>
        <rect x="280" y="40"  width="100" height="20"  stroke={G} strokeWidth="0.8" opacity="0.5"/>
        <rect x="280" y="80"  width="80"  height="20"  stroke={G} strokeWidth="0.8" opacity="0.5"/>
        <rect x="40"  y="220" width="120" height="60"  stroke={G} strokeWidth="0.8" opacity="0.5"/>
        <rect x="220" y="300" width="160" height="50"  stroke={G} strokeWidth="0.8" opacity="0.5"/>
        <rect x="420" y="30"  width="100" height="60"  stroke={G} strokeWidth="0.8" opacity="0.5"/>
      </>
    ),
  },
  // 3: QUINTA SAN ISIDRO — L-shape large house
  {
    viewBox: '0 0 210 260',
    el: () => (
      <>
        <polyline points="14,20 14,245 196,245 196,115 110,115 110,20 14,20" stroke={G} strokeWidth="2.5" fill="none"/>
        <line x1="14" y1="100" x2="110" y2="100" stroke={G} strokeWidth="1.4" opacity="0.7"/>
        <line x1="62" y1="20" x2="62" y2="100" stroke={G} strokeWidth="1.2" opacity="0.7"/>
        <line x1="62" y1="100" x2="62" y2="245" stroke={G} strokeWidth="1.4" opacity="0.7"/>
        <line x1="14" y1="170" x2="196" y2="170" stroke={G} strokeWidth="1.2" opacity="0.7"/>
        <line x1="130" y1="170" x2="130" y2="245" stroke={G} strokeWidth="1.2" opacity="0.7"/>
        <path d="M 62 75 A 18 18 0 0 1 44 93" stroke={G} strokeWidth="0.8" opacity="0.6"/>
        <path d="M 62 145 A 16 16 0 0 0 78 161" stroke={G} strokeWidth="0.8" opacity="0.6"/>
        <rect x="18" y="28" width="32" height="50" stroke={G} strokeWidth="0.5" opacity="0.3"/>
        <line x1="18" y1="44" x2="50" y2="44" stroke={G} strokeWidth="0.4" opacity="0.25"/>
        <rect x="74" y="28" width="28" height="48" stroke={G} strokeWidth="0.5" opacity="0.3"/>
        <line x1="74" y1="44" x2="102" y2="44" stroke={G} strokeWidth="0.4" opacity="0.25"/>
        <rect x="18" y="108" width="18" height="22" rx="3" stroke={G} strokeWidth="0.5" opacity="0.3"/>
        <ellipse cx="48" cy="118" rx="9" ry="6" stroke={G} strokeWidth="0.5" opacity="0.3"/>
        <rect x="18" y="180" width="32" height="50" stroke={G} strokeWidth="0.5" opacity="0.3"/>
        <rect x="70" y="180" width="45" height="30" rx="3" stroke={G} strokeWidth="0.5" opacity="0.3"/>
        <rect x="138" y="178" width="46" height="55" stroke={G} strokeWidth="0.5" opacity="0.3"/>
        <line x1="138" y1="195" x2="184" y2="195" stroke={G} strokeWidth="0.4" opacity="0.2"/>
        <line x1="25" y1="20" x2="55" y2="20" stroke="#1A1A1A" strokeWidth="2.5"/>
        <line x1="25" y1="17" x2="55" y2="17" stroke={G} strokeWidth="0.7" opacity="0.45"/>
        <line x1="25" y1="23" x2="55" y2="23" stroke={G} strokeWidth="0.7" opacity="0.45"/>
        <line x1="14" y1="10" x2="110" y2="10" stroke={G} strokeWidth="0.4" opacity="0.2"/>
        <line x1="14" y1="8" x2="14" y2="12" stroke={G} strokeWidth="0.4" opacity="0.2"/>
        <line x1="110" y1="8" x2="110" y2="12" stroke={G} strokeWidth="0.4" opacity="0.2"/>
      </>
    ),
  },
  // 4: LOFT PALERMO — open plan, minimal walls
  {
    viewBox: '0 0 180 220',
    el: () => (
      <>
        <rect x="14" y="16" width="152" height="188" stroke={G} strokeWidth="2.5"/>
        <line x1="14" y1="150" x2="60" y2="150" stroke={G} strokeWidth="1.4" opacity="0.7"/>
        <line x1="60" y1="150" x2="60" y2="204" stroke={G} strokeWidth="1.4" opacity="0.7"/>
        <rect x="100" y="158" width="55" height="16" stroke={G} strokeWidth="1.2" opacity="0.6"/>
        <path d="M 14 150 A 22 22 0 0 0 36 172" stroke={G} strokeWidth="0.8" opacity="0.6"/>
        <rect x="20" y="158" width="20" height="16" rx="3" stroke={G} strokeWidth="0.5" opacity="0.3"/>
        <ellipse cx="46" cy="170" rx="9" ry="7" stroke={G} strokeWidth="0.5" opacity="0.3"/>
        <rect x="24" y="26" width="80" height="55" stroke={G} strokeWidth="0.6" opacity="0.3"/>
        <line x1="24" y1="46" x2="104" y2="46" stroke={G} strokeWidth="0.4" opacity="0.25"/>
        <rect x="80" y="90" width="55" height="35" rx="4" stroke={G} strokeWidth="0.5" opacity="0.3"/>
        <rect x="22" y="95" width="45" height="20" stroke={G} strokeWidth="0.5" opacity="0.3"/>
        <line x1="22" y1="108" x2="67" y2="108" stroke={G} strokeWidth="0.4" opacity="0.25"/>
        <line x1="30" y1="16" x2="80" y2="16" stroke="#1A1A1A" strokeWidth="2.5"/>
        <line x1="30" y1="13" x2="80" y2="13" stroke={G} strokeWidth="0.8" opacity="0.45"/>
        <line x1="30" y1="19" x2="80" y2="19" stroke={G} strokeWidth="0.8" opacity="0.45"/>
        <line x1="95" y1="16" x2="145" y2="16" stroke="#1A1A1A" strokeWidth="2.5"/>
        <line x1="95" y1="13" x2="145" y2="13" stroke={G} strokeWidth="0.8" opacity="0.45"/>
        <line x1="95" y1="19" x2="145" y2="19" stroke={G} strokeWidth="0.8" opacity="0.45"/>
        <line x1="14" y1="85" x2="166" y2="85" stroke={G} strokeWidth="0.4" opacity="0.15" strokeDasharray="4 4"/>
        <line x1="14" y1="7" x2="166" y2="7" stroke={G} strokeWidth="0.4" opacity="0.2"/>
        <line x1="14" y1="5" x2="14" y2="9" stroke={G} strokeWidth="0.4" opacity="0.2"/>
        <line x1="166" y1="5" x2="166" y2="9" stroke={G} strokeWidth="0.4" opacity="0.2"/>
      </>
    ),
  },
  // 5: STUDIO VILLA CRESPO — compact studio
  {
    viewBox: '0 0 220 220',
    el: () => (
      <>
        <rect x="14" y="14" width="192" height="192" stroke={G} strokeWidth="2.5"/>
        <line x1="14" y1="152" x2="206" y2="152" stroke={G} strokeWidth="1.4" opacity="0.7"/>
        <line x1="120" y1="152" x2="120" y2="206" stroke={G} strokeWidth="1.2" opacity="0.7"/>
        <line x1="14" y1="80" x2="50" y2="80" stroke={G} strokeWidth="1.2" opacity="0.5"/>
        <path d="M 120 152 A 22 22 0 0 0 98 174" stroke={G} strokeWidth="0.8" opacity="0.6"/>
        <path d="M 50 80 A 18 18 0 0 1 68 98" stroke={G} strokeWidth="0.8" opacity="0.6"/>
        <rect x="24" y="24" width="80" height="60" stroke={G} strokeWidth="0.6" opacity="0.3"/>
        <line x1="24" y1="42" x2="104" y2="42" stroke={G} strokeWidth="0.4" opacity="0.25"/>
        <rect x="115" y="60" width="70" height="26" stroke={G} strokeWidth="0.5" opacity="0.3"/>
        <line x1="115" y1="74" x2="185" y2="74" stroke={G} strokeWidth="0.4" opacity="0.2"/>
        <rect x="115" y="24" width="70" height="24" stroke={G} strokeWidth="0.5" opacity="0.3"/>
        <rect x="130" y="160" width="22" height="18" rx="3" stroke={G} strokeWidth="0.5" opacity="0.3"/>
        <ellipse cx="170" cy="180" rx="10" ry="7" stroke={G} strokeWidth="0.5" opacity="0.3"/>
        <rect x="18" y="158" width="80" height="10" stroke={G} strokeWidth="0.5" opacity="0.3"/>
        <rect x="30" y="175" width="55" height="22" stroke={G} strokeWidth="0.5" opacity="0.3"/>
        <line x1="45" y1="14" x2="100" y2="14" stroke="#1A1A1A" strokeWidth="2.5"/>
        <line x1="45" y1="11" x2="100" y2="11" stroke={G} strokeWidth="0.7" opacity="0.45"/>
        <line x1="45" y1="17" x2="100" y2="17" stroke={G} strokeWidth="0.7" opacity="0.45"/>
        <line x1="14" y1="6" x2="206" y2="6" stroke={G} strokeWidth="0.4" opacity="0.2"/>
        <line x1="14" y1="4" x2="14" y2="8" stroke={G} strokeWidth="0.4" opacity="0.2"/>
        <line x1="206" y1="4" x2="206" y2="8" stroke={G} strokeWidth="0.4" opacity="0.2"/>
      </>
    ),
  },
];

// ─── Styles (static — not Tailwind-dependent) ─────────────────────────────────

const S = {
  gold:    '#C8A96E',
  bg:      '#1A1A1A',
  text:    '#FFFFFF',
  muted:   '#888888',
  line:    'rgba(200,169,110,0.15)',
  lineStr: 'rgba(200,169,110,0.35)',
};

// ─── Mobile version ───────────────────────────────────────────────────────────

function MobileStep({ slot, index, isLast }: { slot: typeof SLOTS[0]; index: number; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ display: 'flex', gap: '1.25rem', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.5s ease ${index * 0.06}s, transform 0.5s ease ${index * 0.06}s` }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 24, flexShrink: 0 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: slot.cta ? G : 'rgba(200,169,110,0.4)', flexShrink: 0, marginTop: 4 }} />
        {!isLast && <div style={{ width: 1, flex: 1, background: 'rgba(200,169,110,0.15)', marginTop: 4, minHeight: 40 }} />}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : '2rem' }}>
        <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: G, marginBottom: '0.4rem' }}>{slot.label}</p>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 300, fontSize: 'clamp(1.3rem,5vw,1.6rem)', color: '#fff', lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: '0.6rem' }}>
          {slot.headline} <em style={{ fontStyle: 'italic', color: G, fontWeight: 600 }}>{slot.em}</em>
        </h3>
        <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.85rem', color: '#888', lineHeight: 1.65, margin: 0 }}>{slot.body}</p>
      </div>
    </div>
  );
}

function HowItWorksMobile() {
  return (
    <section style={{ background: '#1A1A1A', padding: '5rem 1.5rem' }}>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: G, marginBottom: '1rem' }}>Cómo funciona</p>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 300, fontSize: 'clamp(1.8rem,7vw,2.4rem)', color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '3.5rem' }}>
          Así se hace<br /><em style={{ fontStyle: 'italic', color: G, fontWeight: 600 }}>una obra.</em>
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {SLOTS.map((s, i) => <MobileStep key={i} slot={s} index={i} isLast={i === SLOTS.length - 1} />)}
        </div>
      </div>
    </section>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HowItWorks() {
  const outerRef        = useRef<HTMLDivElement>(null);
  const stickyRef       = useRef<HTMLDivElement>(null);
  const slotsRef        = useRef<HTMLDivElement[]>([]);
  const cardsRef        = useRef<HTMLDivElement[]>([]);
  const focalRef        = useRef<HTMLDivElement>(null);
  const cursorRef       = useRef<SVGSVGElement>(null);
  const notifRef        = useRef<HTMLDivElement>(null);
  const phoneRef        = useRef<HTMLDivElement>(null);
  const matsRef         = useRef<HTMLDivElement[]>([]);
  const ecoRef          = useRef<HTMLDivElement>(null);
  const ecoNodesRef     = useRef<HTMLDivElement[]>([]);
  const ecoLinesRef     = useRef<SVGLineElement[]>([]);
  const particlesRef    = useRef<SVGCircleElement[]>([]);
  const blueprintRef    = useRef<HTMLDivElement>(null);
  const planPathsRef    = useRef<SVGGeometryElement[]>([]);
  const planMetaRef     = useRef<HTMLDivElement[]>([]);
  const progressFillRef = useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile]     = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const ctx = gsap.context(() => {

      // ── Initial states ────────────────────────────────────────────────────
      cardsRef.current.forEach((el, i) => gsap.set(el, { opacity: 0, rotation: CARDS[i].rot }));
      gsap.set(slotsRef.current, { opacity: 0, y: 20 });
      gsap.set(focalRef.current, { opacity: 0, scale: 0 });
      gsap.set(cursorRef.current, { opacity: 0, scale: 0, x: -200, y: -120 });
      gsap.set(notifRef.current, { opacity: 0, y: -60, scale: 0.92 });
      gsap.set(phoneRef.current, { opacity: 0, y: '60vh' });
      gsap.set(matsRef.current, { opacity: 0, scale: 0 });
      gsap.set(ecoRef.current, { opacity: 0 });
      gsap.set(blueprintRef.current, { opacity: 0 });

      // Blueprint paths — set dasharray via getTotalLength
      planPathsRef.current.forEach(el => {
        if (!el) return;
        const len = el.getTotalLength();
        el.style.strokeDasharray = String(len);
        el.style.strokeDashoffset = String(len);
      });

      // ── Card entry — solo opacity, y lo maneja únicamente el master timeline ──
      gsap.to(cardsRef.current, {
        opacity: 1, stagger: 0.05, ease: 'power3.out',
        scrollTrigger: { trigger: outerRef.current, start: 'top 45%', end: 'top top', scrub: 1 },
      });

      // ── Master timeline ───────────────────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          onUpdate: (self) => {
            const step = Math.min(5, Math.floor(self.progress * 6));
            setActiveStep(step);
            if (progressFillRef.current)
              progressFillRef.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      // Scene 0 — reveal slot 0 (dentro del timeline para scrub limpio)
      tl.fromTo(slotsRef.current[0], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.06, ease: 'power3.out' }, 0.02);

      // Scene 1 — parallax cards (0–0.18)
      // fromTo + duration explícita para que terminen antes de Scene 2 (0.20)
      // y evitar conflictos de tween relativo en scrub bidireccional
      cardsRef.current.forEach((card, i) => {
        const speed = 20 + (i % 3) * 15;
        tl.fromTo(card, { y: 0 }, { y: -speed, ease: 'none', duration: 0.18 }, 0);
      });

      // Scene 2 — focus (0.20–0.35)
      tl.to(slotsRef.current[0], { opacity: 0, y: -20, duration: 0.05 }, 0.18);
      tl.fromTo(slotsRef.current[1], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.06 }, 0.22);

      const featuredIdx = CARDS.findIndex(c => c.id === FEATURED_ID);
      const featured = cardsRef.current[featuredIdx];
      const others   = cardsRef.current.filter((_, i) => i !== featuredIdx);

      tl.to(others, { opacity: 0.08, scale: 0.9, x: (i) => i % 2 === 0 ? -180 : 180, y: (i) => i < 3 ? -140 : 140, duration: 0.12, ease: 'power2.inOut' }, 0.20);
      tl.to(featured, { scale: 1.6, xPercent: -50, yPercent: -50, top: '50%', left: '50%', right: 'auto', duration: 0.12, ease: 'power2.inOut' }, 0.20);
      tl.to(focalRef.current, { opacity: 1, scale: 1, duration: 0.04, ease: 'power2.out' }, 0.26);
      tl.to(cursorRef.current, { opacity: 1, scale: 1, x: 0, y: 0, duration: 0.06, ease: 'power3.out' }, 0.27);
      tl.to(cursorRef.current, { scale: 0.85, duration: 0.015 }, 0.31);
      tl.to(cursorRef.current, { scale: 1,    duration: 0.015 }, 0.325);

      // Scene 3 — notification (0.35–0.50)
      tl.to(slotsRef.current[1], { opacity: 0, y: -20, duration: 0.04 }, 0.34);
      tl.fromTo(slotsRef.current[2], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.05 }, 0.37);
      tl.to(featured, { scale: 0.05, opacity: 0, duration: 0.06, ease: 'power2.in' }, 0.35);
      tl.to(focalRef.current,  { opacity: 0, scale: 0, duration: 0.04 }, 0.35);
      tl.to(cursorRef.current, { opacity: 0, scale: 0, duration: 0.04 }, 0.35);
      tl.to(notifRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.08, ease: 'power3.out' }, 0.39);
      tl.to(phoneRef.current, { opacity: 1, y: 0, duration: 0.10, ease: 'power3.out' }, 0.44);
      tl.to(notifRef.current, { y: 120, scale: 0.7, opacity: 0, duration: 0.06, ease: 'power2.in' }, 0.52);

      // Scene 4 — materials (0.50–0.70)
      tl.to(slotsRef.current[2], { opacity: 0, y: -20, duration: 0.04 }, 0.52);
      tl.fromTo(slotsRef.current[3], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.05 }, 0.55);
      matsRef.current.forEach((mat, i) => {
        tl.to(mat, { opacity: 1, scale: 1, duration: 0.04, ease: 'back.out(2)' }, 0.56 + i * 0.012);
      });

      // Scene 5 — ecosystem (0.70–0.85)
      tl.to(slotsRef.current[3], { opacity: 0, y: -20, duration: 0.04 }, 0.69);
      tl.fromTo(slotsRef.current[4], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.05 }, 0.72);
      tl.to(phoneRef.current, { opacity: 0, scale: 0.9, duration: 0.06, ease: 'power2.in' }, 0.70);
      tl.to(matsRef.current,  { opacity: 0, duration: 0.04 }, 0.70);
      tl.to(ecoRef.current,   { opacity: 1, duration: 0.06, ease: 'power2.out' }, 0.72);

      ecoNodesRef.current.forEach((node, i) => {
        tl.fromTo(node, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.05, ease: 'back.out(2)' }, 0.72 + i * 0.015);
      });
      ecoLinesRef.current.forEach(line => {
        if (!line) return;
        const len = line.getTotalLength();
        line.style.strokeDasharray = String(len);
        line.style.strokeDashoffset = String(len);
        tl.to(line, { strokeDashoffset: 0, duration: 0.06, ease: 'power2.inOut' }, 0.76);
      });

      // Scene 6 — blueprint (0.85–1.00)
      tl.to(slotsRef.current[4], { opacity: 0, y: -20, duration: 0.04 }, 0.84);
      tl.to(ecoRef.current, { opacity: 0, duration: 0.05, ease: 'power2.in' }, 0.84);
      tl.fromTo(slotsRef.current[5], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.05 }, 0.88);
      tl.to(blueprintRef.current, { opacity: 1, duration: 0.04 }, 0.85);

      planPathsRef.current.forEach((path, i) => {
        if (!path) return;
        tl.to(path, { strokeDashoffset: 0, duration: 0.08, ease: 'power2.inOut' }, 0.86 + i * 0.005);
      });
      planMetaRef.current.forEach((m, i) => {
        tl.to(m, { opacity: 1, duration: 0.03 }, 0.94 + i * 0.005);
      });
      tl.to(blueprintRef.current, {
        filter: 'drop-shadow(0 0 30px rgba(200,169,110,0.5)) drop-shadow(0 0 60px rgba(200,169,110,0.25))',
        duration: 0.04, ease: 'power2.out',
      }, 0.97);

      // ── Particles loop (ecosystem, not scroll-tied) ────────────────────────
      particlesRef.current.forEach((p, i) => {
        const line = ecoLinesRef.current[i % ecoLinesRef.current.length];
        if (!line || !p) return;
        const len = line.getTotalLength();
        const state = { d: 0 };
        gsap.to(state, {
          d: len, duration: 2.8 + (i % 3) * 0.6,
          repeat: -1, delay: i * 0.4, ease: 'none',
          onUpdate: () => {
            const pt = line.getPointAtLength(state.d);
            p.setAttribute('cx', String(pt.x));
            p.setAttribute('cy', String(pt.y));
          },
        });
      });

    }, outerRef);

    return () => ctx.revert();
  }, []);

  if (isMobile) return <HowItWorksMobile />;

  // ─── JSX ──────────────────────────────────────────────────────────────────

  return (
    /* Outer: 600vh — CSS sticky does the pinning (no GSAP pin needed) */
    <div
      ref={outerRef}
      id="how-it-works"
      style={{ position: 'relative', height: '600vh', background: S.bg }}
    >
      <div
        ref={stickyRef}
        style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden' }}
      >
        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `linear-gradient(${S.line} 1px,transparent 1px),linear-gradient(90deg,${S.line} 1px,transparent 1px)`,
          backgroundSize: '80px 80px',
          backgroundPosition: '-1px -1px',
          opacity: 0.5,
          maskImage: 'radial-gradient(ellipse at center,black 30%,transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center,black 30%,transparent 75%)',
        } as React.CSSProperties} />

        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse at top right,rgba(200,169,110,0.05),transparent 50%),radial-gradient(ellipse at bottom left,rgba(200,169,110,0.04),transparent 50%)`,
        }} />

        {/* ── Narration panel (left) ── */}
        <div style={{
          position: 'absolute', left: '6vw', top: '50%', transform: 'translateY(-50%)',
          width: 'clamp(280px,28vw,420px)', zIndex: 30, pointerEvents: 'none',
        }}>
          {SLOTS.map((s, i) => (
            <div
              key={i}
              ref={el => { if (el) slotsRef.current[i] = el; }}
              style={{ position: 'absolute', inset: 0, opacity: 0 }}
            >
              {/* Label */}
              <div style={{
                color: S.gold, fontFamily: 'Inter,sans-serif',
                fontSize: '11px', letterSpacing: '0.32em', textTransform: 'uppercase',
                marginBottom: '26px', display: 'flex', alignItems: 'center', gap: '12px',
              }}>
                <div style={{ width: '28px', height: '1px', background: S.gold }} />
                {s.label}
              </div>

              {/* Headline */}
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(36px,4.2vw,60px)',
                lineHeight: 1.05, letterSpacing: '-0.01em',
                margin: '0 0 22px 0', color: S.text,
              }}>
                {s.headline}{' '}
                <em style={{ fontStyle: 'italic', color: S.gold, fontWeight: 600 }}>{s.em}</em>
              </h3>

              <p style={{
                color: S.muted, fontSize: '14px',
                lineHeight: 1.7, margin: 0, maxWidth: '360px',
                fontFamily: 'Inter,sans-serif',
              }}>
                {s.body}
              </p>

              {s.cta && (
                <a
                  href="#"
                  style={{
                    marginTop: '36px', display: 'inline-flex',
                    alignItems: 'center', gap: '14px',
                    border: `1px solid ${S.gold}`, color: S.gold,
                    padding: '14px 26px', fontFamily: 'Inter,sans-serif',
                    fontSize: '12px', letterSpacing: '0.22em',
                    textTransform: 'uppercase', textDecoration: 'none',
                    pointerEvents: 'auto',
                    transition: 'background 0.3s ease,color 0.3s ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = S.gold; (e.currentTarget as HTMLAnchorElement).style.color = S.bg; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = S.gold; }}
                >
                  Sumate a Integhra <span>→</span>
                </a>
              )}
            </div>
          ))}
        </div>

        {/* ── Progress meter (right) ── */}
        <div style={{
          position: 'absolute', right: '5vw', top: '50%', transform: 'translateY(-50%)',
          zIndex: 30, display: 'flex', flexDirection: 'column', gap: '22px', pointerEvents: 'none',
        }}>
          {PROGRESS_STEPS.map((label, i) => (
            <div
              key={i}
              style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                color: i === activeStep ? S.gold : S.muted,
                fontFamily: 'Inter,sans-serif', fontSize: '10px',
                letterSpacing: '0.22em', textTransform: 'uppercase',
                opacity: i === activeStep ? 1 : 0.35,
                transition: 'opacity 0.5s ease,color 0.5s ease',
              }}
            >
              <div style={{
                width: '6px', height: '6px', borderRadius: '50%',
                border: `1px solid currentColor`,
                background: i === activeStep ? S.gold : 'transparent',
              }} />
              <span>{String(i + 1).padStart(2, '0')} · {label}</span>
            </div>
          ))}
        </div>

        {/* ── Stage ── */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>

          {/* Cards */}
          {CARDS.map((c, i) => (
            <div
              key={c.id}
              ref={el => { if (el) cardsRef.current[i] = el; }}
              style={{
                position: 'absolute', left: c.x, top: c.y,
                width: c.w, height: c.h,
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.04)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.45)',
                overflow: 'hidden',
                willChange: 'transform,opacity',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, background: c.grad }} />
              {/* Blueprint SVG */}
              <svg
                viewBox={BLUEPRINTS[i].viewBox}
                width="100%" height="100%"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
                style={{ position: 'absolute', inset: 0, opacity: 0.55 }}
              >
                {BLUEPRINTS[i].el()}
              </svg>
              {/* Vignette */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 50% 50%,transparent 40%,rgba(26,26,26,0.55) 100%)',
              }} />
              <div style={{
                position: 'absolute', top: 12, right: 12,
                width: 26, height: 26,
                border: `1px solid ${S.lineStr}`,
                borderRadius: 2,
              }} />
              <div style={{
                position: 'absolute', left: 12, bottom: 14,
                color: S.gold, fontFamily: 'Inter,sans-serif',
                fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase',
                background: 'rgba(26,26,26,0.7)', border: `1px solid ${S.lineStr}`,
                padding: '4px 8px', borderRadius: 2, backdropFilter: 'blur(6px)',
              }}>
                {c.brand}
              </div>
              <div style={{
                position: 'absolute', left: 12, bottom: -16,
                color: S.muted, fontFamily: 'Inter,sans-serif',
                fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase',
              }}>
                {c.proj}
              </div>
            </div>
          ))}

          {/* Focal pulse */}
          <div
            ref={focalRef}
            style={{
              position: 'absolute', left: '50%', top: '50%',
              width: 14, height: 14, borderRadius: '50%',
              background: S.gold,
              boxShadow: `0 0 0 0 rgba(200,169,110,0.4)`,
              transform: 'translate(-50%,-50%) scale(0)',
              zIndex: 25, pointerEvents: 'none',
            }}
          />

          {/* Cursor */}
          <svg
            ref={cursorRef}
            viewBox="0 0 22 26"
            width="22" height="26"
            style={{
              position: 'absolute',
              left: 'calc(50% + 18px)', top: 'calc(50% + 18px)',
              zIndex: 26, pointerEvents: 'none',
              transform: 'translate(-2px,-2px) scale(0)',
            }}
          >
            <path
              d="M2 2 L2 22 L8 17 L11 23 L14 22 L11 16 L18 16 Z"
              fill="#ffffff" stroke={S.gold} strokeWidth="1" strokeLinejoin="round"
            />
          </svg>

          {/* Notification */}
          <div
            ref={notifRef}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              width: 340, transform: 'translate(-50%,-50%) translateY(-40px)',
              background: '#0F0F0F', border: `1px solid ${S.lineStr}`,
              borderRadius: 14, padding: '16px 18px',
              display: 'flex', gap: 14, alignItems: 'flex-start',
              boxShadow: '0 30px 80px rgba(0,0,0,0.6),0 0 0 1px rgba(200,169,110,0.08)',
              zIndex: 22,
            }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              border: `1px solid ${S.gold}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: S.gold, flexShrink: 0,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M3 11 L12 3 L21 11 V21 H14 V14 H10 V21 H3 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: S.text, fontSize: 13, fontWeight: 500, margin: '0 0 4px', fontFamily: 'Inter,sans-serif' }}>Nueva consulta</p>
              <p style={{ color: S.muted, fontSize: 12, margin: 0, lineHeight: 1.4, fontFamily: 'Inter,sans-serif' }}>Un cliente quiere hablar sobre su proyecto en Recoleta.</p>
            </div>
            <div style={{ color: S.gold, fontSize: 10, letterSpacing: '0.18em', flexShrink: 0, paddingTop: 2, fontFamily: 'Inter,sans-serif' }}>AHORA</div>
          </div>

          {/* Phone */}
          <div
            ref={phoneRef}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              width: 280, height: 560,
              transform: 'translate(-50%,60vh)',
              border: `1.5px solid ${S.gold}`, borderRadius: 36,
              zIndex: 20, background: 'rgba(15,15,15,0.4)', overflow: 'hidden',
            }}
          >
            {/* Pill notch */}
            <div style={{
              position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
              width: 80, height: 6, borderRadius: 3,
              background: `rgba(200,169,110,0.3)`,
            }} />
            {/* Screen */}
            <div style={{
              position: 'absolute', inset: '36px 14px 14px',
              borderRadius: 22, border: `1px solid ${S.line}`,
              padding: '18px 14px',
              display: 'flex', flexDirection: 'column', gap: 14,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 16, color: S.text }}>Materiales</span>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: S.gold }} />
              </div>
              <div style={{ display: 'flex', gap: 12, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: S.muted }}>
                <span style={{ color: S.gold, borderBottom: `1px solid ${S.gold}`, paddingBottom: 4 }}>CATÁLOGO</span>
                <span>FAVORITOS</span>
                <span>SOLICITAR</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginTop: 6 }}>
                {MATERIALS.map((m, i) => (
                  <div
                    key={i}
                    ref={el => { if (el) matsRef.current[i] = el; }}
                    style={{
                      aspectRatio: '1', borderRadius: 4,
                      border: '1px solid rgba(255,255,255,0.04)',
                      position: 'relative', overflow: 'hidden',
                      background: m.grad,
                    }}
                  >
                    {m.badge && (
                      <div style={{
                        position: 'absolute', top: 4, right: 4,
                        width: 5, height: 5, borderRadius: '50%',
                        background: S.gold, boxShadow: `0 0 6px rgba(200,169,110,0.6)`,
                      }} />
                    )}
                    <span style={{
                      position: 'absolute', bottom: 4, left: 5,
                      color: 'rgba(255,255,255,0.6)', fontSize: 7,
                      letterSpacing: '0.14em', textTransform: 'uppercase',
                      fontFamily: 'Inter,sans-serif',
                    }}>
                      {m.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ecosystem */}
          <div ref={ecoRef} style={{ position: 'absolute', inset: 0, zIndex: 15 }}>
            <svg viewBox="0 0 1000 600" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              {LINKS.map(([a, b], i) => {
                const na = NODES.find(n => n.id === a)!;
                const nb = NODES.find(n => n.id === b)!;
                return (
                  <line
                    key={i}
                    ref={el => { if (el) ecoLinesRef.current[i] = el; }}
                    x1={na.x * 10} y1={na.y * 6}
                    x2={nb.x * 10} y2={nb.y * 6}
                    stroke={S.gold} strokeWidth="0.8" opacity="0.6"
                  />
                );
              })}
              {[0,1,2,3,4,5,6,7].map(i => (
                <circle
                  key={i}
                  ref={el => { if (el) particlesRef.current[i] = el; }}
                  r="2" fill={S.gold}
                  style={{ filter: `drop-shadow(0 0 4px ${S.gold})` }}
                />
              ))}
            </svg>
            {NODES.map((n, i) => (
              <div
                key={n.id}
                ref={el => { if (el) ecoNodesRef.current[i] = el; }}
                style={{
                  position: 'absolute',
                  left: `${n.x}%`, top: `${n.y}%`,
                  transform: 'translate(-50%,-50%)',
                  width: 96, height: 96, borderRadius: '50%',
                  border: `1px solid ${S.gold}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(26,26,26,0.85)',
                  color: S.text, fontFamily: 'Inter,sans-serif',
                  fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase',
                  backdropFilter: 'blur(4px)',
                  flexDirection: 'column', gap: 4,
                }}
              >
                <span style={{ color: S.gold, fontSize: 9, fontFamily: 'Inter,sans-serif' }}>{n.n}</span>
                <span style={{ textAlign: 'center', lineHeight: 1.3 }}>{n.label}</span>
              </div>
            ))}
          </div>

          {/* Blueprint */}
          <div
            ref={blueprintRef}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
              zIndex: 18,
            }}
          >
            <svg width="560" height="380" viewBox="0 0 560 380" fill="none">
              <rect ref={el => { if (el) planPathsRef.current[0] = el as unknown as SVGGeometryElement; }} x="10" y="10" width="540" height="360" stroke={S.gold} strokeWidth="1.5"/>
              <line ref={el => { if (el) planPathsRef.current[1] = el as unknown as SVGGeometryElement; }} x1="250" y1="10"  x2="250" y2="200" stroke={S.gold} strokeWidth="1.5"/>
              <line ref={el => { if (el) planPathsRef.current[2] = el as unknown as SVGGeometryElement; }} x1="10"  y1="200" x2="250" y2="200" stroke={S.gold} strokeWidth="1.5"/>
              <line ref={el => { if (el) planPathsRef.current[3] = el as unknown as SVGGeometryElement; }} x1="250" y1="120" x2="400" y2="120" stroke={S.gold} strokeWidth="1.5"/>
              <line ref={el => { if (el) planPathsRef.current[4] = el as unknown as SVGGeometryElement; }} x1="400" y1="10"  x2="400" y2="200" stroke={S.gold} strokeWidth="1.5"/>
              <line ref={el => { if (el) planPathsRef.current[5] = el as unknown as SVGGeometryElement; }} x1="400" y1="200" x2="250" y2="200" stroke={S.gold} strokeWidth="1.5"/>
              <line ref={el => { if (el) planPathsRef.current[6] = el as unknown as SVGGeometryElement; }} x1="400" y1="120" x2="550" y2="120" stroke={S.gold} strokeWidth="1.5"/>
              <line ref={el => { if (el) planPathsRef.current[7] = el as unknown as SVGGeometryElement; }} x1="180" y1="200" x2="180" y2="370" stroke={S.gold} strokeWidth="1.5"/>
              <line ref={el => { if (el) planPathsRef.current[8] = el as unknown as SVGGeometryElement; }} x1="180" y1="280" x2="400" y2="280" stroke={S.gold} strokeWidth="1.5"/>
              <line ref={el => { if (el) planPathsRef.current[9] = el as unknown as SVGGeometryElement; }} x1="400" y1="200" x2="400" y2="370" stroke={S.gold} strokeWidth="1.5"/>
              <path ref={el => { if (el) planPathsRef.current[10] = el; }} d="M 240 200 A 30 30 0 0 1 270 230" stroke={S.gold} strokeWidth="1" opacity="0.7"/>
              <path ref={el => { if (el) planPathsRef.current[11] = el; }} d="M 250 100 A 25 25 0 0 0 275 125" stroke={S.gold} strokeWidth="1" opacity="0.7"/>
              <rect ref={el => { if (el) planPathsRef.current[12] = el as unknown as SVGGeometryElement; }} x="40"  y="40"  width="160" height="50"  stroke={S.gold} strokeWidth="0.8" opacity="0.5"/>
              <rect ref={el => { if (el) planPathsRef.current[13] = el as unknown as SVGGeometryElement; }} x="40"  y="110" width="60"  height="60"  stroke={S.gold} strokeWidth="0.8" opacity="0.5"/>
              <rect ref={el => { if (el) planPathsRef.current[14] = el as unknown as SVGGeometryElement; }} x="280" y="40"  width="100" height="20"  stroke={S.gold} strokeWidth="0.8" opacity="0.5"/>
              <rect ref={el => { if (el) planPathsRef.current[15] = el as unknown as SVGGeometryElement; }} x="280" y="80"  width="80"  height="20"  stroke={S.gold} strokeWidth="0.8" opacity="0.5"/>
              <rect ref={el => { if (el) planPathsRef.current[16] = el as unknown as SVGGeometryElement; }} x="40"  y="220" width="120" height="60"  stroke={S.gold} strokeWidth="0.8" opacity="0.5"/>
              <rect ref={el => { if (el) planPathsRef.current[17] = el as unknown as SVGGeometryElement; }} x="220" y="300" width="160" height="50"  stroke={S.gold} strokeWidth="0.8" opacity="0.5"/>
              <rect ref={el => { if (el) planPathsRef.current[18] = el as unknown as SVGGeometryElement; }} x="420" y="30"  width="100" height="60"  stroke={S.gold} strokeWidth="0.8" opacity="0.5"/>
            </svg>

            {/* Meta labels */}
            {[
              { pos: { top: -28, left: 0 },   text: 'RES — 001 / 25' },
              { pos: { top: -28, right: 0 },   text: 'PLANTA · ESC 1:50' },
              { pos: { bottom: -28, left: 0 }, text: 'LIVING · COCINA · 2 DORM · BAÑO' },
              { pos: { bottom: -28, right: 0 }, text: 'INTEGHRA · 2025' },
            ].map((m, i) => (
              <div
                key={i}
                ref={el => { if (el) planMetaRef.current[i] = el; }}
                style={{
                  position: 'absolute', ...m.pos,
                  color: S.gold, fontFamily: 'Inter,sans-serif',
                  fontSize: 9, letterSpacing: '0.22em',
                  textTransform: 'uppercase', opacity: 0,
                }}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Scene counter */}
          <div style={{
            position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
            color: S.muted, fontFamily: 'Inter,sans-serif',
            fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase',
            zIndex: 30, display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <span>0{Math.min(6, activeStep + 1)} / 06</span>
            <div style={{ width: 160, height: 1, background: S.line, position: 'relative', overflow: 'hidden' }}>
              <div
                ref={progressFillRef}
                style={{
                  position: 'absolute', inset: 0,
                  background: S.gold,
                  transformOrigin: 'left', transform: 'scaleX(0)',
                }}
              />
            </div>
            <span>{PROGRESS_STEPS[activeStep]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LOGOS: { src: string; alt: string; w?: number }[] = [
  { src: '/images/institucional/logo-zoetis.png', alt: 'Zoetis' },
  { src: '/images/institucional/Boehringer_Ingelheim_Logo_RGB_Accent_Green.svg.png', alt: 'Boehringer Ingelheim' },
  { src: '/images/institucional/dfv_logo.png', alt: 'DFV' },
  { src: '/images/institucional/logo-bago-n.png', alt: 'Bagó' },
  { src: '/images/institucional/logo-brouwer.png', alt: 'Brouwer', w: 100 },
  { src: '/images/institucional/Logo-Konig.jpg', alt: 'König', w: 100 },
  { src: '/images/institucional/Artboard-4logos.png', alt: 'Holliday', w: 180 },
];

export default function Institucional() {
  const heroLogoRef = useRef<HTMLImageElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const impactoRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const grid6Ref = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(heroLogoRef.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.7 })
        .fromTo(heroTitleRef.current, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.3')
        .fromTo(heroSubRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
;

      if (impactoRef.current) {
        gsap.fromTo(impactoRef.current.querySelector('.inst-impacto-title'),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: impactoRef.current, start: 'top 85%' } }
        );
        gsap.fromTo(impactoRef.current.querySelectorAll('.inst-card'),
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: impactoRef.current, start: 'top 80%' } }
        );
      }

      if (featuresRef.current) {
        gsap.fromTo(featuresRef.current.querySelector('h2'),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: featuresRef.current, start: 'top 85%' } }
        );
        gsap.fromTo(featuresRef.current.querySelectorAll('.inst-feature-card'),
          { opacity: 0, y: 48 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: featuresRef.current, start: 'top 75%' } }
        );
      }

      if (grid6Ref.current) {
        gsap.fromTo(grid6Ref.current.querySelector('h2'),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: grid6Ref.current, start: 'top 85%' } }
        );
        gsap.fromTo(grid6Ref.current.querySelectorAll('.inst-feat'),
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: grid6Ref.current, start: 'top 78%' } }
        );
      }

      if (logosRef.current) {
        gsap.fromTo(logosRef.current.querySelector('.inst-logos-heading'),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: logosRef.current, start: 'top 85%' } }
        );
      }

    });

    const track = marqueeTrackRef.current;
    let tickerCleanup: (() => void) | null = null;

    if (track) {
      const raf = requestAnimationFrame(() => {
        const totalWidth = track.scrollWidth / 2;
        let xPos = 0;
        let velocity = -1.2;
        let isDragging = false;
        let dragStartX = 0;
        let dragStartPos = 0;
        let lastClientX = 0;
        let lastVelocity = 0;

        const tick = () => {
          if (!isDragging) {
            if (Math.abs(velocity - (-1.2)) > 0.01) {
              velocity += (-1.2 - velocity) * 0.06;
            } else {
              velocity = -1.2;
            }
            xPos += velocity;
            if (xPos <= -totalWidth) xPos += totalWidth;
            if (xPos > 0) xPos -= totalWidth;
            gsap.set(track, { x: xPos });
          }
        };

        gsap.ticker.add(tick);

        const onPointerDown = (e: PointerEvent) => {
          isDragging = true;
          dragStartX = e.clientX;
          dragStartPos = xPos;
          lastClientX = e.clientX;
          lastVelocity = 0;
          track.classList.add('dragging');
          track.setPointerCapture(e.pointerId);
        };

        const onPointerMove = (e: PointerEvent) => {
          if (!isDragging) return;
          lastVelocity = e.clientX - lastClientX;
          lastClientX = e.clientX;
          xPos = dragStartPos + (e.clientX - dragStartX);
          if (xPos <= -totalWidth) xPos += totalWidth;
          if (xPos > 0) xPos -= totalWidth;
          gsap.set(track, { x: xPos });
        };

        const onPointerUp = () => {
          if (!isDragging) return;
          isDragging = false;
          track.classList.remove('dragging');
          velocity = lastVelocity * 0.6;
        };

        track.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);

        tickerCleanup = () => {
          gsap.ticker.remove(tick);
          track.removeEventListener('pointerdown', onPointerDown);
          window.removeEventListener('pointermove', onPointerMove);
          window.removeEventListener('pointerup', onPointerUp);
        };
      });

      return () => {
        ctx.revert();
        cancelAnimationFrame(raf);
        tickerCleanup?.();
      };
    }

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="inst-hero">
        <div className="inst-hero-bg"></div>
        <div className="inst-hero-overlay"></div>
        <div className="inst-hero-content">
          <img ref={heroLogoRef} src="/images/institucional/INTEGHRA-LOGO-sin-nube-HD.png" alt="Integhra" className="inst-hero-logo" style={{ opacity: 0 }} />
          <h1 ref={heroTitleRef} style={{ opacity: 0 }}>
            Con <span className="green">INTEGHRA</span><br />
            <span className="purple">crecer es fácil</span>
          </h1>
          <p ref={heroSubRef} className="inst-hero-sub" style={{ opacity: 0 }}>
            Conectamos proveedores, distribuidores y minoristas en un solo espacio.
            Agilizá tu estrategia comercial y ganá visibilidad donde importa.
          </p>
        </div>
        <div className="wave-white" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}>
          <svg viewBox="0 74 1024 107" width="100%" height="90" preserveAspectRatio="none" fill="white">
            <path d="M0 182.086h1024v-77.312c-49.05 20.07-120.525 42.394-193.229 42.086-128.922-.512-159.846-72.294-255.795-72.294-89.088 0-134.656 80.179-245.043 82.022S169.063 99.346 49.971 97.401C32.768 97.094 16.077 99.244 0 103.135v78.951z" />
          </svg>
        </div>
      </section>

      <section className="inst-impacto">
        <div className="inst-wrap" ref={impactoRef}>
          <div className="inst-impacto-title">
            <h2>Maximiza tu impacto comercial</h2>
          </div>
          <div className="inst-impacto-grid">
            <div className="inst-card inst-card--dark">
              <div className="inst-card-icon inst-card-icon--white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1" stroke="white" strokeWidth="2" /><rect x="14" y="3" width="7" height="7" rx="1" stroke="white" strokeWidth="2" /><rect x="3" y="14" width="7" height="7" rx="1" stroke="white" strokeWidth="2" /><rect x="14" y="14" width="7" height="7" rx="1" stroke="white" strokeWidth="2" /></svg>
              </div>
              <h3>Gestión Integral desde un Solo Lugar</h3>
              <p>Organizá todo tu marketing y estrategia comercial en un solo panel. Desde banners y pop-ups hasta reportes y lanzamientos.</p>
            </div>
            <div className="inst-card inst-card--light">
              <div className="inst-card-icon inst-card-icon--green">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 17l4-8 4 4 4-6 4 3" stroke="#02836c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M21 21H3" stroke="#02836c" strokeWidth="2" strokeLinecap="round" /></svg>
              </div>
              <h3>Campañas Comerciales Dinámicas</h3>
              <p>Activá promociones personalizadas por cliente, región o distribuidor. Segmentá y ejecutá con solo unos clics.</p>
            </div>
            <div className="inst-card inst-card--accent">
              <div className="inst-card-icon inst-card-icon--white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
              </div>
              <h3>Conexión Directa con Toda la Cadena</h3>
              <p>Acelerá la comunicación entre proveedor, distribuidor y punto de venta. Todo queda registrado y medible.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="inst-features" id="plataforma">
        <div className="inst-wrap" ref={featuresRef}>
          <div className="inst-features-header">
            <h2>Descubrí cómo hacer crecer<br /><span>tu marca en Integhra</span></h2>
          </div>
          <div className="inst-feature-grid">

            <div className="inst-feature-card">
              <div className="inst-feature-card-img" style={{ background: '#eef9f6' }}>
                <img src="/images/institucional/storyset-campanas.svg" alt="Campañas" style={{ objectFit: 'contain', padding: '1rem' }} />
              </div>
              <div className="inst-feature-card-body">
                <span className="inst-feature-card-tag" style={{ color: '#02836c' }}>Campañas</span>
                <h3>Campañas comerciales en segundos</h3>
                <p>Activá tus promociones en el momento justo. Conectá con tu red comercial, medí el impacto y optimizá cada acción.</p>
              </div>
            </div>

            <div className="inst-feature-card">
              <div className="inst-feature-card-img" style={{ background: '#eef9f6' }}>
                <img src="/images/institucional/storyset-publicidad.svg" alt="Publicidad" style={{ objectFit: 'contain', padding: '1rem' }} />
              </div>
              <div className="inst-feature-card-body">
                <span className="inst-feature-card-tag" style={{ color: '#02836c' }}>Publicidad</span>
                <h3>Espacio publicitario integrado</h3>
                <p>Mostrá tus productos donde se toman las decisiones. Banners y pop-ups para captar la atención de veterinarios y distribuidores.</p>
              </div>
            </div>

            <div className="inst-feature-card">
              <div className="inst-feature-card-img" style={{ background: '#eef9f6' }}>
                <img src="/images/institucional/storyset-comunicacion.svg" alt="Comunicación" style={{ objectFit: 'contain', padding: '1rem' }} />
              </div>
              <div className="inst-feature-card-body">
                <span className="inst-feature-card-tag" style={{ color: '#02836c' }}>Comunicación</span>
                <h3>Mantené a tus clientes siempre al tanto</h3>
                <p>Informá de manera rápida y directa sobre novedades, promociones y eventos exclusivos. La confianza se construye con presencia.</p>
              </div>
            </div>

          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href="#plataforma" className="inst-btn-outline">Conocé la plataforma</a>
          </div>
        </div>
      </section>

      <section className="inst-grid6">
        <div className="inst-wrap" ref={grid6Ref}>
          <div className="inst-grid6-header">
            <h2>Todo lo que necesitás,<br /><span>en un lugar</span></h2>
          </div>
          <div className="inst-grid6-grid">
            {[
              { bg: '#eaf6f3', color: '#02836c', title: 'Crea ofertas', body: 'Impulsá tu estrategia comercial con promociones en segundos.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M7 7h10M7 12h6M5 20l4-4H5V4h14v12h-8l-4 4z" stroke="#02836c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg> },
              { bg: '#eaf6f3', color: '#02836c', title: 'Promocioná tu marca', body: 'Destacate en la plataforma con espacios publicitarios integrados.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" stroke="#02836c" strokeWidth="2" /><path d="M8 12h8M12 8l4 4-4 4" stroke="#02836c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg> },
              { bg: '#eaf6f3', color: '#02836c', title: 'Clientes informados', body: 'Mantené a tus clientes al tanto con notificaciones directas.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="#02836c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg> },
              { bg: '#eaf6f3', color: '#02836c', title: 'Consulta productos', body: 'Accedé a catálogos completos de todos los laboratorios en un clic.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="#02836c" strokeWidth="2" /><path d="m21 21-4.35-4.35" stroke="#02836c" strokeWidth="2" strokeLinecap="round" /></svg> },
              { bg: '#eaf6f3', color: '#02836c', title: 'Realizá pedidos', body: 'Gestioná tus pedidos de la forma más fácil y rápida.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke="#02836c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M3 6h18M16 10a4 4 0 0 1-8 0" stroke="#02836c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg> },
              { bg: '#eaf6f3', color: '#02836c', title: 'Encontrá ofertas', body: 'Descubrí promociones especialmente para lo que buscás.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="#02836c" strokeWidth="2" /><path d="M8 12h.01M12 12h.01M16 12h.01" stroke="#02836c" strokeWidth="2.5" strokeLinecap="round" /></svg> },
            ].map((item, i) => (
              <div key={i} className="inst-feat">
                <div className="inst-feat-icon" style={{ background: item.bg }}>{item.icon}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="inst-logos-big" ref={logosRef}>
        <div className="inst-logos-heading">
          <p className="inst-logos-eyebrow">Confianza que se construye</p>
          <h2>Empresas que nos eligen</h2>
          <p className="inst-logos-sub">Las marcas líderes de la industria ya forman parte de Integhra.</p>
        </div>
        <div className="inst-marquee-wrap">
          <div className="inst-marquee-fade inst-marquee-fade-l" />
          <div className="inst-marquee-fade inst-marquee-fade-r" />
          <div className="inst-marquee-track" ref={marqueeTrackRef}>
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div key={i} className="inst-marquee-item">
                <img src={logo.src} alt={logo.alt} style={logo.w ? { width: `${logo.w}px`, height: 'auto' } : undefined} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="inst-footer">
        <div className="inst-wrap">
          <div className="inst-footer-inner">
            <div className="inst-footer-logo">
              <img src="/images/institucional/INTEGHRA-LOGO-sin-nube-HD.png" alt="Integhra" />
              <span>Integhra</span>
            </div>
            <div className="inst-footer-links">
              <a href="/">Inicio</a>
              <a href="/sobre-nosotros">Sobre nosotros</a>
            </div>
            <a href="mailto:integhra@gmail.com" className="inst-footer-email">integhra@gmail.com</a>
          </div>
          <p className="inst-footer-copy">© 2025 Integhra. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
}

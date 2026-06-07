const objetivos = [
  { n: '01', color: '#02836c', bg: '#e6f4f0', title: 'Integrar a todos los actores del mercado', body: 'Proveedores, distribuidores, minoristas y profesionales en un solo ecosistema.' },
  { n: '02', color: '#fc852a', bg: '#fff4ed', title: 'Impulsar la innovación tecnológica', body: 'Herramientas de última generación para transformar la industria.' },
  { n: '03', color: '#7b33cc', bg: '#f3eefa', title: 'Optimizar procesos de compra y logística', body: 'Eficiencia en cada punto de la cadena de suministro.' },
  { n: '04', color: '#02836c', bg: '#e6f4f0', title: 'Promover transparencia y confianza', body: 'Información clara y verificable en cada interacción de la plataforma.' },
  { n: '05', color: '#fc852a', bg: '#fff4ed', title: 'Expandir a distintos sectores y regiones', body: 'Crecer más allá de la industria veterinaria hacia nuevos mercados.' },
];

const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/');

export default function SobreNosotros() {
  return (
    <>
      <section className="sn-hero">
        <div className="sn-hero-inner">
          <span className="sn-eyebrow">Quiénes somos</span>
          <h1>Nuestra misión y visión</h1>
          <p>Conectar a todos los actores del mercado en una plataforma tecnológica eficiente, transparente y confiable.</p>
        </div>
        <div className="wave-white" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}>
          <svg viewBox="0 74 1024 107" width="100%" height="80" preserveAspectRatio="none" fill="white">
            <path d="M0 182.086h1024v-77.312c-49.05 20.07-120.525 42.394-193.229 42.086-128.922-.512-159.846-72.294-255.795-72.294-89.088 0-134.656 80.179-245.043 82.022S169.063 99.346 49.971 97.401C32.768 97.094 16.077 99.244 0 103.135v78.951z" />
          </svg>
        </div>
      </section>

      <section className="sn-mv">
        <div className="inst-wrap">
          <div className="sn-mv-grid">
            <div className="sn-mv-card" style={{ borderColor: '#d1ede7' }}>
              <div className="sn-mv-card-icon" style={{ background: '#e6f4f0' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#02836c" strokeWidth="2" /><circle cx="12" cy="12" r="4" stroke="#02836c" strokeWidth="2" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="#02836c" strokeWidth="2" strokeLinecap="round" /></svg>
              </div>
              <h2>Misión</h2>
              <p>Conectar proveedores, distribuidores, minoristas, profesionales, gremios y consumidores finales mediante una plataforma tecnológica eficiente, transparente y confiable, facilitando el acceso a promociones, productos, servicios y soluciones que optimicen la cadena de suministro en múltiples sectores.</p>
            </div>
            <div className="sn-mv-card" style={{ borderColor: '#e8daf5' }}>
              <div className="sn-mv-card-icon" style={{ background: '#f3eefa' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#7b33cc" strokeWidth="2" /><circle cx="12" cy="12" r="3" stroke="#7b33cc" strokeWidth="2" /></svg>
              </div>
              <h2>Visión</h2>
              <p>Ser la plataforma líder de referencia a nivel nacional e internacional para la integración de todos los actores del mercado, reconocida por su innovación, confiabilidad y capacidad de transformar la manera en que se comercializan y distribuyen productos y servicios en cualquier industria.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sn-obj">
        <div className="inst-wrap">
          <div className="sn-section-header">
            <h2>Objetivos <span>estratégicos</span></h2>
          </div>
          <div className="sn-obj-grid">
            {objetivos.map((obj) => (
              <div key={obj.n} className="sn-obj-item">
                <div className="sn-obj-num" style={{ background: obj.bg, color: obj.color }}>{obj.n}</div>
                <div>
                  <h4>{obj.title}</h4>
                  <p>{obj.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sn-vals">
        <div className="inst-wrap">
          <div className="sn-section-header">
            <h2>Valores de <span>Integhra</span></h2>
          </div>
          <div className="sn-vals-grid">
            <div className="sn-val" style={{ borderColor: '#d1ede7' }}>
              <div className="sn-val-icon" style={{ background: '#e6f4f0' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#02836c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <h4>Transparencia</h4>
              <p>Información clara y confiable en toda la plataforma.</p>
            </div>
            <div className="sn-val" style={{ borderColor: '#fde4cc' }}>
              <div className="sn-val-icon" style={{ background: '#fff4ed' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2a7 7 0 0 1 7 7c0 3.866-3.134 7-7 7s-7-3.134-7-7a7 7 0 0 1 7-7z" stroke="#fc852a" strokeWidth="2" /><path d="M12 16v6M8 22h8" stroke="#fc852a" strokeWidth="2" strokeLinecap="round" /></svg>
              </div>
              <h4>Innovación</h4>
              <p>Tecnología y soluciones creativas que facilitan la gestión.</p>
            </div>
            <div className="sn-val" style={{ borderColor: '#e8daf5' }}>
              <div className="sn-val-icon" style={{ background: '#f3eefa' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="#7b33cc" strokeWidth="2" /></svg>
              </div>
              <h4>Confianza</h4>
              <p>Relaciones sólidas y seguras entre todos los actores.</p>
            </div>
            <div className="sn-val" style={{ borderColor: '#d1ede7' }}>
              <div className="sn-val-icon" style={{ background: '#e6f4f0' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#02836c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <h4>Eficiencia</h4>
              <p>Optimización de procesos de compra, logística y comunicación.</p>
            </div>
            <div className="sn-val" style={{ borderColor: '#fde4cc' }}>
              <div className="sn-val-icon" style={{ background: '#fff4ed' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#fc852a" strokeWidth="2" strokeLinecap="round" /><circle cx="9" cy="7" r="4" stroke="#fc852a" strokeWidth="2" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#fc852a" strokeWidth="2" strokeLinecap="round" /></svg>
              </div>
              <h4>Colaboración</h4>
              <p>Trabajo conjunto entre proveedores, distribuidores y consumidores.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sn-cta">
        <h2>¿Listo para ser parte de Integhra?</h2>
        <p>Sumate a la plataforma que está transformando la cadena comercial de la industria veterinaria.</p>
        <a href="mailto:hola@integhra.com" className="sn-btn-white">Contactanos</a>
      </section>

      <footer className="inst-footer">
        <div className="inst-wrap">
          <div className="inst-footer-inner">
            <div className="inst-footer-logo">
              <img src={`${BASE}images/institucional/INTEGHRA-LOGO-sin-nube-HD.png`} alt="Integhra" />
              <span>Integhra</span>
            </div>
            <div className="inst-footer-links">
              <a href="/institucional">Inicio</a>
              <a href="/sobre-nosotros">Sobre nosotros</a>
            </div>
            <a href="mailto:hola@integhra.com" className="inst-footer-email">hola@integhra.com</a>
          </div>
          <p className="inst-footer-copy">© 2026 Integhra. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
}

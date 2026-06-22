const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/');

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        .arq-footer {
          background: #0d0d0d;
          padding: 4rem 2rem 2.5rem;
          border-top: 1px solid rgba(255,255,255,0.04);
        }

        .arq-footer-inner {
          max-width: 1160px;
          margin: 0 auto;
        }

        /* Top row */
        .arq-footer-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 3rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        /* Brand block */
        .arq-footer-brand {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 280px;
        }

        .arq-footer-logo-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .arq-footer-logo-row img {
          height: 30px;
          width: auto;
          filter: brightness(0) invert(1);
          opacity: 0.75;
        }

        .arq-footer-tagline {
          font-family: Inter, sans-serif;
          font-size: 0.8rem;
          color: rgba(237,232,221,0.28);
          line-height: 1.65;
          letter-spacing: 0.01em;
        }

        /* Products block */
        .arq-footer-products {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .arq-footer-product-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 0.42rem 0.95rem;
          border-radius: 100px;
          font-family: Inter, sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-decoration: none;
        }

        .arq-footer-chip--vete {
          background: rgba(2,131,108,0.08);
          color: #4ecba8;
          border: 1px solid rgba(2,131,108,0.18);
        }

        .arq-footer-chip--arq {
          background: rgba(200,169,110,0.07);
          color: rgba(200,169,110,0.7);
          border: 1px solid rgba(200,169,110,0.14);
        }

        .arq-footer-live-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #4ecba8;
          animation: footer-live 2s ease-in-out infinite;
        }

        @keyframes footer-live {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .arq-footer-soon-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(200,169,110,0.6);
        }

        /* Nav columns */
        .arq-footer-nav {
          display: flex;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .arq-footer-nav-col {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .arq-footer-nav-title {
          font-family: Inter, sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(237,232,221,0.25);
          margin-bottom: 0.2rem;
        }

        .arq-footer-nav-link {
          font-family: Inter, sans-serif;
          font-size: 0.82rem;
          color: rgba(237,232,221,0.45);
          text-decoration: none;
          transition: color 0.2s;
          line-height: 1;
        }

        .arq-footer-nav-link:hover { color: rgba(237,232,221,0.85); }

        /* Divider */
        .arq-footer-divider {
          height: 1px;
          background: rgba(255,255,255,0.04);
          margin-bottom: 2rem;
        }

        /* Bottom row */
        .arq-footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .arq-footer-copy {
          font-family: Inter, sans-serif;
          font-size: 0.72rem;
          color: rgba(237,232,221,0.18);
          letter-spacing: 0.04em;
        }

        .arq-footer-email {
          font-family: Inter, sans-serif;
          font-size: 0.78rem;
          color: rgba(200,169,110,0.55);
          text-decoration: none;
          transition: color 0.2s;
          letter-spacing: 0.01em;
        }

        .arq-footer-email:hover { color: #C8A96E; }

        @media (max-width: 640px) {
          .arq-footer-top { flex-direction: column; gap: 2rem; }
          .arq-footer-bottom { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
          .arq-footer-nav { gap: 2rem; }
        }
      `}</style>

      <footer className="arq-footer">
        <div className="arq-footer-inner">
          <div className="arq-footer-top">

            {/* Brand + tagline */}
            <div className="arq-footer-brand">
              <div className="arq-footer-logo-row">
                <img src={`${BASE}images/institucional/INTEGHRA-LOGO-sin-nube-HD.png`} alt="Integhra" />
              </div>
              <p className="arq-footer-tagline">
                Tecnología que conecta cada industria.<br />
                Soluciones verticales para sectores completos.
              </p>
              <div className="arq-footer-products">
                {/* TODO: Replace href with actual Integhra VET production URL */}
                <a href="#" className="arq-footer-product-chip arq-footer-chip--vete">
                  <span className="arq-footer-live-dot" />
                  Integhra VET
                </a>
                <span className="arq-footer-product-chip arq-footer-chip--arq">
                  <span className="arq-footer-soon-dot" />
                  Integhra ARQ
                </span>
              </div>
            </div>

            {/* Nav links */}
            <div className="arq-footer-nav">
              <div className="arq-footer-nav-col">
                <span className="arq-footer-nav-title">Empresa</span>
                <a href={BASE} className="arq-footer-nav-link">Inicio</a>
                <a href={`${BASE}general`} className="arq-footer-nav-link">Institucional</a>
                <a href={`${BASE}sobre-nosotros`} className="arq-footer-nav-link">Sobre nosotros</a>
              </div>
              <div className="arq-footer-nav-col">
                <span className="arq-footer-nav-title">Productos</span>
                {/* TODO: Replace href with actual Integhra VET production URL */}
                <a href="#" className="arq-footer-nav-link">Integhra VET</a>
                <a href={`${BASE}#productos`} className="arq-footer-nav-link">Integhra ARQ</a>
                <a href={`${BASE}#waitlist`} className="arq-footer-nav-link">Lista de espera</a>
              </div>
            </div>

          </div>

          <div className="arq-footer-divider" />

          <div className="arq-footer-bottom">
            <p className="arq-footer-copy">
              © {year} Integhra. Todos los derechos reservados.
            </p>
            <a href="mailto:integhra@gmail.com" className="arq-footer-email">
              integhra@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

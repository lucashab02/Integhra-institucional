export default function Footer() {
  return (
    <>
      <style>{`
        .arq-footer { background: #111; padding: 3.5rem 0 2.5rem; }
        .arq-footer-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem; margin-bottom: 2.5rem; max-width: 1100px; margin-left: auto; margin-right: auto; padding: 0 2rem; }
        .arq-footer-logo { display: flex; align-items: center; gap: 10px; }
        .arq-footer-logo img { height: 32px; width: auto; filter: brightness(0) invert(1); }
        .arq-footer-logo span { font-size: 1rem; font-weight: 700; color: #fff; letter-spacing: 0.04em; font-family: Inter, sans-serif; }
        .arq-footer-links { display: flex; gap: 2rem; }
        .arq-footer-links a { font-size: 0.82rem; color: #666; transition: color .2s; text-decoration: none; font-family: Inter, sans-serif; }
        .arq-footer-links a:hover { color: #fff; }
        .arq-footer-email { font-size: 0.85rem; color: #4ecba8; transition: color .2s; text-decoration: none; font-family: Inter, sans-serif; }
        .arq-footer-email:hover { color: #fff; }
        .arq-footer-copy-wrap { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }
        .arq-footer-copy { font-size: 0.72rem; color: #333; text-align: center; padding-top: 2rem; border-top: 1px solid #1e1e1e; letter-spacing: 0.05em; font-family: Inter, sans-serif; }
      `}</style>

      <footer className="arq-footer">
        <div className="arq-footer-inner">
          <div className="arq-footer-logo">
            <img src="/images/institucional/INTEGHRA-LOGO-sin-nube-HD.png" alt="Integhra" />
            <span>Integhra</span>
          </div>
          <div className="arq-footer-links">
            <a href="/">Inicio</a>
            <a href="/institucional">Institucional</a>
            <a href="/sobre-nosotros">Sobre nosotros</a>
          </div>
          <a href="mailto:integhra@gmail.com" className="arq-footer-email">integhra@gmail.com</a>
        </div>
        <div className="arq-footer-copy-wrap">
          <p className="arq-footer-copy">© 2025 Integhra. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
}

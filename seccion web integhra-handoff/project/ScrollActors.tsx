import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Actor = {
  number: string;
  name: string;
  description: string;
};

const ACTORS: Actor[] = [
  {
    number: "01",
    name: "Cliente",
    description:
      "Buscás inspiración. Encontrás al equipo que la hace realidad. Filtrás por estilo, zona y tipo de obra. Cuando algo te representa, el arquitecto que lo hizo está a un mensaje.",
  },
  {
    number: "02",
    name: "Arquitecto",
    description:
      "Tus proyectos trabajan para vos mientras dormís. Subís tu trabajo una vez. La plataforma lo muestra a quienes están buscando exactamente lo que hacés.",
  },
  {
    number: "03",
    name: "Proveedor",
    description:
      "Tu catálogo, en el momento en que se decide. Los arquitectos ven tus productos cuando están especificando materiales para una obra real. Sin intermediarios.",
  },
  {
    number: "04",
    name: "Gremialista",
    description:
      "Tu oficio, visible para quien construye. Cuando un arquitecto necesita tu rubro en tu zona, aparecés. El trabajo llega a vos, no al revés.",
  },
];

export default function ScrollActors() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const actorsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const cards = actorsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!section || !sticky || cards.length === 0) return;

    // Initial state — only first actor visible
    gsap.set(cards, { opacity: 0 });
    gsap.set(cards[0], { opacity: 1 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          pin: sticky,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 4 actors over 500vh — each gets ~25% of the scroll
      // Fade transitions at the boundaries.
      for (let i = 0; i < cards.length - 1; i++) {
        const startAt = (i + 1) * 0.25 - 0.05;
        tl.to(cards[i], { opacity: 0, ease: "power1.inOut" }, startAt)
          .to(cards[i + 1], { opacity: 1, ease: "power1.inOut" }, startAt);
      }
    }, section);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "500vh", backgroundColor: "#1A1A1A" }}
    >
      <div
        ref={stickyRef}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* Grid background — millimetered paper */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(200,169,110,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(200,169,110,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Radial vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(26,26,26,0) 0%, rgba(26,26,26,0.6) 70%, rgba(26,26,26,0.95) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto grid h-full max-w-7xl grid-cols-1 items-center gap-16 px-8 md:grid-cols-2 md:px-16">
          {/* LEFT — fixed copy */}
          <div className="flex flex-col gap-8">
            <span
              className="text-xs font-bold uppercase"
              style={{ color: "#C8A96E", letterSpacing: "0.35em" }}
            >
              Qué es Integhra
            </span>
            <h2
              className="text-5xl leading-[1.05] text-white md:text-6xl lg:text-7xl"
              style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 600 }}
            >
              Todos los que hacen posible{" "}
              <em
                className="italic"
                style={{ color: "#C8A96E", fontWeight: 600 }}
              >
                una obra.
              </em>{" "}
              En un solo lugar.
            </h2>
            <p
              className="max-w-md text-base leading-relaxed md:text-lg"
              style={{
                color: "#888888",
                fontFamily: "Inter, sans-serif",
                fontWeight: 300,
              }}
            >
              Integhra es la plataforma donde clientes, arquitectos, proveedores
              y gremialistas se encuentran en el momento exacto en que se
              necesitan. No reemplaza la confianza del mercado argentino — la
              amplifica.
            </p>
          </div>

          {/* RIGHT — actors stack */}
          <div className="relative h-[420px] w-full md:h-[480px]">
            {ACTORS.map((actor, i) => (
              <div
                key={actor.number}
                ref={(el) => (actorsRef.current[i] = el)}
                className="absolute inset-0 flex flex-col justify-center gap-6"
              >
                <span
                  className="text-sm font-bold"
                  style={{
                    color: "#C8A96E",
                    letterSpacing: "0.4em",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {actor.number}
                </span>
                <div
                  className="h-px w-24"
                  style={{ backgroundColor: "#C8A96E" }}
                />
                <h3
                  className="text-6xl uppercase text-white md:text-7xl lg:text-8xl"
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                  }}
                >
                  {actor.name}
                </h3>
                <p
                  className="max-w-md text-base leading-relaxed md:text-lg"
                  style={{
                    color: "#B8B8B8",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 300,
                  }}
                >
                  {actor.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Progress indicator (decorative) */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
          {ACTORS.map((a) => (
            <span
              key={a.number}
              className="h-px w-10"
              style={{ backgroundColor: "rgba(200,169,110,0.3)" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

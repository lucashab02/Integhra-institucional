import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;800&display=swap');

.hh-section {
  position: relative;
  min-height: 100vh;
  background: #1A1A1A;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  -webkit-mask-image: linear-gradient(to bottom, black 52%, transparent 86%);
  mask-image: linear-gradient(to bottom, black 52%, transparent 86%);
}

.hh-title-wrap {
  text-align: center;
  padding-top: 64px;
  animation: hh-enter 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes hh-enter {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hh-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 200;
  font-size: clamp(58px, 12vw, 172px);
  line-height: 0.92;
  letter-spacing: -0.045em;
  color: #EDE8DD;
  margin: 0;
}

.hh-title em { font-style: normal; font-weight: 800; }

.hh-dot {
  display: inline-block;
  width: clamp(8px, 1vw, 14px);
  height: clamp(8px, 1vw, 14px);
  border-radius: 50%;
  background: #C8A96E;
  margin-left: 6px;
  vertical-align: middle;
  position: relative;
  top: -0.12em;
}
`;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.hh-title-wrap', {
        y: -110,
        opacity: 0,
        ease: 'none',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '45% top',
          scrub: 0.6,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <section className="hh-section" ref={sectionRef}>
        <div className="hh-title-wrap">
          <h1 className="hh-title">
            Integhra<br />
            tu obra<span className="hh-dot" />.
          </h1>
        </div>
      </section>
    </>
  );
}

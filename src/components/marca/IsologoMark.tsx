import { petals, viewBox } from './petalos';

// React twin of Isologo.astro for islands (nav). Same traced paths, flat brand colors.
const FILL: Record<string, string> = {
  naranja: 'var(--iso-naranja, #ff5a1f)',
  turquesa: 'var(--iso-turquesa, #12afc0)',
  azul: 'var(--iso-azul, #0c9be6)',
  violeta: 'var(--iso-violeta, #b62fc6)',
};

export default function IsologoMark({ size = 34 }: { size?: number }) {
  return (
    <svg viewBox={viewBox} width={size} height={size} aria-hidden="true" focusable="false" style={{ display: 'block' }}>
      {petals.map((p) => (
        <path key={p.id} d={p.d} fill={FILL[p.id]} />
      ))}
    </svg>
  );
}

// The ARQ sample apartment, as data. Units are centimetres: 9.60 x 7.00 m footprint,
// 30 cm exterior and 15 cm interior walls. The floor plan (Planta.astro) and the built view
// on the last process sheet (Proceso.astro) both draw from here, so they are the same flat.

export type R = [number, number, number, number]; // x, y, w, h
type Span = [number, number];

export const FOOTPRINT = { w: 960, h: 700 };

// Split a wall into solid pieces, leaving the given openings (along its long axis)
const wall = (x0: number, y0: number, x1: number, y1: number, open: Span[] = []): R[] => {
  const horiz = x1 - x0 >= y1 - y0;
  const [a, b] = horiz ? [x0, x1] : [y0, y1];
  const cuts = [...open].sort((p, q) => p[0] - q[0]);
  const out: R[] = [];
  let s = a;
  for (const [o0, o1] of [...cuts, [b, b] as Span]) {
    if (o0 > s) out.push(horiz ? [s, y0, o0 - s, y1 - y0] : [x0, s, x1 - x0, o0 - s]);
    s = Math.max(s, o1);
  }
  return out;
};

// Openings in the exterior walls
const topOpen: Span[] = [[110, 350], [480, 570], [680, 860]]; // living window, entry door, dorm 1 window
const bottomOpen: Span[] = [[430, 520], [680, 860]]; // bath window, dorm 2 window
const leftOpen: Span[] = [[140, 300], [470, 610]]; // living window, kitchen window

export const walls: R[] = [
  // exterior
  ...wall(0, 0, 960, 30, topOpen),
  ...wall(0, 670, 960, 700, bottomOpen),
  ...wall(0, 30, 30, 670, leftOpen),
  ...wall(930, 30, 960, 670),
  // interior
  ...wall(450, 30, 465, 400, [[150, 330]]), // living | hall (open passage)
  ...wall(575, 30, 590, 670, [[230, 310], [370, 450]]), // hall | bedrooms (two doors)
  ...wall(30, 400, 575, 415, [[90, 250], [480, 560]]), // living-hall | kitchen-bath
  ...wall(360, 415, 375, 670), // kitchen | bath
  ...wall(590, 340, 930, 355), // dorm 1 | dorm 2
];

// Windows: [x, y, w, h] of the opening in the wall
export const windows: R[] = [
  [110, 0, 240, 30],
  [680, 0, 180, 30],
  [430, 670, 90, 30],
  [680, 670, 180, 30],
  [0, 140, 30, 160],
  [0, 470, 30, 140],
];

// Doors: leaf from the hinge, and the swing arc
export const doors = [
  { leaf: [570, 30, 570, 120], arc: 'M480 30 A90 90 0 0 0 570 120' }, // entry
  { leaf: [560, 415, 560, 495], arc: 'M480 415 A80 80 0 0 0 560 495' }, // bath
  { leaf: [590, 230, 670, 230], arc: 'M590 310 A80 80 0 0 0 670 230' }, // dorm 1
  { leaf: [590, 450, 670, 450], arc: 'M590 370 A80 80 0 0 1 670 450' }, // dorm 2
];

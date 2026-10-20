---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages/general.astro","src/pages/sobre-nosotros.astro"]
---

## Scope

Institutional site, 3 pages (`/`, `/general`, `/sobre-nosotros`). Mode: Persuade. Audiences: VET suppliers (contact) and ARQ actors (waitlist), weighted equally. Current round: home prototype only; subpages follow after approval.

## Direction contract

THESIS: The isologotipo is two interlocking petal pairs. Orange + teal is VET, blue + violet is ARQ, the whole mark is Integhra. The site opens the mark and each half becomes the door to a different world. Refuses one-template-two-colors and borrowed metaphors (the transit map was rejected by the user as unrelated to Integhra).

OWN-WORLD: Parent: cool paper #F4F5F7, ink #111318, Archivo, the full mark. VET: clinical white, orange #FF4A1C + teal #0FA3B1, Figtree, soft rounded forms (24-28px radius), warm tinted shadows, real app screenshots and real offers in motion. ARQ: graphite #121419, blue #3AA3F5 + violet #C04FD3, Archivo condensed and expanded with JetBrains Mono plan annotations, straight edges (0 radius), hairline plan drawing, "en obra" states.

STORY: The visitor sees one company, watches it split into two industries, understands VET works today (offers live, real screens) and ARQ is in development with no announced date, then acts: contact or "Conocé Integhra VET" (VET), waitlist (ARQ).

FIRST VIEWPORT: Paper ground. "Conectamos cada industria" in expanded Archivo top-left with a 20-word lede. The whole isologotipo large at center-right. On scroll (pinned), the VET pair slides down-left and the ARQ pair up-right, a diagonal seam turns the upper-right of the screen graphite, and each half gains its door: "Integhra VET, en servicio" with "Entrar a VET", and "Integhra ARQ, en obra" with "Entrar a ARQ".

FORM: Los cuatro pétalos (user-chosen after rejecting the transit map; refined so VET and ARQ are distinct worlds). Seed key d69a6fd5 (original roll; direction replaced by user steer). Signature interaction: the pinned split of the mark, and its mirror at the VET to ARQ transition where the warm pair leaves and the cool pair enters while the ground wipes from white to graphite along the same diagonal.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Constraints

Keep URLs, `#productos`/`#waitlist` anchors, Formspree id and subjects, the GA tag, the base path, and the voseo copy. Offer cards use real offers seen in the app; countdowns are illustrative and labeled as such.

## Assets

`public/images/marca/petalos-vet.png` and `petalos-arq.png` are derived from `public/images/institucional/INTEGHRA-LOGO-sin-nube-HD.png` by a hue/position split (script kept in the session scratchpad), no generation.

# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro 6 + React 19 islands + Tailwind v4 + GSAP (existing project, kept by the user). Deployed under the base path `/institucional` via `npm run build:prod` (`SITE_PATH=institucional`). Local dev at `/`.

## Users

Two audiences, weighted equally (confirmed):

- **Integhra VET side:** laboratories, distributors and veterinary practices in Argentina. They evaluate whether to join a platform that is already in production. Job: understand the commercial value (catalogs, offers, advertising, orders) and get in touch.
- **Integhra ARQ side:** construction and design actors (architects, designers, suppliers, distributors, retailers, trades/gremios, real-estate, artists, end clients). The product is not launched yet. Job: understand how it will work and join the waitlist as an early adopter.

## Product Purpose

Integhra is a technology company that builds vertical platforms that digitize and connect whole industries (suppliers, professionals and consumers) without intermediaries. The institutional site presents the parent brand, its two verticals, and converts visitors into a contact (VET) or a waitlist signup (ARQ).

## Positioning

One company, one philosophy, applied vertical by vertical: each platform is designed for a full sector's value chain, not a generic marketplace. VET is live and operating in Argentina since 2024; ARQ is the next vertical, launching September 2026, Argentina first.

## Operating Context

- Integhra VET (live app): supplier catalogs, offers and promotions with stock and validity, advertising (carousels, popups, banners, stories), news, orders, vademecum, transfers; supplier view and veterinarian view.
- Integhra ARQ (in development): portfolio for architects/designers, smart material specification, connection with suppliers/trades/specialists, from project to construction. The site already describes the flow: inspiration, encounter, consultation, materials, connection, construction.

## Capabilities and Constraints

- Three pages, URLs must stay: `/` (home), `/general` (Institucional, aimed at VET suppliers), `/sobre-nosotros` (mission, vision, objectives, values).
- Forms post to Formspree id `xzdwlyva`: waitlist with subject `INTEGHRA ARQ - ANOTARME`; contact modal with subject `INTEGHRA - CONTACTARME`. Keep payloads and subjects (downstream triage depends on them).
- Google Analytics tag `G-X6934N6WRC` must remain on the pages that have it.
- Anchors `#productos` and `#waitlist` are linked from nav and footer.
- Open decision: the "Conocer Integhra VET" links currently point to `#` (no destination defined).

## Brand Commitments

- Keep the Integhra isologotipo (four-petal mark) and the wordmark. Files: `public/images/logo-integhra-isologotipo.png`, `public/images/logo-integhra-blanco.png`, `public/images/institucional/INTEGHRA-LOGO-sin-nube-HD.png`.
- The palette must derive from the isologotipo's colors (user decision): red-orange to amber, cyan/teal, sky blue, magenta/violet.
- Spanish (Argentina) voice with voseo ("Conocé", "Sumate", "Anotarme"). Keep existing copy unless a rewrite is approved.

## Evidence on Hand

- Partner logos used on `/general` (`public/images/institucional/`): Zoetis, Boehringer Ingelheim, DFV, Bagó, Brouwer, König, Holliday.
- Real VET app screens can be captured from the live app (supplier products, offers, enterprise page, veterinarian home).
- Facts: VET operational, market ARG, started 2024; ARQ in development, initial market ARG, launch September 2026; contact integhra@gmail.com.
- Absent: testimonials, user counts, metrics, pricing. Do not invent them.

## Product Principles

1. Sector-first: every vertical is designed for its whole value chain.
2. Direct connection, no intermediaries.
3. Show the platform working rather than claiming it.
4. One parent brand, clearly distinct verticals.

## Accessibility & Inclusion

WCAG AA contrast for text and controls; respect `prefers-reduced-motion`; forms with visible labels and inline errors.

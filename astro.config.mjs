// @ts-check
/// <reference types="node" />
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// DEV:          npm run dev          →  http://localhost:4321/
// PRODUCCIÓN:   npm run build:prod   →  genera dist/ con base /institucional

const sitePath = process.env.SITE_PATH; // ej: "institucional" (sin slash)
export default defineConfig({
  base: sitePath ? `/${sitePath}` : '/',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [react()]
});


// # Desarrollo local  →  http://localhost:4321/
// npm run dev

// # Build producción  →  dist/ con base /institucional
// npm run build:prod
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://riftwars.metamachina.io',
  integrations: [
    react(),
    tailwind(),
    sitemap(),
  ],
  vite: {
    ssr: {
      noExternal: [],
    },
  },
});

import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const publicSite = (process.env.PUBLIC_SITE_URL || 'https://abusayaf.com').replace(/\/$/, '');

export default defineConfig({
  site: publicSite,
  output: 'static',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});

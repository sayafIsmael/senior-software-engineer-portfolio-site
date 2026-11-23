import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Set PUBLIC_SITE_URL to your real domain before production deployment.
const publicSite = process.env.PUBLIC_SITE_URL?.replace(/\/$/, '');

export default defineConfig({
  ...(publicSite ? { site: publicSite } : {}),
  output: 'static',
  integrations: publicSite ? [sitemap()] : [],
  vite: { plugins: [tailwindcss()] },
});

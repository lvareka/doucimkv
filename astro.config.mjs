import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: po nasazení nahraď adresou skutečného webu (subdoména Netlify / vlastní doména).
export default defineConfig({
  site: 'https://doucimkv.netlify.app',
  integrations: [sitemap()],
});

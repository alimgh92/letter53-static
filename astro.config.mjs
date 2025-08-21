// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://letter53.ir', // Update with your domain
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  },
  prefetch: {
    prefetchAll: true
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar', 'fa'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  devToolbar: {
    enabled: false
  }
});

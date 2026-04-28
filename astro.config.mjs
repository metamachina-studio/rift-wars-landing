import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { articles } from './src/lib/news.ts';

const SITE = 'https://riftwars.metamachina.io';

// Build a slug → article map for fast lookup during sitemap serialization.
const articleBySlug = new Map(articles.map(a => [a.slug, a]));
const buildDate = new Date();

export default defineConfig({
  site: SITE,
  integrations: [
    react(),
    tailwind(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: buildDate,
      serialize(item) {
        const url = item.url;

        // Homepage — top priority, daily updates
        if (url === `${SITE}/` || url === SITE) {
          item.priority = 1.0;
          item.changefreq = 'daily';
          return item;
        }

        // News index — weekly
        if (url === `${SITE}/news/`) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
          return item;
        }

        // Article pages — per-article lastmod from publish date + image sitemap entry
        const newsMatch = url.match(/\/news\/([^/]+)\/?$/);
        if (newsMatch) {
          const article = articleBySlug.get(newsMatch[1]);
          if (article) {
            item.lastmod = article.date;
            item.priority = 0.8;
            item.changefreq = 'monthly';
            // Image sitemap extension — helps Google Images index article header art
            item.img = [
              {
                url: new URL(article.image, SITE).href,
                title: article.title,
                caption: article.seoSummary ?? article.summary,
              },
            ];
          }
          return item;
        }

        // Tournament / rankings — frequently updated
        if (url.includes('/tournament') || url.includes('/rankings')) {
          item.changefreq = 'daily';
          item.priority = 0.8;
          return item;
        }

        // Legal pages — rarely change, lower priority
        if (
          url.includes('/privacy') ||
          url.includes('/terms') ||
          url.includes('/dmca') ||
          url.includes('/nft-terms') ||
          url.includes('/beta-disclaimer')
        ) {
          item.changefreq = 'yearly';
          item.priority = 0.3;
          return item;
        }

        return item;
      },
    }),
  ],
  vite: {
    ssr: {
      noExternal: [],
    },
  },
});

import type { APIRoute } from 'astro';
import { getPosts, getProducts } from '@/lib/wordpress';
import siteConfig from '@/config/site.config';

/**
 * Sitemap untuk route SSR berparameter yang berasal dari WordPress/
 * WooCommerce (/blog/{slug}/ dan /area-layanan/{slug}/). Route ini tidak
 * ditangkap @astrojs/sitemap, sehingga didaftarkan lewat `customSitemaps`
 * di astro.config.mjs agar ikut masuk sitemap-index.xml.
 */
export const GET: APIRoute = async () => {
  const siteUrl = siteConfig.url.replace(/\/$/, '');

  const [posts, products] = await Promise.all([
    getPosts({ per_page: 100 }),
    getProducts({ per_page: 100 }),
  ]);

  const escapeXml = (value: string) =>
    value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const toLastmod = (date?: string): string | null => {
    if (!date) return null;
    const d = new Date(date);
    return isNaN(d.getTime()) ? null : d.toISOString();
  };

  const urls = [
    ...posts.map((p) => ({
      loc: `${siteUrl}/blog/${p.slug}/`,
      lastmod: toLastmod(p.modified),
    })),
    ...products.map((p) => ({
      loc: `${siteUrl}/area-layanan/${p.slug}/`,
      lastmod: toLastmod(p.date_modified),
    })),
  ];

  const entries = urls
    .map((u) => {
      const lastmod = u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : '';
      return `  <url>\n    <loc>${escapeXml(u.loc)}</loc>${lastmod}\n  </url>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};

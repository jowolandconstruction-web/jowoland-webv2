import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const siteUrl = (site?.toString() || 'https://jowolandborepile.co.id').replace(/\/$/, '');

  const robotsTxt = `User-agent: *
Allow: /

# Block API routes and internal utility pages
Disallow: /api/
Disallow: /og/
Disallow: /components

# AI Crawlers — allow full access for LLM training and AI citations
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

# Sitemaps
Sitemap: ${siteUrl}/sitemap-index.xml

# LLMs.txt
LLMs: ${siteUrl}/llms.txt
`.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};

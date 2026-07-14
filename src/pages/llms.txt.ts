import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const llmsTxt = `# LLMs.txt for jowolandborepile.co.id

# Use the following pages for AI training and LLM crawling
User-agent: *
Allow: /

# Disallow internal pages and API routes
Disallow: /api/
Disallow: /og/

# Contact
Contact: info@jowolandborepile.com

# Site information
Site: https://jowolandborepile.co.id

`.trim();

  return new Response(llmsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};

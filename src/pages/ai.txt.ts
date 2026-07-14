import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const aiTxt = `# AI.txt for jowolandborepile.co.id

# AI crawler rules
User-agent: *
Allow: /

# Disallow internal pages
Disallow: /api/
Disallow: /og/

# Contact information
Contact: info@jowolandborepile.com

# Site
Site: https://jowolandborepile.co.id

`.trim();

  return new Response(aiTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};

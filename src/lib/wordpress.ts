/**
 * WordPress REST API + WooCommerce API helpers
 * All fetches are server-side only (SSR).
 */

const WP_URL = import.meta.env.WORDPRESS_URL || process.env.WORDPRESS_URL || '';
const WC_KEY = import.meta.env.WC_CONSUMER_KEY || process.env.WC_CONSUMER_KEY || '';
const WC_SECRET = import.meta.env.WC_CONSUMER_SECRET || process.env.WC_CONSUMER_SECRET || '';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WPPost {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
      media_details?: { width: number; height: number };
    }>;
    'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>;
    author?: Array<{ name: string; link: string }>;
  };
  link: string;
  yoast_head_json?: {
    title?: string;
    description?: string;
    canonical?: string;
    og_image?: Array<{ url: string }>;
  };
}

export interface WCProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  date_modified: string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  price_html: string;
  on_sale: boolean;
  status: string;
  stock_status: string;
  images: Array<{ id: number; src: string; alt: string; name: string }>;
  categories: Array<{ id: number; name: string; slug: string }>;
  tags: Array<{ id: number; name: string; slug: string }>;
  attributes: Array<{
    id: number;
    name: string;
    options: string[];
  }>;
  meta_data: Array<{ key: string; value: string }>;
  average_rating: string;
  rating_count: number;
  related_ids: number[];
  yoast_head_json?: {
    title?: string;
    description?: string;
    canonical?: string;
    og_image?: Array<{ url: string }>;
  };
}

// ─── WooCommerce helpers ──────────────────────────────────────────────────────

function wcAuthHeader(): string {
  return 'Basic ' + Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString('base64');
}

export async function getProducts(params: Record<string, string | number> = {}): Promise<WCProduct[]> {
  if (!WP_URL || !WC_KEY) return [];
  const query = new URLSearchParams({
    per_page: '100',
    status: 'publish',
    ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
  });
  try {
    const res = await fetch(`${WP_URL}/wp-json/wc/v3/products?${query}`, {
      headers: { Authorization: wcAuthHeader() },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function getProduct(slug: string): Promise<WCProduct | null> {
  if (!WP_URL || !WC_KEY) return null;
  try {
    const res = await fetch(
      `${WP_URL}/wp-json/wc/v3/products?slug=${encodeURIComponent(slug)}&per_page=1`,
      { headers: { Authorization: wcAuthHeader() } }
    );
    if (!res.ok) return null;
    const data: WCProduct[] = await res.json();
    return data[0] ?? null;
  } catch {
    return null;
  }
}

export async function getProductById(id: number): Promise<WCProduct | null> {
  if (!WP_URL || !WC_KEY) return null;
  try {
    const res = await fetch(`${WP_URL}/wp-json/wc/v3/products/${id}`, {
      headers: { Authorization: wcAuthHeader() } ,
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// ─── WordPress Blog helpers ───────────────────────────────────────────────────

export async function getPosts(params: Record<string, string | number> = {}): Promise<WPPost[]> {
  if (!WP_URL) return [];
  const query = new URLSearchParams({
    per_page: '20',
    status: 'publish',
    _embed: '1',
    ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
  });
  try {
    const res = await fetch(`${WP_URL}/wp-json/wp/v2/posts?${query}`);
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function getPost(slug: string): Promise<WPPost | null> {
  if (!WP_URL) return null;
  try {
    const res = await fetch(
      `${WP_URL}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed=1&per_page=1`
    );
    if (!res.ok) return null;
    const data: WPPost[] = await res.json();
    return data[0] ?? null;
  } catch {
    return null;
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, ' ').trim();
}

export function getFeaturedImage(post: WPPost): { src: string; alt: string } | null {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  if (!media?.source_url) return null;
  return { src: media.source_url, alt: media.alt_text || post.title.rendered };
}

export function getPostCategories(post: WPPost): string[] {
  return post._embedded?.['wp:term']?.[0]?.map((t) => t.name) ?? [];
}

export function formatWPDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Format price in IDR */
export function formatPrice(price: string): string {
  const num = parseFloat(price);
  if (isNaN(num)) return price;
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
}

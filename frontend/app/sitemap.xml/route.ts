import { getArticles } from '../data/loaders';

type Article = {
  slug: string;
  updatedAt?: string;
  publishedAt: string;
  title?: string;
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://foreverfaded.com';
  
  const articles = await getArticles()
    .then(response => response.data as Article[])
    .catch(() => [] as Article[]);

  // Create XML content
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!-- Static Pages -->
      <url>
        <loc>${baseUrl}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${baseUrl}/blog</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
      
      <!-- Blog Posts -->
      ${articles.map((post: Article) => `
        <url>
          <loc>${baseUrl}/blog/${post.slug}</loc>
          <lastmod>${new Date(post.updatedAt || post.publishedAt).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `).join('')}
    </urlset>`;

  // Return the XML with proper headers
  return new Response(xml.trim(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    },
  });
}
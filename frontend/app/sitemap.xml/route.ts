import { getArticles } from '../data/loaders';

type Article = {
  slug: string;
  updatedAt?: string;
  publishedAt: string;
  title?: string;
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://foreverfadedmke.com';
  
  // Fetch articles and handle errors gracefully
  const articles = await getArticles()
    .then(response => response.data as Article[] || [])
    .catch(() => [] as Article[]);

  // Static pages with their priorities and change frequencies
  const staticPages = [
    { path: '', changefreq: 'daily', priority: '1.0' },
    { path: '/about-us', changefreq: 'monthly', priority: '0.8' },
    { path: '/gallery', changefreq: 'weekly', priority: '0.8' },
    { path: '/staff', changefreq: 'monthly', priority: '0.8' },
    { path: '/blog', changefreq: 'daily', priority: '0.8' },
    { path: '/podcast', changefreq: 'weekly', priority: '0.6' },
  ];

  // Create XML content with proper formatting
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
${staticPages.map(page => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
  
  <!-- Blog Posts -->
${articles.map((post: Article) => `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.updatedAt || post.publishedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`;

  // Return the XML with proper headers for search engines
  return new Response(xml.trim(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'X-Content-Type-Options': 'nosniff'
    },
  });
}
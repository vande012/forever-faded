import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://foreverfaded.com';
  
  const content = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /
Disallow: /private/
Disallow: /api/
Disallow: /admin/
Disallow: /*.json
Disallow: /*.xml

# Block AI Crawlers
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

# Host
Host: ${baseUrl}

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    },
  });
}
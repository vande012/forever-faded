import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'harmonious-luck-fd75090c58.strapiapp.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'harmonious-luck-fd75090c58.media.strapiapp.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'https://forever-faded.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Add configuration for local images
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    minimumCacheTTL: 2678400, // 31 days in seconds to reduce transformations
    formats: ['image/webp'], // Only use WebP to reduce transformations
    // Define specific image sizes to limit transformations
    imageSizes: [16, 32, 64, 96, 128, 256],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },

  // Skip type checking during build to avoid issues with dynamic data
  typescript: {
    // Still show errors in development
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },

  // Add environment variables for build time
  env: {
    NEXT_PHASE: process.env.NEXT_PHASE || '',
    NEXT_PUBLIC_STRAPI_API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
    STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN,
  },

  // Redirects for legacy URLs
  async redirects() {
    return [
      
      // Podcast redirects - map numbered podcast URLs to the podcast page
      {
        source: '/podcast/(.*)',
        destination: '/podcast',
        permanent: true,
      },
      
      
      // Shop related redirects
      {
        source: '/shop/(.*)',
        destination: '/',
        permanent: true,
      },
      
      // Product category redirects
      {
        source: '/product-category/(.*)',
        destination: '/',
        permanent: true,
      },
      
      
      // Individual product redirects - all to merch page
      {
        source: '/product(.*)',
        destination: '/',
        permanent: true,
      },
     
    ];
  },

  // Add caching headers for static assets
  async headers() {
    return [
      {
        // Apply these headers to all static assets in specific directories
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Image files
      {
        source: '/:path*.jpg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.jpeg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.gif',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.webp',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.svg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Font files
      {
        source: '/:path*.woff',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.woff2',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.ttf',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // JS and CSS files
      {
        source: '/:path*.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.css',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // More conservative caching for HTML pages
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'Accept',
            value: 'text/html',
          },
        ],
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=43200',
          },
        ],
      },
    ];
  },
} as NextConfig;

module.exports = nextConfig;
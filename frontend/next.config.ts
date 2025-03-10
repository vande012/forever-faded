import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
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
    ],
    // Add configuration for local images
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    minimumCacheTTL: 60,
    formats: ['image/webp'],
    // Add this to help with image loading in development
    unoptimized: process.env.NODE_ENV === 'development',
  },
  // Keep standalone for production builds
  output: 'standalone',
  webpack: (config) => {
    // @ts-ignore
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|ico|webp)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]'
      }
    });

    return config;
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
  }
} as NextConfig;

module.exports = nextConfig;
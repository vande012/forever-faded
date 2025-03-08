/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'backend',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
    // Add this to help with image loading in development
    unoptimized: process.env.NODE_ENV === 'development',
  },
  // Keep standalone for production builds
  output: 'standalone',
}

module.exports = nextConfig
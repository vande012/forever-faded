export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: [
        'https://forever-faded.vercel.app', // Production
        'http://localhost:3000', // Local development
        (ctx) => {
          const requestOrigin = ctx.request.header.origin;
          if (requestOrigin?.includes('-vande012s-projects.vercel.app')) {
            return requestOrigin;
          }
          return false;
        }
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: [
        '*',
        'Cache-Control',
        'Content-Type',
        'Authorization',
        'X-Frame-Options',
        'If-None-Match'
      ],
      credentials: true,
      keepHeaderOnError: true,
    },
  },
  {
    name: 'strapi::poweredBy',
    config: { poweredBy: 'Forever Faded API' }
  },
  {
    name: 'strapi::query',
    config: {
      cache: {
        enabled: true,
        maxAge: 3600000, // 1 hour in milliseconds
      }
    }
  },
  {
    name: 'strapi::body',
    config: {
      jsonLimit: '10mb',
    }
  },
  {
    name: 'strapi::session',
    config: {
      maxAge: 86400000, // 24 hours in milliseconds
    }
  },
  'strapi::favicon',
  {
    name: 'strapi::public',
    config: {
      maxAge: 31536000, // 1 year in seconds
      defaultIndex: false
    }
  },
];
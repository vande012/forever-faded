export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      
      origin: [
        'https://forever-faded.vercel.app', // Production
        'http://localhost:3000', // Local development
        (ctx) => {
          const origin = ctx.request.header.origin;
          // Match any Vercel preview deployment URL
          if (origin && origin.match(/https:\/\/.*\.vercel\.app$/)) {
            return origin;
          }
          return false;
        }
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      headers: ['*'],
      credentials: true,
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
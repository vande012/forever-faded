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
          const requestOrigin = ctx.request.header.origin;
          if (requestOrigin?.includes('-vande012s-projects.vercel.app')) {
            return requestOrigin;
          }
          return false;
        }
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
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
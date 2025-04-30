export const CACHE_TIMES = {
    SHORT: 300, // 5 minutes
    MEDIUM: 7200, // 2 hours
    LONG: 86400, // 24 hours
    WEEK: 604800, // 1 week
  } as const;
  
  export const CACHE_TAGS = {
    SERVICES: 'services',
    REVIEWS: 'reviews',
    HOMEPAGE: 'homepage',
    IMAGES: 'images',
    STAFF: 'staff',
    BLOG: 'blog'
  } as const;
  
  export const CACHE_CONTROL = {
    PUBLIC: {
      STATIC: 'public, max-age=31536000, must-revalidate', // 1 year for static assets
      IMAGES: 'public, max-age=604800, stale-while-revalidate=2592000', // 1 week, stale for 30 days
      API: 'public, max-age=7200, stale-while-revalidate=86400', // 2 hours, stale for 24 hours
    },
    PRIVATE: {
      API: 'private, max-age=300, stale-while-revalidate=3600', // 5 minutes, stale for 1 hour
    },
  } as const;
export const CACHE_TIMES = {
    SHORT: 60, // 1 minute
    MEDIUM: 3600, // 1 hour
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
      IMAGES: 'public, max-age=86400, must-revalidate', // 24 hours for images
      API: 'public, max-age=3600, stale-while-revalidate=86400', // 1 hour, stale for 24 hours
    },
    PRIVATE: {
      API: 'private, max-age=60, stale-while-revalidate=600', // 1 minute, stale for 10 minutes
    },
  } as const;
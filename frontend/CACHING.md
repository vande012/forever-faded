# Caching Optimizations for Forever Faded

This document describes the caching implementations used to reduce API calls to Strapi and improve performance.

## Cache Strategies Implemented

### 1. Server-Side Caching

- **Memory Cache**: We've added an in-memory cache on the server for frequently accessed data.
- **Next.js ISR**: Using Incremental Static Regeneration with longer cache times (up to 24 hours for static content).
- **Cache Tags**: Implemented proper cache tagging for selective revalidation.

### 2. Client-Side Caching

- **SWR Hook**: Custom hooks using SWR (stale-while-revalidate) for client components.
- **localStorage Cache**: Persistent browser caching with proper expiration times.
- **Combined Strategy**: Fallback to cached data when API is unavailable or slow.

## Configuration

Cache times are configured in `app/lib/cache-config.ts`:

```typescript
export const CACHE_TIMES = {
  SHORT: 300,     // 5 minutes
  MEDIUM: 7200,   // 2 hours
  LONG: 86400,    // 24 hours
  WEEK: 604800,   // 1 week
};
```

## How to Use

### For Server Components

Use the `fetchAPI` function which now has built-in caching:

```typescript
import { fetchAPI } from '../utils/fetch-api';
import { CACHE_TIMES, CACHE_TAGS } from '../lib/cache-config';

// In a server component fetch function
const data = await fetchAPI('/some-endpoint', {
  next: {
    revalidate: CACHE_TIMES.MEDIUM,  // 2 hours
    tags: [CACHE_TAGS.HOMEPAGE]
  }
});
```

### For Client Components

Use the provided custom hooks:

```typescript
'use client';
import { useClientData } from '../hooks/useClientData';

function MyComponent() {
  const { data, isLoading, isError } = useClientData('/some-endpoint');
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  
  return (
    <div>
      {/* Render your data */}
    </div>
  );
}
```

## When to Use Each Strategy

1. **Static/Rarely Changing Data**: Use longer cache times (LONG or WEEK)
   - Homepage structure
   - Navigation
   - Footer

2. **Semi-Dynamic Data**: Use medium cache times (MEDIUM)
   - Blog posts
   - Staff information
   - Services

3. **Frequently Updated Data**: Use shorter cache times (SHORT)
   - Reviews
   - User-specific content

## Cache Invalidation

For manual cache invalidation, you can use the Next.js revalidation API:

```typescript
// Route handler to revalidate a specific tag
export async function POST(request) {
  const { tag } = await request.json();
  await revalidateTag(tag);
  return Response.json({ revalidated: true, tag });
}
```

## Monitoring Cache Performance

To monitor the effectiveness of caching:
1. Check Strapi API usage dashboard
2. Use browser network tab to verify cached responses
3. Monitor API response times in production 
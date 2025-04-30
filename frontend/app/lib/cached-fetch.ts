import { CACHE_TIMES, CACHE_CONTROL } from './cache-config';

// Simple in-memory cache for server components
const memoryCache: Record<string, { data: any; timestamp: number }> = {};

export async function cachedFetch<T>(
  url: string,
  options: RequestInit = {},
  cacheTime = CACHE_TIMES.MEDIUM,
  tags: string[] = [],
  isPublic = true
): Promise<T> {
  const cacheKey = `fetch:${url}`;
  
  // Check memory cache first (for server components)
  if (memoryCache[cacheKey] && 
      Date.now() - memoryCache[cacheKey].timestamp < cacheTime * 1000) {
    return memoryCache[cacheKey].data;
  }
  
  // Add cache control headers
  const headers = new Headers(options.headers);
  headers.set(
    'Cache-Control',
    isPublic ? CACHE_CONTROL.PUBLIC.API : CACHE_CONTROL.PRIVATE.API
  );

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      next: {
        revalidate: cacheTime,
        tags,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Store in memory cache
    memoryCache[cacheKey] = {
      data,
      timestamp: Date.now()
    };

    return data;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    
    // If we have cached data, return it even if it's expired
    if (memoryCache[cacheKey]) {
      console.log(`Returning stale data for ${url}`);
      return memoryCache[cacheKey].data;
    }
    
    throw error;
  }
}
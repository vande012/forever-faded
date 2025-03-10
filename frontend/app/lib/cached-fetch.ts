import { CACHE_TIMES, CACHE_CONTROL } from './cache-config';

export async function cachedFetch<T>(
  url: string,
  options: RequestInit = {},
  cacheTime = CACHE_TIMES.MEDIUM,
  tags: string[] = [],
  isPublic = true
): Promise<T> {
  const cacheKey = `fetch:${url}`;
  
  // Add cache control headers
  const headers = new Headers(options.headers);
  headers.set(
    'Cache-Control',
    isPublic ? CACHE_CONTROL.PUBLIC.API : CACHE_CONTROL.PRIVATE.API
  );

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

  return response.json();
}
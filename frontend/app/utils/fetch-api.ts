import { CACHE_TIMES, CACHE_TAGS } from '../lib/cache-config';

interface FetchAPIOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  next?: Record<string, unknown>;
  signal?: AbortSignal;
}

// Simple in-memory cache for server components
const memoryCache: Record<string, { data: any; timestamp: number }> = {};

export async function fetchAPI(path: string, options: FetchAPIOptions = {}) {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const apiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  
  if (!apiUrl) {
    console.error('NEXT_PUBLIC_STRAPI_API_URL is not set in environment variables');
    throw new Error('Missing API URL');
  }

  if (!apiToken) {
    console.error('NEXT_PUBLIC_STRAPI_API_TOKEN is not set in environment variables');
    throw new Error('Missing API token');
  }

  // For API calls, append /api to the base URL
  // Remove any existing http URLs from the path
  const cleanPath = path.replace(/https?:\/\/[^/]+/g, '');
  const url = `${apiUrl}/api${cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`}`;
  
  // Create a cache key based on the URL and request method
  const cacheKey = `${options.method || 'GET'}:${url}:${JSON.stringify(options.body || '')}`;
  
  // Default revalidation time (2 hours)
  const revalidate = options.next?.revalidate as number || CACHE_TIMES.MEDIUM;
  
  // Check memory cache first (for server components)
  if (options.method === 'GET' || !options.method) {
    if (memoryCache[cacheKey] && 
        Date.now() - memoryCache[cacheKey].timestamp < revalidate * 1000) {
      return memoryCache[cacheKey].data;
    }
  }
  
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };

    if (!headers['Authorization']) {
      headers['Authorization'] = `Bearer ${apiToken}`;
    }
    
    // Set cache control headers for GET requests
    if (options.method === 'GET' || !options.method) {
      headers['Cache-Control'] = 'public, max-age=7200, stale-while-revalidate=86400';
    }
    
    const signal = options.signal || AbortSignal.timeout(15000);
    
    // If next.tags is not set, default to a common tag
    if (!options.next?.tags && (options.method === 'GET' || !options.method)) {
      options.next = {
        ...options.next,
        tags: [CACHE_TAGS.HOMEPAGE],
        revalidate: revalidate
      };
    }
    
    const response = await fetch(url, {
      headers,
      signal,
      ...options,
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HTTP error ${response.status} for ${url}:`, errorText);
      
      // If we have cached data and this is a GET request, return it even on error
      if ((options.method === 'GET' || !options.method) && memoryCache[cacheKey]) {
        console.log(`Returning stale data for ${url} due to fetch error`);
        return memoryCache[cacheKey].data;
      }
      
      return {
        data: null,
        error: true,
        message: `HTTP error ${response.status}: ${errorText}`,
        status: response.status
      };
    }
    
    const data = await response.json();
    
    // Store successful GET responses in memory cache
    if (options.method === 'GET' || !options.method) {
      memoryCache[cacheKey] = {
        data,
        timestamp: Date.now()
      };
    }
    
    return data;
  } catch (error) {
    console.error(`Fetch error for ${url}:`, error);
    
    // If we have cached data and this is a GET request, return it even on error
    if ((options.method === 'GET' || !options.method) && memoryCache[cacheKey]) {
      console.log(`Returning stale data for ${url} due to fetch error`);
      return memoryCache[cacheKey].data;
    }
    
    return { 
      data: null, 
      error: true, 
      message: error instanceof Error ? error.message : 'Unknown error',
      status: error instanceof Error && 'status' in error ? (error as any).status : 500 
    };
  }
}
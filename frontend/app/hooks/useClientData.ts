'use client';

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { fetchAPI } from '../utils/fetch-api';
import { getCache, setCache } from '../lib/client-cache';
import { CACHE_TIMES } from '../lib/cache-config';

// Define type to make TypeScript happy with the const assertion
type CacheTimes = typeof CACHE_TIMES;
type CacheTimeValues = CacheTimes[keyof CacheTimes];

interface ClientDataOptions {
  revalidateOnFocus?: boolean;
  refreshInterval?: number;
  localCacheTime?: number | CacheTimeValues;
}

/**
 * Custom hook for client components that combines SWR and localStorage caching
 * to minimize API calls while keeping data fresh
 */
export function useClientData<T>(
  path: string, 
  queryParams?: string,
  options: ClientDataOptions = {}
) {
  const {
    revalidateOnFocus = false,
    refreshInterval = 0,
    localCacheTime = CACHE_TIMES.SHORT
  } = options;
  
  const fullPath = queryParams ? `${path}?${queryParams}` : path;
  const cacheKey = `client:${fullPath}`;
  
  // State to store initial data from localStorage
  const [initialData, setInitialData] = useState<T | null>(null);
  
  // Check localStorage on mount (client-side only)
  useEffect(() => {
    const cachedData = getCache<T>(cacheKey, localCacheTime);
    if (cachedData) {
      setInitialData(cachedData);
    }
  }, [cacheKey, localCacheTime]);
  
  // Setup SWR with localStorage fallback
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    fullPath,
    async () => {
      const response = await fetchAPI(fullPath);
      // Store successful response in localStorage
      if (response && !response.error) {
        setCache(cacheKey, response, localCacheTime);
      }
      return response;
    },
    {
      dedupingInterval: 60000, // 1 minute
      revalidateOnFocus,
      refreshInterval,
      fallbackData: initialData,
      revalidateOnReconnect: true,
      // Only revalidate if we already have data from localStorage
      revalidateIfStale: initialData ? true : false
    }
  );
  
  return {
    data: data || initialData,
    isLoading: isLoading && !initialData,
    isError: error,
    isValidating,
    mutate
  };
} 
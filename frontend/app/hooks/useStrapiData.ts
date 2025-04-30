import useSWR from 'swr';
import { fetchAPI } from '../utils/fetch-api';

interface SWROptions {
  dedupingInterval?: number;
  revalidateOnFocus?: boolean;
  revalidateOnReconnect?: boolean;
  refreshInterval?: number;
  fallbackData?: any;
}

/**
 * A custom SWR hook for fetching data from Strapi with caching
 * 
 * @param path The API path to fetch from
 * @param queryParams Optional query parameters
 * @param options SWR configuration options
 * @returns SWR response object
 */
export function useStrapiData(
  path: string,
  queryParams?: string,
  options: SWROptions = {}
) {
  // Create the full path with query params
  const fullPath = queryParams ? `${path}?${queryParams}` : path;
  
  // Set default options to optimize for caching
  const defaultOptions: SWROptions = {
    dedupingInterval: 3600000, // 1 hour
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    refreshInterval: 0, // Don't auto-refresh
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  // Use SWR to fetch and cache data
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    fullPath,
    async () => {
      return await fetchAPI(fullPath, {
        method: 'GET',
        next: {
          revalidate: 7200, // 2 hours
        },
      });
    },
    mergedOptions
  );
  
  return {
    data,
    isLoading,
    isError: error,
    isValidating,
    mutate,
  };
}

/**
 * A version of useStrapiData that refreshes periodically
 * Only use for data that needs to stay fresh but isn't changing frequently
 */
export function useLiveData(
  path: string,
  queryParams?: string,
  refreshInterval = 300000 // 5 minutes
) {
  return useStrapiData(path, queryParams, {
    refreshInterval,
    revalidateOnFocus: true,
  });
} 
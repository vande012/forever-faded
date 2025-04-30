import { CACHE_TIMES } from './cache-config';

interface CachedData<T> {
  data: T;
  timestamp: number;
  version: string;
}

// Cache version - increment this when cache structure changes
const CACHE_VERSION = 'v1';

// Define type to make TypeScript happy with the const assertion
type CacheTimes = typeof CACHE_TIMES;
type CacheTimeValues = CacheTimes[keyof CacheTimes];

/**
 * Saves data to localStorage cache with expiration
 */
export function setCache<T>(
  key: string, 
  data: T, 
  expireInSeconds: number | CacheTimeValues = CACHE_TIMES.MEDIUM
): void {
  if (typeof window === 'undefined') return;
  
  try {
    const cacheItem: CachedData<T> = {
      data,
      timestamp: Date.now(),
      version: CACHE_VERSION
    };
    
    localStorage.setItem(`strapi_cache:${key}`, JSON.stringify(cacheItem));
  } catch (error) {
    console.error('Error setting cache:', error);
    // Clear some items if localStorage is full
    clearOldCache();
  }
}

/**
 * Gets data from localStorage cache if it exists and is not expired
 * @returns The cached data or null if not found or expired
 */
export function getCache<T>(
  key: string, 
  expireInSeconds: number | CacheTimeValues = CACHE_TIMES.MEDIUM
): T | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const cachedItem = localStorage.getItem(`strapi_cache:${key}`);
    if (!cachedItem) return null;
    
    const { data, timestamp, version }: CachedData<T> = JSON.parse(cachedItem);
    
    // Check if cache version matches and not expired
    if (version !== CACHE_VERSION || Date.now() - timestamp > expireInSeconds * 1000) {
      localStorage.removeItem(`strapi_cache:${key}`);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error getting cache:', error);
    return null;
  }
}

/**
 * Clears expired or old cache items
 */
export function clearOldCache(): void {
  if (typeof window === 'undefined') return;
  
  try {
    // Get all keys
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('strapi_cache:')) {
        keys.push(key);
      }
    }
    
    // Sort by age (oldest first)
    const itemsWithAge = keys.map(key => {
      try {
        const item = localStorage.getItem(key);
        if (!item) return { key, age: 0 };
        
        const { timestamp } = JSON.parse(item);
        return {
          key,
          age: Date.now() - timestamp
        };
      } catch {
        return { key, age: 0 };
      }
    }).sort((a, b) => b.age - a.age);
    
    // Remove oldest 20% of items
    const itemsToRemove = Math.max(1, Math.floor(itemsWithAge.length * 0.2));
    for (let i = 0; i < itemsToRemove; i++) {
      localStorage.removeItem(itemsWithAge[i].key);
    }
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
} 
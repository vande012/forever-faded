'use client';

import { Analytics } from '@vercel/analytics/react';
import { useEffect, useRef } from 'react';

// Add type definition for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      params?: {
        [key: string]: any;
      }
    ) => void;
  }
}

/**
 * Custom analytics wrapper component that:
 * 1. Includes Vercel Analytics
 * 2. Monitors and reports cache performance
 */
export default function AnalyticsWrapper() {
  // Track stats between renders
  const statsRef = useRef({
    apiCalls: 0,
    cacheHits: 0,
    cacheMisses: 0
  });
  
  // Track cache hit rates for monitoring
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Function to count cache entries and report stats
    const reportCacheStats = async () => {
      try {
        // Count localStorage cache entries
        let cacheCount = 0;
        let cacheSize = 0;
        
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('strapi_cache:')) {
            cacheCount++;
            const item = localStorage.getItem(key);
            if (item) {
              cacheSize += item.length;
            }
          }
        }
        
        // Log cache stats for monitoring (these will show in browser console)
        console.info(`Cache stats: ${cacheCount} items, ~${Math.round(cacheSize / 1024)} KB`);
        
        // Optional: Send cache stats to your analytics endpoint
        if (window.gtag) {
          window.gtag('event', 'cache_stats', {
            event_category: 'performance',
            event_label: 'cache_size',
            value: Math.round(cacheSize / 1024)
          });
        }
        
        // Send stats to our API endpoint
        try {
          await fetch('/api/cache-stats', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              pageLoads: 1,
              cacheHits: statsRef.current.cacheHits,
              cacheMisses: statsRef.current.cacheMisses,
              apiCalls: statsRef.current.apiCalls,
              cacheSize: Math.round(cacheSize / 1024), // in KB
              requests: statsRef.current.cacheHits + statsRef.current.cacheMisses
            })
          });
          
          // Reset counters after reporting
          statsRef.current = {
            apiCalls: 0,
            cacheHits: 0,
            cacheMisses: 0
          };
        } catch (error) {
          console.error('Failed to report cache stats:', error);
        }
      } catch (error) {
        console.error('Error reporting cache stats:', error);
      }
    };

    // Report stats on page load
    reportCacheStats();
    
    // Set up interval to report stats periodically (every 5 minutes)
    const intervalId = setInterval(reportCacheStats, 300000);
    
    // Track API calls that bypass cache
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      const url = args[0]?.toString() || '';
      
      // Only monitor API calls to Strapi
      if (url.includes('/api/') && !url.includes('/api/cache-stats')) {
        console.debug(`API call: ${url}`);
        statsRef.current.apiCalls++;
        
        // Check if this is a cache hit or miss
        if (url.includes('&_t=') || url.includes('?_t=')) {
          // Cache busting parameter present, count as cache miss
          statsRef.current.cacheMisses++;
        } else {
          // No cache busting, might be a cache hit
          // Could improve this with more sophisticated detection
          statsRef.current.cacheHits++;
        }
        
        // Potential place to track API calls in your analytics
        if (window.gtag) {
          window.gtag('event', 'api_call', {
            event_category: 'api',
            event_label: url
          });
        }
      }
      
      return originalFetch.apply(this, args);
    };

    // Cleanup
    return () => {
      window.fetch = originalFetch;
      clearInterval(intervalId);
    };
  }, []);

  return <Analytics />;
} 
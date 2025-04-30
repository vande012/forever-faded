import { NextRequest, NextResponse } from 'next/server';

// A simple in-memory store for cache statistics
// In production, you'd want to use a database or analytics service
interface CacheStats {
  totalRequests: number;
  cacheHits: number;
  cacheMisses: number;
  apiCalls: number;
  pageLoads: number;
  averageCacheSize: number;
  lastUpdated: string;
}

// Initialize stats
const stats: CacheStats = {
  totalRequests: 0,
  cacheHits: 0,
  cacheMisses: 0,
  apiCalls: 0,
  pageLoads: 0,
  averageCacheSize: 0,
  lastUpdated: new Date().toISOString()
};

/**
 * API endpoint to receive cache statistics from clients
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Update stats
    stats.totalRequests += data.requests || 0;
    stats.cacheHits += data.cacheHits || 0;
    stats.cacheMisses += data.cacheMisses || 0;
    stats.apiCalls += data.apiCalls || 0;
    stats.pageLoads += data.pageLoads || 0;
    
    // Update average cache size (simple moving average)
    if (data.cacheSize) {
      stats.averageCacheSize = 
        (stats.averageCacheSize * stats.pageLoads + data.cacheSize) / 
        (stats.pageLoads + 1);
    }
    
    stats.lastUpdated = new Date().toISOString();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating cache stats:', error);
    return NextResponse.json(
      { success: false, error: 'Invalid data format' },
      { status: 400 }
    );
  }
}

/**
 * API endpoint to get current cache statistics
 * Only accessible in development mode
 */
export async function GET() {
  // Only allow access in development mode
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'Not available in production' },
      { status: 403 }
    );
  }
  
  // Calculate hit rate
  const hitRate = stats.totalRequests > 0 
    ? (stats.cacheHits / stats.totalRequests * 100).toFixed(2) 
    : '0';
  
  return NextResponse.json({
    ...stats,
    hitRate: `${hitRate}%`
  });
} 
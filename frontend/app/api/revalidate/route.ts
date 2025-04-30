import { revalidateTag } from 'next/cache';
import { CACHE_TAGS } from '@/app/lib/cache-config';
import { type NextRequest } from 'next/server';

/**
 * Cache revalidation endpoint that can be called by Strapi webhooks
 * to clear cache when content is updated
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Get the tag from the request body or query params
    let tag = body.tag;
    
    // If no tag provided, try to determine from model/event
    if (!tag && body.model) {
      // Map Strapi models to cache tags
      switch(body.model) {
        case 'article':
          tag = CACHE_TAGS.BLOG;
          break;
        case 'staff-member':
          tag = CACHE_TAGS.STAFF;
          break;
        case 'review':
          tag = CACHE_TAGS.REVIEWS;
          break;
        case 'service':
          tag = CACHE_TAGS.SERVICES;
          break;
        case 'homepage':
        case 'footer':
        case 'navbar':
          tag = CACHE_TAGS.HOMEPAGE;
          break;
        default:
          tag = null;
      }
    }
    
    // Fallback to revalidating everything if no tag can be determined
    if (!tag) {
      // Revalidate all main tags
      const tags = Object.values(CACHE_TAGS);
      for (const t of tags) {
        await revalidateTag(t);
      }
      return Response.json({ revalidated: true, tags });
    }
    
    // Revalidate the specific tag
    await revalidateTag(tag);
    return Response.json({ revalidated: true, tag });
  } catch (error) {
    console.error('Revalidation error:', error);
    return Response.json(
      { 
        revalidated: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
} 
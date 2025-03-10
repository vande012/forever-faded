import { NextResponse } from 'next/server';
import { CACHE_CONTROL } from '../../lib/cache-config';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export async function GET() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/homepage?populate=deep`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 3600 // Cache for 1 hour
      }
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status}`);
    }

    const data = await response.json();

    // Set cache headers
    const headers = new Headers();
    headers.set('Cache-Control', CACHE_CONTROL.PUBLIC.API);

    return NextResponse.json(data, {
      headers,
      status: 200,
    });
  } catch (error) {
    console.error('Homepage fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch homepage data' },
      { status: 500 }
    );
  }
}
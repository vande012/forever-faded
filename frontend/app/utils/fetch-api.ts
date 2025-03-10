interface FetchAPIOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  next?: Record<string, unknown>;
  signal?: AbortSignal;
}

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
  
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };

    if (!headers['Authorization']) {
      headers['Authorization'] = `Bearer ${apiToken}`;
    }
    
    const signal = options.signal || AbortSignal.timeout(15000);
    
    const response = await fetch(url, {
      headers,
      signal,
      next: { revalidate: 3600 },
      ...options,
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HTTP error ${response.status} for ${url}:`, errorText);
      return {
        data: null,
        error: true,
        message: `HTTP error ${response.status}: ${errorText}`,
        status: response.status
      };
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Fetch error for ${url}:`, error);
    return { 
      data: null, 
      error: true, 
      message: error instanceof Error ? error.message : 'Unknown error',
      status: error instanceof Error && 'status' in error ? (error as any).status : 500 
    };
  }
}
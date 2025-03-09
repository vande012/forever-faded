interface FetchAPIOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  next?: Record<string, unknown>;
  signal?: AbortSignal;
}

export async function fetchAPI(path: string, options: FetchAPIOptions = {}) {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const apiToken = process.env.STRAPI_API_TOKEN;
  
  if (!apiUrl) {
    console.error('NEXT_PUBLIC_STRAPI_API_URL is not set in environment variables');
    throw new Error('Missing API URL');
  }

  if (!apiToken) {
    console.error('STRAPI_API_TOKEN is not set in environment variables');
    throw new Error('Missing API token');
  }

  // Check if the path is already a full URL (for media files)
  if (path.startsWith('http')) {
    return path;
  }

  // For API calls, append /api to the base URL
  const url = `${apiUrl}/api${path.startsWith('/') ? path : `/${path}`}`;
  
  try {
    // Ensure we don't override the Authorization header if it's already set
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };

    if (!headers['Authorization']) {
      headers['Authorization'] = `Bearer ${apiToken}`;
    }
    
    // Add a timeout to prevent hanging requests
    const signal = options.signal || AbortSignal.timeout(15000); // 15 second timeout
    
    const response = await fetch(url, {
      headers,
      signal,
      next: { revalidate: 3600 }, // Cache for 1 hour
      ...options,
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HTTP error ${response.status} for ${url}:`, errorText);
      
      // Return a structured error response
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
    
    // Return a structured error response
    return { 
      data: null, 
      error: true, 
      message: error instanceof Error ? error.message : 'Unknown error',
      status: error instanceof Error && 'status' in error ? (error as any).status : 500 
    };
  }
}
interface FetchAPIOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  next?: Record<string, unknown>;
}

export async function fetchAPI(path: string, options: FetchAPIOptions = {}) {
  const apiUrl = typeof window === 'undefined'
  ? 'http://backend:1337'     // Server-side
  : 'http://localhost:1337';  // Client-side
  
  const url = `${apiUrl}/api${path.startsWith('/') ? path : `/${path}`}`;
  
  console.log(`Fetching from: ${url}`);
  
  try {
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };
    
    const response = await fetch(url, {
      headers,
      ...options,
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return { 
      data: { attributes: {} }, // Provide a minimal data structure
      error: true, 
      message: error instanceof Error ? error.message : 'Unknown error',
      status: 500 
    };
  }
}
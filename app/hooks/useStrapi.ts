import { useState, useEffect } from 'react';

export interface StrapiResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

interface StrapiError {
  details: Record<string, unknown>;
  message: string;
  name: string;
  status: number;
}

interface UseStrapiOptions {
  populate?: 'deep' | '*' | string[];
  filters?: Record<string, unknown>;
  sort?: string[];
  fields?: string[];
  pagination?: {
    page?: number;
    pageSize?: number;
  };
}

export function useStrapi<T>(
  endpoint: string,
  options: UseStrapiOptions = {}
) {
  const [data, setData] = useState<StrapiResponse<T> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

  const buildQueryString = (options: UseStrapiOptions): string => {
    const params = new URLSearchParams();

    // Handle population
    if (options.populate) {
      if (typeof options.populate === 'string') {
        params.append('populate', options.populate);
      } else if (Array.isArray(options.populate)) {
        options.populate.forEach(field => {
          params.append('populate[]', field);
        });
      }
    }

    // Handle filters
    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        params.append(`filters[${key}]`, String(value));
      });
    }

    // Handle sorting
    if (options.sort) {
      options.sort.forEach(sortField => {
        params.append('sort[]', sortField);
      });
    }

    // Handle field selection
    if (options.fields) {
      options.fields.forEach(field => {
        params.append('fields[]', field);
      });
    }

    // Handle pagination
    if (options.pagination) {
      if (options.pagination.page) {
        params.append('pagination[page]', String(options.pagination.page));
      }
      if (options.pagination.pageSize) {
        params.append('pagination[pageSize]', String(options.pagination.pageSize));
      }
    }

    const queryString = params.toString();
    return queryString ? `?${queryString}` : '';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const queryString = buildQueryString(options);
        const url = `${STRAPI_URL}/api/${endpoint}${queryString}`;
        
        console.log('Fetching from URL:', url); // Debug log
        
        const response = await fetch(url);
        
        if (!response.ok) {
          const errorData: StrapiError = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (e) {
        console.error('Fetch error:', e); // Debug log
        setError(e instanceof Error ? e : new Error('An error occurred while fetching data'));
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint, JSON.stringify(options), STRAPI_URL]);

  return { data, isLoading, error };
}

// Utility function to get full URL for Strapi media
export const getStrapiMedia = (url: string | null) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  return `${STRAPI_URL}${url}`;
};
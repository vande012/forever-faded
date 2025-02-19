"use client"; // Ensure this is a Client Component

import { useState, useEffect } from "react";
import qs from "qs";

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
  populate?: Record<string, unknown> | string;
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

  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  const buildQueryString = (options: UseStrapiOptions): string => {
    const params = new URLSearchParams();

    // Handle population
    if (options.populate) {
      if (typeof options.populate === "string") {
        params.append("populate", options.populate);
      } else if (typeof options.populate === "object" && options.populate !== null) {
        // Handle nested populate structure
        const populateString = Object.entries(options.populate)
          .map(([key, value]) => {
            if (typeof value === "object" && value !== null) {
              // Handle nested populate (e.g., populate[staff][populate][photo][populate]=*)
              const nestedPopulate = Object.entries(value)
                .map(([nestedKey, nestedValue]) => {
                  return `[${nestedKey}][populate]=${nestedValue}`;
                })
                .join("");
              return `[${key}]${nestedPopulate}`;
            } else {
              return `[${key}]=${value}`;
            }
          })
          .join("");

        params.append("populate", populateString);
      }
    }

    // Handle filters, sorting, fields, and pagination (unchanged)
    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        params.append(`filters[${key}]`, String(value));
      });
    }

    if (options.sort) {
      options.sort.forEach((sortField) => {
        params.append("sort[]", sortField);
      });
    }

    if (options.fields) {
      options.fields.forEach((field) => {
        params.append("fields[]", field);
      });
    }

    if (options.pagination) {
      if (options.pagination.page) {
        params.append("pagination[page]", String(options.pagination.page));
      }
      if (options.pagination.pageSize) {
        params.append("pagination[pageSize]", String(options.pagination.pageSize));
      }
    }

    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const queryString = buildQueryString(options);
        const url = `${STRAPI_URL}/api/${endpoint}${queryString}`;

        console.log("Fetching from URL:", url); // Debug log

        const response = await fetch(url);

        if (!response.ok) {
          const errorData: StrapiError = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("API Response:", result); // Debug log
        setData(result);
        setError(null);
      } catch (e) {
        console.error("Fetch error:", e); // Debug log
        setError(e instanceof Error ? e : new Error("An error occurred while fetching data"));
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
  if (url.startsWith("http")) return url;
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  return `${STRAPI_URL}${url}`;
};
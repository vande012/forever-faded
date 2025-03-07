import axios from 'axios';
import qs from 'qs';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

interface ProductFilters {
  category?: string;
  minPrice?: string | number;
  maxPrice?: string | number;
  sort?: string;
  page?: number;
  pageSize?: number;
}

export const fetchProducts = async (filters: ProductFilters = {}) => {
  try {
    // Build a simple query object
    const queryParams: any = {
      populate: '*'
    };

     // Add filters
     if (Object.keys(filters).length > 0) {
      // For category filter, try different formats based on Strapi v5 structure
      if (filters.category) {
        console.log(`Filtering by category: ${filters.category}`);
        
        // Try a different approach for category filtering
        // In Strapi v5, the relation field might be using a different format
        queryParams['filters[$and][0][product_category][Slug][$eq]'] = filters.category;
        
        // Alternatively, we could try:
        // queryParams['filters[product_category][Slug][$eq]'] = filters.category;
      }
      
      // For price filters, use flat structure
      if (filters.minPrice) {
        queryParams['filters[Price][$gte]'] = Number(filters.minPrice);
      }
      
      if (filters.maxPrice) {
        queryParams['filters[Price][$lte]'] = Number(filters.maxPrice);
      }
      
      // For sorting, use a simple string
      if (filters.sort) {
        const [field, direction] = filters.sort.split(':');
        const fieldMap: {[key: string]: string} = {
          'price': 'Price',
          'title': 'Title',
          'createdAt': 'createdAt'
        };
        const mappedField = fieldMap[field] || field;
        queryParams.sort = `${mappedField}:${direction}`;
      }
    }
    
    // Convert to query string using qs library for proper nesting
    const queryString = qs.stringify(queryParams, {
      encodeValuesOnly: true // Don't encode the keys
    });
    
    console.log(`Fetching products with query: ${API_URL}/api/products?${queryString}`);
    const response = await axios.get(`${API_URL}/api/products?${queryString}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching products:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    }
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    // Use the correct endpoint for Product Category
    console.log(`Fetching categories from: ${API_URL}/api/product-categories?populate=*`);
    const response = await axios.get(`${API_URL}/api/product-categories?populate=*`);
    
    // Log the raw response for debugging
    console.log('Raw product categories response:', response.data);
    
    // For Strapi v5, let's try to handle different possible response formats
    
    // If the response is already an array of categories
    if (Array.isArray(response.data)) {
      console.log('Product categories data is a direct array');
      return response.data;
    }
    
    // If it's in the standard Strapi v5 format with data property
    if (response.data && response.data.data) {
      console.log('Product categories found in response.data.data');
      return response.data.data;
    }
    
    // If we can't find categories, return an empty array
    console.warn('Could not find product categories in response:', response.data);
    return [];
  } catch (error: any) {
    console.error('Error fetching product categories:', error);
    
    // Return a hardcoded category as fallback
    console.warn('Error fetching product categories, returning test category');
    return [{
      id: 1,
      documentId: 'test-category',
      Name: 'Hats',
      Slug: 'hats',
      Description: 'Test category for hats'
    }];
  }
};

export const testCategoryEndpoints = async () => {
  const endpoints = [
    '/api/categories?populate=*',
    '/api/categories',
    '/api/product-categories?populate=*',
    '/api/product-categories'
  ];
  
  const results = [];
  
  for (const endpoint of endpoints) {
    try {
      console.log(`Testing category endpoint: ${API_URL}${endpoint}`);
      const response = await axios.get(`${API_URL}${endpoint}`);
      console.log(`Endpoint ${endpoint} SUCCESS:`, response.data);
      results.push({
        endpoint,
        success: true,
        data: response.data
      });
    } catch (err: any) {
      console.error(`Endpoint ${endpoint} FAILED:`, err.message);
      results.push({
        endpoint,
        success: false,
        error: err.message
      });
    }
  }
  
  return results;
};

export const fetchProductBySlug = async (slug: string) => {
  try {
    // Use a simple approach for fetching by slug
    const queryString = new URLSearchParams({
      'filters[Slug]': slug,
      'populate': '*'
    });
    
    console.log(`Fetching product with query: ${API_URL}/api/products?${queryString.toString()}`);
    const response = await axios.get(`${API_URL}/api/products?${queryString.toString()}`);
    
    if (response.data && response.data.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
      return response.data.data[0];
    } else {
      console.error('Product not found or unexpected data structure:', response.data);
      return null;
    }
  } catch (error: any) { // Add type annotation here
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Add a direct test function to try different query formats
export const testCategoryFilter = async (categorySlug: string = 'hats') => {
  try {
    // Try different approaches for category filtering
    const approaches = [
      // Approach 1: Using product-category with hyphen
      `?filters[product-category][Slug]=${categorySlug}&populate=*`,
      
      // Approach 2: Using product_category with underscore
      `?filters[product_category][Slug]=${categorySlug}&populate=*`,
      
      // Approach 3: Using productCategory in camelCase
      `?filters[productCategory][Slug]=${categorySlug}&populate=*`,
      
      // Approach 4: Using relation ID
      `?filters[product-category][id]=1&populate=*`,
      
      // Approach 5: Using nested structure
      `?filters[product-category][data][attributes][Slug]=${categorySlug}&populate=*`
    ];
    
    for (let i = 0; i < approaches.length; i++) {
      const approach = approaches[i];
      console.log(`Testing approach ${i+1}: ${API_URL}/api/products${approach}`);
      
      try {
        const response = await axios.get(`${API_URL}/api/products${approach}`);
        console.log(`Approach ${i+1} SUCCESS:`, response.data);
        return { success: true, approach: i+1, data: response.data };
      } catch (err: any) {
        console.error(`Approach ${i+1} FAILED:`, err.message);
      }
    }
    
    return { success: false, message: 'All approaches failed' };
  } catch (error: any) {
    console.error('Test error:', error);
    return { success: false, error };
  }
};
'use client';

import { useState, useEffect } from 'react';
import { fetchProducts, fetchCategories } from '../api/api';
import ProductCard from '../components/shop/ProductCard';
import { testCategoryFilter } from '../api/api';
import { testCategoryEndpoints } from '../api/api';
// Define the interface to match what ProductCard expects
interface ProductCardProps {
  product: {
    id: string;
    attributes: {
      title: string;
      price: number;
      slug: string;
      images: {
        data: Array<{
          attributes: {
            url: string;
            alternativeText?: string;
          }
        }>
      }
    }
  }
}

// Define proper types for our data from the API
interface ApiProduct {
  id: number;
  documentId: string;
  Title: string;
  Description: string;
  Price: number;
  Slug: string;
  Images: Array<{
    id: number;
    documentId: string;
    url: string;
    alternativeText: string | null;
    width: number;
    height: number;
  }>;
  product_category?: {
    id: number;
    documentId: string;
    Name: string;
    Slug: string;
    Description: string | null;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  SKU: string | null;
}

interface Category {
  id: number;
  documentId: string;
  Name: string;
  Slug: string;
  Description: string | null;
}




export default function ProductsPage() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    sort: 'price:asc'
  });

  const testDirectCategoryFilter = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get the first category slug
      const categorySlug = categories.length > 0 ? categories[0].Slug : 'hats';
      
      // Try a direct fetch with minimal parameters
      const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}/api/products?filters[product_category][Slug]=${categorySlug}&populate=*`;
      
      console.log(`Testing direct category filter: ${url}`);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Direct filter test succeeded:', data);
      
      // Update products with the test result
      if (data && data.data) {
        setProducts(data.data);
        setError(null);
      }
    } catch (err: any) { // Add type annotation to fix 'err' is of type 'unknown'
      console.error('Direct filter test failed:', err);
      setError(`Test failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch categories first
        const categoriesData = await fetchCategories();
        console.log('Categories data:', categoriesData);
        
        // Check if categoriesData is an array directly
        if (Array.isArray(categoriesData)) {
          setCategories(categoriesData);
        } 
        // Check if it's in the expected Strapi v5 format
        else if (categoriesData && categoriesData.data) {
          setCategories(categoriesData.data);
        } 
        // If it's in a different format, log it for debugging
        else {
          console.warn('Unexpected categories data structure:', categoriesData);
          // Try to extract categories from the response if possible
          if (categoriesData && typeof categoriesData === 'object') {
            // Look for any array property that might contain categories
            const possibleArrays = Object.values(categoriesData).filter(val => Array.isArray(val));
            if (possibleArrays.length > 0) {
              console.log('Found possible categories array:', possibleArrays[0]);
              setCategories(possibleArrays[0]);
            } else {
              setCategories([]);
            }
          } else {
            setCategories([]);
          }
        }
        
        // Then fetch products with filters
        const productsData = await fetchProducts(filters);
        console.log('Products data:', productsData);
        
        // Handle products data similarly
        if (Array.isArray(productsData)) {
          setProducts(productsData);
        } else if (productsData && productsData.data) {
          setProducts(productsData.data);
        } else {
          console.warn('Unexpected products data structure:', productsData);
          setProducts([]);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load products. Please try again later.');
        setProducts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [filters]);

  const testCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Testing category endpoints...');
      const results = await testCategoryEndpoints();
      
      // Find the first successful result
      const successfulResult = results.find(result => result.success);
      
      if (successfulResult) {
        console.log('Found working category endpoint:', successfulResult);
        
        // Extract categories from the successful result
        let extractedCategories = [];
        
        if (Array.isArray(successfulResult.data)) {
          extractedCategories = successfulResult.data;
        } else if (successfulResult.data && successfulResult.data.data) {
          extractedCategories = successfulResult.data.data;
        }
        
        if (extractedCategories.length > 0) {
          console.log('Extracted categories:', extractedCategories);
          setCategories(extractedCategories);
        }
      } else {
        setError('All category endpoints failed. Check console for details.');
      }
    } catch (err: any) {
      console.error('Category test failed:', err);
      setError(`Category test failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fix the event type for handleFilterChange
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Log the filter change for debugging
    console.log(`Filter changed: ${name} = ${value}`);
    
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Safely render category options with proper checks
  const renderCategoryOptions = () => {
    if (!categories || categories.length === 0) {
      return <option value="">No categories available</option>;
    }

    return [
      <option key="all" value="">All Categories</option>,
      ...categories.map(category => {
        // Safely access the slug with proper checks
        const slug = category?.Slug;
        const name = category?.Name || 'Unnamed Category';
        
        if (!slug) {
          console.warn('Category missing slug:', category);
          return null;
        }
        
        return (
          <option key={category.id} value={slug}>
            {name}
          </option>
        );
      }).filter(Boolean) // Remove null entries
    ];
  };

  // Transform API product to ProductCard format
  const transformProductForCard = (product: ApiProduct): ProductCardProps['product'] => {
    if (!product) {
      console.warn('Invalid product data:', product);
      return {
        id: 'unknown',
        attributes: {
          title: 'Product Unavailable',
          price: 0,
          slug: 'unavailable',
          images: {
            data: []
          }
        }
      };
    }

    // Transform the product to match what ProductCard expects
    return {
      id: String(product.id),
      attributes: {
        title: product.Title || 'Untitled Product',
        price: product.Price || 0,
        slug: product.Slug || 'unknown',
        images: {
          data: Array.isArray(product.Images) 
            ? product.Images.map(img => ({
                attributes: {
                  url: img?.url || '/placeholder.jpg',
                  alternativeText: img?.alternativeText || ''
                }
              }))
            : [] // Return empty array if Images is not an array
        }
      }
    };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 mt-40">Our Products</h1>
      
      {/* Filters */}
      <div className="bg-gray-50 p-4 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

<div className="mt-4 mb-4">
  <button 
    onClick={testDirectCategoryFilter}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
  >
    Test Category Filtering
  </button>
  <button 
    onClick={testCategories}
    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
  >
    Test Category Endpoints
  </button>
</div>
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              {renderCategoryOptions()}
            </select>
          </div>
          
          {/* Price Filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Price
            </label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Min Price"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Price
            </label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Max Price"
            />
          </div>
          
          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              name="sort"
              value={filters.sort}
              onChange={handleFilterChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="price:asc">Price: Low to High</option>
              <option value="price:desc">Price: High to Low</option>
              <option value="title:asc">Name: A to Z</option>
              <option value="title:desc">Name: Z to A</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}
      
      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Loading products...</p>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => {
            // Skip invalid products
            if (!product || !product.id) {
              console.warn('Invalid product in list:', product);
              return null;
            }
            
            try {
              return (
                <ProductCard 
                  key={product.id} 
                  product={transformProductForCard(product)} 
                />
              );
            } catch (error) {
              console.error('Error rendering product card:', error, product);
              return null;
            }
          }).filter(Boolean)} {/* Filter out null values */}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

function setLoading(arg0: boolean) {
  throw new Error('Function not implemented.');
}


function setError(arg0: null) {
  throw new Error('Function not implemented.');
}

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchProductBySlug } from '../../api/api';
import { useCart } from '../../components/shop/CartContext';
import { useParams } from 'next/navigation'; // Add this import
import { ProductDescription } from '../ProductDescription';

// Update the interface to match your Strapi v5 data structure
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
}

export default function ProductDetailPage() {
  // Use Next.js useParams hook to get the slug
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  
  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      if (!slug) {
        setError('Product slug is missing');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        console.log(`Loading product with slug: ${slug}`);
        
        const productData = await fetchProductBySlug(slug as string);
        console.log('Product data:', productData);
        
        if (productData) {
          setProduct(productData);
        } else {
          setError('Product not found');
        }
      } catch (error: any) {
        console.error('Error loading product:', error);
        setError(`Failed to load product: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: String(product.id), // Convert number to string
        name: product.Title, // Add name property to match CartItem interface
        title: product.Title, // Keep title for backward compatibility
        price: product.Price,
        image: product.Images?.[0]?.url || '/placeholder.jpg',
        quantity
      });
      
      // Show a confirmation message or toast notification
      alert('Product added to cart!');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <p className="text-xl">Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p className="mt-4">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  // Updated to match your Strapi v5 data structure
  const { Title, Description, Price, Images } = product;
  const imageUrl = Images?.[0]?.url || '/placeholder.jpg';
  const fullImageUrl = imageUrl.startsWith('http') 
    ? imageUrl 
    : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${imageUrl}`;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-40">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden rounded-lg">
          <Image 
            src={fullImageUrl}
            alt={Title}
            width={600}
            height={600}
            className="object-cover w-full h-full"
          />
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{Title}</h1>
          <p className="mt-4 text-2xl font-semibold text-gray-900">${Price.toFixed(2)}</p>
          
          <div className="mt-6 prose prose-sm text-gray-700">
            <ProductDescription content={Description} />
          </div>
          
          <div className="mt-8">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          
          <button
            type="button"
            onClick={handleAddToCart}
            className="mt-8 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
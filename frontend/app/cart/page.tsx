'use client';

import { useCart } from '../components/shop/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';
import placeholderImage from '../../public/placeholder.svg' ; // Add this import

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CartPage() {
  // Update this line to include checkout from useCart
  const { cart, removeFromCart, updateQuantity, cartTotal, checkout } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null); // Add error state
  const router = useRouter();

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 mt-40">Your Cart</h1>
      
      {/* Display error message if there is one */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
       
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {cart.map(item => (
                <li key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row">
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-full sm:w-24 h-24 mb-4 sm:mb-0">
                    <div className="relative h-full w-full">
                      <Image 
                        src={item.image 
                          ? (item.image.startsWith('http') 
                              ? item.image 
                              : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${item.image}`)
                          : '/images/placeholder.png'} // Fallback to a static placeholder
                        alt={item.title || item.name || 'Product'}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1 sm:ml-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)}</p>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      {/* Quantity Selector */}
                      <div className="flex items-center">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-md border border-gray-300 text-gray-700"
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-md border border-gray-300 text-gray-700"
                        >
                          +
                        </button>
                      </div>
                      
                      {/* Remove Button */}
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            
            <div className="border-t border-gray-200 py-4">
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-sm font-medium text-gray-900">${cartTotal.toFixed(2)}</p>
              </div>
              
              <div className="flex justify-between mt-2">
                <p className="text-sm text-gray-600">Shipping</p>
                <p className="text-sm font-medium text-gray-900">Calculated at checkout</p>
              </div>
              
              <div className="flex justify-between mt-2">
                <p className="text-sm text-gray-600">Tax</p>
                <p className="text-sm font-medium text-gray-900">Calculated at checkout</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between">
                <p className="text-base font-medium text-gray-900">Total</p>
                <p className="text-base font-medium text-gray-900">${cartTotal.toFixed(2)}</p>
              </div>
            </div>
            
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
            >
              {isCheckingOut ? 'Processing...' : 'Checkout'}
            </button>
            
            <div className="mt-4 text-center">
              <Link 
                href="/products" 
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '../../components/shop/CartContext';
import Link from 'next/link';

interface OrderDetails {
  id: number;
  customerName: string;
  customerEmail: string;
  total: number;
  paymentStatus: string;
}

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { clearCart } = useCart();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchAttempted, setFetchAttempted] = useState(false);

  // Clear cart on component mount
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  // Fetch order details
  useEffect(() => {
    if (!fetchAttempted && orderId) {
      setFetchAttempted(true);
      
      const fetchOrderDetails = async () => {
        try {
          console.log(`Fetching order details for order ID: ${orderId}`);
          const response = await fetch(`/api/orders/${orderId}`);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch order: ${response.status} ${response.statusText}`);
          }
          
          const data = await response.json();
          console.log('Order details response:', data);
          
          if (data.order) {
            setOrderDetails(data.order);
          } else {
            setError('No order details found');
          }
        } catch (error: any) {
          console.error('Error fetching order details:', error);
          setError(error.message || 'Failed to load order details');
        } finally {
          setLoading(false);
        }
      };
      
      fetchOrderDetails();
    } else if (!orderId) {
      setLoading(false);
    }
  }, [orderId, fetchAttempted]);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 mt-40">
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Thank you for your order!</h1>
        <p className="text-gray-600 mb-8">
          Your order has been successfully processed.
        </p>
        
        {orderId && (
          <p className="text-sm text-gray-500 mb-6">
            Order reference: #{orderId}
          </p>
        )}
        
        {loading && (
          <div className="mb-6">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="text-sm text-gray-500 mt-2">Loading order details...</p>
          </div>
        )}
        
        {!loading && orderDetails && (
          <div className="mb-6 text-left bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-medium">Name:</span> {orderDetails.customerName}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-medium">Email:</span> {orderDetails.customerEmail}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-medium">Total:</span> ${orderDetails.total.toFixed(2)}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Status:</span> {orderDetails.paymentStatus}
            </p>
          </div>
        )}
        
        <div className="mt-8 flex flex-col space-y-4">
          <Link 
            href="/products" 
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700"
          >
            Continue Shopping
          </Link>
          
          <Link 
            href="/account/orders"
            className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-md font-medium hover:bg-gray-300"
          >
            View All Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
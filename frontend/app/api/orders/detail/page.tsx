'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  attributes: {
    stripeSessionId: string;
    total: number;
    customerEmail: string;
    customerName: string;
    paymentStatus: string;
    status: string;
    createdAt: string;
    items: OrderItem[];
    shippingAddress: {
      address1: string;
      address2?: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    } | null;
  }
}

export default function OrderDetail({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    // Check if user is logged in - this is a placeholder
    // In a real app, you'd use your authentication system
    const email = localStorage.getItem('userEmail');
    if (!email) {
      router.push(`/login?redirect=/account/orders/${params.id}`);
      return;
    }
    
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/orders/${params.id}`
        );
        
        const orderData = response.data.data;
        
        // Verify that this order belongs to the logged-in user
        if (orderData.attributes.customerEmail !== email) {
          setError('You do not have permission to view this order');
          return;
        }
        
        setOrder(orderData);
      } catch (err) {
        setError('Failed to fetch order details');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrder();
  }, [params.id, router]);
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Order Details</h1>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }
  
  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Order Details</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Order not found'}
        </div>
        <div className="mt-4">
          <Link 
            href="/account/orders" 
            className="text-indigo-600 hover:text-indigo-900"
          >
            &larr; Back to Orders
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Order #{order.id}</h1>
        <Link 
          href="/account/orders" 
          className="text-indigo-600 hover:text-indigo-900"
        >
          &larr; Back to Orders
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="p-6 border-b">
          <div className="flex flex-wrap justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-lg font-medium mb-2">Order Information</h2>
              <p className="text-gray-600">
                Placed on {format(new Date(order.attributes.createdAt), 'MMMM d, yyyy')}
              </p>
              <p className="text-gray-600">
                Status: <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  order.attributes.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  order.attributes.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                  order.attributes.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                  order.attributes.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {order.attributes.status.charAt(0).toUpperCase() + order.attributes.status.slice(1)}
                </span>
              </p>
              <p className="text-gray-600">
                Payment: <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  order.attributes.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.attributes.paymentStatus.charAt(0).toUpperCase() + order.attributes.paymentStatus.slice(1)}
                </span>
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-2">Customer Information</h2>
              <p className="text-gray-600">{order.attributes.customerName}</p>
              <p className="text-gray-600">{order.attributes.customerEmail}</p>
            </div>
          </div>
        </div>
        
        {order.attributes.shippingAddress && (
          <div className="p-6 border-b">
            <h2 className="text-lg font-medium mb-2">Shipping Address</h2>
            <p className="text-gray-600">{order.attributes.shippingAddress.address1}</p>
            {order.attributes.shippingAddress.address2 && (
              <p className="text-gray-600">{order.attributes.shippingAddress.address2}</p>
            )}
            <p className="text-gray-600">
              {order.attributes.shippingAddress.city}, {order.attributes.shippingAddress.state} {order.attributes.shippingAddress.postalCode}
            </p>
            <p className="text-gray-600">{order.attributes.shippingAddress.country}</p>
          </div>
        )}
        
        <div className="p-6">
          <h2 className="text-lg font-medium mb-4">Order Items</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.attributes.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{item.quantity}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">${item.price.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">${(item.price * item.quantity).toFixed(2)}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-right font-medium">
                    Total:
                  </td>
                  <td className="px-6 py-4 font-medium">
                    ${order.attributes.total.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
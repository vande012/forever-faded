'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

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
    items: any[];
    shippingAddress: any;
  }
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          throw new Error('Not authenticated');
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/orders?sort=createdAt:desc`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(response.data.data);
      } catch (err) {
        setError('Failed to fetch orders');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId: number, status: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('Not authenticated');
      }

      await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/orders/${orderId}`,
        {
          data: { status },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, attributes: { ...order.attributes, status } } 
          : order
      ));

      if (selectedOrder?.id === orderId) {
        setSelectedOrder({ ...selectedOrder, attributes: { ...selectedOrder.attributes, status } });
      }
    } catch (err) {
      console.error('Failed to update order status:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Orders</h1>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Orders</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="font-medium">Recent Orders</h2>
          </div>
          <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
            {orders.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No orders found</div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {orders.map(order => (
                  <li 
                    key={order.id}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${
                      selectedOrder?.id === order.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-sm text-gray-500">{order.attributes.customerName}</p>
                        <p className="text-sm text-gray-500">
                          {format(new Date(order.attributes.createdAt), 'MMM d, yyyy')}
                        </p>
                      </div>
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.attributes.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.attributes.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                          order.attributes.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                          order.attributes.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.attributes.status.charAt(0).toUpperCase() + order.attributes.status.slice(1)}
                        </span>
                        <p className="text-sm font-medium text-right mt-1">
                          ${order.attributes.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        {/* Order Details */}
        <div className="lg:col-span-2">
          {selectedOrder ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-medium">Order #{selectedOrder.id}</h2>
                  <div>
                    <select
                      value={selectedOrder.attributes.status}
                      onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                      className="border rounded p-2 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                <p className="text-gray-500 mt-1">
                  Placed on {format(new Date(selectedOrder.attributes.createdAt), 'MMMM d, yyyy')}
                </p>
              </div>
              
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Information */}
                <div>
                  <h3 className="font-medium mb-2">Customer Information</h3>
                  <p>{selectedOrder.attributes.customerName}</p>
                  <p>{selectedOrder.attributes.customerEmail}</p>
                  <p className="mt-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedOrder.attributes.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      Payment: {selectedOrder.attributes.paymentStatus}
                    </span>
                  </p>
                </div>
                
                {/* Shipping Address */}
                {selectedOrder.attributes.shippingAddress && (
                  <div>
                    <h3 className="font-medium mb-2">Shipping Address</h3>
                    <p>{selectedOrder.attributes.shippingAddress.address1}</p>
                    {selectedOrder.attributes.shippingAddress.address2 && (
                      <p>{selectedOrder.attributes.shippingAddress.address2}</p>
                    )}
                    <p>
                      {selectedOrder.attributes.shippingAddress.city}, {selectedOrder.attributes.shippingAddress.state} {selectedOrder.attributes.shippingAddress.postalCode}
                    </p>
                    <p>{selectedOrder.attributes.shippingAddress.country}</p>
                  </div>
                )}
              </div>
              
              {/* Order Items */}
              <div className="px-6 pb-6">
                <h3 className="font-medium mb-4">Order Items</h3>
                <div className="border rounded-lg overflow-hidden">
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
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedOrder.attributes.items.map((item, index) => (
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
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan={2} className="px-6 py-4 text-right font-medium">
                          Total:
                        </td>
                        <td className="px-6 py-4 font-medium">
                          ${selectedOrder.attributes.total.toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center h-full">
              <p className="text-gray-500">Select an order to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
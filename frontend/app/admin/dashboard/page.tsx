'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Package, CreditCard, LogOut } from 'lucide-react';

export default function AccountDashboard() {
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    // Check if user is logged in - this is a placeholder
    // In a real app, you'd use your authentication system
    const email = localStorage.getItem('userEmail');
    const name = localStorage.getItem('userName');
    
    if (!email) {
      router.push('/login?redirect=/account');
      return;
    }
    
    setUserEmail(email);
    setUserName(name || 'Customer');
  }, [router]);
  
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userToken');
    
    // Redirect to home page
    router.push('/');
  };
  
  if (!userEmail) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center">
                <div className="bg-indigo-100 rounded-full p-3 mr-4">
                  <User className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-lg font-medium">{userName}</h2>
                  <p className="text-gray-500">{userEmail}</p>
                </div>
              </div>
            </div>
            
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/account" 
                    className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded"
                  >
                    <User className="h-5 w-5 mr-3 text-gray-500" />
                    Account Dashboard
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/account/orders" 
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                  >
                    <Package className="h-5 w-5 mr-3 text-gray-500" />
                    Orders
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                  >
                    <LogOut className="h-5 w-5 mr-3 text-gray-500" />
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div className="p-6 border-b">
              <h2 className="text-lg font-medium">Account Overview</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-base font-medium mb-2">Account Details</h3>
                  <p className="text-gray-600">{userName}</p>
                  <p className="text-gray-600">{userEmail}</p>
                  <Link 
                    href="/account/profile" 
                    className="text-indigo-600 hover:text-indigo-900 text-sm mt-2 inline-block"
                  >
                    Edit Profile
                  </Link>
                </div>
                
                <div>
                  <h3 className="text-base font-medium mb-2">Shipping Address</h3>
                  <p className="text-gray-600">No shipping address saved yet.</p>
                  <Link 
                    href="/account/addresses" 
                    className="text-indigo-600 hover:text-indigo-900 text-sm mt-2 inline-block"
                  >
                    Add Address
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-lg font-medium">Recent Orders</h2>
              </div>
              <div className="p-6">
                <Link 
                  href="/account/orders" 
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  View All Orders
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-lg font-medium">Newsletter</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">Stay updated with our latest products and offers.</p>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={userEmail || ''}
                    readOnly
                  />
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
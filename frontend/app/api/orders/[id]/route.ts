import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;
    
    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }
    
    // Fetch order from Strapi
    const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
    
    try {
      const response = await axios.get(`${API_URL}/api/orders/${orderId}`);
      console.log('Strapi response:', response.data);
      
      const orderData = response.data.data;
      
      // Transform the data for the frontend
      const order = {
        id: orderData.id,
        customerName: orderData.attributes.customerName,
        customerEmail: orderData.attributes.customerEmail,
        total: orderData.attributes.total,
        paymentStatus: orderData.attributes.paymentStatus,
      };
      
      return NextResponse.json({ order });
    } catch (axiosError: any) {
      // Handle the 404 error from Strapi
      if (axiosError.response?.status === 404) {
        console.log(`Order with ID ${orderId} not found in Strapi`);
        
        // Return a simplified mock order for testing
        return NextResponse.json({
          order: {
            id: parseInt(orderId),
            customerName: "Test Customer",
            customerEmail: "test@example.com",
            total: 29.95,
            paymentStatus: "unpaid"
          }
        });
      }
      
      throw axiosError; // Re-throw if it's not a 404
    }
  } catch (error: any) {
    console.error('Error fetching order:', error);
    
    if (error.response) {
      console.error('Error response status:', error.response.status);
      console.error('Error response data:', error.response.data);
    }
    
    return NextResponse.json(
      { error: error.message || 'Failed to fetch order' },
      { status: error.response?.status || 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Next.js 15 route handler pattern
type Context = {
  params: {
    id: string;
  };
};

export async function GET(
  request: NextRequest,
  context: Context
) {
  try {
    const orderId = context.params.id;
    
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
      return NextResponse.json(response.data);
    } catch (axiosError: any) {
      if (axiosError.response) {
        return NextResponse.json(
          { error: 'Failed to fetch order from Strapi' },
          { status: axiosError.response.status || 500 }
        );
      }
      
      return NextResponse.json(
        { error: 'Network error when fetching order' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error fetching order:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
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
       console.log('Strapi response:', response.data);
       
       return NextResponse.json(response.data);
     } catch (axiosError: any) {
       if (axiosError.response) {
         console.error('Error response status:', axiosError.response.status);
         console.error('Error response data:', axiosError.response.data);
         
         return NextResponse.json(
           { error: axiosError.response.data.error || 'Failed to fetch order' },
           { status: axiosError.response.status }
         );
       }
       
       throw axiosError; // Re-throw if it's not a response error
     }
   } catch (error: any) {
     console.error('Error fetching order:', error);
     
     return NextResponse.json(
       { error: error.message || 'Failed to fetch order' },
       { status: 500 }
     );
   }
 }
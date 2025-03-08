import { NextRequest, NextResponse } from 'next/server';

// Using a simpler type definition that should work with Next.js 15
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
      // For now, just return a simple response to test if the route works
      return NextResponse.json({ id: orderId, message: 'Order details' });
      
      // Once the route is working, you can uncomment this code:
      /*
      const response = await axios.get(`${API_URL}/api/orders/${orderId}`);
      return NextResponse.json(response.data);
      */
    } catch (error: any) {
      return NextResponse.json(
        { error: 'Failed to fetch order from Strapi' },
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
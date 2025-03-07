import { NextResponse } from 'next/server';
import axios from 'axios';

// Define types for the cart items
interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

// Define type for customer info
interface CustomerInfo {
  name: string;
  email: string;
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

// Define type for the request body
interface CheckoutRequestBody {
  items: CartItem[];
  customerInfo: CustomerInfo;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received checkout request:', body);
    
    const { items, customerInfo } = body as CheckoutRequestBody;
    
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      );
    }
    
    // Calculate total
    const total = items.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
    
    // Format the order items
    const orderItems = items.map((item: CartItem) => ({
      product: item.id,
      name: item.title,
      price: item.price,
      quantity: item.quantity
    }));
    
    // Create the order payload with the correct paymentStatus value
    const orderData = {
      data: {
        items: orderItems,
        total: total,
        customerEmail: customerInfo.email,
        customerName: customerInfo.name,
        // Use "unpaid" instead of "pending" for paymentStatus
        paymentStatus: "unpaid", // Must be one of: paid, unpaid, refunded
        // If you have a productStatus field, make sure it has valid values too
        productStatus: "processing" // Check what values are allowed in your model
      }
    };
    
    console.log('Sending order data to Strapi:', orderData);
    
    // Send the order to Strapi
    const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
    const response = await axios.post(`${API_URL}/api/orders`, orderData);
    
    console.log('Order created successfully:', response.data);
    
    return NextResponse.json({
      success: true,
      orderId: response.data.data.id,
      message: 'Order created successfully'
    });
  } catch (error: any) {
    console.error('Error processing checkout:', error);
    
    // Log detailed error information
    if (error.response) {
      console.error('Error response status:', error.response.status);
      console.error('Error response data:', JSON.stringify(error.response.data, null, 2));
    }
    
    return NextResponse.json(
      { 
        error: error.message || 'An error occurred during checkout',
        details: error.response?.data || {}
      },
      { status: error.response?.status || 400 }
    );
  }
}
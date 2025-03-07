import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import axios from 'axios';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export async function GET(request: Request) {
  try {
    // Get the session ID from the URL
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing session_id parameter' },
        { status: 400 }
      );
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer', 'payment_intent'],
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 400 }
      );
    }

    // Extract customer information
    const customerEmail = session.customer_details?.email || '';
    const customerName = session.customer_details?.name || '';

    // Extract shipping address if available
    const shippingAddress = session.shipping_details?.address ? {
      address1: session.shipping_details.address.line1 || '',
      address2: session.shipping_details.address.line2 || '',
      city: session.shipping_details.address.city || '',
      state: session.shipping_details.address.state || '',
      postalCode: session.shipping_details.address.postal_code || '',
      country: session.shipping_details.address.country || '',
    } : null;

    // Extract line items
    const lineItems = session.line_items?.data.map(item => ({
      productId: item.price?.product as string,
      quantity: item.quantity,
      price: item.amount_total / 100, // Convert from cents to dollars
      name: item.description || '',
    })) || [];

    // Create order data
    const orderData = {
      stripeSessionId: session.id,
      total: session.amount_total ? session.amount_total / 100 : 0,
      customerEmail,
      customerName,
      paymentStatus: session.payment_status,
      items: lineItems,
      shippingAddress,
    };

    // Send order data to Strapi
    const strapiResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/orders`,
      { data: orderData },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    );

    return NextResponse.json({
      success: true,
      order: strapiResponse.data,
    });
  } catch (error) {
    console.error('Error verifying order:', error);
    return NextResponse.json(
      { error: 'An error occurred while verifying the order' },
      { status: 500 }
    );
  }
}
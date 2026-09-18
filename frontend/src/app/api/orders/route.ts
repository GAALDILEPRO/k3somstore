import { NextResponse } from 'next/server';
import { StoreService } from '../../../lib/services/storeService';
import { z } from 'zod';
import { OrderStatus } from '../../../lib/types';

const OrderCreateSchema = z.object({
  customerName: z.string().min(2),
  customerPhone: z.string().min(6),
  customerEmail: z.string().email().optional(),
  city: z.string(),
  district: z.string(),
  streetAddress: z.string().min(3),
  deliveryNotes: z.string().optional(),
  items: z.array(
    z.object({
      id: z.string(),
      productId: z.string(),
      productName: z.string(),
      productImage: z.string().optional(),
      price: z.number().positive(),
      quantity: z.number().int().positive(),
      total: z.number().positive(),
      selectedColor: z.string().optional(),
    })
  ),
  subtotal: z.number().nonnegative(),
  deliveryFee: z.number().nonnegative(),
  discountAmount: z.number().nonnegative(),
  totalAmount: z.number().nonnegative(),
  couponCode: z.string().optional(),
  paymentMethod: z.enum(['EVC_PLUS', 'ZAAD', 'SAHAL', 'EDAHAB', 'CASH_ON_DELIVERY', 'CARD']),
  paymentReference: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderNumber = searchParams.get('orderNumber');

    if (orderNumber) {
      const order = StoreService.getOrderByIdOrNumber(orderNumber);
      if (!order) {
        return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: order });
    }

    const orders = StoreService.getOrders();
    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = OrderCreateSchema.parse(body);

    const order = StoreService.createOrder(validated);

    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Order validation failed' },
      { status: 400 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { orderId, status, note } = body;

    if (!orderId || !status) {
      return NextResponse.json(
        { success: false, error: 'orderId and status are required' },
        { status: 400 }
      );
    }

    const updated = StoreService.updateOrderStatus(orderId, status as OrderStatus, note);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update order status' },
      { status: 500 }
    );
  }
}

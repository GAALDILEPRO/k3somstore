import mongoose, { Schema, Document, Model } from 'mongoose';
import { OrderStatus, PaymentMethod, PaymentStatus } from '../types';

export interface IOrderItem {
  productId: string;
  productName: string;
  productImage?: string;
  price: number;
  quantity: number;
  total: number;
  selectedColor?: string;
}

export interface IOrderDocument extends Document {
  orderNumber: string;
  userId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  city: string;
  district: string;
  streetAddress: string;
  deliveryNotes?: string;
  items: IOrderItem[];
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  totalAmount: number;
  couponCode?: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentReference?: string;
  statusHistory: {
    status: OrderStatus;
    timestamp: Date;
    note?: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrderDocument>(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    userId: { type: String },
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true, index: true },
    customerEmail: { type: String },
    city: { type: String, required: true },
    district: { type: String, required: true },
    streetAddress: { type: String, required: true },
    deliveryNotes: { type: String },
    items: [
      {
        productId: { type: String, required: true },
        productName: { type: String, required: true },
        productImage: { type: String },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        total: { type: Number, required: true },
        selectedColor: { type: String },
      },
    ],
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, default: 0 },
    discountAmount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    couponCode: { type: String },
    status: {
      type: String,
      enum: [
        'PENDING',
        'CONFIRMED',
        'PROCESSING',
        'READY_FOR_DELIVERY',
        'OUT_FOR_DELIVERY',
        'DELIVERED',
        'CANCELLED',
      ],
      default: 'PENDING',
      index: true,
    },
    paymentMethod: {
      type: String,
      enum: ['EVC_PLUS', 'ZAAD', 'SAHAL', 'EDAHAB', 'CASH_ON_DELIVERY', 'CARD'],
      default: 'CASH_ON_DELIVERY',
    },
    paymentStatus: {
      type: String,
      enum: ['PENDING', 'AWAITING_VERIFICATION', 'COMPLETED', 'FAILED', 'REFUNDED'],
      default: 'PENDING',
    },
    paymentReference: { type: String },
    statusHistory: [
      {
        status: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        note: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const OrderModel: Model<IOrderDocument> =
  mongoose.models.Order || mongoose.model<IOrderDocument>('Order', OrderSchema);

export default OrderModel;

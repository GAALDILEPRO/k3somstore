// TypeScript Domain Definitions for K3SOMSTORE Production Platform

export type Role = 'CUSTOMER' | 'ADMIN' | 'STAFF';

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'READY_FOR_DELIVERY'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED';

export type PaymentMethod =
  | 'EVC_PLUS'
  | 'ZAAD'
  | 'SAHAL'
  | 'EDAHAB'
  | 'CASH_ON_DELIVERY'
  | 'CARD';

export type PaymentStatus =
  | 'PENDING'
  | 'AWAITING_VERIFICATION'
  | 'COMPLETED'
  | 'FAILED'
  | 'REFUNDED';

export type DiscountType = 'PERCENTAGE' | 'FIXED';

export interface Category {
  id: string;
  name: string;
  nameSo: string;
  slug: string;
  description: string;
  image: string;
  isFeatured?: boolean;
  productCount?: number;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface Product {
  id: string;
  name: string;
  nameSo?: string;
  slug: string;
  description: string;
  descriptionSo?: string;
  price: number;
  oldPrice?: number;
  discountPercent?: number;
  sku: string;
  stock: number;
  lowStockAlert: number;
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  rating: number;
  reviewCount: number;
  categoryId: string;
  category?: Category;
  images: ProductImage[];
  specs: Record<string, string>;
  colors?: string[];
  createdAt?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  addedAt: string;
}

export interface Address {
  id: string;
  userId?: string;
  fullName: string;
  phone: string;
  city: string;
  district: string;
  streetAddress: string;
  deliveryNotes?: string;
  isDefault?: boolean;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage?: string;
  price: number;
  quantity: number;
  total: number;
  selectedColor?: string;
}

export interface OrderStatusHistoryItem {
  status: OrderStatus;
  timestamp: string;
  note: string;
  changedBy?: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. K3S-10492
  userId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  city: string;
  district: string;
  streetAddress: string;
  deliveryNotes?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  totalAmount: number;
  couponCode?: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentReference?: string;
  statusHistory: OrderStatusHistoryItem[];
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  isApproved: boolean;
}

export interface Coupon {
  code: string;
  discountType: DiscountType;
  discountValue: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  isActive: boolean;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  phone: string;
  role: Role;
  createdAt: string;
}

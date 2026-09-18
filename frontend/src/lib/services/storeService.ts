// Centralized Store Data Service
// Seamlessly handles local fallback state & prepares for direct Prisma DB calls

import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_REVIEWS } from '../../data/initialData';
import { Product, Category, Order, Review, OrderStatus, PaymentMethod, PaymentStatus } from '../types';
import { generateOrderNumber } from '../utils';

let productsState: Product[] = [...INITIAL_PRODUCTS];
let categoriesState: Category[] = [...INITIAL_CATEGORIES];
let reviewsState: Review[] = [...INITIAL_REVIEWS];

let ordersState: Order[] = [
  {
    id: 'ord-10245',
    orderNumber: 'K3S-10245',
    customerName: 'Guled Abdi Ali',
    customerPhone: '+252615432198',
    customerEmail: 'guled@example.so',
    city: 'Mogadishu',
    district: 'Hodan',
    streetAddress: 'Taleex Street, Near KM4',
    deliveryNotes: 'Please call when arriving at the building',
    items: [
      {
        id: 'item-1',
        productId: 'k3s-prod-1',
        productName: 'Ultra 2 Smart Watch Titanium (Amoled Display)',
        productImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
        price: 38.0,
        quantity: 1,
        total: 38.0,
        selectedColor: 'Orange Alpine',
      },
      {
        id: 'item-2',
        productId: 'k3s-prod-7',
        productName: 'IPX8 Waterproof Floating Phone Pouch',
        productImage: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80',
        price: 5.0,
        quantity: 2,
        total: 10.0,
        selectedColor: 'Ocean Blue',
      },
    ],
    subtotal: 48.0,
    deliveryFee: 2.0,
    discountAmount: 0.0,
    totalAmount: 50.0,
    status: 'OUT_FOR_DELIVERY',
    paymentMethod: 'EVC_PLUS',
    paymentStatus: 'AWAITING_VERIFICATION',
    paymentReference: 'EVC-94821034',
    statusHistory: [
      {
        status: 'PENDING',
        timestamp: '2026-09-18T10:15:00Z',
        note: 'Order placed by customer via EVC Plus',
      },
      {
        status: 'CONFIRMED',
        timestamp: '2026-09-18T10:30:00Z',
        note: 'Payment reference verified by merchant',
      },
      {
        status: 'PROCESSING',
        timestamp: '2026-09-18T11:00:00Z',
        note: 'Order packed in K3SOM logistics hub (Hodan)',
      },
      {
        status: 'OUT_FOR_DELIVERY',
        timestamp: '2026-09-18T13:45:00Z',
        note: 'Courier #04 out for delivery in Hodan district',
      },
    ],
    createdAt: '2026-09-18T10:15:00Z',
    updatedAt: '2026-09-18T13:45:00Z',
  },
];

export const StoreService = {
  getProducts: (params?: {
    categorySlug?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    inStockOnly?: boolean;
    sortBy?: string;
  }) => {
    let result = [...productsState];

    if (params?.categorySlug && params.categorySlug !== 'all') {
      const cat = categoriesState.find((c) => c.slug === params.categorySlug);
      if (cat) {
        result = result.filter((p) => p.categoryId === cat.id);
      }
    }

    if (params?.search) {
      const q = params.search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.nameSo && p.nameSo.toLowerCase().includes(q)) ||
          p.sku.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (params?.minPrice !== undefined) {
      result = result.filter((p) => p.price >= (params.minPrice || 0));
    }

    if (params?.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= (params.maxPrice || 9999));
    }

    if (params?.inStockOnly) {
      result = result.filter((p) => p.stock > 0);
    }

    if (params?.sortBy) {
      switch (params.sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
          break;
        case 'popular':
        default:
          result.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
      }
    }

    return result;
  },

  getProductById: (id: string): Product | undefined => {
    return productsState.find((p) => p.id === id);
  },

  getProductBySlug: (slug: string): Product | undefined => {
    return productsState.find((p) => p.slug === slug);
  },

  getCategories: (): Category[] => {
    return categoriesState;
  },

  getCategoryBySlug: (slug: string): Category | undefined => {
    return categoriesState.find((c) => c.slug === slug);
  },

  getFeaturedProducts: (): Product[] => {
    return productsState.filter((p) => p.isFeatured);
  },

  getNewArrivals: (): Product[] => {
    return productsState.filter((p) => p.isNew);
  },

  getRelatedProducts: (categoryId: string, currentId: string): Product[] => {
    return productsState
      .filter((p) => p.categoryId === categoryId && p.id !== currentId)
      .slice(0, 4);
  },

  // Orders
  getOrders: (): Order[] => {
    return ordersState;
  },

  getOrderByIdOrNumber: (identifier: string): Order | undefined => {
    const clean = identifier.trim().toUpperCase();
    return ordersState.find(
      (o) => o.id === identifier || o.orderNumber.toUpperCase() === clean
    );
  },

  createOrder: (orderData: {
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    city: string;
    district: string;
    streetAddress: string;
    deliveryNotes?: string;
    items: Order['items'];
    subtotal: number;
    deliveryFee: number;
    discountAmount: number;
    totalAmount: number;
    couponCode?: string;
    paymentMethod: PaymentMethod;
    paymentReference?: string;
  }): Order => {
    const orderNumber = generateOrderNumber();
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      customerEmail: orderData.customerEmail,
      city: orderData.city,
      district: orderData.district,
      streetAddress: orderData.streetAddress,
      deliveryNotes: orderData.deliveryNotes,
      items: orderData.items,
      subtotal: orderData.subtotal,
      deliveryFee: orderData.deliveryFee,
      discountAmount: orderData.discountAmount,
      totalAmount: orderData.totalAmount,
      couponCode: orderData.couponCode,
      status: 'PENDING',
      paymentMethod: orderData.paymentMethod,
      paymentStatus:
        orderData.paymentMethod === 'CASH_ON_DELIVERY' ? 'PENDING' : 'AWAITING_VERIFICATION',
      paymentReference: orderData.paymentReference,
      statusHistory: [
        {
          status: 'PENDING',
          timestamp: new Date().toISOString(),
          note: `Order placed via ${orderData.paymentMethod}. Awaiting delivery/payment confirmation.`,
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Deduct stock
    orderData.items.forEach((item) => {
      const prod = productsState.find((p) => p.id === item.productId);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - item.quantity);
      }
    });

    ordersState = [newOrder, ...ordersState];
    return newOrder;
  },

  updateOrderStatus: (
    orderId: string,
    status: OrderStatus,
    note?: string
  ): Order | undefined => {
    const order = ordersState.find((o) => o.id === orderId || o.orderNumber === orderId);
    if (!order) return undefined;

    order.status = status;
    order.updatedAt = new Date().toISOString();
    order.statusHistory.push({
      status,
      timestamp: new Date().toISOString(),
      note: note || `Status updated to ${status}`,
    });

    if (status === 'DELIVERED' && order.paymentMethod === 'CASH_ON_DELIVERY') {
      order.paymentStatus = 'COMPLETED';
    }

    return order;
  },

  // Admin Product Operations
  addProduct: (product: Omit<Product, 'id'>): Product => {
    const newProd: Product = {
      ...product,
      id: `k3s-prod-${Date.now()}`,
    };
    productsState = [newProd, ...productsState];
    return newProd;
  },

  updateProduct: (id: string, updates: Partial<Product>): Product | undefined => {
    const index = productsState.findIndex((p) => p.id === id);
    if (index === -1) return undefined;

    productsState[index] = { ...productsState[index], ...updates };
    return productsState[index];
  },

  deleteProduct: (id: string): boolean => {
    const initialLen = productsState.length;
    productsState = productsState.filter((p) => p.id !== id);
    return productsState.length < initialLen;
  },

  // Reviews
  getProductReviews: (productId: string): Review[] => {
    return reviewsState.filter((r) => r.productId === productId && r.isApproved);
  },

  addReview: (review: Omit<Review, 'id' | 'date' | 'isApproved'>): Review => {
    const newReview: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      isApproved: true,
    };
    reviewsState = [newReview, ...reviewsState];

    // Update product rating and count
    const prod = productsState.find((p) => p.id === review.productId);
    if (prod) {
      prod.reviewCount += 1;
      const allProductReviews = reviewsState.filter((r) => r.productId === review.productId);
      const sum = allProductReviews.reduce((acc, r) => acc + r.rating, 0);
      prod.rating = Number((sum / allProductReviews.length).toFixed(1));
    }

    return newReview;
  },
};

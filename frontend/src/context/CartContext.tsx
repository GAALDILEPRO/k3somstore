'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { CartItem, Product, Coupon } from '../lib/types';
import { calculateDeliveryFee } from '../lib/utils';
import { useToast } from './ToastContext';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  coupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  deliveryCity: string;
  setDeliveryCity: (city: string) => void;
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  total: number;
  totalCount: number;
}

const VALID_COUPONS: Coupon[] = [
  {
    code: 'K3SOM10',
    discountType: 'PERCENTAGE',
    discountValue: 10, // 10% off
    minOrderAmount: 20,
    isActive: true,
  },
  {
    code: 'SOMALIA5',
    discountType: 'FIXED',
    discountValue: 5, // $5 off
    minOrderAmount: 30,
    isActive: true,
  },
];

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [deliveryCity, setDeliveryCity] = useState<string>('Mogadishu');
  const [isLoaded, setIsLoaded] = useState(false);
  const { showToast } = useToast();

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('k3som_cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
      const savedCity = localStorage.getItem('k3som_delivery_city');
      if (savedCity) {
        setDeliveryCity(savedCity);
      }
    } catch (e) {
      console.error('Error loading cart from storage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('k3som_cart', JSON.stringify(cartItems));
      localStorage.setItem('k3som_delivery_city', deliveryCity);
    }
  }, [cartItems, deliveryCity, isLoaded]);

  const addToCart = (product: Product, quantity = 1, color?: string) => {
    let nextCart: CartItem[] = [];

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.selectedColor === color
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        if (newQty > product.stock) {
          showToast(`Only ${product.stock} items available in stock`, 'error');
          nextCart = prev;
          return prev;
        }
        updated[existingIndex].quantity = newQty;
        nextCart = updated;
        return updated;
      } else {
        if (quantity > product.stock) {
          showToast(`Only ${product.stock} items available in stock`, 'error');
          nextCart = prev;
          return prev;
        }
        const newItem: CartItem = {
          id: `${product.id}-${color || 'default'}-${Date.now()}`,
          productId: product.id,
          product,
          quantity,
          selectedColor: color,
        };
        nextCart = [...prev, newItem];
        return nextCart;
      }
    });

    try {
      if (typeof window !== 'undefined' && nextCart.length > 0) {
        localStorage.setItem('k3som_cart', JSON.stringify(nextCart));
      }
    } catch (e) {
      console.warn('LocalStorage immediate sync warning:', e);
    }

    showToast(`Added "${product.name.slice(0, 30)}..." to cart!`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          if (quantity > item.product.stock) {
            showToast(`Maximum stock available is ${item.product.stock}`, 'error');
            return item;
          }
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setCoupon(null);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const found = VALID_COUPONS.find((c) => c.code === trimmed && c.isActive);

    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code' };
    }

    if (found.minOrderAmount && subtotal < found.minOrderAmount) {
      return {
        success: false,
        message: `Order must be at least $${found.minOrderAmount} to use this coupon`,
      };
    }

    setCoupon(found);
    showToast(`Coupon ${found.code} applied successfully!`, 'success');
    return { success: true, message: 'Coupon applied!' };
  };

  const removeCoupon = () => {
    setCoupon(null);
    showToast('Coupon removed', 'info');
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    if (!coupon) return 0;
    if (coupon.discountType === 'PERCENTAGE') {
      const disc = (subtotal * coupon.discountValue) / 100;
      return coupon.maxDiscount ? Math.min(disc, coupon.maxDiscount) : disc;
    }
    return Math.min(coupon.discountValue, subtotal);
  }, [coupon, subtotal]);

  const deliveryFee = useMemo(() => {
    if (cartItems.length === 0) return 0;
    return calculateDeliveryFee(deliveryCity, subtotal);
  }, [deliveryCity, subtotal, cartItems.length]);

  const total = useMemo(() => {
    return Math.max(0, subtotal - discountAmount + deliveryFee);
  }, [subtotal, discountAmount, deliveryFee]);

  const totalCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        coupon,
        applyCoupon,
        removeCoupon,
        deliveryCity,
        setDeliveryCity,
        subtotal,
        deliveryFee,
        discountAmount,
        total,
        totalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
